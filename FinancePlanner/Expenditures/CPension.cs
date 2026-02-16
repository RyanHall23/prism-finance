using System;
using System.Diagnostics;

namespace FinancePlanner.Navigation_Pages
{
    class CPension
    {
        COverview ov = new COverview();

        private static decimal s_MonthPension = 0.00m;
        private static decimal s_YearPension = 0.00m;
        private static decimal s_PercentPension = 0.00m;

        /// <summary>
        /// Pension static constructor
        /// </summary>
        static CPension() // Instanciating object
        {

        }

        /// <summary>
        /// Sets monthly Pension and yearly pension
        /// </summary>
        /// <param name="a"></param>
        public void SetPercentageAmount(decimal percentage)   // Pass A through to keep members private
        {
            s_PercentPension = percentage;
            s_YearPension = ((s_PercentPension / 100) * ov.GetIncomeYear());
            s_MonthPension = (s_YearPension / 12);
            ov.SetPensionPer(s_PercentPension);
            ov.SetPensionAmt(s_YearPension);

            //Calculate income from percentage paid to pension and copy to overview Class

        }

        /// <summary>
        /// Gets monthly Pension
        /// </summary>
        /// <returns></returns>
        public decimal GetMonthlyPensionAmount()
        {
            return s_MonthPension;
        }

        /// <summary>
        /// Gets Yearly Pension
        /// </summary>
        /// <returns></returns>
        public decimal GetYearlyPensionAmount()
        {
            return s_YearPension;
        }
    }
}
