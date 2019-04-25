
import React from 'react'
import classes from './Avatar.module.css'

const Avatar = ({src, size}) => {
  return (
      <img src={
          process.env.NODE_ENV === 'production' ? `https://api.myragpblog.com` + src : "http://localhost:8000" + src
      }
          alt="Your Account"
          className={classes.avatar}
          style={{height: size, width: size}}
      />
  )
}

export default Avatar
