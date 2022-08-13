import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { TooltipCustomize } from '../../components/ToolTip/ToolTip';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

import {
	MODAL_ACTION_CLOSE,
	MODAL_ACTION_CONFIRM,
} from '../../constants/constants';
import { useSelector, useDispatch } from 'react-redux';
import { archiveSectionApi } from '../../redux/actions/SectionAction';

export default function MoreOptionSection(props) {
	const { section, renameSection, setAddFormSectionLeft, setAddFormSectionRight } =
		props;
	const dispatch = useDispatch();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleOpenMore = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMore = () => {
		setAnchorEl(null);
	};

	const [isShowModalArchive, setShowModalArchive] = useState(false);

	const toggleModal = () => {
		handleCloseMore();
		setShowModalArchive(!isShowModalArchive);
	};

	const onModalArchiveSection = type => {
		if (type === MODAL_ACTION_CONFIRM) {
			dispatch(archiveSectionApi(section._id));
		}

		toggleModal();
	};

	const renameTitleSection = () => {
		handleCloseMore();
		renameSection();
	};

	const addFormSectionRightLeft = checkLeftRight => {
		handleCloseMore();
		if (checkLeftRight) {
			setAddFormSectionLeft();
			return;
		}

		setAddFormSectionRight();
	};

	return (
		<Box>
			<TooltipCustomize title='More actions' placement='bottom'>
				<MoreHorizIcon
					className='btnOption'
					onClick={handleOpenMore}
					aria-controls={open ? 'menuOption__section' : undefined}
					aria-haspopup='true'
					aria-expanded={open ? 'true' : undefined}
				/>
			</TooltipCustomize>

			<Menu
				id='menuOption__section'
				anchorEl={anchorEl}
				open={open}
				onClose={handleCloseMore}
			>
				<MenuItem className='menu__option-item' onClick={renameTitleSection}>
					<CreateOutlinedIcon className='icon__option' />
					Rename Section
				</MenuItem>

				<MenuItem
					className='menu__option-item'
					onClick={() => {
						addFormSectionRightLeft(true);
					}}
				>
					<ArrowBackOutlinedIcon className='icon__option' />
					Add section to left
				</MenuItem>
				<MenuItem
					className='menu__option-item'
					onClick={() => {
						addFormSectionRightLeft(false);
					}}
				>
					<ArrowForwardOutlinedIcon className='icon__option' />
					Add section to right
				</MenuItem>
				<MenuItem
					className='menu__option-item delete__section-task'
					onClick={toggleModal}
				>
					<Inventory2OutlinedIcon className='icon__option' />
					Archive Section
				</MenuItem>
			</Menu>

			<ConfirmModal
				show={isShowModalArchive}
				title='Archive this section'
				content={
					<span>
						Are you sure you want to archive this section <b>{section.sectionName}</b>
						?
					</span>
				}
				onAction={onModalArchiveSection}
				nameBtnConfirm='Archive section'
			/>
		</Box>
	);
}
