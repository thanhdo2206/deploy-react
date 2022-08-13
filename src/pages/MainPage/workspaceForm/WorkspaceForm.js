import React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './workspaceForm.css';
import { EMAIL_REGEX } from '../../../utils/emailRegex';
import * as workspaceService from '../../../services/workspaceService';
import { toggleFormWorkspace } from '../../../redux/actions/toggleAction';
import { currentUserRedux } from '../../../redux/selector/authSeclector';
import WorkspaceFormHeader from './WorkspaceFormHeader';
import WorkspaceInputName from './WorkspaceInputName';
import WorkspaceInputMembers from './WorkspaceInputMembers';
import WorkspaceButtonSubmit from './WorkspaceButtonSubmit';
import Progress from '../../../components/Progress/Progress';

const WORKSPACE_REQUIRE = 'Name of workspace is require !';
const EMAIL_REQUIRE = 'Please check email again !';

export default function WorkspaceForm(props) {
	const { isDisplay } = props;
	const currentUser = useSelector(currentUserRedux);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [workspace, setWorkSpace] = useState('');
	const [emailArr, setEmailArr] = useState([]);
	const [emailArrError, setEmailArrError] = useState([]);
	const [errors, setErrors] = useState({
		workspaceErr: '',
		emailErr: '',
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleCloseFormWorkspace = () => {
		setEmailArr([]);
		setWorkSpace('');
		setErrors({});
		dispatch(toggleFormWorkspace(false));
	};

	const handleSumitFormWorkSpace = event => {
		event.preventDefault();
		const isValid = validationAll();
		if (isValid === false) return;

		const cloneEmailArr = [...emailArr];
		cloneEmailArr.push(currentUser.email);
		const data = {
			workspaceName: workspace,
			memberEmails: cloneEmailArr,
			Owner: currentUser.email,
		};

		setIsLoading(true);

		const fectApiCreateNewWorkspace = async () => {
			const result = await workspaceService.createNewWorkspace(data);
			setIsLoading(false);
			console.log(result);

			if (result.status === 500) {
				setErrors({
					workspaceErr: '',
					emailErr: EMAIL_REQUIRE,
				});
				return;
			}

			if (result.status === 200) {
				dispatch(toggleFormWorkspace(false));
				navigate(`/main-page/home/${result.data._id}`);
				navigate(0);
				return;
			}
		};

		fectApiCreateNewWorkspace();
	};

	const handleChangeNameWorkspace = event => {
		setWorkSpace(event.target.value);
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
		const cloneEmailArrError = [...emailArrError];
		let workspaceErr = workspace.length ? '' : WORKSPACE_REQUIRE;
		let emailErr = cloneEmailArrError.length ? EMAIL_REQUIRE : '';
		setErrors({ workspaceErr, emailErr });
		return !workspaceErr && !emailErr;
	};

	return (
		<div>
			<Box className='workspace__form' display={isDisplay ? 'flex' : 'none'}>
				{isLoading ? <Progress /> : <></>}
				<Box
					className='workspace--container'
					height={errors.workspaceErr ? (errors.emailErr ? '64%' : '62%') : '56%'}
				>
					<WorkspaceFormHeader
						title='create your workspace'
						onCloseFormWorkspace={handleCloseFormWorkspace}
					/>
					<Box className='workspace__form--input'>
						<WorkspaceInputName
							workspace={workspace}
							onChangeNameWorkSpace={handleChangeNameWorkspace}
							errors={errors}
						/>
						<WorkspaceInputMembers
							gridLabel={3}
							gridInput={9}
							emailArr={emailArr}
							onSubmitAddEmail={handleSubmitAddEmail}
							onRemoveEmail={handleRemoveEmail}
							errors={errors}
						/>
						<WorkspaceButtonSubmit onSubmitForm={handleSumitFormWorkSpace} />
					</Box>
				</Box>
			</Box>
		</div>
	);
}
