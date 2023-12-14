import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import { breakpointMedium } from 'config/styles/breakpoints';

const ExpandableTextBlock = ({ block }) => {
    const { short_description, long_description } = block;
    const [readMore, setReadMore] = useState(true);
    const linkText = readMore ? '< Read Less' : 'Read More >';
    const dots = !readMore ? '...' : '';
    const title = !readMore ? 'ReadMore' : 'ReadLess';

    const useIsomorphicLayoutEffect =
        typeof window !== 'undefined' ? useLayoutEffect : () => {};

    useIsomorphicLayoutEffect(() => {
        setReadMore(false);
    }, []);

    return (
        <>
            <section>
                <div className="expandable_text">
                    <div>
                        {RichText.render(short_description)}
                        {dots}
                        {readMore && RichText.render(long_description)}
                        <a
                            className="expandable_text__expand_link"
                            onClick={() => {
                                setReadMore(!readMore);
                            }}
                            title={title}
                        >
                            {linkText}
                        </a>
                    </div>
                </div>
            </section>
            <style jsx>
                {`
                    section {
                        background-color: rgb(231, 231, 231);
                    }
                    .expandable_text {
                        display: flex;
                        flex-wrap: wrap;
                        font-size: 1.5em;
                        line-height: 1.5em;
                        padding: 35px 55px;
                        font-weight: 300;
                        box-sizing: border-box;
                        width: 50%;
                    }
                    .expandable_text__expand_link {
                        text-decoration: underline;
                        text-align: left;
                        padding: 5px 0 5px 10px;
                        cursor: pointer;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .expandable_text {
                            padding: 20px 30px;
                            font-size: 0.85rem;
                            font-weight: 300;
                            width: 100%;
                            line-height: 1.7em;
                        }
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .expandable_text p {
                        margin: 0;
                        display: inline;
                        word-wrap: break-word;
                    }
                    .expandable_text p a {
                        text-decoration: underline;
                        color: inherit;
                    }
                `}
            </style>
        </>
    );
};

ExpandableTextBlock.propTypes = {
    block: PropTypes.object.isRequired,
};

export default ExpandableTextBlock;
