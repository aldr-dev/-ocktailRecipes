export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string;
}

export interface RegisterMutation {
  email: string;
  displayName: string;
  password: string;
  avatar: File | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface IngredientsData {
  _id: string;
  name: string;
  quantity: string;
}

export interface CocktailMutation {
  _id: string;
  user: string;
  name: string;
  image: string;
  recipe: string;
  isPublished: boolean;
  ingredients: IngredientsData[];
}

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface CocktailFormFields {
  name: string;
  image: File | null;
  recipe: string;
  ingredients: Ingredient[];
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}