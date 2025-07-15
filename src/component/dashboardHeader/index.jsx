import React, { useEffect, useState, useRef } from 'react'
import { Search } from '@mui/icons-material'
import { BellIcon } from '../../icons/icons'
import imageMap from '../../utils/helpers'
import './dashboardHeader.scss'
import { useSelector, useDispatch } from 'react-redux'
import Drawer from 'react-modern-drawer'
import Sidebar from '../sidebar'


const DashboardHeader = () => {
    const { name } = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <>
        <div className='dashboard-header'>
            <button type="button" className="menu-toggle bg-transparent border-0" onClick={toggleDrawer}>
                <img src={imageMap['menu.svg']} alt="img" />
            </button>
            <div className='first-section'>
                <div className='search-box'>
                    <Search />
                    <input
                        type='text'
                        placeholder='Search everything'
                    />

                </div>
                <div className='notification'>
                    <button type='button' className='bell border-0 bg-transparent'><BellIcon /></button>
                </div>
            </div>
            <div className='profile-section d-flex align-items-center'>
                <div className='title-bar'>
                    <h3 className='title'>{name}</h3>
                    <span> {status}</span>
                </div>
                <div className='profile'>
                    <img src={imageMap['user-icon.png']} alt='profile' />
                </div>
            </div>
        </div>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                className='mobile-menu'
                style={{ width: "200px" }}>
                      <Sidebar />
            </Drawer>
            </>
    )
}

export default DashboardHeader