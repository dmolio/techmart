import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-indigo-900 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
          alt="Hero background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover the Latest in Tech Innovation
          </h1>
          <p className="text-xl mb-8 text-indigo-200">
            Explore our curated selection of premium laptops and smartphones from leading brands.
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-indigo-900 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-indigo-100 transition-colors duration-200">
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-900 transition-colors duration-200">
              View Deals
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}