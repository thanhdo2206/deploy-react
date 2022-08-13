import React from 'react';
import { Box, ListItemText } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import ButtonMore from './ButtonMore';
import { NavLink } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import { getProjectApi } from '../../../redux/actions/ProjectAction';
import WorkIcon from '@mui/icons-material/Work';
import {useParams} from 'react-router-dom';

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
	navLink: {
		width: '100%',
		color: '#fff',
		textDecoration: 'none',
	},
};

export default function UnarchiveProjects() {
	const dispatch = useDispatch();

	const {projectId} = useParams();

	

	let projectUnarchives = [];

	const arrProject = useSelector(state => state.ProjectReducer.arrProject);

	if (arrProject) {
		projectUnarchives = arrProject.filter(project => !project.archived);
	}

	return (
		<div>
			{projectUnarchives.map((project, index) => {
				let href = `/main-page/${project._id}/list`;
				let keyRender = `${project._id}`;
				return (
					<ListItem className={(project._id===projectId)?'listItem__project':''} key={keyRender} disablePadding>
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
							</Box>
						</NavLink>
					</ListItem>
				);
			})}
		</div>
	);
}
