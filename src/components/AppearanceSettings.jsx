import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  LightMode,
  DarkMode,
  SettingsBrightness,
} from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext.jsx';

function AppearanceSettings() {
  const { baseMode, setBaseMode, prideTheme, setPrideTheme, availablePrideThemes } = useTheme();

  const baseModeOptions = [
    { key: 'light', name: 'Light', icon: LightMode, bg: '#ffffff', border: '#e0e0e0' },
    { key: 'dark', name: 'Dark', icon: DarkMode, bg: '#1e1e1e', border: '#424242' },
    { key: 'system', name: 'System', icon: SettingsBrightness, bg: 'linear-gradient(90deg, #ffffff 50%, #1e1e1e 50%)', border: '#9e9e9e' },
  ];

  const handleBaseModeChange = (mode) => {
    setBaseMode(mode);
  };

  const handlePrideThemeChange = (theme) => {
    setPrideTheme(theme);
  };

  // Generate flag stripe patterns for pride themes
  const getFlagPattern = (themeKey) => {
    switch (themeKey) {
      case 'transPride':
        // Trans flag: 5 horizontal stripes (blue, pink, white, pink, blue)
        return 'linear-gradient(to bottom, #5BCEFA 0%, #5BCEFA 20%, #F5A9B8 20%, #F5A9B8 40%, #FFFFFF 40%, #FFFFFF 60%, #F5A9B8 60%, #F5A9B8 80%, #5BCEFA 80%, #5BCEFA 100%)';
      
      case 'biPride':
        // Bi flag: 3 horizontal stripes (pink 40%, purple 20%, blue 40%)
        return 'linear-gradient(to bottom, #D60270 0%, #D60270 40%, #9B4F96 40%, #9B4F96 60%, #0038A8 60%, #0038A8 100%)';
      
      case 'gayPride':
        // Rainbow flag: 6 horizontal stripes (red, orange, yellow, green, blue, purple)
        return 'linear-gradient(to bottom, #E40303 0%, #E40303 16.67%, #FF8C00 16.67%, #FF8C00 33.33%, #FFED00 33.33%, #FFED00 50%, #008026 50%, #008026 66.67%, #24408E 66.67%, #24408E 83.33%, #732982 83.33%, #732982 100%)';
      
      case 'nonBinary':
        // Non-binary flag: 4 horizontal stripes (yellow, white, purple, black)
        return 'linear-gradient(to bottom, #FCF434 0%, #FCF434 25%, #FFFFFF 25%, #FFFFFF 50%, #9C59D1 50%, #9C59D1 75%, #2C2C2C 75%, #2C2C2C 100%)';
      
      case 'lesbian':
        // Lesbian flag: 5 horizontal stripes (dark orange, orange, white, pink, dark pink)
        return 'linear-gradient(to bottom, #D62800 0%, #D62800 20%, #FF9A56 20%, #FF9A56 40%, #FFFFFF 40%, #FFFFFF 60%, #D162A4 60%, #D162A4 80%, #A40062 80%, #A40062 100%)';
      
      case 'none':
      default:
        // Grey circle for "None" option
        return '#e0e0e0';
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Appearance
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Customize the look and feel of your application
      </Typography>

      {/* Base Theme Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          Base Theme
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            p: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            justifyContent: 'center',
            backgroundColor: 'background.default',
          }}
        >
          {baseModeOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = baseMode === option.key;
            
            return (
              <Tooltip key={option.key} title={option.name} arrow>
                <Box
                  onClick={() => handleBaseModeChange(option.key)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: option.bg,
                      border: '3px solid',
                      borderColor: isSelected ? 'primary.main' : option.border,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isSelected ? 4 : 1,
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      '&::after': isSelected ? {
                        content: '""',
                        position: 'absolute',
                        inset: -6,
                        borderRadius: '50%',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        opacity: 0.3,
                      } : {},
                    }}
                  >
                    <Icon
                      sx={{
                        color: option.key === 'light' ? '#1976d2' : option.key === 'dark' ? '#90caf9' : 'text.primary',
                        fontSize: 32,
                      }}
                    />
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: isSelected ? 600 : 400,
                      color: isSelected ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    {option.name}
                  </Typography>
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Pride Theme Section */}
      <Box>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          Pride Theme
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Choose a pride theme that will be applied as accent colors on top of your base theme
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            p: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            justifyContent: 'center',
            backgroundColor: 'background.default',
          }}
        >
          {availablePrideThemes.map((option) => {
            const isSelected = prideTheme === option.key;
            
            return (
              <Tooltip key={option.key} title={option.name} arrow>
                <Box
                  onClick={() => handlePrideThemeChange(option.key)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: getFlagPattern(option.key),
                      border: '3px solid',
                      borderColor: isSelected ? 'primary.main' : 'divider',
                      boxShadow: isSelected ? 4 : 1,
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::after': isSelected ? {
                        content: '""',
                        position: 'absolute',
                        inset: -6,
                        borderRadius: '50%',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        opacity: 0.3,
                      } : {},
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: isSelected ? 600 : 400,
                      color: isSelected ? 'primary.main' : 'text.secondary',
                      maxWidth: 80,
                      textAlign: 'center',
                    }}
                  >
                    {option.name}
                  </Typography>
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      </Box>
    </Paper>
  );
}

export default AppearanceSettings;
