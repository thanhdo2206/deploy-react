import { Box } from '@mui/material';
import React from 'react';

import './workspaceButtonSubmit.css';

export default function WorkspaceButtonSubmit(props) {
	const { onSubmitForm } = props;
	return (
		<Box className='workspace__block--submit'>
			<button
				className='workspace__button--submit'
				onClick={onSubmitForm}
			>
				create workspace
			</button>
		</Box>
	);
}
