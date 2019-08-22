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
import SnackbarSpinner from "../../Components/SnackbarSpinner/SnackbarSpinner";

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
			height: "auto",
			maxHeight: "100%",
			maxWidth: "100%",
			width: "98vw",
		},
		modalBody: {
			alignItems: "center",
			flexDirection: "column",
			justifyContent: "space-between",

		},
		modalImage: {
			display: "flex",
			flexBasis: "88vh",
			flexDirection: "column",
			justifyContent: "center",
		},
		modalOptions: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-around",
			left: "0",
			padding: "16px",
			position: "relative",
			right: "0",
			width: "100%",
		},

	},
}));

const UserProfile = (props: any) => {

	let profileImageEl = "" as any as HTMLImageElement;
	let profileImageInput = "" as any as HTMLInputElement;
	const classes = useStyles();

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
		message: "",
		open: false,
		type: "success",
	});

	const [submit, setSubmit] = useState(false);
	const [loading, setLoading] = useState(false);
	const [dialog, setDialog] = useState({
		message: "",
		open: false,
		type: "",
	});
	const [profileImage, setProfileImage] = useState(null as Blob | File | null);
	const [imageSrc, setImageSrc] = useState("");

	const [errors, setErrors] = useState({
		bank_details: "",
		password: "",
	});

	useEffect(() => {
		setSnackbar((s) => ({ ...s, loading: false }));
		(async () => {
			try {
				const res = await Axios.get("/user/profile");
				if (res.status === 200) {
					setInputs((i) => ({ ...i, ...res.data }));
					setImageSrc(baseUrl + res.data.image);
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
		// Set profile image changed by user
		let changedByUser = true;
		// Get the element
		const element = event.target as EventTarget & HTMLInputElement;
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
		setImageSrc(url);
		profileImageEl.onload = () => {
			const profileImageEl = document.getElementById("profileImageEl") as HTMLImageElement;
			const profileImageCanvas = document.getElementById("profileImageCanvas") as HTMLCanvasElement;
			const profileImageInput = document.getElementById("profileImageInput") as HTMLInputElement;
			// if a file was not loaded
			if (!file || !changedByUser) {
				return;
			}
			changedByUser = false;
			// If the file size is greater than 300kb run the compression
			if (file.size < 300000) {
				profileImageEl.style.display = "block";
				profileImageCanvas.style.display = "none";
				setProfileImage(file);
				return;
			}

			// Set the width
			const width = 300;

			// Set the scale factor
			const scaleFactor = width / profileImageEl.width;

			// Set up the canvas element
			profileImageCanvas.width = profileImageEl.width * scaleFactor;
			profileImageCanvas.height = profileImageEl.height * scaleFactor;

			const ctx = profileImageCanvas.getContext("2d") as CanvasRenderingContext2D;
			ctx.drawImage(profileImageEl, 0, 0, profileImageCanvas.width, profileImageCanvas.height);
			profileImageCanvas.style.display = "none";
			profileImageEl.style.display = "block";

			const compressedImage = profileImageCanvas.toDataURL("image/png", 0.5);
			profileImageCanvas.toBlob(
				(blob) => setProfileImage(blob),
				"image/png",
				0.5,
			);
			profileImageInput.value = "";
			setImageSrc(compressedImage);
		};
	};

	const submitProfileImage = async () => {
		const check = window.confirm("Are you sure you want to update your profile picture");
		if (!check) {
			return;
		}

		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("image", profileImage as Blob | File);
			const res = await Axios.post("/user/update-image", formData);
			if (res.status === 202) {
				setSnackbar({
					message: "Profile image updated successfully",
					open: true,
					type: "success",
				});
				setInputs((i) => ({ ...i, image: res.data }))
			}
		} catch (error) { /* No code */ }
		setLoading(false);

	};

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

			<SnackbarSpinner
				loading={loading}
				onClose={() => setLoading(false)}
			/>

			<GridContainer>
				<Modal
					open={props.location.hash === "#profile"}
					onClose={() => (props.history.replace(props.match.url))}
				>
					<div className={classes.modalBody}>
						<div className={classes.modalImage}>
							<img
								alt="Full profile"
								id="profileImageEl"
								src={imageSrc}
								className={classes.fullProfile}
								ref={(ref) => profileImageEl = ref as HTMLImageElement}
							/>
							<canvas
								style={{ display: "none" }}
								id="profileImageCanvas"
								className={classes.fullProfile}
							/>

						</div>
						<div
							className={classes.modalOptions}
						>
							<IconButton>
								<CloseIcon
									style={{ color: "white" }}
									onClick={() => {
										props.history.replace(props.match.url);
										setImageSrc(baseUrl + inputs.image);
										setProfileImage(null);
									}}
								/>
							</IconButton>
							{profileImage && (
								<IconButton>
									<SaveIcon
										onClick={submitProfileImage}
										style={{ color: "white" }}
									/>
								</IconButton>
							)}
							<IconButton>
								<EditIcon
									onClick={() => profileImageInput.click()}
									style={{ color: "white" }}
								/>
								<input
									aria-label="Input to upload image"
									accept="image/*"
									id="profileImageInput"
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
								<img src={imageSrc} alt="Profile" />
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
