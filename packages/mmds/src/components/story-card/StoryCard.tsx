import React, { Suspense } from 'react';
import { StoryCardProps } from './types';
import LinkManager from '../link-manager/LinkManager';
import StaticImage from '../static-image';
import { Button } from '../button';
import s from './StoryCard.module.css';
import cn from 'clsx';

export const StoryCard = ({
    title,
    excerpt,
    publishedDate,
    imageSrc,
    hrefLink,
}: StoryCardProps) => {
    return (
        <Suspense fallback={<div>Loading story card...</div>}>
            <LinkManager
                applyLink={!!hrefLink}
                href={hrefLink}
                title={`Go to Story ${title}`}
            >
                <div className={s.image}>
                    <StaticImage
                        desktopImage={imageSrc}
                        mobileImage={imageSrc}
                        altDescription={`Product Image for ${title}`}
                        fullWidth={true}
                    />
                    <div className={s.content}>
                        <div className={s.titles}>
                            <h2 className={cn(s.title, 'mmds-copy-three')}>
                                {title}
                            </h2>
                            <div className={cn(s.date, 'mmds-copy-three')}>
                                {publishedDate}
                            </div>
                            <div
                                className={cn(
                                    s.excerpt,
                                    'mmds-copy-three-serif'
                                )}
                            >
                                {excerpt}
                            </div>
                        </div>
                        <Button variant="text" label="Call to Action" />
                    </div>
                </div>
            </LinkManager>
        </Suspense>
    );
};

export default StoryCard;
