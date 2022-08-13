import { styled } from "@mui/material/styles";



export const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: "0px 16px",
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  }));
