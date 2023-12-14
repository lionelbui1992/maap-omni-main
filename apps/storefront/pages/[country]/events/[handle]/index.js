import Event from 'pages/events/[handle]';
import { getContext } from '@lib/get-context';
import { Client } from 'helpers/prismic';
import { getCmsProps } from '../../index';

export async function getStaticProps({ params }) {
    const { handle, country } = params;

    const shopContext = getContext(country);
    const { language } = shopContext;

    const cmsProps = await getCmsProps(shopContext, language);
    let document = await Client().getByUID('landing_page', handle);

    if (!document || !document.tags.includes('maap-event')) document = null;

    return {
        props: {
            document,
            shopContext,
            ...cmsProps,
        },
        revalidate: 1800,
    };
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking',
    };
}

export default Event;
