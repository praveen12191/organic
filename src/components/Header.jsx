import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Leaf, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  const location = useLocation();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-green-100 p-2 rounded-full group-hover:bg-green-200 transition-colors duration-200">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-xl font-bold text-gray-800">OrganicHarvest</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-green-600 border-b-2 border-green-600' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/admin" 
              className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200 ${
                isActive('/admin') 
                  ? 'text-green-600 border-b-2 border-green-600' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              <Shield className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </nav>

          <Link 
            to="/cart" 
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;