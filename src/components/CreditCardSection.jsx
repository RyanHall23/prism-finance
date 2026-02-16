import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Grid,
  Alert,
} from '@mui/material';
import { Save } from '@mui/icons-material';
import { formatCurrency, calculateMonthlyInterest } from '../utils/calculations.js';

function CreditCardSection({ creditCard, setCreditCard }) {
  const [formData, setFormData] = useState(creditCard);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const apr = parseFloat(formData.apr || 0);
    if (apr < 0 || apr > 100) {
      alert('APR must be between 0 and 100');
      return;
    }

    const updatedCreditCard = {
      limit: parseFloat(formData.limit || 0),
      apr: apr,
      currentBalance: parseFloat(formData.currentBalance || 0),
    };

    setCreditCard(updatedCreditCard);
    alert('Credit card details saved!');
  };

  const monthlyInterest = calculateMonthlyInterest(
    parseFloat(formData.currentBalance || 0),
    parseFloat(formData.apr || 0)
  );

  const availableCredit = parseFloat(formData.limit || 0) - parseFloat(formData.currentBalance || 0);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Credit Card Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Credit Card Limit"
                name="limit"
                type="number"
                value={formData.limit}
                onChange={handleChange}
                inputProps={{ step: '0.01', min: '0' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="APR (%)"
                name="apr"
                type="number"
                value={formData.apr}
                onChange={handleChange}
                inputProps={{ step: '0.01', min: '0', max: '100' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Current Balance"
                name="currentBalance"
                type="number"
                value={formData.currentBalance}
                onChange={handleChange}
                inputProps={{ step: '0.01', min: '0' }}
                helperText="Amount currently owed on credit card"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" startIcon={<Save />}>
                Save Credit Card Details
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Credit Card Summary
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography color="text.secondary">Credit Limit</Typography>
            <Typography variant="h6">{formatCurrency(formData.limit || 0)}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography color="text.secondary">Current Balance</Typography>
            <Typography variant="h6">{formatCurrency(formData.currentBalance || 0)}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography color="text.secondary">Available Credit</Typography>
            <Typography variant="h6" color={availableCredit >= 0 ? 'success.main' : 'error.main'}>
              {formatCurrency(availableCredit)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography color="text.secondary">Monthly Interest</Typography>
            <Typography variant="h6" color="warning.main">
              {formatCurrency(monthlyInterest)}
            </Typography>
          </Grid>
        </Grid>

        {parseFloat(formData.currentBalance || 0) > parseFloat(formData.limit || 0) && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Current balance exceeds credit card limit!
          </Alert>
        )}
      </Paper>
    </Box>
  );
}

export default CreditCardSection;
