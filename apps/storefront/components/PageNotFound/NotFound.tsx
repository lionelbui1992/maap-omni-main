import React, { useEffect } from 'react';
import Link from 'next/link';
import { useShop } from '@lib/providers/ShopProvider';

import styles from './NotFound.module.css';

const NotFound = () => {
    const { routePrefix } = useShop();

    const routeURL = `/${routePrefix ? `${routePrefix}/` : ''}`;

    return (
        <>
            <div className={styles.root}>
                <div className={styles.message}>
                    <h1>SORRY</h1>
                    <p>
                        The page you are looking for may not exist or may be
                        incorrect.
                    </p>
                </div>
                <Link
                    href="https://support.maap.cc/hc/en-us"
                    className={styles.link}
                >
                    Customer Support
                </Link>
                <div className={styles.features}>
                    <div className={styles.feature}>
                        <Link href={`${routeURL}collections/maap-new-arrivals`}>
                            SHOP MAN
                        </Link>
                    </div>
                    <div className={styles.feature}>
                        <Link
                            href={`${routeURL}collections/new-arrivals-woman`}
                        >
                            SHOP WOMAN
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFound;
