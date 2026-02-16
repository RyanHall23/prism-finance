# Prism Finance UI Updates - Visual Guide

## Theme System

### Header with Theme Selector

The application header now features:
- **"Prism Finance"** branding (replaced "Finance Planner")
- **Palette icon** for theme selection (replaced simple dark/light toggle)
- User menu with account settings and logout

**Accessing Themes:**
1. Click the palette icon (🎨) in the header
2. Select from 7 available themes:
   - Light
   - Dark
   - Trans Pride
   - Bi Pride
   - Rainbow Pride
   - Non-Binary
   - Lesbian Pride

### Theme Color Schemes

**Light Theme** (Default)
- Primary: #1976d2 (Professional Blue)
- Secondary: #dc004e (Accent Red)
- Background: #f5f5f5 / #ffffff
- Chart Colors: Blues, reds, greens, oranges

**Dark Theme**
- Primary: #90caf9 (Light Blue)
- Secondary: #f48fb1 (Pink)
- Background: #121212 / #1e1e1e
- Chart Colors: Lighter versions for dark background

**Trans Pride**
- Primary: #5BCEFA (Light Blue)
- Secondary: #F5A9B8 (Light Pink)
- Accent: #ffffff (White)
- Clean, professional representation of trans flag colors

**Bi Pride**
- Primary: #D60270 (Magenta)
- Secondary: #9B4F96 (Purple)
- Accent: #0038A8 (Blue)
- Vibrant bi pride flag colors

**Rainbow Pride**
- Primary: #E40303 (Red)
- Secondary: #FF8C00 (Orange)
- Accent: #008026 (Green)
- Full spectrum rainbow representation

**Non-Binary**
- Primary: #9C59D1 (Purple)
- Secondary: #FCF434 (Yellow)
- Accent: #2C2C2C (Dark Grey)
- Non-binary flag colors with high contrast

**Lesbian Pride**
- Primary: #D62800 (Dark Orange)
- Secondary: #FF9A56 (Light Orange)
- Accent: #A40062 (Dark Pink)
- Lesbian flag-inspired color scheme

### Charts Integration

Financial projection charts automatically adapt colors based on selected theme:
- Income line uses theme color #3
- Expense line uses theme color #2
- Balance line uses primary theme color

All charts maintain:
- WCAG contrast compliance
- Professional appearance
- Clear data visualization
- Accessible tooltips

## Enhanced Income/Expense Forms

### New Fields

**Basic Information** (existing)
- Amount (required)
- Category (dropdown)
- Date

**New: Name & Label**
- **Name** field - Specific payment identifier
  - Placeholder: "e.g., Company Salary" or "e.g., Netflix"
  - Helper text: "Specific payment name"
- **Label** field - Category/grouping
  - Placeholder: "e.g., Employment, Bonus" or "e.g., Entertainment"
  - Helper text: "Category or label"

**Recurring Payment Options** (shown only when "Recurring" is checked)
- **Frequency** dropdown
  - Weekly
  - Monthly (default)
  - Yearly
- **Start Date** 
  - Date picker
  - Helper text: "When does this payment start?"
- **End Date** (optional)
  - Date picker
  - Helper text: "Leave empty for indefinite"

### Form Layout

Forms are organized in a responsive grid:
- 3 columns on desktop (md+)
- 2 columns on tablet (sm)
- 1 column on mobile (xs)

Recurring-specific fields appear conditionally below the recurring checkbox when enabled.

## Updated Data Tables

### Income Table Columns

1. Amount (£)
2. Name (new)
3. Label (new)
4. Category
5. Date
6. Recurring (Yes/No)
7. Frequency (new - shows only for recurring)
8. Notes
9. Actions (Delete button)

### Expense Table Columns

1. Amount (£)
2. Name (new)
3. Label (new)
4. Category
5. Date
6. Recurring (Yes/No)
7. Frequency (new - shows only for recurring)
8. Notes
9. Actions (Delete button)

### Table Behavior

- Empty state: "No income/expense entries yet" (centered message)
- Responsive: Horizontal scroll on mobile if needed
- Consistent Material-UI styling
- Delete button with confirmation (red color)

## User Experience Improvements

### Better Payment Organization

**Before:**
```
Amount: £9.99
Category: Subscription
Recurring: Yes
```

**After:**
```
Amount: £9.99
Name: Netflix
Label: Entertainment
Category: Subscription
Recurring: Yes
Frequency: Monthly
Start Date: 2024-01-01
End Date: 2024-12-31
```

### Clearer Financial Tracking

Users can now:
1. **Identify** specific payments by name
2. **Group** payments by custom labels
3. **Schedule** with flexible frequencies
4. **Set expiration** with end dates
5. **Visualize** with theme-appropriate colors

### Accessibility

All themes maintain:
- ✅ WCAG AA contrast ratios minimum
- ✅ Readable text on all backgrounds
- ✅ Clear visual hierarchy
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility

## Mobile Responsiveness

The application adapts seamlessly:

**Desktop (1200px+)**
- Full 3-column form layout
- Wide tables with all columns visible
- Side-by-side charts and data

**Tablet (600-1200px)**
- 2-column form layout
- Tables may scroll horizontally
- Stacked components

**Mobile (<600px)**
- Single column form layout
- Horizontal scroll tables
- Touch-friendly buttons and inputs
- Condensed header

## Professional Fintech Design

Despite Pride theme options, the application maintains:
- Clean, professional interface
- No excessive gradients or decorations
- Subtle color applications
- Business-appropriate aesthetics
- Optional theme selection (not forced)

## Branding Consistency

"Prism Finance" branding appears:
- Application title (index.html)
- Header component
- Login/Register pages
- All documentation
- Package names
- Database names

The "Prism" identity reflects:
- Diversity (multiple themes/colors)
- Clarity (transparent financial tracking)
- Precision (accurate calculations)
- Spectrum (comprehensive features)

---

**Note:** This is a visual guide describing the UI changes. For technical implementation details, see `REFACTORING_SUMMARY.md`. For migration instructions, see `MIGRATION_GUIDE.md`.
