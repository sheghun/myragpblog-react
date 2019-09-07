// cSpell:ignore  MRPI to\'s

import AppBar from '@material-ui/core/AppBar';
import Collapse from '@material-ui/core/Collapse';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import {unstable_useMediaQuery as useMediaQuery} from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Slide from '@material-ui/core/Slide';
import {withStyles, Theme} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import {BlogContext} from '../../Context';
import myRagpLogo from '../../assets/images/myragpblog-logo.jpg';
import styles from './styles';

interface CollapseType {
    [key: number]: boolean;
}

interface PropsType extends RouteComponentProps {
    children: JSX.Element;
    classes: any;
    routes: RoutType[];
}

interface RoutType {
    path: string;
    component: React.Component;
}

const posts = [
    {
        posts: [
            {title: 'Company Profile', url: 'company-profile'},
            {title: 'What Is RAGP', url: 'what-is-ragp'},
            {title: 'Why RAGP', url: 'why-ragp'},
        ],
        title: 'Introduction',
    },
    {
        posts: [
            {title: 'The Business Model', url: 'the-business-model'},
            {title: 'The Compensation Plan', url: 'the-compensation-plan'},
            {
                title: 'The 6 Income Streams',
                url: '#',
                posts: [
                    {title: 'Direct Recharge Bonus (DRB)', url: 'direct-recharge-bonus'},
                    {title: 'Indirect Recharge Bonus (IRB)', url: 'indirect-recharge-bonus'},
                    {title: 'Direct Referal Commission (DRC)', url: 'direct-referal-bonus'},
                    {title: 'Indirect Referal Commission (IRC)', url: 'indirect-referal-bonus'},
                    {title: 'Leadership Bonus (via MPV)', url: 'leadership-bonus'},
                    {title: 'Incentive Awards (Via CPV)', url: 'incentive-awards'},
                ],
            },
        ],
        title: 'How does it work?',
    },
    {
        posts: [
            {title: 'How To Register Yourself Or Someone', url: 'how-to-register'},
            {title: 'How To Pay Via PayStack', url: 'how-to-pay-with-paystack'},
            {title: 'How To Pay With E-Wallet', url: 'how-to-pay-with-ewallet'},
            {title: 'How To Buy Airtime & Data', url: 'how-to-buy-airtime-and-data'},
        ],
        title: "How to's",
    },
];

const testimonies = [
    {title: 'Ufuoma Emefeke', url: 'ufuoma-emefeke'},
    {title: 'Chucks Emedike', url: 'chucks-emedike'},
];

