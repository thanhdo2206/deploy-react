import React, { useState, useRef } from 'react';
import { List, ListItem } from '@mui/material';
import Box from '@mui/material/Box';
import { mapOrder } from '../../utils/sort';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from '../../utils/dragDrop';
import { addTaskAction } from '../../redux/actions/ProjectAction';
import { useSelector, useDispatch } from 'react-redux';
import Task from './Task';
import FormNewTask from './FormNewTask';
import {
	createTaskApi,
	updateDragTask,
	updateDropTask,
	updateSectionIdTaskDragApi,
	updateTaskOrderInSectionApi,
} from '../../redux/actions/TaskAction';
import { filterTaskList } from '../ProjectListPage/projectSection/ProjectSection';

export default function ListTask(props) {
	const {
		section,
		isDisplayFormNewTaskTop,
		isDisplayFormNewTaskBottom,
		closeNewTaskForm,
		isAddTask,
	} = props;

	const dispatch = useDispatch();
	const filterSelector = useSelector(state => state.filterReducer);

	const currentUser = useSelector(state => state.authReducer.currentUser);

	const arrTaskInProject = useSelector(state => state.TaskReducer.arrTask);

	const arrTaskInSection = arrTaskInProject.filter(
		task => task.sectionId === section._id
	);

	// console.log(`arrTaskInSection ${section.sectionName}`, arrTaskInSection);

	const arrTaskOrder = useSelector(state => state.TaskReducer.taskOrders);

	// console.log('arrTaskOrder',arrTaskOrder);

	//task order trong section hiện tại
	const taskOrderInSection = arrTaskOrder
		? arrTaskOrder.find(item => item.sectionId === section._id)
		: {};

	// console.log('arrTaskOrderInSection', taskOrder);

	const listTask =
		taskOrderInSection && taskOrderInSection.taskOrder.length && arrTaskInSection
			? mapOrder(arrTaskInSection, taskOrderInSection.taskOrder, '_id')
			: [];

	const newTaskList = filterTaskList(listTask, filterSelector);

	const handleCreateTask = nameTask => {
		if (nameTask === '') {
			closeNewTaskForm();
			return;
		}

		const taskCreate = {
			taskName: nameTask,
			createBy: currentUser.email,
			projectId: section.projectId,
			sectionId: section._id,
		};

		closeNewTaskForm();
		dispatch(createTaskApi(taskCreate, taskOrderInSection.taskOrder, isAddTask));
	};

	const onTaskDrop = async (dropResult, section) => {
		let listTaskInSection = [...listTask];

		const { removedIndex, addedIndex, payload } = dropResult;
		let newTasks = applyDrag(listTaskInSection, dropResult);
		let newTaskOrder = newTasks.map(task => task._id);

		if (removedIndex !== null) {
			//khi drag chi can update task order tai section drag
			dispatch(updateDragTask(section._id, newTaskOrder));
			await dispatch(updateTaskOrderInSectionApi(newTaskOrder, section._id));
		}

		if (addedIndex !== null) {
			//khi drop update task order tai section drop
			//update section id cua task keo tha bang section drop id
			dispatch(updateDropTask(section._id, newTaskOrder, payload));
			await dispatch(updateSectionIdTaskDragApi(payload, section._id));
			await dispatch(updateTaskOrderInSectionApi(newTaskOrder, section._id));
		}
	};

	const renderListTask = () => {
		return newTaskList.map((task, index) => {
			return (
				<Draggable key={task._id}>
					<Task task={task} />
				</Draggable>
			);
		});
	};

	return (
		<Box component='div' className='list__task-container'>
			<List className='list__tasks'>
				<FormNewTask
					handleBlur={handleCreateTask}
					isDisplayFormAddTask={isDisplayFormNewTaskTop}
				/>
				<Container
					groupName='col'
					onDrop={dropResult => {
						onTaskDrop(dropResult, section);
					}}
					getChildPayload={index => listTask[index]}
					dragClass='task-ghost'
					dropClass='task-ghost-drop'
					dropPlaceholder={{
						animationDuration: 150,
						showOnTop: true,
						className: 'task-drop-preview',
					}}
					dropPlaceholderAnimationDuration={200}
				>
					{renderListTask()}
				</Container>

				<FormNewTask
					handleBlur={handleCreateTask}
					isDisplayFormAddTask={isDisplayFormNewTaskBottom}
				/>
			</List>
		</Box>
	);
}
