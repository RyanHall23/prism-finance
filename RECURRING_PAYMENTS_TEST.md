# Recurring Payments Test Plan

## Overview
This document describes how the recurring payments feature now works and provides test scenarios.

## How It Works

### Frontend Recurring Payment Expansion

When a user navigates between months, the application now:

1. **Generates recurring entries dynamically** using `generateRecurringEntriesForMonth()`
2. **Passes expanded data** to charts and overview cards
3. **Recalculates totals** for each month independently

### Example Scenario

**User creates a recurring income:**
- Amount: £2,800
- Name: "Company Salary"
- Label: "Employment"
- Category: Salary
- Start Date: 2026-02-16
- Recurring: Yes
- Frequency: Monthly
- End Date: (empty - indefinite)

**What happens:**

**February 2026:**
- Shows £2,800 on Feb 16
- Monthly Income total: £2,800

**March 2026 (user clicks "Next Month"):**
- Automatically generates £2,800 on Mar 16
- Monthly Income total: £2,800

**April 2026:**
- Automatically generates £2,800 on Apr 16
- Monthly Income total: £2,800

And so on... indefinitely!

### Frequency Support

**Weekly Example:**
- Start Date: 2026-02-01
- Frequency: Weekly
- Generates: Feb 1, Feb 8, Feb 15, Feb 22, Mar 1, Mar 8, etc.

**Monthly Example:**
- Start Date: 2026-02-16
- Frequency: Monthly
- Generates: Feb 16, Mar 16, Apr 16, May 16, etc.

**Yearly Example:**
- Start Date: 2026-02-16
- Frequency: Yearly
- Generates: Feb 16 2026, Feb 16 2027, Feb 16 2028, etc.

### End Date Support

**Example with end date:**
- Start Date: 2026-02-01
- End Date: 2026-05-31
- Frequency: Monthly
- Generates: Feb 1, Mar 1, Apr 1, May 1
- **Stops after May** (doesn't generate June)

## Test Scenarios

### Test 1: Monthly Salary
1. Add income: £2,800, Recurring, Monthly, Start: Feb 16, 2026
2. View February → Should show £2,800
3. Click "Next Month" → Should show £2,800 in March
4. Click "Next Month" → Should show £2,800 in April
5. Overview cards should update correctly each month

**Expected Result:** ✅ Recurring payment appears in all future months

### Test 2: Weekly Subscription
1. Add expense: £9.99, "Netflix", Recurring, Weekly, Start: Feb 1, 2026
2. View February → Should show 4 occurrences (Feb 1, 8, 15, 22)
3. View March → Should show 4-5 occurrences depending on calendar
4. Monthly Expenses should reflect correct total

**Expected Result:** ✅ Weekly payments generate correctly

### Test 3: Limited Duration Subscription
1. Add expense: £14.99, "Spotify Premium", Recurring, Monthly, Start: Feb 1, End: Apr 30, 2026
2. View February → Shows £14.99
3. View March → Shows £14.99
4. View April → Shows £14.99
5. View May → Should NOT show payment

**Expected Result:** ✅ Payments stop after end date

### Test 4: One-off Payment
1. Add expense: £500, "New Laptop", NOT Recurring, Date: Feb 20, 2026
2. View February → Shows £500
3. View March → Should NOT show £500
4. View January → Should NOT show £500

**Expected Result:** ✅ One-off payments only appear in their month

### Test 5: Multiple Recurring Items
1. Add income: £2,800, Monthly, Start: Feb 16
2. Add expense: £1,200, "Rent", Monthly, Start: Feb 1
3. Add expense: £9.99, "Netflix", Monthly, Start: Feb 1
4. Add expense: £300, "Groceries", Monthly, Start: Feb 1
5. View February:
   - Income: £2,800
   - Expenses: £1,509.99
   - Remaining: £1,290.01
6. View March → Same totals should appear

**Expected Result:** ✅ All recurring items propagate correctly

## Form Simplification

### Before (Confusing):
- Date field (required)
- Start Date field (only for recurring)
- User had to enter same date twice

### After (Simplified):
- One date field that changes label:
  - "Date" for one-off payments
  - "Start Date" for recurring payments
- End Date field (only for recurring, optional)

**Benefits:**
- ✅ Less confusion
- ✅ No duplicate data entry
- ✅ Clearer intent

## Technical Implementation

### Files Changed
1. **src/utils/recurringPayments.js** (NEW)
   - `generateRecurringEntriesForMonth()` - Main expansion logic
   - `generateOccurrences()` - Calculates all dates in range
   - `getNextOccurrence()` - Handles frequency logic

2. **src/components/Dashboard.jsx**
   - Added `useMemo` to generate `monthlyIncomes` and `monthlyExpenses`
   - Passes expanded arrays to child components
   - Automatically recalculates when `selectedMonth` changes

3. **src/utils/calculations.js**
   - Simplified to just sum all amounts (no date logic)
   - Works with pre-expanded data

4. **src/components/IncomeSection.jsx**
   - Removed redundant date field
   - Start Date now serves dual purpose
   - Auto-syncs with internal date field

5. **src/components/ExpenseSection.jsx**
   - Same changes as IncomeSection

## Algorithm Details

### Expansion Algorithm
```javascript
For each base entry in localStorage:
  If entry.recurring:
    startDate = entry.start_date
    endDate = entry.end_date || null
    frequency = entry.frequency || 'monthly'
    
    currentDate = startDate
    While currentDate < monthStart:
      currentDate = getNextOccurrence(currentDate, frequency)
    
    While currentDate <= monthEnd:
      If endDate exists and currentDate > endDate:
        Break
      Generate entry with date = currentDate
      currentDate = getNextOccurrence(currentDate, frequency)
  Else:
    If entry.date is in current month:
      Include entry as-is
```

### Performance
- **Worst case:** 100 recurring entries × 12 months = 1,200 calculations
- **Time complexity:** O(n × m) where n = entries, m = max occurrences per month
- **Optimization:** Uses `useMemo` to cache results per month
- **Typical performance:** < 1ms for normal usage

## Validation

### Date Validation
- Start date must be valid
- End date must be after start date (backend validation exists)
- Dates use ISO format (YYYY-MM-DD)

### Frequency Validation
- Must be one of: 'weekly', 'monthly', 'yearly'
- Defaults to 'monthly' if not specified

## Known Limitations

1. **No partial months:** If a weekly payment starts mid-month, it still generates for full weeks
2. **No business day adjustment:** Unlike salary payDay logic, recurring payments use exact dates
3. **LocalStorage only:** Changes not persisted to backend (by design, maintains existing behavior)
4. **No recurring edits:** Editing a recurring item doesn't update future occurrences (would need ID tracking)

## Future Enhancements

1. **Backend integration:** Use the backend RecurringPaymentService API
2. **Edit all occurrences:** Allow editing all future instances
3. **Skip occurrences:** Mark specific months as skipped
4. **Business day rules:** Apply working day logic to all recurring payments
5. **Prorated amounts:** Handle partial months for weekly payments
