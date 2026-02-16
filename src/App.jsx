import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import Dashboard from './components/Dashboard.jsx';
import Header from './components/Header.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import { authAPI } from './services/api.js';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    return token && savedUser ? JSON.parse(savedUser) : null;
  });

  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setCurrentPage('dashboard');
  };

  const handleRegister = (registeredUser) => {
    setUser(registeredUser);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    setCurrentPage('login');
  };

  const handleAccountClick = () => {
    setCurrentPage('account');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleShowRegister = () => {
    setShowRegister(true);
  };

  const handleShowLogin = () => {
    setShowRegister(false);
  };

  // Show login/register if not authenticated
  if (!user) {
    if (showRegister) {
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RegisterPage 
            onRegister={handleRegister}
            onShowLogin={handleShowLogin}
          />
        </ThemeProvider>
      );
    }
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoginPage 
          onLogin={handleLogin}
          onShowRegister={handleShowRegister}
        />
      </ThemeProvider>
    );
  }

  // Show authenticated pages
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          user={user}
          onLogout={handleLogout}
          onAccountClick={handleAccountClick}
        />
        {currentPage === 'account' ? (
          <AccountPage 
            user={user} 
            onUpdate={handleUpdateUser}
            onBackToDashboard={handleBackToDashboard}
          />
        ) : (
          <Container maxWidth="xl" sx={{ py: 4 }}>
            <Dashboard />
          </Container>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
