
import React from 'react'
import classes from './Avatar.module.css'

const Avatar = ({src, size}) => {
  return (
      <img src={src}
          alt="Your Account"
          className={classes.avatar}
          style={{height: size, width: size}}
      />
  )
}

export default Avatar
