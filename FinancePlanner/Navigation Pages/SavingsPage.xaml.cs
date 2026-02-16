using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Controls;

namespace FinancePlanner.Navigation_Pages
{
    /// <summary>
    /// Interaction logic for SavingsPage.xaml
    /// </summary>
    public partial class SavingsPage : Page
    {
        COverview ov = new COverview();
        CSavings svgs = new CSavings();

        decimal decExpensesMo;

        public SavingsPage()
        {
            InitializeComponent();
            lblDateTime.Content = DateTime.Now.ToShortDateString(); // Sets the Date label to the current Date
            txtSavingsMonthlyAmt.Text = svgs.GetMonthSavings().ToString();
            lblSavingsMonthAmt.Content = svgs.GetMonthSavings();
            lblSavingsYearlyAmt.Content = svgs.GetYearlyExpenses();
        }

        private void BtnConfMonthlyExpenses_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                decimal.TryParse(txtSavingsMonthlyAmt.Text, out decExpensesMo);
                svgs.SetMonthlyAndYearlySavings(decExpensesMo);
                ov.SetMonthlyAndYearlyExpensesTotal(decExpensesMo);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }

        }
    }
}
