import React from 'react';
import {
    breakpointMedium,
    breakpointExtraSmall,
    breakpointSmall,
} from 'config/styles/breakpoints';

const VariantOptionsList = ({
    optionName,
    variantOptions,
    unavailableOptions,
    selectedOption,
    callback,
}) => {
    const uniqueOptions = [
        ...new Set(variantOptions.map((option) => option[optionName])),
    ];

    const shortFormSizeName = (longForm) => {
        switch (longForm.toLowerCase()) {
            case 'extra':
                return 'X';
            case 'small':
                return 'S';
            case 'medium':
                return 'M';
            case 'large':
                return 'L';
            default:
                return longForm;
        }
    };

    return (
        <nav>
            {uniqueOptions.map((option) => {
                const disabled =
                    unavailableOptions &&
                    unavailableOptions.indexOf(option) !== -1;
                return (
                    <a
                        onClick={() => callback(option)}
                        className={`${disabled ? 'disabled' : ''}
                             ${selectedOption === option ? 'selected' : ''}
                             `}
                        key={option}
                    >
                        {option
                            ?.split(' ')
                            .map((segment) => shortFormSizeName(segment))}
                    </a>
                );
            })}

            <style jsx>
                {`
                    nav {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        flex-basis: 100%;
                        padding-top: 16px;
                        padding-bottom: 10px;
                    }
                    a {
                        flex: 1 1 10%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        -webkit-tap-highlight-color: transparent;
                        border-right: 1px solid rgba(0, 0, 0, 0.5);
                        border-top: 1px solid rgba(0, 0, 0, 0.5);
                        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
                        color: rgba(0, 0, 0);
                        font-weight: 300;
                        padding: 11px;
                        line-height: 1em;
                    }
                    a:first-child {
                        border-left: 1px solid rgba(0, 0, 0, 0.5);
                    }
                    a:nth-child(7) {
                        border-left: 1px solid rgba(0, 0, 0, 0.5);
                    }
                    a:nth-child(n + 7) {
                        border-top: none;
                    }
                    a.disabled {
                        text-decoration: unset;
                    }
                    a.selected {
                        background-color: rgb(0, 0, 0);
                        color: rgb(255, 255, 255);
                    }
                    @media (max-width: ${breakpointMedium}) {
                        a {
                            flex: 1 1 12%;
                        }
                    }
                    // @media (max-width: ${breakpointSmall}) {
                    //     a {
                    //         flex: 1 1 10%;
                    //     }
                    // }
                    @media (max-width: ${breakpointExtraSmall}) {
                        a {
                            flex: 1 1 7%;
                        }
                    }
                    @media (min-width: 300px) and (max-width: 680px) {
                        a {
                            flex: 1 1 9%;
                        }
                    }
                    @media (min-width: 435px) and (max-width: 720px) {
                        a {
                            flex: 1 1 11%;
                        }
                    }
                    @media (min-width: 540px) and (max-width: 720px) {
                        a {
                            flex: 1 1 12%;
                        }
                    }
                `}
            </style>
        </nav>
    );
};

export default VariantOptionsList;
