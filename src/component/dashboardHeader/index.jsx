import { Search } from '@mui/icons-material'
import React from 'react'

const DashboardHeader = () => {
    return (
        <div className='dashboard-header'>
            <div className='fisrt-section'>
                <div className='search-box'>
                    <input type='text' placeholder='Search everything'/>
                    <Search/>
                </div>
                
            </div>
        </div>
    )
}

export default DashboardHeader