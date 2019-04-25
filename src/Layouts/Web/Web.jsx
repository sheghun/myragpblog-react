import React from 'react'
import { Route } from 'react-router-dom'

// Personal Components
import Header from '../../Components/Header/Header'

// Material ui components
import AppBar from '@material-ui/core/AppBar'
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// Lazy Load Components
const Home = React.lazy(() => import('../../Views/Web/Home/Home'))
const About = React.lazy(() => import('../../Views/Web/About/About'))
const Contact = React.lazy(() => import('../../Views/Web/Contact/Contact'))

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

const Web = (props) => {
    console.log(props)
    const { classes } = props
    return (
        <>
            <Header />
            <Route path={`${props.match.url}/home`} component={Home} />
            <Route path={`${props.match.url}/about`} component={About} />
            <Route path={`${props.match.url}/contact`} component={Contact} />
        </>
    )
}

export default withStyles(styles)(Web)
