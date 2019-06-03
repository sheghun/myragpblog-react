import React, { useEffect } from "react";
import Axios from "axios";
import { withRouter, RouteComponentProps } from "react-router";
import Spinner from "../../Components/Spinner/Spinner";

interface IProps extends RouteComponentProps { }

const LogOut = (props: IProps) => {

    const { history } = props;

    useEffect(() => {
        // Asynchronous function
        (async () => {
            const response = await Axios.get('/member/logout');
            if (response.status === 200) {
                history.push('/');
            }
		})()
    })

    return <Spinner />
}

export default withRouter(LogOut);