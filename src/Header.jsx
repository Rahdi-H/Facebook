import React, { useContext, useState } from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import { Avatar, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ForumIcon from '@mui/icons-material/Forum';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserContext from './context/UserContext';
import supabase from '../supabase_config';

function Header() {
    const [drop, setDrop] = useState(false)
    const [noti, setNoti] = useState(false)
    const [chat, setChat] = useState(false)
    const {user} = useContext(UserContext)
    const {setUser} = useContext(UserContext)
    async function sign_out(){
        const {error} = await supabase.auth.signOut()
        if (error == null) {
            setUser(null)
        }
    }
    function notification(){
        setNoti(!noti)
    }
    function ChatToggle(){
        setChat(!chat)
    }
  return (
    <div className='header'>
        <div className="header__left">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png" alt="" />
            <div className='header__input'>
                <SearchIcon/>
                <input placeholder='Search Facebook' type="text" />
            </div>
        </div>
        <div className="header__center">
            <div className='header__option header__option--active'>
                <HomeIcon fontSize='large'/>
            </div>
            <div className='header__option'>
                <FlagIcon fontSize='large'/>
            </div>
            <div className='header__option'>
                <SubscriptionsOutlinedIcon fontSize='large'/>
            </div>
            <div className='header__option'>
                <StorefrontOutlinedIcon fontSize='large'/>
            </div>
            <div className='header__option'>
                <SupervisedUserCircleOutlinedIcon fontSize='large'/>
            </div>
        </div>
        <div className="header__right">
            <div className='header__info'>
                <Avatar src={user.photo}/>
                <h4>{user.firstname} {user.lastname}</h4>
            </div>
            <IconButton>
                <AddIcon/>
            </IconButton>
            <IconButton onClick={ChatToggle}>
                <ForumIcon/>
                
            </IconButton>
            <IconButton onClick={notification}>
                <NotificationsActiveIcon/>
                {noti && <div className='header__noti'>
                    <h5>Notifications</h5>
                    <p>No notifications</p>
                </div> }
            </IconButton>
            <IconButton onClick={()=> setDrop(!drop)}>
                <ExpandMoreIcon />
                {drop && <div className='header__more'>
                    <h5 onClick={sign_out} className='logout'>Logout</h5>
                </div> }
            </IconButton>
        </div>
        {chat && <div  className='header__chat'>
                    Im CHat
                </div> }
    </div>
  )
}

export default Header;