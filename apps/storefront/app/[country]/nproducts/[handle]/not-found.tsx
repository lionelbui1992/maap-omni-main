import React from 'react';
import styles from '@components/PageNotFound/NotFound.module.css';
import Link from 'next/link';

export default function NotFound() {
    return (
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
                    <Link href={`collections/maap-new-arrivals`}>SHOP MAN</Link>
                </div>
                <div className={styles.feature}>
                    <Link href={`collections/new-arrivals-woman`}>
                        SHOP WOMAN
                    </Link>
                </div>
            </div>
        </div>
    );
}
