import React from 'react';
import {
    brandBlack,
    brandSelectedGrey,
    brandWhite,
} from 'config/styles/colours';

const Button = ({
    alt,
    className,
    onClick,
    disabled,
    text,
    wide,
    noMargin = false,
    flex = true,
    fontSize = '1.25em',
}) => (
    <>
        <button
            title={alt}
            className={`button ${className} ${
                disabled ? 'button--disabled' : ''
            } ${wide ? 'button--wide' : ''}`}
            onClick={onClick}
            disabled={disabled}
            type="button"
        >
            {text}
        </button>
        <style jsx>
            {`
                .button {
                    ${flex ? `display: flex` : ''};
                    ${flex ? `flex-wrap: wrap;` : ''};
                    ${flex ? `flex-direction: row;` : ''};
                    ${flex ? `justify-content: center;` : ''};
                    ${noMargin ? '' : 'margin: 20px 0 5px 0;'};
                    text-transform: uppercase;
                    width: 100%;
                    color: ${brandWhite};
                    border-radius: 50px;
                    background-color: ${brandBlack};
                    cursor: pointer;
                    font-size: ${fontSize};
                    font-weight: 300 !important;
                    border: none;
                }
                .button--disabled {
                    color: ${brandBlack};
                    background-color: ${brandSelectedGrey};
                    border: 1px solid ${brandBlack};
                    cursor: initial;
                }
                .button--wide {
                    padding: 16px 60px;
                }
                .button--ghost {
                    color: ${brandBlack};
                    background-color: transparent;
                    border: 1px solid ${brandBlack};
                    cursor: pointer;
                    padding: 15px 18px;
                    font-size: 1.15em;
                }
            `}
        </style>
    </>
);

export default Button;
