/**
 * Recurring Payment Service
 * Handles dynamic generation of recurring payments for a given month
 */

import { startOfMonth, endOfMonth, addMonths, addWeeks, addYears, parseISO, isBefore, isAfter, isWithinInterval, format } from 'date-fns';

class RecurringPaymentService {
  /**
   * Generate recurring entries for a specific month
   * @param {Array} baseEntries - Original entries from database
   * @param {Date} targetMonth - The month to generate recurring entries for
   * @returns {Array} - All entries that apply to the target month
   */
  static generateForMonth(baseEntries, targetMonth = new Date()) {
    const monthStart = startOfMonth(targetMonth);
    const monthEnd = endOfMonth(targetMonth);
    const generatedEntries = [];

    baseEntries.forEach(entry => {
      if (entry.recurring) {
        // Use new fields if available, otherwise fall back to legacy fields
        const startDate = entry.start_date ? parseISO(entry.start_date) : parseISO(entry.date);
        const endDate = entry.end_date ? parseISO(entry.end_date) : null;
        const frequency = entry.frequency || 'monthly';

        // Generate all occurrences for this entry in the target month
        const occurrences = this.generateOccurrences(
          startDate,
          endDate,
          frequency,
          monthStart,
          monthEnd
        );

        occurrences.forEach(occurrenceDate => {
          generatedEntries.push({
            ...entry,
            date: format(occurrenceDate, 'yyyy-MM-dd'),
            isGenerated: true, // Mark as dynamically generated
            originalId: entry.id // Keep reference to original entry
          });
        });
      } else {
        // One-off entries: include if in target month
        const entryDate = parseISO(entry.date);
        if (isWithinInterval(entryDate, { start: monthStart, end: monthEnd })) {
          generatedEntries.push({
            ...entry,
            isGenerated: false
          });
        }
      }
    });

    return generatedEntries;
  }

  /**
   * Generate all occurrences of a recurring entry within a date range
   * @param {Date} startDate - When the recurring payment starts
   * @param {Date} endDate - When the recurring payment ends (null = indefinite)
   * @param {string} frequency - 'weekly', 'monthly', 'yearly'
   * @param {Date} rangeStart - Start of the range to generate for
   * @param {Date} rangeEnd - End of the range to generate for
   * @returns {Array<Date>} - Array of occurrence dates
   */
  static generateOccurrences(startDate, endDate, frequency, rangeStart, rangeEnd) {
    const occurrences = [];
    let currentDate = new Date(startDate);

    // Start from the first occurrence that's not before rangeStart
    while (isBefore(currentDate, rangeStart)) {
      currentDate = this.getNextOccurrence(currentDate, frequency);
    }

    // Generate occurrences within the range
    while (!isAfter(currentDate, rangeEnd)) {
      // Check if we've passed the end date
      if (endDate && isAfter(currentDate, endDate)) {
        break;
      }

      occurrences.push(new Date(currentDate));
      currentDate = this.getNextOccurrence(currentDate, frequency);
    }

    return occurrences;
  }

  /**
   * Get the next occurrence date based on frequency
   * @param {Date} currentDate - Current occurrence date
   * @param {string} frequency - 'weekly', 'monthly', 'yearly'
   * @returns {Date} - Next occurrence date
   */
  static getNextOccurrence(currentDate, frequency) {
    switch (frequency) {
      case 'weekly':
        return addWeeks(currentDate, 1);
      case 'monthly':
        return addMonths(currentDate, 1);
      case 'yearly':
        return addYears(currentDate, 1);
      default:
        return addMonths(currentDate, 1); // Default to monthly
    }
  }

  /**
   * Validate recurring payment data
   * @param {Object} data - Payment data to validate
   * @returns {Object} - Validation result {valid: boolean, errors: Array}
   */
  static validate(data) {
    const errors = [];

    // If recurring, start_date is required
    if (data.recurring && !data.start_date) {
      errors.push('start_date is required for recurring payments');
    }

    // Validate end_date > start_date
    if (data.start_date && data.end_date) {
      const startDate = parseISO(data.start_date);
      const endDate = parseISO(data.end_date);
      
      if (!isAfter(endDate, startDate)) {
        errors.push('end_date must be after start_date');
      }
    }

    // Validate frequency
    if (data.recurring && data.frequency && !['weekly', 'monthly', 'yearly'].includes(data.frequency)) {
      errors.push('frequency must be one of: weekly, monthly, yearly');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

export default RecurringPaymentService;
