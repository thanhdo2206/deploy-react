import React, { useState, useRef, useEffect } from 'react';
import { List, ListItem } from '@mui/material';
import Box from '@mui/material/Box';
import { TooltipCustomize } from '../../components/ToolTip/ToolTip';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function FormNewTask(props) {
	const { isDisplayFormAddTask, handleBlur } = props;

	const [nameTask, setnameTask] = useState('');

	const inputNameTaskRef = useRef(null);

	const handleTNameTaskChange = e => {
		const { value } = e.target;
		setnameTask(value);
	};

	useEffect(() => {
		if (isDisplayFormAddTask && inputNameTaskRef && inputNameTaskRef.current) {
			inputNameTaskRef.current.focus();
		}
	}, [isDisplayFormAddTask]);

	const handleEnter = event => {
		if (event.keyCode == 13) {
			event.target.blur();
		}
	};

	return (
		<Box display={isDisplayFormAddTask ? 'block' : 'none'}>
			<ListItem className='task__item task__newItem'>
				<Box className='board__card-title'>
					<Box className='board__card-title--form'>
						{/* <CheckCircleOutlineIcon className='icon__checkCircle' /> */}

						<TextareaAutosize
							maxRows={5}
							className='task__name-input'
							type='text'
							placeholder='Write a task name'
							ref={inputNameTaskRef}
							value={nameTask}
							onChange={handleTNameTaskChange}
							onBlur={event => {
								handleBlur(nameTask);
								setnameTask('');
							}}
							onKeyDown={handleEnter}
						/>
					</Box>
				</Box>

				{/* <Box>
					<TooltipCustomize title='Assign task' placement='bottom'>
						<PersonOutlineOutlinedIcon className='icon__assign__date' />
					</TooltipCustomize>

					<TooltipCustomize title='Add due date' placement='bottom'>
						<CalendarTodayOutlinedIcon className='icon__assign__date' />
					</TooltipCustomize>
				</Box> */}
			</ListItem>
		</Box>
	);
}
