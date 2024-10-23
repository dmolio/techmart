export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'laptop' | 'phone';
  brand: string;
  image: string;
  specs: {
    [key: string]: string;
  };
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}