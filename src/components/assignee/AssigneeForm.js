import { Avatar, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import './assigneeForm.css';

export default function AssigneeForm(props) {
	const { memberArr, onClickAssignee } = props;
	return (
		<Box
			className='dropItem__block--assigneehidden'
		>
			<Box item xs={6} className='col--assignee'>
				{memberArr.map((member, index) => {
					const { _id, username, email } = member;
					return (
						<Box
							sx={{ display: 'flex' }}
							className='col__block--content'
							key={index}
							onClick={() => onClickAssignee(member)}
						>
							<Box>
								<Avatar sx={{ bgcolor: '#F1BD6C' }} className='col__avatar'>
									{`${username.slice(0, 1).toUpperCase()}${username.slice(1, 2)}`}
								</Avatar>
							</Box>
							<Box className='col__block--typography'>
								<Typography className='col__typography col__typo--userName'>
									{username}
									{/* {`${username.slice(0, 1).toUpperCase()}${username.slice(1, 4)}`} */}
								</Typography>
								<Typography className='col__typography col_typo--email'>
									{email}
								</Typography>
							</Box>
						</Box>
					);
				})}
				{/* <p>Thanh</p> */}
			</Box>
		</Box>
	);
}
