import React from 'react';
import './Post.css';
import { Avatar } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Post({profilePic, image, username, timestamp, caption}) {
  return (
    <div className='post'>
        <div className='post__top'>
            <Avatar src={profilePic} className='post__avatar'/>
            <div className='post__topInfo'>
                <h3>{username}</h3>
                <p>{timestamp}</p>
            </div>
        </div>
        <div className='post__bottom'>
            <p>{caption}</p>
        </div>
        <div className='post__image'>
            {image &&
            <img src={image} alt="There should be an image" />
            }
        </div>
        <div className='post__options'>
            <div className='post__option'>
                <ThumbUpAltIcon/>
                <h4>Like</h4>
            </div>
            <div className='post__option'>
                <ChatBubbleOutlineOutlinedIcon/>
                <h4>Comment</h4>
            </div>
            <div className='post__option'>
                <ShareIcon/>
                <h4>Share</h4>
            </div>
            <div className='post__option'>
                <ExpandMoreIcon/>
                <h4>More</h4>
            </div>
        </div>
    </div>
  )
}

export default Post