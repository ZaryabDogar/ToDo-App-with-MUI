import React, { createContext, useContext, useEffect, useReducer } from 'react';

const TaskContext = createContext();

const taskReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TASK':
			return { ...state, tasks: [...state.tasks, action.payload] };
		case 'EDIT_TASK':
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === action.payload.id ? action.payload : task
				),
			};
		case 'DELETE_TASK':
			return {
				...state,
				tasks: state.tasks.filter((task) => task.id !== action.payload),
			};
		case 'TOGGLE_TASK':
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === action.payload
						? { ...task, completed: !task.completed }
						: task
				),
			};
		case 'SET_FILTER':
			return { ...state, filter: action.payload };
		case 'SET_SORT':
			return { ...state, sort: action.payload };
		case 'SET_TASKS':
			return { ...state, tasks: action.payload };
		default:
			return state;
	}
};

export const TaskProvider = ({ children, initialTasks, setStoredTasks }) => {
	const [state, dispatch] = useReducer(taskReducer, {
		tasks: initialTasks || [],
		filter: 'all',
		sort: 'newest',
	});

	useEffect(() => {
		setStoredTasks(state.tasks);
	}, [state.tasks, setStoredTasks]);

	return (
		<TaskContext.Provider value={{ state, dispatch }}>
			{children}
		</TaskContext.Provider>
	);
};

export const useTasks = () => useContext(TaskContext);
