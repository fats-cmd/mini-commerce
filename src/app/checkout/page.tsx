"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/stores/useCartStore";

const CheckoutPage: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      clearCart();
      router.push("/checkout/success");
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="mb-6 text-gray-600">
          Add some products before checking out.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
        <ul className="mb-6 divide-y divide-gray-200">
          {items.map((item) => (
            <li
              key={item.id}
              className="py-2 flex justify-between items-center"
            >
              <span className="font-medium text-gray-800">{item.name}</span>
              <span className="text-gray-600">x{item.quantity}</span>
              <span className="text-gray-900 font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center mb-6">
          <span className="font-semibold text-lg">Total:</span>
          <span className="text-xl font-bold text-orange-600">
            ${getTotalPrice().toFixed(2)}
          </span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={isProcessing}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-60"
        >
          {isProcessing ? "Processing..." : "Confirm & Pay"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
