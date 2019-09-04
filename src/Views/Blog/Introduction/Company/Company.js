// cSpell:ignore overline RAGP

import React, { useContext } from "react";

// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

// @material-ui icons
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackwardIcon from "@material-ui/icons/ArrowBack";
import { BlogContext } from "../../../../Context";

// react-router-dom
import { withRouter, Link } from "react-router-dom";

// Base Styles
import * as baseStyles from "../../../../baseStyles";

// Styles

const styles = theme => ({
    breadcrumbs: {
        marginLeft: "32px",
        marginTop: "100px"
    },
    breadCrumbsSeparator: {
        display: "inline-block",
        marginLeft: "1rem",
        marginRight: "1rem"
    },
    breadCrumbsText: {
        color: "rgba(0, 0, 0, 0.7)",
        fontSize: "12px",
        fontWeight: "700",
        letterSpacing: "1px",
        textDecoration: "none",
        "and:hover": {
            color: "rgba(0, 0, 0, 0.3)"
        }
    },
    breadCrumbsTextActive: {
        color: "rgba(0, 0, 0, 0.3)",
        fontSize: "12px",
        fontWeight: "700",
        letterSpacing: "1px",
        textDecoration: "none"
    },
    video: {
        maxWidth: "560px",
        width: "100%"
    },
    body: {
        color: baseStyles.faintColor
    },
    continueReading: {
        margin: "4rem auto 4rem"
    }
});

const CompanyProfile = props => {
    const { classes } = props;

    const { username } = useContext(BlogContext);

    return (
        <>
            <div className={classes.breadcrumbs}>
                <Typography variant="overline">
                    <Link
                        to={`/${username}/welcome-note`}
                        className={classes.breadCrumbsText}
                    >
                        Introduction
                        <span className={classes.breadCrumbsSeparator}>/</span>
                    </Link>
                    <Link
                        to={`/${username}/welcome-note`}
                        className={[classes.breadCrumbsTextActive].join(" ")}
                    >
                        Recharge And Get Paid LTD
                    </Link>
                </Typography>
            </div>
            <div>
                <h1>Our Company Profile</h1>
                <br />
                <Divider />
                <br />
                <Typography className={classes.body} variant="body2">
                    <Typography variant="h6">
                        A Brief Company Profile
                    </Typography>
                    <br />
                    Recharge And Get Paid LTD Is A Nigerian Based/Owned Business
                    That Was Launched On 3rd February 2016 (That’s Just Over 3
                    Years Ago){" "}
                    <strong>
                        WITH THE SINGULAR OBJECTIVE OF ENABLING THE COMMON MAN
                        (NIGERIANS/AFRICANS SPECIFICALLY) TO CREATE WEALTH &amp;
                        ACHIEVE FINANCIAL FREEDOM VIA The NETWORK MARKETING,
                        e-COMMERCE &amp; TELECOM PRODUCTS/SERVICES VENDING
                        INDUSTRIES!!!
                    </strong>
                    <br />
                    <br />
                    Essentially, <strong>RAGP</strong> is an{" "}
                    <strong>
                        e-commerce platform that vendors airtime, data, dstv,
                        gotv, startimes, phcn meter subscriptions, amongst other
                        things, via network marketing.
                    </strong>
                    <br />
                    <br />
                    From The Onset, We Set Out To Enable Ordinary
                    Nigerians/Africans{" "}
                    <strong>
                        TO BECOME EXTRA ORDINARY CASH-FLOW MILLIONAIRES THAT
                        EARN MASSIVE DAILY PASSIVE INCOME AS HUNDREDS OF
                        MILLIONS OF NIGERIANS/AFRICANS BUY & CONSUME THESE
                        ESSENTIAL EVERY DAY PRODUCTS & SERVICES!!!
                    </strong>
                    <br />
                    <br />
                    <Typography variant="h6">
                        And We’ve Been Doing Just That!!!
                    </Typography>
                    <br />
                    In The Past 3 Yrs We've Empowered Over <strong>
                        1000
                    </strong>{" "}
                    Nigerians To Become CASH-FLOW MILLIONAIRES That Make At
                    Least <strong>&#8358;50,000 DAILY PASSIVE INCOME!!!</strong>{" "}
                    Recharge And Get Paid LTD, is Registered With The CAC In
                    Nigeria(RC:1279919), Is Owned By Experienced Entrepreneurs &
                    Seasoned Network Marketers, THAT HAVE SET THEIR HEARTS ON
                    IMPROVING THE WELL BEING OF THE COMMON MAN By Providing Him
                    With A Very Simple, Fast, Effective & Super Lucrative
                    Business System He Can Start With As Little As{" "}
                    <strong>&#8358;5,000;</strong> PLUS{" "}
                    <strong>The Tools & Support Systems</strong> He Needs To
                    Build & Grow It Into Multi Million Naira Business In A very
                    Short Time!!!
                    <br />
                    <br />
                    <strong>
                        We Strongly Believe That With Enough Desire &
                        Seriousness, You Can Join/Start RAGP With Just
                        &#8358;5,000 And Go On To LAUNCH, BUILD & GROW IT INTO A
                        BUSINESS THAT PAYS YOU N10K TO &#8358;50K DAILY PASSIVE
                        INCOME Within 18 Months!:; And Amass/Accumulate Over
                        N10m In The Process Of Doing That!!!
                    </strong>
                    <br />
                    <br />
                    <strong>RECHARGE AND GET PAID</strong> Has Created The Most
                    Lucrative Compensation Plan In History Of Entrepreneurship &
                    Network Marketing!!!
                    <br />
                    We Sincerely Believe You Can Completely Turn Your Financial
                    Status Around RADICALLY & POSITIVELY By Taking Full
                    Advantage Of Our Business Plan, Business Model &
                    Compensation Plan!!!
                </Typography>
                <br />
                <br />
                <em>Welcome To The RAGP Nation!!!</em>
            </div>
            <Typography
                align="center"
                className={classes.continueReading}
                variant="h6"
            >
                Continue Reading
            </Typography>
            <div style={baseStyles.pagination}>
                <div style={baseStyles.paginationBack}>
                    <Link to={"/" + username + "/welcome-note"}>
                        <Button variant="text" color="primary">
                            <span style={baseStyles.backwardIcon}>
                                <ArrowBackwardIcon />
                            </span>
                            Welcome Note
                        </Button>
                    </Link>
                </div>
                <div style={baseStyles.paginationForward}>
                    <Link to={"/" + username + "/what-is-ragp"}>
                        <Button variant="text" color="primary">
                            What Is RAGP
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

export default withRouter(withStyles(styles)(CompanyProfile));
