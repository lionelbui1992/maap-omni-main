import SwiperProductFeaturesVariant from '@app/components/swiper/SwiperProductFeatures.variant';
import { SwiperVariant, SwiperItem } from '@app/components/swiper/type';
import s from './product-features.module.css';

const ProductFeatures = ({ features }) => {
    // In cases where content managers have included more feature descriptions than feature images, we  filter those features out first
    const filteredFeatures = features.filter((feature) => feature.image);
    const block = {
        variant: 'product_features' as SwiperVariant,
        items: filteredFeatures.map((feature) => ({
            desktopImage: feature.image?.desktopImage,
            mobileImage: feature.image?.mobileImage,
            description: feature.description,
        })) as SwiperItem[],
        context: 'Features',
    };

    return (
        <div className={s.container}>
            <SwiperProductFeaturesVariant block={block} />
        </div>
    );
};

export default ProductFeatures;
