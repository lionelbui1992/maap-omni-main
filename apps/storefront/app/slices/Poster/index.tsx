import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import PostersWithPrismic from 'app/components/poster/withPrismic';

/**
 * Props for `Poster`.
 */
export type PosterProps = SliceComponentProps<Content.PosterSlice>;

/**
 * Component for "Poster" Slices.
 */
const Poster = ({ slice }: PosterProps): JSX.Element => {
    return <PostersWithPrismic slice={slice} />;
};

export default Poster;
