import React from 'react';
import { ShoppingCart, Laptop, Search, Menu } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: 'home' | 'laptops' | 'phones' | 'deals') => void;
  onLogoClick: () => void;
  cartItemsCount: number;
  onCartClick: () => void;
}

export default function Navbar({ onNavigate, onLogoClick, cartItemsCount, onCartClick }: NavbarProps) {
  return (
    <nav className="bg-indigo-600 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <button
              onClick={onLogoClick}
              className="flex items-center space-x-2 hover:text-indigo-200 transition-colors duration-200"
            >
              <Laptop className="w-8 h-8" />
              <span className="text-xl font-bold">TechMart</span>
            </button>
            
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => onNavigate('laptops')}
                className="hover:text-indigo-200 transition-colors duration-200"
              >
                Laptops
              </button>
              <button
                onClick={() => onNavigate('phones')}
                className="hover:text-indigo-200 transition-colors duration-200"
              >
                Phones
              </button>
              <button
                onClick={() => onNavigate('deals')}
                className="hover:text-indigo-200 transition-colors duration-200"
              >
                Deals
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-64 px-4 py-1 rounded-lg text-gray-900 focus:outline-none"
                />
                <Search className="absolute right-3 top-1.5 h-5 w-5 text-gray-500" />
              </div>
            </div>

            <button 
              onClick={onCartClick}
              className="relative p-2 hover:bg-indigo-700 rounded-full transition-colors duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button className="md:hidden p-2 hover:bg-indigo-700 rounded-lg transition-colors duration-200">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}