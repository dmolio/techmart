import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import ErrorBoundary from './ErrorBoundary';
import type { CartItem } from '../types';

interface PayPalButtonProps {
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  cart: CartItem[];
  shippingInfo: {
    name: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
  };
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function PayPalButton({
  total,
  subtotal,
  shipping,
  tax,
  cart,
  shippingInfo,
  onSuccess,
  onError
}: PayPalButtonProps) {
  return (
    <ErrorBoundary>
      <PayPalScriptProvider options={{
        "client-id": "ASsWzoxDVCT-NQmtRvLLUSo70vRIwg8WZHKMRLQklNq0UF2iuMNu7sDKxwocPV53zUh9eHs_mmBUVdZG",
        currency: "CAD",
        components: "buttons",
        intent: "capture"
      }}>
        <PayPalButtons
          style={{ layout: "vertical" }}
          forceReRender={[total]}
          fundingSource={undefined}
          createOrder={(_, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  currency_code: "CAD",
                  value: total.toFixed(2),
                  breakdown: {
                    item_total: {
                      currency_code: "CAD",
                      value: subtotal.toFixed(2)
                    },
                    shipping: {
                      currency_code: "CAD",
                      value: shipping.toFixed(2)
                    },
                    tax_total: {
                      currency_code: "CAD",
                      value: tax.toFixed(2)
                    }
                  }
                },
                items: cart.map(item => ({
                  name: item.name,
                  quantity: item.quantity.toString(),
                  unit_amount: {
                    currency_code: "CAD",
                    value: item.price.toFixed(2)
                  }
                })),
                shipping: {
                  name: {
                    full_name: shippingInfo.name
                  },
                  address: {
                    address_line_1: shippingInfo.address,
                    admin_area_2: shippingInfo.city,
                    admin_area_1: shippingInfo.province,
                    postal_code: shippingInfo.postalCode,
                    country_code: "CA"
                  }
                }
              }]
            });
          }}
          onApprove={(_, actions) => {
            return actions.order!.capture().then(() => {
              onSuccess();
            });
          }}
          onError={(err) => {
            console.error('PayPal Error:', err);
            onError('There was an error processing your payment. Please try again.');
          }}
          onCancel={() => {
            onError('Payment cancelled. You can continue shopping or try again.');
          }}
        />
      </PayPalScriptProvider>
    </ErrorBoundary>
  );
}