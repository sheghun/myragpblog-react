// cSpell: ignore Snackbar Hoc's Downline

import React, { Component } from 'react'

import withStyles from "@material-ui/core/styles/withStyles";

// Personal Components
import Card from "../../../Components/Card/Card";
import CardHeader from "../../../Components/Card/CardHeader"
import CardBody from "../../../Components/Card/CardBody";
import Table from "../../../Components/Table/Table";
import SnackbarSpinner from "../../../Components/SnackbarSpinner/SnackbarSpinner"


//Styles
import dashboardStyle from "../../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

// Hoc's
import ErrorWrapper from '../../../Hoc/ErrorWrapper/ErrorWrapper';

import Axios from 'axios'

class Transactions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            transactions: [],
            from: 0,
            to: 50
        }
    }

    componentDidMount() {
        const { from, to } = this.state
        this.setState({ loading: true })
        Axios.get(`/dashboard/transactions?from=${from}&to=${to}`, {
            withCredentials: true
        }).then(response => {
            const resp = response.data
            this.setState({ transactions: resp.success, loading: false })
        })
    }

    nextPage = async () => {
        await this.setState(prevState => {
            const from = prevState.from + 50
            const to = prevState.to + 50
            return {
                from,
                to,
                loading: true
            }
        })
        const { from, to } = this.state
        Axios.get(`/dashboard/transactions?from=${from}&to=${to}`, {
            withCredentials: true
        }).then(response => {
            const resp = response.data
            this.setState({transactions: resp.success, loading: false})
        })
    }

    prevPage = async () => {
        await this.setState(prevState => {
            const from = prevState.from === 0 ? 0 : prevState.from - 50
            const to = prevState.to === 50 ? 50 : prevState.to - 50
            return {
                from,
                to,
                loading: true
            }
        })
        const { from, to } = this.state
        Axios.get(`/dashboard/transactions?from=${from}&to=${to}`, {
            withCredentials: true
        }).then(response => {
            const resp = response.data
            this.setState({transactions: resp.success, loading: false})
        })
    }

    render() {
        const { classes } = this.props
        const { ...state } = this.state
        return (
            <ErrorWrapper>
                <Card>
                    <SnackbarSpinner loading={state.loading} />
                    <CardHeader color="info">
                        <h4 className={classes.cardTitleWhite}>Transaction History</h4>
                        <p className={classes.cardCategoryWhite}>
                            New employees on 15th September, 2016
                        </p>
                    </CardHeader>
                    <CardBody>
                        <Table
                            pagination
                            nextPage={this.nextPage}
                            prevPage={this.prevPage}
                            tableHeaderColor="warning"
                            tableHead={["S/N", "Amount", "Downline", "Description"]}
                            tableData={this.state.transactions}
                        />
                    </CardBody>
                </Card>
            </ErrorWrapper>
        )
    }
}

export default withStyles(dashboardStyle)(Transactions)