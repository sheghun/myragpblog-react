// cSpell:ignore Snackbar

import React, { Component } from "react";
// @material-ui/core components
import EditIcon from '@material-ui/icons/EditSharp';
import CloseIcon from '@material-ui/icons/CloseSharp';

import SaveIcon from '@material-ui/icons/SaveSharp'
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter, Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
// Personal Components
import GridItem from "../../Components/Grid/GridItem.jsx";
import GridContainer from "../../Components/Grid/GridContainer.jsx";
import CustomInput from "../../Components/CustomInput/CustomInput.jsx";
import Button from "../../Components/CustomButtons/Button.jsx";
import Card from "../../Components/Card/Card.jsx";
import CardHeader from "../../Components/Card/CardHeader.jsx";
import CardAvatar from "../../Components/Card/CardAvatar.jsx";
import CardBody from "../../Components/Card/CardBody.jsx";
import Spinner from '../../Components/Spinner/Spinner';
import Dialog from '../../Components/Dialog/Dialog';
import Snackbar from '../../Components/Snackbar/Snackbar';
import CircularProgress from '../../Components/CircularProgress/CircularProgress';
import Modal from '../../Components/Modal/Modal';
import CardFooter from "../../Components/Card/CardFooter.jsx";
import BanksList from "../../_data/banks.json"

import Axios from 'axios';
import * as helpers from '../../_helpers';

const styles = theme => ({
	cardCategoryWhite: {
		color: "rgba(255,255,255,.62)",
		margin: "0",
		fontSize: "14px",
		marginTop: "0",
		marginBottom: "0"
	},
	modalBody: {
		width: '100%',
		display: 'flex',
		padding: '16px',
		flexGrow: '1',
		justifyContent: 'center'
	},
	modalOptions: {
		position: 'absolute',
		display: 'flex',
		right: '24px',
		height: '100%',
		padding: '16px',
		flexDirection: 'column',
		justifyContent: 'space-around'
	},

	fullProfile: {
		width: 'auto',
		height: '85vh'
	},

	[theme.breakpoints.between('xs', 'sm')]: {
		modalBody: {
			flexDirection: 'column',
			alignItems: 'center'
		},
		fullProfile: {
			display: 'block',
			maxWidth: '100%',
			maxHeight: '100%',
			width: 'auto',
			height: '85vh'
		},
		modalOptions: {
			position: 'absolute',
			display: 'flex',
			bottom: '-45vh',
			left: '-1rem',
			width: '100%',
			padding: '16px',
			flexDirection: 'row',
			magrgin: '0 auto 0',
			justifyContent: 'space-around'
		}

	},
	cardTitleWhite: {
		color: "#FFFFFF",
		marginTop: "0px",
		minHeight: "auto",
		fontWeight: "300",
		fontFamily: "'Lato', 'Helvetica', 'Arial', sans-serif",
		marginBottom: "3px",
		textDecoration: "none"
	},
});

class UserProfile extends Component {

	constructor(props) {
		super(props)
		this.state = {
			// Inputs
			inputs: {
				name: '',
				paid: '',
				image: '',
				phoneNumber: '',
				package: 'Novice',
				bank_id: '',
				whatsappNumber: '',
				lastName: '',
				username: '',
				about_me: '',
				firstName: '',
				old_password: '',
				new_password: '',
				new_password_2: '',
				ragpReferalId: '',
				bankAccountName: '',
				bank_account_types: ["Savings", "Current", "Corporate"],
				bankAccountNumber: '',
				bankAccountType: 0
			},

			// Snackbar settings
			snackbar: {
				open: false,
				type: 'success',
				message: '',
				loading: false,
			},
			edit: false,
			submit: false,

			// Dialogs
			dialog: {
				open: false,
				type: '',
				message: ''
			},

			error: {
				password: '',
				bank_details: '',
			},
			// The type of update submit or edit
			updateType: '',

			profile: {
				fullImage: false,
				changed: false,
				updated: false,
				newImage: null
			}

		};
	}

	componentWillMount() {

	}

	componentDidMount() {
		this.setState({ snackbar: { loading: true } })
		const self = this;
		(async () => {
			try {
				const res = await Axios.get('/user/profile')
				self.setState((prevState) => ({
					inputs: { ...prevState.inputs, ...res.data },
					snackbar: { loading: false }
				}));
			} catch (error) {

			}
		})();
	}

	inputHandler = event => {
		const target = event.target
		const value = target.value
		const name = target.name
		this.setState(prevState => ({
			inputs: {
				...prevState.inputs,
				[name]: value
			}
		}))
	}

