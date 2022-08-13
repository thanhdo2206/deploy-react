import React from 'react';
import { Typography } from '@mui/material';

export default function DisplayStatus(props) {
	const { status, arr } = props;
	switch (status) {
		case '1':
			return (
				<Typography
					className={`dropItem__typography dropItem__typography--${arr[1]}`}
				>
					{arr[1].replace('_', ' ')}
				</Typography>
			);
		case '2':
			return (
				<Typography
					className={`dropItem__typography dropItem__typography--${arr[2]}`}
				>
					{arr[2]}
				</Typography>
			);
		case '3':
			return (
				<Typography
					className={`dropItem__typography dropItem__typography--${arr[3]}`}
				>
					{arr[3]}
				</Typography>
			);
		default:
			return (
				<Typography className='dropItem__typography dropItem__typography--none'>___</Typography>
			);
	}
}
