import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  category: string;
}

export interface CartItem extends Product {
  color?: string;
  size?: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

interface CartActions {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

interface CartSelectors {
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (productId: number) => number;
  isInCart: (productId: number) => boolean;
}

type CartStore = CartState & CartActions & CartSelectors;

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isLoading: false,
      error: null,

      // Actions
      addItem: (product: Product, quantity: number = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
              error: null,
            };
          }

          return {
            items: [...state.items, { ...product, quantity }],
            error: null,
          };
        });
      },

      removeItem: (productId: number) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
          error: null,
        }));
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item,
          ),
          error: null,
        }));
      },

      clearCart: () => {
        set({ items: [], error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      // Selectors
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },

      getItemQuantity: (productId: number) => {
        const item = get().items.find((item) => item.id === productId);
        return item ? item.quantity : 0;
      },

      isInCart: (productId: number) => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: "mini-commerce-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        // Don't persist loading and error states
      }),
      version: 1,
      migrate: (persistedState: unknown, version: number) => {
        // this is to handle migration if needed in the future
        if (version === 0) {
          // Migration logic for version 0 to 1
          return {
            ...(persistedState as CartStore),
            items: (persistedState as CartStore).items || [],
          };
        }
        return persistedState;
      },
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error("Failed to rehydrate cart state:", error);
            state?.setError("Failed to load cart from storage");
          }
        };
      },
    },
  ),
);

export default useCartStore;
