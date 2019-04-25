// cSpell:ignore  MRPI to\'s

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom'
import Slide from '@material-ui/core/Slide';
import Collapse from '@material-ui/core/Collapse';
import styles from './styles'

interface collapse {
    [key: number]: boolean
}

interface props extends RouteComponentProps {
    children: JSX.Element;
    classes: any;
    routes: route[]
}

type route = { path: string, component: React.Component }

const posts = [
    {
        title: 'Introduction', posts: [
            { title: 'Welcome Note', url: 'welcome-note' },
            { title: 'Why RAGP', url: 'why-ragp' },
            { title: 'Company Profile', url: 'company-profile' }
        ]
    },
    {
        title: 'How does it work?', posts: [
            { title: 'The business model', url: 'the-business-model' },
            { title: 'The compensation plan', url: 'the-compensation-plan' },
            { title: 'Massive residual passive income (MRPI)', url: 'massive-residual-income' }
        ]
    },
    {
        title: 'How to\'s', posts: [
            { title: '', url: '' }
        ]
    }
];

const BlogHeader = (props: props) => {

    const { classes, routes, location } = props;
    console.log(props);
    // Initialize the current route to be the first route
    const [currentRoute, setCurrentRoute] = useState(routes[0]) as [route, React.Dispatch<React.SetStateAction<route>>];

    const [mobileOpen, setMobileOpen] = useState(false);
    const [slide, setSlide] = useState(true);
    const [collapse, setCollapse] = useState({ 0: false }) as unknown as [collapse, React.Dispatch<React.SetStateAction<collapse>>]


    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    useEffect(() => {
        const route = routes.find(route => route.path === location.pathname)
        setCurrentRoute(route as route);
        // Get the post index
        const index = posts.findIndex(post => post.posts.some(post => `/${username}/${post.url}` === location.pathname))
        // Open the current post link
        setCollapse(collapse => ({ ...collapse, [index]: true }) )
    }, [location.pathname])


    const handleScroll = () => {
        if (window.pageYOffset > 200) { return setSlide(false); }
        setSlide(true)
    }

    const handleDrawerToggle = () => {
        setMobileOpen((open) => !open ? true : false)
    };

    const collapseMenu = (_: React.MouseEvent<HTMLElement, MouseEvent>, index: number) => {
        setCollapse(collapse => ({ ...collapse, [index]: !collapse[index] }))
    }

    const username = localStorage.getItem('username')

    const drawer = (
        <>
            <div className={classes.toolbar} />

            <p className={classes.sideBarLogoText}>My ragp's blog</p>

            <Divider />

            <div style={{ marginTop: '24px' }}></div>

            <List>
                <ListItem>
                    <ListItemText
                        primaryTypographyProps={{
                            variant: 'subtitle1',
                            style: {
                                color: '#202124',
                                fontSize: '18px'
                            }
                        }}
                        primary={'BLOG SYSTEM'}
                        secondary={
                            <>
                                {posts.map((post, index) => (
                                    <List style={{ marginLeft: '-16px' }} key={index}>
                                        <ListItem
                                            button
                                            onClick={(event) => collapseMenu(event, index)}
                                        >
                                            <ListItemText
                                                primary={post.title}
                                                //@ts-ignore
                                                primaryTypographyProps={{
                                                    variant: 'subtitle2',
                                                    className: classes.sidebarMainLink,
                                                }}
                                            />

                                        </ListItem>
                                        <Collapse in={collapse[index]} timeout="auto" unmountOnExit>
                                            <List component="ul">
                                                {post.posts.map((post, key) => (
                                                    <ListItem
                                                    key={key}
                                                        button
                                                        className={classes.nested}>
                                                        <ListItemText
                                                            primary={
                                                                <NavLink
                                                                    to={`/${username}/${post.url}`}
                                                                    className={classes.sidebarLink}
                                                                    activeClassName={classes.sidebarActiveLink}
                                                                    isActive={() => {


                                                                        return `/${username}/${post.url}` === location.pathname
                                                                    }}
                                                                    onClick={handleDrawerToggle}
                                                                    style={{
                                                                        textDecoration: 'none',
                                                                    }}
                                                                >
                                                                    {post.title}
                                                                </NavLink>
                                                            }
                                                            primaryTypographyProps={{
                                                                variant: 'subtitle2'
                                                            }}
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Collapse>
                                    </List>
                                ))}
                            </>
                        }
                    />
                </ListItem>

                <Divider />

                <ListItem>
                    <ListItemText
                        primaryTypographyProps={{
                            variant: 'subtitle1',
                            style: {
                                color: '#202124',
                                textTransform: 'uppercase',
                                fontSize: '18px'
                            }
                        }}
                        primary={'testimonies'}
                    />
                </ListItem>

                <Divider />

                <ListItem>
                    <ListItemText
                        primaryTypographyProps={{
                            variant: 'subtitle1',
                            style: {
                                color: '#202124',
                                textTransform: 'uppercase',
                                fontSize: '18px'
                            }
                        }}
                        primary={'videos'}
                    />
                </ListItem>
            </List>
        </>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Slide timeout={1000} direction="down" in={slide}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <div className={classes.logo}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>
                            <span className={classes.logoText}>My ragp's blog</span>
                        </div>
                        <div className={classes.navLinks}>
                            <Typography variant="h6">
                                <NavLink
                                    activeClassName={classes.navLinkActive}
                                    isActive={() => true} className={classes.navLink}
                                    to={'/' + username}>
                                    Blog
                                </NavLink>
                            </Typography>
                            <Typography variant="h6">
                                <NavLink className={classes.navLink} to={'/' + username + '/testimonies'}>Testimonies</NavLink>
                            </Typography>
                            <Typography variant="h6">
                                <NavLink className={classes.navLink} to={'/' + username + '/videos'}>Videos</NavLink>
                            </Typography>
                        </div>
                    </Toolbar>
                </AppBar>
            </Slide>
            <nav className={classes.drawer}>
                <Hidden lgUp implementation="css">
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden mdDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbarPadding} />
                <>
                    {props.children}
                </>
            </main>
        </div>
    );
}
//  @ts-ignore
export default withRouter(withStyles(styles)(BlogHeader));