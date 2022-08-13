import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';


export const TooltipCustomize = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));
