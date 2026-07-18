export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
  imageDetails: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
