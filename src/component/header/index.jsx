import React,{useEffect} from "react"
import { Link, useNavigate } from "react-router-dom";
import './header.scss'
import { UserIcon } from "../../icons/icons";
import { useDispatch, useSelector } from "react-redux";
const baseUrl = import.meta.env.VITE_BASE_URL;

const Header = () => {
      const { auth_token } = useSelector((state) => state.auth);
    
    const navigate = useNavigate();

    return (
        <header>
            <div className="header-wrapped">
                <div className="logo" onClick={() => navigate(`${baseUrl}`)}>
                    <img src="/test/images/logo.png" alt="logo" />
                    <h2>AZTECH</h2>
                </div>
                <div className="menu">
                    <ul>
                        <li><Link to={`${baseUrl}`} className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                        <li><Link to={`${baseUrl}products`} className={location.pathname === '/products' ? 'active' : ''}>Products</Link></li>
                        {/* <li><Link to={`${baseUrl}about-us`} className={location.pathname === '/about-us' ? 'active' : ''}>About Us  </Link></li> */}
                        <li><Link to={`${baseUrl}services`} className={location.pathname === '/services' ? 'active' : ''}>Services</Link></li>
                        {/* <li><Link>Blog</Link></li> */}
                    </ul>
                </div>
                <div className="actions">
                    <button type="button" className="orange-button" onClick={()=>navigate(auth_token?`${baseUrl}myaccount/dashboard`:`${baseUrl}login`)}>
                       {auth_token? `My Account`:`Login`}
                        <UserIcon />
                    </button>
                </div>
            </div>
        </header>
    )
}
export default Header;