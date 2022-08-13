import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHelperText } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { EMAIL_REGEX } from '../../utils/emailRegex';
import {
	loginStart,
	loginFailed,
	loginSuccess,
} from '../../redux/actions/authAction';
import * as loginService from '../../services/LoginService';
import * as storage from '../../utils/storage';
import Progress from '../../components/Progress/Progress';

const EMAIL_INVALID = 'Email is invalid !';
const EMAIL_REQUIRE = 'Email is require !';
const EMAIL_AGAIN = 'Please check your email again !';
const PASSWORD_REQUIRE = 'Password is require !';
const PASSWORD_AGAIN = 'Please check your password again !';

export default function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({
		emailErr: '',
		passwordErr: '',
	});

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	const validationAll = data => {
		const { email, password } = { ...data };
		let checkRegex = EMAIL_REGEX.test(email.toLowerCase());
		let passwordErr = password.length ? '' : PASSWORD_REQUIRE;
		let emailErr = email.length
			? checkRegex
				? ''
				: EMAIL_INVALID
			: EMAIL_REQUIRE;

		setErrors({ emailErr, passwordErr });
		return !emailErr && !passwordErr;
	};

	const handleSubmit = event => {
		event.preventDefault();
		const data = {
			email: event.target.email.value,
			password: event.target.password.value,
		};

		const isValid = validationAll(data);
		if (isValid === false) return;

		dispatch(loginStart());
		setIsLoading(true);
		const fectLoginApi = async () => {
			const result = await loginService.login(data);
			setIsLoading(false);

			if (result.status === 200) {
				storage.storeValueStorage('auth', result.data);
				dispatch(loginSuccess());
				navigate('/loading');
				return;
			}

			if (result.status === 404) {
				setErrors({
					emailErr: `${EMAIL_AGAIN}`,
					passwordErr: '',
				});
				return;
			}

			if (result.status === 403) {
				setErrors({
					emailErr: '',
					passwordErr: `${PASSWORD_AGAIN}`,
				});
				return;
			}
		};

		fectLoginApi();
	};

	return (
		<Box>
			{isLoading ? <Progress /> : <></>}
			<Container component='main' sx={{ width: '32%' }}>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Box>
						<ImageListItem sx={{ width: '180px', pb: 4 }}>
							<img src='/img/logoInfinity.png' alt='#' />
						</ImageListItem>
					</Box>
					<Typography component='h1' variant='h4' sx={{ pb: 2 }}>
						Login into Infinity
					</Typography>

					<Box
						component='form'
						onSubmit={handleSubmit}
						sx={{ mt: 1, width: '100%' }}
					>
						<TextField
							margin='normal'
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							error={!errors.emailErr ? Boolean(0) : Boolean(1)}
							autoFocus
							sx={{ mb: 0 }}
						/>
						<Box sx={{ ml: 2, mb: 1 }}>
							{!errors.emailErr ? (
								''
							) : (
								<FormHelperText
									error={!errors.emailErr ? Boolean(0) : Boolean(1)}
									id='component-error-text'
								>
									{`${errors.emailErr}`}
								</FormHelperText>
							)}
						</Box>
						<FormControl fullWidth variant='outlined'>
							<InputLabel
								htmlFor='outlined-adornment-password'
								error={!errors.passwordErr ? Boolean(0) : Boolean(1)}
							>
								Password
							</InputLabel>
							<OutlinedInput
								id='outlined-adornment-password'
								type={showPassword ? 'text' : 'password'}
								name='password'
								error={!errors.passwordErr ? Boolean(0) : Boolean(1)}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge='end'
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								label='Password'
							/>
						</FormControl>
						<Box sx={{ ml: 2, mb: 1 }}>
							{!errors.passwordErr ? (
								''
							) : (
								<FormHelperText
									error={!errors.passwordErr ? Boolean(0) : Boolean(1)}
									id='component-error-text'
								>
									{`${errors.passwordErr}`}
								</FormHelperText>
							)}
						</Box>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{
								mt: 3,
								mb: 2,
								bgcolor: '#726ab9',
								'&:hover': { bgcolor: '#464075' },
							}}
						>
							Sign In
						</Button>

						<Link
							href='/sign-up'
							variant='body2'
							sx={{
								color: '#727272',
								textDecoration: 'none',
								float: 'right',
								'&:hover': { textDecoration: 'underline' },
							}}
						>
							{"Don't have an account? Sign Up"}
						</Link>
					</Box>
				</Box>
			</Container>
		</Box>
	);
}
