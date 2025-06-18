import React from 'react'
import imageMap from '../../utils/helpers'
const baseUrl = import.meta.env.VITE_BASE_URL;
const ActivityCard = () => {
  return (
    <div className='activity_cards'>
        <div className='card-wrapped theme-card'>
            <div className='icon'>
                <img src={imageMap['userblue.png']} alt='icon'/>
            </div>
            <div className='content'>
                <h3>245</h3>
                <p>Total Users</p>
            </div>
        </div>
        <div className='card-wrapped theme-card'>
            <div className='icon'>
                <img src={imageMap['userpink.png']} alt='icon'/>
            </div>
            <div className='content'>
                <h3>245</h3>
                <p>Active Users</p>
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
                <img src={imageMap['referral.png']}/>
            </div>
            <div className='content'>
                <h3>$245</h3>
                <p>Referral Comission</p>
            </div>
        </div>
    </div>
  )
}

export default ActivityCard