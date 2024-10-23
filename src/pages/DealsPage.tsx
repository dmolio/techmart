import React from 'react';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';
import { Tag } from 'lucide-react';

interface DealsPageProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function DealsPage({ products, onProductSelect, onAddToCart }: DealsPageProps) {
  // Simulate deals by applying a discount to products
  const dealsProducts = products.map(product => ({
    ...product,
    price: Math.round(product.price * 0.85) // 15% discount
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Tag className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-900">Deals</h1>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-8">
        <p className="text-indigo-800 font-medium">
          Special Offer: 15% off on all products for a limited time!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dealsProducts.map(product => (
          <div key={product.id} onClick={() => onProductSelect(product)}>
            <ProductCard
              product={product}
              onAddToCart={(p) => {
                onAddToCart(p);
                event?.stopPropagation();
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}