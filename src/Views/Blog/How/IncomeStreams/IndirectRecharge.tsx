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

const IndirectRecharge = () => {
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
                        to={`/${username}/indirect-recharge-bonus`}
                        className={[classes.breadCrumbsTextActive].join(' ')}
                    >
                        Indirect Recharge Bonus
                    </Link>
                </Typography>
            </div>
            <div>
                <h1>Indirect Recharge Bonus (IRB) </h1>
                <br />
                <Divider />
                <br />
                <Typography className={classes.body} variant="body2">
                    As An RAGP Member, You Get The Rare Privilege Of Earning Money/Cash Bonus When
                    Other People, Your DownLines, Buy AIRTIME, DATA, DStv, GOtv, STARTIMES &amp;
                    PHCN SUBSCRIPTIONS From Their Own RAGP Dashboard According The Following
                    Percentages :-
                    <br />
                    <br /> AIRTIME = 0.35%
                    <br /> DATA = 1%
                    <br /> DStv = &#8358;10
                    <br /> GOtv = &#8358;10
                    <br /> STARTIMES = &#8358;10
                    <br /> PHCN BILLS = &#8358;10
                    <br />
                    <br />
                    <Typography variant="h6">
                        <strong>Meaning ...</strong>
                    </Typography>
                    <br />
                    <strong>
                        If A DownLine Of Yours Buys AIRTIME Of, Say, &#8358;2000,{' '}
                        <Typography variant="h6" align="center">
                            You GET PAID
                        </Typography>
                    </strong>
                    <Typography variant="h5" align="center">
                        <strong>0.35% Of The &#8358;2000 = &#8358;7</strong>
                    </Typography>
                    <br />
                    <br />
                    <strong>
                        If Your DownLine Buys DATA BUNDLE Of, Say, &#8358;2000, You GET PAID 1% Of
                        The &#8358;2000 = &#8358;20
                        <Typography variant="h6" align="center">
                            You GET PAID
                        </Typography>
                    </strong>
                    <Typography variant="h5" align="center">
                        <strong>1% Of The &#8358;2000 = &#8358;20</strong>
                    </Typography>
                    <br />
                    <br />
                    If Your DownLine Buys
                    <br />
                    <strong>
                        GOtv/DStv/Startimes/PHCN Subscription Of, Say, &#8358;3000, or
                        &#8358;10,000, or &#8358;18,000, (or Whatever Amount),{' '}
                        <Typography variant="h6">You GET PAID</Typography>
                        <Typography variant="h5">
                            &#8358;10 As IRB (Indirect Recharge Bonus)
                        </Typography>
                    </strong>
                    <br />
                    <br />
                    <strong style={{fontSize: '24px'}}>IRB</strong> IS The Primary Drive, The, The
                    NEXUS Of The<strong>RAGP</strong> Business Plan, Cause It's{' '}
                    <strong style={{textDecoration: 'underline'}}>PURE PASSIVE INCOME</strong>{' '}
                    (Money You Receive With Practically Zero Effort)
                    <br />
                    <br />
                    <Typography variant="h6">
                        <strong style={{textDecoration: 'underline'}}>
                            NOW, GRAPHIC EXAMPLE OF THE POTENTIAL &amp; POWER OF The RAGP IRB
                        </strong>
                    </Typography>
                    <br />
                    <br />
                    Imagine That YOU Have 1 <strong>RAGP</strong> DownLine That Habitually Buys...
                    <br />
                    &#8358;2000 DATA BUNDLE
                    <br />
                    &#8358;3000 GOtv Subscription
                    <br />
                    &#8358;2000 AIRTIME
                    <br />
                    &#8358;5000 PHCN Subscription
                    <br />
                    <br />
                    <Typography variant="h6">MONTHLY; Using His RAGP DASHBOARD...</Typography>
                    <strong>
                        According To The Above Percentages, You Therefore GET PAID IRB(Indirect
                        Recharge Bonus) As Follows :-
                    </strong>
                    <br />
                    <br />
                    &#8358;20 IRB For The &#8358;2000 DATA
                    <br />
                    &#8358;7 IRB For The &#8358;2000 AIRTIME
                    <br />
                    &#8358;10 IRB For The GOtv Subscription
                    <br />
                    &#8358;10 IRB For The PHCN
                    <br />
                    <br />
                    Making YOU To Earn A Total IRB Of...
                    <Typography variant="h6">
                        &#8358;20 + &#8358;10 + &#8358;7 + &#8358;10 = &#8358;47
                    </Typography>
                    I.e Approximately <strong>&#8358;50</strong> Total{' '}
                    <strong>
                        IRB <span style={{textDecoration: 'underline'}}>Per Month</span>
                    </strong>{' '}
                    From This One DownLine!!
                    <br />
                    <br />
                    <Typography variant="h6">&#8358;50 PURE PASSIVE INCOME</Typography>
                    <br />
                    <br />
                    From one Person...
                    <br />
                    <br />
                    Imagine That, In The Space 2-3 Yrs, You Were Able To Build An{' '}
                    <strong>RAGP</strong> Network Of At Least <strong>100,000</strong>{' '}
                    DownLines(Direct &amp; Indirect DownLines)...
                    <br />
                    <br />
                    And You GET PAID <strong>N50 IRB</strong> Per Each Of The{' '}
                    <strong>100,000</strong> DownLines For Buying{' '}
                    <strong>
                        AIRTIME, DATA, GOtv, PHCN &amp; STARTIMES Subscriptions, AS OUTLINED
                        ABOVE...
                    </strong>
                    <br />
                    <br />
                    <Typography variant="h6">
                        <strong>That Will Enables YOU To Accumulate</strong>
                    </Typography>
                    N50 x 100,000 = N5m Per Month;
                    <strong style={{textAlign: 'center'}}>PURE PASSIVE INCOME!!!</strong>
                    <br />
                    <br />
                    Imagine That You Earn Over N5m From RAGP Strictly From People Buying{' '}
                    <strong>AIRTIME, DATA, etc, FROM RAGP?!</strong>
                    <br />
                    <br />
                    How Much Would <strong>N5m Per Month PASSIVE INCOME</strong> Affect Your
                    Lifestyle?!
                    <br />I Reckon It Would Enable Live Like A King/Queen &amp; Happily Ever After,{' '}
                    <strong>FOR THE REST OF YOUR LIFE!!!</strong>
                    <br />
                    <br />
                    THAT’S WHY IT’S ALSO CALLED ROYALTY INCOME!!!
                    <br />
                    <strong>N5m PER MONTH, PASSIVE INCOME,</strong> Will Definitely Enable YOU To
                    Live Like ROYALTY!!!
                    <br />
                    <br />
                    This Is The Main Offering Of The RAGP Business Plan!!!
                    <br />
                    Everything Else Is A Build Up To That!!!
                    <br />
                    <br />
                    RAGP Wants You To Experience
                    <br />
                    TRUE WEALTH = MASSIVE PASSIVE POSITIVE CASH-FLOW
                    <br />
                    <br />
                    Like N5m Per Month...
                    <br />
                    Even N50m Per Month
                    <br />
                    <br />
                    In Record Time...
                    <br />
                    <br />
                    Hence We Offer You...
                    <br />
                    The Simplest, Fastest, Most Effective &amp; Super Lucrative Business Opportunity
                    Ever!!!
                    <br />
                    It's Here &amp; Yours To Fully Take Advantage Of....
                    <Link to="#">
                        **[To Right Away START, LAUNCH &amp; GROW YOUR RAGP BUSINESS/NETWORK SUPER
                        FAST, Tap Here]
                    </Link>
                </Typography>
            </div>

            <Typography align="center" className={classes.continueReading} variant="h6">
                Continue Reading
            </Typography>
            <div style={baseStyles.pagination}>
                <div style={baseStyles.paginationBack}>
                    <Link to={'/' + username + '/direct-recharge-bonus'}>
                        <Button variant="text" color="primary">
                            <span style={baseStyles.backwardIcon}>
                                <ArrowBackwardIcon />
                            </span>
                            Direct Recharge Bonus
                        </Button>
                    </Link>
                </div>
                <div style={baseStyles.paginationForward}>
                    <Link to={'/' + username + '/direct-referal-bonus'}>
                        <Button variant="text" color="primary">
                            Direct Referal Commission
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

export default IndirectRecharge;
