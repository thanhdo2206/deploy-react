import { Box } from '@mui/material';
import React from 'react';
import ProjectHeader from './projectHeader/ProjectHeader';
import ProjectTable from './projectTable/ProjectTable';

export default function ProjectListPage() {
	return (
		<Box sx={{position: 'relative'}}>
			<ProjectHeader/>
			<ProjectTable />
		</Box>
	);
}
