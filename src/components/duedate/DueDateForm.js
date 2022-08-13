import React, { useState, useRef } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { Box, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';

import './dueDateForm.css';
import { convertDateFromDataBase, showDateInDateInput } from '../../utils/date';
import ButtonProjectList from '../../components/ButtonProjectList/ButtonProjectList';
import { setDateTaskApi } from '../../redux/actions/TaskAction';

export default function DueDateForm(props) {
	const {startDate, dueDate, task,onClosePopover } = props;

	const dispatch = useDispatch();

	const [isFocusDueDate, setIsFocusDueDate] = useState(false);

	const [startDateCalendar, setStartDateCalendar] = useState(
		convertDateFromDataBase(startDate)
	);
	const [dueDateCalendar, setDueDateCalendar] = useState(
		convertDateFromDataBase(dueDate)
	);

	const handleClickStartDate = () => {
		setIsFocusDueDate(false);
	};

	const handleClickDueDate = () => {
		setIsFocusDueDate(true);
	};

	const handleChangeDueDate = value => {
		const newDueDate = showDateInDateInput(value.toString().slice(0, 15));

		if (!isFocusDueDate) {
			setStartDateCalendar(newDueDate);
			setIsFocusDueDate(true);
			return;
		}

		setDueDateCalendar(newDueDate);
		setIsFocusDueDate(false);
	};

	const handleClickClearAll = () => {
		setStartDateCalendar('');
		setDueDateCalendar('');
	};

	const handleSubmitDate = () => {
		let taskUpdate = {
			...task,
			startDate: startDateCalendar,
			dueDate: dueDateCalendar,
		};

		if (!dueDateCalendar) {
			taskUpdate = {
				...task,
				startDate: '',
				dueDate: startDateCalendar,
			};
		}

		dispatch(setDateTaskApi(taskUpdate));
		onClosePopover();
	};

	

	return (
		<Box className='dueDate__block'>
			<Box className='header__block--input'>
				<TextField
					onClick={handleClickStartDate}
					placeholder={'Start date'}
					className='header__input'
					value={startDateCalendar}
					InputProps={{
						readOnly: true,
					}}
					inputRef={input => {
						if (isFocusDueDate) {
							return input && input.focus();
						}
						return '';
					}}
				/>
				<TextField
					onClick={handleClickDueDate}
					placeholder={'Due date'}
					className='header__input'
					value={dueDateCalendar}
					InputProps={{
						readOnly: true,
					}}
					inputRef={input => {
						if (!isFocusDueDate) {
							return input && input.focus();
						}
						return '';
					}}
				/>
			</Box>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<CalendarPicker onChange={handleChangeDueDate} />
			</LocalizationProvider>
			<Box className='footer__block'>
				<ButtonProjectList
					text='Clear'
					id='footer__button--clearAll'
					onClickButton={handleClickClearAll}
				/>
				<ButtonProjectList
					text='Submit'
					id='footer__button--submit'
					onClickButton={handleSubmitDate}
				/>
			</Box>
		</Box>
	);
}
