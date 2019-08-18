/* eslint-disable */

// cSpell: ignore scrollbar segun's accbtn mobilebutton

// @material-ui/core Components
import withStyles from "@material-ui/core/styles/withStyles";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
// core Components
import Header from "../../Components/HeaderDashboard/HeaderDashboard";
import Sidebar from "../../Components/Sidebar/Sidebar";

import dashboardRoutes from "../../Routes/Dashboard";

import Axios, { AxiosError } from "axios";
import logo from "../../assets/img/reactlogo.png";
import image from "../../assets/img/sidebar-2.jpg";
import dashboardStyle from "../../assets/jss/material-dashboard-react/layouts/dashboardStyle";
import SnackbarSpinner from "../../Components/SnackbarSpinner/SnackbarSpinner";
import { DashboardContext } from "../../Context";

const switchRoutes = (
	<Switch>
		{dashboardRoutes.map((prop, key) => {
			return <Route path={prop.path} component={prop.component} key={key} />;
		})}
	</Switch>
);

interface IProps extends RouteComponentProps {
	classes: any;
}

const Dashboard = (props: IProps) => {

	const { classes, location, history, match, ...rest } = props;

	const [mobileOpen, setMobileOpen] = useState(false);

	const [state, setState] = useState({
		cummulativePv: 0,
		// id: 0,
		network: 0,
		// notifications: [] as Array<{ type: string, message: any, link?: { path: string, message: string } }>,
		pv: 0,
		transactions: [],
		wallet: 0,
	});

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const res = await Axios.get("/user/dashboard");
				if (res.status === 200) {
					// Append the serial number to the table data
					let i = 0;
					const transactions = res.data.transactions.map((t: string[]) => {
						i++;
						t.unshift(String(i));
						return t;
					});
					setState((s) => ({ ...s, ...res.data, transactions }));
				}
			} catch (error) {
				if (error.response) {
					if (error.response.status === 403) {
						props.history.push("/login" + props.location.pathname);
					}
				}
			}
			setLoading(false);
		})();
	}, []);

	useEffect(() => {
		Axios.interceptors.response.use(
			(response) => Promise.resolve(response),
			(error) => {
				const err = error as AxiosError;
				if (err.response) {
					if (err.response.status === 403) {
						history.push("/login");
					}
				}
				return Promise.reject(error);
			},
		);
	}, []);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const getRoute = () => {
		return props.location.pathname !== "/maps";
	};

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
								<DashboardContext.Provider
									value={{
										...state,
									}}
								>
									<SnackbarSpinner
										loading={loading}
									/>
									{dashboardRoutes.map((prop, key) => {
										return <Route exact={true} path={prop.path} component={prop.component} key={key} />;
									})}
								</DashboardContext.Provider>
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
};

export default withRouter(withStyles(dashboardStyle as any)(Dashboard));
