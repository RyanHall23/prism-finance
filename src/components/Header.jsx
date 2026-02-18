import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Menu, MenuItem } from '@mui/material';
import { LightMode, DarkMode, AccountCircle } from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext.jsx';

function Header({ user, onLogout, onAccountClick }) {
  const { baseMode, setBaseMode, effectiveBaseMode } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeToggle = () => {
    // Toggle between light and dark mode
    if (baseMode === 'system') {
      // If in system mode, switch to opposite of effective mode
      setBaseMode(effectiveBaseMode === 'dark' ? 'light' : 'dark');
    } else {
      // Toggle between light and dark
      setBaseMode(baseMode === 'dark' ? 'light' : 'dark');
    }
  };

  const handleAccount = () => {
    handleClose();
    onAccountClick();
  };

  const handleLogout = () => {
    handleClose();
    onLogout();
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Prism Finance
        </Typography>
        {user && (
          <Typography variant="body2" sx={{ mr: 2 }}>
            {user.username}
          </Typography>
        )}
        <Box>
          <IconButton 
            color="inherit" 
            onClick={handleThemeToggle} 
            title={effectiveBaseMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {effectiveBaseMode === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>
          {user && (
            <>
              <IconButton
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleAccount}>Account Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
