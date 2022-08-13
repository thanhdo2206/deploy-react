import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { TooltipCustomize } from '../../components/ToolTip/ToolTip';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import DueDateForm from '../../components/duedate/DueDateForm';
import { showDate } from '../../utils/date';
import Popover from '@mui/material/Popover';

export default function BoxDueDate(props) {
	const { task } = props;

	const { startDate, dueDate } = task;
	const valueStartDate = startDate !== null ? startDate : '';
	const valueDueDate = dueDate !== null ? dueDate : '';

	const [anchorEl, setAnchorEl] = useState(null);

	const handleOpenPopover = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClosePopover = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<Box>
			<Box
				aria-describedby='dueDate__box'
				variant='contained'
				onClick={handleOpenPopover}
			>
				<TooltipCustomize title='Add due date' placement='bottom'>
					<Box sx={{ display: 'flex' }}>
						{valueStartDate || valueDueDate ? (
							<Typography className='dueDate__value'>
								{showDate(startDate, dueDate)}
							</Typography>
						) : (
							<CalendarTodayOutlinedIcon className='icon__assign__date' />
						)}
					</Box>
				</TooltipCustomize>
			</Box>

			<Popover
				id={open ? 'dueDate__box' : undefined}
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
				<Box className='dueDate__board'>
					<DueDateForm
						startDate={valueStartDate}
						dueDate={valueDueDate}
						task={task}
						onClosePopover={handleClosePopover}
					/>
				</Box>
			</Popover>
		</Box>
	);
}
