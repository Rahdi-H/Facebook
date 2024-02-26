import { Avatar } from '@mui/material';
import './Story.css'
import React from 'react'

function Story({image, profilePicture, title}) {
  return (
    <div style={{backgroundImage: `url(${image})`}} className='story'>
        <Avatar className='story__avatar' src={profilePicture}/>
        <h4>{title}</h4>
    </div>
  )
}

export default Story;