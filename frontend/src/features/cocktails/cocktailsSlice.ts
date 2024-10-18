import {CocktailMutation, ValidationError} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {
  deleteOneCocktail,
  fetchCocktailsByAuthor,
  fetchCocktailsData,
  fetchOneCocktail,
  sendCocktailsData,
  toggleCocktail
} from './cocktailsThunks';

interface CocktailsState {
  cocktailsData: CocktailMutation[];
  oneCocktailData: CocktailMutation | null;
  cocktailsByAuthorData: CocktailMutation[];
  sendCocktailsLoading: boolean;
  fetchCocktailsLoading: boolean;
  fetchOneCocktailLoading: boolean;
  fetchCocktailsByAuthorLoading: boolean;
  toggleCocktailLoading: boolean;
  deleteOneCocktailLoading: boolean;
  createError: ValidationError | null;
}

const initialState: CocktailsState = {
  cocktailsData: [],
  oneCocktailData: null,
  cocktailsByAuthorData: [],
  sendCocktailsLoading: false,
  fetchCocktailsLoading: false,
  fetchOneCocktailLoading: false,
  fetchCocktailsByAuthorLoading: false,
  toggleCocktailLoading: false,
  deleteOneCocktailLoading: false,
  createError: null,
};

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendCocktailsData.pending, (state) => {
      state.sendCocktailsLoading = true;
      state.createError = null;
    });
    builder.addCase(sendCocktailsData.fulfilled, (state) => {
      state.sendCocktailsLoading = false;
    });
    builder.addCase(sendCocktailsData.rejected, (state, {payload: error}) => {
      state.sendCocktailsLoading = false;
      state.createError = error || null;
    });

    builder.addCase(fetchCocktailsData.pending, (state) => {
      state.fetchCocktailsLoading = true;
    });
    builder.addCase(fetchCocktailsData.fulfilled, (state, {payload: cocktailsArray}) => {
      state.fetchCocktailsLoading = false;
      state.cocktailsData = cocktailsArray;
    });
    builder.addCase(fetchCocktailsData.rejected, (state) => {
      state.fetchCocktailsLoading = false;
    });

    builder.addCase(fetchOneCocktail.pending, (state) => {
      state.fetchOneCocktailLoading = true;
    });
    builder.addCase(fetchOneCocktail.fulfilled, (state, {payload: cocktailOneData}) => {
      state.fetchOneCocktailLoading = false;
      state.oneCocktailData = cocktailOneData;
    });
    builder.addCase(fetchOneCocktail.rejected, (state) => {
      state.fetchOneCocktailLoading = false;
    });

    builder.addCase(fetchCocktailsByAuthor.pending, (state) => {
      state.fetchCocktailsByAuthorLoading = true;
    });
    builder.addCase(fetchCocktailsByAuthor.fulfilled, (state, {payload: cocktailsByAuthor}) => {
      state.fetchCocktailsByAuthorLoading = false;
      state.cocktailsByAuthorData = cocktailsByAuthor;
    });
    builder.addCase(fetchCocktailsByAuthor.rejected, (state) => {
      state.fetchCocktailsByAuthorLoading = false;
    });

    builder.addCase(toggleCocktail.pending, (state) => {
      state.toggleCocktailLoading = true;
    });
    builder.addCase(toggleCocktail.fulfilled, (state) => {
      state.toggleCocktailLoading = false;
    });
    builder.addCase(toggleCocktail.rejected, (state) => {
      state.toggleCocktailLoading = false;
    });

    builder.addCase(deleteOneCocktail.pending, (state) => {
      state.deleteOneCocktailLoading = true;
    });
    builder.addCase(deleteOneCocktail.fulfilled, (state) => {
      state.deleteOneCocktailLoading = false;
    });
    builder.addCase(deleteOneCocktail.rejected, (state) => {
      state.deleteOneCocktailLoading = false;
    });
  },
  selectors: {
    selectCocktailsData: (state) => state.cocktailsData,
    selectOneCocktailData: (state) => state.oneCocktailData,
    selectCocktailsByAuthorData: (state) => state.cocktailsByAuthorData,
    selectSendCocktailsLoading: (state) => state.sendCocktailsLoading,
    selectFetchCocktailsLoading: (state) => state.fetchCocktailsLoading,
    selectFetchOneCocktailLoading: (state) => state.fetchOneCocktailLoading,
    selectFetchCocktailsByAuthorLoading: (state) => state.fetchCocktailsByAuthorLoading,
    selectToggleCocktailLoading: (state) => state.toggleCocktailLoading,
    selectDeleteOneCocktailLoading: (state) => state.deleteOneCocktailLoading,
    selectCreateError: (state) => state.createError,
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const {
  selectCocktailsData,
  selectOneCocktailData,
  selectCocktailsByAuthorData,
  selectSendCocktailsLoading,
  selectFetchCocktailsLoading,
  selectFetchOneCocktailLoading,
  selectFetchCocktailsByAuthorLoading,
  selectCreateError,
} = cocktailsSlice.selectors;