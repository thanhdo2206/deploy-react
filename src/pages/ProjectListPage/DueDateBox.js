import { Box, Popover, Typography } from '@mui/material';
import React, { useState } from 'react';
import { showDate } from '../../utils/date';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DueDateForm from '../../components/duedate/DueDateForm';

export default function DueDateBox(props) {
	const { splitStartDate, splitDueDate, task } = props;
	const [anchorEl, setAnchorEl] = useState(null);

	const handleOpenPopover = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClosePopover = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<>
			<Box onClick={handleOpenPopover} className='dueDate__block--show'>
				{splitStartDate || splitDueDate ? (
					<Typography className='dueDate__typography--show'>
						{showDate(splitStartDate, splitDueDate)}
					</Typography>
				) : (
					<Box className='DueDateBox__box'>
						<CalendarTodayIcon className='DueDateBox__icon' />
						<Typography className='DueDateBox__typo'>
							No due date
						</Typography>
					</Box>
				)}
			</Box>
			<Popover
				id={open ? 'assignTask__box' : undefined}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClosePopover}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
			>
				<DueDateForm
					startDate={splitStartDate}
					dueDate={splitDueDate}
					task={task}
					onClosePopover={handleClosePopover}
				/>
			</Popover>
		</>
	);
}
