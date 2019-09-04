import React, {useContext} from 'react';

// @material-ui components
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

// @material-ui icons
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackwardIcon from '@material-ui/icons/ArrowBack';

// Personal components
import Table from '../../../Components/Table/Table';

// react-router-dom
import {withRouter, Link} from 'react-router-dom';

// Base Styles
import * as baseStyles from '../../../baseStyles';
// Images
import bronzeMatrix from '../../../assets/images/bronze-matrix.png';
import {BlogContext} from '../../../Context';

// Styles

const styles = theme => ({
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
        fontWeight: '700',
        letterSpacing: '1px',
        textDecoration: 'none',
        'and:hover': {
            color: 'rgba(0, 0, 0, 0.3)',
        },
    },
    breadCrumbsTextActive: {
        color: 'rgba(0, 0, 0, 0.3)',
        fontSize: '12px',
        fontWeight: '700',
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
});

const Compensation = props => {
    const {classes} = props;
    const {username} = useContext(BlogContext);

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
    return (
        <>
            <div className={classes.breadcrumbs}>
                <Typography variant="overline">
                    <Link to={`/${username}/welcome-note`} className={classes.breadCrumbsText}>
                        Introduction
                        <span className={classes.breadCrumbsSeparator}>/</span>
                    </Link>
                    <Link
                        to={`/${username}/welcome-note`}
                        className={[classes.breadCrumbsTextActive].join(' ')}
                    >
                        Recharge And Get Paid LTD
                    </Link>
                </Typography>
            </div>
            <div>
                <h1>The 6 Ways To Make Money From RAGP</h1>
                <br />
                <Divider />
                <br />
                <Typography className={classes.body} variant="body2">
                    <Typography variant="h5">3. Direct Referral Commission</Typography>
                    <br />
                    <Typography variant="overline">The RAGP 7 Packages Are:</Typography>
                    <Table
                        tableHeaderColor="secondary"
                        tableHead={['', 'Package', 'Amount']}
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
                        tableHead={['', 'Levels', 'Percentages']}
                        tableData={referralCommissions}
                    />
                    <br />
                    <Typography variant="h6">Direct Referral Commission(DRC):</Typography>
                    <br />
                    Drc (Direct Referral For Commission) is the instant compensation RAGP pays you
                    for personally persuading anyone to join RAGP!{' '}
                    <span style={{fontSize: '20px', color: '#202124', fontWeight: '500'}}>
                        DRC = 20%
                    </span>
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
                    <Divider />
                    <br />
                    <Typography variant="h5">4. Indirect Referral</Typography>
                    <br />
                    In The RAGP Compensation Plan, IDC(Indirect Referral Commission) Starts From The
                    2nd LEVEL! And Is As Follows:
                    <Table
                        tableHeaderColor="secondary"
                        tableHead={['', 'Levels', 'Percentages']}
                        tableData={inDirectReferralCommissions}
                    />
                    <br />
                    <Link to={bronzeMatrix}>
                        <img
                            src={bronzeMatrix}
                            className={classes.matrixImage}
                            alt="bronze matrix"
                        />
                    </Link>
                    <Typography variant="caption">
                        NB: 1st LEVEL = 20% Is DRC (Direct Referral Commission) IRC (Indirect
                        Referral Commission) Is From 2nd LEVEL = 10% Down To The 10th LEVEL = 1%
                    </Typography>
                    <br />
                    <br />
                    <strong>What does that mean?!</strong>
                    <br />
                    It simply means RAGP pays you referral commissions not only when you personally
                    get people into ragp, but also when your own people do the same thing (sign up
                    others) and you earn when your people sign up others according to the above
                    percentages per level!
                    <br />
                    <br />
                    <Typography variant="overline">An example</Typography>
                    <br />
                    You recruited <strong>Jane Doe</strong>, who paid &#8358;100,000; and you were
                    paid N20,000 for that (DRC = 20% = 1st LEVEL; Remember?!)
                    <br />
                    <strong>Jane Doe, HERE, Is Your 1st LEVEL DOWN LINE!</strong>
                    <br />
                    If <strong>Jane Doe</strong> goes on to sign up her brother michael, and he too
                    opted to start with &#8358;100,000 as soon as that happens, RAGP Shall INSTANTLY
                    & AUTOMATICALLY Pay You 10% Of The N100,000 = N10,000 (Because MICHAEL Is
                    Joining As Your 2nd LEVEL DOWN LINE)! Further More, MICHAEL, Excited About The
                    Business Opportunity, GETS HIS BEST FRIEND, UCHENNA, To Join Him; And UCHENNA
                    Pays N50,000 To Start
                </Typography>

                <br />
                <br />
            </div>
            <Typography align="center" className={classes.continueReading} variant="h6">
                Continue Reading
            </Typography>
            <div style={baseStyles.pagination}>
                <div style={baseStyles.paginationBack}>
                    <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={'/' + username + '/what-is-RAGP'}
                    >
                        <Button variant="contained" color="primary">
                            <span style={baseStyles.backwardIcon}>
                                <ArrowBackwardIcon />
                            </span>
                            What is RAGP?
                        </Button>
                    </Link>
                </div>
                <div style={baseStyles.paginationForward}>
                    <Link to={'/' + username + '/the-business-model'}>
                        <Button variant="contained" color="primary">
                            The Business Model
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

export default withRouter(withStyles(styles)(Compensation));
