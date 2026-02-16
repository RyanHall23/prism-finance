using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Controls;

namespace FinancePlanner.Navigation_Pages
{
    /// <summary>
    /// Interaction logic for PensionPage.xaml
    /// </summary>
    public partial class PensionPage : Page
    {
        COverview ov = new COverview();
        CPension pen = new CPension();

        decimal dPercentPension;

        public PensionPage()
        {
            InitializeComponent();
            lblDateTime.Content = DateTime.Now.ToShortDateString(); // Sets the Date label to the current Date
            txtPensionPercent.Text = pen.GetMonthlyPensionAmount().ToString();  // Perecentage of Yearly salary to be deducted into pension
            lblPensionMonthAmt.Content = pen.GetMonthlyPensionAmount();
            lblPensionYearlyAmt.Content = pen.GetYearlyPensionAmount();
        }

        private void BtnConfMonthlyPension_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                decimal.TryParse(txtPensionPercent.Text, out dPercentPension);
                pen.SetPercentageAmount(dPercentPension);    // Logic is carried out within the Pension Class
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }

        }
    }
}
