import React from 'react'
import { BookIcon, DashboardIcon, HelpIcon, NetworkIcon, ProfileIcon, SettingIcon, TransactionIcon, StarIcon,Logout } from '../../icons/icons'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import './sidebar.scss';
import { logout } from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from 'react-redux'

const baseUrl = import.meta.env.VITE_BASE_URL;

const Sidebar = () => {
    const location = useLocation()
        const dispatch = useDispatch()
    const navigate = useNavigate()
        const handleLogout = (e) => {
            e.preventDefault()
            dispatch(logout());
            navigate(`${baseUrl}`);
        };

    return (
        <div className='sidebar-wrapped'>
            <div className='logo'>
                <Link to={`${baseUrl}`}>
                    <img src={`${baseUrl}images/fulllogo.png`} />
                </Link>
            </div>
            <div className='menulist'>
                <ul>
                    <li><Link to={`${baseUrl}myaccount/dashboard`} className={location.pathname.includes('/dashboard') ? 'active' : ''}>
                        <DashboardIcon /> Dashboard</Link></li>
                    <li><Link to={`${baseUrl}myaccount/packages`} className={location.pathname.includes('/packages') ? 'active' : ''}>
                        <StarIcon /> Packages</Link></li>
                    <li><Link to={`${baseUrl}myaccount/games`} className={location.pathname.includes('/games') ? 'active' : ''}>
                        <BookIcon /> Games</Link></li>
                    <li><Link to={`${baseUrl}myaccount/mall`} className={location.pathname.includes('/mall') ? 'active' : ''}>
                        <BookIcon /> Mall</Link></li>
                    <li><Link to={`${baseUrl}myaccount/transactions`} className={location.pathname.includes('/transactions') ? 'active' : ''}><TransactionIcon />
                        Transaction</Link></li>
                    <li><Link to={`${baseUrl}myaccount/networks`} className={location.pathname.includes('/networks') ? 'active' : ''}>
                        <NetworkIcon /> Network</Link></li>
                    <li><Link to={`${baseUrl}myaccount/profile`} className={location.pathname.includes('/profile') ? 'active' : ''}>
                        <ProfileIcon /> Profile</Link></li>
                    <li><Link to={`${baseUrl}#`}><SettingIcon /> Setting</Link></li>
                    <li><Link to={`${baseUrl}myaccount/help`} className={location.pathname.includes('/help') ? 'active' : ''}><HelpIcon /> Help</Link></li>
                    <li><Link onClick={(e)=>{handleLogout(e)}}><Logout /> Logout</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar