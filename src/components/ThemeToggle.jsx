import React from 'react';
import { IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const ThemeToggle = ({ onToggle }) => {
	const theme = useTheme();

	return (
		<IconButton onClick={onToggle} color="inherit">
			{theme.palette.mode === 'dark' ? (
				<Brightness7Icon />
			) : (
				<Brightness4Icon />
			)}
		</IconButton>
	);
};
