import Fetch from './fetch';

module.exports = config => {
    const { klaviyo_api_domain, klaviyo_api_key } = config;
    return new Fetch(`https://${klaviyo_api_domain}/api`, {
        headers: {
            'api-key': `${klaviyo_api_key}`,
        },
    });
};
