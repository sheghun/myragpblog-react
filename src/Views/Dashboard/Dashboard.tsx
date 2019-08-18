// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons
import MoneyIcon from "@material-ui/icons/Money";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle";
// * Personal components
import Card from "../../Components/Card/Card";
import CardBody from "../../Components/Card/CardBody";
import CardFooter from "../../Components/Card/CardFooter";
import CardHeader from "../../Components/Card/CardHeader";
import CardIcon from "../../Components/Card/CardIcon";
import GridContainer from "../../Components/Grid/GridContainer";
import GridItem from "../../Components/Grid/GridItem";
import SnackbarContent from "../../Components/Snackbar/SnackbarContent";
import SnackbarSpinner from "../../Components/SnackbarSpinner/SnackbarSpinner";
import Table from "../../Components/Table/Table";
import { DashboardContext } from "../../Context";

interface IProps extends RouteComponentProps {
	classes: any;
}

const Dashboard = (props: IProps) => {

	const { wallet, pv, cummulativePv, network, transactions } = useContext(DashboardContext);

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
							<h3 className={classes.cardTitle}>{network}</h3>
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
							<h3 className={classes.cardTitle}>&#8358;{wallet.toLocaleString()}</h3>
						</CardHeader>
						<CardFooter stats={true} />
					</Card>
				</GridItem>
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
										{pv}
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
										{cummulativePv}
									</Typography>
								</GridItem>
							</GridContainer>
						</CardBody>
					</Card>
				</GridItem>
				<GridItem xs={12} sm={12} md={12}>
					{/* <Card>
						<CardHeader color="primary">
							<h4 className={classes.cardTitleWhite}>Notifications</h4>
							<p className={classes.cardCategoryWhite}>
								All Your Notifications
                                </p>
						</CardHeader>
						<CardBody>
							{notifications.map((notification, i) => (
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
					</Card> */}
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
								tableData={transactions}
							/>
						</CardBody>
					</Card>
				</GridItem>
			</GridContainer>
		</>
	);
};

export default withRouter(withStyles(dashboardStyle as any)(Dashboard));
