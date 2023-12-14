export const fontStyles = (font_family, font_size, colour) => {
    let fontStyles = {};

    if (font_family) {
        fontStyles['fontFamily'] = font_family;
    }

    if (colour) {
        fontStyles['color'] = colour;
    }

    if (font_size) {
        fontStyles['fontSize'] = font_size;
    }

    return fontStyles;
};

export const contentAlignStyles = position => {
    if (!position) {
        return null;
    }

    switch (position.toLowerCase()) {
        case 'left':
            return {
                textAlign: 'left',
                alignItems: 'flex-start',
            };
        case 'right':
            return {
                textAlign: 'right',
                alignItems: 'flex-end',
            };
        default:
            return {
                textAlign: 'center',
                alignItems: 'center',
                margin: '0 auto',
            };
    }
};

export const blockSpacing = (
    isFullWidth,
    isMobile,
    width,
    paddingTop,
    paddingBottom,
    paddingTopMobile,
    paddingBottomMobile
) => {
    return {
        maxWidth: isFullWidth ? '100%' : `${width || '1276'}px`,
        paddingTop: isMobile
            ? `${paddingTopMobile || paddingTopMobile === 0 ? paddingTopMobile : '20'}px`
            : `${paddingTop || paddingTop === 0 ? paddingTop : '60'}px`,
        paddingBottom: isMobile
            ? `${paddingBottomMobile || paddingBottomMobile === 0 ? paddingBottomMobile : '20'}px`
            : `${paddingBottom || paddingBottom === 0 ? paddingBottom : '60'}px`,
    };
};
