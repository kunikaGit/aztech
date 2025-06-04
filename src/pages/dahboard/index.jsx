import React, { useEffect, useState } from 'react'

import './dashboard.scss'
import DasboardCards from '../../component/dashboard/dasboardCards'
import Radarcharts from '../../component/dashboard/radarcharts'
import WalletCards from '../../component/dashboard/walletCards'
import Dashboardplans from '../../component/dashboard/dashboardplans'
import Dashbordtable from '../../component/dashboard/dashbordtable'
import { UserIcon } from '../../icons/icons'
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
const Dashboard = () => {
  const { fetchData } = useApiRequest();
  const navigate = useNavigate();

  const [data, setData] = useState(null)

  useEffect(() => {
    callApi()
  }, []);

  const callApi = async () => {
    try {
      let res = await fetchData(API_ENDPOINTS.dashboard, navigate, 'GET', {});

      if (res.success) {
        setData(res.data)
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if(!data){
return(<>Loading...</>)
  }

  return (
    <div className='dahboard-wrapped'>
      <div className='header-flex'>
        <h2 className='main-title'>Welcome {data.name} 👋</h2>
        <div className='box theme-card'>
          <UserIcon />
         {data.status=='active' ?  <span>{data.remainingDays} Days Left</span> :<span>Inactive User</span>}
        </div>
      </div>
      <DasboardCards data={data.graphs}/>
      <WalletCards />
      <div className='flex-two-grid'>
        <div className='left-side'>
          <Radarcharts data={{totalVisitedFromPackage:data.totalVisitedFromPackage,totalotherPurchases:data.totalotherPurchases,totalDownline:data.totalDownline,totalReferal:data.totalReferal}}/>
          <Dashbordtable data={data.referralTable} />
        </div>
        <div className='right-side'>
          <Dashboardplans data={data.plans}/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard