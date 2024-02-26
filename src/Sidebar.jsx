import React, { useContext } from 'react'
import './Sidebar.css'
import Image from '../public/rahdi.jpg'
import SidebarRow from './SidebarRow';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import UserContext from './context/UserContext';

function Sidebar() {
  const {user} = useContext(UserContext)
  return (
    <div className='sidebar'>
        <SidebarRow title={`${user.firstname} ${user.lastname}`} src={user.photo ? user.photo:'hello'}/>
        <SidebarRow title="Covid-19 Information center" Icon={LocalHospitalIcon} />
        <SidebarRow title="Pages" Icon={EmojiFlagsIcon} />
        <SidebarRow title="Friends" Icon={PeopleIcon} />
        <SidebarRow title="Messenger" Icon={ChatIcon} />
        <SidebarRow title="Marketplace" Icon={StorefrontIcon} />
        <SidebarRow title="Videos" Icon={VideoLibraryIcon} />
        <SidebarRow title="Videos" Icon={ExpandMoreOutlinedIcon} />
    </div>
  )
}

export default Sidebar;