import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import MoreOptionSection from './MoreOptionSection';
import { useSelector, useDispatch } from 'react-redux';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { TooltipCustomize } from '../../components/ToolTip/ToolTip';
import { updateTitleSectionApi } from '../../redux/actions/SectionAction';

export default function BoardHeader(props) {
	const {
		section,
		setAddFormSectionLeft,
		setAddFormSectionRight,
		openNewTaskFormTop,
	} = props;

	const titleSectionRef = useRef(null);

	const dispatch = useDispatch();

	const [titleSection, setTitleSection] = useState(section.sectionName);

	const handleTitleChange = e => {
		const { value } = e.target;
		setTitleSection(value);
	};

	const editTitleSection = () => {
		const titleSectionEdit = !titleSection.trim()
			? 'Untitled section'
			: titleSection;

		const dataSection = {
			sectionId: section._id,
			sectionName: titleSectionEdit,
		};
		


		dispatch(updateTitleSectionApi(dataSection));
	};

	const renameSection = () => {
		titleSectionRef.current.click();
	};

	return (
		<Box component='header' className='board__header '>
			<TooltipCustomize title='Drag to move' placement='bottom'>
				<DragIndicatorIcon className='icon__drag column-drag-handle' />
			</TooltipCustomize>
			<form
				onSubmit={e => {
					e.preventDefault();
					editTitleSection();
					titleSectionRef.current.blur();
				}}
				onBlur={editTitleSection}
			>
				<input
					className='title__section'
					type='text'
					spellCheck='false'
					onClick={e => {
						e.target.select();
					}}
					onChange={handleTitleChange}
					// onMouseDown={e => {
					// 	e.preventDefault();
					// }}
					ref={titleSectionRef}
					value={titleSection}
				/>
			</form>
			<TooltipCustomize title='Add task' placement='bottom'>
				<AddIcon
					className='btnOption'
					fontSize='small'
					onClick={() => {
						openNewTaskFormTop();
					}}
				/>
			</TooltipCustomize>

			<MoreOptionSection
				setAddFormSectionLeft={setAddFormSectionLeft}
				setAddFormSectionRight={setAddFormSectionRight}
				section={section}
				renameSection={renameSection}
			/>
		</Box>
	);
}
