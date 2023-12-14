'use client';

import React from 'react';
import { useState } from 'react';
import cn from 'clsx';
import s from './product-specs.module.css';

const formatKey = (key) => {
    // Split the key by camelCase and join with a space
    return key
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/^\w/, (c) => c.toUpperCase());
};

const ProductSpecs = ({ fabric, temperature }) => {
    const [isCentigrade, setIsCentigrade] = useState(true);
    const fabricEntries: [string, any][] = Object.entries(fabric);
    const tempRange = temperature?.temperatureRange?.primary;
    const {
        temperature_low_in_c,
        temperature_high_in_c,
        temperature_low_in_f,
        temperature_high_in_f,
    } = tempRange || {};
    const ridingConditions =
        temperature?.temperatureRange?.primary?.riding_condition_values[0]
            ?.text;

    const tempRangeInC = `${temperature_low_in_c || '-'}-${
        temperature_high_in_c || '-'
    } DEGREES`;
    const tempRangeInF = `${temperature_low_in_f || '-'}-${
        temperature_high_in_f || '-'
    } DEGREES`;

    return (
        <div className={cn(s.specs, s.region)}>
            <div className={s.stack}>
                <h3 className="mmds-component-one-detail">Specifications</h3>
                <dl>
                    <hr className="divider" />
                    {fabricEntries.map(([key, value]) => (
                        <React.Fragment key={key}>
                            <div key={key} className={s.row}>
                                <dt className={cn(s.label, 'mmds-copy-one')}>
                                    {formatKey(key)}
                                </dt>
                                <dd className="mmds-copy-one-detail">
                                    {value.toUpperCase()}
                                </dd>
                            </div>
                        </React.Fragment>
                    ))}
                </dl>
            </div>
            <div className={s.stack}>
                <h3 className="mmds-component-one-detail">Usage</h3>
                <dl>
                    <hr className="divider" />
                    <div className={s.row}>
                        <dt className={cn(s.label, 'mmds-copy-one')}>
                            Temperature Range
                        </dt>
                        <dd className={cn(s.cluster, 'mmds-copy-one-detail')}>
                            {isCentigrade ? tempRangeInC : tempRangeInF}
                            <button
                                onClick={() => setIsCentigrade(true)}
                                className={isCentigrade ? s.selected : ''}
                            >
                                C
                            </button>
                            <button
                                onClick={() => setIsCentigrade(false)}
                                className={!isCentigrade ? s.selected : ''}
                            >
                                F
                            </button>
                        </dd>
                    </div>
                    <div className={s.row}>
                        <dt className={cn(s.label, 'mmds-copy-one')}>
                            Riding Conditions
                        </dt>
                        <dd className="mmds-copy-one-detail">
                            {ridingConditions}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default ProductSpecs;
