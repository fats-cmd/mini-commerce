"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

// i did this to generate a random order id for the user
function generateOrderId() {
  // just a simple way to get a random string, not cryptographically secure but good enough for demo
  return (
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 10)
  );
}

const SuccessPage: React.FC = () => {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    setOrderId(generateOrderId());
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12 animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
        <CheckCircle2 className="w-20 h-20 text-green-500 mb-4 animate-bounce" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Thank you for your order!
        </h1>
        <p className="text-gray-600 mb-2 text-center">
          Your purchase was successful.
          <br />
          {/* i did this to show the user their order id */}
          <span className="font-mono text-xs text-gray-500">
            Order ID: {orderId}
          </span>
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-md"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
