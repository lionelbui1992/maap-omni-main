'use client';

import React, { useState } from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { RowSpacingIcon, Cross2Icon } from '@radix-ui/react-icons';
import './styles.css';

export interface CollapsibleProps {
    label: string;
}

export const Collapsible = ({ label, ...rest }: CollapsibleProps) => {
    const [open, setOpen] = useState(false);
    return (
        <CollapsiblePrimitive.Root
            className="CollapsibleRoot"
            open={open}
            onOpenChange={setOpen}
            {...rest}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <span className="Text" style={{ color: 'black' }}>
                    {label}
                </span>
                <CollapsiblePrimitive.Trigger asChild>
                    <button className="IconButton">
                        {open ? <Cross2Icon /> : <RowSpacingIcon />}
                    </button>
                </CollapsiblePrimitive.Trigger>
            </div>

            <div className="Repository">
                <span className="Text">@radix-ui/primitives</span>
            </div>

            <CollapsiblePrimitive.Content>
                <div className="Repository">
                    <span className="Text">@radix-ui/colors</span>
                </div>
                <div className="Repository">
                    <span className="Text">@stitches/react</span>
                </div>
            </CollapsiblePrimitive.Content>
        </CollapsiblePrimitive.Root>
    );
};

Collapsible.displayName = 'Collapsible';
export default Collapsible;
