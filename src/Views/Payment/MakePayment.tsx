
import AppBar from "@material-ui/core/AppBar";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { Theme } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/StarBorder";
import ArrowBackwardIcon from '@material-ui/icons/ArrowBack'
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import Axios, { AxiosError } from "axios";
// @ts-ignore
import PaystackButton from 'react-paystack';
import Progress from "../../Components/Progress/Progress";

// Type for the tier
interface ITier {
	buttonText: string;
	buttonVariant: ButtonProps["variant"];
	description: string[];
	title: string;
	price: string;
	subheader?: string;
}

// Props interface
interface IProps extends RouteComponentProps {
	classes: any;
}

const useStyles = ((theme: Theme) => ({
	"@global": {
		body: {
			backgroundColor: "white",
			boxSizing: "border-box",
		},
		ul: {
			margin: 0,
			padding: 0,
		},
		li: {
			listStyle: "none",
		},
	},
	"appBar": {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	"button": {
		margin: "-100px auto 0 !important",
		width: "70% !important",
	},
	"card": {
		minHeight: "300px",

	},
	"cardContent": {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly",
		minHeight: "250px",
	},
	"link": {
		margin: theme.spacing.unit * 1 + " " + theme.spacing.unit * 1.5,
	},
	"heroContent": {
		boxSizing: "border-box",
		marginLeft: "auto",
		marginRight: "auto",
		padding: theme.spacing.unit * 1.2 + "px " + theme.spacing.unit * 0 + "px " + theme.spacing.unit * 4 + "px",
	},
	"tiers": {
		marginLeft: "auto",
		marginRight: "auto",
		maxWidth: "960px",
		[theme.breakpoints.down("sm")]: {
			paddingLeft: theme.spacing.unit * 2,
			paddingRight: theme.spacing.unit * 2,
		}
	},
	"cardHeader": {
		backgroundColor: "#fff",
	},
	"cardPricing": {
		alignItems: "center",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		marginBottom: theme.spacing.unit * 2,
		marginTop: "-3rem",
	},
	"footer": {
		borderTop: `1px solid ${theme.palette.divider}`,
		marginTop: theme.spacing.unit * 8,
		paddingBottom: theme.spacing.unit * 3,
		paddingTop: theme.spacing.unit * 3,
		[theme.breakpoints.up("sm")]: {
			paddingBottom: theme.spacing.unit * 6,
			paddingTop: theme.spacing.unit * 6,
		},
	},
	"subHeader": {
		// lineHeight: "1.2 !important",
		// marginTop: "16px !important",
	},
	"toolbar": {
		...theme.mixins.toolbar
	},
}));

const tiers: any = [
	{
		buttonText: "Pay one time",
		buttonVariant: "outlined",
		description: [
			"One Time Payment",
			"Pay yourself when your package expires",
		],
		price: "2,500",
		subheader: "One Time Payment pay yourself when your package expires",
		title: "One Month",
	},
	{
		buttonText: "Subscribe",
		buttonVariant: "contained",
		description: [
			"Pay continuously",
			"Automatically charged when your package expires",
		],
		price: "2,000",
		subheader: "Pay continuously you're automatically charged when your package expires",
		title: "Subscription",
	},
];
const footers = [
	{
		description: ["Team", "History", "Contact us", "Locations"],
		title: "Company",
	},
	{
		description: ["Cool stuff", "Random feature", "Team feature", "Developer stuff", "Another one"],
		title: "Features",
	},
	{
		description: ["Resource", "Resource name", "Another resource", "Final resource"],
		title: "Resources",
	},
	{
		description: ["Privacy policy", "Terms of use"],
		title: "Legal",
	},
];

const MakePayment = (props: IProps) => {

	const { classes, location, history } = props;

	const [loading, setLoading] = useState(false);

	/**
	 * Processes the one time payment method
	 *
	 */
	const payOneTimeBill = async () => {
		setLoading(true);
		// send payment request to the server
		try {
			const response = await Axios.post("payment/pay-once", { packageId: 1 });
			if (response.status === 200) {
				// Grab the data
				const { data } = response;
				window.location.href = data.authorizationUrl;
			}
		} catch (error) {
			const err = error as AxiosError;
			if (err.response) {
				if (err.response.status === 403) {
					history.push("/login?returnUrl" + location.pathname);
				}
			}
		}
		setLoading(false);
	};

	/**
	 * Processes the subscription payment
	 *
	 */
	const paySubscriptionBill = async () => {
		// send payment request to the server
		try {
			const response = await Axios.post("payment/pay-subscription");
			console.log(response);
		} catch (error) {
			const err = error as AxiosError;
			if (err.response) {
				if (err.response.status === 403) {
					history.push("/login?returnUrl" + location.pathname)
				}
			}
		}
	};

	/**
	 * Checks the title  to know the tier and calls the tier function
	 *
	 * @param title string
	 *
	 */
	const submit = (title: string) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		if (title === "One Month") {
			payOneTimeBill();
			return;
		}
		paySubscriptionBill();
	};

	return (
		<>
			{/* <AppBar color="secondary">
				<Toolbar>
					<ArrowBackwardIcon />
			</Toolbar>
			</AppBar> */}
			<div className={classes.toolbar} />
			<Progress show={loading} />
			<CssBaseline />
			<main style={{ maxWidth: "600px" }} className={classes.heroContent}>
				<Typography variant="h4" align="center" color="textPrimary" gutterBottom={true}>
					Pricing
			</Typography>
				<Typography variant="h6" align="center" color="textSecondary" component="p">
					Select your package
			</Typography>
			</main>
			{/* End hero unit */}
			<main className={classes.tiers}>
				<Grid container={true} spacing={8} alignItems="flex-end" justify="center">
					{tiers.map((tier: ITier) => (
						// Enterprise card is full width at sm breakpoint
						<Grid item={true} className={classes.grid} key={tier.title} justify="center" xs={12} sm={4}>
							<Card className={classes.card}>
								<CardHeader
									title={tier.title}
									titleTypographyProps={{ align: "center" }}
									subheaderTypographyProps={{ align: "center", variant: "subtitle2", className: classes.subHeader }}
									subheader={tier.subheader}
									action={tier.title === "Pro" ? <StarIcon /> : null}
									className={classes.cardHeader}
								/>
								<CardContent className={classes.cardContent}>
									<div className={classes.cardPricing}>
										<Typography component="h2" variant="h3" color="textPrimary">
											₦{tier.price}
										</Typography>
										<Typography variant="h6" color="textSecondary">
											per month
                    					</Typography>
									</div>
								</CardContent>
								<CardActions>
									<Button
										className={classes.button}
										fullWidth={true}
										onClick={submit(tier.title)} variant={tier.buttonVariant}
										color="primary"
									>
										{tier.buttonText}
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</main>
		</>
	);
};

export default withStyles(useStyles as any)(MakePayment);
