import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import { registerService } from '../../services/registerService';
import ImageListItem from '@mui/material/ImageListItem';

const EMAIL_REGEX =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EMAIL_INVALID = 'Email is invalid !';
const TEXT_ERROR_PASSWORD = 'Your password must have at least 8 characters !';
const TEXT_ERROR_USERNAME = 'User name must have at least 5 characters !';
const TEXT_ERROR_EXIST_USERNAME = 'The user name already exists !';
const TEXT_ERROR_EXIST_EMAIL = 'The email already exists !';

const styles = {
	spanExistAcount: {
		fontSize: '14px',
		color: '#ba1d23',
		padding: '10px',
		backgroundColor: '#efbfc1',
		width: '100%',
		textAlign: 'center',
		margin: '30px',
	},
};

export default function SignUp() {
	let navigate = useNavigate();

	const [state, setState] = useState({
		values: { userName: '', email: '', password: '' },
		errors: { userName: '', email: '', password: '' },
	});

	const [showPassword, setShowPassword] = useState(false);

	const [checkExistAcount, setCheckExistAcount] = useState(true);

	const [textExistAcount, setTextExistAcount] = useState('');

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = event => {
		event.preventDefault();

		let indexError = Object.values(state.errors).findIndex(error => error !== '');

		if (indexError === -1) {
			let values = { ...state.values };
			registerApi(values);
		}

		return false;
	};

	const registerApi = async values => {
		const result = await registerService(values);

		if (result.status === 200) {
			navigate('/verify-email');
		}

		if (result.status === 400) {
			setCheckExistAcount(false);
			setTextExistAcount(TEXT_ERROR_EXIST_EMAIL);
		}

		if (result.status === 500) {
			setCheckExistAcount(false);
			setTextExistAcount(TEXT_ERROR_EXIST_USERNAME);
		}
	};

	const validate = (name, value, newErrors) => {
		if (!value.trim()) {
			newErrors[name] = `${name} is required !`;
			return;
		}

		switch (name) {
			case 'userName': {
				let checkLength = value.length >= 5;
				newErrors.userName = checkLength ? '' : TEXT_ERROR_USERNAME;
				break;
			}

			case 'email': {
				let checkRegex = EMAIL_REGEX.test(value.toLowerCase());
				newErrors.email = checkRegex ? '' : EMAIL_INVALID;
				break;
			}

			case 'password': {
				let checkLength = value.length >= 8;
				newErrors.password = checkLength ? '' : TEXT_ERROR_PASSWORD;
				break;
			}

			default:
				return;
		}
	};

	const getValue = event => {
		const { name, value } = event.target;
		const newValues = { ...state.values, [name]: value };
		const newErrors = { ...state.errors };

		validate(name, value, newErrors);
		setState({ values: newValues, errors: newErrors });
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				margin: '0px',
				position: 'fixed',
				top: '40%',
				left: '50%',
				transform: ' translate(-50%, -50%)',
				width: '32%',
			}}
		>
			<ImageListItem sx={{ width: '180px', pb: 1 }}>
				<img src='/img/logoInfinity.png' alt='#' />
			</ImageListItem>

			<Typography component='h1' variant='h4' mb={3}>
				Sign up
			</Typography>

			{checkExistAcount ? (
				''
			) : (
				<span style={styles.spanExistAcount}>{textExistAcount}</span>
			)}

			<form onSubmit={handleSubmit} style={{ width: '100%' }}>
				<TextField
					autoFocus
					onChange={getValue}
					required
					fullWidth
					id='userName'
					label='User Name'
					name='userName'
					autoComplete='userName'
					error={state.errors.userName !== ''}
					helperText={state.errors.userName}
				/>

				{/* email */}
				<TextField
					onChange={getValue}
					margin='normal'
					required
					fullWidth
					id='email'
					label='Email Address'
					name='email'
					autoComplete='email'
					error={state.errors.email !== ''}
					helperText={state.errors.email}
				/>

				{/* password */}
				<div style={{ position: 'relative' }}>
					<TextField
						onChange={getValue}
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type={showPassword ? 'text' : 'password'}
						id='password'
						autoComplete='current-password'
						error={state.errors.password !== ''}
						helperText={state.errors.password}
						value={state.values.password}
					/>

					<InputAdornment
						position='end'
						sx={{ position: 'absolute', right: '14px', top: '44px' }}
					>
						<IconButton
							aria-label='toggle password visibility'
							onClick={handleClickShowPassword}
							edge='end'
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				</div>

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
					Sign Up
				</Button>
			</form>
		</Box>
	);
}
