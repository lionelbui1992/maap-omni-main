import React from 'react';
import * as DrawerPrimitive from '@radix-ui/react-dialog';
import { Button, ButtonVariant } from 'mmds';
import cn from 'clsx';
import s from './Drawer.module.css';

export type Side = 'top' | 'right' | 'bottom' | 'left';

interface DrawerPanelProps
    extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {
    inFrom?: Side;
    className?: string;
    variant?: string;
}

const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DrawerPrimitive.Overlay
        className={cn(s.overlay, className)}
        {...props}
        ref={ref}
    />
));

const DrawerHeader = ({
    children,
    className,
    closeButtonVariant,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & {
    closeButtonVariant?: ButtonVariant;
}) => {
    return (
        <div className={cn(s.header, className)} {...props}>
            <div className={cn(s.headerInner, className)}>
                {children}
                <DrawerPrimitive.Close className={s.close} asChild>
                    <Button
                        icon="close"
                        variant={closeButtonVariant || 'secondary'}
                    >
                        <span className="visually-hidden">Close</span>
                    </Button>
                </DrawerPrimitive.Close>
            </div>
        </div>
    );
};
DrawerHeader.displayName = 'DrawerHeader';

const DrawerBody = ({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn(s.body, className)} {...props}>
        {children}
    </div>
);
DrawerBody.displayName = 'DrawerBody';

const DrawerFooter = ({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn(s.footer, className)} {...props}>
        <div className={cn(s.footerInner, className)}>{children}</div>
    </div>
);
DrawerFooter.displayName = 'DrawerFooter';

const DrawerPortal = ({ ...props }) => <DrawerPrimitive.Portal {...props} />;

const Drawer = ({ children, open, onOpenChange, ...props }) => (
    <DrawerPrimitive.Root open={open} onOpenChange={onOpenChange} {...props}>
        {children}
    </DrawerPrimitive.Root>
);

const DrawerPanel = React.forwardRef<HTMLDivElement, DrawerPanelProps>(
    ({ inFrom, variant, className, children, ...props }, ref) => {
        const contentClassName = cn(
            s.root,
            {
                [s.right]: inFrom === 'right',
                [s.bottom]: inFrom === 'bottom',
                [s.left]: inFrom === 'left',
                [s.productAssistance]: variant === 'product-assistance',
                [s.lookbook]: variant === 'lookbook',
                [s.filters]: variant === 'filters',
                [s.catalogueNav]: variant === 'catalogue-nav',
            },
            className
        );

        return (
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerPrimitive.Content
                    className={contentClassName}
                    {...props}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    ref={ref}
                >
                    {children}
                </DrawerPrimitive.Content>
            </DrawerPortal>
        );
    }
);

export {
    Drawer,
    DrawerTrigger,
    DrawerClose,
    DrawerPanel,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
};
