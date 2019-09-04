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
import bronzeMatrix from '../../../../assets/images/bronze-matrix.png';

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

const inDirectReferralCommissions = [
    ['1st LEVEL', '20%'],
    ['2nd LEVEL', '10%'],
    ['3rd LEVEL', '5%'],
    ['4th LEVEL', '2.5%'],
    ['5th LEVEL', '1.25%'],
    ['6th LEVEL', '1%'],
    ['7th LEVEL', '1%'],
    ['8th LEVEL', '1%'],
    ['9th LEVEL', '1%'],
    ['10th LEVEL', '1%'],
];

const IndirectReferal = () => {
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
                        The 6 Income Streams
                    </Link>
                </Typography>
            </div>

            <div>
                <h1>The 6 Income Streams</h1>
                <br />
                <Divider />
                <br />
                <Typography className={classes.body} variant="body2">
                    <Typography variant="h5">4. Indirect Referral</Typography>
                    <br />
                    In The RAGP Compensation Plan, IDC(Indirect Referral Commission) Starts From The
                    2nd LEVEL! And Is As Follows:
                    <Table
                        tableHeaderColor="secondary"
                        tableHead={['Levels', 'Percentages']}
                        tableData={inDirectReferralCommissions}
                    />
                    <Typography variant="caption">
                        NB: 1st LEVEL = 20% Is DRC(Direct Referral Commision); IRC(Indirect Referral
                        Commission) Is From 2nd LEVEL = 10% Down To The 10th LEVEL = 1%
                    </Typography>
                    <br />
                    <br />
                    <strong>What does that mean?!</strong>
                    <br />
                    It simply means RAGP pays you referral commissions not only when you personally
                    get people into ragp, but also when your own people do the same thing (sign up
                    others) and you earn when your people sign up others according to the{' '}
                    <strong>ABOVE PERCENTAGES PER LEVEL!</strong>
                    <br />
                    <br />
                    <strong>AN EXAMPLE</strong>
                    <br />
                    You recruited <strong>Jane Doe</strong>, who paid &#8358;100,000; and you were
                    paid <strong>N20,000 for that (DRC = 20% = 1st LEVEL; Remember?!)</strong>
                    <br />
                    <br />
                    <strong style={{textDecoration: 'underline'}}>
                        Jane Doe, HERE, Is Your 1st LEVEL DOWN LINE!
                    </strong>
                    <br />
                    If <strong>Jane Doe</strong> goes on to sign up her brother michael, and he too
                    opted to start with &#8358;100,000 as soon as that happens ,
                    <br />
                    RAGP Shall <strong>INSTANTLY &amp; AUTOMATICALLY</strong> Pay You{' '}
                    <strong>10% Of The N100,000 = N10,000</strong> (Because MICHAEL Is Joining As
                    Your 2nd LEVEL DOWN LINE)!
                    <br />
                    Further More, MICHAEL, Excited About The Business Opportunity, GETS HIS BEST
                    FRIEND, UCHENNA, To Join Him; And UCHENNA Pays N50,000 To Start
                    <br />
                    RAGP Shall Then, Instantly & Automatically Pay You 5% Of The N50,000 = N2,500 As
                    3rd LEVEL IRC(Indirect Referral Commission)!
                    <br />
                    <br />
                    <Typography variant="h6">
                        <strong>
                            **Remember You Did Not Personally Recruit Both MIKE &amp; UCHENNA, Yet
                            You Earned N10,000(10% × N100,000) & N2,500(5% × N50,000) From Them!
                            This Is INDIRECT REFERRAL COMMISSION At Work!!!
                        </strong>
                        <br />
                        An On Going Reward For Your Effort To Persuade JANE TO JOIN YOU!
                        <br />
                        That’s PURE PASSIVE INCOME FOR YOU THERE!!!
                        <br />
                        And Guess What!?
                        <br />
                        There Is No Limit To How Much You Can Make From IRC(Indirect Referral
                        Commissions)!
                        <br />
                        The More DIRECT DOWNLINES YOU RECRUIT, THE MORE YOUR POTENTIAL TO EARN
                        IRC!!!
                    </Typography>
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
                    <Link to={'/' + username + '/direct-referal-bonus'}>
                        <Button variant="text" color="primary">
                            <span style={baseStyles.backwardIcon}>
                                <ArrowBackwardIcon />
                            </span>
                            Direct Referal Bonus
                        </Button>
                    </Link>
                </div>
                <div style={baseStyles.paginationForward}>
                    <Link to={'/' + username + '/leadership-bonus'}>
                        <Button variant="text" color="primary">
                            Leadership Bonus
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

export default IndirectReferal;
