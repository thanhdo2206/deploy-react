import React from 'react';
import Button from '@mui/material/Button';

export default function ButtonGetStarted() {
	return (
		<Button
			variant='contained'
			sx={{
				bgcolor: '#2B2B2B',
				textTransform: 'capitalize',
				fontSize: '16px',
				'&:hover': {
					color: '#333 !important',
					bgcolor: '#F06A6A',
				},
				fontWeight: 600,
				textDecoration: 'none',
			}}
		>
			Get Started
		</Button>
	);
}
