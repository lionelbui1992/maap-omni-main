import React from 'react';
import SecondLevel from './SecondLevel';
import { globalStyles } from './styles';

const MegaNav = ({ megaNav }) => {
    if (!megaNav) return '';

    return (
        <nav className="category_navigation">
            <SecondLevel megaNav={megaNav} />
            <style jsx>{globalStyles}</style>
        </nav>
    );
};

export default MegaNav;
