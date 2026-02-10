export type AIGenerateType = "single" | "full";

export type GeneratedMeal = {
  name: string;
  price: number;
  description?: string;
  image_url?: string;
};

export type GenerateMenuPayload = {
  restaurantName: string;
  category: string;
  userPrompt: string;
  type: AIGenerateType;
};

export type GenerateMenuResponse = {
  menu: GeneratedMeal[];
};

export type Payload = {
  restaurantId: string ;
  categoryId: string;
  meals: GeneratedMeal[];
};