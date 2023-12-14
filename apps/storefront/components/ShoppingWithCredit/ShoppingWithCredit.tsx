import React, { FC, useState } from 'react';
import CancelState from '@components/ShoppingWithCredit/CancelState';
import DefaultState from '@components/ShoppingWithCredit/DefaultState';

const DISPLAY_STATE_DEFAULT = 'default';
const DISPLAY_STATE_CANCEL = 'cancel';

const ShoppingWithCredit: FC = () => {
    const [displayState, setDisplayState] = useState<string>(
        DISPLAY_STATE_DEFAULT
    );

    if (displayState === DISPLAY_STATE_CANCEL) {
        return (
            <CancelState
                openDefaultState={() => setDisplayState(DISPLAY_STATE_DEFAULT)}
            />
        );
    }

    return (
        <DefaultState
            openCancelState={() => setDisplayState(DISPLAY_STATE_CANCEL)}
        />
    );
};

export default ShoppingWithCredit;
