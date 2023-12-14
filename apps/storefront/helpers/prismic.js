import Prismic from 'prismic-javascript';
import { accessToken, apiEndpoint } from './prismicConfiguration';
import brandConfig from 'config/brandConfig';

export const getClient = (req) => {
    const options = Object.assign(
        {},
        req ? { req } : {},
        accessToken ? { accessToken } : {}
    );
    const instance = Prismic.client(apiEndpoint, options);

    return () => {
        return instance;
    };
};

export const Client = (req) => {
    return getClient(req)();
};

export const blockTransformer = (block) => {
    return {
        blockType: block.slice_type,
        data: block.primary,
        items: block.items,
    };
};

export const prismicLandingPageParser = (doc, type) => {
    let blocks = null;

    if (!doc.data) {
        console.log('No Prismic Data');
        return;
    }

    if (type === 'uid') {
        blocks = doc.data.body;
    } else {
        if (!doc.results) return null;
        if (!doc.results[0]) return null;
        blocks = doc.results[0].data.body;
    }

    return blocks.map((block) => {
        return {
            blockType: block.slice_type,
            data: block.primary,
            items: block.items,
        };
    });
};

export const findDocByUID = (
    docs,
    uid,
    lang,
    defaultLang = brandConfig.defaultLanguage
) => {
    let doc = docs.find((doc) => doc.uid === uid && doc.lang === lang);
    if (!doc) {
        doc = docs.find((doc) => doc.uid === uid && doc.lang === defaultLang);
    }
    return doc;
};

// ctx is important for previews.
export const getDocumentsByTag = async (tags, localeCode = '*', req) => {
    const documents = await Client(req)
        .query(Prismic.Predicates.any('document.tags', tags), {
            lang: localeCode,
        })
        .then(function (response) {
            return response.results;
        })
        .catch((e) => {
            return e;
        });

    return documents;
};

export const getAllPrismicArticlesWithType = async (type, localeCode = '*') => {
    return await Client()
        .query(Prismic.Predicates.at(`document.type`, type), {
            lang: localeCode,
        })
        .then((response) => response.results)
        .catch((e) => {
            return e;
        });
};

export default Client;
