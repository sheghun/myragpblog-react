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

const BusinessModel = () => {
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
                        The Business Model
                    </Link>
                </Typography>
            </div>

            <div>
                <h1>The RAGP Business Model</h1>
                <br />
                <Divider />
                <br />
                <Typography className={classes.body} variant="body2">
                    There Are Over 150 Million ACTIVE GSM LINES In Nigeria! From All These,{' '}
                    <strong style={{textDecoration: 'underline'}}>
                        Over 3 Million AIRTIME RECHARGE
                    </strong>{' '}
                    Are Done Every Second In Nigeria!!!
                    <br />
                    <br />
                    <Typography variant="h5">
                        3 Million AIRTIME RECHARGE PER SECOND = 180 MILLION AIRTIME RECHARGE PER
                        MINUTE!!!
                    </Typography>
                    <br />
                    <br />
                    If We Reckon That Most Of These Recharge Is For N100 AIRTIME ONLY, Then It
                    Means: PER SECOND, 3,000,000 × N100 = N300m AIRTIME RECHARGE HAPPENS; And PER
                    MINUTE, 180,000,000 × N100 ={' '}
                    <strong>
                        N18bn AIRTIME Is Consumed Per Minute IN THIS COUNTRY! N18 BILLION AIRTIME
                        RECHARGE PER MINUTE; EVERY MINUTE!?
                    </strong>
                    <br />
                    <br />
                    <Typography variant="h6">
                        <strong>And Thats Just AIRTIME RECHARGE!!!</strong>
                    </Typography>
                    <br />
                    FACTOR IN DATA, CABLE TV, And ELECTRIC POWER CONSUMPTION... And Consider How
                    Stupendous The Kind Of Money We Spend On These Intangible Yet SUPER ESSENTIAL
                    Commodities DAILY!!!
                    <br />
                    <br />
                    <Typography variant="h6">
                        <strong>NOW THE BILLION NAIRA QUESTION...:</strong>
                    </Typography>
                    <br />
                    <br />
                    <Typography variant="h6">
                        <strong>
                            How Much Of This N18bn Nigerians Spend PER MINUTE On AIRTIME ALONE
                            ENTERS YOUR POCKET?!
                        </strong>
                    </Typography>
                    <br />
                    <br />
                    <Typography variant="h6">
                        <strong>
                            WHAT IF You Can Make Just A Fraction Of A Fraction; JUST 0.00001% OF
                            THIS N18 bn = N1.8m DAILY or WEEKLY or Even MONTHLY?!
                        </strong>
                    </Typography>
                    <br />
                    <br />
                    <Typography variant="h6">
                        <strong>
                            IF YOU HAD THE OPPORTUNITY TO CONNECT TO A RECHARGE VENDING SYSTEM &
                            BUILD A NETWORK IN IT THAT COULD BE PAYING N1.8m PER MONTH 18 MONTHS
                            LATER, WILL YOU TAKE IT, RUN WITH & DO EXPLOITS WITH IT?!”
                        </strong>
                    </Typography>
                    <br />
                    <br />
                    <Typography variant="h5">
                        <strong>INTERESTINGLY, THAT’S WHAT RAGP IS ALL ABOUT!!!</strong>
                    </Typography>
                    <br />
                    <br />
                    IN OUR VISION OF <strong>RAGP</strong>, WE SEE <strong>YOU</strong>[ YES, YOU!],
                    HAVING AN <strong>RAGP</strong> DOWNLINES NETWORK OF OVER{' '}
                    <strong>100,000</strong> PEOPLE[ALL CONNECTED TO <strong>RAGP</strong> THROUGH{' '}
                    <strong>YOU</strong>], WHO HABITUALLY BUY THEIR AIRTIME SUBSCRIPTIONS, DATA
                    SUBSCRIPTIONS, DSTV/GOTV/STARTIMES SUBSCRIPTIONS, PHCN PREPAID METER
                    SUBSCRIPTIONS, EACH USING THEIR OWN <strong>RAGP</strong> DASHBOARDS/VTU
                    ACCOUNTS, AND YOU GET PAID AT LEAST N50 PER MONTH FOR THAT!!!
                    <br />
                    <br />
                    <strong>
                        That Means You Get To Be Making N50 PER MONTH × 100,000 SUBSCRIBERS = N5m
                        PER MONTH [PURE PASSIVE INCOME]!!!
                    </strong>
                    <br />
                    <br />
                    CAN YOU IMAGINE YOURSELF MAKING N5m PER MONTH[PURE PASSIVE INCOME] As People
                    Habitually Service Their ADDICTION TO MOBILE PHONES, ELECTRICITY & CABLE TV?!
                    <br />
                    <br />
                    <Typography variant="h6">
                        <strong>AND WE BELIEVE YOU CAN DO EVEN BETTER THAN THAT!!!</strong>
                    </Typography>
                    <br />
                    <br />
                    IF YOU RE INTERESTED IN SUCH INCOME, THEN START WORKING IT OUT NOW BY JOINING
                    RAGP & BUILDING A NETWORK OF ADDICTED TELECOM SUBSCRIBERS RIGHT NOW!!!
                    <br />
                    <br />
                    <em>That, Simply, IS The RAGP Business Model!!!</em>
                </Typography>
            </div>
            <Typography align="center" className={classes.continueReading} variant="h6">
                Continue Reading
            </Typography>
            <div style={baseStyles.pagination}>
                <div style={baseStyles.paginationBack}>
                    <Link to={'/' + username + '/why-ragp'}>
                        <Button variant="text" color="primary">
                            <span style={baseStyles.backwardIcon}>
                                <ArrowBackwardIcon />
                            </span>
                            Why RAGP
                        </Button>
                    </Link>
                </div>
                <div style={baseStyles.paginationForward}>
                    <Link to={'/' + username + '/the-6-income-streams'}>
                        <Button variant="text" color="primary">
                            The 6 Income Streams
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

export default BusinessModel;
