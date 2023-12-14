import React from 'react';
import Modal from 'react-responsive-modal';
import ContextSwitcher from 'containers/ContextSwitcher/index';
import { useUI } from '@lib/providers/UIProvider';

const ContextSwitcherModal = () => {
    const { displayLocaleUI, toggleLocaleUI } = useUI();

    const closeIconPath = (
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g stroke="#000000" strokeWidth="1">
                <g>
                    <line x1="0" y1="0" x2="36" y2="36" />
                    <line x1="36" y1="0.2421875" x2="0" y2="36" />
                </g>
            </g>
        </g>
    );

    return (
        <Modal
            open={displayLocaleUI}
            onClose={toggleLocaleUI}
            closeIconSvgPath={closeIconPath}
            center
            little
        >
            <ContextSwitcher />
        </Modal>
    );
};

export default ContextSwitcherModal;
