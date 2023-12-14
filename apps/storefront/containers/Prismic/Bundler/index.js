import React from 'react';
import Bundler from 'containers/Bundler';

const BundlerSlice = ({ block, items }) => {
    const { bundle_definition } = block;
    // console.log('Bundle Prismic block', block);

    try {
        const bundleDefinition = JSON.parse(bundle_definition);

        // console.log('bundleDefinition parsed', bundleDefinition);

        return <Bundler bundleDefinition={bundleDefinition} />;
    } catch (e) {
        console.log('Error parsing bundle definition', e);
    }

    return <div>There was a problem with the bundle definition.</div>;
};

export default BundlerSlice;
