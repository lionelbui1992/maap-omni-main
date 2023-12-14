import algoliasearch from 'algoliasearch';
import brandConfig from 'config/brandConfig';

export const getAlgoliaClient = () => {
    const client = algoliasearch(
        brandConfig.services.algolia.applicationID,
        brandConfig.services.algolia.apiKey
    );

    return client;
};

export async function getAllFromAlgoliaIndex(index) {
    if (!index) return [];

    const client = getAlgoliaClient();
    const browser = await client.initIndex(index).browseAll();
    let hits = [];

    return new Promise(function (resolve, reject) {
        browser.on('result', (content) => {
            hits = hits.concat(content.hits);
        });

        browser.on('end', () => {
            const handles = [];
            const uniqueHits = hits.filter(function (hit) {
                if (handles[hit.handle]) return false;
                handles[hit.handle] = true;
                return true;
            });

            resolve(uniqueHits);
        });

        browser.on('error', (error) => {
            reject(new Error(error));
        });
    });
}
