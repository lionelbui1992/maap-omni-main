import React from 'react';
import Callouts from './callouts/callouts';
import s from './layout.module.css';

export default async function CollectionsLayout({
    children,
}: {
    children: React.ReactNode;
}): Promise<React.ReactElement> {
    return (
        <div>
            <div className={s.root}>
                {children}
                <Callouts />
            </div>
        </div>
    );
}
