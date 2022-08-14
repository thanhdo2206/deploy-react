import React from 'react';
import {
	Box,
	Checkbox,
	ClickAwayListener,
	Grid,
	Typography,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DragIndicatorSharpIcon from '@mui/icons-material/DragIndicatorSharp';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Drawer from '@mui/material/Drawer';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ButtonProjectList from '../../../components/ButtonProjectList/ButtonProjectList';
import { createTaskApi } from '../../../redux/actions/TaskAction';
import './projectTask.css';

const styles = {
	task: {
		borderLeft: 'none',
		fontSize: '13px',
		cursor: 'pointer',
	},
	icon: {
		fontSize: '15px',
	},
	menu: {
		display: 'flex',
		justifyContent: 'space',
	},
	blank: {
		background: '#EEEFF5',
		borderLeft: '1px solid #EEEFF5',
		cursor: 'pointer',
	}
};

export default function ProjectTask(props) {
	const {
		onClickAddTask,
		isAddTaskBelow,
		taskOrderInSection,
		taskOrderInProject,
		sectionId,
		projectId,
	} = props;
	const taskOrders = taskOrderInProject ? taskOrderInProject : [];

	const isAddTask = isAddTaskBelow ? 1 : 2;
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.authReducer.currentUser);
	const handlePressKeyTitleTask = value => {
		if (value.key === 'Enter') {
			value.target.blur();
		}
	};

	const handleEditTitleTask = e => {
		const titleTask = e.target.value;
		const titleTaskEdit = !titleTask.trim() ? '' : titleTask;
		if (titleTaskEdit === '') {
			onClickAddTask();
			return;
		}
		const taskCreate = {
			taskName: titleTask,
			createBy: currentUser.email,
			projectId: projectId,
			sectionId: sectionId,
		};
		dispatch(createTaskApi(taskCreate, taskOrderInSection, isAddTask));
		e.target.value = '';
		onClickAddTask();
	};

	return (
		<Grid container className='taskName__container'>
			<Grid item xs={4} style={styles.task} className='taskName__block'>
				<Box className='taskName__block--input'>
					<Box className='row-drag-handle'>
						<ButtonProjectList
							icon={<DragIndicatorSharpIcon style={styles.icon} />}
							id='title__icon--hover'
						/>
					</Box>
					<Checkbox
						label='CheckCircleOutlineIcon'
						icon={<CheckCircleOutlineIcon sx={{ width: '18px' }} />}
						checkedIcon={<CheckCircleIcon sx={{ color: '#368E6A', width: '18px' }} />}
						inputProps={{ 'aria-label': 'controlled' }}
						sx={{
							zIndex: '2',
							'&:hover': { color: '#368E6A !important' },
							px: 0,
							py: 0,
							mr: 1,
						}}
					/>
					<input
						type='text'
						className='taskName__input'
						onKeyPress={handlePressKeyTitleTask}
						onBlur={handleEditTitleTask}
						ref={input => input && input.focus()}
						placeholder='write a task name'
					/>
					<Box className='css__focus'></Box>
				</Box>
			</Grid>
			<Grid item xs={8} style={styles.blank}>

			</Grid>
		</Grid>
	);
}
