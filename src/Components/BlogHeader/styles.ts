import {Theme} from '@material-ui/core/styles';

const drawerWidth = 250;

const useStyles = (theme: Theme) => ({
    root: {
        display: 'flex',
        width: '100%',
    },
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    logo: {
        height: '100%',
    },
    appBar: {
        marginLeft: drawerWidth,
        height: '70px',
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginTop: '-8px',
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        height: 'maxContent',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    toolbarPadding: {
        marginTop: '120px',
    },
    navLinks: {
        display: 'flex',
        justifyContent: 'space-between',
        minWidth: '350px',
        [theme.breakpoints.up('md')]: {
            width: '30%',
        },
    },
    navLink: {
        color: '#9E9E9F',
        alignItems: 'center',
        paddingBottom: '18px',
        textDecoration: 'none',
        transition: 'all .5s ease-in-out',
        '&:hover': {
            color: 'white',
        },
    },
    navLinkActive: {
        borderBottom: 'solid 4px white',
        color: 'white',
    },
    drawerPaper: {
        width: drawerWidth,
    },
    sidebarSub: {
        color: '#202124',
    },
    content: {
        boxSizing: 'border-box',
        flexGrow: 1,
        width: '100%',
        padding: theme.spacing.unit * 3,
    },
    logoText: {
        display: 'inline-block',
        fontFamily: 'Great Vibes, cursive',
        paddingBottom: '16px',
        fontSize: '24px',
        marginTop: '24px',
        cursor: 'pointer',
        textTransform: 'capitalize',
    },
    sideBarLogoText: {
        fontFamily: 'Great Vibes, cursive',
        paddingBottom: '8px',
        fontSize: '24px',
        textTransform: 'capitalize',
        margin: '0 auto 0',
        marginTop: '16px',
    },
    sidebarLink: {
        textDecoration: 'none',
        color: '#5f6368 !important',
        fontWeight: '400',
        marginLeft: '16px',
    },
    sidebarActiveLink: {
        color: theme.palette.primary.main + ' !important',
    },
    sidebarMainLink: {
        // color: "red !important",
        fontWeight: '400',
    },
    sidebarMainLinkActive: {
        color: '#202124',
    },
    [theme.breakpoints.up('lg')]: {
        navLinks: {
            width: '30%',
        },
    },
    [theme.breakpoints.down('md')]: {
        navLinks: {
            width: '320px',
        },
    },
    [theme.breakpoints.down('xs')]: {
        navLinks: {
            maxWidth: '100vw',
            boxSizing: 'border-box',
            overflowY: 'scroll',
            marginTop: '-0.2rem',
            marginLeft: '-1rem',
            paddingLeft: '16px',
        },
        navLink: {
            marginTop: '-24px',
            paddingBottom: '16px',
        },

        appBar: {
            height: '120px',
        },
    },
});

export default useStyles;
