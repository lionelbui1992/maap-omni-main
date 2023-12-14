import { useCallback, useMemo } from 'react';
import {
    ContentStructure,
    ContentStructureNavItem,
    UseContentStructureProvides,
} from './content-structure';

// Lose matcher because we may not always have all the properties
// when calling one of the functions such as getNavFromNode
const assertLoseNodeMatch = (
    node: ContentStructureNavItem,
    comparisonNode: ContentStructureNavItem
) => {
    if (
        node?.hrefLink &&
        comparisonNode?.hrefLink &&
        node.hrefLink === comparisonNode.hrefLink &&
        node.gender === comparisonNode.gender
    ) {
        return true;
    }
    return (
        node.label === comparisonNode.label &&
        node.gender === comparisonNode.gender
    );
};

export function useContentStructure(
    structure: ContentStructure
): UseContentStructureProvides {
    const getNavFromNode = useCallback(
        (
            node: ContentStructureNavItem | null = null
        ): ContentStructureNavItem[] | null => {
            if (!node) {
                return structure;
            }

            for (let i = 0; i < structure.length; i++) {
                const tier1Item = structure[i];
                if (assertLoseNodeMatch(tier1Item, node)) {
                    return tier1Item.children || null;
                }

                if (tier1Item.children) {
                    const childItem = tier1Item.children.find((item) => {
                        return assertLoseNodeMatch(item, node);
                    });

                    if (childItem) {
                        return childItem.children || null;
                    }
                }
            }

            return structure;
        },
        [structure]
    );

    const childDepth = (node: ContentStructureNavItem): number => {
        let depth = 0;

        if (node.children) {
            node.children.forEach(function (child) {
                let tmpDepth = childDepth(child);
                if (tmpDepth > depth) {
                    depth = tmpDepth;
                }
            });
        }
        return 1 + depth;
    };

    const getBranchLengthForNode = (node: ContentStructureNavItem) => {
        const paths = getPathsForNode(node);
        return childDepth(paths[0]);
    };

    const getPathsForNode = useCallback(
        (node: ContentStructureNavItem) => {
            const paths: ContentStructureNavItem[] = [];

            for (let i = 0; i < structure.length; i++) {
                const tier1Item = structure[i];

                if (assertLoseNodeMatch(tier1Item, node)) {
                    paths.push(tier1Item);
                }

                if (!tier1Item.children) continue;
                const { children: tier1Children } = tier1Item;

                for (let j = 0; j < tier1Children.length; j++) {
                    const tier2Item = tier1Children[j];
                    if (assertLoseNodeMatch(tier2Item, node)) {
                        paths.push(tier1Item, tier2Item);
                    }

                    if (!tier2Item.children) continue;
                    const { children: tier2Children } = tier2Item;

                    for (let k = 0; k < tier2Children.length; k++) {
                        const level3Item = tier2Children[k];
                        if (assertLoseNodeMatch(level3Item, node)) {
                            paths.push(tier1Item, tier2Item, level3Item);
                        }
                    }
                }
            }

            return paths;
        },
        [structure]
    );

    return useMemo(
        () => ({
            getNavFromNode,
            getPathsForNode,
            getBranchLengthForNode,
            assertLoseNodeMatch,
            structure,
        }),
        [structure]
    );
}
