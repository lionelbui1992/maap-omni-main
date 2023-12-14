import Billboard from './Billboard';
import { BillboardBlock } from './types';

const withStory = (block: BillboardBlock) => {
    return <Billboard block={block} />;
};

export default withStory;
