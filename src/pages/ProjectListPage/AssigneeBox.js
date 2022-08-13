import { Box, Popover, Typography } from '@mui/material';
import React, { useState } from 'react';
import AvatarAssignee from '../../components/assignee/AvatarAssignee';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssigneeForm from '../../components/assignee/AssigneeForm';
import { useDispatch, useSelector } from 'react-redux';
import { assignTaskApi } from '../../redux/actions/TaskAction';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

export default function AssigneeBox(props) {
	const { username, task } = props;
	const [anchorEl, setAnchorEl] = useState(null);
	const dispatch = useDispatch();
	const currentWorkSpace = useSelector(
		state => state.WorkspaceReducer.currentWorkSpace
	);
	const membersWorkspace =
		currentWorkSpace && currentWorkSpace.members ? currentWorkSpace.members : [];

	const handleClickAssignee = member => {
		const taskUpdate = {
			...task,
			assigneTo: {
				...task.assigneTo,
				username: member.username,
				email: member.email,
			},
		};

		dispatch(assignTaskApi(taskUpdate));
		handleClosePopover();
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
			<Box onClick={handleOpenPopover} className='dropItem__block--assigneeshow'>
				{username ? (
					<Box className='assignee__box--show'>
						<AvatarAssignee assignee={username} />
						<Typography className='assignee__typo--show'>{username}</Typography>
					</Box>
				) : (
					<>
						<Box className='AssigneeBox__box--show'>
							<PermIdentityIcon className='AssigneeBox__icon' />
							<Typography className='AssigneeBox__typo' sx={{fontSize: '11px'}}>
								No assignee
							</Typography>
						</Box>
					</>
				)}
			</Box>
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
