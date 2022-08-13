import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Popover } from '@mui/material';

import { priorityArr, priorityMenu } from '../../../utils/priorityStatus';
import DisplayStatus from '../priority/DisplayStatus';
import MenuStatus from '../priority/MenuStatus';
import CancelIcon from '@mui/icons-material/Cancel';
import {
	filterByPriority,
	filterReset,
} from '../../../redux/actions/filterAction';

const styles = {
	icon: {
		fontSize: '15px',
	},
	container: {
		border: '1px solid #676767',
		borderRadius: '5px',
		padding: '6px 0',
	},
};

const convertNumber = (arr, value) => {
	const arrCopy = [...arr];
	return arrCopy.indexOf(value);
};

const clonePriorityMenu = priorityMenu.slice(1)
export default function FilterPriority() {
	const [anchorEl, setAnchorEl] = useState(null);
	const dispatch = useDispatch();
	const priorityValue = useSelector(state => state.filterReducer.filterCustom.priorityValue);
	const handleOpenPopover = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClosePopover = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	const handleClickPriority = value => {
		const numberStatus = convertNumber(
			priorityArr,
			value.toLowerCase()
		);
		dispatch(filterReset());
		dispatch(filterByPriority(numberStatus.toString()));
		handleClosePopover();
	};

	const handleDeleteForm = () => {
		dispatch(filterReset());
	};
	console.log(priorityValue)
	return (
		<>
			<Grid
				container
				onClick={handleOpenPopover}
				className='dropItem__block dropItem__block--show'
				sx={styles.container}
			>
				<Grid item xs={10}>
					<DisplayStatus status={priorityValue} arr={priorityArr} />
				</Grid>
				<Grid item xs={2}>
					<ExpandMoreIcon style={styles.icon} />
				</Grid>
			</Grid>
			{priorityValue !== '' ? (
				<Box onClick={handleDeleteForm}>
					<CancelIcon className='FilterAssignee__icon--show' />
				</Box>
			) : (
				<></>
			)}
			<Popover
				id={open ? 'assignTask__box' : undefined}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClosePopover}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
			>
				<MenuStatus
					statusArr={priorityArr}
					menu={clonePriorityMenu}
					onClickPriorityItem={handleClickPriority}
				/>
			</Popover>
		</>
	);
}