const BlogHeader = (props: PropsType) => {
    const {classes, history, routes, location} = props;

    const {username} = useContext(BlogContext);

    const theme = useTheme() as Theme;
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

    // Initialize the current route to be the first route
    const [currentRoute, setCurrentRoute] = useState(routes[0] as RoutType);

    const [mobileOpen, setMobileOpen] = useState(false);
    const [slide, setSlide] = useState(true);
    const scrollPos = useRef(0);
    const [collapse, setCollapse] = useState({0: false} as CollapseType);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    useEffect(() => {
        const route = routes.find(r => r.path === location.pathname);
        setCurrentRoute(route as RoutType);
        posts.forEach((post, firstIndex) => {
            // Store the post reference in a variable
            const p = post.posts;
            p.forEach((p, index) => {
                if (`/${username}/${p.url}` === location.pathname) {
                    setCollapse(c => ({...c, [index]: true}));
                } else {
                    if (p.posts) {
                        p.posts.forEach((p, i) => {
                            if (`/${username}/${p.url}` === location.pathname) {
                                console.log(i + 10);
                                setCollapse(c => {
                                    return {...c, [index + 10]: true, [firstIndex]: true};
                                });
                            }
                        });
                    }
                }
            });
        });
    }, [location.pathname]);

    const handleScroll = () => {
        if (window.pageYOffset - scrollPos.current > 300) {
            if (slide) {
                setSlide(false);
            }
            scrollPos.current = window.pageYOffset;
        }

        if (scrollPos.current - window.pageYOffset > 300) {
            if (!slide) {
                setSlide(true);
            }
            scrollPos.current = window.pageYOffset;
        }
    };

    /**
     * @param e: event
     * @param isSubMenu is the parameter containing the cause of the trigger
     */
    const handleDrawerToggle = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, isSubMenu?: string) => {
            if (isLargeScreen) return;
            if (isSubMenu === 'isSubMenu') return;

            setMobileOpen(open => !open);
        },
        [isLargeScreen],
    );

    const collapseMenu = useCallback(
        (_: React.MouseEvent<HTMLElement, MouseEvent>, index: number) => {
            setCollapse(c => ({...c, [index]: !c[index]}));
        },
        [],
    );

    const drawer = (
        <>
            <div className={classes.toolbar} />

            <p className={classes.sideBarLogoText}>
                <img alt={'My Ragp Blog Logo'} width={'99%'} src={myRagpLogo} />
            </p>

            <div style={{marginTop: '24px'}} />

            <List>
                <ListItem>
                    <ListItemText
                        primaryTypographyProps={{
                            style: {
                                color: '#202124',
                                fontSize: '18px',
                            },
                            variant: 'subtitle1',
                        }}
                        primary={'BLOG SYSTEM'}
                        secondary={
                            <>
                                <List style={{marginLeft: '-16px'}}>
                                    <ListItem button={true}>
                                        <ListItemText
                                            primary={
                                                <NavLink
                                                    to={`/${username}/welcome-note`}
                                                    className={classes.sidebarLink}
                                                    activeClassName={classes.sidebarActiveLink}
                                                    style={{
                                                        textDecoration: 'none',
                                                    }}
                                                >
                                                    {'Welcome note'}
                                                </NavLink>
                                            }
                                            // @ts-ignore
                                            primaryTypographyProps={{
                                                className: classes.sidebarMainLink,
                                                variant: 'body1',
                                            }}
                                        />
                                    </ListItem>
                                </List>
                                {posts.map((post, index) => (
                                    <List key={index}>
                                        <ListItem
                                            button={true}
                                            onClick={event => collapseMenu(event, index)}
                                        >
                                            <ListItemText
                                                primary={post.title}
                                                // @ts-ignore
                                                primaryTypographyProps={{
                                                    className: classes.sidebarMainLink,
                                                    variant: 'body1',
                                                }}
                                            />
                                        </ListItem>
                                        <Collapse
                                            in={collapse[index]}
                                            timeout="auto"
                                            unmountOnExit={true}
                                        >
                                            <List component="ul">
                                                {post.posts.map((p, key) => (
                                                    <>
                                                        <ListItem
                                                            key={key}
                                                            button={true}
                                                            className={classes.nested}
                                                        >
                                                            <ListItemText
                                                                primary={
                                                                    <NavLink
                                                                        to={
                                                                            p.posts
                                                                                ? '#'
                                                                                : `/${username}/${p.url}`
                                                                        }
                                                                        className={
                                                                            classes.sidebarLink
                                                                        }
                                                                        activeClassName={
                                                                            classes.sidebarActiveLink
                                                                        }
                                                                        isActive={() => {
                                                                            return (
                                                                                `/${username}/${p.url}` ===
                                                                                location.pathname
                                                                            );
                                                                        }}
                                                                        onClick={e => {
                                                                            handleDrawerToggle(
                                                                                e,
                                                                                p.posts
                                                                                    ? 'isSubMenu'
                                                                                    : '',
                                                                            );
                                                                            // Set the collapse menu with an increment of 10 for sub sub menu
                                                                            collapseMenu(
                                                                                e,
                                                                                key + 10,
                                                                            );
                                                                        }}
                                                                        style={{
                                                                            textDecoration: 'none',
                                                                        }}
                                                                    >
                                                                        {p.title}
                                                                    </NavLink>
                                                                }
                                                                primaryTypographyProps={{
                                                                    variant: 'subtitle2',
                                                                }}
                                                            />
                                                        </ListItem>
                                                        {p.posts && (
                                                            <Collapse
                                                                // Set the collapse menu with an increment of 10 for sub sub menu
                                                                in={collapse[key + 10]}
                                                                timeout="auto"
                                                                unmountOnExit={true}
                                                            >
                                                                {p.posts.map((p, key) => (
                                                                    <ListItem
                                                                        key={key}
                                                                        button={true}
                                                                        style={{
                                                                            marginLeft: '1rem',
                                                                        }}
                                                                    >
                                                                        <ListItemText
                                                                            primary={
                                                                                <NavLink
                                                                                    to={`/${username}/${p.url}`}
                                                                                    className={
                                                                                        classes.sidebarLink
                                                                                    }
                                                                                    activeClassName={
                                                                                        classes.sidebarActiveLink
                                                                                    }
                                                                                    isActive={() => {
                                                                                        return (
                                                                                            `/${username}/${p.url}` ===
                                                                                            location.pathname
                                                                                        );
                                                                                    }}
                                                                                    onClick={
                                                                                        handleDrawerToggle
                                                                                    }
                                                                                    style={{
                                                                                        textDecoration:
                                                                                            'none',
                                                                                    }}
                                                                                >
                                                                                    {p.title}
                                                                                </NavLink>
                                                                            }
                                                                            primaryTypographyProps={{
                                                                                variant:
                                                                                    'subtitle2',
                                                                            }}
                                                                        />
                                                                    </ListItem>
                                                                ))}
                                                            </Collapse>
                                                        )}
                                                    </>
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
                            style: {
                                color: '#202124',
                                fontSize: '18px',
                                textTransform: 'uppercase',
                            },
                            variant: 'subtitle1',
                        }}
                        primary={'testimonies'}
                        secondary={
                            <>
                                <List style={{marginLeft: '-16px'}}>
                                    {testimonies.map(t => (
                                        <ListItem button={true}>
                                            <ListItemText
                                                primary={
                                                    <NavLink
                                                        to={`/${username}/${t.url}`}
                                                        className={classes.sidebarLink}
                                                        activeClassName={classes.sidebarActiveLink}
                                                        style={{
                                                            textDecoration: 'none',
                                                        }}
                                                        onClick={e => handleDrawerToggle(e)}
                                                    >
                                                        {t.title}
                                                    </NavLink>
                                                }
                                                // @ts-ignore
                                                primaryTypographyProps={{
                                                    className: classes.sidebarMainLink,
                                                    variant: 'body1',
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </>
                        }
                    />
                </ListItem>

                <Divider />

                <ListItem>
                    <ListItemText
                        primaryTypographyProps={{
                            style: {
                                color: '#202124',
                                fontSize: '18px',
                                textTransform: 'uppercase',
                            },
                            variant: 'subtitle1',
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
                            <img
                                style={{
                                    paddingTop: '1rem',
                                    paddingBottom: '-1rem',
                                    height: '3rem',
                                }}
                                src={myRagpLogo}
                                alt={'My R A G P Blog logo'}
                            />
                        </div>
                        <div className={classes.navLinks}>
                            <Typography variant="h6">
                                <NavLink
                                    activeClassName={classes.navLinkActive}
                                    isActive={() => true}
                                    className={classes.navLink}
                                    to={'/' + username + '/overview'}
                                >
                                    Blog
                                </NavLink>
                            </Typography>
                            <Typography variant="h6">
                                <NavLink className={classes.navLink} to={'#'}>
                                    Testimonies
                                </NavLink>
                            </Typography>
                            <Typography variant="h6">
                                <NavLink className={classes.navLink} to={'#'}>
                                    Videos
                                </NavLink>
                            </Typography>
                            <Typography variant="h6">
                                <NavLink className={classes.navLink} to={'/dashboard/overview'}>
                                    Dashboard
                                </NavLink>
                            </Typography>
                        </div>
                    </Toolbar>
                </AppBar>
            </Slide>
            <nav className={classes.drawer}>
                <Hidden lgUp={true} implementation="css">
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
                <Hidden mdDown={true} implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open={true}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbarPadding} />
                <>{props.children}</>
            </main>
        </div>
    );
};
//  @ts-ignore
export default withRouter(withStyles(styles)(BlogHeader));
