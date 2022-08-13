import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch } from 'react-redux';
import {
	archiveUnarchiveProjectApi,
	updateTitleProjectApi,
} from '../../../redux/actions/ProjectAction';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import ConfirmModal from '../../../components/Modal/ConfirmModal';

import {
	MODAL_ACTION_CLOSE,
	MODAL_ACTION_CONFIRM,
} from '../../../constants/constants';

const styles = {
	cssMenuItem: {
		fontSize: '12px',
	},
	btnMore: {
		fontSize: '16px',
		color: '#a2a0a2',
		cursor: 'pointer',
		'&:hover': {
			color: '#ffff',
		},
	},
};

export default function ButtonMore(props) {
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState(null);

	const open = Boolean(anchorEl);

	const { project } = props;
	const checkArchive = project.archived;

	const handleClick = event => {
		event.preventDefault();
		event.stopPropagation();
		setAnchorEl(event.target);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleArchive = async (status, projectId) => {
		await dispatch(archiveUnarchiveProjectApi(status, projectId));
	};

	const [isShowModalEditProject, setShowModalEditProject] = useState(false);

	const [nameEditProject, setNameEditProject] = useState(project.projectName);

	const toggleModalEditProject = () => {
		setShowModalEditProject(!isShowModalEditProject);
		handleClose();
	};

	const handleNameProjectChange = e => {
		const { value } = e.target;
		setNameEditProject(value);
	};

	const editNameProject = type => {
		if (type === MODAL_ACTION_CONFIRM) {
			const projectUpdate = {
				...project,
				projectName: nameEditProject,
			};
			dispatch(updateTitleProjectApi(projectUpdate));
		}

		toggleModalEditProject();
	};

	const handleSubmitEditProject = e => {
		e.preventDefault();
		editNameProject(MODAL_ACTION_CONFIRM);
	};

	return (
		<>
			<MoreHorizIcon
				aria-controls={open ? 'menu__project' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				sx={styles.btnMore}
			/>

			<Menu
				id='menu__project'
				anchorEl={anchorEl}
				open={open}
				onClose={event => {
					event.stopPropagation();
					handleClose();
				}}
			>
				<MenuItem sx={styles.cssMenuItem} onClick={toggleModalEditProject}>
					<ModeEditOutlinedIcon sx={{ fontSize: '18px', marginRight: '5px' }} />
					Edit name project
				</MenuItem>

				{checkArchive ? (
					<MenuItem
						sx={styles.cssMenuItem}
						onClick={event => {
							event.stopPropagation();
							handleArchive(false, project._id);
						}}
					>
						<UnarchiveOutlinedIcon sx={{ fontSize: '14px', marginRight: '9px' }} />
						Unarchive Project
					</MenuItem>
				) : (
					<MenuItem
						sx={styles.cssMenuItem}
						onClick={event => {
							event.stopPropagation();
							handleArchive(true, project._id);
						}}
					>
						<Inventory2OutlinedIcon sx={{ fontSize: '14px', marginRight: '5px' }} />
						Archive Project
					</MenuItem>
				)}
			</Menu>

			<ConfirmModal
				show={isShowModalEditProject}
				title='Edit name project'
				content={
					<form onSubmit={handleSubmitEditProject}>
						<label className='label__projectName'>Name Project</label>
						<br />
						<input
							onChange={handleNameProjectChange}
							spellCheck='false'
							type='text'
							className='input__projectName'
							value={nameEditProject}
						/>
					</form>
				}
				onAction={editNameProject}
				nameBtnConfirm='Edit'
			/>
		</>
	);
}
