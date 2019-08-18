// cSpell: ignore Snackbar Hoc's Downline

import React, { Component, useContext, useEffect, useMemo, useState } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import MUIDataTable from "mui-datatables";

// Personal Components
import Card from "../../Components/Card/Card";
import CardBody from "../../Components/Card/CardBody";
import CardHeader from "../../Components/Card/CardHeader";
import SnackbarSpinner from "../../Components/SnackbarSpinner/SnackbarSpinner";
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
			<Card>
				<CardHeader color="info">
					<h4 className={classes.cardTitleWhite}>Transaction History</h4>
					<p className={classes.cardCategoryWhite}>
						Last 50 Transactions
					</p>
				</CardHeader>
				<CardBody>
					<MUIDataTable
						columns={["S/N", "Amount", "Downline", "Description"]}
						title="Last 50 Transactions"
						data={transactions}
						options={{
							download: false,
							filter: false,
							rowsPerPage: 1,
							rowsPerPageOptions: [1],
							search: false,
							selectableRows: "none",
							serverSide: true,
							viewColumns: false,

						}}
					/>
					{/* <Table
						pagination={true}
						nextPage={nextPage}
						prevPage={prevPage}
						tableHeaderColor="warning"
						tableHead={["S/N", "Amount", "Downline", "Description"]}
						tableData={transactions}
					/> */}
				</CardBody>
			</Card>
		</>
	);
};

export default withStyles(dashboardStyle as any)(Transactions);
