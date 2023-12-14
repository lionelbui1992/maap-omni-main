import SwiperPDPGalleryVariant from '@app/components/swiper/SwiperPDPGallery.variant';
import { CartButton, SizeSelector } from 'mmds';
import { SwiperVariant, SwiperItem } from '@app/components/swiper/type';
import { GALLERY_ORDER } from '../constants';
import cn from 'clsx';
import s from './product-hero.module.css';

const ProductHero = ({ product, images }) => {
    const galleryImages = GALLERY_ORDER.map((pattern) => {
        const matchingImage = images.find((image) =>
            image.src.includes(pattern)
        );
        if (matchingImage) {
            return {
                desktopImage: matchingImage.src,
                mobileImage: matchingImage.src,
                altText: matchingImage.alt || 'product image',
            };
        }
        return null;
    }).filter((image) => image);

    const galleryBlock = {
        variant: 'pdp_gallery' as SwiperVariant,
        items: galleryImages as SwiperItem[],
        context: '',
    };

    const sizes =
        product.options.find((option) => option.name === 'Size')?.values || [];

    return (
        <>
            <div className={cn(s.cover)}>
                <div className={cn(s.repel, s.overview)}>
                    <div className={s.mixBlend}>
                        <h1 className={cn(s.title, 'mmds-title-two')}>
                            {product.title}
                        </h1>
                    </div>
                    <div className={cn(s.cluster, 'hidden-on-mobile')}>
                        {sizes.map((size) => (
                            <SizeSelector
                                key={size}
                                state="default"
                                label={size}
                            />
                        ))}
                        <CartButton state="default" label="select" />
                    </div>
                </div>
                <SwiperPDPGalleryVariant block={galleryBlock} />
            </div>
            <hr className="divider hidden-on-mobile" />
            <div className={cn('hidden-on-desktop', s.buy)}>
                <div className={cn(s.cluster)}>
                    {sizes.map((size) => (
                        <SizeSelector key={size} state="default" label={size} />
                    ))}
                    <CartButton state="default" label="select" />
                </div>
            </div>
        </>
    );
};

export default ProductHero;
