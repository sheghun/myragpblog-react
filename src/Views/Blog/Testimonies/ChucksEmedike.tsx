import {StyleRulesCallback} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
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

const ChucksEmedike: React.FC = () => {
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
                        RAGP Success Testimony
                        <br />
                        <strong>
                            By Chucks Emedike (aka teamfabulous)
                            <br />
                            April 20, 2018
                        </strong>
                    </em>
                    <br />
                    <br />
                    “To the Glory of God, I have bought a family house and some landed properties
                    for myself from this program” Chucks Emedike (AKA Teamfabulous).
                    <br />
                    My Name is Chucks Emedike. I am a Computer Engineer and the Chief Executive
                    Officer of Noche Computers and Technologies Nigeria. I came across Recharge and
                    Get Paid(RAGP) on 10-July 2015 At A Time I Was Facing some financial
                    difficulties. A good friend Of Mine, Pastor Mike Praise from Benin City, Told Me
                    About The RAGP Opportunity(May God Continue To Bless His Soul). I Took The
                    Initiative And Started With N5000, And It Has Proven To Be A Great Decision.
                    From then it has been wonderful And Unforgettable Experience. I Have Managed To
                    Turn That N5000 Into Millions Of Naira Within A Space Of 2 Years. I am Glad To
                    Say That I Have Earned So Much Millions From RAGP. I have had a cash turnover of
                    over 30Million Naira. RAGP has awarded me with N500,000 for Dubai Trip Award,
                    N2Million for The Car Award, N3Million for The House Fund Award; And I'm On The
                    Verge Of Receiving Another N4Million for The Big Car Award. And All This Is
                    Apart From The N100,000 I Earn Monthly As LEADERSHIP BONUS; Plus The Daily
                    Income From Referral Commissions And Recharge Bonuses.(DAILY PASSIVE INCOME).
                    <br />
                    <br />
                    <strong>
                        To the Glory of God, I have bought a family house and some Other landed
                        properties for myself from this program. I encourage all youths to join this
                        Divine Program that has come to wipe away poverty from our generations
                        <br />
                        <em>God Bless you</em>
                    </strong>
                    <br />
                    <br />
                    <em>
                        Emedike Chucks
                        <br />
                        (Teamfabulous)
                    </em>
                    <br />
                    <br />
                    <br />
                    I want to believe that with these testimonies you have been reassured of
                    the authenticity of the <strong>RAGP</strong> business.
                    <br />
                    I'm sure the next thing on your mind is how do I register? don't worry we have
                    that step outlined see{' '}
                    <Link style={{textDecoration: 'underline'}} to={`/${username}/how-to-register`}>
                        {' '}
                        How Do Register Myself Or Someone On RAGP
                    </Link>
                </Typography>
            </div>
        </>
    );
};

export default ChucksEmedike;
