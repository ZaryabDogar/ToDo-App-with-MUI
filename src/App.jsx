import {
	AppBar,
	Box,
	Container,
	CssBaseline,
	Toolbar,
	Typography,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect } from 'react';
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
			<TaskProvider initialTasks={storedTasks} setStoredTasks={setStoredTasks}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							ToDo App Zaryab Dogar
						</Typography>
						<ThemeToggle onToggle={colorMode.toggleColorMode} />
					</Toolbar>
				</AppBar>
				<Container maxWidth="md" sx={{ mt: 4 }}>
					<Box sx={{ mb: 4 }}>
						<TaskForm />
					</Box>
					<TaskList />
				</Container>
			</TaskProvider>
		</ThemeProvider>
	);
}
export default App;
