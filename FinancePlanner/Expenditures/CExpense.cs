using System;
using System.Diagnostics;

namespace FinancePlanner.Expenditures
{
    class CExpense
    {
        private string m_strName;    // Name of Expense
        private decimal m_decAmount; // Amount of Expense
        private bool m_bRec;       // Is Expense re-occuring? True==Yes | False==No
        public CExpense(string eName, decimal eAmount, bool eRec) // Instanciating object
        {
            try
            {
                m_strName = eName;
                m_decAmount = eAmount;
                m_bRec = eRec;
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }

        }
    }
}
