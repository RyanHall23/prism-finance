using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Controls;

namespace FinancePlanner.Navigation_Pages
{
    /// <summary>
    /// Interaction logic for IncomePage.xaml
    /// </summary>
    public partial class IncomePage : Page
    {
        CIncome income = new CIncome();

        decimal decIncomeSalary;

        public IncomePage()
        {
            InitializeComponent();
            txtSalary.Text = income.GetSalaryYear().ToString();
            lblSalaryMonthAmt.Content = income.GetSalaryMonth();
        }

        private void BtnConfSalary_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                decimal.TryParse(txtSalary.Text, out decIncomeSalary);
                income.SetSalary(decIncomeSalary);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }

        }
    }
}
