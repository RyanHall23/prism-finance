using System;
using System.Windows.Controls;

namespace FinancePlanner.Navigation_Pages
{
    /// <summary>
    /// Interaction logic for CalendarPage.xaml
    /// </summary>
    public partial class CalendarPage : Page
    {
        public CalendarPage()
        {
            InitializeComponent();
            lblDateTime.Content = DateTime.Now.ToShortDateString(); // Sets the Date label to the current Date
        }
    }
}
