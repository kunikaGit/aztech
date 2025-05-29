import React from 'react'
import imageMap from '../../utils/helpers'
import './welcome.scss'
import DailyCalender from "../common/calender"


const Welcome = () => {
    return (
        <div className='welcome-wrapped'>
            <h2 className='main-title'>Welcome Angela 👋</h2>
                
            <div className='content-cards'>
                    <div className='border-card mb-2'>
                        <h3>23 Days</h3>
                        <p>Active Membership</p>
                    </div>
                    <div className='d-flex gap-2'>
                        <div className='border-card'>
                            <h3>Active</h3>
                            <p>Status</p>
                        </div>
                        <div className='border-card'>
                            <h3>Elite</h3>
                            <p>Rank</p>
                        </div>
                    </div>
                </div>
            <div className='flex-container'>
                <div className='blue-card'>
                    <div className='content'>
                        <h3>Turn Every Day Into a Win 🚀</h3>
                        <p>Stay focused, explore daily rewards, and achieve your goals by making the most of AZ’s powerful products — and don’t forget to share the magic with your circle!</p>
                    </div>

                    {/* <img src={imageMap['rocket.png']} alt='roket' className='roket' /> */}
                </div>
                {/* <div className='content-cards'>
                    <div className='border-card mb-2'>
                        <h3>23 Days</h3>
                        <p>Active Membership</p>
                    </div>
                    <div className='d-flex gap-2'>
                        <div className='border-card'>
                            <h3>Active</h3>
                            <p>Status</p>
                        </div>
                        <div className='border-card'>
                            <h3>Elite</h3>
                            <p>Rank</p>
                        </div>
                    </div>
                </div> */}

                {/* <div className="calender-data theme_card bg-grey">
                    <h2>Profit / Loss Calendar</h2>
                    <DailyCalender />
                </div> */}
            </div>
            
        </div>
    )
}

export default Welcome