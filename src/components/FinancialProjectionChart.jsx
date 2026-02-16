import React, { useMemo } from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  format, 
  isSameDay,
  parseISO 
} from 'date-fns';

function FinancialProjectionChart({ incomes, expenses, savings, selectedMonth, overdraft, creditCard }) {
  const theme = useTheme();

  const chartData = useMemo(() => {
    const monthStart = startOfMonth(selectedMonth);
    const monthEnd = endOfMonth(selectedMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    let runningBalance = 0;
    const data = daysInMonth.map((day) => {
      let dayIncome = 0;
      let dayExpense = 0;
      let daySavings = 0;

      // Calculate income for this day
      incomes.forEach((income) => {
        const incomeDate = parseISO(income.date);
        if (isSameDay(incomeDate, day)) {
          dayIncome += income.amount;
        }
      });

      // Calculate expenses for this day
      expenses.forEach((expense) => {
        const expenseDate = parseISO(expense.date);
        if (isSameDay(expenseDate, day)) {
          dayExpense += expense.amount;
        }
      });

      // Calculate savings deposits for this day
      savings.forEach((saving) => {
        // Assume savings are deposited on the 1st of each month
        if (day.getDate() === 1) {
          daySavings += saving.monthlyDeposit;
        }
      });

      // Update running balance
      runningBalance += dayIncome - dayExpense - daySavings;

      return {
        date: format(day, 'MMM dd'),
        income: dayIncome,
        expense: dayExpense,
        balance: runningBalance,
        day: format(day, 'yyyy-MM-dd'),
      };
    });

    return data;
  }, [incomes, expenses, savings, selectedMonth]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2" gutterBottom>
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ color: entry.color }}
            >
              {entry.name}: £{entry.value.toFixed(2)}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Monthly Financial Projection
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Daily breakdown showing income, expenses, and projected balance for {format(selectedMonth, 'MMMM yyyy')}
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis 
            dataKey="date" 
            stroke={theme.palette.text.secondary}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            stroke={theme.palette.text.secondary}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `£${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine y={0} stroke={theme.palette.error.main} strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="income"
            stroke={theme.palette.success.main}
            strokeWidth={2}
            name="Income"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke={theme.palette.error.main}
            strokeWidth={2}
            name="Expenses"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke={theme.palette.primary.main}
            strokeWidth={3}
            name="Balance"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default FinancialProjectionChart;
