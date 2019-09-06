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
                        to={`/${username}/how-to-buy-airtime-and-data`}
                        className={[classes.breadCrumbsTextActive].join(' ')}
                    >
                        HOW TO BUY AIRTIME & DATA:
                    </Link>
                </Typography>
            </div>

            <div>
                <h1>HOW TO BUY AIRTIME & DATA:</h1>
                <br />
                <Divider />
                <br />
                <Typography className={classes.body} variant="body2">
                    <strong>
                        To Buy AIRTIME or DATA, Simply Take The Following Steps:-
                        <br />
                        <br />
                        √ Google Chrome www.rechargeandgetpaid.com
                        <br />
                        <br />
                        √ Tap-On The Menu Bar(The Three Horizontal Lines On Top Right Corner Of The
                        Home Page)
                        <br />
                        <br />
                        √ Scroll Down The Drop Down Menu And Tap-On "LOGIN"
                        <br />
                        <br />
                        √ Type Your USER NAME And PASSWORD And Then Tap-On LOGIN
                        <br />
                        <br />
                        √ Once You Are LOGGED IN, Tap-On Your DASHBORD MENU BAR, On The Top Left
                        Corner(The 3 Horizontal Lines)
                        <br />
                        <br />
                        √ Scroll Down The Menu Bar And Tap-On The "RECHARGE" Icon
                        <br />
                        <br />
                        √ Type The Phone Number You Want To Recharge
                        <br />
                        <br />
                        √ Tap-On "VERIFY PHONE NUMBER"...
                        <br />
                        <br />
                        √ Tap-On THE CENTER OF THE CIRCLE/DOT Besides The "BUY AIRTIME" or "BUY
                        DATA" Icons To Choose Which Of Them You Want To Buy
                        <br />
                        <br />
                        √ Tap-On "SELECT AMOUNT" To Choose How Much DATA or AIRTIME You Want To Buy
                        <br />
                        <br />
                        √ Having Chosen The Amount To Buy, Tap-On "TRANSFER AIRTIME" or " TRANSFER
                        DATA" To Complete The Transaction
                        <br />
                        <br />
                        √ Once Done, The System Will Notify You That The AIRTIME/DATA Purchase Was
                        Successful. Afterwards You ll Get An SMS Notifying You That Your Phone Line
                        Has Been Credited With The Amount Of AIRTIME or DATA You Bought!
                        <br />
                        <br />√ Otherwise, Repeat The Process Until U Successfully Recharge Your
                        Phone Line With AIRTIME or DATA
                    </strong>
                </Typography>
            </div>
            <br />
            <br />
            <Divider />
            <div style={baseStyles.pagination}>
                <div style={baseStyles.paginationBack}>
                    <Link to={'/' + username + '/how-to-pay-with-ewallet'}>
                        <Button variant="text" color="primary">
                            <span style={baseStyles.backwardIcon}>
                                <ArrowBackwardIcon />
                                How Pay With E-Wallet
                            </span>
                        </Button>
                    </Link>
                </div>
                <div style={baseStyles.paginationForward}>
                    <Link to={'#'}>
                        <Button variant="text" color="primary">
                            <span style={baseStyles.forwardIcon}>
                                The end
                            </span>
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default HowToRegister;
