import React, { Fragment } from 'react';

import dynamic from 'next/dynamic';

const Tiles = dynamic(() => import('@containers/Prismic/Tiles'));
const Video = dynamic(() => import('@containers/Prismic/VideoBlock'));
const HeroBlock = dynamic(() => import('@containers/Prismic/HeroBlock'));
const FabricInfo = dynamic(() => import('@containers/Prismic/FabricInfo'));
const CountdownBlock = dynamic(() => import('@containers/Prismic/Countdown'));
const ContentBlock = dynamic(() => import('@containers/Prismic/ContentBlock'));
const FeatureBlock = dynamic(() => import('@containers/Prismic/FeatureBlock'));

const MonumentBlock = dynamic(() =>
    import('@containers/Prismic/MonumentBlock')
);
const MonumentTiles = dynamic(() =>
    import('@containers/Prismic/MonumentTiles')
);
const MonumentVimeoVideo = dynamic(() =>
    import('@containers/Prismic/MonumentVimeoVideo')
);
const MonumentYoutubeVideo = dynamic(() =>
    import('@containers/Prismic/MonumentYoutubeVideo')
);
const JobDescription = dynamic(() =>
    import('@containers/Prismic/JobDescription')
);
const HyperTextStack = dynamic(() =>
    import('@containers/Prismic/HyperTextStack')
);
const AccordionBlock = dynamic(() =>
    import('@containers/Prismic/AccordionBlock')
);
const TemperatureInfo = dynamic(() =>
    import('@containers/Prismic/TemperatureInfo')
);
const ProductCarousel = dynamic(() =>
    import('@containers/Prismic/ProductCarousel')
);
const NewsletterSignUp = dynamic(() =>
    import('@containers/Prismic/NewsletterSignup')
);
const ProductVideoBlock = dynamic(() =>
    import('@containers/Prismic/ProductVideoBlock')
);
const YouTubeVideoBlock = dynamic(() =>
    import('@containers/Prismic/YouTubeVideoBlock')
);
const AdvancedHeroBlock = dynamic(() =>
    import('@containers/Prismic/AdvancedHeroBlock')
);
const ProductImagesBlock = dynamic(() =>
    import('@containers/Prismic/ProductImagesBlock')
);
const ExpandableTextBlock = dynamic(() =>
    import('@containers/Prismic/ExpandableTextBlock')
);
const TwoColumnsLookBlock = dynamic(() =>
    import('@containers/Prismic/TwoColumnsLookBlock')
);
const CollectionHeroBlock = dynamic(() =>
    import('@containers/Prismic/CollectionHeroBlock')
);
const MonumentShopifyVideo = dynamic(() =>
    import('@containers/Prismic/MonumentShopifyVideo')
);

const TwoColumnsCollectionBlock = dynamic(() =>
    import('@containers/Prismic/TwoColumnsCollectionBlock')
);
const TitleDescriptionImageBlock = dynamic(() =>
    import('@containers/Prismic/TitleDescriptionImageBlock')
);
const TwoColumnsMultiRowLookBlock = dynamic(() =>
    import('@containers/Prismic/TwoColumnsMultiRowLookBlock')
);

const BlogTiles = dynamic(() =>
    import('@components/PrismicBlogSlices/BlogTiles')
);

const BlogAdvancedHeroBlock = dynamic(() =>
    import('@components/PrismicBlogSlices/BlogHeroBlock')
);

const BlogContentBlock = dynamic(() =>
    import('@components/PrismicBlogSlices/BlogContentBlock')
);

const ChallengeEventFormBlock = dynamic(() =>
    import('@containers/Prismic/ChallengeEventFormBlock')
);

const TwoColumnBlock = dynamic(() =>
    import('@components/PrismicBlogSlices/TwoColumnBlock')
);

const BundlerSlice = dynamic(() => import('@containers/Prismic/Bundler'));

const PrismicRecommendationsBlock = dynamic(() =>
    import('@containers/Prismic/RecommendationsBlock')
);

