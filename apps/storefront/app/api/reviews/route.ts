import { NextRequest, NextResponse } from 'next/server';

export type ReviewRequestQuery = {
    region: string;
    sku: string;
};

export type Review = {
    id: number;
    sku: string;
    date_created: string;
    date_created_string: string;
    author: string;
    verified: boolean;
    title: string;
    review: string;
    raw?: any;
};

export type ReviewsResponseBody =
    | {
          count: number;
          average: number;
          reviews: Review[];
          comfort: number;
          performance: number;
          fit: number;
          settings: { [key: string]: any };
      }
    | {
          error: string;
      };

export async function GET(
    request: NextRequest
): Promise<NextResponse<ReviewsResponseBody>> {
    if (!request.url) {
        return NextResponse.json({
            error: 'Missing URL from request.',
        });
    }
    const url = new URL(request.url);
    const sku = url.searchParams.get('sku');
    if (!sku) {
        return NextResponse.json({
            error: 'Missing SKU from params.',
        });
    }
    const requestParams = new URLSearchParams({ sku, store: 'maap' });
    try {
        const stream = await fetch(
            `https://api.reviews.io/product/review?${requestParams}`,
            {
                next: {
                    revalidate: 3600,
                    tags: ['product', 'products', 'reviews'],
                },
            }
        );
        const payload = await stream.json();
        const comfort = payload.ratings.find(
            (rating) => rating.rating_text === 'Comfort'
        );
        const performance = payload.ratings.find(
            (rating) => rating.rating_text === 'Performance'
        );
        const fit = payload.ratings.find(
            (rating) => rating.rating_text === 'Fit'
        );
        const reviews = payload.reviews.data.map((review: any): Review => {
            const { reviewer, product } = review;
            const author =
                reviewer.first_name !== 'Anonymous'
                    ? `${reviewer.first_name} X.`
                    : 'A MAAP Customer';
            return {
                id: review.product_review_id,
                author,
                verified: review.reviewer.verified_buyer === 'yes',
                sku: product.sku,
                date_created: review.date_created,
                date_created_string: review.timeago,
                title: review.title,
                review: review.review,
            };
        });
        const body = {
            count: payload.stats.count,
            average: payload.stats.average,
            comfort: comfort.average_rating,
            performance: performance.average_rating,
            fit: fit.average_rating,
            reviews: reviews,
            settings: payload.settings,
        };
        return NextResponse.json(body);
    } catch (error) {
        return NextResponse.json({
            error: error.message,
        });
    }
}
