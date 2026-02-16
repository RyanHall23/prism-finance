using System;
using System.Windows.Controls;

namespace FinancePlanner.Navigation_Pages
{
    /// <summary>
    /// Interaction logic for AnnualPage.xaml
    /// </summary>
    public partial class AnnualPage : Page
    {
        public AnnualPage()
        {
            InitializeComponent();
            lblDateTime.Content = DateTime.Now.ToShortDateString(); // Sets the Date label to the current Date
        }
    }
}
