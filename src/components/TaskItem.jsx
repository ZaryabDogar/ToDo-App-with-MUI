import React, { useState } from 'react';
import {
	Checkbox,
	IconButton,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	TextField,
	Typography,
} from '@mui/material';
import { Delete, Edit, Save } from '@mui/icons-material';
import { useTasks } from '../contexts/TaskContext';

export const TaskItem = ({ task }) => {
	const { dispatch } = useTasks();
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(task.title);
	const [editDescription, setEditDescription] = useState(
		task.description || ''
	);

	const handleToggle = () => {
		dispatch({ type: 'TOGGLE_TASK', payload: task.id });
	};

	const handleDelete = () => {
		dispatch({ type: 'DELETE_TASK', payload: task.id });
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		dispatch({
			type: 'EDIT_TASK',
			payload: {
				...task,
				title: editTitle,
				description: editDescription,
			},
		});
		setIsEditing(false);
	};

	return (
		<ListItem
			secondaryAction={
				<>
					{isEditing ? (
						<IconButton edge="end" onClick={handleSave}>
							<Save />
						</IconButton>
					) : (
						<IconButton edge="end" onClick={handleEdit}>
							<Edit />
						</IconButton>
					)}
					<IconButton edge="end" onClick={handleDelete}>
						<Delete />
					</IconButton>
				</>
			}
			disablePadding
		>
			<ListItemButton dense>
				<ListItemIcon>
					<Checkbox
						edge="start"
						checked={task.completed}
						onChange={handleToggle}
					/>
				</ListItemIcon>
				{isEditing ? (
					<div
						style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
					>
						<TextField
							value={editTitle}
							onChange={(e) => setEditTitle(e.target.value)}
							size="small"
							fullWidth
							margin="dense"
						/>
						<TextField
							value={editDescription}
							onChange={(e) => setEditDescription(e.target.value)}
							size="small"
							fullWidth
							margin="dense"
							placeholder="Description (optional)"
						/>
					</div>
				) : (
					<ListItemText
						primary={task.title}
						secondary={task.description}
						primaryTypographyProps={{
							style: {
								textDecoration: task.completed ? 'line-through' : 'none',
								color: task.completed ? 'text.secondary' : 'text.primary',
							},
						}}
						secondaryTypographyProps={{
							style: {
								textDecoration: task.completed ? 'line-through' : 'none',
								color: task.completed ? 'text.secondary' : 'text.primary',
							},
						}}
					/>
				)}
			</ListItemButton>
		</ListItem>
	);
};
