import React from 'react';
// @ts-ignore
import s from './Spacing.module.css';

export interface SpacingProps {
    width: string;
    height: string;
    name: string;
    variable: string;
}

const Spacing = ({ width, height, name, variable }: SpacingProps) => {
    return (
        <div className={s.root}>
            <div
                style={{ width: width, height: height }}
                className={s.spacing}
            />
            <div className={s.description}>{name}</div>
            <div className={s.variable}>{variable}</div>
        </div>
    );
};

Spacing.displayName = 'Spacing';
export default Spacing;
