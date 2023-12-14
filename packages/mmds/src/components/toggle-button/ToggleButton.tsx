import React from 'react';
import { Button } from '../button';
import s from './ToggleButton.module.css';

interface ToggleButtonProps {
    toggleContext: string;
    handleContext1: () => void;
    handleContext2: () => void;
    context1: string;
    context2: string;
}

export const ToggleButton = ({
    toggleContext,
    handleContext1,
    handleContext2,
    context1,
    context2,
}: ToggleButtonProps) => {
    return (
        <div className={s.toggleButton}>
            <div className={s.toggleGenderButton}>
                <Button
                    variant={toggleContext === context1 ? 'secondary' : 'quite'}
                    label={context1}
                    onClick={handleContext1}
                />
                <Button
                    variant={toggleContext === context2 ? 'secondary' : 'quite'}
                    label={context2}
                    onClick={handleContext2}
                />
            </div>
        </div>
    );
};

export default ToggleButton;