const LegacyBlockWrapper = ({ children, key }) => (
    <div className="block" key={key}>
        {children}
        <style jsx>
            {`
                .block {
                    flex: 1 0 100%;
                }
            `}
        </style>
    </div>
);

const CarouselLegacyBlockWrapper = ({ children, key }) => (
    <div className="block" key={key}>
        {children}
        <style jsx>
            {`
                .block {
                    width: 100%;
                }
            `}
        </style>
    </div>
);

export const RenderBlock = ({ block, isMobile, isTablet, index }) => {
    if (!block) return '';
    const key = `${block.blockType}_${index}`;
    switch (block?.blockType?.toLowerCase()) {
        case 'bundler':
            return <BundlerSlice block={block.data} key={key} />;
        case 'carousel':
            return (
                <CarouselLegacyBlockWrapper>
                    <ProductCarousel
                        block={block.data}
                        items={block.items}
                        isTablet={isTablet}
                        key={key}
                    />
                </CarouselLegacyBlockWrapper>
            );
        case 'hero_block':
            return (
                <LegacyBlockWrapper>
                    <HeroBlock
                        block={block.data}
                        items={block.items}
                        isMobile={isMobile}
                        key={key}
                    />
                </LegacyBlockWrapper>
            );
        case 'content_block_ssr':
            return (
                <LegacyBlockWrapper>
                    <ContentBlock
                        block={block.data}
                        items={block.items}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        key={key}
                    />
                </LegacyBlockWrapper>
            );
        case 'advanced_hero_block_ssr':
        case 'advanced_hero_block':
            return (
                <LegacyBlockWrapper>
                    <AdvancedHeroBlock
                        block={block.data}
                        items={block.items}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        key={key}
                    />
                </LegacyBlockWrapper>
            );
        case 'collection_hero_block_ssr':
            return (
                <LegacyBlockWrapper>
                    <CollectionHeroBlock
                        block={block.data}
                        items={block.items}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        key={key}
                    />
                </LegacyBlockWrapper>
            );
        case 'two_columns_look_block_ssr':
        case 'two_columns_look_block':
            return (
                <LegacyBlockWrapper>
                    <TwoColumnsLookBlock
                        block={block.data}
                        items={block.items}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        key={key}
                    />
                </LegacyBlockWrapper>
            );
        case 'tiles_ssr':
        case 'tiles':
            return (
                <LegacyBlockWrapper>
                    <Tiles
                        block={block.data}
                        items={block.items}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        key={key}
                    />
                </LegacyBlockWrapper>
            );
        case 'two_columns_multi_row_look_ssr':
        case 'two_columns_multi_row_look':
            return (
                <LegacyBlockWrapper>
                    <TwoColumnsMultiRowLookBlock
                        block={block.data}
                        items={block.items}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        key={key}
                    />
                </LegacyBlockWrapper>
            );
        case 'video':
            return (
                <LegacyBlockWrapper>
                    <Video
                        block={block.data}
                        items={block.items}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        key={key}
                    />
                </LegacyBlockWrapper>
            );
        case 'youtube_video':
            return (
                <LegacyBlockWrapper>
                    <YouTubeVideoBlock
                        block={block.data}
                        items={block.items}
                        key={key}
                    />
                </LegacyBlockWrapper>
            );
        case 'fabric_info':
            return (
                <LegacyBlockWrapper>
                    <FabricInfo
                        block={block.data}
                        items={block.items}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        key={key}
                    />
                </LegacyBlockWrapper>
            );
        case 'temperature':
            return (
                <LegacyBlockWrapper>
                    <TemperatureInfo
                        block={block.data}
                        items={block.items}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        key={key}
                    />
                </LegacyBlockWrapper>
            );
        case 'pdp_video':
            return (
                <LegacyBlockWrapper>
                    <ProductVideoBlock
                        block={block.data}
                        items={block.items}
                        key={key}
                    />
                </LegacyBlockWrapper>
            );
        case 'product_images':
            return (
                <LegacyBlockWrapper>
                    <ProductImagesBlock
                        block={block.data}
                        items={block.items}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        key={key}
                    />
                </LegacyBlockWrapper>
            );
        case 'feature_block':
            return (
                <LegacyBlockWrapper>
                    <FeatureBlock
                        block={block.data}
                        items={block.items}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        key={key}
                    />
                </LegacyBlockWrapper>
            );
        case 'two_column_collection':
            return (
                <LegacyBlockWrapper>
                    <TwoColumnsCollectionBlock
                        block={block.data}
                        items={block.items}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        key={key}
                    />
                </LegacyBlockWrapper>
            );
        case 'title_description_image_block':
            return (
                <LegacyBlockWrapper>
                    <TitleDescriptionImageBlock
                        block={block.data}
                        items={block.items}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        key={key}
                    />
                </LegacyBlockWrapper>
            );
        case 'blog_tiles':
            return (
                <LegacyBlockWrapper>
                    <BlogTiles
                        block={block.data}
                        items={block.items}
                        key={key}
                    />
                </LegacyBlockWrapper>
            );
        case 'two_column_block':
            return (
                <LegacyBlockWrapper>
                    <TwoColumnBlock
                        items={block.items}
                        block={block.data}
                        key={key}
                    />
                </LegacyBlockWrapper>
            );
        case 'blog_hero_block':
            return (
                <LegacyBlockWrapper>
                    <BlogAdvancedHeroBlock block={block.data} key={key} />
                </LegacyBlockWrapper>
            );
        case 'blog_content_block':
            return (
                <LegacyBlockWrapper>
                    <BlogContentBlock block={block.data} key={key} />
                </LegacyBlockWrapper>
            );
        case 'hyper_text_stack':
            return <HyperTextStack block={block.data} items={block.items} />;
        case 'job_description':
            return (
                <LegacyBlockWrapper>
                    <JobDescription block={block.data} />
                </LegacyBlockWrapper>
            );
        case 'expandable_text_block':
            return (
                <LegacyBlockWrapper>
                    <ExpandableTextBlock block={block.data} key={key} />
                </LegacyBlockWrapper>
            );
        case 'monument_static':
            return <MonumentBlock block={block.data} items={block.items} />;
        case 'countdown':
            return <CountdownBlock block={block.data} items={block.items} />;
        case 'newsletter_signup':
            return <NewsletterSignUp block={block.data} items={block.items} />;
        case 'monument_tiles':
            return <MonumentTiles block={block.data} items={block.items} />;
        case 'monument_vimeo_video':
            return (
                <MonumentVimeoVideo block={block.data} items={block.items} />
            );
        case 'monument_youtube_video':
            return (
                <MonumentYoutubeVideo block={block.data} items={block.items} />
            );
        case 'monument_shopify_video':
            return (
                <MonumentShopifyVideo block={block.data} items={block.items} />
            );
        case 'accordion_block':
            return <AccordionBlock block={block.data} items={block.items} />;
        case 'challenge_page_form': // name should be challenge_event_form
            return (
                <ChallengeEventFormBlock
                    block={block.data}
                    items={block.items}
                />
            );
        case 'product_recommendations_block':
            return (
                <CarouselLegacyBlockWrapper>
                    <PrismicRecommendationsBlock block={block.data} />
                </CarouselLegacyBlockWrapper>
            );
        default:
            return '';
    }
};

const PrismicSliceRenderer = ({ blocks, isMobile, isTablet }) => (
    <Fragment>
        <div className="prismicContent">
            {blocks.map((block, key) => {
                return (
                    <RenderBlock
                        block={block}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        key={key}
                        index={key}
                    />
                );
            })}
            <style jsx>
                {`
                    .prismicContent {
                        display: flex;
                        flex-wrap: wrap;
                    }
                `}
            </style>
        </div>
    </Fragment>
);

export default PrismicSliceRenderer;
