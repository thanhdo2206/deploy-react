import React from 'react';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link as LinkRoute } from 'react-router-dom';
import ButtonGetStarted from './ButtonGetStarted';
import './workSection.css';

const styles = {
	linkLogin: {
		textDecoration: 'none',
	},
};

export default function WorkContent() {
	const [checked, setChecked] = React.useState(true);

	const handleChangeCbWork = event => {
		setChecked(event.target.checked);
	};

	return (
		<>
			<Container maxWidth='lg' sx={{ mb: '200px' }}>
				<Grid container>
					<Grid
						item
						xs={5}
						sx={{
							mt: '120px',
						}}
					>
						<p className='work__title'>Work on big ideas,</p>
						<p className='work__title' id='work__title--bottom'>
							without the busywork.
						</p>
						<p className='work__content'>
							From the small stuff to the big picture, Asana organizes work so teams
							know what to do, why it matters, and how to get it done.
						</p>
						<Grid>
							<LinkRoute to='/sign-up' style={styles.linkLogin}>
								<ButtonGetStarted />
							</LinkRoute>
						</Grid>
					</Grid>
					<Grid item xs={7} sx={{ mt: '120px', position: 'relative' }}>
						<div className='work__img--group'>
							<div className='work__img--item' id='work__img--item1'>
								<img src='/assets/images/IntroPage/img-webIntro-1.jpg' alt='#' />
							</div>
							<div className='work__img--item' id='work__img--item2'>
								<img src='/assets/images/IntroPage/img-webIntro-2.jpg' alt='#' />
							</div>
						</div>
						<div
							className='work__checkbox'
							style={{ display: checked ? 'block' : 'none' }}
						>
							<Checkbox
								checked={checked}
								onChange={handleChangeCbWork}
								label='CheckCircleOutlineIcon'
								icon={<RadioButtonUncheckedIcon />}
								checkedIcon={<CheckCircleOutlineIcon sx={{ color: '#727272' }} />}
								inputProps={{ 'aria-label': 'controlled' }}
								sx={{ zIndex: '2' }}
							/>
							<span>Collect creative feedback</span>
						</div>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
