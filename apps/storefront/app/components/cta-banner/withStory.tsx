import CTABanner from './CTABanner';
import { CTABannerBlock } from './types';

const withStory = (block: CTABannerBlock) => {
    return <CTABanner block={block} />;
};

export default withStory;
