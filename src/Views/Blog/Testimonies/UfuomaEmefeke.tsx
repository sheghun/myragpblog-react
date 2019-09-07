import {StyleRulesCallback} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ArrowBackwardIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/styles';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import * as baseStyles from '../../../baseStyles';
import {BlogContext} from '../../../Context';

const useStyles = makeStyles<StyleRulesCallback>(_ => ({
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

const UfuomaEmefeke: React.FC = () => {
    // Initialize the classes
    const classes = useStyles();

    const {username} = useContext(BlogContext);

    return (
        <>
            <div className={classes.breadcrumbs} />
            <div>
                <h1>Testimonies</h1>
                <br />
                <Divider />
                <br />
                <Typography className={classes.body} variant="body2">
                    <em>
                        My 1 Year Journey In Recharge And Get Paid
                        <br />
                        <strong>
                            By Ufuoma Emefeke
                            <br />
                            May 1, 2018
                        </strong>
                    </em>
                    <br />
                    <br />
                    “Within Months, My Story changed for the best after qualifying for the
                    international trip, the car fund and the housing fund as well as monthly
                    leadership bonus for 4 consecutive months”-Ufuoma Emefeke I am Ufuoma Emefeke
                    with username Joyous4life. I became a partner of Recharge and Get Paid(RAGP) on
                    30th April 2017 after i was invited for a seminar by my now upline. I signed up
                    with a token of N5,000 because i had just come out of too many failed companies
                    and just wanted to test the waters. I wasnt employed at this time so decided to
                    give RAGP my best shot. To my amazement, my Team started growing like wildfire
                    and it has been an amazing ride. Within months, my story changed for the best
                    after qualifying for the international trip, the car fund and the housing fund
                    as well as monthly leadership bonus for 4 consecutive months.As a Team, we have
                    achieved the following so far: Numerous monthly leadership bonus qualifiers, 6
                    international trip qualifiers, 2 car fund qualifiers and 2 housing fund
                    qualifiers. We look forward to more amazing testimonies and we sincerely pray
                    RAGP gets better and better and liberates many more from the scourge of
                    unemployment, underemployment and lack.
                    <br />
                    <br />
                    <strong>Long live RAGP</strong>
                </Typography>
            </div>
            <br />
            <br />
            <br />
            <Typography align="center" className={classes.continueReading} variant="h6">
                <Link to={`/${username}/chucks-emedike`}>
                    Up Next is the testimony of Chucks Emedike aka TeamFabulous on how RAGP
                    transformed his life
                </Link>
            </Typography>
        </>
    );
};

export default UfuomaEmefeke;
