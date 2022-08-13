import React from 'react';
import Button from '@mui/material/Button';
import { Grid, Container, Box } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link as LinkRoute } from 'react-router-dom';

import './footerintropage.css';

const siteFooterItemLink = [
	{
		title: 'Asana',
		footerItems: [
			{ link: '#/', name: 'Home' },
			{ link: '#/', name: 'Product' },
			{ link: '#/', name: 'Pricing' },
			{ link: '#/', name: 'Premium' },
			{ link: '#/', name: 'Business' },
			{ link: '#/', name: 'Enterprise' },
			{ link: '#/', name: 'Customer Success' },
			{ link: '#/', name: 'Asana Templates' },
			{ link: '#/', name: 'Trust &amp; Security' },
			{ link: 'https://status.asana.com', name: 'Status' },
		],
	},
	{
		title: 'About Us',
		footerItems: [
			{ link: '#/', name: 'Company' },
			{ link: '#/', name: 'Leadership' },
			{ link: '#/', name: 'Customers' },
			{ link: '#/', name: 'Diversity' },
			{ link: '#/', name: 'Carrees' },
			{ link: '#/', name: 'Press' },
			{ link: '#/', name: 'Wavelength' },
			{ link: '#/', name: 'Asana Blog' },
			{ link: '#/', name: 'Investor Relations' },
			{ link: '#/', name: 'Sitemap' },
		],
	},
	{
		title: 'Workflow Solutions',
		footerItems: [
			{ link: '#/', name: 'Project Management' },
			{ link: '#/', name: 'Goal Management' },
			{ link: '#/', name: 'Agile Management' },
			{ link: '#/', name: 'Task Management' },
			{ link: '#/', name: 'Increase Productivity' },
			{ link: '#/', name: 'Work Management' },
			{ link: '#/', name: 'Project Planning' },
			{ link: '#/', name: 'To Do Lists' },
			{ link: '#/', name: 'See All Uses' },
			{ link: '#/', name: 'See All Teams' },
		],
	},
	{
		title: 'Resources',
		footerItems: [
			{ link: '#/', name: 'Asana Guide' },
			{ link: '#/', name: 'Forum' },
			{ link: '#/', name: 'Support' },
			{ link: '#/', name: 'App Directory' },
			{ link: '#/', name: 'Developers & API' },
			{ link: '#/', name: 'Partners' },
			{ link: '#/', name: 'Asana Community' },
			{ link: '#/', name: 'Events' },
			{ link: '#/', name: 'Asana for Nonprofits' },
			{ link: '#/', name: 'Accessibility' },
		],
	},
	{
		title: 'Learn',
		footerItems: [
			{ link: '#/', name: '11 Leadership Styles' },
			{ link: '#/', name: '110 Icebreaker Questions' },
			{ link: '#/', name: 'Executive Summary Tips' },
			{ link: '#/', name: 'Impostor Syndrome Tips' },
			{ link: '#/', name: 'Prevent Team Burnout' },
			{ link: '#/', name: 'SWOT Analysis Tips' },
			{ link: '#/', name: 'What are OKRs?' },
			{ link: '#/', name: 'What are SMART Goals?' },
			{ link: '#/', name: 'What is Scope Creep?' },
			{ link: '#/', name: 'See All Guides' },
		],
	},
];

const styles = {
	footer: {
		background: '#0D0E10',
		marginTop: '30px',
	},
	logoFooterBanner: {
		width: '40px',
		paddingTop: '100px',
	},
	logoFooterItem: {
		width: '30px',
		paddingTop: '15px',
		paddingLeft: '20px',
	},
	container: {
		display: 'flex',
	},
	bgFooterBottom: {
		background: '#2A2B2C',
	},
	linkLogin: {
		textDecoration: 'none',
	},
};

const iconFooter = [
	<TwitterIcon />,
	<LinkedInIcon />,
	<InstagramIcon />,
	<FacebookIcon />,
	<YouTubeIcon />,
];

export default function FooterIntroPage() {
	return (
		<>
			<div className='footer' style={styles.footer}>
				<Container
					fixed
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						color: 'white',
						borderBottom: '1px gray solid',
					}}
				>
					<img
						src='assets/images/IntroPage/logo-asana.png'
						alt='#'
						style={styles.logoFooterBanner}
					/>
					<h1>See everything the teams on working on in one place</h1>
					<LinkRoute to='/sign-up' style={styles.linkLogin}>
						<Button
							variant='contained'
							href='#contained-buttons'
							sx={{
								bgcolor: '#2B2B2B',
								textTransform: 'capitalize',
								fontSize: '18px',
								'&:hover': {
									color: '#333 !important',
									bgcolor: '#F06A6A',
								},
								fontWeight: 600,
								marginBottom: '70px',
								padding: '10px 20px',
							}}
						>
							Get Started
						</Button>
					</LinkRoute>
				</Container>

				<Container>
					<Grid
						container
						sx={{
							color: 'white',
						}}
					>
						<Grid item md={1}>
							<img
								src='assets/images/IntroPage/logo-asana.png'
								alt='#'
								style={styles.logoFooterItem}
							/>
						</Grid>
						{siteFooterItemLink.map(value => {
							return (
								<Grid item md={2}>
									<ul className='siteFooter__list'>
										<li className='siteFooter__title'>{value.title}</li>
										{value.footerItems.map(item => {
											return (
												<li className='siteFooter__item'>
													<a href={`${item.link}`} className='-white css-0'>
														{item.name}
													</a>
												</li>
											);
										})}
									</ul>
								</Grid>
							);
						})}
					</Grid>
				</Container>
			</div>
			<div style={styles.bgFooterBottom}>
				<Container>
					<Box
						sx={{
							color: 'white',
							display: 'flex',
							justifyContent: 'space-around',
							alignItems: 'center',
							padding: '20px 0',
							boxSizing: 'border-box',
						}}
					>
						<div>
							<p>@ 2022 Asana, Inc.</p>
						</div>
						<div className='siteFooter__language'>
							<LanguageIcon /> <span>English</span>
						</div>
						<div className='siteFooter__privacy'>
							<a href='#/'>Term & Privacy</a>
						</div>
						<div className='siteFooter__social'>
							{iconFooter.map(item => {
								return (
									<div>
										<a href='#/'>{item}</a>
									</div>
								);
							})}
						</div>
					</Box>
				</Container>
			</div>
		</>
	);
}
