import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

import { registerAction } from '../../../../Store/Actions/Actions'
import classes from '../Register.module.css'
import Input from '../../../../Components/Input/Input'
import Spinner from '../../../../Components/Spinner/Spinner'

export class FirstForm extends Component {
    static propTypes = {

    }
    constructor(props) {
        super(props)
        this.state = {
            inputs: {
                lastName: '',
                firstName: '',
                email: '',
                userName: '',
                ragpReferalId: '',
                password: '',
                passwordAgain: '',
            },
            lastNameError: false,
            firstNameError: false,
            emailError: false,
            userNameError: false,
            ragpReferalIdError: false,
            submitted: false,
            passwordError: false
        }
    }

    componentDidMount() {

    }

    queryString = queryString.parse(this.props.location.search)

    submitHandler = async (e) => {
        e.preventDefault();
        await this.setState(prevState => ({
            inputs: {
                ...prevState.inputs,
                referalId: this.queryString.referer,
                submitted: true
            }
        }))
        if (this.validate()) {
            this.props.registerAction(this.state.inputs, this.props.match.params.step)
        }
    }




    validate = () => {
        const { inputs } = this.state;
        for (const input in inputs) {
            const value = inputs[input]

            switch (input) {
                case 'lastName':
                    if (value === '') {
                        this.setState({ lastNameError: true })
                        return false
                    } else {
                        this.setState({ lastNameError: false })
                    }
                    break

                case 'firstName':
                    if (value === '') {
                        this.setState({ firstNameError: true })
                        return false
                    } else {
                        this.setState({ firstNameError: false })
                    }
                    break

                case 'password':
                    if (value !== this.state.inputs.passwordAgain || value === '') {
                        this.setState({ passwordError: true })
                        return false
                    } else {
                        this.setState({ passwordError: false })
                    }
                    break

                case 'email':
                    if (value === '') {
                        this.setState({ emailError: true })
                        return false
                    } else {
                        this.setState({ emailError: false })
                    }
                    break

                case 'userName':
                    if (value === '') {
                        this.setState({ userNameError: true })
                        return false
                    } else {
                        this.setState({ userNameError: false })
                    }
                    break

                case 'ragpReferalId':
                    if (value === '') {
                        this.setState({ ragpReferalIdError: true })
                        return false
                    } else {
                        this.setState({ ragpReferalIdError: false })
                    }
                    break
                default:
                    return true
            }
        }
        return true
    }

