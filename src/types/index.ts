export interface CartItem {
  productId: string;
  quantity: number;
  customizations?: {
    material?: string;
    color?: string;
    width?: number;
    height?: number;
    options?: string[];
  };
}

export interface OrderStatus {
  status: 'en_attente' | 'confirmé' | 'en_production' | 'expédié' | 'livré';
  date: string;
  details: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  date: string;
  status: OrderStatus;
  deliveryAddress: string;
}
