import { useNavigate } from 'react-router-dom';

import LoadingPage from './LoadingPage';
import * as workspaceService from '../../services/workspaceService';
import * as storage from '../../utils/storage'

export default function LoadingPageWorkspace() {
	const navigate = useNavigate();
	const currentUserStorage = storage.getValueStorage('auth');

	const fetchGetAllWorkspaceApi = async () => {
		const userEmail = currentUserStorage.email;
		const result = await workspaceService.getAllWorkspaceByUserEmail(userEmail);
		navigate(`/main-page/home/${result.data[0]._id}`);
	};

	fetchGetAllWorkspaceApi();

	return <LoadingPage />;
}
