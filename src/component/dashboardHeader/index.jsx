import { Search } from '@mui/icons-material'
import React from 'react'
import { BellIcon } from '../../icons/icons'
import imageMap from '../../utils/helpers'
import './dashboardHeader.scss'
import { useSelector,useDispatch } from 'react-redux'
const DashboardHeader = () => {
       const { name } = useSelector((state) => state.auth);
       const  profile  = useSelector((state) => state.auth);
       console.log(profile)
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
                    <h3 className='title'>{name}</h3>
                    <span> {status}</span>
                </div>
                <div className='profile'>
                    <img src={imageMap['profile2.png']} alt='profile'/>
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader