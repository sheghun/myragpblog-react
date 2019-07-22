import { createMuiTheme } from "@material-ui/core";
import red from "@material-ui/core/colors/red";

export default createMuiTheme({
	palette: {
		error: red,
		primary: {
			main: "#2d05c5",
		},
		secondary: {
			main: "#fff",
		},
	},
	typography: {
		body1: {
			color: "#5f6368",
			lineHeight: "2em",
		},
		body2: {
			color: "#5f6368",
			fontSize: "16px",
			fontWeight: 400,
			lineHeight: "1.7em",
		},
		fontFamily: "Lato",
		useNextVariants: true,

		h1: {
			color: "#202124",
		},
		h2: {
			color: "#202124",
		},
		h3: {
			color: "#202124",
		},
		h4: {
			color: "#202124",
		},
		h5: {
			color: "#202124",
		},
		h6: {
			color: "#202124",
		},
		overline: {
			fontFamily: "Lato Mono",
			fontWeight: "bold",
		},

	},
});