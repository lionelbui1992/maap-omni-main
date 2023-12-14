import React, { ReactNode, FC, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { getShopifyCollectionByHandleWithProductsForBundler } from '../../../helpers/collections';
import { mockBundlerGroups } from '@containers/Bundler/Mocks';
import { useShop } from '@lib/providers/ShopProvider';
import { useMutation } from '@apollo/react-hooks';
import {
    CHECKOUT_ADD_LINE_ITEM_MUTATION,
    CHECKOUT_CREATE_MUTATION,
} from '@lib/gql/checkout';
import { captureException } from '@sentry/nextjs';
import { getCheckoutId } from '../../../helpers/cookies';
import { useCart } from '@lib/providers/CartProvider';
import { CartProvider } from '@lib/providers/CartProviderTypes';
import { useUI } from '@lib/providers/UIProvider';
import { v4 as uuid } from 'uuid';
import {
    AddToCartObject,
    Bundle,
    BundleBuilderState,
    BundlerProviderProps,
    Collection,
    PrismicBundleDefinition,
    Product,
    Variant,
} from '../Types';

const emptyBundlerState: BundleBuilderState = {
    bundle: null,
    isFetching: true,
    selectedProduct: null,
    selectedCollectionKey: null,
    selectedCollectionHandle: null,
    fetchedCollections: [],
    chosenBundleVariants: {},
    selectedCollection: null,
    bundleSize: 0,
    bundleId: null,
};

export const BundlerContext = React.createContext<BundleBuilderState | any>(
    emptyBundlerState
);

const addUUIDs = (bundleDefinition) => {
    return bundleDefinition.map((bundle) => {
        return {
            ...bundle,
            collections: bundle.collections.map((collection) => {
                return {
                    ...collection,
                    key: uuid(),
                };
            }),
        };
    });
};

export const BundlerProvider: FC<BundlerProviderProps> = (props) => {
    const [bundlerState, setBundlerState] = useState(emptyBundlerState);
    const { query, isReady } = useRouter();
    const shopContext = useShop();
    const context = useShop();
    const { code: countryCode } = context;
    const { setCart } = useCart() as unknown as CartProvider;
    const { displayCartUI } = useUI();
    const checkoutId = getCheckoutId(null, countryCode);
    const bundleDefinition = addUUIDs(
        props.bundleDefinition || mockBundlerGroups
    );

    let initialBundlerState: BundleBuilderState = emptyBundlerState;
    let selections = null;

    useEffect(() => {
        if (!isReady) return;
        const loadState = async () => {
            let stateUpdates: { [key: string]: any } = {};
            const getSelectedBundleGroup = (definition) => {
                if (typeof query.bundle === 'string') {
                    return bundleDefinition.find(
                        (bundle) => bundle.handle === query.bundle
                    );
                }

                return definition[0];
            };

            const defaultGroup = getSelectedBundleGroup(bundleDefinition);
            initialBundlerState = {
                ...emptyBundlerState,
                bundle: defaultGroup,
                selectedCollectionKey: defaultGroup.collections[0].key,
                selectedCollectionHandle: defaultGroup.collections[0].handle,
                bundleSize: defaultGroup.collections.length,
            };

            if (!selections) {
                setBundlerState({
                    ...initialBundlerState,
                    isFetching: false,
                });
            }
        };
        loadState().catch((error) =>
            console.log(
                'loading state with optional pre selections via URL',
                error
            )
        );
    }, [isReady]);

    const getVariantNumber = (variantId: string): number => {
        return parseInt(variantId.split('gid://shopify/ProductVariant/')[1]);
    };

    const getBundleScriptPublicHash = (variantId) => {
        return (
            Number(process.env.NEXT_PUBLIC_BUNDLE_SCRIPT_PUBLIC_KEY) + variantId
        );
    };

    const checkoutAddLineItemVars = () => {
        const addToCartObject: AddToCartObject = {
            lineItems: [],
        };

        if (checkoutId) {
            addToCartObject.checkoutId = checkoutId;
        }

        Object.entries(bundlerState.chosenBundleVariants).forEach((entry) => {
            const variant = entry[1] as Variant;
            const { bundle } = bundlerState;

            if (!bundle) return;

            const { discountPercentage } = bundle;

            const variantNumber = getVariantNumber(variant.id);
            const discountValue =
                variantNumber +
                Number(process.env.NEXT_PUBLIC_BUNDLE_SCRIPT_PUBLIC_KEY) +
                Number(discountPercentage);

            addToCartObject?.lineItems.push({
                variantId: variant.id,
                quantity: 1,
                customAttributes: [
                    {
                        key: '_discount_value',
                        value: `${discountValue}`,
                    },
                    {
                        key: '_discount_verification',
                        value: `${getBundleScriptPublicHash(variantNumber)}`,
                    },
                    {
                        key: '_bundle_id',
                        value: `${bundlerState.bundleId}`,
                    },
                    {
                        key: '_bundle_title',
                        value: bundle.title,
                    },
                    {
                        key: '_bundle_handle',
                        value: bundle.handle,
                    },
                ],
            });
        });

        return addToCartObject;
    };

    const addToCartVars = () => ({ input: checkoutAddLineItemVars() });

    const [
        checkoutCreate,
        {
            loading: checkoutCreateMutationLoading,
            error: checkoutCreateMutationError,
            data: checkoutCreateMutationData,
        },
    ] = useMutation(CHECKOUT_CREATE_MUTATION, {
        variables: addToCartVars(),
        context: { clientName: countryCode },
        update(proxy, { data, data: { checkoutCreate } }) {
            console.log('checkoutCreate', checkoutCreate);
            setCart(checkoutCreate.checkout);
            displayCartUI();
        },
    });

    const [
        checkoutLineItemsAdd,
        {
            loading: checkoutLineItemsAddMutationLoading,
            error: checkoutLineItemsAddMutationError,
            data: checkoutLineItemsAddMutationData,
        },
    ] = useMutation(CHECKOUT_ADD_LINE_ITEM_MUTATION, {
        variables: checkoutAddLineItemVars(),
        context: { clientName: countryCode },
        update(proxy, { data: { checkoutLineItemsAdd } }) {
            console.log('checkoutLineItemsAdd', checkoutLineItemsAdd);
            setCart(checkoutLineItemsAdd.checkout);
            displayCartUI();
        },
    });

    if (checkoutCreateMutationError || checkoutLineItemsAddMutationError) {
        if (checkoutCreateMutationError) {
            console.log(
                'checkoutCreateMutationError',
                checkoutCreateMutationError
            );

            captureException(checkoutCreateMutationError.message);
        }
        if (checkoutLineItemsAddMutationError) {
            captureException(checkoutLineItemsAddMutationError.message);
            console.log(
                'checkoutLineItemsAddMutationError',
                checkoutLineItemsAddMutationError
            );
        }
    }

    const addBundleToCart = () => {
        // get checkout id again in case it has been changed by any other process
        const checkoutId = getCheckoutId(null, countryCode);

        if (checkoutId) {
            checkoutLineItemsAdd({
                variables: checkoutAddLineItemVars(),
            })
                .catch((e) => {
                    if (
                        e.message ===
                        'GraphQL error: Checkout is already completed.'
                    ) {
                        checkoutCreate().catch((e) => {
                            captureException(e);
                        });
                    }
                })
                .then(() => {
                    console.log('added to cart');
                    regenerateBundleId();
                });
        } else {
            checkoutCreate()
                .catch((e) => {
                    captureException(e);
                })
                .then(() => {
                    regenerateBundleId();
                });
        }
    };

    const reset = () => {
        setBundlerState(initialBundlerState);
    };

    const setBundle = (bundle: Bundle) => {
        setBundlerState({
            ...initialBundlerState,
            bundle: bundle,
            selectedCollectionHandle: bundle.collections[0].handle,
            selectedCollectionKey: bundle.collections[0].key,
        });
    };

    const regenerateBundleId = () => {
        const ID = uuid();
        setBundlerState({
            ...bundlerState,
            bundleId: ID,
        });
    };

    const setIsFetching = (isFetching: boolean) => {
        setBundlerState({
            ...bundlerState,
            isFetching: isFetching,
        });
    };

    const setSelectedProduct = (product: Product) => {
        setBundlerState({
            ...bundlerState,
            selectedProduct: product,
        });
    };

    const setSelectedCollection = (collection: Collection) => {
        setBundlerState({
            ...bundlerState,
            selectedCollection: collection,
        });
    };

    const setSelectedCollectionHandle = (handle: string) => {
        setBundlerState({
            ...bundlerState,
            selectedCollectionHandle: handle,
        });
    };

    const setSelectedCollectionKey = (key: string) => {
        if (!bundlerState?.bundle?.collections) return;

        const handle = bundlerState.bundle.collections.find(
            (collection) => collection.key === key
        )?.handle;

        if (!handle) return;

        setBundlerState({
            ...bundlerState,
            selectedCollectionKey: key,
            selectedCollectionHandle: handle,
        });
    };

    const getCollectionsSortedBySelection = () => {
        const collectionHasBeenChosen: any = (handle) =>
            !!bundlerState.chosenBundleVariants[handle];
        if (!bundlerState.bundle) return [];
        return bundlerState.bundle.collections.sort(function (a, b) {
            return (
                collectionHasBeenChosen(b.handle) -
                collectionHasBeenChosen(a.handle)
            );
        });
    };

    const getNextCollection = () => {
        if (!bundlerState.bundle) return null;

        const unselectedCollections = bundlerState.bundle.collections.filter(
            (collection) => {
                return (
                    Object.keys(bundlerState.chosenBundleVariants).indexOf(
                        collection.key
                    ) === -1
                );
            }
        );

        if (unselectedCollections[0]) {
            return unselectedCollections[0];
        }

        const nextCollectionPosition =
            bundlerState.bundle.collections.findIndex(
                (bundle) => bundle.key === bundlerState.selectedCollectionKey
            ) + 1;

        console.log(
            'Next',
            bundlerState.bundle.collections[nextCollectionPosition]
        );

        console.log('nextCollectionPosition', nextCollectionPosition);

        return bundlerState.bundle.collections[nextCollectionPosition];
    };

    useEffect(() => {
        // Go to next unselected collection when items are added to the bundle
        if (Object.keys(bundlerState.chosenBundleVariants).length === 0) return;
        let nextCollection = getNextCollection();
        console.log('chosen items updated', nextCollection);
        if (nextCollection) {
            const updatedState: BundleBuilderState = {
                ...bundlerState,
                selectedCollectionKey: nextCollection.key,
                selectedCollectionHandle: nextCollection.handle,
            };

            setBundlerState(updatedState);
        }
    }, [bundlerState.chosenBundleVariants]);

    const addVariantToBundle = (variant: Variant) => {
        const { chosenBundleVariants, selectedCollectionKey } = bundlerState;
        if (!selectedCollectionKey) return;
        const newBundleVariants = Object.assign({}, chosenBundleVariants);
        newBundleVariants[selectedCollectionKey] = variant;
        const bundleId = uuid();
        const updatedState: BundleBuilderState = {
            ...bundlerState,
            chosenBundleVariants: newBundleVariants,
            bundleId,
        };

        setBundlerState(updatedState);
    };

    const getSelectedCollection = () => {
        const { selectedCollectionHandle, fetchedCollections } = bundlerState;
        const selectedCollection = fetchedCollections.find(
            (collection) => collection.handle === selectedCollectionHandle
        );
        if (selectedCollection) {
            setSelectedCollection(selectedCollection);
            return selectedCollection;
        }
        return null;
    };

    const getChosenProductHandleForCollection = (collectionKey: string) => {
        if (!bundlerState.chosenBundleVariants[collectionKey]) return null;

        return bundlerState.chosenBundleVariants[collectionKey].product.handle;
    };

    const getSelectedProductForCollection = (bundleCollection: Collection) => {
        const { selectedCollectionKey } = bundlerState;

        if (!selectedCollectionKey) return null;

        let firstProductInCollection = bundleCollection.products.edges[0].node;

        const chosenProductHandle = getChosenProductHandleForCollection(
            selectedCollectionKey
        );

        if (chosenProductHandle) {
            const chosenProduct = bundleCollection.products.edges.find(
                (edge) => edge.node.handle === chosenProductHandle
            );

            if (chosenProduct) {
                firstProductInCollection = chosenProduct.node;
            }
        }

        return firstProductInCollection;
    };

    useEffect(() => {
        const { selectedCollectionHandle } = bundlerState;

        if (!selectedCollectionHandle) return;

        const cachedCollection = getSelectedCollection();

        if (cachedCollection) {
            const defaultProductSelection =
                getSelectedProductForCollection(cachedCollection);

            setBundlerState({
                ...bundlerState,
                selectedCollection: cachedCollection,
                selectedProduct: defaultProductSelection,
            });
            return;
        }

        const fetchCollectionIfNeeded = async () => {
            setIsFetching(true);
            const bundleCollection =
                await getShopifyCollectionByHandleWithProductsForBundler(
                    shopContext,
                    selectedCollectionHandle,
                    true
                );

            const defaultProductSelection =
                getSelectedProductForCollection(bundleCollection);

            setBundlerState({
                ...bundlerState,
                selectedCollection: bundleCollection,
                selectedProduct: defaultProductSelection,
                fetchedCollections: [
                    bundleCollection,
                    ...bundlerState.fetchedCollections,
                ],
                isFetching: false,
            });
        };

        fetchCollectionIfNeeded().catch((error) => {
            console.log(
                `Couldn\'t fetch collection [${selectedCollectionHandle}] because ... `,
                error
            );
            setIsFetching(false);
        });
    }, [isReady, bundlerState.selectedCollectionKey]);

    const assertBundleIsComplete = () => {
        const { bundle, chosenBundleVariants } = bundlerState;
        if (!bundle) return false;
        return (
            Object.keys(chosenBundleVariants).length ===
            bundle.collections.length
        );
    };

    const value = useMemo(
        () => ({
            ...bundlerState,
            bundleDefinition,
            setBundle,
            reset,
            setSelectedProduct,
            setSelectedCollectionKey,
            setSelectedCollectionHandle,
            getCollectionsSortedBySelection,
            addVariantToBundle,
            getSelectedCollection,
            addBundleToCart,
            assertBundleIsComplete,
        }),
        [bundlerState]
    );

    return <BundlerContext.Provider value={value} {...props} />;
};

export const useBundler = () => {
    const context = React.useContext(BundlerContext);
    if (context === undefined) {
        throw new Error(`useBundler must be used within the Bundler`);
    }
    return context;
};

type ManagedBundlerProviderProps = {
    bundleDefinition: PrismicBundleDefinition;
    children?: ReactNode;
};

export const ManagedBundlerProvider: FC<ManagedBundlerProviderProps> = ({
    children,
    bundleDefinition,
}) => (
    <BundlerProvider bundleDefinition={bundleDefinition}>
        {children}
    </BundlerProvider>
);
