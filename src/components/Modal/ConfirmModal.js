import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
	MODAL_ACTION_CLOSE,
	MODAL_ACTION_CONFIRM,
} from '../../constants/constants';

const styles = {
	boxContainer: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		minWidth: '38vw',
		bgcolor: 'background.paper',
		borderRadius: '10px',
		boxShadow: 24,
	},

	titleModal: {
		borderBottom: '0.2px solid #89858261',
		padding: '20px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	btnClose: {
		color: '#6d6e6f',
		marginLeft: '2px',
		cursor: 'pointer',
		padding: '4px',
		'&:hover': {
			color: 'black',
			backgroundColor: 'rgba(55, 23, 23, 0.03)',
		},
	},

	boxContent: {
		padding: '20px',
		borderBottom: '0.2px solid #89858261',
	},

	boxFooter: {
		padding: '20px',
		float: 'right',
	},

	btnCancel: {
		color: 'black',
		borderColor: '#ccc',
		marginRight: '6px',
		textTransform: 'capitalize',
		borderRadius: '5px',
		'&:hover': {
			borderColor: '#afafaf',
			backgroundColor: '#ddd',
		},
	},

	btnConfirm: {
		textTransform: 'capitalize',
		backgroundColor: '#de5f73',
		borderColor: '#de5f73',
		'&:hover': {
			backgroundColor: '#d84f67',
			borderColor: '#d84f67',
		},
	},
};

export default function ConfirmModal(props) {
	const { title, content, nameBtnConfirm , show, onAction,} = props;

	return (
		<div>
			<Modal
				open={show}
				onClose={() => {
					onAction(MODAL_ACTION_CLOSE);	
				}}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={styles.boxContainer}>
					<Box sx={styles.titleModal}>
						<Typography id='modal-modal-title' variant='h6' component='h2'>
							{title}
						</Typography>
						<CloseOutlinedIcon
							onClick={() => {
								onAction(MODAL_ACTION_CLOSE);
							}}
							className='btnOption__section'
						/>
					</Box>

					<Box sx={styles.boxContent}>{content}</Box>

					<Box sx={styles.boxFooter}>
						<Button
							variant='outlined'
							onClick={() => {
								onAction(MODAL_ACTION_CLOSE);
							}}
							sx={styles.btnCancel}
						>
							Cancel
						</Button>
						<Button
							variant='contained'
							sx={styles.btnConfirm}
							onClick={() => {
								onAction(MODAL_ACTION_CONFIRM);
							}}
						>
							{nameBtnConfirm}
						</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
