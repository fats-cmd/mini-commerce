import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/stores/useCartStore";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemove: (productId: number) => void;
  removing: boolean;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  removing,
}) => {
  return (
    <div
      className={`flex items-center space-x-4 p-4 border border-gray-200 rounded-lg transition-all duration-300 ${
        removing ? "opacity-50 scale-95" : ""
      }`}
    >
      {/* Product Image */}
      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {item.name}
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          {typeof item.price === "number"
            ? `$${item.price.toFixed(2)} each`
            : "N/A"}
        </p>
        {item.color && (
          <p className="text-gray-500 text-sm">Color: {item.color}</p>
        )}
        {item.size && (
          <p className="text-gray-500 text-sm">Size: {item.size}</p>
        )}
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Minus className="w-4 h-4 text-gray-600" />
        </button>
        <span className="w-8 text-center font-medium text-gray-900">
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Item Total */}
      <div className="text-right">
        <div className="text-lg font-semibold text-gray-900">
          {typeof item.price === "number"
            ? `$${(item.price * item.quantity).toFixed(2)}`
            : "N/A"}
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        disabled={removing}
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CartItem;
