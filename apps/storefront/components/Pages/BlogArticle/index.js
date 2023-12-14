import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import BlogBreadcrumb from '../../BlogBreadcrumb';
import BlogCarousel from '../../RelatedBlogArticles';

const BlogArticle = ({ prismicDocument }) => {
    const blocks = prismicDocument.data?.body;

    // converts slice_type name eg: blog_hero_block to BlogHeroBlock
    const capitalizeBlock = block => {
        const splitWords = block.slice_type.split('_');
        const upperCaseSliceWord = splitWords.map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1, word.length);
        });
        return upperCaseSliceWord.join('');
    };

    return (
        <>
            <BlogBreadcrumb blockTitle={prismicDocument.data?.title} />
            {blocks.map((block, key) => {
                const DynamicComponent = dynamic(() =>
                    import(
                        `components/PrismicBlogSlices/${capitalizeBlock(block)}`
                    )
                );
                return (
                    <div key={key}>
                        <DynamicComponent
                            block={block.primary}
                            items={block.items}
                        />
                    </div>
                );
            })}
            <BlogCarousel />
        </>
    );
};

BlogArticle.propTypes = {
    prismicDocument: PropTypes.object.isRequired,
};

export default BlogArticle;
