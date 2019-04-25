import React, { Component } from 'react'
import { connect } from 'react-redux'

import Avatar from '../../Components/Avatar/Avatar'
import Posts from '../../Components/Posts/Posts'
import classes from './Base.module.css'
import ErrorWrapper from '../../Hoc/ErrorWrapper/ErrorWrapper.js'
import { fetchUserAction, loginUserAction } from '../../Store/Actions/Actions'
import Header from '../../Components/Header/Header'

class Base extends Component {


    state = {
        posts: [
            {
                title: 'what is it about?',
                subtitle: 'what is recharge and get paid?',
                author: 'Segun Oladiran',
                date: Date.now(),
                lenght: '5 min Read'
            },
            {
                title: 'What do they sell',
                subtitle: 'how does it work?',
                author: 'Segun Oladiran',
                date: Date.now(),
                lenght: '5 min Read'
            },
            {
                title: 'How do i get paid',
                subtitle: 'how does it work?',
                author: 'Segun Oladiran',
                date: Date.now(),
                lenght: '5 min Read'
            },
            {
                title: 'how much am i paid',
                subtitle: 'how does it work?',
                author: 'Segun Oladiran',
                date: Date.now(),
                lenght: '5 min Read'
            },
            {
                title: 'how many referers?',
                subtitle: 'how many people must i refer?',
                author: 'Segun Oladiran',
                date: Date.now(),
                lenght: '5 min Read'
            },
        ]
    }

    componentDidMount() {
        if (this.props.memberDetails.id === '') {
            this.props.fetchUserAction(this.props.match.params.username)
            this.props.loginUserAction();
        }

    }

    render() {
        const { memberDetails } = this.props
        return (
            <ErrorWrapper>
                <Header match={this.props.match} />
                <div className="base">
                    <div className={['base', classes.backdrop].join(' ')}>
                        <h1>Understanding How Recharge And Get Paid works'</h1>
                    </div>
                    <main className={classes.postwrapper}>
                        <div className={classes.author}>
                            <div>
                                <div className={classes.authorimage}>
                                    <h2>HI</h2>
                                    <Avatar size={100} src={memberDetails.image} />
                                </div>
                                <p>
                                    My name is {`${memberDetails.firstname} ${memberDetails.surname}`}
                                    <br />
                                    Welcome to my blog, I am here to help you understand Recharge And Get Paid.
                                </p>
                            </div>
                        </div>
                        <Posts posts={this.state.posts} />
                    </main>
                </div >
            </ErrorWrapper>
        )
    }
}


const mapStateToProps = (state) => ({
    memberDetails: state.memberDetails
})

const mapDispatchToProps = dispatch => ({
    fetchUserAction: (userName) => dispatch(fetchUserAction(userName)),
    loginUserAction: () => dispatch(loginUserAction())
})
export default connect(mapStateToProps, mapDispatchToProps)(Base)

