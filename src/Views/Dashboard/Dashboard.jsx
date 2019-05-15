import React from "react";
import Axios from 'axios'
import { Link } from 'react-router-dom'

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";

// * Personal components
import GridItem from "../../Components/Grid/GridItem.jsx";
import GridContainer from "../../Components/Grid/GridContainer.jsx";
import Table from "../../Components/Table/Table";
import Danger from "../../Components/Typography/Danger.jsx";
import Card from "../../Components/Card/Card.jsx";
import CardHeader from "../../Components/Card/CardHeader.jsx";
import CardIcon from "../../Components/Card/CardIcon.jsx";
import CardBody from "../../Components/Card/CardBody.jsx";
import CardFooter from "../../Components/Card/CardFooter.jsx";
import SnackbarContent from "../../Components/Snackbar/SnackbarContent.jsx";

//Icon
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import MoneyIcon from "@material-ui/icons/Money";
import TrendingUpIcon from "@material-ui/icons/TrendingUp"

//Styles
import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
//Hoc's
import ErrorWrapper from '../../Hoc/ErrorWrapper/ErrorWrapper';
import Typography from "@material-ui/core/Typography";

class Dashboard extends React.Component {
    state = {
        pv: 0,
        id: 0,
        network: 0,
        earnings: 0,
        daysleft: 0,
        transactions: [],
        cummulative_pv: 0,
        notifications: [],
        redirectUrl: `${window.location.origin}/payment/verifyPayment${this.props.location.search}`
    };


    componentDidMount() {
        Axios.get('/dashboard', {
            withCredentials: true
        }).then(response => {
            const resp = response.data.success
            this.setState({
                ...resp
            })
            console.log(this.state.notifications)
        })

    }

    render() {
        const { classes } = this.props;
        const { ...state } = this.state
        return (
            <ErrorWrapper>
                <GridContainer>
                    <GridItem xs={12} sm={6} md={6}>
                        <Card>
                            <CardHeader color="warning" stats icon>
                                <CardIcon color="warning">
                                    <PeopleOutlineIcon />
                                </CardIcon>
                                <br />
                                <p className={classes.cardCategory}>My Network</p>
                                <h3 className={classes.cardTitle}>{state.network}</h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <Danger>
                                        <Warning />
                                    </Danger>
                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                        Get more space
                                    </a>
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                        <Card>
                            <CardHeader color="success" stats icon>
                                <CardIcon color="success">
                                    <MoneyIcon />
                                </CardIcon>
                                <br />
                                <p className={classes.cardCategory}>Revenue</p>
                                <h3 className={classes.cardTitle}>&#8358;{state.earnings.toLocaleString(3)}</h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <DateRange />
                                    Last 24 Hours
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                        <Card>
                            <CardHeader color="success" stats icon>
                                <CardIcon color="success">
                                    <TrendingUpIcon />
                                </CardIcon>
                                <br />
                                <p className={classes.cardCategory}>Days Left</p>
                                <h3 className={classes.cardTitle}>{state.daysleft}</h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <DateRange />
                                    Last 24 Hours
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                        <Card>
                            <CardHeader color="success" stats icon>
                                <CardIcon color="success">
                                    <Icon>trending_up</Icon>
                                </CardIcon>
                                <br />
                                <p className={classes.cardCategory}>Visits</p>
                                <h3 className={classes.cardTitle}>{state.daysleft}</h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <DateRange />
                                    Last 24 Hours
                                </div>
                            </CardFooter>
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
                                    <GridItem xs={6} sm={6} md={6}>
                                        <Typography style={{ marginBottom: '1rem' }} align="center" variant="h5">
                                            Monthly Pv
                                        </Typography>
                                        <Typography align="center" variant="h4">
                                            {state.pv}
                                        </Typography>
                                    </GridItem>
                                    <GridItem xs={6} sm={6} md={6}>
                                        <Typography style={{ marginBottom: '1rem' }} align="center" variant="h5">
                                            Cummulative Pv
                                        </Typography>
                                        <Typography align="center" variant="h4">
                                            {state.cummulative_pv}
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
                                {state.daysleft < 5 ?
                                    <SnackbarContent
                                        message={
                                            <Typography variant="overline" style={{ color: 'white', fontWeight: '700' }}>
                                                Your Account {state.daysLeft < 5 ? 'will soon expire' :
                                                    'is not active pay'} to activate your account<br />
                                                Pay <Link to={{
                                                    pathname: '/payment/makepayment',
                                                    search: `?id=${state.id}&redirectUrl=${this.state.redirectUrl}`
                                                }} >Here</Link>
                                            </Typography>
                                        }
                                        close
                                        color="danger"
                                    />
                                    : null
                                }
                                {this.state.notifications.map(notification => (
                                    <SnackbarContent
                                        message={
                                            <Typography variant="overline" style={{ color: 'white', fontWeight: '700' }}>
                                                {notification.message}<br />
                                                {notification.link ?
                                                    <Link to={notification.link.path}>{notification.link.message}</Link>
                                                    : null
                                                }
                                            </Typography>
                                        }
                                        close
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
            </ErrorWrapper>
        );
    }
}

export default withStyles(dashboardStyle)(Dashboard);
