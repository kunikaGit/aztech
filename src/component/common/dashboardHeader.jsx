import React, { useState } from 'react'
import imageMap from '../../utlis/helper'
import { DownIcon, Logout, MenuIcon, UserIcon } from '../../icons/icons'
import { Link } from 'react-router-dom'
import Drawer from "react-modern-drawer";
import MenuItems from '../sidebar/menuList';
import { logout } from '../../redux/slice/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { handleDarkMode } from '../../utlis/handleDarkMode';

const DashboardHeader = ({ title }) => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isloginSuccess);
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()
    const handleShowDropDown = () => {
        setShowMenu(!showMenu)
    }
    const [showMToggle, setShowMToggle] = useState(false);
    const toggleMenu = () => {
        setShowMToggle((prevState) => !prevState)
    }

    return (
        <>
            <div className='dahboard-header flex justify-between'>
                <div className='flex items-center gap-x-2'>
                    <button className="mobile-toggle" onClick={toggleMenu}>
                        <MenuIcon />
                    </button>
                    <h2 className="dashboard-title">
                        {title}
                    </h2>
                </div>
                <ul className='flex gap-5 items-center'>
                    <li>
                        <div className='profile flex item' onClick={handleShowDropDown} onBlur={() => setShowMenu(false)}>
                            <div>
                                <img src={imageMap['man1.jpg']} alt='img2' />
                                <h3 className=' md:text-base text-sm'>Verified</h3>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div
                            onClick={() => handleDarkMode()}
                            className="cursor-pointer  js-dark-mode-trigger  group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="dark-mode-light h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:hidden"
                            >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z" />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="dark-mode-dark hidden h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:block dark:fill-white"
                            >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" />
                            </svg>
                        </div>
                    </li>
                </ul>
                {showMenu &&
                    <div className='dropdown'>
                        <ul>
                            <li><Link to="/dashboard/myprofile" className='flex items-center gap-2'><UserIcon />Profile</Link></li>
                        </ul>
                    </div>
                }
            </div>
            <Drawer
                open={showMToggle}
                onClose={toggleMenu}
                direction='left'
                className='mobile-menu'
                style={{ width: "200px", backgroundColor: '#2b2a33' }}>
                <MenuItems />
            </Drawer>
        </>
    )
}

export default DashboardHeader