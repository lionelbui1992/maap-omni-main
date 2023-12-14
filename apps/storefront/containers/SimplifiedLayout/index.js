import { CartProvider } from '@lib/providers/CartProvider';
import { LoopProvider } from '@lib/providers/LoopProvider';
import { ProfileProvider } from '@lib/providers/ProfileProvider';
import BrandHeader from 'containers/BrandHeader';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import PropTypes from 'prop-types';

import ErrorBoundary from '@containers/ExceptionsHandling/ErrorBoundary/ErrorBoundary';
import ChildrenOrSearch from 'components/ChildrenOrSearch';
import FooterNavigation from 'containers/FooterNavigation';

import { ManagedShopProvider } from '@lib/providers/ShopProvider';

const ContextSwitcherModal = dynamic(() =>
    import('@containers/ContextSwitcherModal')
);
const SwitchRegionPrompt = dynamic(() =>
    import('@containers/SwitchRegionPrompt')
);

const SidebarUI = dynamic(() => import('@components/Sidebar/SidebarUI'));

import { styles } from './styles';

const SimplifiedLayout = (props) => {
    const { shopContext, children } = props;

    if (!shopContext) {
        throw new Error(
            'SimplifiedLayout layout requires a context from the server to pass to ManagedShopProvider'
        );
    }

    const {
        code: regionCode,
        nostoAccountID,
        klaviyoCompanyID,
        pinterestTagId,
        pinterestContactEmail,
    } = shopContext;

    return (
        <>
            <ManagedShopProvider ctx={shopContext}>
                <ProfileProvider regionCode={regionCode}>
                    <LoopProvider>
                        <CartProvider regionCode={regionCode}>
                            <header>
                                <SwitchRegionPrompt />
                                <BrandHeader {...props} />
                            </header>
                            <ErrorBoundary withinLayout>
                                <main role="main">
                                    <ChildrenOrSearch>
                                        {children}
                                    </ChildrenOrSearch>
                                </main>
                            </ErrorBoundary>
                            <footer>
                                <FooterNavigation {...props} />
                                <ContextSwitcherModal />
                            </footer>
                            <SidebarUI regionCode={regionCode} {...props} />
                            <Script
                                strategy="afterInteractive"
                                id="ze-snippet"
                                src="https://static.zdassets.com/ekr/snippet.js?key=88e48c99-2339-48c8-86f2-45da47af6e2f"
                            />
                            <Script
                                strategy="afterInteractive"
                                id="nosto-scripts"
                                src={`https://connect.nosto.com/include/${nostoAccountID}`}
                                onLoad={() => {
                                    if (typeof nostojs !== 'undefined') {
                                        nostojs((api) =>
                                            api.setAutoLoad(false)
                                        );
                                    }
                                }}
                            />
                            <Script
                                src="https://s.pinimg.com/ct/core.js"
                                id="pintrk-scripts"
                                strategy="afterInteractive"
                                onLoad={() => {
                                    if (!window.pintrk) {
                                        window.pintrk = function () {
                                            window.pintrk.queue.push(
                                                Array.prototype.slice.call(
                                                    arguments
                                                )
                                            );
                                        };
                                        let n = window.pintrk;
                                        (n.queue = []), (n.version = '3.0');
                                    }
                                    pintrk('load', pinterestTagId, {
                                        em: pinterestContactEmail,
                                    }); //
                                    pintrk('page');
                                }}
                            />
                            <Script
                                strategy="afterInteractive"
                                src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${klaviyoCompanyID}`}
                                onLoad={() => {
                                    if (
                                        window !== undefined &&
                                        window._learnq === undefined
                                    ) {
                                        window._learnq = [];
                                    }
                                }}
                            />
                            <Script
                                strategy="beforeInteractive"
                                src={`https://cmp.osano.com/AzZVb9THSVMwP4LtK/7cee66db-8e74-4787-90b8-7d1ff79ce58e/osano.js`}
                                onLoad={() => {
                                    Osano.cm.addEventListener(
                                        'osano-cm-consent-saved',
                                        (data) => {
                                            window.cookie_consent = data;
                                        }
                                    );
                                }}
                            />
                            <style jsx>{styles}</style>
                        </CartProvider>
                    </LoopProvider>
                </ProfileProvider>
            </ManagedShopProvider>
        </>
    );
};

SimplifiedLayout.propTypes = {
    Page: PropTypes.func,
    shopContext: PropTypes.objectOf(PropTypes.any),
    children: PropTypes.any,
};

export default SimplifiedLayout;
