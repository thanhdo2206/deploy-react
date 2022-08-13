import React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import '../workspaceForm/workspaceForm.css';
import { EMAIL_REGEX } from '../../../utils/emailRegex';
import * as workspaceService from '../../../services/workspaceService';
import { toggleFormAddMemberToWorkspace } from '../../../redux/actions/toggleAction';
import { currentUserRedux } from '../../../redux/selector/authSeclector';
import WorkspaceFormHeader from '../workspaceForm/WorkspaceFormHeader';
import WorkspaceInputMembers from '../workspaceForm/WorkspaceInputMembers';
import WorkspaceButtonSubmit from '../workspaceForm/WorkspaceButtonSubmit';

import { Typography } from '@mui/material';
import Progress from '../../../components/Progress/Progress';

const EMAIL_REQUIRE = 'Please check email again !';

export default function AddMembersForm(props) {
	const { isDisplay } = props;
	const currentUser = useSelector(currentUserRedux);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { workspaceId } = useParams();

	const [emailArr, setEmailArr] = useState([]);
	const [emailArrError, setEmailArrError] = useState([]);
	const [error, setError] = useState({
		emailErr: '',
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleCloseFormWorkspace = () => {
		setEmailArr([]);
		setError({});
		dispatch(toggleFormAddMemberToWorkspace(false));
	};

	const handleSumitFormWorkSpace = event => {
		event.preventDefault();
		const isValid = validationAll();
		if (isValid === false) return;

		const cloneEmailArr = [...emailArr];
		cloneEmailArr.push(currentUser.email);
		const data = {
			workspaceId: workspaceId,
			memberEmails: cloneEmailArr,
		};

		setIsLoading(true);

		const fectApiCreateNewWorkspace = async () => {
			await workspaceService.addUserToWorkspace(data);
			setIsLoading(false);
            navigate(`/main-page/home/${workspaceId}`);
            navigate(0);
		};

		fectApiCreateNewWorkspace();
	};

	const handleSubmitAddEmail = value => {
		const cloneEmailArr = [...emailArr];
		const cloneEmailArrError = [...emailArrError];
		const cloneValue = value.trim();
		const checkRegex = EMAIL_REGEX.test(cloneValue.toLowerCase());
		if (!checkRegex) {
			cloneEmailArrError.push(cloneValue);
			setEmailArrError(cloneEmailArrError);
		}
		cloneEmailArr.push(cloneValue);
		setEmailArr(cloneEmailArr);
	};

	const handleRemoveEmail = value => {
		const cloneEmailArr = [...emailArr];
		const cloneEmailArrError = [...emailArrError];
		const cloneValue = value.trim();
		const indexError = cloneEmailArrError.indexOf(cloneValue);
		const indexRemove = cloneEmailArr.indexOf(cloneValue);
		cloneEmailArrError.splice(indexError, 1);
		setEmailArrError(cloneEmailArrError);

		cloneEmailArr.splice(indexRemove, 1);
		setEmailArr(cloneEmailArr);
	};

	const validationAll = () => {
		const cloneEmailArr = [...emailArr];
		const cloneEmailArrError = [...emailArrError];
		let emailErr = cloneEmailArrError.length
			? EMAIL_REQUIRE
			: cloneEmailArr.length
			? ''
			: EMAIL_REQUIRE;
		console.log(emailErr);
		setError({ emailErr });
		return !emailErr;
	};

	return (
		<div>
			<Box className='workspace__form' display={isDisplay ? 'flex' : 'none'}>
				{isLoading ? <Progress /> : <></>}
				<Box
					className='workspace--container'
					height={error.emailErr ? '65%' : '63%'}
				>
					<WorkspaceFormHeader
						title='Add member to workspace'
						onCloseFormWorkspace={handleCloseFormWorkspace}
					/>
					<Box>
						<Typography sx={{ fontSize: '14px'}}>
							Your teammates will join the workspace.
						</Typography>
						<Typography sx={{ fontSize: '14px'}}>
							Existing email will be added directly to the your workspace.
						</Typography>
						<Typography sx={{ fontSize: '14px'}}>
                            Email does not exist. We send an email to register. Please check email.
						</Typography>
					</Box>
					<Box className='workspace__form--input'>
						<WorkspaceInputMembers
							gridLabel={12}
							gridInput={12}
							emailArr={emailArr}
							onSubmitAddEmail={handleSubmitAddEmail}
							onRemoveEmail={handleRemoveEmail}
							errors={error}
						/>
						<WorkspaceButtonSubmit onSubmitForm={handleSumitFormWorkSpace} />
					</Box>
				</Box>
			</Box>
		</div>
	);
}
