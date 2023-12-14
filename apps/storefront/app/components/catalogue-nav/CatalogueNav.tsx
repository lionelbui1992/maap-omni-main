import { FC, Suspense, useEffect, useState } from 'react';
import {
    ContentStructure,
    ContentStructureNavItem,
    useContentStructure,
} from '../../lib/content-structure';
import { Button, Left, LinkManager, NavItem } from 'mmds';
import AUFlag from 'svg-country-flags/svg/au.svg';
import s from './CatalogueNav.module.css';
import cn from 'clsx';
import {
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
} from '../../../app/components/ui/drawer/Drawer';

export type CatalogueNavProps = {
    contentStructure: ContentStructure;
    collectionCountResolver: (handle: string) => Promise<number>;
    activeItem?: ContentStructureNavItem;
};

export const CatalogueNav: FC<CatalogueNavProps> = ({
    contentStructure,
    collectionCountResolver,
    activeItem = null,
}) => {
    const {
        structure,
        assertLoseNodeMatch,
        getPathsForNode,
        getBranchLengthForNode,
    } = useContentStructure(contentStructure);
    const [activeNodePath, setActiveNodePath] = useState<
        ContentStructureNavItem[] | null
    >(null);
    const [selectedNode, setSelectedNode] =
        useState<null | ContentStructureNavItem>();
    const [items, setItems] = useState<ContentStructure>(structure);
    const [openCluster, setOpenCluster] = useState<null | string>(null);

    useEffect(() => {
        if (activeItem) {
            const preselectedItemPath = getPathsForNode(activeItem);
            if (preselectedItemPath.length === 1) {
                setSelectedNode(preselectedItemPath[0]);
            } else {
                preselectedItemPath.forEach((item: ContentStructureNavItem) => {
                    const itemBranchLength = getBranchLengthForNode(activeItem);
                    const pathsForItem = getPathsForNode(item);
                    const currentPosition = pathsForItem.length;
                    const position: number = itemBranchLength - currentPosition;

                    if (position > 1) {
                        setSelectedNode(item);
                    }
                    if (position === 1) {
                        setOpenCluster(item.label);
                    }
                });
            }
        }
    }, [activeItem]);

    const onSelectNavItem = (item: ContentStructureNavItem) => {
        setSelectedNode(item);
    };

    useEffect(() => {
        if (selectedNode) {
            const activeNodePath: ContentStructureNavItem[] =
                getPathsForNode(selectedNode);

            setActiveNodePath(activeNodePath);

            if (selectedNode.children) {
                setItems(selectedNode.children);
            }
        }
    }, [selectedNode]);

    const reset = () => {
        setSelectedNode(null);
        setActiveNodePath(null);
        setItems(structure);
        setOpenCluster(null);
    };

    const flagSrc = typeof AUFlag === 'string' ? AUFlag : AUFlag.src;

    return (
        <Suspense fallback={<div>Loading navigation...</div>}>
            <DrawerHeader className="mmds-copy-three" closeButtonVariant="text">
                {!selectedNode && (
                    <Button
                        hrefLink="/"
                        label="Home"
                        variant="text"
                        padding="zero"
                    />
                )}
                {selectedNode && (
                    <a onClick={reset}>
                        <Left />
                    </a>
                )}
                <div className={cn(s.title, 'mmds-copy-three')}>
                    {selectedNode && selectedNode.label}
                </div>
            </DrawerHeader>
            <DrawerBody>
                <div className={s.navItems}>
                    {items.map((item: ContentStructureNavItem, key) => {
                        const itemBranchLength = getBranchLengthForNode(item);
                        const currentPosition = activeNodePath
                            ? activeNodePath.length + 1
                            : 1;

                        const showCluster: boolean =
                            itemBranchLength - currentPosition === 1;

                        if (showCluster && item.children) {
                            return (
                                <NavItem
                                    key={key}
                                    variant="l1"
                                    label={item.label}
                                    onSelect={() => setOpenCluster(item.label)}
                                    open={openCluster === item.label}
                                    icon="down"
                                    openCluster={openCluster}
                                    className={s.navItem}
                                    cluster={item.children.map(
                                        (child: ContentStructureNavItem) => {
                                            let active = false;
                                            if (activeItem) {
                                                active = assertLoseNodeMatch(
                                                    child,
                                                    activeItem
                                                );
                                            }
                                            return {
                                                active,
                                                label: child.label,
                                                hrefLink: child.hrefLink,
                                                componentType: 'button',
                                            };
                                        }
                                    )}
                                />
                            );
                        }
                        if (item.children) {
                            return (
                                <NavItem
                                    variant="l1"
                                    label={item.label}
                                    // countResolver={collectionCountResolver}
                                    icon="right"
                                    onSelect={() => onSelectNavItem(item)}
                                    hrefLink={item.hrefLink}
                                />
                            );
                        }

                        return (
                            <LinkManager
                                href={item.hrefLink}
                                title={`Go to ${item.label}`}
                            >
                                <NavItem
                                    variant="l1"
                                    label={item.label}
                                    icon="northeast"
                                    // countResolver={collectionCountResolver}
                                    hrefLink={item.hrefLink}
                                />
                            </LinkManager>
                        );
                    })}
                </div>
            </DrawerBody>
            <DrawerFooter className="mmds-copy-three">
                <img src={flagSrc} alt="Australia" className={s.flag} />
                <span>AU / AUD $</span>
            </DrawerFooter>
        </Suspense>
    );
};

export default CatalogueNav;
