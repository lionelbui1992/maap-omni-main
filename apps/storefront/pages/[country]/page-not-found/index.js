import React from 'react';
import PageNotFound from '@components/PageNotFound/NotFound';
import { getContext } from '@lib/get-context';
import SimplifiedLayout from '@containers/SimplifiedLayout';
import { getCmsProps } from '../index';

const PageNotFoundPage = ({ ...globals }) => {
    return (
        <SimplifiedLayout {...globals}>
            <PageNotFound />
        </SimplifiedLayout>
    );
};

export async function getStaticProps({ params }) {
    const { country } = params;
    const shopContext = getContext(country);
    const cmsProps = await getCmsProps(shopContext, shopContext.language);

    return {
        props: {
            shopContext,
            ...cmsProps,
        },
        revalidate: 900,
    };
}

export async function getStaticPaths() {
    const paths = [
        '/us/page-not-found',
        '/uk/page-not-found',
        '/eu/page-not-found',
    ];

    return {
        paths,
        fallback: false,
    };
}

export default PageNotFoundPage;
