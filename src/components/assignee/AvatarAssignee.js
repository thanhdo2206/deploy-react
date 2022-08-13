import React from 'react';
import Avatar from '@mui/material/Avatar';

import './avatarAssignee.css';

export default function AvatarAssignee(props) {
	const { assignee } = props;
	return (
		<Avatar sx={{ bgcolor: '#F1BD6C' }} className='avatar__group--show'>
			{`${assignee.slice(0, 1).toUpperCase()}${assignee.slice(1, 2)}`}
		</Avatar>
	);
}
