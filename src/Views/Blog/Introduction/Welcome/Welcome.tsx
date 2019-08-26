// @material-ui components
import { StyleRulesCallback } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useContext } from "react";
// react-router-dom
import { Link, withRouter } from "react-router-dom";

// Styles
import { makeStyles } from "@material-ui/styles";
import { faintColor } from "../../../../baseStyles";
import { BlogContext } from "../../../../Context";

const useStyles = makeStyles<StyleRulesCallback>((theme) => ({
	breadCrumbsSeparator: {
		display: "inline-block",
		marginLeft: "1rem",
		marginRight: "1rem",
	},
	breadCrumbsText: {
		"&:hover": {
			color: "rgba(0, 0, 0, 0.3)",
		},
		"color": "rgba(0, 0, 0, 0.7)",
		"fontSize": "12px",
		"fontWeight": "700" as any,
		"letterSpacing": "1px",
		"textDecoration": "none",
	},
	breadCrumbsTextActive: {
		color: "rgba(0, 0, 0, 0.3)",
		fontSize: "12px",
		fontWeight: "700" as any,
		letterSpacing: "1px",
		textDecoration: "none",
	},
	breadcrumbs: {
		marginLeft: "32px",
		marginTop: "30px",
	},
	pagination: {
		display: "flex",
	},
	video: {
		maxWidth: "560px",
		width: "100%",
	},
}));

const Welcome: React.FC<any> = (props) => {
	const classes = useStyles();
	const { username } = useContext(BlogContext);

	return (
		<>
			<div
				className={classes.breadcrumbs}
			>
				<Typography variant="overline">
					<Link to={`/${username}/welcome-note`} className={classes.breadCrumbsText}>Introduction
						<span className={classes.breadCrumbsSeparator}>/</span>
					</Link>
					<Link
						to={`/${username}/welcome-note`}
						className={[classes.breadCrumbsTextActive].join(" ")}
					>
						Welcome Note
					</Link>
				</Typography>
			</div>
			<h1>Introduction</h1>
			{/*
				<iframe
					title="Introduction"
					className={classes.video}
					height="315"
					src="https:www.youtube.com/embed/zo-MIQR9x60"
					frameborder="0" allow="accelerometer; autoplay;
					encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				/>
			*/}
			{/* <Typography variant="caption"><em>A short video on the introduction</em></Typography> */}
			<br /><br />
			<Typography variant="body2" style={{ color: faintColor }}>
				Welcome to My Ragp Blog an information center designed and intended to furnish you with complete, relevant and essential information on the <strong>RAGP</strong> business opportunity & program so that you can make the informed decision to immediately start, launch and grow yourn own multi-million naira ragp business!
				<br /><br />
				RAGP is a very simple, powerful and super lucrative business that has already empowered thousands of nigerians to start, launch & grow their own telecom VTU vending business that pays them &#8358;10k, &#8358;20k, &#8358;30k, &#8358;50k and even &#8358;100k daily and they each started with &#8358;5k to &#8358;100k we believe you can do even better & hereby provide you with all the the info, tools & guidelines you need to do so, welcome to planet ragp; the land of cash-flow millionaires.
		 	</Typography>
			<br /><br />
			<Typography variant="h6">
				Shall we get started
		 </Typography>
			<Typography>
				<Link to={`/${username}/why-ragp`}>
					<Typography className={classes.nextButton}>
						Why Ragp    <ArrowForwardIcon style={{ marginBottom: "-0.35rem" }} />
					</Typography>
				</Link>
				<Typography>
					Or
				</Typography>
				<Typography>
					Click this icon <MenuIcon style={{ marginBottom: "-0.35rem" }} /> at the header to jump to a section
				</Typography>
			</Typography>
		</>
	);
};

export default withRouter(Welcome);
