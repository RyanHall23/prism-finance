import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ThemeContext = createContext();

// Base theme configurations
const baseThemes = {
  light: {
    mode: 'light',
    palette: {
      mode: 'light',
      background: { default: '#f5f5f5', paper: '#ffffff' },
      text: {
        primary: '#000000',
        secondary: '#666666',
      },
    },
  },
  dark: {
    mode: 'dark',
    palette: {
      mode: 'dark',
      background: { default: '#121212', paper: '#1e1e1e' },
      text: {
        primary: '#ffffff',
        secondary: '#b3b3b3',
      },
    },
  },
};

// Pride theme color configurations (applied as accent colors)
const prideThemes = {
  none: {
    name: 'None',
    colors: null,
  },
  transPride: {
    name: 'Trans Pride',
    colors: {
      primary: '#5BCEFA', // Light blue
      secondary: '#F5A9B8', // Light pink
      accent: '#ffffff', // White
    },
    chart: ['#5BCEFA', '#F5A9B8', '#ffffff', '#91D8F7', '#F8C5D1', '#4A9FC9'],
  },
  biPride: {
    name: 'Bi Pride',
    colors: {
      primary: '#D60270', // Magenta
      secondary: '#9B4F96', // Purple
      accent: '#0038A8', // Blue
    },
    chart: ['#D60270', '#9B4F96', '#0038A8', '#E04898', '#B76AB5', '#4A6BC4'],
  },
  gayPride: {
    name: 'Rainbow Pride',
    colors: {
      primary: '#E40303', // Red
      secondary: '#FF8C00', // Orange
      accent: '#008026', // Green
    },
    chart: ['#E40303', '#FF8C00', '#FFED00', '#008026', '#24408E', '#732982'],
  },
  nonBinary: {
    name: 'Non-Binary',
    colors: {
      primary: '#9C59D1', // Purple
      secondary: '#FCF434', // Yellow
      accent: '#2C2C2C', // Dark grey
    },
    chart: ['#FCF434', '#ffffff', '#9C59D1', '#2C2C2C', '#B88DE0', '#8A8A8A'],
  },
  lesbian: {
    name: 'Lesbian Pride',
    colors: {
      primary: '#D62800', // Dark orange
      secondary: '#FF9A56', // Light orange
      accent: '#A40062', // Dark pink
    },
    chart: ['#D62800', '#FF9A56', '#ffffff', '#D162A4', '#A40062', '#E85D3D'],
  },
};

export const ThemeProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  const [baseMode, setBaseMode] = useState(() => {
    const saved = localStorage.getItem('prismBaseMode');
    return saved || 'system';
  });

  const [prideTheme, setPrideTheme] = useState(() => {
    const saved = localStorage.getItem('prismPrideTheme');
    return saved || 'none';
  });

  useEffect(() => {
    localStorage.setItem('prismBaseMode', baseMode);
  }, [baseMode]);

  useEffect(() => {
    localStorage.setItem('prismPrideTheme', prideTheme);
  }, [prideTheme]);

  // Determine effective base mode (resolve 'system' to actual mode)
  const effectiveBaseMode = useMemo(() => {
    if (baseMode === 'system') {
      return prefersDarkMode ? 'dark' : 'light';
    }
    return baseMode;
  }, [baseMode, prefersDarkMode]);

  const theme = useMemo(() => {
    const base = baseThemes[effectiveBaseMode];
    const pride = prideThemes[prideTheme];

    // Start with base palette
    const palette = { ...base.palette };

    // Apply pride theme colors if selected
    if (pride.colors) {
      palette.primary = { main: pride.colors.primary };
      palette.secondary = { main: pride.colors.secondary };
    } else {
      // Default primary/secondary for base themes
      if (effectiveBaseMode === 'light') {
        palette.primary = { main: '#1976d2' };
        palette.secondary = { main: '#dc004e' };
      } else {
        palette.primary = { main: '#90caf9' };
        palette.secondary = { main: '#f48fb1' };
      }
    }

    return createTheme({
      palette,
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
      transitions: {
        duration: {
          shortest: 150,
          shorter: 200,
          short: 250,
          standard: 300,
          complex: 375,
          enteringScreen: 225,
          leavingScreen: 195,
        },
      },
    });
  }, [effectiveBaseMode, prideTheme]);

  // Chart colors based on pride theme or defaults
  const chartColors = useMemo(() => {
    const pride = prideThemes[prideTheme];
    if (pride.chart) {
      return pride.chart;
    }
    // Default chart colors based on effective mode
    if (effectiveBaseMode === 'dark') {
      return ['#90caf9', '#f48fb1', '#81c784', '#ffb74d', '#ba68c8', '#4dd0e1'];
    }
    return ['#1976d2', '#dc004e', '#388e3c', '#f57c00', '#7b1fa2', '#0097a7'];
  }, [effectiveBaseMode, prideTheme]);

  const value = {
    theme,
    baseMode,
    setBaseMode,
    prideTheme,
    setPrideTheme,
    effectiveBaseMode,
    availablePrideThemes: Object.keys(prideThemes).map(key => ({
      key,
      name: prideThemes[key].name,
      colors: prideThemes[key].colors,
    })),
    chartColors,
    // Backwards compatibility - expose old selectedTheme API
    selectedTheme: prideTheme !== 'none' ? prideTheme : effectiveBaseMode,
    setSelectedTheme: (themeKey) => {
      // Check if it's a pride theme
      if (prideThemes[themeKey]) {
        setPrideTheme(themeKey);
      } else if (themeKey === 'light' || themeKey === 'dark') {
        setBaseMode(themeKey);
        setPrideTheme('none');
      }
    },
    availableThemes: [
      { key: 'light', name: 'Light' },
      { key: 'dark', name: 'Dark' },
      ...Object.keys(prideThemes).filter(k => k !== 'none').map(key => ({
        key,
        name: prideThemes[key].name,
      })),
    ],
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
