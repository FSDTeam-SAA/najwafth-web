// ১. অর্ডারের স্ট্যাটাসগুলোর জন্য ইউনিয়ন টাইপ
export type OrderStatus = 'Processing' | 'Pending' | 'Picked' | 'Delivered';

// ২. প্রতিটি বই বা আইটেমের জন্য ইন্টারফেস (image_64f999.png এবং image_639c1c.png এর জন্য)
export interface OrderItem {
  id: number;
  title: string;
  author: string;
  address: string;
  price: number;
  items: number;
  status: OrderStatus;
  img: string;
}

// ৩. অর্ডার সামারি এবং কন্টাক্ট ইনফরমেশনের জন্য ইন্টারফেস
export interface OrderSummaryInfo {
  deliveryAddress: string;
  orderDate: string;
  phone: string;
  orderId: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

// ৪. স্টেপার বা স্ট্যাটাস টাইমলাইনের জন্য ইন্টারফেস
export interface StatusStep {
  title: string;
  desc: string;
  completed: boolean;
}