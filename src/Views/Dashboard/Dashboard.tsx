// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
import MoneyIcon from "@material-ui/icons/Money";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
// * Personal components
import Card from "../../Components/Card/Card.jsx";
import CardBody from "../../Components/Card/CardBody.jsx";
import CardFooter from "../../Components/Card/CardFooter.jsx";
import CardHeader from "../../Components/Card/CardHeader.jsx";
import CardIcon from "../../Components/Card/CardIcon.jsx";
import GridContainer from "../../Components/Grid/GridContainer.jsx";
import GridItem from "../../Components/Grid/GridItem.jsx";
import SnackbarContent from "../../Components/Snackbar/SnackbarContent.jsx";
import Table from "../../Components/Table/Table";

interface IProps extends RouteComponentProps {
	classes: any;
}

const Dashboard = (props: IProps) => {
	const [state, setState] = useState({
		cummulativePv: 0,
		daysleft: 0,
		wallet: 0,
		id: 0,
		network: 0,
		notifications: [] as Array<{ type: string, message: any, link?: { path: string, message: string } }>,
		pv: 0,
		transactions: [],
	});

	useEffect(() => {
		(async () => {
			try {
				const response = await Axios.get("/user/dashboard");
				setState(s => ({ ...s, ...response.data }));
			} catch (error) {
				if (error.response) {
					if (error.response.status === 403) {
						props.history.push("/login" + props.location.pathname);
					}
				}
			}
		})();
	}, []);

	const { classes } = props;
	return (
		<>
			<GridContainer>
				<GridItem xs={12} sm={6} md={6}>
					<Card>
						<CardHeader color="warning" stats={true} icon={true}>
							<CardIcon color="warning">
								<PeopleOutlineIcon />
							</CardIcon>
							<br />
							<p className={classes.cardCategory}>My Network</p>
							<h3 className={classes.cardTitle}>{state.network}</h3>
						</CardHeader>
						<CardFooter stats={true} />
					</Card>
				</GridItem>
				<GridItem xs={12} sm={6} md={6}>
					<Card>
						<CardHeader color="success" stats={true} icon={true}>
							<CardIcon color="success">
								<MoneyIcon />
							</CardIcon>
							<br />
							<p className={classes.cardCategory}>Wallet</p>
							<h3 className={classes.cardTitle}>&#8358;{state.wallet.toLocaleString()}</h3>
						</CardHeader>
						<CardFooter stats={true} />
					</Card>
				</GridItem>
				{/* <GridItem xs={12} sm={6} md={6}>
					<Card>
						<CardHeader color="success" stats={true} icon={true}>
							<CardIcon color="success">
								<DateRange />
							</CardIcon>
							<br />
							<p className={classes.cardCategory}>Days Left</p>
							<h3 className={classes.cardTitle}>{state.daysleft}</h3>
						</CardHeader>
						<CardFooter stats={true}/>
					</Card>
				</GridItem> */}
				{/* <GridItem xs={12} sm={6} md={6}>
					<Card>
						<CardHeader color="success" stats={true} icon={true}>
							<CardIcon color="success">
								<TrendingUpIcon />
							</CardIcon>
							<br />
							<p className={classes.cardCategory}>Visits</p>
							<h3 className={classes.cardTitle}>{state.daysleft}</h3>
						</CardHeader>
						<CardFooter stats={true}/>
					</Card>
				</GridItem> */}
			</GridContainer>
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					<Card>
						<CardHeader color="info">
							<h4 className={classes.cardTitleWhite}>Pv</h4>
							<p className={classes.cardCategoryWhite}>
								Points Value
                                </p>
						</CardHeader>
						<CardBody>
							<GridContainer>
								<GridItem xs={12} sm={6} md={6}>
									<Typography
										style={{ marginBottom: "1rem" }}
										align="center"
										variant="h5"
									>
										Monthly Pv
                                	</Typography>
									<Typography align="center" variant="h4">
										{state.pv}
									</Typography>
								</GridItem>
								<GridItem xs={12} sm={6} md={6}>
									<Typography
										style={{ marginBottom: "1rem" }}
										align="center"
										variant="h5"
									>
										Cummulative Pv
                                    </Typography>
									<Typography align="center" variant="h4">
										{state.cummulativePv}
									</Typography>
								</GridItem>
							</GridContainer>
						</CardBody>
					</Card>
				</GridItem>
				<GridItem xs={12} sm={12} md={12}>
					<Card>
						<CardHeader color="primary">
							<h4 className={classes.cardTitleWhite}>Notifications</h4>
							<p className={classes.cardCategoryWhite}>
								All Your Notifications
                                </p>
						</CardHeader>
						<CardBody>
							{state.notifications.map((notification, i) => (
								<SnackbarContent
									key={i}
									message={
										<Typography variant="overline" style={{ color: "white", fontWeight: 700 }}>
											{notification.message}<br />
											{notification.link ?
												<Link to={notification.link.path}>{notification.link.message}</Link>
												: null
											}
										</Typography>
									}
									close={true}
									color={notification.type}
								/>
							))}
						</CardBody>
					</Card>
				</GridItem>
				<GridItem xs={12} sm={12} md={12}>
					<Card>
						<CardHeader color="info">
							<h4 className={classes.cardTitleWhite}>Transaction History</h4>
							<p className={classes.cardCategoryWhite}>
								New employees on 15th September, 2016
                                </p>
						</CardHeader>
						<CardBody>
							<Table
								tableHeaderColor="warning"
								tableHead={["S/N", "Amount", "Downline", "Description"]}
								tableData={state.transactions}
							/>
						</CardBody>
					</Card>
				</GridItem>
			</GridContainer>
		</>
	);
};

export default withRouter(withStyles(dashboardStyle as any)(Dashboard));
