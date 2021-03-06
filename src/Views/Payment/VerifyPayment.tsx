import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { Theme } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Axios, { AxiosError } from "axios";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import Progress from "../../Components/Progress/Progress";
import Snackbar from "../../Components/Snackbar/Snackbar";

const useStyles = ((theme: Theme) => ({
	paper: {
		alignItems: "center",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly",
		minHeight: "200px",
		padding: theme.spacing.unit * 4,
	},
	toolbar: {
		...theme.mixins.toolbar,
	},
	wrapper: {
		height: "auto",
		margin: "auto " + "0" + " auto",
	},
}));

interface IProps extends RouteComponentProps {
	classes: any;
}

const VerifyPayment = (props: IProps) => {

	const { classes, location, history } = props;
	// Get the querystring
	const queryUrl = queryString.parse(location.search);
	const [loading, setLoading] = useState(false);
	const [successful, setSuccessful] = useState(false);
	const [notSuccessful, setNotSuccessful] = useState(false);
	const [invalidReference, setInvalidReference] = useState(false);
	const [networkFailed, setNetworkFailed] = useState(false);

	if (!queryUrl.trxref || !queryUrl.reference) {
		history.push("/");
	}

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const response = await Axios.post("/payment/verify-payment", { ...queryUrl });
				if (response.status === 202) {
					setSuccessful(true);

					setTimeout(() => {
						history.push("/dashboard/overview");
					}, 3000);
				}
			} catch (error) {
				const err = error as AxiosError;
				if (err.response) {
					setLoading(false);
					if (err.response.status === 400) {
						setNotSuccessful(true);
						return;
					}
					if (err.response.status === 403) {
						// Format the string
						const urlQueries = location.search.replace("?", "&");
						history.push("/login?returnUrl=" + location.pathname + urlQueries);
						return;
					}
					if (err.response.status === 404) {
						setInvalidReference(true);
						return;
					}
					if (err.response.status === 408) {
						setNetworkFailed(true);
						return;
					}
				}
			}
			setLoading(false);
		})();

	}, []);

	return (
		<>
			<Progress show={loading} />
			<div className={classes.toolbar} />
			<Grid className={classes.wrapper} container={true} justify="center">
				<Grid xs={12} sm={8} md={6} className={classes.paper}>
					<Typography variant="h6" align="center">Verifying your payment please wait.</Typography>
					{loading ? <CircularProgress /> : null}
					{successful ? <Typography variant="body1">Payment successful redirecting to dashboard</Typography> : null}
					{networkFailed ? <Typography style={{ color: "red" }}>Bad network try reloading the page </Typography> : null}
					{notSuccessful ? <Typography style={{ color: "red" }}>Transaction not successful </Typography> : null}
					{invalidReference ? <Typography style={{ color: "red" }}>Transaction reference does not exist</Typography> : null}
				</Grid>
			</Grid>
		</>
	);
};

export default withStyles(useStyles as any)(VerifyPayment);
