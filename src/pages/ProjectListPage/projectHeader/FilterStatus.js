import { Box, Popover } from '@mui/material';
import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import ButtonProjectList from '../../../components/ButtonProjectList/ButtonProjectList';
import { filterbyStatus } from '../../../redux/actions/filterAction';

const convertFilterTaskStatusToNumber = filterStatus => {
	const numberConvert =
		filterStatus.toLowerCase() === 'imcomplete task'
			? 0
			: filterStatus.toLowerCase() === 'completed task'
			? 1
			: 2;
	return numberConvert
};

export default function FilterStatus() {
	const [dropFilter, setDropFilter] = useState(false);
	const [filterStatus, setFilterSatus] = useState('All Task');
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState(null);

	const handleOpenPopover = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClosePopover = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	const handleClickButtonFilterItem = e => {
		setFilterSatus(e.target.innerText);
		setDropFilter(!dropFilter);
		handleClosePopover();
		dispatch(filterbyStatus(convertFilterTaskStatusToNumber(e.target.innerText)))
	};

	const filterTask = [
		{
			text: 'all task',
			id: 'filterTask__button--allTask',
			handleClick: handleClickButtonFilterItem,
		},
		{
			text: 'imcomplete task',
			id: 'filterTask__button',
			handleClick: handleClickButtonFilterItem,
		},
		{
			text: 'completed task',
			id: 'filterTask__button--completedTask',
			handleClick: handleClickButtonFilterItem,
		},
	];
	return (
		<>
			<Box>
				<ButtonProjectList
					icon={<CheckCircleOutlineIcon sx={{ fontSize: '15px' }} />}
					text={filterStatus}
					id='filterTask__button--show'
					onClickButton={handleOpenPopover}
				/>
			</Box>
			<Popover
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
				<Box
					// display={dropFilter ? 'block' : 'none'}
					id='filterTask__block'
					sx={{ zIndex: '1' }}
				>
					{filterTask.map((item, index) => {
						return (
							<ButtonProjectList
								text={item.text}
								id={item.id}
								onClickButton={item.handleClick}
								key={index}
							/>
						);
					})}
				</Box>
			</Popover>
		</>
	);
}
