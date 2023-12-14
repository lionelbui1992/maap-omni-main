'use client';

import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Icon } from '../../tokens/icons';
import cn from 'clsx';
import s from './Accordion.module.css';

interface AccordionProps {
    items?: {
        header: string;
        content: React.ReactNode;
    }[];
    type?: any;
    defaultValue?: string;
}

export interface AccordionItem extends AccordionProps {
    header: string;
    content: React.ReactNode;
}

export const Accordion = ({
    items = [],
    type = 'single',
    defaultValue,
    ...rest
}: AccordionProps) => {
    return (
        <AccordionPrimitive.Root
            className={s.AccordionRoot}
            type={type}
            defaultValue={defaultValue}
            collapsible
            {...rest}
        >
            {items.map(({ header, content }, i) => (
                <AccordionPrimitive.Item
                    className={s.AccordionItem}
                    key={`header-${i}`}
                    value={`item-${i + 1}`}
                >
                    <AccordionPrimitive.Header
                        className={cn(s.AccordionHeader, 'mmds-component-one')}
                    >
                        <AccordionPrimitive.Trigger
                            className={s.AccordionTrigger}
                            {...rest}
                        >
                            <span>{header}</span>
                            <Icon
                                className={s.AccordionPlus}
                                icon="plus"
                                aria-hidden
                            />
                            <Icon
                                className={s.AccordionMinus}
                                icon="minus"
                                aria-hidden
                            />
                        </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>
                    <AccordionPrimitive.Content
                        className={cn(s.AccordionContent, 'mmds-component-one')}
                        {...rest}
                    >
                        <div>{content}</div>
                    </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
            ))}
        </AccordionPrimitive.Root>
    );
};

Accordion.displayName = 'Accordion';

export default Accordion;
