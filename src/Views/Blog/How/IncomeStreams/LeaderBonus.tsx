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
import Table from '../../../../Components/Table/Table';

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

const PVs = [
    ['₦5,000', '20 PV'],
    ['₦10,000', '40 PV'],
    ['₦20,000', '60 PV'],
    ['₦30,000', '80 PV'],
    ['₦40,000', '120 PV'],
    ['₦50,000', '200 PV'],
    ['₦100,000', '400 PV'],
];

const LeaderBonus = () => {
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
                        to={`/${username}/leadership-bonus`}
                        className={[classes.breadCrumbsTextActive].join(' ')}
                    >
                        Leadership Bonus
                    </Link>
                </Typography>
            </div>

            <div>
                <h1>The 6 Income Streams</h1>
                <br />
                <Divider />
                <br />
                <Typography className={classes.body} variant="body2">
                    <Typography variant="h5">5. Leadership Bonus</Typography>
                    <br />
                    <br />
                    In RAGP, Every New Member, Upon Signing Up, Gets Assigned PV(Point Value);
                    According To Which Registration Package They Start With & Consequently How Much
                    They Pay To Start! The 7 RAGP Registration Packages & PVs Attached To Them Are
                    As Follows::
                    <Table
                        tableHeaderColor="secondary"
                        tableHead={['Amount', 'PVs']}
                        tableData={PVs}
                    />
                    <br />
                    <br />
                    PVs Are Also Assigned/Given To Existing Members When They Upgrade Their
                    Membership Status, Also According To How Much The Pay To Upgrade!
                    <br />
                    <br />
                    <strong>
                        E.g, If A Member Upgrades From Basic Package Of N10,000 To The Executive
                        Platinum Package Of N100,000, By Paying The Upgrade Fee Of N90,000, HE GETS
                        360PV Instantly Credited To His PV-WALLET!
                    </strong>
                    <br />
                    <br />
                    Hence The Only Two Ways To Get PV In RAGP Are:
                    <br />
                    1. Through “FRESH MEMBERS REGISTRATION” (By You or Your DownLines)
                    <br />
                    2. Through “MEMBERSHIP UPGRADE BY EXISTING MEMBERS” (By You or Your DownLines)!
                    <br />
                    <br />
                    PV IS ALSO CUMMULATIVE IN RAGP!!! That Means PVs Assigned To Your DownLines
                    Accrues To You [ Gets Added To Ur Own Total PV ] And Ultimately Adds Up To
                    Qualify You For Various CASH BONUSES!!!
                    <br />
                    <br />
                    And <strong>Accumulated[ or CUMMULATIVE PV ]</strong> Are Of Two Types::
                    <br />
                    TOTAL MONTHLY PV (TMPV).
                    <br />
                    TOTAL CUMMULATIVE PV(TCPV).
                    <br />
                    **TMPV Is The Total PV You Accumulate Within A Specific Month, Starting From The
                    First Day To The Last Day Of The Month Under Consideration. TMPV Accumulates In
                    Your TMPV-Wallet!
                    <br />
                    **TCPV Refers To The Totality Of Every PV That Has Ever Accrued To You From The
                    Moment You Joined RAGP Till Now. Its Essentially All Your TMPV Moved Into And
                    Gathered Together In Your TCPV-Wallet.
                    <br />
                    <br />
                    The First Of The CASH BONUSES You Get To Earn Via ACCUMULATED/TOTAL PV Is
                    LEADERSHIP BONUS!
                    <br />
                    <br />
                    To Earn The Leadership Bonus Bonus You Need To Accumulated A TOTAL MONTHLY PV Of
                    10,000PV; And That Within A Calendar Month[ From The First Day Of Each Calendar
                    Month To The 30th/31st Of The Same Month] The RAGP SYSTEM Calculates All The PVs
                    U Accumulate In Your MONTHLY PV Wallet From Every Single Person That Joins RAGP
                    Newly or Upgrades, Through You Or Any Member Of Your TEAM/DOWNLINES! YES INDEED,
                    All PVs Generated By You & Your TEAM Members Is Automatically Added To Your
                    Monthly PV Wallet! If The Total PV Accumulated In Your MONTHLY PV WALLET Amounts
                    To 10,000PV or More, YOU QUALIFY FOR THE LEADERSHIP BONUS Of N100,000 CASH
                    (Provided You’re A PLATINUM MEMBER)!
                    <br />
                    <br />
                    <strong>“10,000PV Per Month = N100,000 Per Month</strong>
                    <br />
                    <div style={{textAlign: 'center'}}>
                        <strong>AS LEADERSHIP BONUS</strong>
                    </div>
                    <br />
                    <br />
                    That Means You Can Be Earning N100,000 Monthly Passive Income From RAGP By
                    Building Your Business To The Point Where Your TEAM/NETWORK/DOWNLINES Generates
                    10,000PV For You Monthly At Will… [ I.e Your Without Effort!!!]
                    <br />
                    And You Earn Such From More Than One Account!!!
                    <br />
                    Imagine You Have 10 RAGP Accounts That Each Generates 10,000PV Every Month
                    Automatically!
                    <br />
                    <br />
                    <strong style={{textDecoration: 'underline'}}>
                        “Combined, That Fetches You N100,000 × 10 = N1,000,000 = N1m Per Month AS
                        LEADERSHIP BONUS ALONE!!!” THAT’S THE RAGP LEADERSHIP BONUS INCOME
                        POTENTIAL!!!
                    </strong>
                    <br />
                    <br />
                    <em>THAT’S THE RAGP LEADERSHIP BONUS INCOME POTENTIAL!!!</em>
                    <br />
                    <br />
                </Typography>
            </div>
            <Divider />
            <br />
            <br />
            <Typography align="center" className={classes.continueReading} variant="h6">
                Continue Reading
            </Typography>
            <div style={baseStyles.pagination}>
                <div style={baseStyles.paginationBack}>
                    <Link to={'/' + username + '/indirect-referal-commission'}>
                        <Button variant="text" color="primary">
                            <span style={baseStyles.backwardIcon}>
                                <ArrowBackwardIcon />
                            </span>
                            Indirect Referal Commission
                        </Button>
                    </Link>
                </div>
                <div style={baseStyles.paginationForward}>
                    <Link to={'/' + username + '/incentives-awards'}>
                        <Button variant="text" color="primary">
                            Incentives Awards
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

export default LeaderBonus;
