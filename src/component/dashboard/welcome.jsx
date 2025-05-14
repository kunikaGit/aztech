import React from 'react'
import imageMap from '../../utils/helpers'
import './welcome.scss'
const Welcome = () => {
    return (
        <div className='welcome-wrapped'>
            <h2 className='main-title'>Welcome Angela 👋</h2>
            <div className='flex-container'>
                <div className='blue-card'>
                    <div className='content'>
                    <h3>Space to rule them all 🎯</h3>
                    <p>We bring all your team’s together while letting you use the tools you love</p>
                    </div>
                    <img src={imageMap['rocket.png']} alt='roket' className='roket'/>
                </div>
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
            </div>
        </div>
    )
}

export default Welcome