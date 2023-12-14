import { Content } from '@prismicio/client';
import BillboardWithPrismic from 'app/components/billboard/withPrismic';

import { SliceComponentProps } from '@prismicio/react';

export type BillboardSliceProps = SliceComponentProps<Content.BillboardSlice>;

const Index = ({ slice }: BillboardSliceProps): JSX.Element => {
    return <BillboardWithPrismic slice={slice} />;
};

export default Index;
