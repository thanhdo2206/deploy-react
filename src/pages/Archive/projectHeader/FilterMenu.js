import { Box, Grid, Popover } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import ButtonProjectList from '../../../components/ButtonProjectList/ButtonProjectList';
import './filterMenu.css';
import FilterMenuTitle from './FilterMenuTitle';
import FilterAssignee from './FilterAssignee';
import FilterDueDate from './FilterDueDate';
import FilterPriority from './FilterPriority';
import { filterReset } from '../../../redux/actions/filterAction';


export default function FilterMenu() {
	const [filterStatus, setFilterSatus] = useState('Fliter');
	const [filterStatusTitleItem, setfilterStatusTitleItem] = useState('None');
	// console.log(filterStatusTitleItem)
	const dispatch = useDispatch();
	const showFormFilter = title => {
		switch (title) {
			case 'Assignee':
				return <FilterAssignee filterStatusTitleItem={filterStatusTitleItem}/>;
				break;
			case 'Created By':
				return <FilterAssignee filterStatusTitleItem={filterStatusTitleItem}/>;
				break;
			case 'Due Date':
				return <FilterDueDate />;
				break;
			case 'Status':
				return <FilterPriority />;
				break;
			default:
				return <Box className='filterMenu__box--NoneValue'></Box>;
		}
	};

	const [anchorEl, setAnchorEl] = useState(null);
	const handleOpenPopover = event => {
		setAnchorEl(event.currentTarget);
	};
	const handleClosePopover = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);

	const [anchorElMenuTitle, setAnchorElMenuTitle] = useState(null);
	const handleOpenPopoverMenuTitle = event => {
		setAnchorElMenuTitle(event.currentTarget);
	};
	const handleClosePopoverMenuTitle = () => {
		setAnchorElMenuTitle(null);
	};
	const openMenuTitle = Boolean(anchorElMenuTitle);

	const handleClickButtonFilterTitleItem = valueTitle => {
		console.log(valueTitle)
		setfilterStatusTitleItem(valueTitle);
		handleClosePopoverMenuTitle();
		dispatch(filterReset());

	};

	return (
		<>
			<Box>
				<ButtonProjectList
					icon={<MenuIcon sx={{ fontSize: '15px' }} />}
					text={filterStatus}
					id='filterMenu__button--show'
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
				<Box className='filterMenu__box--container'>
					<Box className='filterMenu__box--title'>
						<FilterMenuTitle
							filterStatusTitleItem={filterStatusTitleItem}
							onClickButtonFilterTitleItem={handleClickButtonFilterTitleItem}
							onOpenPopover={handleOpenPopoverMenuTitle}
							onClosePopover={handleClosePopoverMenuTitle}
							open={openMenuTitle}
							anchorEl={anchorElMenuTitle}
						/>
					</Box>
					<Box className='filterMenu__box--value'>
						{showFormFilter(filterStatusTitleItem)}
					</Box>
				</Box>
			</Popover>
		</>
	);
}
