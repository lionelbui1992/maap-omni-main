import { Icon } from 'mmds';
import { ICON_MAPPING } from '../constants';
import cn from 'clsx';
import s from './product-details.module.css';

const ProductDetails = ({ details }: ProductDetailsProps) => {
    return (
        <article className={cn(s.region, s.stack, s.details)}>
            <h2 className="mmds-component-one-detail">Details</h2>
            <ul role="list" className={s.cluster}>
                {details.map((detail, index) => {
                    if (ICON_MAPPING[detail] && detail) {
                        return (
                            <li
                                className={cn(
                                    s.cluster,
                                    s.detail,
                                    'mmds-subtitle-three'
                                )}
                                key={`${detail}-${index}`}
                                data-nowrap
                            >
                                <Icon icon={ICON_MAPPING[detail]} />
                                {detail}
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
        </article>
    );
};

export default ProductDetails;
