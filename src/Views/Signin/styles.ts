import { Theme } from "@material-ui/core/styles";
// Background Image
import backgroundImage from "../../assets/images/bg-signin.jpg";


const useStyles = ((theme: Theme) => ({
	body: {
		backgroundImage: "url(" + backgroundImage + ")",
		filter: "blur(8px)",
		height: "100vh",
		width: "100vw",
		["-webkit-filter"]: "blur(8px)",
	},
	main: {
		display: "block", // Fix IE 11 issue.
		left: "30%",
		position: "absolute",
		top: "0",
		width: "auto",
		[theme.breakpoints.down("sm")]: {
			transform: "translateX(-19%)",
		},
	},
	subMain: {
		display: "block", // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		width: "auto",
		[theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
			marginLeft: "auto",
			marginRight: "auto",
			width: 600,
		},
	},
	errors: {
		color: "red",
		fontSize: "16px",
		fontWeight: 700,
		marginTop: "-20px",
	},
	paper: {
		alignItems: "center",
		display: "flex",
		flexDirection: "column",
		marginTop: theme.spacing.unit * 8,
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit * 2,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
}));

export default useStyles;