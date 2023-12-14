import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import LookbookWithPrismic from 'app/components/lookbook/withPrismic';

/**
 * Props for `Lookbook`.
 */
export type LookbookProps = SliceComponentProps<Content.LookbookSlice>;

/**
 * Component for "Lookbook" Slices.
 */
const Lookbook = ({ slice }: LookbookProps): JSX.Element => {
    return <LookbookWithPrismic slice={slice} />;
};

export default Lookbook;
