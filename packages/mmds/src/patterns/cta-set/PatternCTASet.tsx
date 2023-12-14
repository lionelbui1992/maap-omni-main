import React from 'react';
import { Button, ButtonProps } from '../../components/button';
import s from './PatternCTASet.module.css';

export type CTAInput = Partial<Pick<ButtonProps, 'variant'>> &
    Pick<
        ButtonProps,
        'label' | 'hrefLink' | 'icon' | 'onClick' | 'disabled' | 'radiusSize'
    > & {
        active?: boolean;
    };

export type CTASet = CTAInput[];

export type CTASetProps = {
    set: CTASet;
};

export const PatternCTASet = ({ set }: CTASetProps) => {
    return (
        <div className={s.root}>
            {set.map((button: CTAInput) => {
                const { label, hrefLink, icon, onClick, disabled, radiusSize } =
                    button;
                // TODO: Update all the Prismic button to start with empty
                const variant = button.variant || 'secondary';
                return (
                    (button.hrefLink || button.variant) && (
                        <Button
                            variant={variant}
                            radiusSize={radiusSize}
                            hrefLink={hrefLink}
                            label={label}
                            icon={icon}
                            key={label || hrefLink}
                            onClick={onClick}
                            disabled={disabled}
                        />
                    )
                );
            })}
        </div>
    );
};

export default PatternCTASet;
