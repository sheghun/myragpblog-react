// @material-ui components
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
// axios
import Axios, { AxiosError } from "axios";
import queryString from "query-string";
import React, { useContext, useEffect, useState } from "react";
// React router dependencies
import { RouteComponentProps } from "react-router-dom";

// Personal Components
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/styles";
import Progress from "../../Components/Progress/Progress";
import SnackbarSpinner from "../../Components/SnackbarSpinner/SnackbarSpinner";
// Context
import Context from "../../Context";

import { StyleRulesCallback, Theme } from "@material-ui/core";

// Background Image

const useStyles = makeStyles<StyleRulesCallback>((theme) => ({
	form: {
		marginTop: theme.spacing.unit,
		width: "100%", // Fix IE 11 issue.
	},
	paper: {
		alignItems: "center",
		background: "transparent",
		display: "flex",
		flexDirection: "column",
		padding: theme.spacing.unit * 1,
		width: "100%",
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
	wrapper: {
		background: `
			linear-gradient(
				to bottom right, #fff 49%, #f5f5f5 30%, #f5f5f5 89%
				)
		`,
		height: "100vh",
		width: "100vw",
	},
}));

interface IProps extends RouteComponentProps {
	classes: any;
}

const SignIn = (props: IProps) => {

	const theme = useTheme() as Theme;
	const xsmall = useMediaQuery(theme.breakpoints.down("xs"));
	const classes = useStyles();

	// Extract properties from props
	const { location, history } = props;

	const [loading, setLoading] = useState(true);
	const dispatch = useContext(Context).dispatch;
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const queryUrl = queryString.parse(location.search);
	// Check if the former url is the logout url redirect to the dashboard
	let returnUrl = !queryUrl.returnUrl ? "/user/dashboard" : queryUrl.returnUrl === "/user/logout" ?
		"/user/dashboard" : queryUrl.returnUrl;

	// Loop through the queryUrl to get the current
	if (Object.keys(queryUrl).length > 1 && typeof (queryUrl) === "object") {
		returnUrl += "?";
		for (const fragments in queryUrl) {
			if (fragments === "returnUrl") { continue; }

			returnUrl += fragments + "=" + queryUrl[fragments] + "&";
		}
	}
	// Current form to display
	const [currentForm, setCurrentForm] = useState("second");

	// Try logging user in on page mount
	useEffect(() => {
		(async () => {
			try {

				const response = await Axios.get("/member/verify-token");
				if (response.status === 200) {
					dispatch({ type: "LOGIN" });
					history.push(returnUrl as string);
				}
			} catch (error) { /* no code */ }
		})();
	}, []);

	const validate = () => {
		setError("");

		if (username.length <= 1) {
			setError("Username is required");
			return false;
		}
		if (password.length < 6) {
			setError("Password should contain a minimum of 6 characters");
			return false;
		}
		return true;
	};

	const submit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setLoading(true);
		if (!validate()) {
			return;
		}
		// Try sending request to the server
		try {
			const response = await Axios.post("/user/login", { username, password });
			if (response.status === 200) {
				if (response.data.notDone) {
					setCurrentForm("second");
					return;
				}
				dispatch({ type: "LOGIN" });
				history.push(returnUrl as string);
			}
		} catch (error) {
			const err = error as AxiosError;
			if (err.response) {
				// @ts-ignore
				if (err.response.status === 401) {
					setError("Username Or Password Incorrect");
				}
			}
		}
		setLoading(false);
	};

	switch (currentForm) {
		case "second":
			return <SecondForm {...props} />;

		default:
			return (
				<div
					className={classes.wrapper}
				>
					<SnackbarSpinner
						loading={loading}
					/>
					<Grid
						container={true}
						style={{
							height: "100%",
							width: "100%",
						}}
						justify="center"
						alignItems="center"
					>
						<Grid
							item={true}
							xs={12}
							sm={8}
							md={6}
						>
							<Paper
								className={classes.paper}
								elevation={0}
							>
								<Typography
									component="h1"
									variant="h5"
								>
									Sign in
								</Typography>
								<Typography
									variant="body1"
									color="error"
									style={{ marginTop: "1rem" }}
								>
									{error}
								</Typography>
								<form className={classes.form} onSubmit={submit}>
									<TextField
										margin="normal"
										required={true}
										fullWidth={true}
										label="Username"
										id="username"
										name="username"
										type="text"
										onChange={(event) => setUserName(event.target.value)}
										value={username}
										autoFocus={true}
									/>
									<TextField
										margin="normal"
										required={true}
										fullWidth={true}
										label="Password"
										name="password"
										id="password"
										autoComplete="current-password"
										onChange={(event) => setPassword(event.target.value)}
										value={password}
										inputProps={{
											type: "password",
										}}
									/>
									<Button
										type="submit"
										variant="contained"
										color="primary"
										className={classes.submit}
									>
										Sign in
									</Button>
								</form>
							</Paper>
						</Grid>
					</Grid>
				</div>
			);
	}

};

