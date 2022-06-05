import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.1),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.35),
	},

	marginLeft: 0,
	height: "40px",
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		borderRadius: theme.shape.borderRadius,
		"&:focus": {
			backgroundColor: alpha(theme.palette.common.white, 0.35),
			borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.75)}`,
		},
	},
}));

export const AddButton = styled("button")(({ theme }) => ({
	position: "absolute",
	right: 10,
	border: "none",
	background: "inherit",
	color: "white",
	cursor: "pointer",
}));
