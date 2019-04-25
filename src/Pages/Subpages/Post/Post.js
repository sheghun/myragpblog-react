import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Aux from '../../../Hoc/Aux/Aux';
import avatar from '../../../assets/images/coffecompress.jpg';
import classes from './Post.module.css';

class Post extends Component {
    render() {
        const postwrapper = [classes.postwrapper, 'base'];
        return (
            <Aux>
                <div className={classes.breadcrumbs}>
                    <NavLink to="/" className={classes.breadcrumbstext}>Home / </NavLink>
                    <NavLink to="/" className={classes.breadcrumbstext}>What is Recharge And Get Paid</NavLink>
                </div>
                <div className={postwrapper.join(' ')}>
                    <div className={classes.posttexts}>
                        <div className={classes.overline}>
                            <p>By Oladiran Segun</p>
                            <img src={avatar} className={classes.avatar} alt='Avatar of author' />
                        </div>
                        <h2>What is Recharge And Get Paid</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                        <div className={classes.navigators}>
                            <div><span className={classes.arrows}>&larr;</span>  </div>
                            <div>How do i make money?<span>&rarr;</span></div>
                        </div>
                    </div>
                    <div className={classes.postvideo}>
                        <iframe
                            className={classes.video}
                            title="working"
                            src="https://www.youtube.com/embed/SQEoVgPsjqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                    </div>
                </div>

            </Aux>
        )
    }
}

export default Post
