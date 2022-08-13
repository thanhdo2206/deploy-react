import React, { useEffect, useState, useRef } from 'react';
import FormNewSection from './FormNewSection';
import Box from '@mui/material/Box';
import ListTask from './ListTask';
import BoardHeader from './BoardHeader';
import { useDispatch, useSelector } from 'react-redux';
import {
	addSectionApi,
	addSectionLeftRightApi,
} from '../../redux/actions/SectionAction';

export default function Section(props) {
	const { section, indexSection } = props;

	const dispatch = useDispatch();

	const { sectionOrder, _id } = useSelector(
		state => state.ProjectReducer.currentProject
	);

	const [isDisplayFormAddSectionLeft, setDisplayFormAddSectionLeft] =
		useState(false);

	const [isDisplayFormAddSectionRight, setDisplayFormAddSectionRight] =
		useState(false);

	const [checkLeftRight, setLeftRight] = useState();

	const [isDisplayFormNewTaskTop, setDisplayFormNewTaskTop] = useState(false);

	const [isDisplayFormNewTaskBottom, setDisplayFormNewTaskBottom] =
		useState(false);

	const [checkTopBottomFormNewTask, setTopBottomFormNewTask] = useState();


	const setAddFormSectionLeft = () => {
		setDisplayFormAddSectionLeft(true);
		setLeftRight(0);
	};

	const setAddFormSectionRight = async () => {
		setDisplayFormAddSectionRight(true);
		setLeftRight(1);
	};

	const handleAddSectionLeftRight = sectionNameInput => {
		const newSection = {
			sectionName: sectionNameInput,
			taskOrder: [],
			projectId: _id,
		};

		let indexAddSection = indexSection + checkLeftRight;

		dispatch(addSectionLeftRightApi(newSection, sectionOrder, indexAddSection));
	};

	const addSectionRightLeft = (event, nameSection) => {
		event.preventDefault();
		setDisplayFormAddSectionLeft(false);
		setDisplayFormAddSectionRight(false);

		const sectionNameInput = !nameSection.trim()
			? 'Untitled section'
			: nameSection;

		handleAddSectionLeftRight(sectionNameInput);
	};

	const blurFormNewSection = nameSection => {
		if (nameSection.trim()) {
			handleAddSectionLeftRight(nameSection);
		}

		setDisplayFormAddSectionLeft(false);
		setDisplayFormAddSectionRight(false);
	};

	const openNewTaskFormTop = () => {
		setDisplayFormNewTaskTop(true);
		setTopBottomFormNewTask(2)
	};

	const openNewTaskFormBottom = () => {
		setDisplayFormNewTaskBottom(true);
		setTopBottomFormNewTask(1);
	};

	const closeNewTaskForm= () => {
		setDisplayFormNewTaskTop(false);
		setDisplayFormNewTaskBottom(false);
	};

	
	return (
		<Box component='div' sx={{ display: 'flex', height: '100%' }}>
			<Box>
				<FormNewSection
					isDisplayFormAddSection={isDisplayFormAddSectionLeft}
					handleSubmit={addSectionRightLeft}
					handleBlur={blurFormNewSection}
				/>
			</Box>

			<Box component='div' className='section__column-item'>
				<BoardHeader
					setAddFormSectionLeft={setAddFormSectionLeft}
					setAddFormSectionRight={setAddFormSectionRight}
					section={section}
					openNewTaskFormTop={openNewTaskFormTop}
				></BoardHeader>
				<ListTask
					isDisplayFormNewTaskTop={isDisplayFormNewTaskTop}
					isDisplayFormNewTaskBottom={isDisplayFormNewTaskBottom}
					section={section}
					closeNewTaskForm={closeNewTaskForm}
					isAddTask={checkTopBottomFormNewTask}

				></ListTask>
				<Box className='btn__addTask' onClick={openNewTaskFormBottom}>
					+ Add Task
				</Box>
			</Box>

			<Box>
				<FormNewSection
					isDisplayFormAddSection={isDisplayFormAddSectionRight}
					handleSubmit={addSectionRightLeft}
					handleBlur={blurFormNewSection}
				/>
			</Box>
		</Box>
	);
}
