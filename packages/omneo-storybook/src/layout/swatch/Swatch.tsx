import React, {
    forwardRef,
    ButtonHTMLAttributes,
    JSXElementConstructor,
    FC,
} from 'react';
// @ts-ignore
import s from './Swatch.module.css';

const convertRGBAToHex = (rgba: string | any) => {
    rgba = rgba.match(
        /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
    );
    return rgba && rgba.length === 4
        ? '#' +
              ('0' + parseInt(rgba[1], 10).toString(16)).slice(-2) +
              ('0' + parseInt(rgba[2], 10).toString(16)).slice(-2) +
              ('0' + parseInt(rgba[3], 10).toString(16)).slice(-2)
        : '';
};

export interface SwatchProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    Component?: string | JSXElementConstructor<any>;
    className?: string;
    colour?: string | number | any;
    title?: string;
    variableName?: string;
    backgroundColor?: string;
}

const Swatch: FC<SwatchProps> = forwardRef((props) => {
    const {
        Component = 'div',
        backgroundColor,
        variableName,
        className,
        colour,
        title,
        style = {},
        ...rest
    } = props;

    const regexExtractRGBANumber = /^rgba\(((,?\s*\d+){4}).+$/;
    const simplifiedRGBA = colour?.replace(regexExtractRGBANumber, '$1');

    return (
        <>
            <div className={s.root}>
                <Component
                    className={s.swatch}
                    data-variant={colour}
                    style={{
                        backgroundColor: colour,
                        ...style,
                    }}
                    {...rest}
                ></Component>
                <div className={s.colour}>
                    <div className={s.swatchTitle}>{title}</div>
                    <div className={s.swatchColor}>
                        {convertRGBAToHex(colour)}
                    </div>
                    <div className={s.swatchColor}>{simplifiedRGBA}</div>
                    <div className={s.swatchVariableName}>{variableName}</div>
                </div>
            </div>
        </>
    );
});

Swatch.displayName = 'Swatch';

export default Swatch;
