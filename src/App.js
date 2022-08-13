import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { URLS } from './routes/routesAsana.js';
import SignUp from './pages/SignUp/SignUp';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import IntroPages from './pages/IntroPage/IntroPages';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import Home from './pages/Home/Home';
import store from './redux/configStore';
import LoadingPageWorkspace from './pages/LoadingPage/LoadingPageWorkspace.js';
import BlankProject from './pages/BlankProject/BlankProject';
import BoardView from './pages/ProjectBoardView/BoardView';
import './assets/css/resetCss.css';
import Progress from './components/ProgressTest/Progress.js';
import ProjectListPage from './pages/ProjectListPage/ProjectListPage.js';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Progress />
				<Routes>
					<Route path={URLS.webIntro} element={<IntroPages />} />
					<Route path={URLS.signUp} element={<SignUp />} />
					<Route path={URLS.verifyEmail} element={<VerifyEmail />} />
					<Route path={URLS.login} element={<LoginPage />} />
					<Route path={URLS.mainPage} element={<MainPage />}>
						<Route path={URLS.workspace} element={<Home />} />
						<Route path={URLS.boardView} element={<BoardView />} />
						<Route path=':projectId/list' element={<ProjectListPage />} />
					</Route>
					<Route path={URLS.newProject} element={<BlankProject />} />

					<Route path={URLS.loading} element={<LoadingPageWorkspace />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
