import React, { useState } from 'react';
import { ShoppingCart, Heart, Share2, ChevronRight, Star, Truck } from 'lucide-react';
import type { Product } from '../types';

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  relatedProducts: Product[];
  onProductSelect: (product: Product) => void;
}

export default function ProductDetails({ product, onAddToCart, relatedProducts, onProductSelect }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-4 lg:hidden">
          <span className="text-gray-500">Products</span>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-500">{product.category}</span>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product Image */}
        <div className="lg:w-1/2">
          <div className="aspect-square rounded-lg overflow-hidden bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <div className="sticky top-20">
            <div className="hidden lg:flex items-center space-x-2 text-sm mb-4">
              <span className="text-gray-500">Products</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-gray-500">{product.category}</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-gray-900">{product.name}</span>
            </div>

            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">128 reviews</span>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toLocaleString()}
              </span>
            </div>

            <div className="p-4 bg-green-50 rounded-lg mb-6">
              <div className="flex items-center space-x-2 text-green-700">
                <Truck className="h-5 w-5" />
                <span className="font-medium">Free shipping</span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                Order now and receive it within 2-3 business days
              </p>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-16 text-center border-x py-2"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">
                {product.stock} units available
              </span>
            </div>

            <div className="flex items-center space-x-4 mb-8">
              <button
                onClick={() => onAddToCart(product, quantity)}
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors duration-200"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <button className="p-3 border rounded-lg hover:bg-gray-50">
                <Heart className="h-6 w-6 text-gray-600" />
              </button>
              <button className="p-3 border rounded-lg hover:bg-gray-50">
                <Share2 className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Specifications</h3>
              <dl className="grid grid-cols-1 gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <dt className="w-1/3 text-sm text-gray-500 capitalize">{key}:</dt>
                    <dd className="w-2/3 text-sm text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => onProductSelect(product)}
            >
              <div className="aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-lg font-bold text-indigo-600">
                  ${product.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}