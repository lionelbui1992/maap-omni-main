import React from 'react';
import { useUI } from '@lib/providers/UIProvider';
import { styles } from './styles';

const Overlay = () => {
    const { displaySidebar } = useUI();

    return (
        <>
            <div
                className={`overlay-sidebar${
                    displaySidebar ? ' overlay-sidebar--active' : ''
                }`}
            />
            <style jsx>{styles}</style>
        </>
    );
};

export default Overlay;
