import { StyleRulesCallback, Theme } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/styles";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";

const useStyles = makeStyles<StyleRulesCallback>((theme) => ({
	paper: {
		background: `
		linear-gradient(
			to bottom right, #fff 49%, #f5f5f5 30%, #f5f5f5 89%
			)
		`,
		borderRadius: "5px",
		padding: theme.spacing.unit * 4,
		width: "95vw",
	},
	wrapper: {
		alignItems: "center",
		background: `
		linear-gradient(
			to bottom right, #fff 49%, #f5f5f5 30%, #f5f5f5 89%, #fff 60%
			)
		`,
		display: "flex",
		height: "100vh",
		width: "100vw",
	},
	[theme.breakpoints.up("sm")]: {
		paper: {
			background: "white",
		}
	},
	[theme.breakpoints.up("md")]: {
		paper: {
			width: "720px",
		},
	},
}));

const Register = () => {

	const classes = useStyles();
	const theme = useTheme() as Theme;

	const xsmall = useMediaQuery(theme.breakpoints.down("xs"));

	// Inputs
	const [referalId, setReferalId] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [tAndC, setTAndC] = useState(false);
	const [errors, setErrors] = useState({
		confirmPassword,
		email,
		firstName,
		lastName,
		password,
		phoneNumber,
		referalId,
		username,
	});

	return (
		<div
			className={classes.wrapper}
		>
			<Grid

				container={true}
				className={classes.grid}
				justify="center"

			>
				<Grid
					item={true}
					className={classes.gridItem}
				>
					<Paper
						elevation={xsmall ? 0 : 2}

						className={classes.paper}
					>
						<Typography
							variant="h3"
							align="center"
						>
							Register
						</Typography>
						<Typography
							align="center"
							variant="subtitle1"
						>
							Fill in the form to begin
						</Typography>
						<Grid
							container={true}
							spacing={8}
							style={{
								marginTop: "2rem",
							}}
							justify="space-evenly"
						>
							<Grid
								item={true}
								xs={12}
								sm={5}
								md={5}
							>
								<TextField
									style={{ width: "100%" }}
									label="Referal ID"
									value={referalId}
									error={!!errors.referalId}
									helperText={errors.referalId}
									onChange={(event) => setReferalId(event.target.value)}
								/>
							</Grid>
							<Grid
								item={true}
								xs={12}
								sm={5}
								md={5}
							>
								<TextField
									style={{ width: "100%" }}
									label="Username"
									value={username}
									error={!!errors.username}
									helperText={errors.username}
									onChange={(event) => setUsername(event.target.value)}
								/>
							</Grid>
							<Grid
								item={true}
								xs={12}
								sm={5}
								md={5}
							>
								<TextField
									style={{ width: "100%" }}
									label="First name"
									value={firstName}
									error={!!errors.firstName}
									helperText={errors.firstName}
									onChange={(event) => setFirstName(event.target.value)}
								/>
							</Grid>
							<Grid
								item={true}
								xs={12}
								sm={5}
								md={5}
							>
								<TextField
									style={{ width: "100%" }}
									label="Last name"
									value={lastName}
									error={!!errors.lastName}
									helperText={errors.lastName}
									onChange={(event) => setLastName(event.target.value)}
								/>
							</Grid>
							<Grid
								item={true}
								xs={12}
								sm={5}
								md={5}
							>
								<TextField
									style={{ width: "100%" }}
									label="E-mail"
									value={email}
									error={!!errors.email}
									helperText={errors.email}
									onChange={(event) => setEmail(event.target.value)}
								/>
							</Grid>
							<Grid
								item={true}
								xs={12}
								sm={5}
								md={5}
							>
								<TextField
									style={{ width: "100%" }}
									label="Phone number"
									value={phoneNumber}
									error={!!errors.phoneNumber}
									helperText={errors.phoneNumber}
									onChange={(event) => setPhoneNumber(event.target.value)}
								/>
							</Grid>
							<Grid
								item={true}
								xs={12}
								sm={5}
								md={5}
							>
								<TextField
									style={{ width: "100%" }}
									label="Password"
									value={password}
									error={!!errors.password}
									helperText={errors.password}
									onChange={(event) => setPassword(event.target.value)}
								/>
							</Grid>
							<Grid
								item={true}
								xs={12}
								sm={5}
								md={5}
							>
								<TextField
									style={{ width: "100%" }}
									label="Confirm password"
									value={confirmPassword}
									error={!!errors.confirmPassword}
									helperText={errors.confirmPassword}
									onChange={(event) => setConfirmPassword(event.target.value)}
								/>
							</Grid>
							<Grid
								item={true}
							>
								<FormControlLabel
									control={
										<Checkbox
											checked={tAndC}
											value="antoine"
											color="primary"
											onChange={() => setTAndC(!tAndC)}
										/>
									}
									label="I hereby agree to the terms and condition."
								/>
							</Grid>
						</Grid>
					</Paper>
				</Grid>

			</Grid>
		</div>
	);
};

export default Register;
