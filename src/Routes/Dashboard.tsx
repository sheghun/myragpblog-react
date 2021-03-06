// @material-ui/icons
import Wallet from "@material-ui/icons/AccountBalanceWallet";
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import ToggleOff from "@material-ui/icons/ToggleOff";

// core components/views
import Notifications from "../Views/Base/Notifications/Notifications";
import DashboardPage from "../Views/Dashboard/Dashboard";
import LogOut from "../Views/Dashboard/Logout";
import Transactions from "../Views/Dashboard/Transactions";
import UserProfile from "../Views/Dashboard/UserProfile";

const dashboardRoutes = [
	{
		component: DashboardPage,
		icon: Dashboard,
		navbarName: "DASHBOARD",
		path: "/dashboard/overview",
		sidebarName: "DASHBOARD",
	},
	{
		component: UserProfile,
		icon: Person,
		navbarName: "PROFILE",
		path: "/dashboard/profile",
		sidebarName: "PROFILE",
	},
	{
		component: Transactions,
		icon: Wallet,
		navbarName: "TRANSACTIONS",
		path: "/dashboard/transactions",
		sidebarName: "TRANSACTIONS",
	},
	// {
	// 	component: Notifications,
	// 	icon: Wallet,
	// 	navbarName: "NOTIFICATIONS",
	// 	path: "/dashboard/notifications",
	// 	sidebarName: "NOTIFICATIONS",
	// },
	{
		component: LogOut,
		icon: ToggleOff,
		path: "/dashboard/logout",
		sidebarName: "LOGOUT",

	},
];

export default dashboardRoutes;