const SecondForm = (props: IProps) => {
	// Get the props
	const { history } = props;
	const theme = useTheme() as Theme;
	const xsmall = useMediaQuery(theme.breakpoints.down("xs"));
	const classes = useStyles();
	// Loading animation flag
	const [loading, setLoading] = useState(false);
	// List of banks
	const [banks, setBanks] = useState([{ id: 0, name: "Choose a bank", gateway: "" }]);
	// List of account types to be fetched from the backend
	const [bankAccountTypes, setBankAccountTypes] = useState([{ id: 0, name: "Choose your account type" }]);
	const [ragpReferalId, setRagpReferalId] = useState("");
	const [whatsappNumber, setWhatsappNumber] = useState("");
	const [accountNumber, setAccountNumber] = useState("");
	const [accountName, setAccountName] = useState("");
	const [bankAccountType, setBankAccountType] = useState(0);
	const [bank, setBank] = useState(0);
	const [submitted, setSubmitted] = useState(false);
	const [errors, setErrors] = useState({
		accountName: "",
		accountNumber: "",
		bank: "",
		bankAccountType: "",
		ragpReferalId: "",
		whatsappNumber: "",
	});

	// For retrieving the bank list on page load
	useEffect(() => {
		(async () => {
			// Start the loading animation
			setLoading(true);
			try {
				const response = await Axios.get("/banks");
				setBanks(response.data);
			} catch (error) {
				const err = error as AxiosError;
				if (err.response) {
					alert("Try again");
				}
			}
			try {
				const response = await Axios.get("/bank-account-types");
				setBankAccountTypes(response.data);
			} catch (error) {
				const err = error as AxiosError;
				if (err.response) {
					alert("Try again");
				}
			}
			// Remove the loading animation
			setLoading(false);
		})();
	}, []);

	const validate = (): boolean => {
		let passed = true;
		const err = {
			accountName: "",
			accountNumber: "",
			bank: "",
			bankAccountType: "",
			ragpReferalId: "",
			whatsappNumber: "",
		};

		if (ragpReferalId.length <= 4) {
			err.ragpReferalId = "RAGP Referal Id is required";
			passed = false;
		}
		if (whatsappNumber.length !== 11) {
			err.whatsappNumber = "Whatsapp number must be 11 digits";
			passed = false;
		}
		if (accountName.length <= 1) {
			err.accountName = "Account name is required";
			passed = false;
		}
		if (accountNumber.length < 10) {
			err.accountNumber = "Account Number should contain a minimum of 10 digits";
			passed = false;
		}
		if (bank === 0) {
			err.bank = "Bank is required";
			passed = false;
		}
		if (bankAccountType === 0) {
			err.bankAccountType = "Bank account type is required";
			passed = false;
		}
		setErrors(err);
		return passed;
	};

	const submit = async () => {
		// Has already been submitted before
		setSubmitted(true);
		if (false === validate()) {
			return;
		}
		// Validation was passed
		// Start loading animation
		setLoading(true);
		// Post data to the server
		try {
			// Construct the data
			const data = { ragpReferalId, whatsappNumber, accountName, accountNumber, bankAccountType, bank };
			const response = await Axios.put("/member", data);
			if (response.status === 200) {
				history.push("/payment");
			}
		} catch (error) {
			const err = error as AxiosError;
			if (err.response) {
				if (err.response.status === 403) {
					history.push("/login");
				}
			}
		}
		// Stop loading animation
		setLoading(false);
	};

	return (
		<div
			className={classes.wrapper}
		>
			<SnackbarSpinner
				loading={loading}
			/>
			<Grid
				container={true}
				style={{
					height: "100%",
					width: "100%",
				}}
				justify="center"
				alignItems="center"
			>
				<Grid
					item={true}
					xs={12}
					sm={8}
					md={6}
					style={{ height: "auto" }}
				>
					<Paper
						className={classes.paper}
						elevation={0}
					>
						<Typography variant="h6">
							Continue Your Registration
                    </Typography>
						<Typography>
							Feel the form below to continue your registration
                    </Typography>
						<br />
						<Grid container={true} spacing={24}>
							<Grid item={true} xs={12} md={6}>
								<TextField
									required={true}
									id="cardName"
									label="Recharge And Get Paid Referal Id"
									name="ragpReferalId"
									onBlur={() => { if (submitted) { validate(); } }}
									fullWidth={true}
									error={!!errors.ragpReferalId}
									helperText={errors.ragpReferalId}
									onChange={(event) => setRagpReferalId(event.currentTarget.value)}
									value={ragpReferalId}
								/>

							</Grid>
							<Grid item={true} xs={12} md={6}>
								<TextField
									required={true}
									id="cardNumber"
									label="Whatsapp number"
									name="whatsappNumber"
									onBlur={() => { if (submitted) { validate(); } }}
									fullWidth={true}
									error={!!errors.whatsappNumber}
									helperText={errors.whatsappNumber}
									onChange={(event) => setWhatsappNumber(event.currentTarget.value)}
									value={whatsappNumber}

								/>
							</Grid>
							<Grid item={true} xs={12} md={6}>
								<TextField
									required={true}
									id="expDate"
									label="Account name"
									name="accountName"
									onBlur={() => { if (submitted) { validate(); } }}
									fullWidth={true}
									error={!!errors.accountName}
									helperText={errors.accountName}
									value={accountName}
									onChange={(event) => setAccountName(event.currentTarget.value)}
								/>
							</Grid>
							<Grid item={true} xs={12} md={6}>
								<TextField
									required={true}
									id="cvv"
									label="Account number"
									name="accountNumber"
									onBlur={() => { if (submitted) { validate(); } }}
									fullWidth={true}
									error={!!errors.accountNumber}
									helperText={errors.accountNumber}
									value={accountNumber}
									onChange={(event) => setAccountNumber(event.currentTarget.value)}
								/>
							</Grid>
							<Grid
								item={true}
								xs={12}
								md={6}
							>
								<FormControl
									fullWidth={true}
									error={!!errors.bankAccountType}
								>
									<InputLabel htmlFor="bankAccountType">Account Type</InputLabel>
									<Select

										value={bankAccountType}
										onChange={(event) => setBankAccountType(Number(event.currentTarget.value))}
										inputProps={{
											id: "bankAccountType",
											name: "bankAccountType",
										}}
										onBlur={() => { if (submitted) { validate(); } }}
									>
										<option value={0}>Choose Your Account Type</option>
										{bankAccountTypes.map((accountType, index) => (
											<option value={accountType.id} key={index}>
												{accountType.name.charAt(0).toUpperCase() + accountType.name.slice(1)}
											</option>
										))}
									</Select>
									<FormHelperText>
										{errors.bankAccountType}
									</FormHelperText>
								</FormControl>
							</Grid>
							<Grid
								item={true}
								xs={12}
								md={6}
							>
								<FormControl
									fullWidth={true}
									error={!!errors.bank}
								>
									<InputLabel htmlFor="bank">Bank</InputLabel>
									<Select
										onChange={(event) => setBank(Number(event.currentTarget.value))}
										value={bank}
										onBlur={() => { if (submitted) { validate(); } }}
										inputProps={{
											id: "bank",
											name: "bank",
										}}
									>
										<option value={0}>Choose your bank</option>
										{banks.map((b, i) => (
											<option value={b.id} key={i}>{b.name}</option>
										))}
									</Select>
									<FormHelperText>
										{errors.bank}
									</FormHelperText>
								</FormControl>
							</Grid>
						</Grid>
						<div
							style={{ display: "flex", justifyContent: "flex-end" }}
						>
							<Button
								variant="contained"
								color="primary"
								onClick={submit}
								style={{ marginTop: "32px", marginLeft: "32px" }}
							>
								Next
							</Button>
						</div>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);

};

export default SignIn;
