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
                        to={`/${username}/how-to-register`}
                        className={[classes.breadCrumbsTextActive].join(' ')}
                    >
                        How To Register Yourself
                    </Link>
                </Typography>
            </div>

            <div>
                <h1>HOW TO REGISTER YOURSELF/SOMEONE IN RAGP.</h1>
                <br />
                <Divider />
                <br />
                <Typography className={classes.body} variant="body2">
                    <strong>
                        √ Using Google Chrome, Log On www.rechargeandgetpaid.com To Open The RAGP
                        Website
                        <br />
                        <br />
                        √ Tap-On The Menu Bar
                        <br />
                        <br />
                        √ Scroll Down The Drop Down Menu And Tap On "JOIN NOW"
                        <br />
                        <br />
                        √ Type The Sponsor’s REFERRAL ID [ i.e The USER NAME Of Who The New Member
                        Is Coming Under]
                        <br />
                        <br />
                        √ Type The FIRST NAME, LAST NAME, PHONE NUMBER, e-MAIL, etc Of The REGISTREE
                        <br />
                        <br />
                        √ Create YOUR LOGIN DETAILS; i.e Your Unique USER NAME & PASSWORD[ Make The
                        User Name As Unique As Possible; Combine Words & Figures: e.g DAGOGO2055;
                        For Password, Combine Words & Figures Too; e.g dadogojack2055]
                        <br />
                        <br />
                        √ Check Your Entries To Make Sure You Are Not Missing Anything [A Red Flag
                        Will Notify You That Your Are Missing Something]
                        <br />
                        <br />
                        √ Tap “NEXT” To Move To The Next Section [ The System Will Tell
                        "Registration Is Successful, You Can Now LogIn”]
                        <br />
                        <br />
                        √ Tap “OK” And Then LOGIN By Filling In The USER NAME & PASSWORD You Just
                        Created
                        <br />
                        <br />
                        √ Tap On "CHOOSE REGISTRATION PACKAGE” Icon, To Choose How Much You Want To
                        Pay To Start With
                        <br />
                        <br />
                        √ Tap-On The "PAYSTACK" Icon To Choose The Payment Option You Want To Use [A
                        Drop Down Menu Will Give You The Option Of:
                        <br />
                        1. PayStack
                        <br/>
                        2. e-WALLET
                        <br />
                        Choose PayStack If You Want To Pay From A BANK ACCOUNT; Choose e-WALLET If An
                        EXISTING MEMBER Is To Pay From His/Her e-WALLET
                        <br />
                        <br />
                        √ Tap-On The "NEXT" Icon To Move To The Next Page
                        <br />
                        <br />√ Now On The Next Page, Fill-In Your Bank Details; i.e YOUR BANK NAME,
                        ACCOUNT NAME, ACCOUNT TYPE & ACCOUNT NUMBER; Then Tap-On "NEXT" To Move To
                        The Next Page, Where YOU Can Finally Pay The Registration Fee VIA PayStack
                        or e-WALLET, Depending What You Chose Earlier On.
                    </strong>
                </Typography>
            </div>
            <Typography align="center" className={classes.continueReading} variant="h6">
                Continue Reading
            </Typography>
            <div style={baseStyles.pagination}>
                <div style={baseStyles.paginationBack}>
                    <Link to={'/' + username + '/incentive-awards'}>
                        <Button variant="text" color="primary">
                            <span style={baseStyles.backwardIcon}>
                                <ArrowBackwardIcon />
                            </span>
                            Incentive Awards
                        </Button>
                    </Link>
                </div>
                <div style={baseStyles.paginationForward}>
                    <Link to={'/' + username + '/how-to-pay-with-paystack'}>
                        <Button variant="text" color="primary">
                            How To Pay with PayStack
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
