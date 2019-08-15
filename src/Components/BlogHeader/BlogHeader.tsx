// cSpell:ignore  MRPI to\'s

import AppBar from "@material-ui/core/AppBar";
import Collapse from "@material-ui/core/Collapse";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useEffect, useState } from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import styles from "./styles";

interface ICollapse {
	[key: number]: boolean;
}

interface IProps extends RouteComponentProps {
	children: JSX.Element;
	classes: any;
	routes: IRoute[];
}

interface IRoute { path: string; component: React.Component; }

const posts = [
	{
		posts: [
			{ title: "Welcome Note", url: "welcome-note" },
			{ title: "Why RAGP", url: "why-ragp" },
			{ title: "Company Profile", url: "company-profile" },
		],
		title: "Introduction",
	},
	{
		posts: [
			{ title: "The business model", url: "the-business-model" },
			{ title: "The compensation plan", url: "the-compensation-plan" },
			{ title: "Massive residual passive income (MRPI)", url: "massive-residual-income" },
		],
		title: "How does it work?",
	},
	{
		posts: [
			{ title: "", url: "" },
		],
		title: "How to's",
	},
];

const BlogHeader = (props: IProps) => {

	const { classes, routes, location } = props;
	// Initialize the current route to be the first route
	const [currentRoute, setCurrentRoute] = useState(routes[0]) as [IRoute, React.Dispatch<React.SetStateAction<IRoute>>];

	const [mobileOpen, setMobileOpen] = useState(false);
	const [slide, setSlide] = useState(true);
	const [collapse, setCollapse] = useState({ 0: false }) as unknown as [ICollapse, React.Dispatch<React.SetStateAction<ICollapse>>];

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});

	useEffect(() => {
		const route = routes.find((r) => r.path === location.pathname);
		setCurrentRoute(route as IRoute);
		// Get the post index
		const index = posts.findIndex((post) => post.posts.some((p) => `/${username}/${p.url}` === location.pathname));
		// Open the current post link
		setCollapse((c) => ({ ...c, [index]: true }));
	}, [location.pathname]);

	const handleScroll = () => {
		if (window.pageYOffset > 200) { return setSlide(false); }
		setSlide(true);
	};

	const handleDrawerToggle = () => {
		setMobileOpen((open) => !open ? true : false);
	};

	const collapseMenu = (_: React.MouseEvent<HTMLElement, MouseEvent>, index: number) => {
		setCollapse((c) => ({ ...c, [index]: !c[index] }));
	};

	const username = localStorage.getItem("username");

	const drawer = (
		<>
			<div className={classes.toolbar} />

			<p className={classes.sideBarLogoText}>My ragp's blog</p>

			<Divider />

			<div style={{ marginTop: "24px" }} />

			<List>
				<ListItem>
					<ListItemText
						primaryTypographyProps={{
							style: {
								color: "#202124",
								fontSize: "18px",
							},
							variant: "subtitle1",
						}}
						primary={"BLOG SYSTEM"}
						secondary={
							<>
								{posts.map((post, index) => (
									<List style={{ marginLeft: "-16px" }} key={index}>
										<ListItem
											button={true}
											onClick={(event) => collapseMenu(event, index)}
										>
											<ListItemText
												primary={post.title}
												// @ts-ignore
												primaryTypographyProps={{
													className: classes.sidebarMainLink,
													variant: "subtitle2",
												}}
											/>

										</ListItem>
										<Collapse in={collapse[index]} timeout="auto" unmountOnExit={true}>
											<List component="ul">
												{post.posts.map((p, key) => (
													<ListItem
														key={key}
														button={true}
														className={classes.nested}
													>
														<ListItemText
															primary={
																<NavLink
																	to={`/${username}/${p.url}`}
																	className={classes.sidebarLink}
																	activeClassName={classes.sidebarActiveLink}
																	isActive={() => {

																		return `/${username}/${p.url}` === location.pathname;
																	}}
																	onClick={handleDrawerToggle}
																	style={{
																		textDecoration: "none",
																	}}
																>
																	{p.title}
																</NavLink>
															}
															primaryTypographyProps={{
																variant: "subtitle2",
															}}
														/>
													</ListItem>
												))}
											</List>
										</Collapse>
									</List>
								))}
							</>
						}
					/>
				</ListItem>

				<Divider />

				<ListItem>
					<ListItemText
						primaryTypographyProps={{
							style: {
								color: "#202124",
								fontSize: "18px",
								textTransform: "uppercase",
							},
							variant: "subtitle1",
						}}
						primary={"testimonies"}
					/>
				</ListItem>

				<Divider />

				<ListItem>
					<ListItemText
						primaryTypographyProps={{
							style: {
								color: "#202124",
								fontSize: "18px",
								textTransform: "uppercase",
							},
							variant: "subtitle1",
						}}
						primary={"videos"}
					/>
				</ListItem>
			</List>
		</>
	);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Slide timeout={1000} direction="down" in={slide}>
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar className={classes.toolbar}>
						<div className={classes.logo}>
							<IconButton
								color="inherit"
								aria-label="Open drawer"
								onClick={handleDrawerToggle}
								className={classes.menuButton}
							>
								<MenuIcon />
							</IconButton>
							<span className={classes.logoText}>My ragp's blog</span>
						</div>
						<div className={classes.navLinks}>
							<Typography variant="h6">
								<NavLink
									activeClassName={classes.navLinkActive}
									isActive={() => true}
									className={classes.navLink}
									to={"/" + username}
								>
									Blog
								</NavLink>
							</Typography>
							<Typography variant="h6">
								<NavLink className={classes.navLink} to={"/" + username + "/testimonies"}>Testimonies</NavLink>
							</Typography>
							<Typography variant="h6">
								<NavLink className={classes.navLink} to={"/" + username + "/videos"}>Videos</NavLink>
							</Typography>
						</div>
					</Toolbar>
				</AppBar>
			</Slide>
			<nav className={classes.drawer}>
				<Hidden lgUp={true} implementation="css">
					<Drawer
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden mdDown={true} implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open={true}
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbarPadding} />
				<>
					{props.children}
				</>
			</main>
		</div>
	);
};
//  @ts-ignore
export default withRouter(withStyles(styles)(BlogHeader));
