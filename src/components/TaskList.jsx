import React from 'react';
import {
	List,
	Paper,
	Typography,
	ToggleButtonGroup,
	ToggleButton,
	Box,
} from '@mui/material';
import { useTasks } from '../contexts/TaskContext';
import { TaskItem } from './TaskItem';

export const TaskList = () => {
	const { state, dispatch } = useTasks();
	const { tasks, filter, sort } = state;

	const filteredTasks = tasks.filter((task) => {
		if (filter === 'completed') return task.completed;
		if (filter === 'pending') return !task.completed;
		return true;
	});

	const sortedTasks = [...filteredTasks].sort((a, b) => {
		if (sort === 'newest') return b.createdAt - a.createdAt;
		if (sort === 'oldest') return a.createdAt - b.createdAt;
		if (sort === 'completed') return b.completed - a.completed;
		if (sort === 'pending') return a.completed - b.completed;
		return 0;
	});

	const handleFilterChange = (event, newFilter) => {
		if (newFilter !== null) {
			dispatch({ type: 'SET_FILTER', payload: newFilter });
		}
	};

	const handleSortChange = (event, newSort) => {
		if (newSort !== null) {
			dispatch({ type: 'SET_SORT', payload: newSort });
		}
	};

	return (
		<Paper elevation={3} sx={{ p: 2 }}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
				<ToggleButtonGroup
					value={filter}
					exclusive
					onChange={handleFilterChange}
					aria-label="task filter"
					size="small"
				>
					<ToggleButton value="all" aria-label="all tasks">
						All
					</ToggleButton>
					<ToggleButton value="pending" aria-label="pending tasks">
						Pending
					</ToggleButton>
					<ToggleButton value="completed" aria-label="completed tasks">
						Completed
					</ToggleButton>
				</ToggleButtonGroup>

				<ToggleButtonGroup
					value={sort}
					exclusive
					onChange={handleSortChange}
					aria-label="task sort"
					size="small"
				>
					<ToggleButton value="newest" aria-label="newest first">
						Newest
					</ToggleButton>
					<ToggleButton value="oldest" aria-label="oldest first">
						Oldest
					</ToggleButton>
				</ToggleButtonGroup>
			</Box>

			{sortedTasks.length === 0 ? (
				<Typography variant="body1" align="center" sx={{ p: 2 }}>
					No tasks found. Add a new task to get started!
				</Typography>
			) : (
				<List dense>
					{sortedTasks.map((task) => (
						<TaskItem key={task.id} task={task} />
					))}
				</List>
			)}
		</Paper>
	);
};
