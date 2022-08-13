import { Box, FormHelperText, Grid, TextField } from '@mui/material';
import React from 'react';

import './workspaceInputName.css';

export default function WorkspaceInputName(props) {
	const { workspace, onChangeNameWorkSpace, errors } = props;
	return (
		<Grid container>
			<Grid item xs={3} className='workspace__label'>
				<label>workspace name</label>
			</Grid>
			<Grid item xs={9} className='workspace__input'>
				<TextField
					margin='normal'
					fullWidth
					id='email'
					value={workspace}
					name='workspaceName'
					placeholder='Company or team name'
					autoFocus
					sx={{ mb: 0 }}
					size='small'
					onChange={onChangeNameWorkSpace}
					error={!errors.workspaceErr ? Boolean(0) : Boolean(1)}
				/>
				<Box sx={{ ml: 2, mb: 1 }}>
					{!errors.workspaceErr ? (
						''
					) : (
						<FormHelperText
							error={!errors.workspaceErr ? Boolean(0) : Boolean(1)}
							id='component-error-text'
						>
							{`${errors.workspaceErr}`}
						</FormHelperText>
					)}
				</Box>
			</Grid>
		</Grid>
	);
}
