import { LookbookOverlayProps } from './type';
import Lookbook from './Lookbook';

const withStory = ({ block, overlayLookbook }: LookbookOverlayProps) => {
    return <Lookbook block={block} overlayLookbook={overlayLookbook} />;
};

export default withStory;
