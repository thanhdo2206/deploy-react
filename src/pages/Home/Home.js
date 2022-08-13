import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Projects from './Projects';
import Members from './Members';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentWorkspaceAction } from '../../redux/actions/WorkspaceAction';
import { getDate } from '../../utils/date';
import * as workspaceService from '../../services/workspaceService';
import { getAllProjectInWorkspaceApi } from '../../redux/actions/ProjectAction';

const styles = {
	textDate: {
		textAlign: 'center',
		fontSize: '20px',
		marginBottom: '20px',
	},
	welcomeMessenger: {
		textAlign: 'center',
		fontSize: '34px',
	},
	memberBlock: {
		height: '100%',
	},
};

export default function Home() {
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.authReducer.currentUser);

	const { workspaceId } = useParams();

	useEffect(() => {
		async function fetchData() {
			if (workspaceId) {
				const result = await workspaceService.getWorkspaceById(workspaceId);
				dispatch(setCurrentWorkspaceAction(result.data));
				dispatch(getAllProjectInWorkspaceApi(workspaceId));
			}
		}
		fetchData();
	}, []);

	const getGreetingMessage = () => {
		const day = new Date();
		const hr = day.getHours();

		if (hr >= 0 && hr < 12) return 'Good Morning';

		if (hr >= 12 && hr <= 17) return 'Good Afternoon';

		if (hr > 17) return 'Good Evening';
	};

	return (
		<Box sx={{ padding: '24px' }}>
			<p style={styles.textDate}>{getDate()}</p>
			<p style={styles.welcomeMessenger}>{`${getGreetingMessage()}, ${
				currentUser.userName
			}`}</p>
			<Grid container spacing={4} mt={5}>
				<Grid item xs={6}>
					<Projects />
				</Grid>

				<Grid item xs={6} sx={styles.memberBlock}>
					<Box>
						<Members />
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
