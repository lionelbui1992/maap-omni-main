import { getClient, collectionByHandleProductHandles } from 'app/lib/shopify';
import { logError } from 'app/lib/logger';

const collectionByHandleCount = (handle: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        getClient()
            ?.fetch({
                operation: collectionByHandleProductHandles,
                variables: {
                    handle,
                },
            })
            .then((data) => {
                if (data.error) {
                    logError(data.error);
                    reject(data.error);
                }
                console.log(
                    'length of collection',
                    data.data?.collection?.products?.nodes?.length
                );

                //UNTESTED.
                resolve(data.data?.collection?.products?.nodes?.length);
            })
            .catch((error) => {
                logError(error);
                reject(error);
            });
        setTimeout(() => {
            resolve(414);
        }, 3000);
    });
};

export default collectionByHandleCount;
