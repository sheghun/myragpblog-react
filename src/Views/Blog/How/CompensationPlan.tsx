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
import Quote from '../../../Components/Typography/Quote';
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

const IncomeStreams = () => {
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
                        to={`/${username}/welcome-note`}
                        className={[classes.breadCrumbsTextActive].join(' ')}
                    >
                        The RAGP Compensation Plan
                    </Link>
                </Typography>
            </div>

            <div>
                <h1>The RAGP Compensation Plan</h1>
                <br />
                <Divider />
                <br />
                <Typography className={classes.body} variant="body2">
                    <Typography variant="h6">
                        <strong>
                            (A): There Are Essentially TWO KEY WAYS To Make Money From RAGP,
                            Namely:-
                        </strong>
                    </Typography>
                    1. When You RECHARGE(i.e RECHARGE BONUS, RB)
                    <br />
                    2. When You REFER PEOPLE(i.e REFERRAL COMMISSION, RC):
                    <br />
                    <br />
                    <Typography variant="h6">
                        <strong>(B): REFERRAL COMMISSION(RC) Comes To You In Two Ways:-</strong>
                    </Typography>
                    1. As Instant Cash(In Your e-WALLET);
                    <br />
                    2. As PV(Point Value)
                    <br />
                    <br />
                    <Typography variant="h6">
                        <strong>Further More, The PV Comes In Two Forms:-</strong>
                    </Typography>
                    1. As MONTHLY PV(MPV)
                    <br />
                    2. As CUMMULATIVE PV(CPV)
                    <br />
                    <br />
                    <Typography variant="h6">
                        <strong>
                            Hence Upon Starting, On Your DashBoard, You Have 3 Wallets To Receive
                            Your Earnings:-
                        </strong>
                    </Typography>
                    1. e-WALLET
                    <br />
                    2. MPV Wallet
                    <br />
                    3. CPV Wallet
                    <br />
                    <br />
                    <Typography variant="h6">
                        <strong>(C): RECHARGE BONUS(RB) Are Of Two Types:-</strong>
                    </Typography>
                    1. Direct Recharge Bonus(DRB)
                    <br />
                    2. InDirect Recharge Bonus
                    <br />
                    <br />
                    <strong>
                        ✓ You Earn DRB When You Personally Buy Anything From RAGP Using Your RAGP
                        DashBoard.
                        <br />✓ You Earn IDB When Others(Your DownLines) Buy Anything From RAGP
                        Using Their RAGP DashBoards.
                    </strong>
                    <br />
                    <br />
                    <Typography variant="h6">
                        <strong>REFERRAL COMMISSION(RC), Also, Are Of Two Types:-</strong>
                    </Typography>
                    1. Direct Referral Commission(DRC)
                    <br />
                    2. Indirect Referral Commission(IRC)
                    <br />
                    <br />
                    <strong>
                        ✓ You Earn DRC When You Personal Recruit People To Register As RAGP Members,
                        As Your DIRECT DOWNLINES.
                        <br />✓ You Earn IRC When Your DOWNLINES(Direct & Indirect) Recruit People
                        To Register As RAGP Members, As Their Own DownLines!
                    </strong>
                    <br />
                    <br />
                    <Typography variant="h6">
                        <strong>
                            (E): All Together, The RAGP BUSINESS PLAN Gives You 6 Ways To Make Money
                            From RAGP These Are:-
                        </strong>
                    </Typography>
                    1. DIRECT RECHARGE BONUS(DRB)
                    <br />
                    2. INDIRECT RECHARGE BONUS(IDB)
                    <br />
                    3. DIRECT REFERRAL COMMISSION(DRC)
                    <br />
                    4. INDIRECT REFERRAL COMMISSION(IRC) 5. LEADERSHIP BONUS(Via MPV)
                    <br />
                    6. INCENTIVE AWARDS(Via CPV).
                    <br />
                    <br />
                    <Typography variant="h6">
                        <strong>These Are The 6 Ways People Make Millions From RAGP ...</strong>
                    </Typography>
                    <br />
                    <br />
                    <em>
                        Let's Take An In-Depth Look At These 6 Powerful RAGP Cash-Flow STREAMS...
                    </em>
                    <br />
                    <br />
                </Typography>
            </div>
            <Typography align="center" className={classes.continueReading} variant="h6">
                Continue Reading
            </Typography>
            <div style={baseStyles.pagination}>
                <div style={baseStyles.paginationBack}>
                    <Link to={'/' + username + '/the-business-model'}>
                        <Button variant="text" color="primary">
                            <span style={baseStyles.backwardIcon}>
                                <ArrowBackwardIcon />
                            </span>
                            The Business Model
                        </Button>
                    </Link>
                </div>
                <div style={baseStyles.paginationForward}>
                    <Link to={'/' + username + '/direct-recharge-bonus'}>
                        <Button variant="text" color="primary">
                            Direct Recharge Bonus
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

export default IncomeStreams;
