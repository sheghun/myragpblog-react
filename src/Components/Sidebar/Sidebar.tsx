import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { NavLink, Link } from "react-router-dom";
// core components
import HeaderLinks from "../HeaderDashboard/HeaderLinks.jsx";

import sidebarStyle from "../../assets/jss/material-dashboard-react/components/sidebarStyle.jsx";

const Sidebar = ({ ...props }: any) => {
	// verifies if routeName is the one active (in browser input)
	function activeRoute(routeName: string) {
		return props.location.pathname === routeName ? true : false;
	}
	const { classes, color, logo, image, logoText, routes } = props;

	const sideBarBackground = (image !== undefined ?
		<div className={classes.background} style={{ backgroundImage: "url(" + image + ")" }} />
		: null
	);

	const links = routes.map((prop: any, key: any) => {
		if (prop.redirect) { return null; }
		let activePro = " ";
		let listItemClasses;
		if (prop.path === "/upgrade-to-pro") {
			activePro = classes.activePro + " ";
			listItemClasses = classNames({
				[" " + classes[color]]: true,
			});
		} else {
			listItemClasses = classNames({
				[" " + classes[color]]: activeRoute(prop.path),
			});
		}
		const whiteFontClasses = classNames({
			[" " + classes.whiteFont]: activeRoute(prop.path),
		});
		return (
			<NavLink
				to={prop.path}
				className={activePro + classes.item}
				activeClassName="active"
				key={key}
			>
				<ListItem button={true} className={classes.itemLink + listItemClasses}>
					<ListItemIcon className={classes.itemIcon + whiteFontClasses}>
						{typeof prop.icon === "string" ? <Icon>{prop.icon}</Icon> : <prop.icon style={{ color: "white" }} />}
					</ListItemIcon>
					<ListItemText
						primary={prop.sidebarName}
						className={classes.itemText + whiteFontClasses}
						disableTypography={true}
					/>
				</ListItem>
			</NavLink>
		);
	});

	const brand = (
		<div className={classes.logo}>
			<Link to="/" className={classes.logoLink}>
				<div className={classes.logoImage}>
					{/* <img src={logo} alt="logo" className={classes.img} /> */}
				</div>
				{logoText}
			</Link>
		</div>
	);
	return (
		<div>
			<Hidden mdUp={true} implementation="css">
				<Drawer
					variant="temporary"
					anchor="right"
					open={props.open}
					classes={{ paper: classes.drawerPaper }}
					onClose={props.handleDrawerToggle}
					ModalProps={{ keepMounted: true }}
				>
					<List className={classes.list}>
						{brand}
					</List>
					<div className={classes.sidebarWrapper}>
						{links}
					</div>
					{sideBarBackground}
				</Drawer>
			</Hidden>
			<Hidden smDown={true} implementation="css">
				<Drawer
					anchor="left"
					variant="permanent"
					open={true}
					classes={{ paper: classes.drawerPaper }}
				>
					{brand}
					<div className={classes.sidebarWrapper}>
						{links}
					</div>
					{sideBarBackground}
				</Drawer>
			</Hidden>
		</div>
	);
};

// @ts-ignore
export default withStyles(sidebarStyle)(Sidebar);
