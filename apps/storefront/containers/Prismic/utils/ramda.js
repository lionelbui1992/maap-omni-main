import ascend from 'ramda/src/ascend';
import sortWith from 'ramda/src/sortWith';
import prop from 'ramda/src/prop';

export const isInLeftColumn = (n) => n.select_column === 'Left';
export const isInRightColumn = (n) => n.select_column === 'Right';

export const isInRowOne = (n) => n.select_row === 'One';
export const isInRowTwo = (n) => n.select_row === 'Two';

export const sortBlocksForMobile = sortWith([
    ascend(prop('sort_order_in_mobile')),
]);
