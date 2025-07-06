"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, CreditCard, Lock } from "lucide-react";

import useCartStore, { CartItem } from "@/stores/useCartStore";
import CartItemComponent from "@/components/CartItem";

interface CartSummaryProps {
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const { getTotalItems, getTotalPrice } = useCartStore();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Order Summary
      </h2>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal ({getTotalItems()} items)
          </span>
          <span className="text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900">${tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-lg font-bold text-gray-900">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {subtotal < 100 && (
        <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-sm mb-4">
          Add ${(100 - subtotal).toFixed(2)} more for free shipping!
        </div>
      )}

      <button
        onClick={onCheckout}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
      >
        <Lock className="w-4 h-4" />
        <span>Proceed to Checkout</span>
      </button>

      <div className="mt-4 text-center">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <CreditCard className="w-4 h-4" />
          <span>Secure checkout with SSL encryption</span>
        </div>
      </div>
    </div>
  );
};

const CartPage: React.FC = () => {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart, getTotalItems, error } =
    useCartStore();

  const [isClearing, setIsClearing] = useState(false);
  const [removingItems, setRemovingItems] = useState<Set<number>>(new Set());

  const handleRemoveItem = (productId: number) => {
    setRemovingItems((prev) => new Set(prev).add(productId));
    setTimeout(() => {
      removeItem(productId);
      setRemovingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }, 300);
  };

  const handleClearCart = async () => {
    setIsClearing(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    clearCart();
    setIsClearing(false);
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleContinueShopping = () => {
    router.push("/");
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cart Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <button
              onClick={handleContinueShopping}
              className="text-blue-500 hover:text-blue-700 font-medium transition-colors"
            >
              Continue Shopping
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border">
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>
              <button
                onClick={handleContinueShopping}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Start Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-1">
              {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleClearCart}
              disabled={isClearing}
              className="text-red-500 hover:text-red-700 font-medium transition-colors disabled:opacity-50"
            >
              {isClearing ? "Clearing..." : "Clear Cart"}
            </button>
            <button
              onClick={handleContinueShopping}
              className="text-blue-500 hover:text-blue-700 font-medium transition-colors flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <div className="space-y-6">
                  {items.map((item: CartItem) => (
                    <CartItemComponent
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                      removing={removingItems.has(item.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartSummary onCheckout={handleCheckout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
