import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import LaptopsPage from './pages/LaptopsPage';
import PhonesPage from './pages/PhonesPage';
import DealsPage from './pages/DealsPage';
import type { Product, CartItem } from './types';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'laptops' | 'phones' | 'deals'>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const products: Product[] = [
    {
      id: '1',
      name: 'MacBook Pro 16-inch',
      description: 'Apple M2 Pro chip, 16GB RAM, 512GB SSD. Experience the ultimate in professional computing with the all-new MacBook Pro. Featuring the groundbreaking M2 Pro chip, this powerhouse delivers exceptional performance for demanding tasks like video editing, 3D rendering, and software development.',
      price: 2499,
      category: 'laptop',
      brand: 'Apple',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80',
      specs: {
        processor: 'Apple M2 Pro',
        memory: '16GB Unified Memory',
        storage: '512GB SSD',
        display: '16-inch Liquid Retina XDR',
        battery: 'Up to 22 hours',
        weight: '4.7 pounds',
        ports: '3x Thunderbolt 4, HDMI, SD card'
      },
      stock: 10
    },
    {
      id: '4',
      name: 'MacBook Air 15-inch M3',
      description: "The new MacBook Air 15-inch featuring the M3 chip delivers exceptional performance in an incredibly thin design. With a stunning Liquid Retina display and all-day battery life, it's the perfect blend of power and portability.",
      price: 1699,
      category: 'laptop',
      brand: 'Apple',
      image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80',
      specs: {
        processor: 'Apple M3 chip',
        memory: '16GB Unified Memory',
        storage: '512GB SSD',
        display: '15.3-inch Liquid Retina Display',
        battery: 'Up to 18 hours',
        weight: '3.3 pounds',
        ports: '2x Thunderbolt/USB 4 ports',
        camera: '1080p FaceTime HD camera'
      },
      stock: 15
    },
    {
      id: '5',
      name: 'Samsung Galaxy Book4 Edge',
      description: 'Experience the future of mobile computing with the Galaxy Book4 Edge. Powered by the revolutionary Snapdragon X Elite processor and featuring a stunning 16-inch AMOLED touchscreen, it delivers unmatched performance and versatility.',
      price: 1899,
      category: 'laptop',
      brand: 'Samsung',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80',
      specs: {
        processor: 'Snapdragon X Elite',
        memory: '16GB LPDDR5X',
        storage: '1TB SSD',
        display: '16-inch WQXGA+ AMOLED Touch (2880 x 1800)',
        weight: '3.4 pounds',
        ports: '2x USB4.0, 1x USB3.2, HDMI 2.1',
        features: 'Wi-Fi 7, Fingerprint Reader, Backlit Keyboard',
        audio: 'Quad Speakers with Dolby Atmos'
      },
      stock: 8
    },
    {
      id: '2',
      name: 'iPhone 15 Pro Max',
      description: 'A17 Pro chip, 256GB, Titanium finish. The most powerful iPhone ever, featuring a revolutionary A17 Pro chip, a sophisticated triple-camera system, and a stunning titanium design.',
      price: 1199,
      category: 'phone',
      brand: 'Apple',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80',
      specs: {
        processor: 'A17 Pro',
        storage: '256GB',
        camera: '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
        display: '6.7-inch Super Retina XDR',
        battery: 'Up to 29 hours video playback',
        security: 'Face ID',
        connectivity: '5G capable'
      },
      stock: 15
    },
    {
      id: '3',
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Snapdragon 8 Gen 3, 512GB, 12GB RAM. Push the boundaries of mobile technology with the Galaxy S24 Ultra. Featuring AI-powered capabilities, a versatile quad-camera system, and the most advanced S Pen experience yet.',
      price: 1299,
      category: 'phone',
      brand: 'Samsung',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80',
      specs: {
        processor: 'Snapdragon 8 Gen 3',
        memory: '12GB',
        storage: '512GB',
        camera: '200MP Main, 12MP Ultra Wide, 50MP Telephoto',
        display: '6.8-inch Dynamic AMOLED 2X',
        battery: '5000mAh',
        features: 'S Pen included, IP68 water resistant'
      },
      stock: 8
    }
  ];

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevCart, { ...product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const getRelatedProducts = (product: Product) => {
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  };

  const renderPage = () => {
    if (selectedProduct) {
      return (
        <ProductDetails
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          relatedProducts={getRelatedProducts(selectedProduct)}
          onProductSelect={setSelectedProduct}
        />
      );
    }

    switch (currentPage) {
      case 'laptops':
        return <LaptopsPage products={products.filter(p => p.category === 'laptop')} onProductSelect={setSelectedProduct} onAddToCart={handleAddToCart} />;
      case 'phones':
        return <PhonesPage products={products.filter(p => p.category === 'phone')} onProductSelect={setSelectedProduct} onAddToCart={handleAddToCart} />;
      case 'deals':
        return <DealsPage products={products} onProductSelect={setSelectedProduct} onAddToCart={handleAddToCart} />;
      default:
        return (
          <>
            <Hero />
            <main className="max-w-7xl mx-auto px-4 py-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product.id} onClick={() => setSelectedProduct(product)}>
                    <ProductCard
                      product={product}
                      onAddToCart={(p) => {
                        handleAddToCart(p);
                        event?.stopPropagation();
                      }}
                    />
                  </div>
                ))}
              </div>
            </main>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onNavigate={setCurrentPage}
        onLogoClick={() => {
          setCurrentPage('home');
          setSelectedProduct(null);
        }}
        cartItemsCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      {renderPage()}
      {isCartOpen && (
        <CartPage
          cart={cart}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
        />
      )}
    </div>
  );
}

export default App;