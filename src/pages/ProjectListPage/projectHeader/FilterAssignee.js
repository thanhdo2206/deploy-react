import { Box, Popover, Typography } from '@mui/material';
import React, { useState } from 'react';
import AvatarAssignee from '../../../components/assignee/AvatarAssignee';
import AssigneeForm from '../../../components/assignee/AssigneeForm';
import { useDispatch, useSelector } from 'react-redux';
import CancelIcon from '@mui/icons-material/Cancel';

import './filterAssignee.css';
import {
	filterByAssignee,
	filterByCreatedBy,
	filterReset,
} from '../../../redux/actions/filterAction';

export default function FilterAssignee(props) {
	const { filterStatusTitleItem } = props;
	const [anchorEl, setAnchorEl] = useState(null);
	const dispatch = useDispatch();
	const currentWorkSpace = useSelector(
		state => state.WorkspaceReducer.currentWorkSpace
	);
	const membersWorkspace =
		currentWorkSpace && currentWorkSpace.members ? currentWorkSpace.members : [];

	const currentFilterAssigneeId = useSelector(
		state => state.filterReducer.filterCustom.assigneTo
	);
	const currentFilterCreatedById = useSelector(
		state => state.filterReducer.filterCustom.createdBy
	);

	const currentFilterId = currentFilterAssigneeId
		? currentFilterAssigneeId
		: currentFilterCreatedById;

	const currentFilterAssigneeArray =
		currentFilterId !== ''
			? membersWorkspace.filter(item => item._id === currentFilterId)
			: [];

	const userNameSelect = currentFilterAssigneeArray.length
		? currentFilterAssigneeArray[0].username
		: '';

	const handleClickAssignee = member => {
		const { _id } = member;
		handleClosePopover();

		filterStatusTitleItem === 'Assignee'
			? dispatch(filterByAssignee(_id))
			: dispatch(filterByCreatedBy(_id));
	};

	const handleDeleteAssigneeForm = () => {
		dispatch(filterReset());
	};

	const handleOpenPopover = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClosePopover = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<>
			<Box
				onClick={handleOpenPopover}
				className='FilterAssignee__box--showContainer'
				id={userNameSelect ? 'showContainer1' : 'showContainer2'}
			>
				{userNameSelect ? (
					<Box className='FilterAssignee__box--show'>
						<AvatarAssignee assignee={userNameSelect} />
						<Typography className='FilterAssignee__typo--show'>
							{userNameSelect}
						</Typography>
					</Box>
				) : (
					<>
						<Box className='FilterAssignee__box--show'>___</Box>
					</>
				)}
			</Box>
			{userNameSelect ? (
				<Box onClick={handleDeleteAssigneeForm}>
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
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<Box>
					<AssigneeForm
						memberArr={membersWorkspace}
						onClickAssignee={handleClickAssignee}
					/>
				</Box>
			</Popover>
		</>
	);
}
