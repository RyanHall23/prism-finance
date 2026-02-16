import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  MenuItem,
  Grid,
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import { formatCurrency } from '../utils/calculations.js';

function IncomeSection({ incomes, setIncomes }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Salary',
    date: new Date().toISOString().split('T')[0],
    recurring: true,
    notes: '',
    payDay: 25,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const newIncome = {
      id: Date.now(),
      ...formData,
      amount: parseFloat(formData.amount),
    };

    setIncomes([...incomes, newIncome]);
    setFormData({
      amount: '',
      category: 'Salary',
      date: new Date().toISOString().split('T')[0],
      recurring: true,
      notes: '',
      payDay: 25,
    });
    setShowForm(false); // Hide form after adding
  };

  const handleDelete = (id) => {
    setIncomes(incomes.filter((income) => income.id !== id));
  };

  const categories = ['Salary', 'Bonus', 'Freelance', 'Investment', 'Gift', 'Other'];

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Hide Form' : 'Add Income'}
        </Button>
      </Box>

      {showForm && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Add Income
          </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                inputProps={{ step: '0.01', min: '0' }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            {formData.category === 'Salary' && (
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Pay Day (1-31)"
                  name="payDay"
                  type="number"
                  value={formData.payDay}
                  onChange={handleChange}
                  inputProps={{ min: '1', max: '31' }}
                  helperText="Adjusts to nearest working day"
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6} md={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.recurring}
                    onChange={handleChange}
                    name="recurring"
                  />
                }
                label="Recurring"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes (Optional)"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" startIcon={<Add />}>
                Add Income
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Recurring</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No income entries yet
                </TableCell>
              </TableRow>
            ) : (
              incomes.map((income) => (
                <TableRow key={income.id}>
                  <TableCell>{formatCurrency(income.amount)}</TableCell>
                  <TableCell>{income.category}</TableCell>
                  <TableCell>{income.date}</TableCell>
                  <TableCell>{income.recurring ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{income.notes || '-'}</TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(income.id)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default IncomeSection;
