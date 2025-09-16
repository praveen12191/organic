import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

// Mock API functions - these would be replaced with actual API calls to FastAPI
const mockApi = {
  async fetchProducts() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      {
        id: 1,
        name: "Organic Basmati Rice",
        price: 24.99,
        discount: 3.00,
        description: "Premium quality long-grain basmati rice, aged to perfection. Sourced directly from organic farms in the foothills of the Himalayas. Non-GMO and pesticide-free.",
        category: "rice",
        image: "https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        id: 2,
        name: "Mixed Quinoa Grains",
        price: 18.50,
        discount: 2.50,
        description: "Nutritious tri-color quinoa blend featuring white, red, and black varieties. High in protein and essential amino acids. Perfect for healthy meals.",
        category: "grains",
        image: "https://images.pexels.com/photos/6419123/pexels-photo-6419123.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        id: 3,
        name: "Organic Red Lentils",
        price: 12.99,
        discount: 0,
        description: "Split red lentils that cook quickly and are perfect for soups, curries, and protein-rich meals. Organically grown without synthetic fertilizers.",
        category: "pulses",
        image: "https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        id: 4,
        name: "Ancient Grain Oats",
        price: 15.75,
        discount: 1.75,
        description: "Steel-cut oats from heritage varieties. Minimally processed to retain maximum nutrition. Ideal for hearty breakfasts and baking.",
        category: "cereals",
        image: "https://images.pexels.com/photos/7262354/pexels-photo-7262354.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        id: 5,
        name: "Organic Brown Rice",
        price: 19.99,
        discount: 4.00,
        description: "Nutrient-dense whole grain brown rice with the bran and germ intact. Rich in fiber, vitamins, and minerals. Certified organic and sustainably farmed.",
        category: "rice",
        image: "https://images.pexels.com/photos/4110161/pexels-photo-4110161.jpeg?auto=compress&cs=tinysrgb&w=800"
      }
    ];
  },

  async addProduct(product) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...product, id: Date.now() };
  },

  async updateProduct(id, product) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...product, id };
  },

  async deleteProduct(id) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await mockApi.fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    try {
      const newProduct = await mockApi.addProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const updatedProduct = await mockApi.updateProduct(id, productData);
      setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await mockApi.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      addProduct,
      updateProduct,
      deleteProduct,
      refreshProducts: loadProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};