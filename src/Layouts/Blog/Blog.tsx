// cSpell:ignore Ragp Oladiran Segun Referal godwin Whatsapp

// 'Material-ui Components
import { StyleRulesCallback, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import React, { Component, useEffect, useMemo, useState } from "react";
"react";

// Personal Components
// For lazy loading
import loadable from "@loadable/component";
import Avatar from "../../Components/Avatar/Avatar";

// react-router dependencies
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import BlogHeader from "../../Components/BlogHeader/BlogHeader";
import Spinner from "../../Components/Spinner/Spinner";
import Axios from "axios";

// react-router dependencies

// Pages
const Welcome = loadable(() => import("../../Views/Blog/Introduction/Welcome/Welcome"), {
	fallback: <Spinner />,
});
const WhyIs = loadable(() => import("../../Views/Blog/Introduction/Whyis/Whyis"), {
	fallback: <Spinner />,
});
const CompanyProfile = loadable(() => import("../../Views/Blog/Introduction/Company/Company"), {
	fallback: <Spinner />,
});
const CompensationPlan = loadable(() => import("../../Views/Blog/How/Compensation/Compensation"), {
	fallback: <Spinner />,
});

const useStyles = makeStyles<StyleRulesCallback>((theme: Theme) => ({
	avatar: {
		alignItems: "center",
		display: "flex",
		marginLeft: "-2.2rem",
		marginRight: "2rem",
	},
	blog: {
		margin: "64px auto 0",
		maxWidth: "392px",
	},
	captions: {
		alignItems: "center",
		display: "flex",
		justifyContent: "space-between",
		marginBottom: "-.5rem",
		width: "200px",
	},
	captionsWrapper: {
		marginLeft: "1rem",
	},
	hero: {
		// display: 'flex',
		// justifyContent: 'space-between'
	},
	heroNumber: {
		marginTop: "-1.5rem",
	},
	heroText: {
		fontSize: "10px",
	},
	nextButton: {
		textDecoration: "underline",
	},
	[theme.breakpoints.up("md")]: {
		blog: {
			maxWidth: "840px",
			paddingLeft: "40px",
			paddingRight: "40px",
		},
	},
}));

const Blog = ({ match }: RouteComponentProps) => {

	const classes = useStyles();

	const { username } = match.params as any;
	const [userDetails, setUserDetails] = useState({
		image: "",
		name: "",
		referalId: "",
		whatsappNumber: "",
	});

	useEffect(() => {
		(async () => {
			try {
				const res = Axios.get(`/blog/${username}`);
			} catch (error) {

			}
		})();
	}, []);

	if (!localStorage.getItem("usernae")) {
		localStorage.setItem("username", username);
	}

	const routes = useMemo(() => (
		[
			{ path: `/${username}/welcome-note`, component: Welcome },
			{ path: `/${username}/why-ragp`, component: WhyIs },
			{ path: `/${username}/the-compensation-plan`, component: CompensationPlan },
			{ path: `/${username}/company-profile`, component: CompanyProfile },
		]
	), []);
	return (
		// @ts-ignore
		<BlogHeader
			routes={routes}
		>
			<div className={classes.blog}>
				<article className={classes.articleIntro}>
					<div className={classes.hero}>
						<div className={classes.heroIntro}>
							<Typography variant="overline">
								Ragp blog
                                    </Typography>
						</div>
						<div className={classes.avatar}>
							<Avatar
								src={`/assets/images/UR52f4XXovuRDWH8sHHrJb3TD6WohPzI8NQvDOqa.jpeg`}
								size={100}
							/>
							<div className={classes.captionsWrapper}>
								<div className={classes.captions}>
									<Typography variant="caption">Name: </Typography>
									<Typography variant="overline">Oladiran Segun</Typography>
								</div>
								<div className={classes.captions}>
									<Typography variant="caption">Referal ID: </Typography>
									<Typography variant="overline">godwin01</Typography>
								</div>
								<div className={classes.captions}>
									<Typography variant="caption">Whatsapp: </Typography>
									<Typography variant="overline">08143112637</Typography>
								</div>
								<div />
							</div>
						</div>
					</div>
				</article>
				<Switch>
					{routes.map((route, index) =>
						<Route path={route.path} key={index} component={route.component} />,
					)}
				</Switch>
			</div>
		</BlogHeader>
	);
};

export default Blog;
