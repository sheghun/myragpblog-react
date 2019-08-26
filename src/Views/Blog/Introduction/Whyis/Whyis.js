// cSpell:ignore overline RAGP

import React, { useContext } from 'react';

// @material-ui components
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom"

// @material-ui icons
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ArrowBackwardIcon from '@material-ui/icons/ArrowBack'
import BrightnessIcon from '@material-ui/icons/Brightness1'

// Personal imports
import Aux from '../../../../Hoc/Aux/Aux';

// Base Styles
import * as baseStyles from '../../../../baseStyles';
import { BlogContext } from '../../../../Context';

// Styles

const styles = theme => ({
	breadcrumbs: {
		marginLeft: '32px',
		marginTop: '100px',
	},
	breadCrumbsSeparator: {
		display: 'inline-block',
		marginLeft: '1rem',
		marginRight: '1rem'
	},
	breadCrumbsText: {
		color: 'rgba(0, 0, 0, 0.7)',
		fontSize: '12px',
		fontWeight: '700',
		letterSpacing: '1px',
		textDecoration: 'none',
		'&:hover': {
			color: 'rgba(0, 0, 0, 0.3)',
		}
	},
	breadCrumbsTextActive: {
		color: 'rgba(0, 0, 0, 0.3)',
		fontSize: '12px',
		fontWeight: '700',
		letterSpacing: '1px',
		textDecoration: 'none',
	},
	video: {
		maxWidth: '560px',
		width: '100%'
	},
	body: {
		color: baseStyles.faintColor
	},
	continueReading: {
		marginBottom: '24px'
	}
});

const lists = [
	'Buy or Build That DREAM House',
	'Buy that dream car',
	'Marry That DREAM Wife/Husband',
	'Start and Build That DREAM Family',
	'Move To That DREAM Neighbourhood',
	'Start That DREAM Project',
	'Take That DREAM Vacation',
	'Travel To That DREAM Country',
	'Give You/Your Kids That DREAM Education',
	'Fund/Support That DREAM Noble Cause',
	'Change and Impact Those LIVES',
	'Build and Live That DREAM LEGACY',
	'SIMPLY FUND and LIVE YOUR DREAMS!!!'
]

