import React from "react"
import { Link, useNavigate } from "react-router-dom";
import './header.scss'
import { UserIcon } from "../../icons/icons";
const Header = () =>{
    const navigate = useNavigate()
    return(
            <header>
                <div className="header-wrapped">
                    <div className="logo" onClick={()=>navigate('/')}>
                       <img src="/images/logo.png" alt="logo"/>
                       <h2>AZTECH</h2>
                    </div>
                    <div className="menu">
                        <ul>
                            <li><Link to='/' className={location.pathname === '/' ? 'active':''}>Home</Link></li>
                            <li><Link to='/courses' className={location.pathname === '/courses' ? 'active':''}>Courses</Link></li>
                            <li><Link>About Us  </Link></li>
                            <li><Link>Services</Link></li>
                            <li><Link>Blog</Link></li>
                        </ul>
                    </div>
                    <div className="actions">
                        <button type="button" className="orange-button">
                            My Account 
                            <UserIcon/>
                        </button>
                    </div>
                </div>
            </header>
    )
}
export default Header;