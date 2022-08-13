import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import './BoardView.css';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from '../../utils/dragDrop';
import {
	getProjectApi,
	updateDropSection,
	updateDropSectionApi,
} from '../../redux/actions/ProjectAction';
import { mapOrder } from '../../utils/sort';
import ButtonAddSection from './ButtonAddSection';
import Section from './Section';
import { useParams } from 'react-router-dom';
import { getAllSectionApi } from '../../redux/actions/SectionAction';
import {
	getAllTaskInProjectApi,
	getAllTaskOrderAction,
} from '../../redux/actions/TaskAction';
import ProjectHeader from '../ProjectListPage/projectHeader/ProjectHeader';

export default function BoardView() {
	const { sectionOrder } = useSelector(
		state => state.ProjectReducer.currentProject
	);

	const sections = useSelector(state => state.SectionReducer.arrSections);

	const taskOrders = useSelector(state => state.SectionReducer.arrSections);

	const dispatch = useDispatch();

	const { projectId } = useParams();

	useEffect(() => {
		async function fetchData() {
			if (projectId) {
				await dispatch(getAllSectionApi(projectId));
				await dispatch(getProjectApi(projectId));
				await dispatch(getAllTaskInProjectApi(projectId));
			}
		}
		fetchData();
	}, [projectId]);

	useEffect(() => {
		dispatchArrTaskOrder();
	}, [taskOrders]);

	const sectionsSort =
		sectionOrder && sectionOrder.length && sections
			? mapOrder(sections, sectionOrder, '_id')
			: [];

	const sectionsUnarchive = sectionsSort.length
		? sectionsSort.filter(section => !section.archived)
		: [];

	const onSectionDrop = dropResult => {
		const { removedIndex, addedIndex, payload } = dropResult;
		if (removedIndex !== null || addedIndex !== null) {
			let newSections = applyDrag(sections, dropResult);

			let newSectionOrder = newSections.map(section => section._id);

			dispatch(updateDropSectionApi(newSectionOrder, projectId));
			dispatch(updateDropSection(newSectionOrder));
		}
	};

	const dispatchArrTaskOrder = () => {
		const taskOrderInProject = sections.map(section => {
			const sectionId = section._id;
			const taskOrder = section.taskOrder;
			return { sectionId, taskOrder };
		});

		dispatch(getAllTaskOrderAction(taskOrderInProject));
	};

	const renderSections = () => {
		return sectionsUnarchive.map((section, index) => {
			const keyRender = `${section._id}}`;
			return (
				<Draggable key={keyRender}>
					<Section section={section} indexSection={index} />
				</Draggable>
			);
		});
	};

	return (
		<>
			<ProjectHeader />

			<Box component='div' className='board__columns'>
				<Box component='div' className='board__container-columns'>
					<Container
						getChildPayload={index => sections[index]}
						orientation='horizontal'
						onDrop={onSectionDrop}
						dragClass='section-ghost'
						dropClass='section-ghost-drop'
						dragHandleSelector='.column-drag-handle'
						dropPlaceholder={{
							animationDuration: 150,
							showOnTop: true,
							className: 'section-drop-preview',
						}}
					>
						{renderSections()}

						<ButtonAddSection />
					</Container>
				</Box>
			</Box>
		</>
	);
}
