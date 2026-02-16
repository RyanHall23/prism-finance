import React, { useState, useEffect } from 'react';
import { Box, Grid, Tabs, Tab, Button, Stack } from '@mui/material';
import { FileDownload } from '@mui/icons-material';
import MonthSelector from './MonthSelector.jsx';
import FinancialProjectionChart from './FinancialProjectionChart.jsx';
import OverviewCards from './OverviewCards.jsx';
import IncomeSection from './IncomeSection.jsx';
import ExpenseSection from './ExpenseSection.jsx';
import SavingsSection from './SavingsSection.jsx';
import OverdraftSection from './OverdraftSection.jsx';
import CreditCardSection from './CreditCardSection.jsx';
import { exportToJSON } from '../utils/calculations.js';

function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  
  // State for all financial data
  const [incomes, setIncomes] = useState(() => {
    const saved = localStorage.getItem('incomes');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [savings, setSavings] = useState(() => {
    const saved = localStorage.getItem('savings');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [overdraft, setOverdraft] = useState(() => {
    const saved = localStorage.getItem('overdraft');
    return saved ? JSON.parse(saved) : { limit: 0, apr: 0, currentBalance: 0 };
  });
  
  const [creditCard, setCreditCard] = useState(() => {
    const saved = localStorage.getItem('creditCard');
    return saved ? JSON.parse(saved) : { limit: 0, apr: 0, currentBalance: 0 };
  });

  // Persist data to localStorage
  useEffect(() => {
    localStorage.setItem('incomes', JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('savings', JSON.stringify(savings));
  }, [savings]);

  useEffect(() => {
    localStorage.setItem('overdraft', JSON.stringify(overdraft));
  }, [overdraft]);

  useEffect(() => {
    localStorage.setItem('creditCard', JSON.stringify(creditCard));
  }, [creditCard]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleExportJSON = () => {
    const allData = {
      incomes,
      expenses,
      savings,
      overdraft,
      creditCard,
    };
    exportToJSON(allData, 'finance-planner-data.json');
  };

  return (
    <Box>
      <MonthSelector 
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />

      <Stack direction="row" spacing={2} sx={{ mb: 3 }} justifyContent="flex-end">
        <Button
          variant="outlined"
          startIcon={<FileDownload />}
          onClick={handleExportJSON}
        >
          Export JSON
        </Button>
      </Stack>

      <OverviewCards
        incomes={incomes}
        expenses={expenses}
        savings={savings}
        overdraft={overdraft}
        creditCard={creditCard}
      />

      <FinancialProjectionChart
        incomes={incomes}
        expenses={expenses}
        savings={savings}
        selectedMonth={selectedMonth}
        overdraft={overdraft}
        creditCard={creditCard}
      />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Income" />
          <Tab label="Expenses" />
          <Tab label="Savings" />
          <Tab label="Overdraft" />
          <Tab label="Credit Card" />
        </Tabs>
      </Box>

      <Box sx={{ mt: 3 }}>
        {activeTab === 0 && (
          <IncomeSection incomes={incomes} setIncomes={setIncomes} />
        )}
        {activeTab === 1 && (
          <ExpenseSection expenses={expenses} setExpenses={setExpenses} />
        )}
        {activeTab === 2 && (
          <SavingsSection savings={savings} setSavings={setSavings} />
        )}
        {activeTab === 3 && (
          <OverdraftSection overdraft={overdraft} setOverdraft={setOverdraft} />
        )}
        {activeTab === 4 && (
          <CreditCardSection creditCard={creditCard} setCreditCard={setCreditCard} />
        )}
      </Box>
    </Box>
  );
}

export default Dashboard;
