import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import './header.scss'
import { UserIcon } from "../../icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "@mui/icons-material";
import imageMap from "../../utils/helpers";
import Drawer from 'react-modern-drawer'

const baseUrl = import.meta.env.VITE_BASE_URL;

const Header = () => {
    const { auth_token } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    return (
        <header>
            <div className="header-wrapped">
                <div className="logo" onClick={() => navigate(`${baseUrl}`)}>
                    <img src="/test/images/logo-1.png" alt="logo" />
                    <h2>AZTECH</h2>
                </div>
                <div className='searchbox'>
                    <div className='search-icon'><Search color="#ccc" /></div>
                    <input placeholder="Search" name="search" />
                </div>
                <div className="menu">
                    <ul>
                        <li><Link to={`${baseUrl}`} className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                        <li><Link to={`${baseUrl}products`} className={location.pathname === '/products' ? 'active' : ''}>Products</Link></li>
                        <li><Link to={`${baseUrl}services`} className={location.pathname === '/services' ? 'active' : ''}>Services</Link></li>
                    </ul>
                    <button type="button" className="orange-button" onClick={() => navigate(auth_token ? `${baseUrl}myaccount/dashboard` : `${baseUrl}login`)}>
                        {auth_token ? <span>My Account <UserIcon /></span> : `Login`}
                    </button>
                </div>
                <button type="button" className="menu-toggle bg-transparent border-0" onClick={toggleDrawer}>
                    <img src={imageMap['menu.svg']} alt="img" />
                </button>
            </div>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                className='mobile-menu'
                style={{ width: "200px" }}>

                <ul>
                    <li>
                        <div className="logo" onClick={() => navigate(`${baseUrl}`)}>
                            <img src="/test/images/logo-1.png" alt="logo" />
                            <h2>AZTECH</h2>
                        </div>
                    </li>
                    <li><Link to={`${baseUrl}`} className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                    <li><Link to={`${baseUrl}products`} className={location.pathname === '/products' ? 'active' : ''}>Products</Link></li>
                    <li><Link to={`${baseUrl}services`} className={location.pathname === '/services' ? 'active' : ''}>Services</Link></li>
                    <li>
                        <button type="button" className="bg-transparent border-0" onClick={() => navigate(auth_token ? `${baseUrl}myaccount/dashboard` : `${baseUrl}login`)}>
                            {auth_token ? <span>My Account </span> : `Login`}
                        </button>
                    </li>
                </ul>

            </Drawer>
        </header>
    )
}
export default Header;