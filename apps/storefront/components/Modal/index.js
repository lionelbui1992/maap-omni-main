import React, { useEffect } from 'react';
import ReactModal from 'react-modal';

let pageYOffset = 0;

const Modal = ({
    isOpen = false,
    ariaHideApp = true,
    contentLabel,
    onAfterOpen,
    onRequestClose,
    modalClass,
    overlayClassName,
    children,
    mountNode = 'body',
}) => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            ReactModal.setAppElement(mountNode);
        }
    });

    const afterOpen = () => {
        document.querySelector('body').style.overflowY = 'hidden';
        pageYOffset = window.pageYOffset;
        if (onAfterOpen) {
            onAfterOpen();
        }
    };

    const afterClose = () => {
        document.querySelector('body').style.overflowY = 'scroll';
        window.scroll(0, pageYOffset);
    };

    const requestClose = () => {
        if (onRequestClose) {
            onRequestClose();
        }
    };

    return (
        <>
            <ReactModal
                isOpen={isOpen}
                contentLabel={contentLabel}
                onRequestClose={requestClose}
                onAfterOpen={afterOpen}
                onAfterClose={afterClose}
                className={modalClass}
                overlayClassName={overlayClassName}
                ariaHideApp={ariaHideApp}
                shouldFocusAfterRender={false}
                bodyOpenClassName="react-modal-html-body--open"
            >
                <>{children}</>
            </ReactModal>
            <style jsx>
                {`
                    .react-modal-html-body--open {
                        overflow: hidden;
                    }
                `}
            </style>
        </>
    );
};

export default Modal;
