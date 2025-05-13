import React from 'react'
import Sidebar from '../component/sidebar'
import { Outlet } from 'react-router-dom'

const DashboardOutlet = () => {
    return (
        <>
            <div className='dashboard-layout-wrapped'>
                <Sidebar />
                <div className='dashboard-main'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default DashboardOutlet