import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter"
import TablePagination from "@material-ui/core/TablePagination"
// core components
import tableStyle from "../../assets/jss/material-dashboard-react/components/tableStyle.jsx";
import TablePaginationActionsWrapped from "./TablePagination";


function CustomTable({ ...props }: any) {
    const { classes, tableHead, tableData, tableHeaderColor } = props;
    let number = 0
    return (
        <div className={classes.tableResponsive}>
            <Table className={classes.table}>
                {tableHead !== undefined ? (
                    <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                        <TableRow>
                            {tableHead.map((prop: any, key: any) => {
                                return (
                                    <TableCell
                                        className={classes.tableCell + " " + classes.tableHeadCell}
                                        key={key}
                                    >
                                        {prop}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                ) : null}
                <TableBody>
                    {tableData.map((prop: any, key: any) => {
                        if (prop.length !== 4) {
                            number++
                            prop.unshift(number)
                        }
                        return (
                            <TableRow key={key}>
                                {prop.map((prop: any, key: any) => {
                                    return (
                                        <TableCell className={classes.tableCell} key={key}>
                                            {prop}
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
                            <TableCell colSpan={3} align='left' >
                                {
                                    //@ts-ignore
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

CustomTable.defaultProps = {
    tableHeaderColor: "gray"
};

CustomTable.propTypes = {
    classes: PropTypes.object.isRequired,
    tableHeaderColor: PropTypes.oneOf([
        "warning",
        "primary",
        "danger",
        "success",
        "info",
        "rose",
        "gray"
    ]),
    tableHead: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

// @ts-ignore
export default withStyles(tableStyle)(CustomTable);
