import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Checkbox, Grid, Typography } from '@mui/material';
import ButtonProjectList from '../../../components/ButtonProjectList/ButtonProjectList';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Drawer from '@mui/material/Drawer';
import TaskDetail from '../TaskDetail/TaskDetail';
import PriorityBox from '../PriorityBox';
import DragIndicatorSharpIcon from '@mui/icons-material/DragIndicatorSharp';
import AvatarAssignee from '../../../components/assignee/AvatarAssignee';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { showDate } from '../../../utils/date';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { TooltipCustomize } from '../../../components/ToolTip/ToolTip';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import { archiveTaskApi } from '../../../redux/actions/TaskAction';


const styles = {
	task: {
		border: '1px solid #CFCBCB',
		borderLeft: 'none',
		borderBottom: 'none',
		fontSize: '14px',
	},
	icon: {
		fontSize: '15px',
	},
	menu: {
		display: 'flex',
		justifyContent: 'space',
	},
};
export default function ProjectTaskArchive() {
	const dispatch = useDispatch();

	const sections = useSelector(state => state.SectionReducer.arrSections);

	const tasks = useSelector(state => state.TaskReducer.arrTask);
	// console.log(tasks);

	const arrTaskArchive = tasks.length
		? tasks.filter(task => task.archivedTask)
		: [];
	// console.log(arrTaskArchive);

	//mảng các task archive thuộc section ko archive
	const arrTaskArchiveInSectionUnarchive = [];

	for (let i = 0; i < arrTaskArchive.length; i++) {
		const section = sections.find(
			section => section._id === arrTaskArchive[i].sectionId
		);
		if (!section.archived) {
			arrTaskArchiveInSectionUnarchive.push(arrTaskArchive[i]);
		}
	}

	const unarchiveTask = (task)=>{
		dispatch(archiveTaskApi(task));
	}

	

	const render = () => {
		

		if (arrTaskArchiveInSectionUnarchive.length > 0) {
			return arrTaskArchiveInSectionUnarchive.map((task, index) => {
				const {
					_id,
					taskStatus,
					taskName,
					assigneTo,
					startDate,
					dueDate,
					createdBy,
					priorityValue,
				} = task;

				const valueStartDate = startDate !== null ? startDate : '';
				const valueDueDate = dueDate !== null ? dueDate : '';
				return (
					<>
						<Grid key={_id} container className='taskName__container'>
							{/* name task */}
							<Grid item xs={4} style={styles.task} className='taskName__block'>
								<Box className='taskName__block--input'>
									<Box className='row-drag-handle'>
										<ButtonProjectList
											icon={<DragIndicatorSharpIcon style={styles.icon} />}
											id='title__icon--hover'
										/>
									</Box>
									<Checkbox
										label='CheckCircleOutlineIcon'
										icon={<CheckCircleOutlineIcon sx={{ width: '18px' }} />}
										checkedIcon={
											<CheckCircleIcon sx={{ color: '#008000', width: '18px' }} />
										}
										inputProps={{ 'aria-label': 'controlled' }}
										sx={{
											zIndex: '2',
											'&:hover': { color: '#008000 !important' },
											px: 0,
											py: 0,
											mr: 1,
										}}
										checked={taskStatus}
									/>

									<span>{taskName}</span>
									<Box className='css__focus'></Box>
								</Box>

								<Box
									className='taskName__button--viewDetails'
									onClick={() => {
										unarchiveTask(task);
									}}
								>
									<TooltipCustomize title='Unarchive Task' placement='bottom'>
										<UnarchiveOutlinedIcon className='' sx={{ fontSize: '20px' }} />
									</TooltipCustomize>
								</Box>
							</Grid>

							{/* asginee */}
							<Grid
								item
								xs={2}
								style={{ ...styles.task }}
								className='dropMenu--assignee'
							>
								{/* <AssigneeBox username={username} task={task} /> */}
								{assigneTo !== null ? (
									<Box className='assignee__box--show'>
										<AvatarAssignee assignee={assigneTo.username} />
										<Typography className='assignee__typo--show'>
											{assigneTo.username}
										</Typography>
									</Box>
								) : (
									<>
										<Box className='AssigneeBox__box--show'>
											<PermIdentityIcon className='AssigneeBox__icon' />
											<Typography className='AssigneeBox__typo' sx={{ fontSize: '11px' }}>
												No assignee
											</Typography>
										</Box>
									</>
								)}
							</Grid>

							{/* due date */}
							<Grid
								item
								xs={2}
								align='right'
								style={styles.task}
								className='dueDate__calendar'
							>
								{valueStartDate || valueDueDate ? (
									<Typography className='dueDate__typography--show'>
										{showDate(valueStartDate, valueDueDate)}
									</Typography>
								) : (
									<Box className='DueDateBox__box'>
										<CalendarTodayIcon className='DueDateBox__icon' />
										<Typography className='DueDateBox__typo'>No due date</Typography>
									</Box>
								)}
							</Grid>

							{/* create by */}
							<Grid
								item
								xs={2}
								align='right'
								style={{ ...styles.task, padding: '10px' }}
							>
								{createdBy ? createdBy.username : ''}
							</Grid>

							<Grid
								item
								xs={2}
								style={{ ...styles.task, borderRight: 'none' }}
								className='dropMenu--priority'
							>
								<PriorityBox priorityValue={priorityValue} task={task} />
							</Grid>
						</Grid>
						
					</>
				);
			});
		}
	};

	return <Box className='thanh do'>{render()}</Box>;
}
