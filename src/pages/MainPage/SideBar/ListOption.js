import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import { NavLink } from 'react-router-dom';
import { ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import ListItem from '@mui/material/ListItem';

const styles = {
	navLink: {
		width: '100%',
		color: '#fff',
		textDecoration: 'none',
	},
	iconButton: {
		color: '#a2a0a2',
		fontSize: '20px',
	},
};

export default function ListOption() {
	const currentWorkSpace = useSelector(
		state => state.WorkspaceReducer.currentWorkSpace
	);

	const arrListOption = [
		{
			title: 'Home',
			href: `/main-page/home/${currentWorkSpace._id}`,
			tagIcon: <HomeOutlinedIcon sx={styles.iconButton} />,
		},
		{
			title: 'Reporting',
			href: '/main-page/reporting',
			tagIcon: <OutlinedFlagIcon sx={styles.iconButton} />,
		},
	];

	return (
		<List>
			{arrListOption.map((item, index) => {
				return (
					<ListItem key={item.title} disablePadding>
						<NavLink
							className='nav__link--sidebar'
							to={item.href}
							style={styles.navLink}
						>
							<ListItemButton>
								<ListItemIcon sx={{ minWidth: '28px' }}>{item.tagIcon}</ListItemIcon>
								<ListItemText className="listItem__option-text" primary={item.title} />
							</ListItemButton>
						</NavLink>
					</ListItem>
				);
			})}
		</List>
	);
}
