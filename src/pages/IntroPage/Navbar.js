import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link as LinkRoute } from 'react-router-dom';
import ButtonGetStarted from './ButtonGetStarted';
const pages = ['Why Infinity?'];

const styles = {
	linkLogin: {
		textDecoration: 'none',
	},
};
export default function Navbar() {
	return (
		<AppBar
			position='fixed'
			sx={{
				bgcolor: '#FFFFFF',
				zIndex: '2',
			}}
		>
			<Container maxWidth='lg'>
				<Toolbar disableGutters>
					<div className='main-logo'>
						<Grid container alignItems='center'>
							<img
								src='/img/logoInfinity.png'
								alt='#'
								style={{
									width: '122px',
									height: '36px',
									marginRight: '8px',
								}}
							/>
							{/* <Typography
								variant='h6'
								noWrap
								component='a'
								href='/'
								sx={{
									mr: 2,
									display: { xs: 'none', md: 'flex' },
									fontFamily: "'League Spartan', sans-serif",
									color: '#2B2B2B',
									textDecoration: 'none',
									fontSize: '25px',
								}}
							>
								asana
							</Typography> */}
						</Grid>
					</div>

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map(page => (
							<Button
								key={page}
								sx={{
									my: 2,
									display: 'block',
									textTransform: 'none',
									padding: '10px 15px',
									margin: '0',
									textAlign: 'center',
									color: '#727272',
									fontWeight: 600,
									'&:hover': {
										color: '#333 !important',
									},
									fontFamily: 'inherit',
									fontSize: '16px',
								}}
							>
								{page}
							</Button>
						))}
					</Box>

					<LinkRoute
						href='#'
						style={{
							color: '#727272',
							'&:hover': {
								color: '#333 !important',
							},
						}}
						to='/login'
					>
						<AccountCircleIcon sx={{ padding: '0px 20px' }} />
					</LinkRoute>
					<LinkRoute to='/sign-up' style={styles.linkLogin}>
						<ButtonGetStarted />
					</LinkRoute>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
