import Poster from './Poster';
import { PostersBlock } from './types';

const withStory = (block: PostersBlock) => {
    return <Poster block={block} />;
};

export default withStory;
