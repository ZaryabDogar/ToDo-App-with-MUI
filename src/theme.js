import { createContext, useMemo, useState } from 'react';
import { createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

export const useMode = () => {
    const [mode, setMode] = useState('light'); // Changed default to 'light' for better demo

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const newMode = prevMode === 'light' ? 'dark' : 'light';
                    console.log(`Theme changed to ${newMode}`);
                    return newMode;
                });
            },
        }),
        [] // This can stay empty as it doesn't depend on external values
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode] // This correctly depends on mode
    );

    return [theme, colorMode];
};