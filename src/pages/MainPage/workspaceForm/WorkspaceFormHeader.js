import { Button, Grid, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

import './workspaceFormHeader.css';

export default function WorkspaceFormHeader(props) {
	const { title, onCloseFormWorkspace } = props;
	return (
		<Grid container className='workspace--header'>
			<Grid item xs={11}>
				<Typography className='workspace__title--header'>
					{title}
				</Typography>
			</Grid>
			<Grid item xs={1}>
				<Button onClick={onCloseFormWorkspace} className='workspace__button--close'>
					<CloseIcon className='workspace__icon--close' />
				</Button>
			</Grid>
		</Grid>
	);
}
