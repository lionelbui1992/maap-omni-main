import React from 'react';
import ChallengeOrEventForm from 'components/ChallengeOrEventForm';

function index({ block, items }) {
    return (
        <>
            <ChallengeOrEventForm formItems={items} formAttributes={block} />
        </>
    );
}

export default index;
