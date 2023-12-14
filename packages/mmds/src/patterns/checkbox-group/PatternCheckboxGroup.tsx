'use client';

import React from 'react';
import Checkbox from '../../components/checkbox';
import s from './PatternCheckboxGroup.module.css';

type Option = {
    value: string;
    label: string;
};

type CheckboxGroupProps = {
    options: Option[];
};

export const PatternCheckboxGroup = ({ options }: CheckboxGroupProps) => (
    <div className={s.root}>
        {options.map(({ value, label }, index) => (
            <Checkbox
                key={value}
                label={label}
                value={value}
                id={`c${index + 1}`}
            />
        ))}
    </div>
);
