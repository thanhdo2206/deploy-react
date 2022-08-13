import React from 'react';
import SideBar from './SideBar/SideBar';
import Content from './Content';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
	isToggleFormWorkspace,
	isToggleFormAddMemberToWorkspace,
} from '../../redux/selector/toggleSelector';
import * as storage from '../../utils/storage';
import { loginCurrentUser } from '../../redux/actions/authAction';
import WorkspaceForm from './workspaceForm/WorkspaceForm';
import AddMembersForm from './addMemberToWorkSpace/AddMembersForm';
import LoadingPage from '../LoadingPage/LoadingPage';

const drawerWidth = 240;

export default function MainPage() {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(true);
	const [isLoading, setIsLoading] = useState(true)
	const isDisplayFormWorkspace = useSelector(isToggleFormWorkspace);
	const isDisplayFormAddMemberToWorkspace = useSelector(
		isToggleFormAddMemberToWorkspace
	);
	const currentUserStorage = storage.getValueStorage('auth');
	dispatch(loginCurrentUser(currentUserStorage));
	
	useEffect(() => {
		const timeOut = setTimeout(() => setIsLoading(false), 2000)
		return () => clearTimeout(timeOut)
	});

	return (
		<>
			{isLoading ? (
				<LoadingPage />
			) : (
				<Box sx={{ display: 'flex' }}>
					<SideBar drawerWidth={drawerWidth} setOpen={setOpen} open={open}></SideBar>

					<Content drawerWidth={drawerWidth} setOpen={setOpen} open={open}></Content>
					<WorkspaceForm isDisplay={isDisplayFormWorkspace} />
					<AddMembersForm isDisplay={isDisplayFormAddMemberToWorkspace} />
				</Box>
			)}
		</>
	);
}
