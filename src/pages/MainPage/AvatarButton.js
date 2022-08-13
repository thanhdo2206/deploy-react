import React from 'react';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import '../MainPage/avatarButton.css';
import { toggleFormWorkspace } from '../../redux/actions/toggleAction';
import { currentUserRedux } from '../../redux/selector/authSeclector';
import * as workspaceService from '../../services/workspaceService';

let workspace = [];

export default function AvatarButton() {
	const dispatch = useDispatch();
	const currentUser = useSelector(currentUserRedux);
	useEffect(() => {
		const fetchGetAllWorkspaceApi = async () => {
			const userEmail = currentUser.email;
			const result = await workspaceService.getAllWorkspaceByUserEmail(userEmail);
			workspace = [...result.data];
		};

		fetchGetAllWorkspaceApi();
	}, []);

	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleOpenFormWorkspace = () => {
		setAnchorElUser(null);
		dispatch(toggleFormWorkspace(true));
	};
	return (
		<div>
			<Tooltip title='Open settings'>
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					<Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
				</IconButton>
			</Tooltip>
			<Menu
				sx={{ mt: '45px' }}
				id='menu-appbar'
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
			>
				<Box className='avatar__menu'>
					<Box className='avatar__list--workspace'>
						{workspace.map(item => {
							return (
								<ListItem
									key={item._id}
									component='div'
									disablePadding
									onClick={handleCloseUserMenu}
									className='list__item--workspace'
								>
									<Link
										className='list__link'
										to={{ pathname: `/main-page/home/${item._id}` }}
										target='_blank'
									>
										<ListItemButton>
											<ListItemText className='list__button'>
												{`${item.workspaceName}`}
											</ListItemText>
										</ListItemButton>
									</Link>
								</ListItem>
							);
						})}
					</Box>
					<MenuItem onClick={handleOpenFormWorkspace}>
						<Typography className='item__typography--createwsp'>
							Create new workspace
						</Typography>
					</MenuItem>
					<MenuItem onClick={handleCloseUserMenu}>
						<Typography className='item__typography--logout'>Logout</Typography>
					</MenuItem>
				</Box>
			</Menu>
		</div>
	);
}
