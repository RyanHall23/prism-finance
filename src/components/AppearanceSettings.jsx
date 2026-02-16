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

  // Generate circular gradient previews for pride themes
  const getPridePreview = (colors) => {
    if (!colors) return '#e0e0e0';
    
    const colorArray = [colors.primary, colors.secondary];
    if (colors.accent) colorArray.push(colors.accent);
    
    // Create a conic gradient for circular preview
    const step = 100 / colorArray.length;
    const stops = colorArray.map((color, i) => 
      `${color} ${i * step}%, ${color} ${(i + 1) * step}%`
    ).join(', ');
    
    return `conic-gradient(${stops})`;
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
                      background: getPridePreview(option.colors),
                      border: '3px solid',
                      borderColor: isSelected ? 'primary.main' : 'divider',
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
