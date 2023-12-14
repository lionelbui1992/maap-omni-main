import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import { brandBackgroundGrey, brandBlack } from '@config/styles/colours';
import { breakpointMedium } from '@config/styles/breakpoints';
import BlogArticleCard from '../BlogArticleCard';

import dynamic from 'next/dynamic';

// Prevent React hydration errors caused by 'loop' prop
// The loop prop causes the server and client to initialise with different numbers of slides,
// and thus different data-swiper-slide-index values.
const SwiperNoSSR = dynamic(
    () => import('swiper/react').then((mod) => mod.Swiper),
    {
        ssr: false,
    }
);

const RelatedBlogArticles = ({ articles }) => {
    if (!articles || !articles.length) return null;

    return (
        <>
            <div className="blog_carousel__title">Related Stories</div>
            <div className="blog_carousel">
                <SwiperNoSSR
                    slidesPerView={2}
                    spaceBetween={0}
                    slidesPerGroup={2}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                    modules={[Navigation]}
                    className="blog_carousel__swiper"
                    navigation
                    loop
                >
                    {articles.map((article) => {
                        const { handle, body, created_at, image, title } =
                            article;
                        return (
                            <SwiperSlide
                                key={`relatedArticle_${handle}`}
                                className="blog_carousel__slide"
                            >
                                <BlogArticleCard
                                    handle={handle}
                                    body={body}
                                    published_at={created_at}
                                    imageUrl={image}
                                    title={title}
                                />
                            </SwiperSlide>
                        );
                    })}
                </SwiperNoSSR>
            </div>
            <style jsx>
                {`
                    .blog_carousel__title {
                        font-size: 1.5em;
                        font-weight: 300;
                        padding: 30px 0 30px 40px;
                    }
                    .blog_carousel {
                        background-color: ${brandBackgroundGrey};
                    }
                    a {
                        color: ${brandBlack};
                        text-decoration: none;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .blog_carousel__title {
                            text-align: center;
                            padding: 20px 0;
                        }
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .blog_carousel__slide {
                        padding: 40px;
                        box-sizing: border-box;
                    }
                    .blog_carousel .swiper {
                        background-color: rgb(237, 237, 237);
                        z-index: 0;
                    }
                    .blog_carousel .swiper-pagination {
                        display: none;
                    }
                    .blog_carousel .swiper-button-next:after,
                    .blog_carousel .swiper-button-prev:after {
                        color: rgb(0, 0, 0);
                        font-size: 30px;
                    }
                `}
            </style>
        </>
    );
};

export default RelatedBlogArticles;
