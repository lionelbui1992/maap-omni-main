import * as Sentry from '@sentry/node';
import queryString from 'qs';

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
});

module.exports = class Request {
    constructor(baseUrl = '', token = null) {
        this.baseUrl = baseUrl;
        this.token = token;
    }

    call(req, token = this.token) {
        const { method = 'GET', body, headers = {}, params = {} } = req;

        let options = {
            method: method.toUpperCase(),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                ...headers,
            },
            body: body,
        };

        if (body && typeof body === 'object') {
            options.body = JSON.stringify(body);
        }

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        let url = this.baseUrl + req.url;
        if (params) {
            const paramString = queryString.stringify(params);
            url += '?' + paramString;
        }

        Sentry.setContext('request', {
            url,
            body,
        });

        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then((response) => {
                    if (response.ok) {
                        try {
                            return response
                                .json()
                                .then((json) =>
                                    resolve({
                                        headers: response.headers,
                                        status: response.status,
                                        message: response.statusText,
                                        error: false,
                                        body: json,
                                    })
                                )
                                .catch((e) => {
                                    return response.text().then((text) => {
                                        resolve({
                                            headers: response.headers,
                                            status: response.status,
                                            message: response.statusText,
                                            error: false,
                                            body: text,
                                        });
                                    });
                                });
                        } catch (error) {
                            Sentry.captureException(error);
                            throw response;
                        }
                    }
                    throw response;
                })
                .catch((error) => {
                    Sentry.captureException(error);
                    console.log('Omneo fetch client error', error);
                    try {
                        return error
                            .json()
                            .then((json) =>
                                reject({
                                    headers: error.headers,
                                    status: error.status,
                                    message: error.statusText,
                                    error: true,
                                    body: json,
                                })
                            )
                            .catch((e) => {
                                return error.text().then((text) => {
                                    reject({
                                        headers: error.headers,
                                        status: error.status,
                                        message: error.statusText,
                                        error: true,
                                        body: text,
                                    });
                                });
                            });
                    } catch (e) {
                        console.log('Fetch Error', error);
                        Sentry.captureException(error, {
                            tags: {
                                fetchUrl: url,
                            },
                        });
                        return reject({
                            headers: {},
                            status: 500,
                            message: 'An unknown error occurred',
                            error: true,
                            body: {
                                message: 'An unknown error occurred',
                                errors: {
                                    request: 'An unknown error occurred',
                                },
                            },
                        });
                    }
                });
        });
    }

    get(url, params = false) {
        return this.call({
            method: 'GET',
            url,
            params,
        });
    }

    post(url, body = {}, params = false) {
        return this.call({
            method: 'POST',
            url,
            body,
            params,
        });
    }

    put(url, body = {}, params = false) {
        return this.call({
            method: 'PUT',
            url,
            body,
            params,
        });
    }
};
