import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Menu, MenuItem } from '@mui/material';
import { Palette, AccountCircle } from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext.jsx';

function Header({ user, onLogout, onAccountClick }) {
  const { selectedTheme, setSelectedTheme, availableThemes } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [themeAnchorEl, setThemeAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeMenu = (event) => {
    setThemeAnchorEl(event.currentTarget);
  };

  const handleThemeClose = () => {
    setThemeAnchorEl(null);
  };

  const handleThemeChange = (themeKey) => {
    setSelectedTheme(themeKey);
    handleThemeClose();
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
          <IconButton color="inherit" onClick={handleThemeMenu} title="Change Theme">
            <Palette />
          </IconButton>
          <Menu
            anchorEl={themeAnchorEl}
            open={Boolean(themeAnchorEl)}
            onClose={handleThemeClose}
          >
            {availableThemes.map((theme) => (
              <MenuItem 
                key={theme.key} 
                onClick={() => handleThemeChange(theme.key)}
                selected={selectedTheme === theme.key}
              >
                {theme.name}
              </MenuItem>
            ))}
          </Menu>
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
