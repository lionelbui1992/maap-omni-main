import Swiper from './Swiper';
import { SwiperBlock } from './type';

const withStory = (block: SwiperBlock) => {
    return <Swiper block={block} />;
};

export default withStory;
