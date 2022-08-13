import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';


const styles = {
	icon: {
		fontSize: '15px',
	},
};

export default function MenuStatus(props) {
	const { status, menu, onClickPriorityItem } = props;

	return (
		<>
				<Box className='dropItem__block--hidden'>
					{menu.map((value, index) => {
						return (
							<Box
								container
								className='dropItem__block'
								onClick={() => onClickPriorityItem(value.text)}
								key={index}
							>
								{index === status ? (
									<CheckIcon style={{ ...styles.icon, marginLeft: '10px' }} />
								) : (
									<HorizontalRuleIcon style={{ ...styles.icon, marginLeft: '10px' }} />
								)}
								<Typography className={`${value.nameClass}`}>{value.text}</Typography>
							</Box>
						);
					})}
				</Box>
		</>
	);
}
