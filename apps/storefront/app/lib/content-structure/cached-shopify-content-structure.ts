import { cache } from 'react';
import {
    ContentStructure,
    ContentStructureGender,
    ContentStructureNavItem,
    ShopifyMenuItem,
} from '../content-structure/content-structure';
import { logError } from '../logger';
import { collections, getClient, menuByHandle } from '../shopify';
import { inferGenderFromUrl } from '../content-structure/infer-gender';
import { ShopifyClientContext } from '../../lib/shopify/client';

export const getContentStructure = cache(fetchAndAugmentContentStructure);

async function fetchAndAugmentContentStructure(
    clientSettings: ShopifyClientContext
): Promise<ContentStructure> {
    const responses: [ShopifyMenuItem[] | null, any | null] = await Promise.all(
        [
            fetchShopifyNavigation(clientSettings),
            fetchShopifyCollections(clientSettings),
        ]
    );

    const navigation: ShopifyMenuItem[] | null = responses[0];
    const collections: any = responses[1];

    if (!navigation) {
        return [];
    }

    const mappedContentStructure: ContentStructure = mapItemsToContentStructure(
        navigation,
        collections
    );

    return mappedContentStructure;
}

async function fetchShopifyCollections(
    clientSettings: ShopifyClientContext
): Promise<any | null> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getClient(clientSettings)
                .request.send({
                    query: collections,
                    variables: { next: { tags: ['collections'] } },
                })
                .then((data) => data);
            resolve(response.collections.nodes);
        } catch (error: unknown) {
            logError(error);
            reject(error);
            return null;
        }
    });
}

async function fetchShopifyNavigation(
    clientSettings: ShopifyClientContext
): Promise<ShopifyMenuItem[] | null> {
    return new Promise(async (resolve, reject) => {
        const navigationHandle =
            process.env.NEXT_PUBLIC_SHOPIFY_MAIN_MENU_HANDLE;
        if (!navigationHandle) {
            reject('Cannot fetch content struct, ENV variables missing');
            return null;
        }
        try {
            const response = await getClient(clientSettings)
                .request.send({
                    query: menuByHandle,
                    variables: {
                        handle: navigationHandle,
                        variables: { next: { tags: ['navigation'] } },
                    },
                })
                .then((data) => data);

            if (!response.menu) {
                reject(`No menu found for handle [${navigationHandle}]`);
                return null;
            }
            resolve(response.menu.items);
        } catch (error: unknown) {
            logError(error);
            reject(error);
            return null;
        }
    });
}

function itemMap(
    shopifyMenuItem: ShopifyMenuItem,
    collections: any[],
    parentGender: ContentStructureGender | null = null
): ContentStructureNavItem {
    const { title, url, items } = shopifyMenuItem;
    let children: ContentStructureNavItem[] = [];
    const gender = parentGender || inferGenderFromUrl(url);
    const hrefLink = url
        .replace(/.*\.myshopify.com/, '')
        .replace(/.*\.maap.cc/, '');
    const collection: any = collections?.find(
        (collection: any) => hrefLink === `/collections/${collection.handle}`
    );

    let count: number = 0;
    if (collection && collection.products) {
        count = collection.products.nodes.length;
    }
    if (items && items?.length > 0) {
        children = items.map((child: ShopifyMenuItem) =>
            itemMap(child, collections, gender)
        );
    }

    return {
        label: title,
        hrefLink,
        gender: gender,
        count,
        children,
    };
}

function mapItemsToContentStructure(
    items: ShopifyMenuItem[],
    collections: any[]
): ContentStructure {
    return items.map((item) => itemMap(item, collections));
}
