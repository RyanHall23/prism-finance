using System;
using System.Windows.Controls;

namespace FinancePlanner.Navigation_Pages
{
    /// <summary>
    /// Interaction logic for OverviewPage.xaml
    /// </summary>
    public partial class OverviewPage : Page
    {
        CIncome income = new CIncome();
        CExpenses expenses = new CExpenses();
        CPension pension = new CPension();
        CSavings savings = new CSavings();


        public OverviewPage()
        {
            InitializeComponent();
            lblDateTime.Content = DateTime.Now.ToShortDateString(); // Sets the Date label to the current Date

            lblMarginAmt.Content = income.GetSalaryYear() - (expenses.GetYearlyExpenses() + pension.GetYearlyPensionAmount() + savings.GetYearlyExpenses());
            // Income
            lblInAmt.Content = income.GetSalaryYear();

            //Outgoings
            lblOutAmt.Content = (expenses.GetYearlyExpenses() + pension.GetYearlyPensionAmount() + savings.GetYearlyExpenses());
            lblExpensesAmt.Content = expenses.GetYearlyExpenses();
            lblPensionAmt.Content = pension.GetYearlyPensionAmount();
            lblSavingsAmt.Content = savings.GetYearlyExpenses();

        }
    }
}
