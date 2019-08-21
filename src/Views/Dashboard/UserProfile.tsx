// cSpell:ignore Snackbar

import CloseIcon from "@material-ui/icons/CloseSharp";
// @material-ui/core components
import EditIcon from "@material-ui/icons/EditSharp";
import React, { Component, useEffect, useState } from "react";

import { StyleRulesCallback, Theme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";
import SaveIcon from "@material-ui/icons/SaveSharp";
import { makeStyles } from "@material-ui/styles";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import BanksList from "../../_data/banks.json";
import { baseUrl } from "../../_helpers";
import Card from "../../Components/Card/Card.jsx";
import CardAvatar from "../../Components/Card/CardAvatar.jsx";
import CardBody from "../../Components/Card/CardBody.jsx";
import CardFooter from "../../Components/Card/CardFooter.jsx";
import CardHeader from "../../Components/Card/CardHeader.jsx";
import CircularProgress from "../../Components/CircularProgress/CircularProgress";
import Button from "../../Components/CustomButtons/Button.jsx";
import CustomInput from "../../Components/CustomInput/CustomInput.jsx";
import Dialog from "../../Components/Dialog/Dialog";
import GridContainer from "../../Components/Grid/GridContainer.jsx";
// Personal Components
import GridItem from "../../Components/Grid/GridItem.jsx";
import Modal from "../../Components/Modal/Modal";
import Snackbar from "../../Components/Snackbar/Snackbar";
import Spinner from "../../Components/Spinner/Spinner";

// @ts-ignore
const useStyles = makeStyles<StyleRulesCallback>((theme: Theme) => ({
	cardCategoryWhite: {
		color: "rgba(255,255,255,.62)",
		fontSize: "14px",
		margin: "0",
		marginBottom: "0",
		marginTop: "0",
	},
	modalBody: {
		display: "flex",
		flexGrow: "1",
		justifyContent: "center",
		padding: "16px",
		width: "100%",
	},
	modalOptions: {
		display: "flex",
		flexDirection: "column",
		height: "100%",
		justifyContent: "space-around",
		padding: "16px",
		position: "absolute",
		right: "24px",
	},

	fullProfile: {
		height: "85vh",
		width: "auto",
	},

	[theme.breakpoints.between("xs", "sm")]: {
		cardTitleWhite: {
			color: "#FFFFFF",
			fontFamily: "'Lato', 'Helvetica', 'Arial', sans-serif",
			fontWeight: "300",
			marginBottom: "3px",
			marginTop: "0px",
			minHeight: "auto",
			textDecoration: "none",
		},
		fullProfile: {
			display: "block",
			height: "85vh",
			maxHeight: "100%",
			maxWidth: "100%",
			width: "auto",
		},
		modalBody: {
			alignItems: "center",
			flexDirection: "column",
		},
		modalOptions: {
			bottom: "-45vh",
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-around",
			left: "-1rem",
			margin: "0 auto 0",
			padding: "16px",
			position: "absolute",
			width: "100%",
		},

	},
}));

const UserProfile = (props: any) => {

	let profileImageEl = "" as any as HTMLImageElement;
	let profileImageInput = "" as any as HTMLInputElement;
	let profileImageCanvas = "" as any as HTMLImageElement;

	const [inputs, setInputs] = useState({
		about_me: "",
		bank: "",
		bankAccountName: "",
		bankAccountNumber: "",
		bankAccountType: "",
		bank_account_types: ["Savings", "Current", "Corporate"],
		email: "",
		firstName: "",
		image: "",
		lastName: "",
		name: "",
		new_password: "",
		new_password_2: "",
		old_password: "",
		package: "Novice",
		paid: "",
		phoneNumber: "",
		ragpReferalId: "",
		username: "",
		whatsappNumber: "",
	});

	const [snackbar, setSnackbar] = useState({
		loading: false,
		message: "",
		open: false,
		type: "success",
	});

	const [edit, setEdit] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [dialog, setDialog] = useState({
		message: "",
		open: false,
		type: "",
	});

	const [errors, setErrors] = useState({
		bank_details: "",
		password: "",
	});

	const [updateType, setUpdateType] = useState("");
	const [profile, setProfile] = useState({
		changed: false,
		fullImage: false,
		newImage: null as Blob | null,
		updated: true,
	});

	useEffect(() => {
		setSnackbar((s) => ({ ...s, loading: false }));
		// Hide the image canvas
		profileImageCanvas.style.display = "none";
		(async () => {
			try {
				const res = await Axios.get("/user/profile");
				if (res.status === 200) {
					setInputs((i) => ({ ...i, ...res.data }));
					setSnackbar((s) => ({ ...s, loading: false }));
				}
			} catch (errors) { /* No code */ }
		})();
	}, []);


	const inputHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		setInputs((i) => ({
			...i,
			[name]: value,
		}));
	};

	const updateProfile = () => {
		//
	};

	/**
	 * Update Password
	 * Required old_password, new_password, new_password_2
	 */
	const updatePassword = () => {
		//
	};

	const profileImageUpdateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		// Get the element
		const element = event.target as EventTarget & HTMLInputElement;
		// Set the update profile to false
		setProfile((p) => ({ ...p, updated: false }));
		// Check if files are present
		if (!element.files) {
			return;
		}
		if (element.files.length === 0) {
			return;
		}
		// Get the files
		const file = element.files[0];
		// Set the new url and append to the state
		const url = window.URL.createObjectURL(file);

		profileImageEl.src = url;
		profileImageEl.onload = () => {

			// Check if profile has been updated before stop execution
			if (!profile.updated) {

				// If the file size is greater than 300kb run the compression
				if (file.size > 300000) {

					// Set the width
					const width = 300;

					// Set the scale factor
					const scaleFactor = width / profileImageEl.width;

					// Set up the canvas element
					const canvas = document.createElement("canvas");
					canvas.width = profileImageEl.width * scaleFactor;
					canvas.height = profileImageEl.height * scaleFactor;

					const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
					ctx.drawImage(profileImageEl, 0, 0, canvas.width, canvas.height);

					canvas.toBlob(
						(blob) => setProfile((p) => ({ ...p, newImage: blob, updated: true, changed: true })),
						"image/png",
						0.5,
					);
				} else {

					// Just use the file
					setProfile((p) => ({ ...p, updated: true, newImage: file, changed: true }));
				}
				// Clear the image input element
				profileImageInput.value = "";
			}
		};
	};

	const profileImageUpdateSave = (event: any) => {
		// Create a javascript dialog to confirm
		const check = window.confirm("Are you sure you want to update your profile picture");
	};

	const classes = useStyles();

	return (
		<>
			{
				// @ts-ignore
				<Snackbar
					type={snackbar.type}
					open={snackbar.open}
					message={snackbar.message}
					onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
				/>
			}

			<GridContainer>
				{/* <Dialog
					open={dialog.open}
					agree={agreeHandler}
					disagree={() => setDialog((d) => ({ ...d, open: false })}
					message={dialog.message}
				/> */}
				{/* <ProfileDialog
                        open={props.location.hash === '#profile' ? true : false}
                        onClose={() => (props.history.replace(props.match.url))}
                        img={baseUrl + inputs.image}
                    /> */}
				<Modal
					open={props.location.hash === "#profile"}
					onClose={() => (props.history.replace(props.match.url))}
				>
					<div className={classes.modalBody}>
						<img
							alt="full profile"
							src={baseUrl + inputs.image}
							className={classes.fullProfile}
							ref={(ref) => profileImageEl = ref as HTMLImageElement}
						/>
						<img
							alt="author"
							ref={(ref) => profileImageCanvas = ref as HTMLImageElement}
							className={classes.fullProfile}
						/>
						<div
							className={classes.modalOptions}
						>
							<IconButton>
								<CloseIcon style={{ color: "white" }} />
							</IconButton>
							{profile.changed ?
								<IconButton>
									<SaveIcon
										style={{ color: "white" }}
									/>
								</IconButton>
								: null
							}
							<IconButton>
								<EditIcon
									style={{ color: "white" }}
								/>
								<input
									aria-label="Input to upload image"
									accept="image/*"
									ref={(ref) => profileImageInput = ref as HTMLInputElement}
									style={{ display: "none" }}
									type="file"
									onChange={profileImageUpdateHandler}
								/>
							</IconButton>
						</div>
					</div>
				</Modal>

				<GridItem xs={12} sm={12} md={8}>
					<Card>
						<CardHeader color="primary">
							<h4 className={classes.cardTitleWhite}>Edit Profile</h4>
							<p className={classes.cardCategoryWhite}>Complete your profile</p>
						</CardHeader>
						<CardBody>
							<GridContainer>
								<GridItem xs={12} sm={12} md={6}>
									<CustomInput
										labelText="Username"
										id="username"
										formControlProps={{
											fullWidth: true,
										}}
										inputProps={{
											disabled: true,
											value: inputs.username,
										}}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={6}>
									<CustomInput
										labelText="Email address"
										id="email-address"
										formControlProps={{
											fullWidth: true,
										}}
										inputProps={{
											disabled: true,
											value: inputs.email,
										}}
									/>
								</GridItem>
							</GridContainer>
							<GridContainer>
								<GridItem xs={12} sm={12} md={6}>
									<CustomInput
										labelText="First Name"
										id="first-name"
										formControlProps={{
											fullWidth: true,
										}}
										inputProps={{
											name: "firstName",
											onChange: inputHandler,
											value: inputs.firstName,
										}}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={6}>
									<CustomInput
										labelText="Last Name"
										id="last-name"
										formControlProps={{
											fullWidth: true,
										}}
										inputProps={{
											name: "lastName",
											onChange: inputHandler,
											value: inputs.lastName,
										}}
									/>
								</GridItem>
							</GridContainer>
							<GridContainer>
								<GridItem xs={12} sm={12} md={4}>
									<CustomInput
										labelText="Number"
										id="city"
										formControlProps={{
											fullWidth: true,
										}}
										inputProps={{
											name: "phoneNumber",
											onChange: inputHandler,
											value: inputs.phoneNumber,
										}}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={4}>
									<CustomInput
										labelText="Whatsapp Contact"
										id="country"
										formControlProps={{
											fullWidth: true,
										}}
										inputProps={{
											name: "whatsappNumber",
											onChange: inputHandler,
											value: inputs.whatsappNumber,
										}}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={4}>
									<CustomInput
										labelText="Recharge And Get Paid Referal Id"
										id="ragpReferalId"
										formControlProps={{
											fullWidth: true,
										}}
										inputProps={{
											name: "ragpReferalId",
											onChange: inputHandler,
											value: inputs.ragpReferalId,
										}}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={6}>
									<CustomInput
										labelText="Package"
										id="package"
										formControlProps={{
											fullWidth: true,
										}}
										inputProps={{
											disabled: true,
											name: "package",
											value: inputs.package,
										}}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={4}>
									<CustomInput
										labelText="Paid"
										id="paid"
										formControlProps={{
											fullWidth: true,
										}}
										inputProps={{
											disabled: true,
											onChange: inputHandler,
											value: inputs.paid !== null ? inputs.paid : "",
										}}
									/>
								</GridItem>
							</GridContainer>
							<GridContainer>
								<GridItem xs={12} sm={12} md={12}>
									<CustomInput
										labelText="About Me"
										id="about-me"
										formControlProps={{
											fullWidth: true,
										}}
										inputProps={{
											multiline: true,
											name: "about_me",
											onChange: inputHandler,
											rows: 5,
											value: inputs.about_me !== null ? inputs.about_me : "",
										}}
									/>
								</GridItem>
							</GridContainer>
						</CardBody>
						<CardFooter>
							<Button color="primary">Update Profile</Button>
						</CardFooter>
					</Card>
				</GridItem>
				<GridItem xs={12} sm={12} md={4}>
					<Card profile={true}>
						<CardAvatar profile={true}>
							<Link to={props.match.url + "#profile"}>
								<img src={baseUrl + inputs.image} alt="Profile" />
							</Link>
						</CardAvatar>
						<CardBody profile={true}>
							<h6 className={classes.cardCategory}>RAGP BLOG / MEMBER</h6>
							<h4 className={classes.cardTitle}>{inputs.firstName + " " + inputs.lastName}</h4>
							<p className={classes.description}>
								{inputs.about_me}
							</p>
						</CardBody>
					</Card>
				</GridItem>

				{/* Bank Details Form */}
				<GridItem xs={12} sm={12} md={6}>
					<Card>
						<CardHeader color="primary">
							<h4 className={classes.cardTitleWhite}>Bank Details</h4>
						</CardHeader>
						<CardBody>
							<h4 className={classes.cardTitle}>Update Bank Details</h4>
							<GridContainer>
								<GridItem xs={12} sm={12} md={12}>
									<CustomInput
										labelText="Bank Account Name"
										id="bank-account-name"
										formControlProps={{
											fullWidth: true,
										}}
										inputProps={{
											name: "bankAccountName",
											onChange: inputHandler,
											type: "text",
											value: inputs.bankAccountName,
										}}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={12}>
									<CustomInput
										labelText="Bank Account Number"
										id="bank_account_phoneNumber"
										formControlProps={{
											fullWidth: true,
										}}
										inputProps={{
											name: "bank_account_phoneNumber",
											onChange: inputHandler,
											type: "text",
											value: inputs.bankAccountNumber,
										}}
									/>
								</GridItem>
								{/* Bank Name Select */}
								<GridItem xs={12} sm={12} md={12}>
									{
										// @ts-ignore
										<Select
											native={true}
											value={inputs.bank}
											onChange={inputHandler}
											label="Bank"
											style={{ marginTop: "2rem", height: "40px" }}

											inputProps={{
												id: "bank",
												name: "bank",
												style: { height: "40px" },
											}}
										>
											<option disabled={true} value={0}>Choose Your Bank</option>
											{BanksList.map((bank, index) => (
												<option value={bank} key={index}>
													{bank}
												</option>
											))}
										</Select>
									}
								</GridItem>
								<GridItem xs={12} sm={12} md={12}>
									{
										// @ts-ignore
										<Select
											native={true}
											value={inputs.bankAccountType}
											onChange={inputHandler}
											label="Bank"
											fullWidth={true}
											style={{ marginTop: "2rem", marginBottom: "2rem" }}
											inputProps={{
												id: "bankAccountType",
												name: "bankAccountType",
												style: { height: "40px" },
											}}
										>
											<option disabled={true} value={0}>Choose Your Account Type</option>
											{inputs.bank_account_types.map((accountType, index) => (
												<option value={accountType} key={index}>
													{accountType}
												</option>
											))}
										</Select>
									}
								</GridItem>
							</GridContainer>
							<Button color="primary" round={true}>
								Update Bank Details
                                </Button>
						</CardBody>
					</Card>
				</GridItem>

				{/* Update Password Form */}
				<GridItem xs={12} sm={12} md={6}>
					<Card>
						<CardBody>
							<h4 className={classes.cardTitle}>Update Password</h4>
							<p style={{ color: "red" }}>{errors.password}</p>
							<GridContainer>
								<GridItem xs={12} sm={12} md={12}>
									<CustomInput
										labelText="Old Password"
										id="old-password"
										formControlProps={{
											fullWidth: true,
										}}
										inputProps={{
											name: "old_password",
											onChange: inputHandler,
											type: "password",
											value: inputs.old_password,
										}}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={12}>
									<CustomInput
										labelText="New Password"
										id="new_password"

										formControlProps={{
											fullWidth: true,
										}}
										inputProps={{
											name: "new_password",
											onChange: inputHandler,
											type: "password",
											value: inputs.new_password,
										}}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={12}>
									<CustomInput
										labelText="New Password"
										id="new_password_2"
										formControlProps={{
											fullWidth: true,
										}}
										inputProps={{
											name: "new_password_2",
											onChange: inputHandler,
											type: "password",
											value: inputs.new_password_2,
										}}
									/>
								</GridItem>
							</GridContainer>
							<Button color="primary" round={true}>
								Update Password
                                </Button>
						</CardBody>
					</Card>
				</GridItem>
			</GridContainer>
		</>
	);
};

export default withRouter(UserProfile);
