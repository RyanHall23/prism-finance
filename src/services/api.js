const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to make authenticated requests
const authFetch = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired or invalid
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Authentication required');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
};

// Auth API
export const authAPI = {
  register: async (username, email, password) => {
    const data = await authFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  login: async (email, password) => {
    const data = await authFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  getProfile: async () => {
    return await authFetch('/auth/profile');
  },

  updateProfile: async (username, email) => {
    const data = await authFetch('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify({ username, email }),
    });
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  updatePassword: async (currentPassword, newPassword) => {
    return await authFetch('/auth/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  deleteAccount: async (password) => {
    return await authFetch('/auth/account', {
      method: 'DELETE',
      body: JSON.stringify({ password }),
    });
  },
};

// Financial API
export const financialAPI = {
  // Overview
  getOverview: async () => {
    return await authFetch('/financial/overview');
  },

  // Income
  getIncomes: async () => {
    return await authFetch('/financial/incomes');
  },

  createIncome: async (income) => {
    return await authFetch('/financial/incomes', {
      method: 'POST',
      body: JSON.stringify(income),
    });
  },

  updateIncome: async (id, income) => {
    return await authFetch(`/financial/incomes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(income),
    });
  },

  deleteIncome: async (id) => {
    return await authFetch(`/financial/incomes/${id}`, {
      method: 'DELETE',
    });
  },

  // Expenses
  getExpenses: async () => {
    return await authFetch('/financial/expenses');
  },

  createExpense: async (expense) => {
    return await authFetch('/financial/expenses', {
      method: 'POST',
      body: JSON.stringify(expense),
    });
  },

  updateExpense: async (id, expense) => {
    return await authFetch(`/financial/expenses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(expense),
    });
  },

  deleteExpense: async (id) => {
    return await authFetch(`/financial/expenses/${id}`, {
      method: 'DELETE',
    });
  },

  // Savings
  getSavings: async () => {
    return await authFetch('/financial/savings');
  },

  createSavings: async (savings) => {
    return await authFetch('/financial/savings', {
      method: 'POST',
      body: JSON.stringify(savings),
    });
  },

  updateSavings: async (id, savings) => {
    return await authFetch(`/financial/savings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(savings),
    });
  },

  deleteSavings: async (id) => {
    return await authFetch(`/financial/savings/${id}`, {
      method: 'DELETE',
    });
  },

  // Overdraft
  getOverdraft: async () => {
    return await authFetch('/financial/overdraft');
  },

  updateOverdraft: async (overdraft) => {
    return await authFetch('/financial/overdraft', {
      method: 'PUT',
      body: JSON.stringify(overdraft),
    });
  },

  // Credit Card
  getCreditCard: async () => {
    return await authFetch('/financial/credit-card');
  },

  updateCreditCard: async (creditCard) => {
    return await authFetch('/financial/credit-card', {
      method: 'PUT',
      body: JSON.stringify(creditCard),
    });
  },
};

export default { authAPI, financialAPI };
