import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Grid,
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import { formatCurrency } from '../utils/calculations.js';

function SavingsSection({ savings, setSavings }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    currentBalance: '',
    monthlyDeposit: '',
    goal: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.monthlyDeposit) {
      alert('Please enter a name and monthly deposit');
      return;
    }

    const newSaving = {
      id: Date.now(),
      ...formData,
      currentBalance: parseFloat(formData.currentBalance || 0),
      monthlyDeposit: parseFloat(formData.monthlyDeposit),
      goal: parseFloat(formData.goal || 0),
    };

    setSavings([...savings, newSaving]);
    setFormData({
      name: '',
      currentBalance: '',
      monthlyDeposit: '',
      goal: '',
    });
    setShowForm(false); // Hide form after adding
  };

  const handleDelete = (id) => {
    setSavings(savings.filter((saving) => saving.id !== id));
  };

  const calculateMonthsToGoal = (currentBalance, monthlyDeposit, goal) => {
    if (!goal || goal <= currentBalance) return 0;
    if (monthlyDeposit <= 0) return null;
    return Math.ceil((goal - currentBalance) / monthlyDeposit);
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Hide Form' : 'Add Savings Account'}
        </Button>
      </Box>

      {showForm && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Add Savings Account
          </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Account Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Monthly Deposit"
                name="monthlyDeposit"
                type="number"
                value={formData.monthlyDeposit}
                onChange={handleChange}
                inputProps={{ step: '0.01', min: '0' }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Savings Goal (Optional)"
                name="goal"
                type="number"
                value={formData.goal}
                onChange={handleChange}
                inputProps={{ step: '0.01', min: '0' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" startIcon={<Add />}>
                Add Savings Account
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
              <TableCell>Account Name</TableCell>
              <TableCell>Current Balance</TableCell>
              <TableCell>Monthly Deposit</TableCell>
              <TableCell>Goal</TableCell>
              <TableCell>Months to Goal</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No savings accounts yet
                </TableCell>
              </TableRow>
            ) : (
              savings.map((saving) => (
                <TableRow key={saving.id}>
                  <TableCell>{saving.name}</TableCell>
                  <TableCell>{formatCurrency(saving.currentBalance)}</TableCell>
                  <TableCell>{formatCurrency(saving.monthlyDeposit)}</TableCell>
                  <TableCell>{saving.goal ? formatCurrency(saving.goal) : '-'}</TableCell>
                  <TableCell>
                    {saving.goal ? (
                      calculateMonthsToGoal(
                        saving.currentBalance,
                        saving.monthlyDeposit,
                        saving.goal
                      ) !== null
                        ? calculateMonthsToGoal(
                            saving.currentBalance,
                            saving.monthlyDeposit,
                            saving.goal
                          ) + ' months'
                        : 'Invalid deposit'
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(saving.id)}
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

export default SavingsSection;
