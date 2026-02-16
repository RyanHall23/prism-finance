using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Controls;

namespace FinancePlanner.Navigation_Pages
{
    /// <summary>
    /// Interaction logic for ExpensesPage.xaml
    /// </summary>
    public partial class ExpensesPage : Page
    {
        COverview ov = new COverview();
        CExpenses exps = new CExpenses();

        decimal decExpensesMo;

        public ExpensesPage()
        {
            InitializeComponent();
            lblDateTime.Content = DateTime.Now.ToShortDateString(); // Sets the Date label to the current Date
            txtExpensesMonthlyAmt.Text = exps.GetMonthExpenses().ToString();
            lblExpensesMonthAmt.Content = exps.GetMonthExpenses();
            lblExpensesYearlyAmt.Content = exps.GetYearlyExpenses();

            // CExpense a = new CExpense("Travel", 94.0m, true);  // Example of Expense object to be added into expense table/report

        }

        private void BtnConfMonthlyExpenses_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                decimal.TryParse(txtExpensesMonthlyAmt.Text, out decExpensesMo);
                exps.SetMonthlyAndYearlyExpenses(decExpensesMo);
                ov.SetMonthlyAndYearlyExpensesTotal(decExpensesMo);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }

        }
    }
}
