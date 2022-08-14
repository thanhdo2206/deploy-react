import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { MODAL_ACTION_CONFIRM } from '../../constants/constants';
import { archiveTaskApi } from '../../redux/actions/TaskAction';
import { useSelector, useDispatch } from 'react-redux';




export default function MoreOptionTask(props) {
	const { renameTask, toggleDrawer,task } = props;
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const dispatch = useDispatch();

	const handleOpenMore = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMore = () => {
		setAnchorEl(null);
	};

	const editNameTask = () => {
		handleCloseMore();
		renameTask();
	};

	const openDetailTask = ()=>{
		toggleDrawer();
		handleCloseMore();


	}

	const [isShowModalArchive, setShowModalArchive] = useState(false);

	const toggleModalConfirm = () => {
		handleCloseMore();
		setShowModalArchive(!isShowModalArchive);
	};

	const onModalArchiveTask = type => {
		if (type === MODAL_ACTION_CONFIRM) {
			dispatch(archiveTaskApi(task));
		}

		toggleModalConfirm();
	};

	return (
		<Box className='btnOption__box' >
			<MoreHorizIcon
				aria-controls={open ? 'menuOption__task' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				className='btnOption'
				onClick={handleOpenMore}
			/>
			<Menu
				id='menuOption__task'
				anchorEl={anchorEl}
				open={open}
				onClose={handleCloseMore}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
			>
				<MenuItem className='menu__option-item' onClick={editNameTask}>
					<CreateOutlinedIcon className='icon__option' />
					Edit task name
				</MenuItem>

				<MenuItem className='menu__option-item' onClick={openDetailTask}>
					<VisibilityOutlinedIcon className='icon__option' />
					View details
				</MenuItem>

				<MenuItem className='menu__option-item delete__section-task' onClick={toggleModalConfirm}>
					<Inventory2OutlinedIcon className='icon__option' />
					Archive task
				</MenuItem>
			</Menu>

			<ConfirmModal
				show={isShowModalArchive}
				title='Archive this task'
				content={
					<span>
						Are you sure you want to archive this task <b>{task.taskName}</b>
						?
					</span>
				}
				onAction={onModalArchiveTask}
				nameBtnConfirm='Archive task'
			/>
		</Box>
	);
}
