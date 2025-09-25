import React, { useState } from 'react';
import Cart from './Cart';
import avalImg from "../img/aval.jpg"
import sugar from "../img/sugar2.png"


const Product = ({ addToCart, cart, updateQuantity, isCartOpen, setIsCartOpen, getCartTotal, removeFromCart }) => {
    const [products] = useState([
        {
            id: 1,
            name: "Organic Apples",
            price: 4.99,
            image: avalImg,
            description: "Fresh organic apples from local farms",
            category: "Fruits"
        },
        {
            id: 2,
            name: "Organic Bananas",
            price: 2.99,
            image: sugar,
            description: "Ripe organic bananas, perfect for smoothies",
            category: "Fruits"
        },
        {
            id: 3,
            name: "Organic Carrots",
            price: 3.49,
            image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop",
            description: "Crunchy organic carrots rich in vitamins",
            category: "Vegetables"
        },
        {
            id: 4,
            name: "Organic Spinach",
            price: 5.99,
            image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop",
            description: "Fresh organic spinach leaves",
            category: "Vegetables"
        },
        {
            id: 5,
            name: "Organic Tomatoes",
            price: 6.99,
            image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop",
            description: "Juicy organic tomatoes perfect for salads",
            category: "Vegetables"
        }
    ]);

    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (productId, change) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: Math.max(1, (prev[productId] || 1) + change)
        }));
    };

    const handleAddToCart = (product) => {
        const quantity = quantities[product.id] || 1;
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        // Reset quantity after adding to cart
        setQuantities(prev => ({
            ...prev,
            [product.id]: 1
        }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Organic Products</h1>
                <div className="text-sm text-gray-600">
                    {products.length} products available
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="relative">
                            <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                {product.category}
                            </span>
                        </div>
                        
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl font-bold text-green-600">${product.price}</span>
                            </div>
                            
                            {/* Quantity selector */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleQuantityChange(product.id, -1)}
                                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-bold"
                                        disabled={quantities[product.id] === 1}
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-semibold">
                                        {quantities[product.id] || 1}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(product.id, 1)}
                                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                                <span>Add to Cart</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Cart Component */}
            <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                getCartTotal={getCartTotal}
            />
        </div>
    );
}
 
export default Product;