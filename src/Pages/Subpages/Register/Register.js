import React from 'react'
import { withRouter } from 'react-router-dom'
const FirstForm = React.lazy(() => import('./Forms/FirstForm'))
const SecondForm = React.lazy(() => import('./Forms/SecondForm'))
const ThirdForm = React.lazy(() => import('./Forms/ThirdForm'))

const Register = (props) => {

        switch (props.match.params.step) {
            case '1':
                return <FirstForm />
            case '2':
                return <SecondForm />
            case '3':
                return <ThirdForm />
            default: 
                return null
        }
}



export default withRouter(Register);
