import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

interface AddExpenseForm {
  description: string;
  amount: number;
  paidBy: string;
  splitType: 'equal' | 'custom';
}

const AddExpense: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<AddExpenseForm>();
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const splitType = watch('splitType');

  const onSubmit = async (data: AddExpenseForm) => {
    try {
      // TODO: Implement expense creation logic
      navigate(`/groups/${groupId}`);
    } catch (error) {
      console.error('Failed to create expense:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Expense
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="description"
                label="Description"
                autoFocus
                {...register('description', { required: 'Description is required' })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="amount"
                label="Amount"
                type="number"
                inputProps={{ step: '0.01' }}
                {...register('amount', {
                  required: 'Amount is required',
                  min: { value: 0.01, message: 'Amount must be greater than 0' },
                })}
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="paid-by-label">Paid By</InputLabel>
                <Select
                  labelId="paid-by-label"
                  id="paidBy"
                  label="Paid By"
                  defaultValue=""
                  {...register('paidBy', { required: 'Please select who paid' })}
                  error={!!errors.paidBy}
                >
                  <MenuItem value="you">You</MenuItem>
                  {/* TODO: Add other group members */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="split-type-label">Split Type</InputLabel>
                <Select
                  labelId="split-type-label"
                  id="splitType"
                  label="Split Type"
                  defaultValue="equal"
                  {...register('splitType')}
                >
                  <MenuItem value="equal">Split Equally</MenuItem>
                  <MenuItem value="custom">Custom Split</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {splitType === 'custom' && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Custom Split
                </Typography>
                {/* TODO: Add custom split inputs */}
              </Grid>
            )}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/groups/${groupId}`)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Add Expense
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddExpense;
