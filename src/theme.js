import { createContext, useMemo, useState } from 'react';
import { createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });


export const useMode = () => {
    const [mode, setMode] = useState('light'); // Default to light mode

    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
    }), []);

    const theme = useMemo(() => createTheme({
        palette: {
            mode,
            primary: {
                main: '#3f51b5', // Vibrant purple-blue
                light: '#757de8',
                dark: '#002984',
            },
            secondary: {
                main: '#ff4081', // Bright pink
                light: '#ff79b0',
                dark: '#c60055',
            },
            ...(mode === 'light' ? {
                background: {
                    default: '#f5f5f5',
                    paper: '#ffffff',
                },
                text: {
                    primary: '#212121',
                    secondary: '#757575',
                },
            } : {
                background: {
                    default: '#121212',
                    paper: '#1e1e1e',
                },
                text: {
                    primary: '#ffffff',
                    secondary: '#b3b3b3',
                },
            }),
            success: {
                main: '#4caf50', // Fresh green
            },
            warning: {
                main: '#ff9800', // Vibrant orange
            },
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            h6: {
                fontWeight: 500,
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        padding: '8px 16px',
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                        boxShadow: mode === 'light'
                            ? '0 4px 12px rgba(0, 0, 0, 0.1)'
                            : '0 4px 12px rgba(0, 0, 0, 0.3)',
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        borderRadius: 0,
                    },
                },
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        color: mode === 'light' ? 'rgba(0, 0, 0, 0.54)' : 'rgba(255, 255, 255, 0.7)',
                    },
                },
            },
        },
    }), [mode]);

    return [theme, colorMode];
};