const Post = (props) => {
	const { classes } = props
	const { username } = useContext(BlogContext);
	console.log(props)
	return (
		<Aux>
			<div className={classes.breadcrumbs}>
				<Typography variant="overline">
					<Link to={`/${username}/welcome-note`} className={classes.breadCrumbsText}>Introduction
                        <span className={classes.breadCrumbsSeparator}>/</span>
					</Link>
					<Link
						to={`/${username}/welcome-note`}
						className={[classes.breadCrumbsTextActive].join(' ')}
					>
						Why Recharge and get paid?
                    </Link>
				</Typography>
			</div>
			<div>
				<h1>Why Recharge and get paid?</h1>
				<br /><Divider /><br />
				<Typography className={classes.body} variant="body2">
					At This Point, You Might Be Asking, <strong>"WHAT  IS THIS RAGP ALL ABOUT?!</strong>
					<br />
					Well, In A Nutshell, <strong>RAGP IS ALL ABOUT YOU (YES, YOU!) BEING ABLE TO  LIVE YOUR DREAM LIFESTYLE!!!</strong>
					<br /><br />
					It's All About You <strong>MAKING THE MONEY AND THE TIME To Lead The LIFESTYLE</strong> You've Always Dreamt  Of and Wanted; But Couldn't LIVE Because You Lacked Two Essential Things: <strong>THE MONEY &amp; THE TIME!!!</strong> Just For A Minute, IMAGINE YOU...(Yes, YOU!):
                    <br />
					18 Months Later…
                    <br /><br />
					Earning N50k or N100k As  DAILY PASSIVE INCOME, For Sure For Sure!?!?!?
    Imagine What That Kind Of Income Can Do To You?! How It Can Dramatically & POSITIVELY Change Your Life!?
    CERTAINLY, WITH SUCH AN INCOME...
    YOU CAN:
    ✓Buy That DREAM Car;
    ✓Buy or Build That DREAM House;
    ✓Marry That DREAM Wife/Husband;
    ✓Start & Build That DREAM Family;
    ✓Move To That DREAM Neighbourhood;
    ✓Start That DREAM Project;
    ✓Take That DREAM Vacation;
    ✓Travel To That DREAM Country;
    ✓Give You/Your Kids That DREAM Education;
    ✓Fund/Support That DREAM Noble Cause;
    ✓Change & Impact Those LIVES;
    ✓Build & Live That DREAM LEGACY; etc
    ✓SIMPLY FUND & LIVE YOUR DREAMS!!!

    It's All About YOU MAKING THE MONEY & THE TIME TO FUND & LIVE YOUR DREAM LIFESTYLE!!!

    It's All About You MAKING THE MONEY(N50k or N100k) While You Sleep (DAILY WITH PASSIVE INCOME)

    So, If You're All For That, READ ON; or
    Tap Here(A LINK) To Join & Start Right Away!!!

    THATS WHAT RAGP IS ALL ABOUT!!!
    So, Why Should You Join RAGP?!
    Cause You Have All These Dreams & And You A SYSTEM/BUSINESS/MEANS To MAKE ALL THE MONEY & TIME TO MAKE YOUR DREAMS COME TRUE!!!
    YEA! THAT’S SIMPLY WHY YOU SHOULD JOIN RAGP!!!
    RIGHT AWAY!!!
    **(Tap Here To Join & Start Right Now)


                    <br /><br /><br />

					<Typography variant="h5">Why should i join RAGP?</Typography>
					<br /><Divider /><br />
					It's all about you make the money and the time to live the lifestyle you've always dream of and wanted, but couldn't live because you lacked two essential things.
                    <br />
					<strong>The money and the time</strong> just for a minute, imagine you, 18 months later earning &#8358;50k or &#8358;100k as daily massive income, for sure, imagine what that kind of income can do to you, how it can dramatically and positively change your life? certainly, with such an income you can.
                    <List>
						{lists.map(text => (
							<ListItem>
								<ListItemIcon>
									<BrightnessIcon style={{ fontSize: '8px' }} color="primary" fontSize="small" />
								</ListItemIcon>
								<ListItemText
									primary={text.charAt(0).toUpperCase() + text.slice(1, text.length).toLowerCase()}
									primaryTypographyProps={{ style: { color: baseStyles.faintColor } }}
								/>
							</ListItem>
						))}
					</List>
					<br />
					It's all about you making the money and the time to fund and live your dream lifestyle!.
                    <br />It's all about you making the money (&#8358;50k or &#8358;100k) while you sleep ( daily with passive income ).
                    <br />
					So, if you're all for that, read on or <a to="http://rechargeandgetpaid.com/register.php">click here </a>
					to learn how to join and start right away thats what RAGP is all about and thats simply why you should join RAGP right away
                </Typography>
				<br /><br />
			</div>
			<Typography align="center" className={classes.continueReading} variant="h6">Continue Reading</Typography>
			<div style={baseStyles.pagination}>
				<div style={baseStyles.paginationBack}>
					<Link to={"/" + username + "/what-is-RAGP"}>
						<Button variant="contained" color="primary">
							<span style={baseStyles.backwardIcon}><ArrowBackwardIcon /></span>
							Why Ragp?
                    </Button>
					</Link>
				</div>
				<div style={baseStyles.paginationForward}>
					<Link to={"/" + username + "/the-business-model"}>
						<Button variant="contained" color="primary">
							The Business Model
                        <span style={baseStyles.forwardIcon}><ArrowForwardIcon /></span>
						</Button>
					</Link>
				</div>
			</div>
		</Aux>
	)
}

export default withStyles(styles)(Post);
