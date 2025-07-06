//Product and CartItem types 
export type Product = {
  slug: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
