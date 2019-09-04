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

const packages = [
    ['Basic', '5,000'],
    ['Bronze', '10,000'],
    ['Silver', '20,000'],
    ['Gold', '30,000'],
    ['Diamond', '40,000'],
    ['Platinum', '50,000'],
    ['Exec. Platinum', '100,000'],
];
const referralCommissions = [
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

const DirectReferal = () => {
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
                    <Typography variant="h5">3. Direct Referral Commission</Typography>
                    <br />
                    <Typography variant="overline">The RAGP 7 Packages Are:</Typography>
                    <Table
                        tableHeaderColor="secondary"
                        tableHead={['Package', 'Amount']}
                        tableData={packages}
                    />
                    <br />
                    To join, all a prospect need to do is choose any of above packages, pay for it
                    and fill the registration form on our website{' '}
                    <Link to="rechargeandgetpaid.com">www.rechargeandgetpaid.com</Link>
                    <br />
                    <br />
                    Any package you chooses will equally make make you a ragp member, for life and
                    you can upgrade to a higher package anytime you want to. Ragp LTD pays members
                    referral commissions(RC) as instant reward for getting people to join RAGP
                    (directly or indirectly) on multi-levels ragp pays referral commissions up to 10
                    levels according to the following percentages:
                    <Table
                        tableHeaderColor="secondary"
                        tableHead={['Levels', 'Percentages']}
                        tableData={referralCommissions}
                    />
                    <br />
                    <Typography variant="h6">Direct Referral Commission(DRC):</Typography>
                    <br />
                    Drc (Direct Referral For Commission) is the instant compensation RAGP pays you
                    for personally persuading anyone to join RAGP!{' '}
                    <span style={{fontSize: 20, color: '#202124', fontWeight: 500}}>DRC = 20%</span>
                    .
                    <br />
                    And it's paid on the 1st level (for direct recruits or direct downlines): that
                    means RAGP is obligated to instantly pay you 20% of whatever amount anybody you
                    personally get to join ragp pays to start the business.
                    <br />
                    <br />
                    <Typography variant="overline">An example</Typography>
                    <br />
                    If you persuade your brother <strong>JOHN BULL</strong> to join you in ragp and
                    he opts to start with the &#8358;50,000 platinum package,
                    <br />
                    RAGP will instantly pay you 20% of the &#8358;50,000 = &#8358;10,000 ; as{' '}
                    <strong>DRC</strong> for signing up <strong>JOHN BULL</strong>,
                    <br />
                    If you go further to get your best friend <strong>JANE DOE</strong> to join your
                    ragp team, and she chooses to start with the &#8358;100,000{' '}
                    <strong>executive platinum package</strong>.
                    <br />
                    RAGP shall then instantly pay you 20% of the &#8358;100,000 which is
                    &#8358;20,000 i.e <strong>N20,000</strong> instant <strong>DRC</strong> for
                    signing up <strong>JANE DOE</strong> just imagine that.
                    <br />
                    That means you can make lots of money from <strong>drc</strong> alone.
                    <br />
                    <br />
                    <strong>
                        how much can you make from <strong>drc</strong> alone?!
                    </strong>
                    <br />
                    In RAGP, there is no limit to the number of people you can personally recruit
                    (as Direct Down Lines).
                    <br />
                    <strong>That means there is no limit to how much you can make from drc</strong>,
                    imagine that you are able to get 100 people to join your{' '}
                    <strong>RAGP Team,</strong> and each of them choses to start with the{' '}
                    <strong>&#8358;100,000 executive platinum package</strong> and, according to the
                    RAGP compensation plan, your instant reward for each of them paying{' '}
                    <strong>
                        &#8358;100,000 to start is 20% of &#8358;100,000 = &#8358;20,000
                    </strong>{' '}
                    hence from the 100 direct recruits, your{' '}
                    <strong>total drc = &#8358;20,000 × 100 = &#8358;2,000,000</strong> that’s a
                    cool <strong>&#8358;2million</strong> for merely referring 100 people to the
                    RAGP opportunity.
                    <br />
                    If I Were You, I Will Hit The Street And Get Rolling{' '}
                    <strong>SIGNING UP EXECUTIVE PLATINUMS</strong>
                    <br />
                    <br />
                    <em>
                        And That’s Not All!
                        <br />
                        Not Even The Best Part!!
                        <br />
                        Far From It
                    </em>
                    <br />
                    <br />
                    RAGP Further More Pays You INDIRECT REFERRAL COMMISSIONS(IRC), Instantly As
                    Well, WHEN ANY OF YOUR TEAM MEMBERS RECRUIT PEOPLE INTO THEIR OWN RAGP TEAM… And
                    <br />
                    <br />
                    <Typography variant="h6">
                        <strong>
                            That’s Where The Big Bucks Dey!!! Read On To Know How The IDR Works!
                        </strong>
                    </Typography>
                    <br />
                    <br />
                    Read On To Know How The IDR Works!
                </Typography>

                <br />
                <br />
                <Divider />
                <br />
                <br />
            </div>
            <Typography align="center" className={classes.continueReading} variant="h6">
                Continue Reading
            </Typography>
            <div style={baseStyles.pagination}>
                <div style={baseStyles.paginationBack}>
                    <Link to={'/' + username + '/indirect-recharge-bonus'}>
                        <Button variant="text" color="primary">
                            <span style={baseStyles.backwardIcon}>
                                <ArrowBackwardIcon />
                            </span>
                            Indirect Recharge Bonus
                        </Button>
                    </Link>
                </div>
                <div style={baseStyles.paginationForward}>
                    <Link to={'/' + username + '/indirect-referal-bonus'}>
                        <Button variant="text" color="primary">
                            Indirect Referal Bonus
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

export default DirectReferal;
