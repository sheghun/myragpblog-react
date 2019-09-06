// @material-ui components
import {StyleRulesCallback} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import MenuIcon from '@material-ui/icons/Menu';
import React, {useContext} from 'react';
// react-router-dom
import {Link, withRouter} from 'react-router-dom';

// Styles
import {makeStyles} from '@material-ui/styles';
import {faintColor} from '../../../../baseStyles';
import {BlogContext} from '../../../../Context';

const useStyles = makeStyles<StyleRulesCallback>(theme => ({
    breadCrumbsSeparator: {
        display: 'inline-block',
        marginLeft: '1rem',
        marginRight: '1rem',
    },
    breadCrumbsText: {
        '&:hover': {
            color: 'rgba(0, 0, 0, 0.3)',
        },
        color: 'rgba(0, 0, 0, 0.7)',
        fontSize: '12px',
        fontWeight: '700' as any,
        letterSpacing: '1px',
        textDecoration: 'none',
    },
    breadCrumbsTextActive: {
        color: 'rgba(0, 0, 0, 0.3)',
        fontSize: '12px',
        fontWeight: '700' as any,
        letterSpacing: '1px',
        textDecoration: 'none',
    },
    breadcrumbs: {
        marginLeft: '32px',
        marginTop: '30px',
    },
    pagination: {
        display: 'flex',
    },
    video: {
        maxWidth: '560px',
        width: '100%',
    },
}));

const Welcome: React.FC<any> = () => {
    const classes = useStyles();
    const {username, name} = useContext(BlogContext);

    return (
        <>
            <div className={classes.breadcrumbs}>
                <Typography variant="overline">
                    <Link
                        to={`/${username}/welcome-note`}
                        className={[classes.breadCrumbsTextActive].join(' ')}
                    >
                        Welcome Note
                    </Link>
                </Typography>
            </div>
            <h1>Welcome Note</h1>
            <br />
            <br />
            <Typography variant="body2" style={{color: faintColor}}>
                Welcome!
                <br />
                My Name Is {name} And This Is My RAGP-Blog!!!
                <br />
                <br />
                This Is An Information SYSTEM Designed & Intended To Furnish You With The Complete,
                Relevant & Essential Information On The RAGP Business Opportunity & Program...
                <br />
                <br />
                SO THAT YOU CAN MAKE THE SMART DECISION TO IMMEDIATELY START, LAUNCH & GROW YOUR OWN
                MULTI-MILLION NAIRA RAGP BUSINESS!
                <br />
                <br />
                RAGP Is A Very Simple, Powerful & Super Lucrative Business That Has Already
                Empowered Thousands Of Nigerians To BECOME FINANCIALLY INDEPENDENT CASH-FLOW
                MILLIONAIRES;[Tap Here(A Link To A Section On RAGP TRACK RECORD) To VIEW OUR TRACK
                RECORD]
                <br />
                <br />
                By Enabling Them To START, LAUNCH & GROW Their Own TELECOM VTU VENDING/RECHARGE
                BUSINESSES That Pays Them N10k, N20k, N30k, N50k and Even N100k DAILY PASSIVE
                INCOME!
                <br />
                “And, Best Of All, They Each Started With N5k To N100k!!!”
                <br />
                <br />
                <Typography variant={'h6'} style={{textDecoration: 'underline'}}>
                    <strong>
                        We Believe You Can Do Even Better & HEREBY Provide You With All The The
                        Info, Systems, Tools & Guidelines You Need To Do So.
                    </strong>
                </Typography>
            </Typography>
            <br />
            <br />
            <Typography variant="h6">Let's Get Started</Typography>
            <Typography>
                <Link to={`/${username}/company-profile`}>
                    <Typography className={classes.nextButton}>
                        Introduction <ArrowForwardIcon style={{marginBottom: '-0.35rem'}} />
                    </Typography>
                </Link>
                <Typography>Or</Typography>
                <Typography>
                    Click on <MenuIcon style={{marginBottom: '-0.35rem'}} /> menu bar
                </Typography>
            </Typography>
        </>
    );
};

export default withRouter(Welcome);
