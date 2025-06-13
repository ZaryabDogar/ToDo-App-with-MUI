// App.jsx
import {
	AppBar,
	Box,
	Container,
	CssBaseline,
	GlobalStyles,
	Toolbar,
	Typography,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { ThemeToggle } from './components/ThemeToggle';
import { TaskProvider } from './contexts/TaskContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useMode } from './theme';

function App() {
	const [theme, colorMode] = useMode();
	const [storedTasks, setStoredTasks] = useLocalStorage('tasks', []);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<GlobalStyles
				styles={{
					body: {
						background:
							theme.palette.mode === 'light'
								? 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)'
								: 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)',
						minHeight: '100vh',
						transition: 'all 0.3s ease',
					},
				}}
			/>
			<TaskProvider initialTasks={storedTasks} setStoredTasks={setStoredTasks}>
				<AppBar position="static" elevation={1}>
					<Toolbar>
						<Typography
							variant="h6"
							component="div"
							sx={{
								flexGrow: 1,
								fontWeight: 700,
								color:
									theme.palette.mode === 'light'
										? theme.palette.primary.dark
										: theme.palette.primary.light,
							}}
						>
							Todo App Zaryab Dogar
						</Typography>
						<ThemeToggle onToggle={colorMode.toggleColorMode} />
					</Toolbar>
				</AppBar>
				<Container maxWidth="md" sx={{ py: 4 }}>
					<Box
						sx={{
							mb: 4,
							transition: 'all 0.3s ease',
						}}
					>
						<TaskForm />
					</Box>
					<TaskList />
				</Container>
			</TaskProvider>
		</ThemeProvider>
	);
}

export default App;