	updateProfile = () => {
		this.setState(prevState => ({ snackbar: { ...prevState.snackbar, loading: true } }))
		Axios.post('/dashboard/user_profile/update', this.state.inputs, {
			withCredentials: true
		})
			.then(response => {
				const resp = response.data
				if (resp.success) {
					this.setState({
						updateType: '',
						snackbar: { type: 'success', loading: false, open: true, message: resp.success }
					})
				}
			})
	}

	/**
	 * Update Password
	 * Required old_password, new_password, new_password_2
	 */
	updatePassword = () => {
		// Clear all password errors
		this.setState(prevState => ({ error: { ...prevState.error, password: '' } }))

		// Get the inputs
		const { old_password, new_password, new_password_2 } = this.state.inputs

		//Validate inputs
		const oldPassword = typeof (old_password) === 'string' && old_password.trim().length >= 6 ? old_password.trim() : false
		const newPassword = typeof (new_password) === 'string' && new_password.trim().length >= 6 ? new_password : false
		const newPassword2 = typeof (new_password_2) === 'string' && new_password_2.trim().length > 0 && new_password_2.trim() === new_password.trim()
			? new_password_2.trim() : false
		if (oldPassword && newPassword && newPassword2) {
			// Check if it's submitable or the updatetype
			if (!this.state.submit || this.state.updateType !== 'password') {
				// Dialog to make sure before running the request
				this.setState({
					dialog: {
						open: true,
						type: 'submit',
						message: 'Are you sure you want to update your password?'
					},
					updateType: 'password'
				})
			} else {
				// Activate the progress bar
				this.setState(prevState => ({ snackbar: { ...prevState.snackbar, loading: true } }))
				const inputs = {
					old_password: oldPassword,
					new_password: newPassword,
					new_password_2: newPassword2
				}
				// Post the inputs to the server
				Axios.post('/dashboard/user_profile/update_password', inputs, {
					withCredentials: true
				})
					.then(response => {
						const resp = response.data
						// Check if resp is successful or invalid
						console.log(resp)
						if (resp.success) {
							// Display a successful snackbar
							this.setState(prevState => ({
								updateType: '',
								snackbar: { type: 'success', loading: false, open: true, message: resp.success },
								inputs: { ...prevState.inputs, old_password: '', new_password: '', new_password_2: '' }
							}))
						} else if (resp.error && typeof (resp.error) === 'string') {
							// Display an error snackbar
							this.setState(prevState => ({
								updateType: '',
								snackbar: { type: 'error', loading: false, open: true, message: resp.error },
								error: { ...prevState.error, password: resp.error }
							}))
						} else if (typeof (resp.errors) !== 'string') {
							this.props.history.push(`/login?returnUrl=${this.props.location.pathname}`)
						}
					})

			}
		} else {
			this.setState(prevState => ({
				error: {
					...prevState.error,
					password: 'Password does not match or some inputs are missing and passwords must be at least six characters long'
				}
			}))
		}
	}

	/**
	 * * Update Bank Details
	 * * Required bankAccountName, bank_account_phoneNumber
	 */
	snackbarClose = () => {
		this.setState(prevState => ({ snackbar: { ...prevState.snackbar, open: false, } }))
	}

	profileImageUpdateHandler = event => {
		// Get the element
		const element = event.target
		// Set the update profile to false
		this.setState(prevState => ({ profile: { ...prevState.profile, updated: false } }))
		// Get the files
		const file = element.files[0]
		// Read the file
		const reader = new FileReader()
		reader.readAsArrayBuffer(file)
		reader.onload = event => {
			// blob stuff
			const blob = new Blob([event.target.result])
			// Set the new url and append to the state
			const url = window.URL.createObjectURL(blob)
			// Set the width
			const width = 300
			// Set up the canvas element
			const canvas = document.createElement('canvas')
			this.profileImageEl.src = url
			this.profileImageEl.onload = () => {

				// Check if profile has been updated before stop execution
				if (!this.state.profile.updated) {

					// If the filesize is greater than 300kb run the compression
					if (file.size > 300000) {

						// Set the scale factor
						const scaleFactor = width / this.profileImageEl.width
						console.log(scaleFactor)
						canvas.width = this.profileImageEl.width * scaleFactor
						canvas.height = this.profileImageEl.height * scaleFactor
						console.log(canvas.width)
						const ctx = canvas.getContext('2d')
						ctx.drawImage(this.profileImageEl, 0, 0, canvas.width, canvas.height);
						canvas.toBlob(blob => {
							this.setState(prevState => ({ profile: { ...prevState.profile, newImage: blob, changed: true } }))
						}, 'image/png', 0.5)
					} else {

						// Just use the file
						this.setState(prevState => ({ profile: { ...prevState.profile, newImage: file, changed: true } }))
					}
					// Clear the impage input element
					this.profileImageInput.value = ''
				}
			}
		}
	}

