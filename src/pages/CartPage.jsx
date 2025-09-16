import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-white rounded-xl shadow-md p-12">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-center">Total</div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <div key={`${item.id}-${Math.random()}`} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-6 flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <Link
                      to={`/product/${item.id}`}
                      className="font-medium text-gray-900 hover:text-green-600 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                  </div>
                </div>

                <div className="col-span-2 text-center">
                  <span className="font-medium text-gray-900">
                    ${(item.price - item.discount).toFixed(2)}
                  </span>
                  {item.discount > 0 && (
                    <div className="text-xs text-gray-500 line-through">
                      ${item.price.toFixed(2)}
                    </div>
                  )}
                </div>

                <div className="col-span-2 flex items-center justify-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors duration-200"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4 text-gray-600" />
                  </button>
                  <span className="font-medium text-gray-900 min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                <div className="col-span-1 text-center">
                  <span className="font-bold text-gray-900">
                    ${((item.price - item.discount) * item.quantity).toFixed(2)}
                  </span>
                </div>

                <div className="col-span-1 text-center">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Total items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </div>
            <div className="text-right">
              <div className="text-lg font-medium text-gray-600 mb-1">
                Subtotal: ${getCartTotal().toFixed(2)}
              </div>
              <div className="text-sm text-gray-500 mb-4">
                Shipping and taxes calculated at checkout
              </div>
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Continue Shopping
                </Link>
                <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;