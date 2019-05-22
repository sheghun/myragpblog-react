import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'

// * For handling the query parametes in the url
import queryString from 'query-string'

const styles = theme => ({
    listItem: {
        padding: `${theme.spacing.unit}px 0`,
    },
    total: {
        fontWeight: '700',
    },
    title: {
        marginTop: theme.spacing.unit * 2,
    },
    progressBar: {
        postion: 'relative',
        left: '50%'
    },
    colorError: {
        color: 'green'
    }
});

class ThirdForm extends Component {

    queryString = queryString.parse(this.props.location.search)

    osoftpayForm

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            registerError: [],
            registerSuccess: [],
            // Osoftpay Inputs
            osoftpay: {
                hash: '',
                Amount: '',
                formUrl: '',
                customerId: '',
                customerName: '',
                transactionType: 2,
                paymentItemName: '',
                transactionReference: '',
                merchantNumber: 'g3ggdgsi1.gns4g.',
                testPaymentItemName: 'TestServiceName1',
                redirectUrl: `${window.location.origin}${this.props.match.url.slice(0, -1)}verifyPayment${this.props.location.search}`,
            },
        }
    }

    componentDidMount() {
        const osoftpay = JSON.parse(localStorage.getItem('osoftpay'))
        console.log(osoftpay)
        this.setState({ osoftpay: { ...osoftpay } })
        setTimeout(() => {
            localStorage.removeItem('osoftpay')
        }, 3000);
    }

    submit = () => {
        this.osoftpayForm.submit()
    }

    render() {
        const { classes } = this.props;
        const { osoftpay } = this.state
        // eslint-disable-next-line no-unused-vars
        let success = null;
        if (this.state.registerSuccess.length !== 0) {
            success = (
                <Typography variant="overline">
                    You can now <Link to="/login">Login</Link>
                </Typography>
            )
        }
        return (
            <React.Fragment>


                {/* Osofpay Form That Connects To the payment Portal */}
                <form method="POST" action={osoftpay.formUrl} ref={ref => this.osoftpayForm = ref} >
                    <input name="TransactionType" value="2" type="hidden" />
                    <input name="MerchantNumber" value={osoftpay.merchantNumber} type="hidden" />
                    <input name="SiteRedirectURL" value={osoftpay.redirectUrl} type="hidden" />
                    <input name="TransactionReference" value={osoftpay.transactionReference} type="hidden" />
                    <input name="CustomerName" value={osoftpay.customerName} type="hidden" />
                    <input name="CustomerId" value={osoftpay.customerId} type="hidden" />
                    <input name="PaymentItemName" value={osoftpay.testPaymentItemName} type="hidden" />
                    <input name="Amount" value={osoftpay.Amount} type="hidden" />
                    <input name="Hash" value={osoftpay.hash} type="hidden" />
                </form>



                <List disablePadding>
                    <ListItem className={classes.listItem}>
                        <ListItemText primary="Package" secondary="This is the package your account will use" />
                        <Typography>Master</Typography>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <ListItemText primary="Amount" />
                        <Typography>&#8358; 5000</Typography>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <ListItemText primary="Total" />
                        <Typography variant="subtitle1" className={classes.total}>&#8358;5000</Typography>
                    </ListItem>
                </List>



                <center>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.submit}
                    >
                        Make Payment
                    </Button>
                </center>


            </React.Fragment>
        );
    }
}

ThirdForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ThirdForm);