import React, { Component } from 'react'
import Post from './Post/Post';

class Posts extends Component {


    render() {
        return (
            this.props.posts.map((post, index) => (
                <Post key={index} post={post} />
            ))
        )
    }
}

export default Posts
