import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';

export default function FormNewSection(props) {
	const { isDisplayFormAddSection, handleSubmit, handleBlur } = props;

	const inputAddSectionRef = useRef(null);

	const formAddSectionRef = useRef(null);

	useEffect(() => {
		if (
			isDisplayFormAddSection &&
			inputAddSectionRef &&
			inputAddSectionRef.current
		) {
			inputAddSectionRef.current.focus();
		}
	}, [isDisplayFormAddSection]);

	const [nameSection, setNameSection] = useState('');

	const getNameSection = e => {
		const { value } = e.target;
		setNameSection(value);
	};

	return (
		<Box
			component='form'
			className='form__add-section section__column-item'
			onSubmit={event => {
				handleSubmit(event, nameSection);
				setNameSection('');
			}}
			display={isDisplayFormAddSection ? 'block' : 'none'}
			ref={formAddSectionRef}
		>
			<input
				type='text'
				className='input__add-section'
				placeholder='New Section'
				autoFocus
				onChange={getNameSection}
				onBlur={event => {
					handleBlur(nameSection);
					setNameSection('');
				}}
				name='nameSection'
				value={nameSection}
				ref={inputAddSectionRef}
			/>
			<Box component='div' className='list__task-container'></Box>
		</Box>
	);
}
