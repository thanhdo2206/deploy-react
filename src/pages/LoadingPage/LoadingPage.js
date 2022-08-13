import React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography, Box } from '@mui/material';

import './loadingpage.css';
export default function LoadingPage() {
	return (
		<div>
			<Box
				sx={{ justifyContent: 'center', height: '100vh', alignItems: 'center' }}
				display={'flex'}
				className='Loading__box'
			>
				<Box>
					<Stack sx={{ color: 'grey.500' }}>
						<CircularProgress
							color='inherit'
							sx={{
								width: '60px !important',
								height: '60px !important',
								margin: '0 auto',
							}}
						/>
					</Stack>
				</Box>
			</Box>
		</div>
	);
}
