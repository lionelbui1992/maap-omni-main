import React from 'react';
import { dequal as deepEqual } from 'dequal';

/**
 * `useDeepCompareMemo` will only recompute the memoized value when one of the
 * `deps` has changed.
 *
 * Usage note: only use this if `deps` are objects or arrays that contain
 * objects. Otherwise you should just use React.useMemo.
 *
 */
function useDeepCompareMemo<T>(
    factory: () => T,
    dependencies: React.DependencyList
) {
    if (process.env.NODE_ENV !== 'production') {
        checkDeps(dependencies, 'useDeepCompareMemo');
    }

    return React.useMemo(factory, useDeepCompareMemoize(dependencies));
}

function checkDeps(deps: React.DependencyList, name: string) {
    const reactHookName = `React.${name.replace(/DeepCompare/, '')}`;

    if (!deps || deps.length === 0) {
        throw new Error(
            `${name} should not be used with no dependencies. Use ${reactHookName} instead.`
        );
    }
}

function useDeepCompareMemoize(value: React.DependencyList) {
    const ref = React.useRef<React.DependencyList>([]);

    if (!deepEqual(value, ref.current)) {
        ref.current = value;
    }

    return ref.current;
}

export default useDeepCompareMemo;
