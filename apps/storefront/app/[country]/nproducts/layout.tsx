import React from 'react';

export default async function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}): Promise<React.ReactElement> {
    return (
        <div>
            <div>{children}</div>
        </div>
    );
}
