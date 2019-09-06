import React, {useContext} from 'react';
// Base Styles
import * as baseStyles from '../../../baseStyles';
import Typography from '@material-ui/core/Typography';
import {BlogContext} from '../../../Context';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackwardIcon from '@material-ui/icons/ArrowBack';
import {StyleRulesCallback} from '@material-ui/core';
import {Link} from 'react-router-dom';

// Styles

const useStyles = makeStyles<StyleRulesCallback>(theme => ({
    breadcrumbs: {
        marginLeft: '32px',
        marginTop: '100px',
    },
    breadCrumbsSeparator: {
        display: 'inline-block',
        marginLeft: '1rem',
        marginRight: '1rem',
    },
    breadCrumbsText: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '1px',
        textDecoration: 'none',
        'and:hover': {
            color: 'rgba(0, 0, 0, 0.3)',
        },
    },
    breadCrumbsTextActive: {
        color: 'rgba(0, 0, 0, 0.3)',
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '1px',
        textDecoration: 'none',
    },
    video: {
        maxWidth: '560px',
        width: '100%',
    },
    matrixImage: {
        width: '100%',
    },
    body: {
        color: baseStyles.faintColor,
    },
    continueReading: {
        marginBottom: '24px',
    },
}));

const HowToRegister: React.FC = () => {
    const classes = useStyles();

    const {username} = useContext(BlogContext);

    return (
        <>
            <div className={classes.breadcrumbs}>
                <Typography variant="overline">
                    <Link to={`/${username}/how-to-register`} className={classes.breadCrumbsText}>
                        How To's
                        <span className={classes.breadCrumbsSeparator}>/</span>
                    </Link>
                    <Link
                        to={`/${username}/how-to-pay-with-paystack`}
                        className={[classes.breadCrumbsTextActive].join(' ')}
                    >
                        How To Pay With Paystack
                    </Link>
                </Typography>
            </div>

            <div>
                <h1>HOW PAY FOR REGISTRATION VIA PAYSTACK</h1>
                <br />
                <Divider />
                <br />
                <Typography className={classes.body} variant="body2">
                    <strong>
                        Having Completed The Last Section By Filling-In Your Bank Details, And
                        Earlier Chosen The “PAYSTACK PAYMENT OPTION” You’re Now On The PAYSTACK
                        Payment Page: To Pay And Thereby Complete The Registration Simply Take The
                        Following Steps:
                        <br />
                        <br />
                        √ Choose The Method Of Payment You Want To Use [ Options Are: CARD, BANK
                        ACCOUNT & 737, etc! BANK ACCOUNT Option Being The Most Straight Forward And
                        Easiest, In Our Opinion)
                        <br />
                        <br />
                        √ Type Your CARD/BANK DETAILS Correctly
                        <br />
                        <br />
                        √ Tap-On "NEXT"...
                        <br />
                        <br />
                        √ Type Your Pin Number
                        <br />
                        <br />
                        √ An OTP Code Will Sent To You Via Your Alerts Number; Type The OTP Code To
                        Confirm The Payment/Transaction
                        <br />
                        <br />
                        √ If All The Details Your Supplied Are Correct, Your Payment Shall Be
                        Accepted, Your Account Instantly Activate AND YOU LL GET NOTIFICATION THAT
                        YOU CAN NOW LOG-IN.
                        <br />
                        <br />√ LOG-IN With Your USER NAME & PASSWORD Immediately And Start Using &
                        Enjoying Your RAGP Account!!!
                    </strong>
                </Typography>
            </div>
            <br />
            <br />
            <Divider />
            <br />
            <br />
            <Typography align="center" className={classes.continueReading} variant="h6">
                Continue Reading
            </Typography>
            <div style={baseStyles.pagination}>
                <div style={baseStyles.paginationBack}>
                    <Link to={'/' + username + '/how-to-register'}>
                        <Button variant="text" color="primary">
                            <span style={baseStyles.backwardIcon}>
                                <ArrowBackwardIcon />
                            </span>
                            How To Register
                        </Button>
                    </Link>
                </div>
                <div style={baseStyles.paginationForward}>
                    <Link to={'/' + username + '/how-to-pay-with-ewallet'}>
                        <Button variant="text" color="primary">
                            How To Pay With E-Wallet
                            <span style={baseStyles.forwardIcon}>
                                <ArrowForwardIcon />
                            </span>
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default HowToRegister;
