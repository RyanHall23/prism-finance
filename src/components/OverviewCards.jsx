import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  TrendingDown,
  Savings,
  CreditCard,
} from '@mui/icons-material';
import {
  calculateTotalMonthlyIncome,
  calculateTotalMonthlyExpenses,
  calculateMonthlyInterest,
  formatCurrency,
} from '../utils/calculations.js';

function OverviewCards({ incomes, expenses, savings, overdraft, creditCard }) {
  const totalIncome = calculateTotalMonthlyIncome(incomes);
  const totalExpenses = calculateTotalMonthlyExpenses(expenses);
  const totalSavings = savings.reduce((sum, s) => sum + parseFloat(s.monthlyDeposit || 0), 0);
  const remainingBalance = totalIncome - totalExpenses - totalSavings;
  
  const overdraftInterest = calculateMonthlyInterest(
    parseFloat(overdraft.currentBalance || 0),
    parseFloat(overdraft.apr || 0)
  );
  
  const creditCardInterest = calculateMonthlyInterest(
    parseFloat(creditCard.currentBalance || 0),
    parseFloat(creditCard.apr || 0)
  );

  const cards = [
    {
      title: 'Monthly Income',
      value: formatCurrency(totalIncome),
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: '#4caf50',
    },
    {
      title: 'Monthly Expenses',
      value: formatCurrency(totalExpenses),
      icon: <TrendingDown sx={{ fontSize: 40 }} />,
      color: '#f44336',
    },
    {
      title: 'Monthly Savings',
      value: formatCurrency(totalSavings),
      icon: <Savings sx={{ fontSize: 40 }} />,
      color: '#2196f3',
    },
    {
      title: 'Remaining Balance',
      value: formatCurrency(remainingBalance),
      icon: <AccountBalance sx={{ fontSize: 40 }} />,
      color: remainingBalance >= 0 ? '#4caf50' : '#f44336',
    },
    {
      title: 'Overdraft Interest',
      value: formatCurrency(overdraftInterest),
      icon: <CreditCard sx={{ fontSize: 40 }} />,
      color: '#ff9800',
    },
    {
      title: 'Credit Card Interest',
      value: formatCurrency(creditCardInterest),
      icon: <CreditCard sx={{ fontSize: 40 }} />,
      color: '#ff9800',
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    {card.title}
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    {card.value}
                  </Typography>
                </Box>
                <Box sx={{ color: card.color }}>
                  {card.icon}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default OverviewCards;
