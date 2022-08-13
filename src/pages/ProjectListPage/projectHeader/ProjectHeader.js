import React from 'react';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';

import './projectHeader.css';
import ButtonProjectList from '../../../components/ButtonProjectList/ButtonProjectList';
import FilterMenu from './FilterMenu';
import FilterStatus from './FilterStatus';

const styles ={
	filterBar: {
		position: 'fixed',
		top: '84px',
		right: '0',
		zIndex: '5',
		background: '#fff',
		padding: '5px 0'
	}
}
export default function ProjectHeader() {
	return (
		<>
			<Grid container sx={styles.filterBar}>
				<Grid item xs={8}></Grid>
				<Grid item xs={2} sx={{ position: 'relative' }}>
					<FilterStatus />
				</Grid>
				<Grid>
					<FilterMenu />
				</Grid>
			</Grid>
		</>
	);
}
