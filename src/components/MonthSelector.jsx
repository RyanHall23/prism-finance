import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { format, addMonths, subMonths } from 'date-fns';

function MonthSelector({ selectedMonth, onMonthChange }) {
  const handlePreviousMonth = () => {
    onMonthChange(subMonths(selectedMonth, 1));
  };

  const handleNextMonth = () => {
    onMonthChange(addMonths(selectedMonth, 1));
  };

  const handleCurrentMonth = () => {
    onMonthChange(new Date());
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        mb: 3,
      }}
    >
      <IconButton onClick={handlePreviousMonth} size="large">
        <ChevronLeft />
      </IconButton>
      <Box sx={{ minWidth: 200, textAlign: 'center' }}>
        <Typography variant="h5" component="div">
          {format(selectedMonth, 'MMMM yyyy')}
        </Typography>
        <Typography 
          variant="caption" 
          component="div" 
          sx={{ cursor: 'pointer', color: 'primary.main' }}
          onClick={handleCurrentMonth}
        >
          Jump to current month
        </Typography>
      </Box>
      <IconButton onClick={handleNextMonth} size="large">
        <ChevronRight />
      </IconButton>
    </Box>
  );
}

export default MonthSelector;
