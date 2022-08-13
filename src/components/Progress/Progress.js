import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/system';

const styles = {
    container: {
        width: '100%',
        position: 'fixed',
        top: 0,
        right: 0,
        left : 0
    },
    progress: {
        height: '2px',
    }
}
export default function Progress() {
	return (
		<>
			<Box style={styles.container}>
				<LinearProgress style={styles.progress} />
			</Box>
		</>
	);
}
