import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

// Theme configurations with WCAG-compliant colors
const themeConfigs = {
  light: {
    name: 'Light',
    palette: {
      mode: 'light',
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
      background: { default: '#f5f5f5', paper: '#ffffff' },
    },
    chart: ['#1976d2', '#dc004e', '#388e3c', '#f57c00', '#7b1fa2', '#0097a7'],
  },
  dark: {
    name: 'Dark',
    palette: {
      mode: 'dark',
      primary: { main: '#90caf9' },
      secondary: { main: '#f48fb1' },
      background: { default: '#121212', paper: '#1e1e1e' },
    },
    chart: ['#90caf9', '#f48fb1', '#81c784', '#ffb74d', '#ba68c8', '#4dd0e1'],
  },
  transPride: {
    name: 'Trans Pride',
    palette: {
      mode: 'light',
      primary: { main: '#5BCEFA' }, // Light blue
      secondary: { main: '#F5A9B8' }, // Light pink
      background: { default: '#ffffff', paper: '#fafafa' },
      accent: '#ffffff', // White
    },
    chart: ['#5BCEFA', '#F5A9B8', '#ffffff', '#91D8F7', '#F8C5D1', '#4A9FC9'],
  },
  biPride: {
    name: 'Bi Pride',
    palette: {
      mode: 'light',
      primary: { main: '#D60270' }, // Magenta
      secondary: { main: '#9B4F96' }, // Purple
      background: { default: '#ffffff', paper: '#fafafa' },
      accent: '#0038A8', // Blue
    },
    chart: ['#D60270', '#9B4F96', '#0038A8', '#E04898', '#B76AB5', '#4A6BC4'],
  },
  gayPride: {
    name: 'Rainbow Pride',
    palette: {
      mode: 'light',
      primary: { main: '#E40303' }, // Red
      secondary: { main: '#FF8C00' }, // Orange
      background: { default: '#ffffff', paper: '#fafafa' },
      accent: '#008026', // Green
    },
    chart: ['#E40303', '#FF8C00', '#FFED00', '#008026', '#24408E', '#732982'],
  },
  nonBinary: {
    name: 'Non-Binary',
    palette: {
      mode: 'light',
      primary: { main: '#9C59D1' }, // Purple
      secondary: { main: '#FCF434' }, // Yellow
      background: { default: '#ffffff', paper: '#fafafa' },
      accent: '#2C2C2C', // Dark grey
    },
    chart: ['#FCF434', '#ffffff', '#9C59D1', '#2C2C2C', '#B88DE0', '#8A8A8A'],
  },
  lesbian: {
    name: 'Lesbian Pride',
    palette: {
      mode: 'light',
      primary: { main: '#D62800' }, // Dark orange
      secondary: { main: '#FF9A56' }, // Light orange
      background: { default: '#ffffff', paper: '#fafafa' },
      accent: '#A40062', // Dark pink
    },
    chart: ['#D62800', '#FF9A56', '#ffffff', '#D162A4', '#A40062', '#E85D3D'],
  },
};

export const ThemeProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(() => {
    const saved = localStorage.getItem('prismTheme');
    return saved || 'light';
  });

  useEffect(() => {
    localStorage.setItem('prismTheme', selectedTheme);
  }, [selectedTheme]);

  const theme = useMemo(() => {
    const config = themeConfigs[selectedTheme];
    return createTheme({
      palette: config.palette,
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      },
      components: {
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 8,
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 6,
              textTransform: 'none',
            },
          },
        },
      },
    });
  }, [selectedTheme]);

  const chartColors = themeConfigs[selectedTheme].chart;

  const value = {
    theme,
    selectedTheme,
    setSelectedTheme,
    availableThemes: Object.keys(themeConfigs).map(key => ({
      key,
      name: themeConfigs[key].name,
    })),
    chartColors,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
