'use client';

import React from 'react';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import cn from 'clsx';
import s from './RadioGroup.module.css';

export interface RadioGroupProps {
    options: { label: string; value: string }[];
    checked?: boolean;
    ariaLabel?: string;
}

export const RadioGroup = ({
    options,
    ariaLabel,
    ...rest
}: RadioGroupProps) => (
    <form>
        <RadixRadioGroup.Root
            className={s.RadioGroupRoot}
            defaultValue={options[0]?.value || ''}
            aria-label={ariaLabel}
            {...rest}
        >
            {options.map((option, index) => (
                <div key={option.value} className={s.wrapper}>
                    <RadixRadioGroup.Item
                        className={s.RadioGroupItem}
                        value={option.value}
                        id={`r${index + 1}`}
                    >
                        <RadixRadioGroup.Indicator
                            className={s.RadioGroupIndicator}
                        />
                    </RadixRadioGroup.Item>
                    <label
                        className={cn(s.Label, 'mmds-component-one')}
                        htmlFor={`r${index + 1}`}
                    >
                        {option.label}
                    </label>
                </div>
            ))}
        </RadixRadioGroup.Root>
    </form>
);

RadioGroup.displayName = 'RadioGroup';
export default RadioGroup;
