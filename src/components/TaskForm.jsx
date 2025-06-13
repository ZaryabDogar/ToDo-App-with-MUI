import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useTasks } from '../contexts/TaskContext';

export const TaskForm = () => {
	const { dispatch } = useTasks();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim()) return;

		const newTask = {
			id: Date.now().toString(),
			title,
			description: description.trim() || undefined,
			completed: false,
			createdAt: Date.now(),
		};

		dispatch({ type: 'ADD_TASK', payload: newTask });
		setTitle('');
		setDescription('');
	};

	return (
		<Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
			<TextField
				label="Task Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				fullWidth
				margin="normal"
				required
			/>
			<TextField
				label="Description (optional)"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				fullWidth
				margin="normal"
				multiline
				rows={2}
			/>
			<Button type="submit" variant="contained" fullWidth>
				Add Task
			</Button>
		</Box>
	);
};
