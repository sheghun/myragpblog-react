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

const IncentiveAwards = () => {
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
                        to={`/${username}/incentive-awards`}
                        className={[classes.breadCrumbsTextActive].join(' ')}
                    >
                        Incentive Awards
                    </Link>
                </Typography>
            </div>

            <div>
                <h1>The 6 Income Streams</h1>
                <br />
                <Divider />
                <br />
                <Typography className={classes.body} variant="body2">
                    <Typography variant="h5">6. Incentive Awards</Typography>
                    <br />
                    <br />
                    Besides The Leadership Bonus, Another Way To{' '}
                    <strong>CASH Your Cummulative PV</strong> Is Via The 5 AWARDS BONUSES RAGP
                    Rewards Its Members For Exceptionally Promoting The Company & Brand!
                    <br />
                    <br />
                    <strong>RAGP Has Five AWARDS BONUSES; Namely:-</strong>
                    <br />
                    <br />
                    1. TRAVEL/TOURISM AWARD
                    <br />
                    2. SMALL CAR AWARD
                    <br />
                    3. 1st HOUSE FUNDS AWARD
                    <br />
                    4. BIG CAR AWARD
                    <br />
                    5. 2nd HOUSE FUNDS AWARD!
                    <br />
                    <br />
                    All In All, The 5 Awards Are Worth (N500,000 + N2m + N3m + N4m + N6m = ) N15.5m.
                    <br />
                    <br />
                    That Means Each RAGP Account Has The Potential Of Earning A Total Of N15.5m From
                    The AWARDS BONUSES Alone!
                    <br />
                    <br />
                    And, Best Of All, EACH MEMBER IS ALLOWED TO OWN MORE THAN ONE ACCOUNT! Î
                    <br />
                    <br />
                    Imagine You Own 10 Accounts With RAGP And You're Able To Maximize Each One Of
                    Them To Each Earn The N15.5m;
                    <br />
                    <br />
                    In Total You Get To Accumulate N15.5m × 10 = N155m!!!
                    <br />
                    <br />
                    Thats A Cool N155m From AWARDS BONUSES ALONE!!!
                    <br />
                    <br />
                    ISN'T THAT AWESOME!!!!
                    <br />
                    <br />
                    Thats Just How Lucrative & Juicy The RAGP BUSINESS PLAN IS!!!
                    <br />
                    <br />
                    <strong>
                        Following Below Is A Break Down Of The 5 AWARD BONUSES And What It Takes To
                        Earn And CASH Them:
                    </strong>
                    <br />
                    1. THE TRAVEL/TOURISM AWARD IS WORTH N500,000 CASH(OR A ONE WEEK VACATION IN
                    DUBAI); QUALIFICATION REQUIRES THE MEMBER TO HAVE A TOTAL CUMMULATIVE PV (TCPV)
                    OF 25,000PV.
                    <br />
                    2. THE SMALL CAR AWARD IS WORTH N2million CASH; QUALIFICATION REQUIRES THE
                    MEMBER TO HAVE A TOTAL CUMMULATIVE PV (TCPV) OF 60,000PV.
                    <br />
                    3: THE 1st HOUSE AWARD IS WORTH N3million CASH; QUALIFICATION REQUIRES THE
                    MEMBER TO HAVE A TOTAL CUMMULATIVE PV(TCPV) OF 100,000PV.
                    <br />
                    4. THE BIG CAR AWARD IS WORTH N4million; QUALIFICATION REQUIRES THE MEMBER TO
                    HAVE A TOTAL CUMMULATIVE PV (TCPV) OF 250,000PV.
                    <br />
                    5. THE 2nd HOUSE FUND AWARD IS WORTH N6million; QUALIFICATION REQUIRES THE
                    MEMBER TO HAVE A TOTAL CUMMULATIVE PV (TCPV) OF 500,000PV
                    <br />
                    NB: ALL THE AWARDS CAN BE WON & CLAIMED BY PLATINUM MEMBERS ONLY.
                    <br />
                    <br />
                </Typography>
            </div>
            <Typography align="center" className={classes.continueReading} variant="h6">
                THE END
            </Typography>
            <div style={baseStyles.pagination}>
                <div style={baseStyles.paginationBack}>
                    <Link to={'/' + username + '/leadership-bonus'}>
                        <Button variant="text" color="primary">
                            <span style={baseStyles.backwardIcon}>
                                <ArrowBackwardIcon />
                            </span>
                            Leadership Bonus
                        </Button>
                    </Link>
                </div>
                <div style={baseStyles.paginationForward}>
                    <Link to={'#'}>
                        <Button variant="text" color="primary">
                            The End
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default IncentiveAwards;
