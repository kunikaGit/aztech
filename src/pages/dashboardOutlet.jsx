import React from 'react'
import Sidebar from '../component/sidebar'
import { Outlet } from 'react-router-dom'
import DashboardHeader from '../component/dashboardHeader'

const DashboardOutlet = () => {
    return (
        <>
            <div className='dashboard-layout-wrapped'>
                <Sidebar />
                <div className='dashboard-main'>
                    <DashboardHeader/>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default DashboardOutlet