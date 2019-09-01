// cSpell:ignore overline RAGP

import React, { useContext } from "react";

// @material-ui components
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { StyleRulesCallback } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

// @material-ui icons
import ArrowBackwardIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import BrightnessIcon from "@material-ui/icons/Brightness1";

// Personal imports
import Aux from "../../../../Hoc/Aux/Aux";

// Base Styles
import { makeStyles } from "@material-ui/styles";
import * as baseStyles from "../../../../baseStyles";
import { BlogContext } from "../../../../Context";

// Styles

const useStyles = makeStyles<StyleRulesCallback>(theme => ({
    body: {
        color: baseStyles.faintColor
    },
    breadCrumbs: {
        marginLeft: "32px",
        marginTop: "100px"
    },
    breadCrumbsSeparator: {
        display: "inline-block",
        marginLeft: "1rem",
        marginRight: "1rem"
    },
    breadCrumbsText: {
        "&:hover": {
            color: "rgba(0, 0, 0, 0.3)"
        },
        color: "rgba(0, 0, 0, 0.7)",
        fontSize: "12px",
        fontWeight: "700" as any,
        letterSpacing: "1px",
        textDecoration: "none"
    },
    breadCrumbsTextActive: {
        color: "rgba(0, 0, 0, 0.3)",
        fontSize: "12px",
        fontWeight: "700" as any,
        letterSpacing: "1px",
        textDecoration: "none"
    },
    continueReading: {
        marginBottom: "24px"
    },
    video: {
        maxWidth: "560px",
        width: "100%"
    }
}));

const WhyIs = (props: any) => {
    const classes = useStyles();
    const { username } = useContext(BlogContext);
    return (
        <Aux>
            <div className={classes.breadCrumbs}>
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
                        Why Recharge and get paid?
                    </Link>
                </Typography>
            </div>
            <div>
                <h1>Why Recharge and get paid?</h1>
                <br />
                <Divider />
                <br />
                <Typography className={classes.body} variant="body2">
                    At This Point, You Might Be Asking,{" "}
                    <strong>"WHAT IS THIS RAGP ALL ABOUT?!"</strong>
                    <br />
                    Well, In A Nutshell,{" "}
                    <strong>
                        RAGP IS ALL ABOUT YOU (YES, YOU!) BEING ABLE TO LIVE
                        YOUR DREAM LIFESTYLE!!!
                    </strong>
                    <br />
                    <br />
                    It's All About You{" "}
                    <strong>
                        MAKING THE MONEY AND THE TIME To Live The LIFESTYLE
                    </strong>{" "}
                    You've Always Dreamt Of and Wanted; But Couldn't LIVE
                    Because You Lacked Two Essential Things:{" "}
                    <strong>THE MONEY &amp; THE TIME!!!</strong> Just For A
                    Minute, IMAGINE YOU...(Yes, YOU!):
                    <br />
                    18 Months Later…
                    <br />
                    <br />
                    <strong>
                        Earning N50k or N100k As DAILY PASSIVE INCOME, For Sure
                        For Sure!?!?!? YOU CAN:
                    </strong>
                    <br />
                    Buy That DREAM Car <br />
                    Buy or Build That DREAM House <br />
                    Marry That DREAM Wife/Husband <br />
                    Start & Build That DREAM Family
                    <br />
                    Move To That DREAM Neighbourhood <br />
                    Start That DREAM Project <br />
                    Take That DREAM Vacation <br />
                    Travel To That DREAM Country <br />
                    Give Your Kids That DREAM Education
                    <br />
                    Fund/Support That DREAM Noble Cause <br />
                    Change & Impact Those LIVES <br />
                    Build & Live That DREAM LEGACY etc
                    <br />
                    <br />
                    <strong>SIMPLY FUND & LIVE YOUR DREAMS!!!</strong>
                    <br />
                    It's All About YOU MAKING THE MONEY & THE TIME TO FUND &
                    LIVE YOUR DREAM LIFESTYLE!!! It's All About You MAKING THE
                    MONEY(N50k or N100k) While You Sleep (DAILY WITH PASSIVE
                    INCOME) So, If You're All For That, READ ON; or Tap Here(A
                    LINK) To Join & Start Right Away!!! THATS WHAT RAGP IS ALL
                    ABOUT!!! So, Why Should You Join RAGP?! Cause You Have All
                    These Dreams & And You A SYSTEM/BUSINESS/MEANS To MAKE ALL
                    THE MONEY & TIME TO MAKE YOUR DREAMS COME TRUE!!! YEA!
                    THAT’S SIMPLY WHY YOU SHOULD JOIN RAGP!!! RIGHT AWAY!!! *
                    <a href="http://rechargeandgetpaid.com/register.php">
                        Tap here To Register
                    </a>
                    *
                </Typography>
            </div>
            <br />
            <br />
            <Typography
                align="center"
                className={classes.continueReading}
                variant="h6"
            >
                Continue Reading
            </Typography>
            <div style={baseStyles.pagination}>
                <div style={baseStyles.paginationBack}>
                    <Link to={"/" + username + "/what-is-ragp"}>
                        <Button variant="text" color="primary">
                            <span style={baseStyles.backwardIcon}>
                                <ArrowBackwardIcon />
                            </span>
                            What Is RAGP
                        </Button>
                    </Link>
                </div>
                <div style={baseStyles.paginationForward}>
                    <Link to={"/" + username + "/the-business-model"}>
                        <Button variant="text" color="primary">
                            The Business Model
                            <span style={baseStyles.forwardIcon}>
                                <ArrowForwardIcon />
                            </span>
                        </Button>
                    </Link>
                </div>
            </div>
        </Aux>
    );
};

export default WhyIs;
