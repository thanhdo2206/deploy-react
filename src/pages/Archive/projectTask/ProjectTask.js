import React from 'react';
import { Box, Checkbox, Grid, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DragIndicatorSharpIcon from '@mui/icons-material/DragIndicatorSharp';
import Drawer from '@mui/material/Drawer';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './projectTask.css';
import MenuStatus from '../priority/MenuStatus';
import ButtonProjectList from '../../../components/ButtonProjectList/ButtonProjectList';
import TaskDetail from '../TaskDetail/TaskDetail';
import {
	assignTaskApi,
	completeTaskApi,
	updatePriorityTaskApi,
	updateTitleTaskApi,
} from '../../../redux/actions/TaskAction';
import { priorityArr, priorityMenu } from '../../../utils/priorityStatus';
import AssigneeBox from '../AssigneeBox';
import DueDateBox from '../DueDateBox';
import PriorityBox from '../PriorityBox';

const styles = {
	task: {
		border: '1px solid #CFCBCB',
		borderLeft: 'none',
		borderBottom: 'none',
		fontSize: '14px',
	},
	icon: {
		fontSize: '15px',
	},
	menu: {
		display: 'flex',
		justifyContent: 'space',
	},
};

const convertNumber = (arr, value) => {
	const arrCopy = [...arr];
	return arrCopy.indexOf(value);
};

const splitDate = date => {
	const cloneDate = date;
	return cloneDate.slice(0, 10);
};

export default function ProjectTask(props) {
	const { task, sectionId } = props;
	const {
		_id,
		taskStatus,
		taskName,
		assigneTo,
		startDate,
		dueDate,
		createdBy,
		priorityValue,
	} = task;

	const dispatch = useDispatch();
	const splitStartDate = startDate ? splitDate(startDate) : '';
	const splitDueDate = dueDate ? splitDate(dueDate) : '';
	const createdByName = createdBy ? createdBy.username : '';

	const username = assigneTo !== null ? assigneTo.username : '';

	const [stateTaskName, setStateTaskName] = useState(taskName);

	const [dropPriority, setDropPriority] = useState(true);

	const [isChecked, setIsChecked] = useState(taskStatus);
	const [state, setState] = useState({
		right: false,
	});

	const taskTitleInput = useRef(null);
	const toggleDrawer = () => event => {
		setState({ ...state, right: !state.right });
	};

	const handelChangeCheckedStatus = e => {
		setIsChecked(!isChecked);
		dispatch(completeTaskApi(_id));
	};

	const handlePressKeyTitleTask = value => {
		if (value.key === 'Enter') {
			value.target.blur();
		}
	};

	const handleEditTitleTask = e => {
		const titleTask = e.target.value;
		const titleTaskEdit = !titleTask.trim() ? 'Untitled task' : titleTask;
		dispatch(updateTitleTaskApi(_id, titleTaskEdit));

		e.target.value = titleTaskEdit;
	};

	const handleChangeTitleTask = e => {
		const titleTask = e.target.value;
		const titleTaskEdit = !titleTask.trim() ? 'Untitled task' : titleTask;
		setStateTaskName(titleTaskEdit);
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
						checkedIcon={<CheckCircleIcon sx={{ color: '#008000', width: '18px' }} />}
						inputProps={{ 'aria-label': 'controlled' }}
						sx={{
							zIndex: '2',
							'&:hover': { color: '#008000 !important' },
							px: 0,
							py: 0,
							mr: 1,
						}}
						checked={isChecked}
						onClick={handelChangeCheckedStatus}
					/>
					<input
						type='text'
						// defaultValue={stateTaskName}
						value={stateTaskName}
						className='taskName__input'
						onKeyPress={handlePressKeyTitleTask}
						onBlur={handleEditTitleTask}
						ref={taskTitleInput}
						onChange={handleChangeTitleTask}
					/>
					<Box className='css__focus'></Box>
				</Box>
				<React.Fragment>
					<Box className='taskName__button--viewDetails' onClick={toggleDrawer()}>
						<Typography className='taskName__typography--viewDetails'>
							Details
						</Typography>
						<ArrowForwardIosIcon className='taskName__icon--viewDetails' />
					</Box>
					<Drawer
						anchor={'right'}
						open={state['right']}
						onClose={toggleDrawer()}
						className='taskDetails__form--block'
					>
						<TaskDetail
							onClickButton={toggleDrawer()}
							onEditTitleTask={handleEditTitleTask}
							onPressKeyTitleTask={handlePressKeyTitleTask}
							onChangeTitleTask={handleChangeTitleTask}
							onCheckedStatus={handelChangeCheckedStatus}
							isCheckedStatus={isChecked}
							task={task}
						/>
					</Drawer>
				</React.Fragment>
			</Grid>

			<Grid item xs={2} style={{ ...styles.task }} className='dropMenu--assignee'>
				<AssigneeBox username={username} task={task} />
			</Grid>
			<Grid
				item
				xs={2}
				align='right'
				style={styles.task}
				className='dueDate__calendar'
			>
				<DueDateBox
					splitStartDate={splitStartDate}
					splitDueDate={splitDueDate}
					task={task}
				/>
			</Grid>
			<Grid item xs={2} align='right' style={{ ...styles.task, padding: '10px' }}>
				{createdByName}
			</Grid>
			<Grid
				item
				xs={2}
				style={{ ...styles.task, borderRight: 'none' }}
				className='dropMenu--priority'
			>
				<PriorityBox priorityValue={priorityValue} task={task} />
			</Grid>
		</Grid>
	);
}
