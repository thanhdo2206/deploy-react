import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { NavLink } from 'react-router-dom';
import { DrawerHeader } from '../../../components/DrawerHeader/DrawerHeader';
import { Avatar, AvatarGroup } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import UnarchiveProjects from './UnarchiveProjects';
import ListOption from './ListOption';
import { List, ListItem, ListItemText, Tooltip } from '@mui/material';
import ArchiveProjects from './ArchiveProjects';
import './SideBar.css';
import { getWorkspaceById } from '../../../services/workspaceService';
import { setCurrentWorkspaceAction } from '../../../redux/actions/WorkspaceAction';
import { getAllProjectInWorkspaceApi } from '../../../redux/actions/ProjectAction';

const styles = {
	iconBtnClose: {
		color: '#fff',
		'&:hover': {
			backgroundColor: 'rgb(186 179 179 / 40%)',
		},
	},
	btnCreateProject: {
		fontSize: '20px',
		color: '#a2a0a2',
		cursor: 'pointer',
		'&:hover': {
			color: '#ffff',
		},
	},
	navLink: {
		color: '#fff',
		textDecoration: 'none',
	},
};

export default function SideBar(props) {
	const currentWorkSpace = useSelector(
		state => state.WorkspaceReducer.currentWorkSpace
	);

	const currentProject = useSelector(
		state => state.ProjectReducer.currentProject
	);

	const dispatch = useDispatch();

	const { open, setOpen, drawerWidth } = props;

	useEffect(() => {
		async function fetchData() {
			if (currentProject._id) {
				const result = await getWorkspaceById(currentProject.workspaceId);
				dispatch(setCurrentWorkspaceAction(result.data));
				dispatch(getAllProjectInWorkspaceApi(currentProject.workspaceId));
			}
		}
		fetchData();
	}, [currentProject]);

	const handleDrawerClose = () => {
		setOpen(false);
	};

	let members = [];

	if (currentWorkSpace && currentWorkSpace.members)
		members = currentWorkSpace.members;

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,

				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
					backgroundColor: '#1e1f21',
					color: '#ffff',
				},
			}}
			variant='persistent'
			anchor='left'
			open={open}
		>
			<DrawerHeader>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Box
						component='img'
						sx={{
							maxWidth: '32px',
						}}
						alt='Logo'
						src='/img/logoSmall.png'
					/>
					<span style={{ marginLeft: '2px' }}>INFINITY</span>
				</Box>
				<IconButton sx={styles.iconBtnClose} onClick={handleDrawerClose}>
					<ChevronLeftIcon />
				</IconButton>
			</DrawerHeader>

			<ListOption />

			<Divider sx={{ borderColor: '#f5f4f361' }} />

			{/* list project */}
			<List>
				<ListItem>
					<ListItemText primary={currentWorkSpace.workspaceName} />

					<Tooltip title='Create a project' placement='right'>
						<NavLink to='/new-project' style={styles.navLink}>
							<Box component='span' sx={styles.btnCreateProject}>
								+
							</Box>
						</NavLink>
					</Tooltip>
				</ListItem>

				{/* members in workspace */}
				<Box
					sx={{ display: 'flex', justifyContent: 'flex-start', padding: '0 12px' }}
					className='sideBar__avatar--menu'
				>
					<AvatarGroup max={3}>
						{members.map((member, index) => {
							return (
								<Avatar
									sx={{
										bgcolor: '#F1BD6C',
										width: '25px',
										height: '25px',
										fontSize: '13px',
										border: 'none !important',
										mr: 1.5,
										color: 'black',
									}}
									key={index}
									className='sideBar__avatar--show'
								>
									{`${member.username.slice(0, 1).toUpperCase()}${member.username.slice(
										1,
										2
									)}`}
									<div className='sideBar__avatar--hoverEmail'>{member.email}</div>
								</Avatar>
							);
						})}
					</AvatarGroup>
				</Box>

				<UnarchiveProjects />

				<ArchiveProjects />
			</List>
		</Drawer>
	);
}
