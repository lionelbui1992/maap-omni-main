import { Content } from '@prismicio/client';
import CtaBannerWithPrismic from 'app/components/cta-banner/withPrismic';
import { SliceComponentProps } from '@prismicio/react';

export type CTABannerSliceProps = SliceComponentProps<Content.CtaBannerSlice>;

const Index = ({ slice }: CTABannerSliceProps): JSX.Element => {
    return <CtaBannerWithPrismic slice={slice} />;
};

export default Index;
