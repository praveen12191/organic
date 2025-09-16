import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const discountPercentage = product.discount > 0 
    ? Math.round((product.discount / product.price) * 100) 
    : 0;

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              -{discountPercentage}%
            </div>
          )}
          <button 
            onClick={handleAddToCart}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-green-50 hover:text-green-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200 line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center space-x-1 text-yellow-400 ml-2">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-xs text-gray-600">4.8</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                ${(product.price - product.discount).toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;