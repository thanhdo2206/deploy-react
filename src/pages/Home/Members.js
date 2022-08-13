import React from 'react';
import Box from '@mui/material/Box';
import { BoxHover } from './BoxHover';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Divider, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import './member.css';
import { toggleFormAddMemberToWorkspace } from '../../redux/actions/toggleAction';

export default function Members() {
	const dispatch = useDispatch();
	const currentWorkSpace = useSelector(
		state => state.WorkspaceReducer.currentWorkSpace
	);

	const handleOpenFormAddMember = () => {
		dispatch(toggleFormAddMemberToWorkspace(true));
	};

	const members =
		currentWorkSpace && currentWorkSpace.members ? currentWorkSpace.members : [];
	return (
		<>
			<Box className='home__block--border'>
				<p className='home__header--title'>Members</p>
				<Box>
					<BoxHover
						className='home__box--addMember'
						onClick={handleOpenFormAddMember}
					>
						<Box className='home__icon--borderAddMember'>
							<AddIcon className='home__icon--addMember' />
						</Box>
						<Typography className='home__typo--addMember'>Add Members</Typography>
					</BoxHover>
					<Box className='home__box--listMember'>
						{members.map(member => {
							return (
								<BoxHover key={member._id} mb={2} className='home__box--memberItem'>
									<Avatar className='home__box--avatar'>
										{`${member.username.slice(0, 1).toUpperCase()}${member.username.slice(
											1,
											2
										)}`}
									</Avatar>
									<Box>
										<p >{member.username}</p>
										<p style={{ color: '#ccc' }}>{member.email}</p>
									</Box>
								</BoxHover>
							);
						})}
					</Box>
				</Box>
			</Box>
		</>
	);
}
