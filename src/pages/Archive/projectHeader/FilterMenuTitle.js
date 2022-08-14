import { Box, Popover, Typography } from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';

import ButtonProjectList from '../../../components/ButtonProjectList/ButtonProjectList';
import './filterMenuTitle.css';
const checkIcon = (filterStatus, text) => {
	return filterStatus == text ? (
		<CheckIcon sx={{ fontSize: '15px' }} />
	) : (
		<RemoveIcon sx={{ fontSize: '15px' }} />
	);
};
export default function FilterMenuTitle(props) {
	const {
		filterStatusTitleItem,
		onClickButtonFilterTitleItem,
		onOpenPopover,
		onClosePopover,
		open,
		anchorEl,
		setAnchorEl,
	} = props;

	const filterTask = [
		{
			text: 'None',
		},
		{
			text: 'Assignee',
		},
		{
			text: 'Due Date',
		},
		{
			text: 'Created By',
		},
		{
			text: 'Status',
		},
	];
	return (
		<>
			<Box onClick={onOpenPopover} className='filterMenuTitle__button--show'>
				<Typography className='filterMenuTitle__typo--show'>
					{filterStatusTitleItem}
				</Typography>
				<ExpandMoreIcon sx={{ fontSize: '15px' }} />
			</Box>
			<Popover
				anchorPosition={{ top: 170, left: 1003 }}
				id={open ? 'assignTask__box' : undefined}
				open={open}
				anchorEl={anchorEl}
				onClose={onClosePopover}
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
					{filterTask.map((item, index) => {
						return (
							<ButtonProjectList
								text={item.text}
								icon={checkIcon(filterStatusTitleItem, item.text)}
								id='filterMenuTitle__button--item'
								onClickButton={() => onClickButtonFilterTitleItem(item.text)}
								key={index}
							/>
						);
					})}
				</Box>
			</Popover>
		</>
	);
}
