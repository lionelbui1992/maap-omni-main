export const buttonStyles = (type, button_colour, button_text_colour) => {
    switch (type) {
        case 'Outlined':
            return {
                border: `1px solid${button_colour}`,
                backgroundColor: 'transparent',
                color: button_text_colour,
            };
        case 'Link':
            return {
                border: 'none',
            };
        case 'Filled In':
        default:
            return {
                border: 'none',
                backgroundColor: button_colour,
                color: button_text_colour,
            };
    }
};
