import React, {
    ReactNode,
    ReactElement,
    JSXElementConstructor,
    FC,
} from 'react';
// @ts-ignore
import s from './Columns.module.css';
import cn from 'clsx';

export interface ColumnsProps {
    children: ReactNode | any;
    columnsDirection: 'vertical' | 'horizontal';
    itemsWidth: boolean;
}

const Columns: FC<ColumnsProps> = (props) => {
    const { children, columnsDirection, itemsWidth = false } = props;

    const itemStyles = {
        margin: '20px',
        width: itemsWidth ? '20%' : '',
    };

    const rootClassName = cn(s.root, {
        [s.vertical]: columnsDirection === 'vertical',
        [s.horizontal]: columnsDirection === 'horizontal',
    });

    return (
        <div className={rootClassName}>
            {children.map(
                (
                    child: ReactElement<
                        any,
                        string | JSXElementConstructor<any>
                    >,
                    key: number
                ) => (
                    <div style={itemStyles} key={key}>
                        {child}
                    </div>
                )
            )}
        </div>
    );
};

Columns.displayName = 'Columns';

export default Columns;
