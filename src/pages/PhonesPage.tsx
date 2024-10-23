import React from 'react';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';
import { Smartphone } from 'lucide-react';

interface PhonesPageProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function PhonesPage({ products, onProductSelect, onAddToCart }: PhonesPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Smartphone className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-900">Phones</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
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