import React, { useState, useRef, useEffect } from 'react';
import { List, ListItem } from '@mui/material';
import MoreOptionTask from './MoreOptionTask';
import Box from '@mui/material/Box';
import { TooltipCustomize } from '../../components/ToolTip/ToolTip';
import CompleteTask from './CompleteTask';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import BoxAssignTask from './BoxAssignTask';
import BoxDueDate from './BoxDueDate';
import { useSelector, useDispatch } from 'react-redux';
import {
	completeTaskApi,
	updateTitleTaskApi,
} from '../../redux/actions/TaskAction';
import Drawer from '@mui/material/Drawer';
import TaskDetail from '../ProjectListPage/TaskDetail/TaskDetail';

export default function Task(props) {
	const { task } = props;
	const dispatch = useDispatch();

	const [nameTask, setnameTask] = useState(task.taskName);

	const [isDisplaySpanTaskname, setIsDisplaySpanTaskname] = useState(true);

	const [isCheckComplete, setIsCheckComplete] = useState(task.taskStatus);

	const inputNameTaskRef = useRef(null);
	const listItemRef = useRef(null);

	const [openDetailTask, setOpenDetailTask] = useState(false);

	const toggleDrawer = () => {
		setOpenDetailTask(!openDetailTask);
	};

	const handleTNameTaskChange = e => {
		const { value } = e.target;
		setnameTask(value);
	};

	const renameTask = async () => {
		await setIsDisplaySpanTaskname(false);

		inputNameTaskRef.current.select();
	};

	const editTaskName = async () => {
		const nameTaskEdit = !nameTask.trim() ? 'Untitled task' : nameTask;

		await dispatch(updateTitleTaskApi(task._id, nameTaskEdit));
		setIsDisplaySpanTaskname(true);
	};

	const handleEnter = event => {
		if (event.keyCode == 13) {
			event.target.blur();
		}
	};

	const handlePressKeyTitleTask = value => {
		if (value.key === 'Enter') {
			value.target.blur();
		}
	};

	const handelChangeCompleteStatus = () => {
		setIsCheckComplete(!isCheckComplete);
		dispatch(completeTaskApi(task._id));
	};

	return (
		<>
			<ListItem className='task__item' ref={listItemRef}>
				<Box className='board__card-title'>
					<Box className='board__card-title--form'>
						<CompleteTask task={task} />

						{isDisplaySpanTaskname ? (
							<span className='task__name'>{task.taskName}</span>
						) : (
							<TextareaAutosize
								maxRows={5}
								className='task__name-input'
								type='text'
								placeholder='Write a task name'
								ref={inputNameTaskRef}
								value={nameTask}
								onChange={handleTNameTaskChange}
								onBlur={editTaskName}
								onKeyDown={handleEnter}
							/>
						)}
					</Box>

					<MoreOptionTask renameTask={renameTask} task={task} toggleDrawer={toggleDrawer} />
				</Box>

				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<BoxAssignTask task={task} />

					<BoxDueDate task={task} />
				</Box>
			</ListItem>

			<Drawer
				anchor='right'
				open={openDetailTask}
				onClose={toggleDrawer}
				className='taskDetails__form--block'
			>
				<TaskDetail
					onClickButton={toggleDrawer}
					onEditTitleTask={editTaskName}
					onPressKeyTitleTask={handlePressKeyTitleTask}
					onChangeTitleTask={handleTNameTaskChange}
					onCheckedStatus={handelChangeCompleteStatus}
					isCheckedStatus={isCheckComplete}
					task={task}
				/>
			</Drawer>
		</>
	);
}
