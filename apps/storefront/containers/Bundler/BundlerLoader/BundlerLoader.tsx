import React, { ReactNode } from 'react';
import { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import ContentLoader from 'react-content-loader';
import styles from './BundlerLoader.module.css';

type BundleLoaderProps = {
    numberOfImages: number;
    width: string | number;
    height: string | number;
};

const BundlerLoader: FC<BundleLoaderProps> = ({
    numberOfImages,
    width,
    height,
}) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' });
    const collectionLoaderStyle = isTabletOrMobile
        ? styles.collectionImageBundlerLoaderMobile
        : styles.collectionImageBundlerLoaderDesktop;

    const jsx: ReactNode[] = [];
    for (let i = 0; i < numberOfImages; i++) {
        jsx.push(
            <ContentLoader
                speed={2}
                width={`${width}`}
                height={`${height}`}
                viewBox={`0 0 ${width} ${height}`}
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
                key={`${Math.random()}__contentLoader`}
                uniquekey="content_loader_bundler_key"
            >
                <rect
                    x="0.5"
                    y="0.5"
                    rx="0"
                    ry="0"
                    width={width}
                    height={height}
                />
            </ContentLoader>
        );
    }
    return (
        <div
            key={`${Math.random()}__bundlerLoader`}
            className={
                numberOfImages === 1
                    ? styles.swiperImageBundlerLoader
                    : collectionLoaderStyle
            }
        >
            {jsx}
        </div>
    );
};

export default BundlerLoader;
