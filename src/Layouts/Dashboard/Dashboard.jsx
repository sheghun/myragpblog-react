/* eslint-disable */

// cSpell: ignore scrollbar segun's accbtn mobilebutton

import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
// @material-ui/core Components
import withStyles from "@material-ui/core/styles/withStyles";
// core Components
import Header from "../../Components/HeaderDashboard/HeaderDashboard";
import Footer from "../../Components/Footer/Footer";
import Sidebar from "../../Components/Sidebar/Sidebar";


import dashboardRoutes from "../../Routes/Dashboard";

import dashboardStyle from "../../assets/jss/material-dashboard-react/layouts/dashboardStyle";
import image from "../../assets/img/sidebar-2.jpg";
import logo from "../../assets/img/reactlogo.png";
import Context from "../../Context";

const switchRoutes = (
	<Switch>
		{dashboardRoutes.map((prop, key) => {
			if (prop.redirect)
				return <Redirect from={prop.path} to={prop.to} key={key} />;
			return <Route path={prop.path} component={prop.component} key={key} />;
		})}
	</Switch>
);

const Dashboard = (props) => {

	const { classes, location, match, ...rest } = props

	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		window.addEventListener("resize", resizeFunction);
		return () => {
			window.removeEventListener("resize", resizeFunction);
		};
	}, [])

	useEffect(() => { }, [])

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const getRoute = () => {
		return props.location.pathname !== "/maps";
	}

	const resizeFunction = () => {
		if (window.innerWidth >= 960) {
			setMobileOpen(false);
		}
	}

	console.log(location)


	return (
		<>
			<div
				className={classes.wrapper}
			>
				<Sidebar
					routes={dashboardRoutes}
					logoText={"My Ragp's Blog"}
					logo={logo}
					image={image}
					handleDrawerToggle={handleDrawerToggle}
					open={mobileOpen}
					color="purple"
					location={location}
					{...rest}
				/>
				<div
					className={classes.mainPanel}
				>
					<Header
						routes={dashboardRoutes}
						color="primary"
						handleDrawerToggle={handleDrawerToggle}
						{...rest}
					/>
					{getRoute() ? (
						<div
							className={classes.content}
						>
							<div
								className={classes.container}
							>
								{dashboardRoutes.map((prop, key) => {
									return <Route exact path={prop.path} component={prop.component} key={key} />;
								})}
							</div>
						</div>
					) : (
							<div className={classes.map}>{switchRoutes}</div>
						)}
				</div>
			</div>
			}
				<Footer />
		</>
	);
}

export default withRouter(withStyles(dashboardStyle)(Dashboard))
