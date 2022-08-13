import React from 'react';
import './integrationSection.css';

import Slider from 'react-slick';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const cardItemProductTop = [
	{
		title: 'google calendar',
		img: '/assets/images/IntroPage/gg-calendar-logo.png',
		content:
			'For time management. Add your Asana tasks to your calendar to see dealines.',
		bgcolor: '#4285F1',
	},
	{
		title: 'harvest',
		img: '/assets/images/IntroPage/harvest-logo.png',
		content:
			'For time tracking. Track time to record billable hours and create invoices in Asana.',
		bgcolor: '#F47510',
	},
	{
		title: 'dropbox',
		img: '/assets/images/IntroPage/dropbox-logo.png',
		content:
			'For file sharing. Attach files from Dropbox to Asana tasks from the Asana task pane.',
		bgcolor: '#0D2582',
	},
	{
		title: 'slack',
		img: '/assets/images/IntroPage/slack-logo.png',
		content:
			'For communication. Add, assign, even comment on Asana tasks (and more) in Slack.',
		bgcolor: '#611F69',
	},
	{
		title: 'google drive',
		img: '/assets/images/IntroPage/gg-drive-logo.png',
		content:
			'For file sharing. Attach files from Dropbox to Asana tasks from the Asana task pane.',
		bgcolor: '#0F9D58',
	},
	{
		title: 'jira cloud',
		img: '/assets/images/IntroPage/jira-cloud-logo.png',
		content:
			'For coordination. Create Jira - issues and track work without Ty |.',
		bgcolor: '#0061D5',
	},
];

const cardItemProductBottom = [
	{
		title: 'gmail',
		img: '/assets/images/IntroPage/gmail-logo.png',
		content:
			'For coordination. Turn email into task in Asana right from your Gmail inbox',
		bgcolor: '#C9493B',
	},
	{
		title: 'Salesforce',
		img: '/assets/images/IntroPage/salesforce-logo.png',
		content:
			'For coordination. Collaborate on Asana tasks for pre-sales needs in Salesforce.',
		bgcolor: '#0496D0',
	},
	{
		title: 'Instagantt',
		img: '/assets/images/IntroPage/instagantt-logo.png',
		content:
			'For scheduling. Make Gantt charts to see Asana tasks and more on timelines.',
		bgcolor: '#0B7BEC',
	},
	{
		title: 'Microsoft Power BI',
		img: '/assets/images/IntroPage/powerBI-logo.png',
		content:
			'For reporting. Pull data from Asana into Power BI to create custom dashboards.',
		bgcolor: '#21252C',
	},
	{
		title: 'Office 365',
		img: '/assets/images/IntroPage/365-logo.png',
		content:
			'For communication. Stay up to date on work in Asana without leaving Microsoft groups.',
		bgcolor: '#DD4119',
	},
	{
		title: 'Box',
		img: '/assets/images/IntroPage/box-logo.png',
		content:
			'For file sharing. Attach files from Box to Asana tasks from the Asana task pane.',
		bgcolor: '#045ADF',
	},
];

const settingsCarousel = {
	carouselTop: {
		dots: false,
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 1000,
		pauseOnHover: true,
	},
	carouselBottom: {
		dots: false,
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: -1,
		autoplay: true,
		autoplaySpeed: 1000,
		pauseOnHover: true,
	},
};
export default function IntergrationSection() {
	return (
		<div className='integration__section' style={{ width: '100%' }}>
			<Container className='integration__content'>
				<Grid container>
					<Grid item xs={5}>
						<p className='content__label '>integrations</p>
						<h3 className='content__title'>One platform to manage work</h3>
						<p className='content__subtitle'>
							With more than 200+ intergrations, you can bring together everything your
							team needs to communicate collaborate, and coordinate work, from start to
							finish
						</p>
					</Grid>
				</Grid>
			</Container>

			<div className='carousel' id='carousel--top'>
				<Slider {...settingsCarousel.carouselTop}>
					{cardItemProductTop.map(item => {
						return (
							<div key={item.title}>
								<Card
									sx={{
										width: 240,
										height: 250,
										m: '0 10px',
										bgcolor: `${item.bgcolor}`,
										borderRadius: '15px',
										'&:hover': {
											opacity: 0.8,
										},
									}}
								>
									<CardContent>
										<div className='carousel__card--img'>
											<img src={item.img} alt='#' />
										</div>
										<Typography
											variant='h5'
											component='div'
											className='carousel__card--title'
										>
											{item.title}
										</Typography>
										<Typography variant='body2' className='carousel__card--subtitle'>
											{item.content}
										</Typography>
									</CardContent>
								</Card>
							</div>
						);
					})}
				</Slider>
			</div>
			<div className='carousel' id='carousel--bottom'>
				<Slider {...settingsCarousel.carouselBottom}>
					{cardItemProductBottom.map(item => {
						return (
							<div key={item.title}>
								<Card
									sx={{
										width: 240,
										height: 250,
										m: '0 10px',
										bgcolor: `${item.bgcolor}`,
										borderRadius: '15px',
										'&:hover': {
											opacity: 0.8,
										},
									}}
								>
									<CardContent>
										<div className='carousel__card--img'>
											<img src={item.img} alt='#' />
										</div>
										<Typography
											variant='h5'
											component='div'
											className='carousel__card--title'
										>
											{item.title}
										</Typography>
										<Typography variant='body2' className='carousel__card--subtitle'>
											{item.content}
										</Typography>
									</CardContent>
								</Card>
							</div>
						);
					})}
				</Slider>
			</div>
		</div>
	);
}
