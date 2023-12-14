'use client';

import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Icon } from '../../tokens/icons';
import cn from 'clsx';
import s from './Checkbox.module.css';

type CheckboxBaseProps = Pick<
    CheckboxPrimitive.CheckboxProps,
    'checked' | 'defaultChecked' | 'required' | 'disabled' | 'value'
>;
export interface CheckboxProps extends CheckboxBaseProps {
    label: string;
    id: string;
}

export const Checkbox = ({ label, id, ...rest }: CheckboxProps) => (
    <div className={s.root}>
        <CheckboxPrimitive.Root className={s.CheckboxRoot} id={id} {...rest}>
            <CheckboxPrimitive.Indicator className={s.CheckboxIndicator}>
                <Icon className={s.checkIcon} icon="check" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <label className={cn(s.Label, 'mmds-component-one')} htmlFor={id}>
            {label}
        </label>
    </div>
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
