import React from 'react'
import { NavLink } from 'react-router-dom';
import Aux from '../../../Hoc/Aux/Aux';
import classes from './Post.module.css';

const Post = props => {
    const username = localStorage.getItem('username');
    return (
        <Aux>
            <NavLink to={`/${username}/post?${1}`} className={classes.postlink} >
                <article className={classes.post}>
                    <h2 className={classes.posthead}>{props.post.title}</h2>
                    <small className={classes.postsubtitle}>{props.post.subtitle}</small>
                    <div className={classes.postadmin}>
                        <small>{props.post.author} - {props.post.date}</small>
                    </div>
                </article>
            </NavLink>
        </Aux>
    )
}

export default Post
