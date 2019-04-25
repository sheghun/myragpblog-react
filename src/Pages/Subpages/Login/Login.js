import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import classes from './Login.module.css'
import Header from '../../../Components/Header/Header'
import ErrorWrapper from '../../../Hoc/ErrorWrapper/ErrorWrapper'
import { loginUserAction } from '../../../Store/Actions/Actions';

export class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inputs: {
                username: '',
                password: ''
            },
            passwordError: false,
            usernameError: false
        }
    }

    submitHandler = (e) => {
        e.preventDefault()
        if (this.validate()) {
            console.log('validated')
            this.props.loginUserAction(this.state.inputs)
        }
    }


    validate = () => {
        const { inputs } = this.state
        for (const input in inputs) {
            const value = inputs[input]
            switch (input) {
                case 'username':
                    if (value === '') {
                        this.setState({ usernameError: true })
                        return false
                    } else {
                        this.setState({ usernameError: false })
                    }
                    break;

                case 'password':
                    if (value === '') {
                        this.setState({ passwordError: true })
                        return false
                    } else {
                        this.setState({ passwordError: false })
                    }
                    break;
                default:
                    return true
            }
        }
        return true;
    }

    changedHandler = (event) => {
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

    go = (username) => {
        this.props.history.push('/home/dashboard')
    }

    render() {
        const { inputs } = this.state
        const { userDetails } = this.props
        const username = userDetails.username
        console.log(username)

        const errorWarning = (error, name) => {
            if (error) {
                return <small style={{ color: 'red' }}>{`${name}`} is required</small>
            }
            return <div></div>
        }
        let errors = null;
        if (this.props.register.hasOwnProperty('errors')) {
            errors = this.props.register.errors.map(
                (error, index) => <p key={index} className={classes.errors}>{error}</p>
            )
        } else if (this.props.isLoggedIn && username) {
            errors = null;
            this.go(username)
        }

        return (
            <ErrorWrapper>
                <Header match={this.props.match} />
                <div className={classes.logform}>
                    <h2>Login to your account</h2>
                    <form onSubmit={this.submitHandler}>
                        {errors}
                        {errorWarning(this.state.usernameError, 'Username')}
                        <input
                            type="text"
                            title="username"
                            placeholder="Username"
                            name="username"
                            onChange={this.changedHandler}
                            value={inputs.username}
                        />
                        {errorWarning(this.state.passwordError, 'Password')}
                        <input
                            type="password"
                            title="username"
                            name="password"
                            onChange={this.changedHandler}
                            placeholder="password"
                            value={inputs.password}
                        />
                        <button type="submit" className={classes.btn}>Login</button>
                        <NavLink className={classes.forgot} to="/">Forgot Username?</NavLink>
                    </form>
                </div>
            </ErrorWrapper>

        )
    }
}

const mapStateToProps = (state) => ({
    register: state.register,
    userDetails: state.userDetails,
    isLoggedIn:  state.isLoggedIn
})

const mapDispatchToProps = dispatch => ({
    loginUserAction: (inputs) => dispatch(loginUserAction(inputs))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
