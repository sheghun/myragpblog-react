// cSpell:ignore Ragp Oladiran Segun Referal godwin Whatsapp

import React, { Component } from 'react'

import { connect } from 'react-redux'

// 'Material-ui Components
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

// Personal Components
import Avatar from '../../Components/Avatar/Avatar'
// For lazy loading
import loadable from '@loadable/component'

// react-router dependencies
import { Route, Switch } from 'react-router-dom'

import { fetchUserAction, loginUserAction, fetchPostsAction } from '../../Store/Actions/Actions'

// Helpers
import { setUsername, username } from '../../_helpers'
import BlogHeader from '../../Components/BlogHeader/BlogHeader';
import Spinner from '../../Components/Spinner/Spinner';


// react-router dependencies

// Pages
const Welcome = loadable(() => import('../../Views/Blog/Introduction/Welcome/Welcome'),
{fallback: Spinner});
const WhyIs = loadable(() => import('../../Views/Blog/Introduction/Whyis/Whyis'))
const CompanyProfile = loadable(() => import('../../Views/Blog/Introduction/Company/Company'))
const CompensationPlan = loadable(() => import('../../Views/Blog/How/Compensation/Compensation'))



const styles = theme => ({
    blog: {
        maxWidth: '392px',
        margin: '64px auto 0',
    },
    hero: {
        // display: 'flex',
        // justifyContent: 'space-between'
    },
    heroText: {
        fontSize: '10px'
    },
    captionsWrapper: {
        marginLeft: '1rem'
    },
    captions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '200px',
        marginBottom: '-.5rem'
    },
    heroNumber: {
        marginTop: '-1.5rem'
    },
    avatar: {
        display: 'flex',
        marginLeft: '-2.2rem',
        marginRight: '2rem',
        alignItems: 'center',
    },
    nextButton: {
        textDecoration: 'underline'
    },
    [theme.breakpoints.up('md')]: {
        blog: {
            maxWidth: '840px',
            paddingLeft: '40px',
            paddingRight: '40px',
        },
    }
})

const routes = [
    {path: `/${username}/welcome-note`, component: Welcome},
    {path: `/${username}/why-ragp`, component: WhyIs},
    {path: `/${username}/the-compensation-plan`, component: CompensationPlan},
    {path: `/${username}/company-profile`, component: CompanyProfile},
];

class Blog extends Component {
    componentWillMount = () => {
        setUsername(this.props.match.params.username)
        this.props.fetchUserAction(this.props.match.params.username)
        this.props.loginUserAction();
        this.props.fetchPostsAction(this.props.match.params.username)
    }

    render() {
        const { classes } = this.props
        return (
                <BlogHeader routes={routes}>
                    <div className={classes.blog}>
                        <article className={classes.articleIntro}>
                            <div className={classes.hero}>
                                <div className={classes.heroIntro}>
                                    <Typography variant="overline">
                                        Ragp blog
                                    </Typography>
                                </div>
                                <div className={classes.avatar}>
                                    <Avatar
                                        src={`/assets/images/UR52f4XXovuRDWH8sHHrJb3TD6WohPzI8NQvDOqa.jpeg`}
                                        size={100}
                                    />
                                    <div className={classes.captionsWrapper}>
                                        <div className={classes.captions}>
                                            <Typography variant="caption">Name: </Typography>
                                            <Typography variant="overline">Oladiran Segun</Typography>
                                        </div>
                                        <div className={classes.captions}>
                                            <Typography variant="caption">Referal ID: </Typography>
                                            <Typography variant="overline">godwin01</Typography>
                                        </div>
                                        <div className={classes.captions}>
                                            <Typography variant="caption">Whatsapp: </Typography>
                                            <Typography variant="overline">08143112637</Typography>
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <Switch>
                            {routes.map((route, index) =>
                                <Route path={route.path} key={index} component={route.component} />
                            )}
                        </Switch>
                    </div>
                </BlogHeader>
        )

    }
}

const mapStateToProps = (state) => ({
    memberDetails: state.memberDetails
})

const mapDispatchToProps = dispatch => ({
    fetchUserAction: (userName) => dispatch(fetchUserAction(userName)),
    loginUserAction: () => dispatch(loginUserAction()),
    fetchPostsAction: (username) => dispatch(fetchPostsAction(username))
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Blog))
