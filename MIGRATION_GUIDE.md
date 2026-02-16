# Migration Guide: FinancePlanner to Prism Finance

This guide will help you migrate from the old FinancePlanner application to the new Prism Finance system.

## Overview

Prism Finance is a complete modernization of the FinancePlanner application with significant improvements:

1. **Full Rebrand** - New name and professional branding
2. **Enhanced Recurring Payments** - Dynamic generation with flexible frequency
3. **Name/Label System** - Better payment categorization
4. **Pride Theme System** - Beautiful, accessible theme options
5. **No Legacy Code** - Removed all C#/.NET dependencies

## Database Migration

### Step 1: Backup Your Data

Before migrating, always backup your existing database:

```bash
pg_dump -U postgres -d finance_planner > backup_$(date +%Y%m%d).sql
```

### Step 2: Run Database Migration

The migration will add new fields to your existing data:

```bash
cd backend
npm run migrate
```

This adds:
- `frequency` (VARCHAR) - weekly/monthly/yearly
- `start_date` (DATE) - when recurring payment starts
- `end_date` (DATE) - when recurring payment ends (optional)
- `name` (VARCHAR) - specific payment name
- `label` (VARCHAR) - category/label

### Step 3: Update Environment Variables

Rename your database in `.env`:

```bash
# Old
DB_NAME=finance_planner

# New
DB_NAME=prism_finance
```

Or keep the old name if you prefer.

## Data Migration Notes

### Automatic Data Migration

The migration script automatically:
- Sets `name` = `category` for existing records
- Sets `label` = `category` for existing records  
- Sets `start_date` = `date` for existing records
- Sets `frequency` = `'monthly'` for recurring entries

### Manual Cleanup (Optional)

You may want to manually update payment names and labels for clarity:

```sql
-- Example: Update subscription names
UPDATE expenses 
SET name = 'Netflix', label = 'Entertainment'
WHERE category = 'Subscription' AND notes LIKE '%Netflix%';

UPDATE expenses 
SET name = 'Spotify', label = 'Entertainment'
WHERE category = 'Subscription' AND notes LIKE '%Spotify%';

-- Example: Update salary
UPDATE incomes
SET name = 'Monthly Salary', label = 'Employment'
WHERE category = 'Salary';
```

## Application Updates

### Frontend Changes

The frontend now includes:
- New form fields for name, label, frequency, start_date, end_date
- Theme selector in header (Palette icon)
- Enhanced table views with additional columns

### Backend Changes

New endpoints support month-based queries:
```
GET /api/financial/incomes?month=2024-03-01
GET /api/financial/expenses?month=2024-03-01
```

These dynamically generate recurring entries for the specified month.

## Theme System

### Using the New Themes

Click the **Palette icon** in the header to access themes:
- Light (default)
- Dark
- Trans Pride
- Bi Pride
- Rainbow Pride
- Non-Binary
- Lesbian Pride

### Theme Persistence

Your theme preference is saved in localStorage as `prismTheme`.

## Recurring Payments

### Old Behavior
- Simple boolean flag (recurring: true/false)
- Fixed to monthly frequency
- No end date support

### New Behavior
- Flexible frequency (weekly/monthly/yearly)
- Start and end dates
- Dynamic generation per month
- Backward compatible with old data

### Example: Creating a Recurring Payment

**Old Way:**
```javascript
{
  amount: 9.99,
  category: "Subscription",
  recurring: true,
  date: "2024-01-01"
}
```

**New Way:**
```javascript
{
  amount: 9.99,
  name: "Netflix",
  label: "Entertainment",
  category: "Subscription",
  recurring: true,
  frequency: "monthly",
  start_date: "2024-01-01",
  end_date: "2024-12-31" // or null for indefinite
}
```

## Name vs Label

### Understanding the Difference

**Name** = Specific payment identifier
- "Netflix", "Spotify", "Rent - Oak Street Apartment"

**Label** = Broader category
- "Entertainment", "Housing", "Transportation"

**Category** = Legacy field (kept for compatibility)
- Still used internally but consider using name/label going forward

### Best Practices

1. Use **name** for specific merchants/sources
2. Use **label** for filtering and reporting
3. Make labels reusable across multiple payments

## API Changes

### New Query Parameters

```javascript
// Get incomes for a specific month (generates recurring entries)
GET /api/financial/incomes?month=2024-03-01

// Get expenses for a specific month (generates recurring entries)
GET /api/financial/expenses?month=2024-03-01
```

### Enhanced Validation

The API now validates:
- `end_date` must be after `start_date`
- `frequency` must be one of: weekly, monthly, yearly
- `start_date` is required for recurring payments

## Breaking Changes

### None!

This update is designed to be **100% backward compatible**. Existing data will continue to work without modification.

## Rollback Plan

If you need to rollback:

1. Restore from backup:
```bash
psql -U postgres -d finance_planner < backup_YYYYMMDD.sql
```

2. Checkout previous git commit
```bash
git checkout <previous-commit-hash>
```

3. Reinstall dependencies
```bash
npm install
cd backend && npm install
```

## Testing After Migration

1. **Start Backend:**
```bash
cd backend
npm run dev
```

2. **Start Frontend:**
```bash
npm run dev
```

3. **Test Checklist:**
- [ ] Existing incomes display correctly
- [ ] Existing expenses display correctly  
- [ ] Can create new income with new fields
- [ ] Can create new expense with new fields
- [ ] Themes switch correctly
- [ ] Charts display with theme colors
- [ ] Recurring payments appear in future months

## Support

If you encounter issues:
1. Check backend logs for errors
2. Verify database connection
3. Ensure migrations completed successfully
4. Check browser console for frontend errors

## FAQ

**Q: Do I need to manually update all my existing data?**
A: No, the migration handles existing data automatically.

**Q: Can I still use the old category system?**
A: Yes, categories are still fully supported.

**Q: What happens to my localStorage data?**
A: If you were using localStorage (older versions), you'll need to re-enter data into the database-backed system.

**Q: Are Pride themes required?**
A: No, Light and Dark themes are still available. Pride themes are optional.

## Next Steps

After successful migration:
1. Explore the theme system
2. Update existing payments with better names/labels
3. Set end dates on recurring payments that should expire
4. Try different frequencies for various payments
5. Enjoy the improved Prism Finance experience!
