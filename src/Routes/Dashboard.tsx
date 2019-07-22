// @material-ui/icons
import Wallet from "@material-ui/icons/AccountBalanceWallet";
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import ToggleOff from "@material-ui/icons/ToggleOff";

// core components/views
import Notifications from "../Views/Base/Notifications/Notifications";
import DashboardPage from "../Views/Dashboard/Dashboard.jsx";
import LogOut from "../Views/Dashboard/Logout";
import Transactions from "../Views/Dashboard/Transactions";
import UserProfile from "../Views/Dashboard/UserProfile";

const dashboardRoutes = [
	{
		component: DashboardPage,
		icon: Dashboard,
		navbarName: "DASHBOARD",
		path: "/user/dashboard",
		sidebarName: "DASHBOARD",
	},
	{
		component: UserProfile,
		icon: Person,
		navbarName: "PROFILE",
		path: "/user/user_profile",
		sidebarName: "PROFILE",
	},
	{
		component: Transactions,
		icon: Wallet,
		navbarName: "TRANSACTIONS",
		path: "/user/transactions",
		sidebarName: "TRANSACTIONS",
	},
	{
		component: Notifications,
		icon: Wallet,
		navbarName: "NOTIFICATIONS",
		path: "/user/notifications",
		sidebarName: "NOTIFICATIONS",
	},
	{
		component: LogOut,
		icon: ToggleOff,
		path: "/user/logout",
		sidebarName: "LOGOUT",

	},
];

export default dashboardRoutes;
