import React from 'react';
import './buttonProjectList.css';

export default function ButtonProjectList(props) {
	const { icon, text, id, value, onClickButton, onMouseEnter, onMouseLeave } =
		props;

	return (
		<>
			<button
				className='project__button--header'
				id={id}
				value={value}
				onClick={onClickButton}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				{icon}
				<span>{text}</span>
			</button>
		</>
	);
}
