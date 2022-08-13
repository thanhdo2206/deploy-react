import React, { useState } from 'react';
import { TooltipCustomize } from '../../components/ToolTip/ToolTip';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Box } from '@mui/material';
import AssigneeForm from '../../components/assignee/AssigneeForm';
import AvatarAssignee from '../../components/assignee/AvatarAssignee';
import { useSelector, useDispatch } from 'react-redux';
import { assignTaskApi } from '../../redux/actions/TaskAction';
import { convertDateFromDataBase } from '../../utils/date';
import Popover from '@mui/material/Popover';

export default function BoxAssignTask(props) {
	const { task } = props;

	const dispatch = useDispatch();

	// const { _id, username, email } = task.assigneTo;
	const username = task.assigneTo !== null ? task.assigneTo.username : '';

	const currentWorkSpace = useSelector(
		state => state.WorkspaceReducer.currentWorkSpace
	);

	const membersWorkspace =
		currentWorkSpace && currentWorkSpace.members ? currentWorkSpace.members : [];

	const handleAssigneeMember =async member => {
		const taskUpdate = {
			...task,
			assigneTo: { ...task.assigneTo, email: member.email },
		};

		
		await dispatch(assignTaskApi(taskUpdate));
		handleClosePopover();
	};

	const [anchorEl, setAnchorEl] = useState(null);

	const handleOpenPopover = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClosePopover = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<Box sx={{ display: 'inline-block' }}>
			<TooltipCustomize title='Assign task' placement='bottom'>
				<Box
					onClick={handleOpenPopover}
					aria-describedby='assignTask__box'
					variant='contained'
					sx={{ marginRight: '8px', display: 'flex' }}
				>
					{!username ? (
						<PersonOutlineOutlinedIcon className='icon__assign__date' />
					) : (
						<AvatarAssignee assignee={username} />
					)}
				</Box>
			</TooltipCustomize>

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
				<Box className='assignee__board'>
					<AssigneeForm
						memberArr={membersWorkspace}
						onClickAssignee={handleAssigneeMember}
						
					/>
				</Box>
			</Popover>
		</Box>
	);
}
