import {createAsyncThunk} from '@reduxjs/toolkit';
import {CocktailFormFields, CocktailMutation, ValidationError} from '../../types';
import axiosApi from '../../axiosApi';
import {isAxiosError} from 'axios';
import {RootState} from '../../app/store';

export const sendCocktailsData = createAsyncThunk<void, CocktailFormFields, { rejectValue: ValidationError }>(
  'cocktails/sendCocktailsData',
  async (cocktailData, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      formData.append('name', cocktailData.name);
      formData.append('recipe', cocktailData.recipe);
      formData.append('ingredients', JSON.stringify(cocktailData.ingredients));

      if (cocktailData.image) {
        formData.append('image', cocktailData.image);
      }

      await axiosApi.post<CocktailFormFields>('/cocktails', formData);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const fetchCocktailsData = createAsyncThunk<CocktailMutation[], void, { state: RootState }>(
  'cocktails/fetchCocktailsData', async () => {
    const {data: cocktailsData} = await axiosApi.get<CocktailMutation[]>('/cocktails');
    return cocktailsData;
  });

export const fetchOneCocktail = createAsyncThunk<CocktailMutation, string, { state: RootState }>(
  'cocktails/fetchOneCocktail', async (id) => {
    const {data: cocktail} = await axiosApi.get<CocktailMutation>(`/cocktails/${id}`);
    return cocktail;
  });

export const fetchCocktailsByAuthor = createAsyncThunk<CocktailMutation[], string, { state: RootState }>(
  'cocktails/fetchCocktailsByAuthor', async (id) => {
    const {data: cocktailsAuthor} = await axiosApi.get<CocktailMutation[]>(`/cocktails?author=${id}`);
    return cocktailsAuthor;
  });

export const toggleCocktail = createAsyncThunk<void, string, { state: RootState }>(
  'cocktails/toggleCocktail', async (id) => {
    await axiosApi.patch(`/cocktails/${id}/togglePublished`);
  },
);

export const deleteOneCocktail = createAsyncThunk<void, string, { state: RootState }>(
  'cocktails/deleteOneCocktail', async (id) => {
    await axiosApi.delete(`/cocktails/${id}`);
  });