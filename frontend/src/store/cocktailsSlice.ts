import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Cocktail } from '../types';
import { getAllCocktails, searchCocktails } from '../services/cocktailService';
import i18next from 'i18next';

interface CocktailsState {
  allCocktails: Cocktail[];
  filteredCocktails: Cocktail[];
  selectedIngredients: string[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

const initialState: CocktailsState = {
  allCocktails: [],
  filteredCocktails: [],
  selectedIngredients: [],
  searchQuery: '',
  loading: false,
  error: null,
};

export const fetchAllCocktails = createAsyncThunk(
  'cocktails/fetchAll',
  async () => {
    const cocktails = await getAllCocktails();
    return cocktails;
  }
);

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {
    setSelectedIngredients: (state, action: PayloadAction<string[]>) => {
      state.selectedIngredients = action.payload;
      state.filteredCocktails = searchCocktails(
        state.searchQuery,
        action.payload,
        i18next
      );
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredCocktails = searchCocktails(
        action.payload,
        state.selectedIngredients,
        i18next
      );
    },
    clearFilters: (state) => {
      state.selectedIngredients = [];
      state.searchQuery = '';
      state.filteredCocktails = state.allCocktails;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCocktails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCocktails.fulfilled, (state, action) => {
        state.loading = false;
        state.allCocktails = action.payload;
        state.filteredCocktails = action.payload;
      })
      .addCase(fetchAllCocktails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cocktails';
      });
  },
});

export const { setSelectedIngredients, setSearchQuery, clearFilters } = cocktailsSlice.actions;

export default cocktailsSlice.reducer;
