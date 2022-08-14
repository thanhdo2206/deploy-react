import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import { Grid, Popover } from '@mui/material';

import { priorityArr, priorityMenu } from '../../utils/priorityStatus';
import DisplayStatus from './priority/DisplayStatus';
import MenuStatus from './priority/MenuStatus';
import { updatePriorityTaskApi } from '../../redux/actions/TaskAction';

const styles = {
	icon: {
		fontSize: '15px',
	},
};

const convertNumber = (arr, value) => {
	const arrCopy = [...arr];
	return arrCopy.indexOf(value);
};

export default function PriorityBox(props) {
	const { priorityValue, task } = props;
	const [anchorEl, setAnchorEl] = useState(null);
	const dispatch = useDispatch();

	const handleOpenPopover = event => {
		setAnchorEl(event.currentTarget);
	};
	
	const handleClosePopover = () => {
		setAnchorEl(null);
	};
	
	const open = Boolean(anchorEl);
	
	// const handleClickPriority = e => {
	// 	const numberStatus = convertNumber(
	// 		priorityArr,
	// 		e.target.outerText.toLowerCase()
	// 	);
	// 	const taskUpdate = {
	// 		...task,
	// 		priorityValue: numberStatus.toString(),
	// 	};
	// 	handleClosePopover();
	// 	dispatch(updatePriorityTaskApi(taskUpdate));
	// };
	const handleClickPriority = value => {
		const numberStatus = convertNumber(
			priorityArr,
			value.toLowerCase()
		);
		const taskUpdate = {
			...task,
			priorityValue: numberStatus.toString(),
		};
		handleClosePopover();
		dispatch(updatePriorityTaskApi(taskUpdate));
	};

	return (
		<>
			<Grid
				container
				onClick={handleOpenPopover}
				className='dropItem__block dropItem__block--show'
			>
				<Grid item xs={10}>
					<DisplayStatus status={priorityValue} arr={priorityArr} />
				</Grid>
				<Grid item xs={2}>
					<ExpandMoreIcon style={styles.icon} />
				</Grid>
			</Grid>
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
					menu={priorityMenu}
					onClickPriorityItem={handleClickPriority}
				/>
			</Popover>
		</>
	);
}
