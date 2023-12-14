export type NavIconName =
    | 'globe'
    | 'discover'
    | 'northeast'
    | 'right'
    | 'left'
    | 'down';

export type IconName =
    | 'profile'
    | 'logo'
    | 'bag'
    | 'menu'
    | 'close'
    | 'search'
    | 'bookmarkfilled'
    | ('bookmarkunfilled' & GlobalIconName)
    | 'plus'
    | 'minus'
    | 'check'
    | 'circle';

export type IconGeneratorType = ({
    ...props
}: {
    [x: string]: any;
}) => React.JSX.Element;
export type IconGeneratorTypeWithNull = IconGeneratorType | null;

export type IconMapping = {
    [key in IconName]: IconGeneratorType;
};
