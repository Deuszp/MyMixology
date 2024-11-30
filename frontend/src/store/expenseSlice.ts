import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
  payer_id: number;
  group_id: number;
  splits: {
    user_id: number;
    amount: number;
  }[];
}

interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  expenses: [],
  loading: false,
  error: null,
};

export const fetchGroupExpenses = createAsyncThunk(
  'expenses/fetchGroupExpenses',
  async (groupId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/expenses/group/${groupId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch expenses');
    }
  }
);

export const createExpense = createAsyncThunk(
  'expenses/createExpense',
  async (expenseData: Partial<Expense>, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/expenses', expenseData);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to create expense');
    }
  }
);

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchGroupExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses.push(action.payload);
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default expenseSlice.reducer;
