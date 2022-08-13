import React from 'react';
import { Box, ListItemText, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import ButtonMore from './ButtonMore';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import { getProjectApi } from '../../../redux/actions/ProjectAction';
import WorkIcon from '@mui/icons-material/Work';

const styles = {
	boxProjectContainer: {
		padding: '2px 16px',
		display: 'flex',
		alignItems: 'center',
	},
	boxProject: {
		width: '8px',
		height: '8px',
		backgroundColor: '#aecf55',
		marginRight: '10px',
		borderRadius: '2px',
	},
	btnShowArchive: {
		fontSize: '12px',
		marginLeft: '16px',
		cursor: 'pointer',
		color: '#a2a0a2',
		'&:hover': {
			color: '#fff',
		},
	},
	navLink: {
		width: '100%',
		color: '#fff',
		textDecoration: 'none',
	},
};

export default function ArchiveProjects() {
	const dispatch = useDispatch();

	const [showArchiveProject, setShowArchiveProject] = useState(false);

	const arrProject = useSelector(state => state.ProjectReducer.arrProject);

	const projectArchives = arrProject
		? arrProject.filter(project => project.archived)
		: [];

	return (
		<Box>
			<Box display={showArchiveProject ? 'block' : 'none'}>
				{projectArchives.map((project, index) => {
					let href = `/main-page/${project._id}/list`;
					let keyRender = `${project._id}`;

					return (
						<ListItem className='listItem__hover' key={keyRender} disablePadding>
							<NavLink
								className='nav__link--sidebar'
								to={href}
								style={styles.navLink}
								onClick={() => {
									dispatch(getProjectApi(project._id));
								}}
							>
								<Box sx={styles.boxProjectContainer}>
									<WorkIcon sx={{ fontSize: '16px', marginRight: '10px' }} />

									<ListItemText
										sx={{
											'& .css-10hburv-MuiTypography-root': { fontSize: '12px' },
										}}
										primary={project.projectName}
									/>

									<ButtonMore project={project} />

									<InventoryIcon
										sx={{ fontSize: '14px', marginLeft: '5px', color: '#f5f4f3' }}
									/>
								</Box>
							</NavLink>
						</ListItem>
					);
				})}
			</Box>

			<Box mt={1}>
				<Typography
					component='span'
					sx={styles.btnShowArchive}
					onClick={() => {
						setShowArchiveProject(!showArchiveProject);
					}}
				>
					{showArchiveProject
						? 'Unshow archived projects'
						: 'Show archived projects'}
				</Typography>
			</Box>
		</Box>
	);
}
