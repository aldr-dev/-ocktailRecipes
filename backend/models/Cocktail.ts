import mongoose, {Schema, Types} from 'mongoose';
import User from './User';
import {CocktailFields, IngredientFields} from '../types';

const IngredientSchema = new mongoose.Schema<IngredientFields>({
  name: {
    type: String,
    required: [true, 'Название ингредиента обязательно!'],
  },
  quantity: {
    type: String,
    required: [true, 'Количество ингредиента обязательно!'],
  },
});

const CocktailSchema = new mongoose.Schema<CocktailFields>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'Пользователь не найден!',
    }
  },
  name: {
    type: String,
    required: [true, 'Поле name обязательно!'],
  },
  image: {
    type: String,
    required: [true, 'Поле image обязательно!'],
  },
  recipe: {
    type: String,
    required: [true, 'Поле recipe обязательно!'],
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  ingredients: [IngredientSchema],
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);
export default Cocktail;