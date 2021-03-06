import AppBar from '@material-ui/core/AppBar';
import Button, {ButtonProps} from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import {Theme} from '@material-ui/core/styles';
import withStyles, {StyleRulesCallback} from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/StarBorder';
import {makeStyles} from '@material-ui/styles';
import Axios, {AxiosError} from 'axios';
import React, {useState} from 'react';
// @ts-ignore
import PaystackButton from 'react-paystack';
import {Link, RouteComponentProps} from 'react-router-dom';
import Progress from '../../Components/Progress/Progress';
import Snackbar from '../../Components/Snackbar/Snackbar';
import SnackbarSpinner from '../../Components/SnackbarSpinner/SnackbarSpinner';

// Type for the tier
interface ITier {
    buttonText: string;
    buttonVariant: ButtonProps['variant'];
    description: string[];
    title: string;
    price: string;
    subheader?: string;
}

// Props interface
interface IProps extends RouteComponentProps {
    classes: any;
}

const useStyles = makeStyles<StyleRulesCallback>((theme: Theme) => ({
    '@global': {
        body: {
            background: `
			linear-gradient(
				to bottom right, ${theme.palette.primary.main} 49%, #f5f5f5 50%, #f5f5f5 100%
			)
		`,
            backgroundRepeat: 'none',
            boxSizing: 'border-box',
            height: '100vh',
        },
        li: {
            listStyle: 'none',
        },
        ul: {
            margin: 0,
            padding: 0,
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    button: {
        margin: '-100px auto 0 !important',
        width: '70% !important',
    },
    card: {
        minHeight: '300px',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        minHeight: '250px',
    },
    cardHeader: {
        backgroundColor: '#fff',
    },
    cardPricing: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: theme.spacing.unit * 2,
        marginTop: '-3rem',
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing.unit * 8,
        paddingBottom: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 3,
        [theme.breakpoints.up('sm')]: {
            paddingBottom: theme.spacing.unit * 6,
            paddingTop: theme.spacing.unit * 6,
        },
    },
    heroContent: {
        boxSizing: 'border-box',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding:
            theme.spacing.unit * 1.2 +
            'px ' +
            theme.spacing.unit * 0 +
            'px ' +
            theme.spacing.unit * 4 +
            'px',
    },
    link: {
        margin: theme.spacing.unit * 1 + ' ' + theme.spacing.unit * 1.5,
    },
    tiers: {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '960px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing.unit * 2,
            paddingRight: theme.spacing.unit * 2,
        },
    },
    toolbar: {
        ...theme.mixins.toolbar,
    },
}));

const tiers: any = [
    {
        buttonText: 'Pay one time',
        buttonVariant: 'outlined',
        description: ['One Time Payment', 'Pay yourself when your package expires'],
        price: '2,500',
        subheader: 'One Time Payment pay yourself when your package expires',
        title: 'One Month',
    },
    /* {
        buttonText: 'Subscribe',
        buttonVariant: 'contained',
        description: ['Pay continuously', 'Automatically charged when your package expires'],
        price: '2,000',
        subheader: "Pay continuously you're automatically charged when your package expires",
        title: 'Subscription',
    },*/
];

const MakePayment = (props: IProps) => {
    const {location, history} = props;
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        message: '',
        show: false,
        type: '',
    });

    /**
     * Processes the one time payment method
     *
     */
    const payOneTimeBill = async () => {
        setLoading(true);
        // send payment request to the server
        try {
            const response = await Axios.post('payment/pay-once', {id: 1});
            if (response.status === 200) {
                // Grab the data
                const {data} = response;
                if (!data.authorizationUrl) {
                    setLoading(false);
                    setSnackbar({type: 'error', message: 'Error, check your network', show: true});
                    return;
                }
                setSnackbar({type: 'success', message: 'Redirecting to Paystack', show: true});
                window.location.href = data.authorizationUrl;
            }
        } catch (error) {
            const err = error as AxiosError;
            if (err.response) {
                if (err.response.status === 403) {
                    history.push('/login?returnUrl=' + location.pathname);
                }
            }
        }
        setLoading(false);
    };

    /**
     * Processes the subscription payment
     *
     */
    const paySubscriptionBill = async () => {
        // send payment request to the server
        try {
            const response = await Axios.post('payment/pay-subscription');
        } catch (error) {
            const err = error as AxiosError;
            if (err.response) {
                if (err.response.status === 403) {
                    history.push('/login?returnUrl' + location.pathname);
                }
            }
        }
    };

    /**
     * Checks the title  to know the tier and calls the tier function
     *
     * @param title string
     *
     */
    const submit = (title: string) => async (): Promise<void> => {
        if (title === 'One Month') {
            await payOneTimeBill();
            return;
        }
        await paySubscriptionBill();
    };

    return (
        <div>
            {
                // @ts-ignore
                <Snackbar
                    type={snackbar.type}
                    open={snackbar.show}
                    message={snackbar.message}
                    onClose={() => setSnackbar(s => ({...s, show: false}))}
                />
            }
            <div className={classes.toolbar} />
            <Progress show={loading} />
            <SnackbarSpinner loading={loading} />
            <main style={{maxWidth: '600px'}} className={classes.heroContent}>
                <Typography
                    variant="h4"
                    align="center"
                    style={{color: 'white'}}
                    gutterBottom={true}
                >
                    Pricing
                </Typography>
                <Typography variant="h6" align="center" style={{color: 'white'}} component="p">
                    Select your package
                </Typography>
            </main>
            {/* End hero unit */}
            <main className={classes.tiers}>
                <Grid container={true} spacing={8} alignItems="flex-end" justify="center">
                    {tiers.map((tier: ITier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid
                            item={true}
                            className={classes.grid}
                            key={tier.title}
                            justify="center"
                            xs={12}
                            sm={4}
                        >
                            <Card className={classes.card}>
                                <CardHeader
                                    title={tier.title}
                                    titleTypographyProps={{align: 'center'}}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                        variant: 'subtitle2',
                                        className: classes.subHeader,
                                    }}
                                    subheader={tier.subheader}
                                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                                    className={classes.cardHeader}
                                />
                                <CardContent className={classes.cardContent}>
                                    <div className={classes.cardPricing}>
                                        <Typography component="h2" variant="h3" color="textPrimary">
                                            ₦{tier.price}
                                        </Typography>
                                        <Typography variant="h6" color="textSecondary">
                                            per month
                                        </Typography>
                                    </div>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        className={classes.button}
                                        fullWidth={true}
                                        onClick={submit(tier.title)}
                                        variant={tier.buttonVariant}
                                        color="primary"
                                    >
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </main>
        </div>
    );
};

export default MakePayment;
