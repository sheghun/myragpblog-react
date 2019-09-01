// cSpell:ignore overline RAGP DMPI

import React, { useContext } from "react";

// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// @material-ui icons
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackwardIcon from "@material-ui/icons/ArrowBack";

// Base styles
import {
    faintColor,
    pagination,
    paginationBack,
    forwardIcon,
    backwardIcon
} from "../../../../baseStyles";
import { BlogContext } from "../../../../Context";
import { Link } from "react-router-dom";

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
        "&:hover": {
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
        color: faintColor
    }
});

const WhatIs = props => {
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
                        What is RAGP?
                    </Link>
                </Typography>
            </div>
            <h1>What is Recharge and get paid?!</h1>
            <br />
            <br />
            <Typography className={classes.body} variant="body2">
                <strong>RAGP</strong> is an acronym that stands for Recharge And
                Get Paid.
                <br />
                The brain child of Recharge And Get Paid Ltd, RAGP is a business
                opportunity amd money making system designed with the singular
                aim of lifting the common man out of poverty by giving him the
                opportunity, systems, tools and inspiration to start, launch and
                grow his own telecom VTU vending business that generates for him
                massive residual income!.
                <br />
                <br />
                The end game of the ragp business plan is massive recurring
                passive income &#40;MRPI&#41; for you we are talking about you
                earning or receiving &#8358;10k, &#8358;20k, &#8358;30k,
                &#8358;50k, and even &#8358;100k daily literally; with zero
                effort residual, passive or royalty income.
                <br />
                The stuff of multi millionaires and billionaires and the best
                part is that it doesn't take much to start your ragp business
                with just &#8358;5k (minimum) to &#8358;100k (maximum) you can
                start, launch and grow your own ragp business that eventual pays
                you &#8358;10k, &#8358;20k, &#8358;30k, &#8358;50k or
                &#8358;100k daily passive income.
            </Typography>
            <div style={pagination}>
                <div style={paginationBack}>
                    <Link to={"/" + username + "/company-profile"}>
                        <Button variant="contained" color="primary">
                            <span style={backwardIcon}>
                                <ArrowBackwardIcon />
                            </span>
                            Company Profile
                        </Button>
                    </Link>
                </div>
                <div>
                    <Link to={"/" + username + "/why-ragp"}>
                        <Button variant="contained" color="primary">
                            Why Ragp?
                            <span style={forwardIcon}>
                                <ArrowForwardIcon />
                            </span>
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default withStyles(styles)(WhatIs);
