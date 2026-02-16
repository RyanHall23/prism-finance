using System;
using System.Diagnostics;

namespace FinancePlanner.Navigation_Pages
{
    class CSavings
    {
        COverview ov = new COverview();
        private static decimal s_MonthSavings = 0.00m;
        private static decimal s_YearSavings = 0.00m;

        /// <summary>
        /// Savings static constructor
        /// </summary>
        static CSavings() // Instanciating object
        {

        }

        /// <summary>
        /// Sets monthly and yearly savings
        /// </summary>
        /// <param name="a"></param>
        public void SetMonthlyAndYearlySavings(decimal monthly)   // Pass A through to keep members private
        {
            s_MonthSavings = monthly;
            s_YearSavings = (monthly * 12);    // Set total expenses by multiplying monthly expenses by 12
            ov.SetSavings(monthly);
        }

        /// <summary>
        /// Gets monthly savings
        /// </summary>
        /// <returns></returns>
        public decimal GetMonthSavings()
        {
            return s_MonthSavings;
        }

        /// <summary>
        /// Gets yearly savings
        /// </summary>
        /// <returns></returns>
        public decimal GetYearlyExpenses()
        {
            return s_YearSavings;
        }
    }
}
