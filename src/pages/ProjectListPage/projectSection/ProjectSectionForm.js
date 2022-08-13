import { Box, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DragIndicatorSharpIcon from '@mui/icons-material/DragIndicatorSharp';
import ShortTextIcon from '@mui/icons-material/ShortText';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	MODAL_ACTION_CLOSE,
	MODAL_ACTION_CONFIRM,
} from '../../../constants/constants';
import { deleteSectionAction } from '../../../redux/actions/ProjectAction';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import { archiveSectionApi, updateTitleSectionApi } from '../../../redux/actions/SectionAction';
import ButtonProjectList from '../../../components/ButtonProjectList/ButtonProjectList';

const styles = {
	textTitle: {
		cursor: 'pointer',
		fontWeight: 'bold',
		textTransform: 'capitalize',
	},
	icon: {
		fontSize: '15px',
	},
	iconHover: {
		fontSize: '17px',
	},
	titleBlockAfterActive: {
		backgroundColor: '#fff',
	},
	titleBlockBeforeActive: {
		backgroundColor: '#fff',
		borderRadius: '10px',
		border: '1px solid grey',
	},
};

export default function ProjectSectionForm(props) {
	const {
		onMouseDown,
		onMouseUp,
		isExpand,
		onClickExpandButton,
		sectionId,
		sectionName,
		onClickAddTaskAbove,
		onClickAddSectionAbove,
		onClickAddSectionBelow,
	} = props;

	const [isShowMenuSection, setIsShowMenuSection] = useState(false);
	const [isShowModalDelete, setShowModalDelete] = useState(false);

	const dispatch = useDispatch();
	const searchInput = useRef(null);

	const toggleModal = () => {
		setShowModalDelete(!isShowModalDelete);
	};

	const handleShowMenuSection = () => {
		setIsShowMenuSection(!isShowMenuSection);
	};

	const handleModalArchiveSection = type => {
		if (type === MODAL_ACTION_CONFIRM) {
			dispatch(archiveSectionApi(sectionId))
		}
		setIsShowMenuSection(false);
		setShowModalDelete(false);
	};

	const handleEditTitleSection = e => {
		const titleSection = e.target.value;
		const titleSectionEdit = !titleSection.trim()
			? 'Untitled section'
			: titleSection;

		const dataSection = {
			sectionId: sectionId,
			sectionName: titleSectionEdit,
		};
		searchInput.current.value = titleSectionEdit;
		dispatch(updateTitleSectionApi(dataSection));
	};

	const handleKeyPress = value => {
		if (value.key === 'Enter') {
			searchInput.current.blur();
		}
	};

	return (
		<Grid item className='title__content '>
			<Box
				className='row-drag-handle'
				onMouseDown={onMouseDown}
				onMouseUp={onMouseUp}
			>
				<ButtonProjectList
					icon={<DragIndicatorSharpIcon style={styles.icon} />}
					id='title__icon--hover'
				/>
			</Box>
			<ButtonProjectList
				icon={
					isExpand ? (
						<ExpandMoreIcon style={styles.icon} />
					) : (
						<ChevronRightIcon style={styles.icon} />
					)
				}
				id='title_button--expand'
				onClickButton={onClickExpandButton}
			/>
			<TextField
				onBlur={handleEditTitleSection}
				sx={{
					width: '175px',
					'& .MuiOutlinedInput-root:hover': {
						'& > fieldset': {
							borderColor: 'white',
						},
					},
					'& .MuiOutlinedInput-root.Mui-focused': {
						'& > fieldset': {
							borderColor: '#0057B7',
						},
					},
				}}
				placeholder={'Write a section name'}
				className='Box__input--addTask'
				defaultValue={sectionName}
				onKeyPress={handleKeyPress}
				inputRef={searchInput}
			/>
			<Box sx={{ position: 'relative' }}>
				<ButtonProjectList
					icon={<AddIcon style={styles.icon} />}
					id='title__button--addTask'
					onClickButton={onClickAddTaskAbove}
				/>
				<Typography id='addTask__span--hover'>Add Task</Typography>
			</Box>
			<Box sx={{ position: 'relative' }}>
				<ButtonProjectList
					icon={<MoreHorizIcon style={styles.icon} />}
					id='title__button--showMore'
					onClickButton={handleShowMenuSection}
				/>
				<Box
					className='dropMenu--Section'
					sx={{ border: '1px solid grey', borderRadius: '5px' }}
					display={isShowMenuSection ? 'block' : 'none'}
				>
					<ButtonProjectList
						icon={<ShortTextIcon style={styles.icon} />}
						id='dropItem__button--addSection'
						text='Add Section'
					/>
					<Box className='drop__block--addSection'>
						<ButtonProjectList
							icon={<ArrowUpwardIcon style={styles.icon} />}
							id='dropItem__button--addSectionAbove'
							text='Add section above'
							onClickButton={onClickAddSectionAbove}
						/>
						<ButtonProjectList
							icon={<ArrowDownwardIcon style={styles.icon} />}
							id='dropItem__button--addSectionBelow'
							text='Add section below'
							onClickButton={onClickAddSectionBelow}
						/>
					</Box>
					<ButtonProjectList
						icon={<DeleteOutlineIcon style={styles.icon} id='button-delSection' />}
						id='dropItem__button--delSection'
						text='Archive Section'
						onClickButton={toggleModal}
					/>
					<ConfirmModal
						show={isShowModalDelete}
						title='Archive this section'
						content={
							<span>
								Are you sure you want to archive this section <b>{sectionName}</b>?
							</span>
						}
						onAction={handleModalArchiveSection}
						nameBtnConfirm='Archive section'
					/>
				</Box>
			</Box>
		</Grid>
	);
}
