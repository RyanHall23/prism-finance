using System;
using System.Diagnostics;

namespace FinancePlanner.Navigation_Pages
{
    class CExpenses
    {
        COverview ov = new COverview();
        private static decimal s_MonthExpenses = 0.00m;
        private static decimal s_YearExpenses = 0.00m;

        /// <summary>
        /// Income static constructor
        /// </summary>
        static CExpenses() // Instanciating object
        {

        }

        /// <summary>
        /// Sets monthly expenses & yearly expenses
        /// </summary>
        /// <param name="a"></param>
        public void SetMonthlyAndYearlyExpenses(decimal monthly)   // Pass "monthly" through to keep members private
        {
            s_MonthExpenses = monthly;
            s_YearExpenses = (monthly * 12);            // Set total reoccuring expenses by multiplying monthly expenses by 12
            ov.SetMonthlyAndYearlyExpensesTotal(monthly);    // Auto monthly & yearly expenses in overview
        }

        /// <summary>
        /// Gets monthly expenses
        /// </summary>
        /// <returns></returns>
        public decimal GetMonthExpenses()
        {
            return s_MonthExpenses;
        }

        /// <summary>
        /// Gets Yearly Expenses
        /// </summary>
        /// <returns></returns>
        public decimal GetYearlyExpenses()
        {
            return s_YearExpenses;
        }
    }
}
