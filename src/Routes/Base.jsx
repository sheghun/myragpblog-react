// cSpell:ignore Signin
import Signin from "../Views/Signin/Signin";
import Dashboard from "../Layouts/Dashboard/Dashboard"
import Register from "../Layouts/Register/Register"
import Payment from "../Layouts/Payment/Payment"
import Web from "../Layouts/Web"


const baseRoutes = [
    { path: '/login', component: Signin },
    { exact: true, path: '/', component: Web },
    { path: '/user', component: Dashboard },
    { path: '/payment', component: Payment },
    { path: '/register/:step', component: Register }
    // { from: '/register', to: '/register/1' },
]
export default baseRoutes