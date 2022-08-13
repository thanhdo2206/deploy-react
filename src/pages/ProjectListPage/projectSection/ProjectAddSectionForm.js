import { Box, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DragIndicatorSharpIcon from '@mui/icons-material/DragIndicatorSharp';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	MODAL_ACTION_CLOSE,
	MODAL_ACTION_CONFIRM,
} from '../../../constants/constants';
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

export default function ProjectAddSectionForm(props) {
	const { isDisplay, onSubmit } = props;

	const handleKeyPress = value => {
		if(value.key === 'Enter') {
			value.target.blur()
		}
	};

	return (
		<Grid item className='title__content ' display={isDisplay ? 'flex' : 'none'}>
			<Box>
				<ButtonProjectList
					icon={<DragIndicatorSharpIcon style={styles.icon} />}
					id='title__icon--hover'
				/>
			</Box>
			<ButtonProjectList
				icon={<ExpandMoreIcon style={styles.icon} />}
				id='title_button--expand'
			/>
			<TextField
				onBlur={onSubmit}
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
				onKeyPress={handleKeyPress}
				inputRef={input => input && input.focus()}
			/>
			<Box sx={{ position: 'relative' }}>
				<ButtonProjectList
					icon={<AddIcon style={styles.icon} />}
					id='title__button--addTask'
				/>
				<Typography id='addTask__span--hover'>Add Task</Typography>
			</Box>
			<Box sx={{ position: 'relative' }}>
				<ButtonProjectList
					icon={<MoreHorizIcon style={styles.icon} />}
					id='title__button--showMore'
				/>
			</Box>
		</Grid>
	);
}
