import React from "react"
import { Link } from "react-router-dom";
import './header.scss'
import { UserIcon } from "../../icons/icons";
const Header = () =>{
    return(
            <header>
                <div className="header-wrapped">
                    <div className="logo">
                       <img src="/images/logo.png" alt="logo"/>
                       <h2>AZTECH</h2>
                    </div>
                    <div className="menu">
                        <ul>
                            <li><Link>Home</Link></li>
                            <li><Link>Courses</Link></li>
                            <li><Link>Programs</Link></li>
                            <li><Link>Pricing</Link></li>
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