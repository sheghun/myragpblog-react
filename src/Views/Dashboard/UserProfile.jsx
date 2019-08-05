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
				email: '',
				banks: [],
				number: '',
				package: '',
				bank_id: '',
				whatsapp: '',
				lastname: '',
				username: '',
				about_me: '',
				firstname: '',
				old_password: '',
				new_password: '',
				new_password_2: '',
				ragp_referal_id: '',
				bank_account_name: '',
				bank_account_types: [],
				bank_account_number: '',
				bank_account_type_id: 0
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
		Axios.get('/dashboard/user_profile', {
			withCredentials: true
		}).then(response => {
			if (response.data.success) {
				console.log(response.data.success)
				this.setState(prevState => ({
					inputs: { ...response.data.success, image: helpers.baseUrl + response.data.success.image },
					snackbar: { loading: false }
				}));
			} else if (response.data.errors) {
				this.props.history.push(`/login?returnUrl=${this.props.location.pathname}`);
			}

		});

	}

	inputHandler = event => {
		const target = event.target
		const value = target.value
		const name = target.name
		console.log(value)
		if (!this.state.edit) {
			this.setState({
				dialog: {
					open: true,
					type: 'edit',
					message: 'Are you sure you want to edit your information?'
				}
			})
		} else {
			this.setState(prevState => ({
				inputs: {
					...prevState.inputs,
					[name]: value
				}
			}))
		}

		console.log(name)

	}

	updateProfile = () => {
		// Check the type of the update
		if (!this.state.submit || this.state.updateType !== 'information') {
			this.setState({
				dialog: {
					open: true,
					type: 'submit',
					message: 'Are you sure you want to update your information?'
				},
				updateType: 'information'
			})
			return
		}
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
     * * Required bank_account_name, bank_account_number
     */
	updateBankDetails = () => {
		this.setState(prevState => ({ snackbar: { ...prevState.snackbar, loading: true } }))
		this.setState({ error: { password: '', bank_details: '' } })
		const { inputs } = this.state;
		const data = { bank_account_name: inputs.bank_account_name, bank_account_number: inputs.bank_account_number, bank_id: inputs.bank_id, bank_account_type_id: inputs.bank_account_type_id }
		console.log(data)
		Axios.post('/dashboard/user_profile/update_bank', { ...data }, {
			withCredentials: true
		}).then(response => {
			const resp = response.data
			if (resp.success) {
				this.setState({
					updateType: '',
					snackbar: { type: 'success', loading: false, open: true, message: resp.success }
				})
			} else if (resp.error) {
				this.setState({
					updateType: '',
					snackbar: { type: 'error', loading: false, open: true, message: resp.error }
				})
			}
		})
	}

	snackbarClose = () => {
		this.setState(prevState => ({ snackbar: { ...prevState.snackbar, open: false, } }))
	}

	agreeHandler = () => {
		this.setState(prevState => ({
			[prevState.dialog.type === 'edit' ? 'edit' : 'submit']: true,
			dialog: { open: false }
		}))
		if (this.state.dialog.type === 'submit' && this.state.updateType === 'information') this.updateProfile()
		if (this.state.dialog.type === 'submit' && this.state.updateType === 'password') this.updatePassword()
	}

	profileView = event => {
		this.setState(prevState => ({ ...prevState, profile: { fullImage: true } }))
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
		return (
			<>
				{this.state.inputs.loading ? <Spinner /> : null}
				<CircularProgress show={this.state.snackbar.loading} />
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
								<IconButton onClick={() => (this.props.history.replace(this.props.match.url))}>
									<CloseIcon style={{ color: 'white' }} />
								</IconButton>
								{this.state.profile.changed ?
									<IconButton onClick={this.profileImageUpdateSave}>
										<SaveIcon style={{ color: 'white' }} />
									</IconButton>
									: null
								}
								<IconButton onClick={() => { this.profileImageInput.click(); this.profileImageInput.value = '' }}>
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
												value: this.state.inputs.firstname,
												name: 'firstname',
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
												value: this.state.inputs.lastname,
												name: 'lastname',
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
												value: this.state.inputs.number,
												name: 'number',
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
												value: this.state.inputs.whatsapp,
												name: 'whatsapp',
												onChange: (e) => this.inputHandler(e)
											}}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={4}>
										<CustomInput
											labelText="Recharge And Get Paid Referal Id"
											id="ragp_referal_id"
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												value: this.state.inputs.ragp_referal_id,
												name: 'ragp_referal_id',
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
								<Button color="primary" onClick={this.updateProfile}>Update Profile</Button>
							</CardFooter>
						</Card>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<Card profile>
							<CardAvatar profile>
								<Link to={this.props.match.url + '#profile'} onClick={this.profileView}>
									<img src={this.state.inputs.image} alt="Profile" />
								</Link>
							</CardAvatar>
							<CardBody profile>
								<h6 className={classes.cardCategory}>RAGP BLOG / MEMBER</h6>
								<h4 className={classes.cardTitle}>{this.state.inputs.firstname + ' ' + this.state.inputs.lastname}</h4>
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
												value: this.state.inputs.bank_account_name,
												name: 'bank_account_name',
												type: 'text',
												onChange: (e) => this.inputHandler(e)
											}}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={12}>
										<CustomInput
											labelText="Bank Account Number"
											id="bank_account_number"
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												value: this.state.inputs.bank_account_number,
												name: 'bank_account_number',
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
											style={{ marginTop: '2rem' }}
											inputProps={{
												name: 'bank_id',
												id: 'bank_id',
											}}
										>
											<option disabled value={0}>Choose Your Bank</option>
											{this.state.inputs.banks.map((bank, index) => (
												<option value={bank.id} key={index}>
													{bank.name.charAt(0).toUpperCase() + bank.name.slice(1)}
												</option>
											))}
										</Select>
									</GridItem>
									{/* Bank Account Type Select */}
									<GridItem xs={12} sm={12} md={12}>
										<Select
											native
											value={this.state.inputs.bank_account_type_id}
											onChange={this.inputHandler}
											label="Bank"
											fullWidth
											style={{ marginTop: '2rem', marginBottom: '2rem' }}
											inputProps={{
												name: 'bank_account_type_id',
												id: 'bank_account_type_id',
											}}
										>
											<option disabled value={0}>Choose Your Account Type</option>
											{this.state.inputs.bank_account_types.map((accountType, index) => (
												<option value={accountType.id} key={index}>
													{accountType.name.charAt(0).toUpperCase() + accountType.name.slice(1)}
												</option>
											))}
										</Select>
									</GridItem>
								</GridContainer>
								<Button color="primary" onClick={this.updateBankDetails} round>
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
								<Button color="primary" onClick={this.updatePassword} round>
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
