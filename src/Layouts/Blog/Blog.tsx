// cSpell:ignore Ragp Oladiran Segun Referal godwin Whatsapp

// 'Material-ui Components
import {StyleRulesCallback, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/styles';
import React, {useEffect, useMemo, useState} from 'react';

// Personal Components
// For lazy loading
import loadable from '@loadable/component';
import Avatar from '../../Components/Avatar/Avatar';

// react-router dependencies
import {Route, RouteComponentProps, Switch} from 'react-router-dom';

import Axios, {AxiosError} from 'axios';
import * as helpers from '../../_helpers';
import BlogHeader from '../../Components/BlogHeader/BlogHeader';
import Progress from '../../Components/Progress/Progress';
import Spinner from '../../Components/Spinner/Spinner';
import {BlogContext} from '../../Context';

// react-router dependencies

// Pages
const Welcome = loadable(() => import('../../Views/Blog/Introduction/Welcome/Welcome'), {
    fallback: <Spinner />,
});
const WhyIs = loadable(() => import('../../Views/Blog/Introduction/Whyis/Whyis'), {
    fallback: <Spinner />,
});
const WhatIs = loadable(() => import('../../Views/Blog/Introduction/Whatis/Whatis'), {
    fallback: <Spinner />,
});
const CompanyProfile = loadable(() => import('../../Views/Blog/Introduction/Company/Company'), {
    fallback: <Spinner />,
});
const CompensationPlan = loadable(() => import('../../Views/Blog/How/Compensation'), {
    fallback: <Spinner />,
});
const BusinessModel = loadable(() => import('../../Views/Blog/How/BusinessModel'), {
    fallback: <Spinner />,
});
const IncomeStreams = loadable(() => import('../../Views/Blog/How/IncomeStreams'), {
    fallback: <Spinner />,
});

const useStyles = makeStyles<StyleRulesCallback>((theme: Theme) => ({
    avatar: {
        alignItems: 'center',
        display: 'flex',
        marginLeft: '-2.2rem',
        marginRight: '2rem',
    },
    blog: {
        margin: '64px auto 0',
        maxWidth: '392px',
    },
    captions: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '-.5rem',
        width: '200px',
    },
    captionsWrapper: {
        marginLeft: '1rem',
    },
    hero: {
        // display: 'flex',
        // justifyContent: 'space-between'
    },
    heroNumber: {
        marginTop: '-1.5rem',
    },
    heroText: {
        fontSize: '10px',
    },
    nextButton: {
        textDecoration: 'underline',
    },
    [theme.breakpoints.up('md')]: {
        blog: {
            maxWidth: '840px',
            paddingLeft: '40px',
            paddingRight: '40px',
        },
    },
}));

const Blog = ({match, history}: RouteComponentProps) => {
    const classes = useStyles();

    const {username} = match.params as any;
    const routes = useMemo(
        () => [
            {path: `/${username}/welcome-note`, component: Welcome},
            {path: `/${username}/why-ragp`, component: WhyIs},
            {path: `/${username}/what-is-ragp`, component: WhatIs},
            {
                path: `/${username}/the-compensation-plan`,
                component: CompensationPlan,
            },
            {path: `/${username}/company-profile`, component: CompanyProfile},
            {path: `/${username}/the-6-income-streams`, component: IncomeStreams},
            {path: `/${username}/the-business-model`, component: BusinessModel},
        ],
        [],
    );
    const [routers, setRouters] = useState('') as any;
    const [userDetails, setUserDetails] = useState({
        image: '',
        name: '',
        ragpReferalId: '',
        whatsappNumber: '',
    });
    const [loading, setLoading] = useState(false);

    if (!localStorage.getItem('username')) {
        localStorage.setItem('username', username);
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                // Try sending request to the server

                const {data} = await Axios.get(`/blog?username=${username}`);
                data.name = data.firstName + ' ' + data.lastName;

                setUserDetails(data);

                if (history.location.pathname === `/${username}`) {
                    history.push(`/${username}/welcome-note`);
                }
                if (history.location.pathname === `/${username}/register`) {
                    const urlArray = location.pathname.split('/');
                    history.push(`/register?referalId=${urlArray[1]}`);
                }
                // Mount the routes
                setRouters(
                    routes.map((route, index) => (
                        <Route path={route.path} key={index} component={route.component} />
                    )),
                );
            } catch (error) {
                const {response} = error as AxiosError;
                if (response) {
                    if (response.status === 404) {
                        history.push('/not-found');
                    }
                }
            }
            setLoading(false);
        })();
    }, []);

    if (!localStorage.getItem('username')) {
        localStorage.setItem('username', username);
    }

    return (
        <BlogContext.Provider
            value={{
                image: userDetails.image,
                name: userDetails.name,
                ragpReferalId: userDetails.ragpReferalId,
                username,
                whatsappNumber: userDetails.whatsappNumber,
            }}
        >
            {loading && <Spinner />}
            {
                // @ts-ignore
                <BlogHeader routes={routes}>
                    <div className={classes.blog}>
                        <article className={classes.articleIntro}>
                            <div className={classes.hero}>
                                <div className={classes.heroIntro}>
                                    <Typography variant="overline">Ragp blog</Typography>
                                </div>
                                <div className={classes.avatar}>
                                    <Avatar
                                        src={`${helpers.baseUrl}${userDetails.image}`}
                                        size={100}
                                    />
                                    <div className={classes.captionsWrapper}>
                                        <div className={classes.captions}>
                                            <Typography variant="caption">Name:</Typography>
                                            <Typography variant="overline">
                                                {userDetails.name}
                                            </Typography>
                                        </div>
                                        <div className={classes.captions}>
                                            <Typography variant="caption">Referal ID: </Typography>
                                            <Typography variant="overline">
                                                {userDetails.ragpReferalId}
                                            </Typography>
                                        </div>
                                        <div className={classes.captions}>
                                            <Typography variant="caption">Whatsapp: </Typography>
                                            <Typography variant="overline">
                                                {userDetails.whatsappNumber}
                                            </Typography>
                                        </div>
                                        <div />
                                    </div>
                                </div>
                            </div>
                        </article>
                        <Switch>{routers}</Switch>
                    </div>
                </BlogHeader>
            }
        </BlogContext.Provider>
    );
};

export default Blog;
