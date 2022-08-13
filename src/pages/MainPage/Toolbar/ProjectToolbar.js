import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './ProjectToolbar.css';

export default function ProjectToolbar(props) {
	const currentProject = useSelector(
		state => state.ProjectReducer.currentProject
	);

	return (
		<div className='nav__bar--container'>
			<h2 className='title__nav'>{currentProject.projectName}</h2>
			<ul className='nav__bar-project'>
				<li className='nav-item '>
					<NavLink
						className='nav__link-project line '
						to={`/main-page/${currentProject._id}/list`}
					>
						<span>List</span>
					</NavLink>
				</li>
				<li className='nav-item '>
					<NavLink
						className='nav__link-project line'
						to={`/main-page/${currentProject._id}/board`}
					>
						<span>Board</span>
					</NavLink>
				</li>
			</ul>
		</div>
	);
}
