namespace FinancePlanner
{
    class COverview
    {
        // Single Expense

        // Expenses
        private static decimal s_ExpenseTotalY;        // Yearly - Auto set from \/ (*12)
        private static decimal s_ExpenseTotalM;         // Monthly                <-

        // Income
        private static decimal s_IncomeY;               // Yearly                 <-
        private static decimal s_IncomeM;              // Monthly - Auto set from /\ (/12)

        // Pension
        private static decimal s_PensionPercent;     // Percentage to be calcuated from wages
        private static decimal s_PensionY;          // Yearly Total
        private static decimal s_PensionM;          // Monthly Total

        // Savings
        private static decimal s_SavingsY;          // Yearly
        private static decimal s_SavingsM;          // Monthly

        // Overview (Strictly)
        private static decimal s_MarginY;           // Yearly
        private static decimal s_MarginM;            // Monthly
        private static decimal s_TotalOutY;         // Total = Income - (Expense + Savings + Pension)


        // Instanciating object
        static COverview()
        {
            // Create
        }

        // Margin
        public static void SetMargin(decimal a)
        {
            s_MarginY = a;
        }

        public static decimal GetMargin()
        {
            return s_MarginY;
        }

        /// Income
        //Sets Income Yearly and Monthly
        public void SetIncome(decimal a)
        {
            s_IncomeY = a;
            s_IncomeM = (a / 12);
        }

        // Gets Yearly Income
        public decimal GetIncomeYear()
        {
            return s_IncomeY;
        }

        public decimal GetIncomeMonth()
        {
            return s_IncomeM;
        }

        // Total Out
        public void SetTotalOut(decimal a)
        {
            s_TotalOutY = a;
        }

        public decimal GetTotalOut()
        {
            return s_TotalOutY;
        }

        // Expenses
        public void SetMonthlyAndYearlyExpensesTotal(decimal a)
        {
            s_ExpenseTotalM = a;
            s_ExpenseTotalY = (a * 12);
        }

        public decimal GetExpensesTotalMonth()
        {
            return s_ExpenseTotalM;
        }

        public decimal GetExpensesTotalYear()
        {
            return s_ExpenseTotalY;
        }

        // Savings
        public void SetSavings(decimal a)
        {
            s_SavingsM = a;
        }

        public decimal GetSavings()
        {
            return s_SavingsM;
        }

        // Pension
        public void SetPensionAmt(decimal a)
        {
            s_PensionY = a;
            s_PensionM = (a / 12);
        }

        public decimal GetPensionAmt()
        {
            return s_PensionY;
        }

        public void SetPensionPer(decimal a)
        {
            s_PensionPercent = a;
        }

        public decimal GetPensionPer()
        {
            return s_PensionPercent;
        }
    }
}
