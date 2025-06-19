import React from 'react'
import imageMap from '../../utils/helpers'
const baseUrl = import.meta.env.VITE_BASE_URL;
const ActivityCard = ({data}) => {
  return (
    <div className='activity_cards'>
        <div className='card-wrapped theme-card'>
            <div className='icon'>
                <img src={imageMap['userblue.png']} alt='icon'/>
            </div>
            <div className='content'>
                <h3>{data.totalReferal}</h3>
                <p>Total Referrals</p>
            </div>
        </div>
        <div className='card-wrapped theme-card'>
            <div className='icon'>
                <img src={imageMap['userpink.png']} alt='icon'/>
            </div>
            <div className='content'>
                <h3>{data.totalDownline}</h3>
                <p>Total Downline</p>
            </div>
        </div>
        <div className='card-wrapped theme-card'>
            <div className='icon'>
                <img src={imageMap['referral.png']}/>
            </div>
            <div className='content'>
                <h3>${data.referralEarning}</h3>
                <p>Referral Comission</p>
            </div>
        </div>
       
        <div className='card-wrapped theme-card'>
            <div className='icon'>
                <img src={imageMap['games.png']}/>
            </div>
            <div className='content'>
                <h3>245</h3>
                <p>Game Plan</p>
            </div>
        </div>

         <div className='card-wrapped theme-card'>
            <div className='icon'>
                <img src={imageMap['transactions.png']} alt='icon'/>
            </div>
            <div className='content'>
                <h3>$25,000</h3>
                <p>Total Purchase</p>
            </div>
        </div>
          
    </div>
  )
}

export default ActivityCard