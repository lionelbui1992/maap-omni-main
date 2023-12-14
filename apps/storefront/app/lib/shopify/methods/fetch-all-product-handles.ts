import fetchProduct from '../../../lib/shopify/methods/fetch-product';

export default async function fetchAllProductHandles(handles: string[]) {
    if (!Array.isArray(handles)) {
        console.error('Invalid product handles', handles);
        return [];
    }

    const fetchProductPromises = handles.map((handle) => fetchProduct(handle));

    return Promise.all(fetchProductPromises);
}
