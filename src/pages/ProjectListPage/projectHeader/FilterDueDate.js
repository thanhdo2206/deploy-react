import { Box, Popover, Typography } from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import ButtonProjectList from '../../../components/ButtonProjectList/ButtonProjectList';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterByDueDate,
	filterReset,
} from '../../../redux/actions/filterAction';

const filterDueDateArr = [
	{
		text: 'Due Before Today',
	},
	{
		text: 'Due Today',
	},
	{
		text: 'Due Tomorrow',
	},
	{
		text: 'Due This Week',
	},
	{
		text: 'Due Next Week',
	},
];
const checkIcon = (filterDueDateItem, text) => {
	return filterDueDateItem == text ? (
		<CheckIcon sx={{ fontSize: '15px' }} />
	) : (
		<RemoveIcon sx={{ fontSize: '15px' }} />
	);
};

export default function FilterDueDate() {
	const [anchorEl, setAnchorEl] = useState(null);
	const filterDueDateItem = useSelector(
		state => state.filterReducer.filterCustom.dueDate
	);
	const dispatch = useDispatch();
	const handleOpenPopover = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClosePopover = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	const handleClickButtonFilterDueDateItem = item => {
		dispatch(filterByDueDate(item));
		handleClosePopover();
	};

	const handleDeleteForm = () => {
		dispatch(filterReset());
	};
	return (
		<>
			<Box onClick={handleOpenPopover} className='filterMenuTitle__button--show'>
				<Typography className='filterMenuTitle__typo--show'>
					{filterDueDateItem === '' || filterDueDateItem === 'None' ? '___' : filterDueDateItem}
				</Typography>
				<ExpandMoreIcon sx={{ fontSize: '15px' }} />
			</Box>
			{filterDueDateItem === '' || filterDueDateItem === 'None' ? (
				<></>
			) : (
				<Box onClick={handleDeleteForm}>
					<CancelIcon className='FilterAssignee__icon--show' />
				</Box>
			)}
			<Popover
				anchorPosition={{ top: 170, left: 1003 }}
				id={open ? 'assignTask__box' : undefined}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClosePopover}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<Box id='filterMenuTitle__block' sx={{ zIndex: '1' }}>
					{filterDueDateArr.map((item, index) => {
						return (
							<ButtonProjectList
								text={item.text}
								icon={checkIcon(filterDueDateItem, item.text)}
								id='filterMenuTitle__button--item'
								onClickButton={() => handleClickButtonFilterDueDateItem(item.text)}
								key={index}
							/>
						);
					})}
				</Box>
			</Popover>
		</>
	);
}
