import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Grid,
} from '@mui/material';

function EditIncomeDialog({ open, onClose, income, onSave }) {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Salary',
    date: '',
    recurring: false,
    notes: '',
    payDay: 25,
    name: '',
    label: '',
    frequency: 'monthly',
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    if (income) {
      setFormData({
        amount: income.amount || '',
        category: income.category || 'Salary',
        date: income.date || new Date().toISOString().split('T')[0],
        recurring: income.recurring || false,
        notes: income.notes || '',
        payDay: income.payDay || 25,
        name: income.name || '',
        label: income.label || '',
        frequency: income.frequency || 'monthly',
        start_date: income.start_date || income.date || new Date().toISOString().split('T')[0],
        end_date: income.end_date || '',
      });
    }
  }, [income]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    if (name === 'start_date') {
      setFormData({
        ...formData,
        [name]: newValue,
        date: newValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: newValue,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const updatedIncome = {
      ...income,
      ...formData,
      amount: parseFloat(formData.amount),
    };

    onSave(updatedIncome);
  };

  const categories = ['Salary', 'Bonus', 'Freelance', 'Investment', 'Gift', 'Other'];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Income</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
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
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Company Salary"
                helperText="Specific payment name"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Label"
                name="label"
                value={formData.label}
                onChange={handleChange}
                placeholder="e.g., Employment, Bonus"
                helperText="Category or label"
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
              <TextField
                fullWidth
                label={formData.recurring ? "Start Date" : "Date"}
                name="start_date"
                type="date"
                value={formData.start_date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                helperText={formData.recurring ? "When does this payment start?" : "Payment date"}
                required
              />
            </Grid>
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
            {formData.recurring && (
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    select
                    label="Frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                  >
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="End Date (Optional)"
                    name="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    helperText="Leave empty for indefinite"
                  />
                </Grid>
              </>
            )}
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EditIncomeDialog;
