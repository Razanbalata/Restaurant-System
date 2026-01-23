export interface Restaurant {
  id: string;
  name: string;
  city: string;
  country: string;
  description: string;
  image: string;
  rating: number;
}

export type Meal = {
  id: string;
  name: string;
  description: string;
  price: number;
};
