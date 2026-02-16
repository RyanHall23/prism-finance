using System;
using System.Windows.Controls;

namespace FinancePlanner.Navigation_Pages
{
    /// <summary>
    /// Interaction logic for CurrentMonthPage.xaml
    /// </summary>
    public partial class CurrentMonthPage : Page
    {
        public CurrentMonthPage()
        {
            InitializeComponent();
            lblDateTime.Content = DateTime.Now.ToShortDateString(); // Sets the Date label to the current Date
        }
    }
}
