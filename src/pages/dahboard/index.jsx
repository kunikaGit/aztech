import React from 'react'

import './dashboard.scss'
import DasboardCards from '../../component/dashboard/dasboardCards'
import Radarcharts from '../../component/dashboard/radarcharts'
import WalletCards from '../../component/dashboard/walletCards'
import Dashboardplans from '../../component/dashboard/dashboardplans'
import Dashbordtable from '../../component/dashboard/dashbordtable'
import { UserIcon } from '../../icons/icons'

const Dashboard = () => {

  return (
    <div className='dahboard-wrapped'>
      <div className='header-flex'>
        <h2 className='main-title'>Welcome Angela 👋</h2>
        <div className='box theme-card'>
          <UserIcon/>
          <span>23 Days Left</span>
        </div>
      </div>
      <DasboardCards />
      <WalletCards />
      <div className='flex-two-grid'>
        <div className='left-side'>
          <Radarcharts />
          <Dashbordtable />
        </div>
        <div className='right-side'>
          <Dashboardplans />
        </div>
      </div>
    </div>
  )
}

export default Dashboard