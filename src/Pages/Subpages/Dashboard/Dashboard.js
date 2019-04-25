import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUserAction } from '../../../Store/Actions/Actions';

class Dashboard extends Component {
    render() {
        return (
            <div>
                orking
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn,

})

const mapDispatchToProps = dispatch => ({
    loginUserAction: () => dispatch(loginUserAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
