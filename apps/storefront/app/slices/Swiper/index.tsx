import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import SwiperWithPrismic from 'app/components/swiper/withPrismic';

/**
 * Props for `Swiper`.
 */
export type SwiperProps = SliceComponentProps<Content.SwiperSlice>;

/**
 * Component for "Swiper" Slices.
 */
const Index = ({ slice }: SwiperProps): JSX.Element => {
    return <SwiperWithPrismic slice={slice} />;
};

export default Index;