	profileImageUpdateSave = event => {
		// Create a javascript dialog to confirm
		const check = window.confirm('Are you sure you want to update your profile picture')

		// If the dialog is approved
		if (check) {
			// Intialize the formdata object and append the image file
			this.setState(prevState => ({ snackbar: { ...prevState.snackbar, loading: true } }))

			const formData = new FormData()
			formData.append('image', this.state.profile.newImage)

			Axios.post('/dashboard/user_profile/update_image', formData, {
				withCredentials: true,
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
				.then(response => {
					const resp = response.data
					if (resp.success) {
						// Display a successful snackbar
						this.setState(prevState => ({
							updateType: '',
							snackbar: { type: 'success', loading: false, open: true, message: resp.success },
							inputs: { ...prevState.inputs, image: helpers.baseUrl + resp.path },
							profile: { ...prevState.profile, updated: true }
						}))

					} else if (resp.error && typeof (resp.error) === 'string') {
						// Display an error snackbar
						this.setState(prevState => ({
							updateType: '',
							snackbar: { type: 'error', loading: false, open: true, message: resp.error },
							error: { ...prevState.error, password: resp.error }
						}))

					} else if (resp.redirect) {
						this.props.history.push(`/login?returnUrl=${this.props.location.pathname}`)
					}

					// Change the state
					this.setState(prevState => ({ snackbar: { ...prevState.snackbar, loading: false } }))
					this.profileImageEl.style.display = 'block'
				})
		}
	}

	render() {
		const { classes } = this.props;
		console.log(this.state.inputs)
		return (
			<>
				{this.state.inputs.loading ? <Spinner /> : null}
				<Snackbar
					type={this.state.snackbar.type}
					open={this.state.snackbar.open}
					message={this.state.snackbar.message}
					onClose={() => this.snackbarClose()}
				/>
				<GridContainer>
					<Dialog
						open={this.state.dialog.open}
						agree={this.agreeHandler}
						disagree={() => this.setState({ dialog: { open: false } })}
						message={this.state.dialog.message}
					/>
					{/* <ProfileDialog
                        open={this.props.location.hash === '#profile' ? true : false}
                        onClose={() => (this.props.history.replace(this.props.match.url))}
                        img={helpers.baseUrl + this.state.inputs.image}
                    /> */}
					<Modal
						open={this.props.location.hash === '#profile' ? true : false}
						onClose={() => (this.props.history.replace(this.props.match.url))}
					>
						<div className={classes.modalBody}>
							<img alt="full profile" src={this.state.inputs.image}
								className={classes.fullProfile} ref={ref => this.profileImageEl = ref}
							/>
							<img alt="author" ref={ref => this.imageCanvas = ref} className={classes.fullProfile} />
							<div className={classes.modalOptions}>
								<IconButton>
									<CloseIcon style={{ color: 'white' }} />
								</IconButton>
								{this.state.profile.changed ?
									<IconButton>
										<SaveIcon style={{ color: 'white' }} />
									</IconButton>
									: null
								}
								<IconButton>
									<EditIcon style={{ color: 'white' }} />
									<input aria-label="Input to upload image" accept="image/*" ref={ref => this.profileImageInput = ref} style={{ display: 'none' }}
										type="file" onChange={this.profileImageUpdateHandler}
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
												fullWidth: true
											}}
											inputProps={{
												disabled: true,
												value: this.state.inputs.username
											}}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={6}>
										<CustomInput
											labelText="Email address"
											id="email-address"
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												disabled: true,
												value: this.state.inputs.email
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
												fullWidth: true
											}}
											inputProps={{
												value: this.state.inputs.firstName,
												name: 'firstName',
												onChange: (e) => this.inputHandler(e)
											}}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={6}>
										<CustomInput
											labelText="Last Name"
											id="last-name"
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												value: this.state.inputs.lastName,
												name: 'lastName',
												onChange: (e) => this.inputHandler(e)
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
												fullWidth: true
											}}
											inputProps={{
												value: this.state.inputs.phoneNumber,
												name: 'phoneNumber',
												onChange: (e) => this.inputHandler(e)
											}}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={4}>
										<CustomInput
											labelText="Whatsapp Contact"
											id="country"
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												value: this.state.inputs.whatsappNumber,
												name: 'whatsappNumber',
												onChange: (e) => this.inputHandler(e)
											}}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={4}>
										<CustomInput
											labelText="Recharge And Get Paid Referal Id"
											id="ragpReferalId"
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												value: this.state.inputs.ragpReferalId,
												name: 'ragpReferalId',
												onChange: (e) => this.inputHandler(e)
											}}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={6}>
										<CustomInput
											labelText="Package"
											id="package"
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												value: this.state.inputs.package,
												disabled: true,
												name: 'package'
											}}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={4}>
										<CustomInput
											labelText="Paid"
											id="paid"
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												disabled: true,
												value: this.state.inputs.paid !== null ? this.state.inputs.paid : '',
												onChange: (e) => this.inputHandler(e)
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
												fullWidth: true
											}}
											inputProps={{
												multiline: true,
												rows: 5,
												value: this.state.inputs.about_me !== null ? this.state.inputs.about_me : '',
												name: 'about_me',
												onChange: (e) => this.inputHandler(e)
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
						<Card profile>
							<CardAvatar profile>
								<Link to={this.props.match.url + '#profile'} onClick={this.profileView}>
									<img src={helpers.baseUrl + this.state.inputs.image} alt="Profile" />
								</Link>
							</CardAvatar>
							<CardBody profile>
								<h6 className={classes.cardCategory}>RAGP BLOG / MEMBER</h6>
								<h4 className={classes.cardTitle}>{this.state.inputs.firstName + ' ' + this.state.inputs.lastName}</h4>
								<p className={classes.description}>
									{this.state.inputs.about_me}
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
												fullWidth: true
											}}
											inputProps={{
												value: this.state.inputs.bankAccountName,
												name: 'bankAccountName',
												type: 'text',
												onChange: (e) => this.inputHandler(e)
											}}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={12}>
										<CustomInput
											labelText="Bank Account Number"
											id="bank_account_phoneNumber"
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												value: this.state.inputs.bank_account_phoneNumber,
												name: 'bank_account_phoneNumber',
												type: 'text',
												onChange: (e) => this.inputHandler(e)
											}}
										/>
									</GridItem>
									{/* Bank Name Select */}
									<GridItem xs={12} sm={12} md={12}>
										<Select
											native
											value={this.state.inputs.bank_id}
											onChange={this.inputHandler}
											label="Bank"
											style={{ marginTop: '2rem', height: "40px" }}

											inputProps={{
												style: { height: "40px" },
												name: 'bank_id',
												id: 'bank_id',
											}}
										>
											<option disabled value={0}>Choose Your Bank</option>
											{BanksList.map((bank, index) => (
												<option value={bank} key={index}>
													{bank}
												</option>
											))}
										</Select>
									</GridItem>
									{/* Bank Account Type Select */}
									<GridItem xs={12} sm={12} md={12}>
										<Select
											native
											value={this.state.inputs.bankAccountType}
											onChange={this.inputHandler}
											label="Bank"
											fullWidth
											style={{ marginTop: '2rem', marginBottom: '2rem' }}
											inputProps={{
												style: { height: "40px" },
												name: 'bankAccountType',
												id: 'bankAccountType',
											}}
										>
											<option disabled value={0}>Choose Your Account Type</option>
											{this.state.inputs.bank_account_types.map((accountType, index) => (
												<option value={accountType} key={index}>
													{accountType}
												</option>
											))}
										</Select>
									</GridItem>
								</GridContainer>
								<Button color="primary" round>
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
								<p style={{ color: 'red' }}>{this.state.error.password}</p>
								<GridContainer>
									<GridItem xs={12} sm={12} md={12}>
										<CustomInput
											labelText="Old Password"
											id="old-password"
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												value: this.state.inputs.old_password,
												name: 'old_password',
												type: 'password',
												onChange: (e) => this.inputHandler(e)
											}}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={12}>
										<CustomInput
											labelText="New Password"
											id="new_password"

											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												value: this.state.inputs.new_password,
												name: 'new_password',
												type: 'password',
												onChange: (e) => this.inputHandler(e)
											}}
										/>
									</GridItem>

									<GridItem xs={12} sm={12} md={12}>
										<CustomInput
											labelText="New Password"
											id="new_password_2"
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												value: this.state.inputs.new_password_2,
												name: 'new_password_2',
												type: 'password',
												onChange: (e) => this.inputHandler(e)
											}}
										/>
									</GridItem>
								</GridContainer>
								<Button color="primary" round>
									Update Password
                                </Button>
							</CardBody>
						</Card>
					</GridItem>
				</GridContainer>
			</>
		);
	}
}

export default withRouter(withStyles(styles)(UserProfile))
