import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-600 to-green-400 text-white">
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl font-bold mb-20">
                            Fresh Organic Products
                        </h1>
                        <p className="text-xl mb-8 opacity-90">
                            Discover the finest selection of organic fruits and vegetables, 
                            grown with love and care for your health and the environment.
                        </p>
                        <Link
                            to="/products"
                            className="inline-block bg-white text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-lg"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Organic?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our organic products are carefully selected to provide you with the best quality and taste.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">100% Organic</h3>
                            <p className="text-gray-600">
                                All our products are certified organic, grown without harmful pesticides or chemicals.
                            </p>
                        </div>
                        
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Fresh Daily</h3>
                            <p className="text-gray-600">
                                We source our products daily from local organic farms to ensure maximum freshness.
                            </p>
                        </div>
                        
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Eco-Friendly</h3>
                            <p className="text-gray-600">
                                Our sustainable farming practices help protect the environment for future generations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Ready to Start Your Organic Journey?
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Browse our collection of fresh organic produce and start living healthier today.
                    </p>
                    <Link
                        to="/products"
                        className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 text-lg"
                    >
                        Browse Products
                    </Link>
                </div>
            </section>
        </div>
    );
}
 
export default Home;