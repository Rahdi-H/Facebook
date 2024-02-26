import { Avatar } from '@mui/material';
import './SidebarRow.css'
import React from 'react'

function SidebarRow({src, Icon, title}) {
  return (
    <div className='sidebarRow'>
        {src && <Avatar src={src}/>}
        {Icon && <Icon/>}
        <h4>{title}</h4>
    </div>
  )
}

export default SidebarRow;