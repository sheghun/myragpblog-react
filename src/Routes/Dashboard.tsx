// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard"
import Person from "@material-ui/icons/Person"
import Wallet from '@material-ui/icons/AccountBalanceWallet'

// core components/views
import DashboardPage from "../Views/Dashboard/Dashboard.jsx"
import UserProfile from "../Views/Dashboard/UserProfile/UserProfile.jsx"
import Transactions from "../Views/Dashboard/Transactions/Transactions"
import Notifications from '../Views/Base/Notifications/Notifications'


const dashboardRoutes = [
  {
    path: "/user/dashboard",
    sidebarName: "DASHBOARD",
    navbarName: "DASHBOARD",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/user/user_profile",
    sidebarName: "PROFILE",
    navbarName: "PROFILE",
    icon: Person,
    component: UserProfile
  },
  {
    path: "/user/transactions",
    sidebarName: "TRANSACTIONS",
    navbarName: "TRANSACTIONS",
    icon: Wallet,
    component: Transactions
    },
  {
    path: "/user/notifications",
    sidebarName: "NOTIFICATIONS",
    navbarName: "NOTIFICATIONS",
    icon: Wallet,
    component: Notifications
  },
];

export default dashboardRoutes;