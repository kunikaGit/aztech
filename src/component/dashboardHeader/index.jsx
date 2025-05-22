import { Search } from '@mui/icons-material'
import React from 'react'
import { BellIcon } from '../../icons/icons'
import imageMap from '../../utils/helpers'
import './dashboardHeader.scss'
const DashboardHeader = () => {
    return (
        <div className='dashboard-header'>
            <div className='first-section'>
                <div className='search-box'>
                    <Search />
                    <input type='text' placeholder='Search everything' />
                </div>
                <div className='notification'>
                    <button type='button' className='bell border-0 bg-transparent'><BellIcon /></button>
                </div>
            </div>
            <div className='profile-section d-flex align-items-center'>
                <div className='title-bar'>
                    <h3 className='title'>Linda Adora</h3>
                    <span> Elite</span>
                </div>
                <div className='profile'>
                    <img src={imageMap['profile2.png']} alt='profile'/>
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader