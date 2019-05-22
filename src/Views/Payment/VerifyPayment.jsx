import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'

// * Axios
import Axios from 'axios'

// * For handling the query parametes in the url
import queryString from 'query-string'
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    listItem: {
        padding: `${theme.spacing.unit}px 0`,
    },
    total: {
        fontWeight: '700',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        }
    },
    title: {
        marginTop: theme.spacing.unit * 2,
    },
    progressBar: {
        postion: 'relative',
        left: '50%'
    },
    colorError: {
        color: 'red'
    }
});

class VerifyPayment extends Component {

    queryString = queryString.parse(this.props.location.search)

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            registerError: [],
            registerSuccess: [],
        }
    }

    componentDidMount() {
        const data = { ...this.queryString, step: 3 }
        console.log(JSON.stringify(data))
        Axios.post('/payment/verifypayment', { ...this.queryString, step: 3 }, { withCredentials: true })
            .then(response => {
                const resp = response.data
                this.setState({ loading: true })
                console.log(resp)
                if (resp.success) {
                    this.setState({ registerSuccess: resp.success, loading: false })
                } else if (resp.error) {
                    this.setState({ registerError: resp.error, loading: false })
                }
            })
    }


    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        {
                            this.state.loading ?
                                <CircularProgress color="secondary" className={classes.progressBar} size={40} />
                                : null
                        }
                        <center>
                            <Typography variant="h6" gutterBottom>
                                Payment
                            </Typography>
                            <Grid container spacing={16}>
                                {this.state.registerSuccess.map(success => (
                                    <>
                                        <Grid item xs={12} spacing={16}>
                                            <Typography align="center" variant="h6">
                                                {success}
                                            </Typography>
                                        </Grid>
                                    </>
                                ))}
                                {this.state.registerError.map(error => (
                                    <>
                                        <Grid item xs={12} spacing={16}>
                                            <Typography align="center" variant="body2">
                                                {error}
                                            </Typography>
                                        </Grid>
                                    </>
                                ))}
                                {
                                    !this.state.loading && this.state.registerError.length !== 0 ?
                                        <Grid item xs={12} spacing={16}>
                                            <Typography align="center" variant="body2">
                                                Login To Try Payment Again
                                    </Typography>
                                        </Grid>
                                        :
                                        null
                                }
                                <Grid item xs={12}>
                                    {
                                        !this.state.loading ?
                                            < Typography variant="overline">
                                                You can now <Link to="/login">Login</Link>
                                            </Typography>
                                            :
                                            null
                                    }
                                </Grid>

                            </Grid>
                        </center>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(VerifyPayment)