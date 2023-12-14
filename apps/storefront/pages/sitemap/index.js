import Sitemap, { getStaticProps as superGSP } from '../[country]/sitemap';

export default Sitemap;

export async function getStaticProps() {
    return superGSP({ params: { country: 'intl' } });
}
