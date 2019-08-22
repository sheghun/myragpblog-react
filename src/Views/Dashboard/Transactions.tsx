// cSpell: ignore Snackbar Hoc's Downline

import React, { Component, useContext, useEffect, useMemo, useState } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../Components/Grid/GridContainer";
import GridItem from "../../Components/Grid/GridItem";
import MUIDataTable from "mui-datatables";

// Personal Components
import Card from "../../Components/Card/Card";
import CardBody from "../../Components/Card/CardBody";
import CardHeader from "../../Components/Card/CardHeader";
import Table from "../../Components/Table/Table";

// Styles
import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

// Hoc's
import ErrorWrapper from "../../Hoc/ErrorWrapper/ErrorWrapper";

import Axios from "axios";
import { DashboardContext } from "../../Context";

const Transactions = (props: any) => {

	const { classes } = props;

	const { transactions } = useContext(DashboardContext);

	return (
		<>
			<GridContainer>
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

export default withStyles(dashboardStyle as any)(Transactions);
