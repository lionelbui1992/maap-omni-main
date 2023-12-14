import React from 'react';
import Wayfinder from '../../wayfinder';
import { WayfinderViewProps } from '../types';

export function WayfinderView({
    contentStructure,
    totalProductCount,
}: WayfinderViewProps): JSX.Element {
    return (
        <Wayfinder
            variant="pill"
            contentStructure={contentStructure}
            activeItem={contentStructure[0]}
            totalProductCount={totalProductCount}
        />
    );
}
