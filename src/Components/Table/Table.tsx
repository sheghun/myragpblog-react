// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
// core components
import tableStyle from "../../assets/jss/material-dashboard-react/components/tableStyle.jsx";
import TablePaginationActionsWrapped from "./TablePagination";

function CustomTable({ ...props }: any) {
	const { classes, tableHead, tableData, tableHeaderColor } = props;

	return (
		<div className={classes.tableResponsive}>
			<Table className={classes.table}>
				{tableHead !== undefined ? (
					<TableHead className={classes[tableHeaderColor + "TableHeader"]}>
						<TableRow>
							{tableHead.map((t: any, i: any) => {
								return (
									<TableCell
										className={classes.tableCell + " " + classes.tableHeadCell}
										key={i}
									>
										{t}
									</TableCell>
								);
							})}
						</TableRow>
					</TableHead>
				) : null}
				<TableBody>
					{tableData.map((t: any, i: any) => {
						return (
							<TableRow key={i}>
								{t.map((tr: any, ir: any) => {
									return (
										<TableCell className={classes.tableCell} key={ir}>
											{tr}
										</TableCell>
									);
								})}
							</TableRow>
						);
					})}
				</TableBody>
				{props.pagination ?
					<TableFooter>
						<TableRow >
							<TableCell rowSpan={4} />
							<TableCell rowSpan={4} />
							<TableCell colSpan={3} align="left" >
								{
									// @ts-ignore
									<TablePaginationActionsWrapped nextPage={props.nextPage as any} prevPage={props.prevPage} />
								}
							</TableCell>
						</TableRow>
					</TableFooter>
					: null
				}
			</Table>
		</div>
	);
}
// @ts-ignore
export default withStyles(tableStyle)(CustomTable);
