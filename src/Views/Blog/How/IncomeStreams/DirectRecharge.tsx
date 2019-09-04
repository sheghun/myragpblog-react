import React, {useContext} from 'react';
// Base Styles
import * as baseStyles from '../../../../baseStyles';
import Typography from '@material-ui/core/Typography';
import {BlogContext} from '../../../../Context';
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

const DirectRecharge = () => {
    const classes = useStyles();

    const {username} = useContext(BlogContext);

    return (
        <>
            <div className={classes.breadcrumbs}>
                <Typography variant="overline">
                    <Link
                        to={`/${username}/the-business-model`}
                        className={classes.breadCrumbsText}
                    >
                        How Does It Work
                        <span className={classes.breadCrumbsSeparator}>/</span>
                    </Link>
                    <Link
                        to={`/${username}/the-compensation-plan`}
                        className={classes.breadCrumbsText}
                    >
                        The Compensation Plan
                        <span className={classes.breadCrumbsSeparator}>/</span>
                    </Link>
                    <Link
                        to={`/${username}/direct-recharge-bonus`}
                        className={[classes.breadCrumbsTextActive].join(' ')}
                    >
                        Direct Recharge Bonus
                    </Link>
                </Typography>
            </div>

            <div>
                <h1>Direct Recharge Bonus</h1>
                <br />
                <Divider />
                <br />
                <Typography className={classes.body} variant="body2">
                    As A Member Of <strong>RAGP-NATION</strong> You Can Buy The Following
                    Products/Services From Your Own Dash Board , Namely :-
                    <br />
                    CALL AIRTIME (Of MTN, GLO, AIRTEL & 9MOBILE)
                    <br />
                    DATA SUBSCRIPTION (Of MTN, GLO, AIRTEL & 9MOBILE)
                    <br />
                    CABLE TV SUBSCRIPTIONS (Of DStv, GOtv & STARTIMES)
                    <br />
                    ELECTRIC METER SUBSCRIPTION (OfPHCN)
                    <br />
                    <br />
                    And You Get To Earn A Percentage Of Whatever You Buy, Whenever You Buy As{' '}
                    <strong>DIRECT RECHARGE BONUS (DRB)</strong>
                    <br />
                    <br />
                    <Typography variant="h6">
                        The Percentage You Get As DRB Are As Follows :-
                    </Typography>
                    <br />
                    <br />
                    2% OF ANY AMOUNT OF CALL AIRTIME YOU BUY
                    <br />
                    10% OF DATA ANY AMOUNT OF DATA SUBSCRIPTION YOU BUY
                    <br />
                    N40 FOR ANY CABLE TV SUBSCRIPTION PACKAGE YOU BUY
                    <br />
                    N40 FOR ANY AMOUNT OF PHCN BILL SUBSCRIPTION YOU BUY
                    <br />
                    <br />
                    <strong>As Examples:-</strong> If You Buy AIRTIME Of, Say, N1000 Via Your Dash
                    Board, You Instantly GET PAID 2% Of The N1000 = N20 Into Your e-WALLET...;
                    Instantly &amp; Automatically
                    <br />
                    <br />
                    <strong>
                        If You Buy DATA SUBSCRIPTION Of, Say, N2500 Via Your RAGP Dash Board, You
                        Instantly GET PAID 10% Of The N2500 = N250 Into Your e-WALLET; Instantly &
                        Automatically!!!
                    </strong>
                    <br />
                    <br />
                    If, Say, You Buy, Via Your RAGP Dash Board DStv/GOtv/STARTIMES Subscriptions Of
                    Any Amount, RAGP Pays N40 Into Your e-WALLET; Instantly & Automatically!!!
                    <br />
                    <br />
                    You Also Get A N40 DRB By RAGP For Every PHCN Bill You Pay Via Your RAGP Dash
                    Board.... This Is How The RAGP DRB Works .... In A Nutshell!!!
                    <br />
                    <br />
                    <strong>
                        **A FAR MORE JUICY COMPENSATION IS THE IRB (INDIRECT REFERRAL BONUS); YOU CAN
                        LITERARILY MAKE MILLIONS PER DAY FROM THE IRB{' '}
                        <Link to={`/${username}/indirect-recharge-bonus`}>
                            Tap Here To Learn How The RAGP IRB Works!!!
                        </Link>
                    </strong>
                </Typography>
                <br />
                <br />
            </div>
            <Typography align="center" className={classes.continueReading} variant="h6">
                Continue Reading
            </Typography>
            <div style={baseStyles.pagination}>
                <div style={baseStyles.paginationBack}>
                    <Link to={'/' + username + '/the-compensation-plan'}>
                        <Button variant="text" color="primary">
                            <span style={baseStyles.backwardIcon}>
                                <ArrowBackwardIcon />
                            </span>
                            The Compensation Plan
                        </Button>
                    </Link>
                </div>
                <div style={baseStyles.paginationForward}>
                    <Link to={'/' + username + '/indirect-recharge-bonus'}>
                        <Button variant="text" color="primary">
                            Indirect Recharge Bonus
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

export default DirectRecharge;
