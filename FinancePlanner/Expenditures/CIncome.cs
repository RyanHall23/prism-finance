using System;
using System.Diagnostics;

namespace FinancePlanner
{
    class CIncome
    {
        COverview ov = new COverview();
        private static decimal s_Salary = 0.00m;
        private static decimal s_MonthSalary = 0.00m;

        /// <summary>
        /// Income static constructor
        /// </summary>
        static CIncome() // Instanciating object
        {

        }

        /// <summary>
        /// Sets salary and divides by 12 to work out Monthly Salary
        /// TODO: Calculate National Insurance and TAX after entering data
        /// </summary>
        /// <param name="salary"></param>
        public void SetSalary(decimal salary)
        {
            s_Salary = salary;
            s_MonthSalary = (salary / 12);
            ov.SetIncome(salary);
        }

        /// <summary>
        /// Get annual salary
        /// </summary>
        /// <returns></returns>
        public decimal GetSalaryYear()
        {
            return s_Salary;
        }

        /// <summary>
        /// Gets Monthly Salary
        /// </summary>
        /// <returns></returns>
        public decimal GetSalaryMonth()
        {
            return s_MonthSalary;
        }
    }
}
