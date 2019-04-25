// cSpell:ignore overline RAGP

import React from 'react';

// @material-ui components
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button';

// @material-ui icons
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ArrowBackwardIcon from '@material-ui/icons/ArrowBack'


// react-router-dom
import { withRouter } from 'react-router-dom';

// Helpers
import { username } from '../../../../_helpers'

// Base Styles
import * as baseStyles from '../../../../baseStyles';

// Styles

const styles = theme => ({
    breadcrumbs: {
        marginLeft: '32px',
        marginTop: '100px',
    },
    breadCrumbsSeparator: {
        display: 'inline-block',
        marginLeft: '1rem',
        marginRight: '1rem'
    },
    breadCrumbsText: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontSize: '12px',
        fontWeight: '700',
        letterSpacing: '1px',
        textDecoration: 'none',
        'and:hover': {
            color: 'rgba(0, 0, 0, 0.3)',
        }
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
        width: '100%'
    },
    body: {
        color: baseStyles.faintColor
    },
    continueReading: {
        marginBottom: '24px'
    }
});



const CompanyProfile = (props) => {
    const { classes } = props
    console.log(props)
    return (
        <>
            <div className={classes.breadcrumbs}>
                <Typography variant="overline">
                <a href={`/${username}/welcome-note`} className={classes.breadCrumbsText}>Introduction
                        <span className={classes.breadCrumbsSeparator}>/</span>
                    </a>
                    <a
                        href={`/${username}/welcome-note`}
                        className={[classes.breadCrumbsTextActive].join(' ')}
                    >
                        Recharge And Get Paid LTD
                    </a>
                </Typography>
            </div>
            <div>
                <h1>Why Recharge and get paid?</h1>
                    <br /><Divider /><br />
                <Typography className={classes.body} variant="body2">
                    <Typography variant="h6">A Brief Company Profile</Typography>
                    <br />
                    Recharge And Get Paid LTD is a Nigerian based and owned business that was launched on 3rd february 2016 (that’s just over 3 yrs ago), with the singular objective of enabling the common man i.e Nigerians and Africans specifically to create wealth and achieve financial freedom via the network marketing, e-commerce and telecom products/services vending industries.
                    <br />
                    Essentially, Ragp is an e-commerce platform that vendors airtime, Data, Dstv, Gotv, Startimes, PHCN Meter subscriptions, amongst other things, via network marketing from the onset, we setout to enable ordinary Nigerians/Africans to become extra ordinary cash-flow millionaires that earn massive daily passive income as hundreds of millions of Nigerians/Africans buy and consume these essential every day products and services!!!
                </Typography>
                <br /><br />
            </div>
                <Typography align="center" className={classes.continueReading}  variant="h6">Continue Reading</Typography>
            <div style={baseStyles.pagination}>
                <div style={baseStyles.paginationBack}>
                    <a href={"/"+username+"/what-is-RAGP"}>
                        <Button variant="contained" color="primary">
                        <span style={baseStyles.backwardIcon}><ArrowBackwardIcon /></span>
                        What is RAGP?
                    </Button>
                    </a>
                </div>
                <div style={baseStyles.paginationForward}>
                    <a href={"/"+username+"/the-business-model"}>
                    <Button variant="contained" color="primary">
                        The Business Model
                        <span style={baseStyles.forwardIcon}><ArrowForwardIcon /></span>
                    </Button>
                    </a>
                </div>
            </div>
        </>
    )
}

export default withRouter(withStyles(styles)(CompanyProfile))
