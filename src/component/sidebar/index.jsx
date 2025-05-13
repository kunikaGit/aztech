import React from 'react'
import { BookIcon, DashboardIcon, HelpIcon, NetworkIcon, ProfileIcon, SettingIcon, TransactionIcon } from '../../icons/icons'
import { Link } from 'react-router-dom'
import './sidebar.scss'

const Sidebar = () => {
    return (
        <div className='sidebar-wrapped'>
            <div className='logo'>
                <img src='/images/fulllogo.png' />
            </div>
            <div className='menulist'>
                <ul>
                    <li><Link to='/#'><DashboardIcon /> Dashboard</Link></li>
                    <li><Link to='/#'><BookIcon />Learning Plan</Link></li>
                    <li><Link to='/#'><TransactionIcon /> Transaction</Link></li>
                    <li><Link to='/#'><NetworkIcon /> Network</Link></li>
                    <li><Link to='/#'><ProfileIcon /> Profile</Link></li>
                    <li><Link to='/#'><SettingIcon /> Setting</Link></li>
                    <li><Link to='/#'><HelpIcon /> Help</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar