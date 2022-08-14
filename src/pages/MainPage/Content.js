import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Outlet } from 'react-router-dom';
import { Main } from '../../components/Main/Main';
import { AppBar } from '../../components/AppBar/AppBar';
import { Box } from '@mui/system';
import HomeToolbar from './Toolbar/HomeToolbar';
import ProjectToolbar from './Toolbar/ProjectToolbar';
import { useParams } from 'react-router-dom';
import AvatarButton from '../MainPage/AvatarButton';

export default function Content(props) {
	let { projectId, workspaceId } = useParams();

	const { open, setOpen, drawerWidth } = props;

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	return (
		<Main open={open} drawerwidth={drawerWidth} sx={{ padding: '0px' }}>
			{/* header (toolbar) */}
			<AppBar
				position='fixed'
				open={open}
				drawerwidth={drawerWidth}
				sx={{ backgroundColor: '#fff', boxShadow: 'none', color: '#000' }}
			>
				<Toolbar sx={{ justifyContent: 'space-between' }}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<IconButton
							onClick={handleDrawerOpen}
							sx={{ mr: 2, ...(open && { display: 'none' }) }}
						>
							<ChevronRightIcon />
						</IconButton>

						{workspaceId ? <HomeToolbar /> : ''}

						{projectId ? <ProjectToolbar /> : ''}
					</Box>

					<AvatarButton />
				</Toolbar>
			</AppBar>

			<div style={{ marginTop: '56px' }}></div>

			{/* content */}
			<Outlet></Outlet>
		</Main>
	);
}
