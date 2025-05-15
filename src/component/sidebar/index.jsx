import React from 'react'
import { BookIcon, DashboardIcon, HelpIcon, NetworkIcon, ProfileIcon, SettingIcon, TransactionIcon } from '../../icons/icons'
import { Link, useLocation } from 'react-router-dom'
import './sidebar.scss'

const Sidebar = () => {
    const location = useLocation()
    return (
        <div className='sidebar-wrapped'>
            <div className='logo'>
                <Link to='/'>
                    <img src='/images/fulllogo.png' />
                </Link>
            </div>
            <div className='menulist'>
                <ul>
                    <li><Link to='/myaccount/dashboard' className={location.pathname.includes('/dashboard') ? 'active' : ''}>
                        <DashboardIcon /> Dashboard</Link></li>
                    <li><Link to='/myaccount/myplans' className={location.pathname.includes('/myplans') ? 'active' : ''}>
                        <BookIcon />Learning Plan</Link></li>
                    <li><Link to='/myaccount/transactions' className={location.pathname.includes('/transactions') ? 'active' : ''}><TransactionIcon />
                        Transaction</Link></li>
                    <li><Link to='/myaccount/networks' className={location.pathname.includes('/networks') ? 'active' : ''}>
                        <NetworkIcon /> Network</Link></li>
                    <li><Link to='/#'><ProfileIcon /> Profile</Link></li>
                    <li><Link to='/#'><SettingIcon /> Setting</Link></li>
                    <li><Link to='/#'><HelpIcon /> Help</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar