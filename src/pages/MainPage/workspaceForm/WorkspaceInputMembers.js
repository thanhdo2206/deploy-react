import { FormHelperText } from '@material-ui/core';
import { Box, Grid } from '@mui/material';
import ChipInput from 'material-ui-chip-input';
import React from 'react';

import './workspaceInputMembers.css'

export default function WorkspaceInputMembers(props) {
    const {gridLabel, gridInput , emailArr, onSubmitAddEmail, onRemoveEmail, errors} = props
	return (
		<Grid container className='workspace__input--members'>
			<Grid item xs={gridLabel} className='workspace__label'>
				<label>members</label>
			</Grid>
			<Grid item xs={gridInput}>
				<ChipInput
					value={emailArr}
					onAdd={onSubmitAddEmail}
					onDelete={onRemoveEmail}
					fullWidth
					variant='outlined'
					error={!errors.emailErr ? Boolean(0) : Boolean(1)}
					className='chip__input'
					placeholder='Assign members'
				/>
				<Box sx={{ ml: 2, mb: 1 }}>
					{!errors.emailErr ? (
						''
					) : (
						<FormHelperText
							error={!errors.emailErr ? Boolean(0) : Boolean(1)}
							id='component-error-text'
						>
							{`${errors.emailErr}`}
						</FormHelperText>
					)}
				</Box>
			</Grid>
		</Grid>
	);
}
