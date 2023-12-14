import { ProductDescriptionProps } from './types';
import { PatternLanguageIntro } from 'mmds';

const ProductDescription = ({ description }: ProductDescriptionProps) => {
    return <PatternLanguageIntro context="Description" content={description} />;
};

export default ProductDescription;
