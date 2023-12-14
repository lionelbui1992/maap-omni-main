export type CartProvider = {
    cart: any;
    setCart: (cart: any) => void;
    cartCount: number;
    cartUIActive: boolean;
    setCartUIActive: () => void;
    toggleCartUI: () => void;
    clearCart: () => void;
    stateIsInconsistent: boolean;
};
