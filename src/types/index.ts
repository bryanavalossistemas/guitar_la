export type GuitarType = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export type ItemCartType = Pick<
  GuitarType,
  "id" | "name" | "image" | "price"
> & {
  quantity: number;
};