    changeHandler = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: value
                }

            }
        })
    }

    blurHandler = e => {
        if (this.state.submitted) {
            this.validate()
        }
    }

    render() {
        const { lastName, firstName, password, passwordAgain, email, userName, ragpReferalId } = this.state;
        console.log(this.props.submit ? this.props.submit : 'nothing')
        const inputErrorClasses = [classes.input, classes.inputerror]
        const inputClasses = [classes.input]
        const errorClass = (error) => {
            return error ? inputErrorClasses.join(' ') : inputClasses.join(' ')
        }

        const errorWarning = (error, name) => {
            if (error) {
                if (name === 'Password') {
                    return <small>{`${name}`} is required and must match</small>
                }
                return <small>{`${name}`} is required</small>
            }
            return <div></div>
        }

        const spinner = () => {
            return this.props.loading ? <Spinner /> : null
        }
        let errors;
        if (this.props.register.hasOwnProperty('errors')) {
            errors = this.props.register.errors.map(
                (error, index) => <p key={index} className={classes.errors}>{error}</p>
            )
        } else if (this.props.register.success) {
            errors = null;
            this.props.history.push(
                `2?referer=${this.queryString.referer}&username=${this.state.inputs.userName}`
            );
        }
        return (

            <div className="base">
                {spinner()}
                <div className={classes.fix}></div>
                <form className={classes.form} onSubmit={this.submitHandler}>

                    <div>
                        <i style={{ fontSize: 32 }} className="icon ion-ios-create"></i>
                        <div className={classes.heading}>
                            <h2>Register</h2>
                            <p>With Us</p>
                        </div>
                    </div>

                    {errors}

                    <div className={classes.names}>
                        <div className={classes.inputwrapper}>
                            <label>SurName</label>
                            <Input
                                value={lastName}
                                onBlur={(e) => this.blurHandler(e)}
                                name="lastName"
                                onChange={(e) => this.changeHandler(e)}
                                className={errorClass(this.state.lastNameError)}
                                type="text"
                                placeholder="e.g:   Adekola"
                            />
                            {errorWarning(this.state.lastNameError, 'Last name')}
                        </div>

                        <div className={classes.inputwrapper}>
                            <label>First Name</label>
                            <Input
                                value={firstName}
                                onBlur={(e) => this.blurHandler(e)}
                                className={errorClass(this.state.firstNameError)}
                                onChange={(e) => this.changeHandler(e)}
                                type="text"
                                name="firstName"
                                placeholder="e.g:   Ezechukwu"
                            />
                            {errorWarning(this.state.firstNameError, 'First Name')}
                        </div>
                    </div>

                    <div className={classes.inputwrapper}>
                        <label>E-mail</label>
                        <Input
                            value={email}
                            onBlur={(e) => this.blurHandler(e)}
                            className={errorClass(this.state.emailError)}
                            onChange={(e) => this.changeHandler(e)}
                            type="text"
                            name="email"
                            placeholder="e.g:   sheghunoladiran9@gmail.com"
                        />
                        {errorWarning(this.state.emailError, 'E-mail')}
                    </div>

                    <div className={classes.inputwrapper}>
                        <label>Username</label>
                        <Input
                            value={userName}
                            onBlur={(e) => this.blurHandler(e)}
                            className={errorClass(this.state.userNameError)}
                            onChange={(e) => this.changeHandler(e)}
                            type="text"
                            name="userName"
                            placeholder="e:g   sheghun12"
                        />
                        {errorWarning(this.state.userNameError, 'Username')}
                    </div>

                    <div className={classes.inputwrapper}>
                        <label>Password</label>
                        <Input
                            value={password}
                            className={errorClass(this.state.passwordError)}
                            onBlur={(e) => this.blurHandler(e)}
                            onChange={(e) => this.changeHandler(e)}
                            type="text"
                            name="password"
                            placeholder="Six characters long"
                        />
                    </div>

                    <div className={classes.inputwrapper}>
                        <label>Password Again</label>
                        <Input
                            value={passwordAgain}
                            className={errorClass(this.state.passwordError)}
                            onBlur={(e) => this.blurHandler(e)}
                            onChange={(e) => this.changeHandler(e)}
                            type="text"
                            name="passwordAgain"
                            placeholder="Six characters long"
                        />
                        {errorWarning(this.state.passwordError, 'Password')}
                    </div>

                    <div className={classes.inputwrapper}>
                        <label>Recharge And Get Paid Referal Id</label>
                        <Input
                            value={ragpReferalId}
                            onBlur={(e) => this.blurHandler(e)}
                            className={errorClass(this.state.ragpReferalIdError)}
                            onChange={(e) => this.changeHandler(e)}
                            type="text"
                            name="ragpReferalId"
                            placeholder="e.g:   De-catalyst"
                        />
                        {errorWarning(this.state.ragpReferalIdError, 'Whatsapp Number')}
                    </div>

                    <div className={classes.buttonwrapper}>
                        <button className={classes.button}>Continue</button>
                    </div>
                </form>
            </div>
        )

    }
}

const mapStateToProps = (state) => ({
    loading: state.loading,
    error: state.error,
    register: state.register
})

const mapDispatchToProps = dispatch => ({
    registerAction: (inputs, step) => dispatch(registerAction(inputs, step))

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FirstForm
)
)