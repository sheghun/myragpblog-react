// @material-ui components
import { StyleRulesCallback, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/styles";
import Axios, { AxiosError } from "axios";
import queryString from "query-string";
import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import banks from "../../_data/banks.json";

// Personal Components
import SnackbarSpinner from "../../Components/SnackbarSpinner/SnackbarSpinner";
// Context
import Context from "../../Context";

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

	const [loading, setLoading] = useState(false);
	const dispatch = useContext(Context).dispatch;
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const queryUrl = queryString.parse(location.search);
	// Check if the former url is the logout url redirect to the dashboard
	let returnUrl = !queryUrl.returnUrl ? "/dashboard/overview" : queryUrl.returnUrl === "/dashboard/logout" ?
		"/dashboard" : queryUrl.returnUrl;

	// Loop through the queryUrl to get the current
	if (Object.keys(queryUrl).length > 1 && typeof (queryUrl) === "object") {
		returnUrl += "?";
		for (const fragments in queryUrl) {
			if (fragments === "returnUrl") { continue; }

			returnUrl += fragments + "=" + queryUrl[fragments] + "&";
		}
	}
	// Current form to display
	const [currentForm, setCurrentForm] = useState("");

	// Try logging user in on page mount
	useEffect(() => {
		(async () => {
			try {

				const response = await Axios.get("/user/verify-token");
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
				if (response.data.notPaid) {
					history.push("/payment");
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

const bankAccountTypes = [
	"Savings",
	"Current",
	"Co-operate",
];

const SecondForm = (props: IProps) => {
	// Get the props
	const { history } = props;
	const theme = useTheme() as Theme;
	const xsmall = useMediaQuery(theme.breakpoints.down("xs"));
	const classes = useStyles();
	// Loading animation flag
	const [loading, setLoading] = useState(false);
	// List of bankAccount types to be fetched from the backend
	const [bank, setBank] = useState("");
	const [ragpReferalId, setRagpReferalId] = useState("");
	const [whatsappNumber, setWhatsappNumber] = useState("");
	const [bankAccountNumber, setBankAccountNumber] = useState("");
	const [bankAccountName, setBankAccountName] = useState("");
	const [bankAccountType, setBankAccountType] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [errors, setErrors] = useState({
		bank: "",
		bankAccountName: "",
		bankAccountNumber: "",
		bankAccountType: "",
		ragpReferalId: "",
		whatsappNumber: "",
	});

	const validate = (): boolean => {
		let passed = true;
		const err = {
			bank: "",
			bankAccountName: "",
			bankAccountNumber: "",
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
		if (bankAccountName.length <= 1) {
			err.bankAccountName = "Account name is required";
			passed = false;
		}
		if (bankAccountNumber.length < 10) {
			err.bankAccountNumber = "Account Number should contain a minimum of 10 digits";
			passed = false;
		}
		if (bank === "") {
			err.bank = "Bank is required";
			passed = false;
		}
		if (bankAccountType === "") {
			err.bankAccountType = "Bank bankAccount type is required";
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
			const data = { ragpReferalId, whatsappNumber, bankAccountName, bankAccountNumber, bankAccountType, bank };
			const response = await Axios.put("/user", data);
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
									name="bankAccountName"
									onBlur={() => { if (submitted) { validate(); } }}
									fullWidth={true}
									error={!!errors.bankAccountName}
									helperText={errors.bankAccountName}
									value={bankAccountName}
									onChange={(event) => setBankAccountName(event.currentTarget.value)}
								/>
							</Grid>
							<Grid item={true} xs={12} md={6}>
								<TextField
									required={true}
									id="cvv"
									label="Account number"
									name="bankAccountNumber"
									onBlur={() => { if (submitted) { validate(); } }}
									fullWidth={true}
									error={!!errors.bankAccountNumber}
									helperText={errors.bankAccountNumber}
									value={bankAccountNumber}
									onChange={(event) => setBankAccountNumber(event.currentTarget.value)}
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
										onChange={(event) => setBankAccountType(event.target.value)}
										inputProps={{
											id: "bankAccountType",
											name: "bankAccountType",
										}}
										onBlur={() => { if (submitted) { validate(); } }}
									>
										<MenuItem value={0}>Choose Your Account Type</MenuItem>
										{bankAccountTypes.map((a, i) => (
											<MenuItem value={a} key={i}>
												{a}
											</MenuItem>
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
										value={bank}
										onChange={(event) => setBank(event.target.value)}
										onBlur={() => { if (submitted) { validate(); } }}
										inputProps={{
											id: "bank",
											name: "bank",
										}}
									>
										<MenuItem value="">Choose your bank</MenuItem>
										{banks.map((b, i) => (
											<MenuItem value={b} key={i}>{b}</MenuItem>
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
