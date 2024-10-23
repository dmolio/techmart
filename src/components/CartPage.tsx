import React, { useState } from 'react';
import { Trash2, X } from 'lucide-react';
import type { CartItem } from '../types';
import PayPalButton from './PayPalButton';
import ErrorBoundary from './ErrorBoundary';

const SHIPPING_PROVINCES = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 
  'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 
  'Prince Edward Island', 'Quebec', 'Saskatchewan',
  'Northwest Territories', 'Nunavut', 'Yukon'
];

interface CartPageProps {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export default function CartPage({ cart, onClose, onUpdateQuantity, onRemoveItem }: CartPageProps) {
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    email: '',
    phone: ''
  });
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 15; // Fixed shipping rate for Canada
  const tax = subtotal * 0.13; // 13% tax
  const total = subtotal + shipping + tax;

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
    setPaymentError(null);
  };

  const validateShippingInfo = () => {
    return Object.values(shippingInfo).every(value => value.trim() !== '');
  };

  const handlePaymentSuccess = () => {
    alert('Payment successful! Order will be shipped soon.');
    onClose();
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-2xl h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-8">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toLocaleString()}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="px-2 py-1 border rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 border rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 hover:bg-gray-200 rounded-full"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Shipping Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={shippingInfo.name}
                    onChange={handleShippingInfoChange}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={shippingInfo.address}
                    onChange={handleShippingInfoChange}
                    className="w-full p-2 border rounded"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={shippingInfo.city}
                      onChange={handleShippingInfoChange}
                      className="w-full p-2 border rounded"
                    />
                    <select
                      name="province"
                      value={shippingInfo.province}
                      onChange={handleShippingInfoChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select Province</option>
                      {SHIPPING_PROVINCES.map(province => (
                        <option key={province} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={shippingInfo.postalCode}
                    onChange={handleShippingInfoChange}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={shippingInfo.email}
                    onChange={handleShippingInfoChange}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={shippingInfo.phone}
                    onChange={handleShippingInfoChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4 mb-8">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (13%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Error Display */}
              {paymentError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{paymentError}</p>
                </div>
              )}

              {/* PayPal Integration */}
              {validateShippingInfo() && (
                <div className="mb-8">
                  <ErrorBoundary>
                    <PayPalButton
                      total={total}
                      subtotal={subtotal}
                      shipping={shipping}
                      tax={tax}
                      cart={cart}
                      shippingInfo={shippingInfo}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  </ErrorBoundary>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}