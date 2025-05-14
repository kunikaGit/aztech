import React from 'react'
import './myplan.scss'
import imageMap from '../../utils/helpers'
const Myplans = () => {
  return (
    <div className='my-plan-wrapped'>
      <div className='dash-heading'>
        <h2>My Subscribed Courses</h2>
      </div>
      <div className='card-container'>
        <div className='plan-card'>
          <div className='image'>
            <img src={imageMap['plan1.jpg']} alt='image' />
          </div>
          <div className='card_content'>
            <h3 className='tag'>App Development</h3>
            <h3 className='title'>Inflation calculator (2024)</h3>
            <p className='date'>Valid Till : 20 Aug 2025</p>
            <div className='d-flex justify-content-between alignitems-center'>
              <div className='price d-flex align-items-center gap-2'>
                <label>Start  from</label>
                <h4>$15</h4>
              </div>
              <button type='button' className='blue-btn'>Subscribed</button>
            </div>
          </div>
        </div>

        <div className='plan-card'>
          <div className='image'>
            <img src={imageMap['plan1.jpg']} alt='image' />
          </div>
          <div className='card_content'>
            <h3 className='tag'>App Development</h3>
            <h3 className='title'>Inflation calculator (2024)</h3>
            <p className='date'>Valid Till : 20 Aug 2025</p>
            <div className='d-flex justify-content-between alignitems-center'>
              <div className='price d-flex align-items-center gap-2'>
                <label>Start  from</label>
                <h4>$15</h4>
              </div>
              <button type='button' className='blue-btn'>Subscribed</button>
            </div>
          </div>
        </div>

        <div className='plan-card'>
          <div className='image'>
            <img src={imageMap['plan1.jpg']} alt='image' />
          </div>
          <div className='card_content'>
            <h3 className='tag'>App Development</h3>
            <h3 className='title'>Inflation calculator (2024)</h3>
            <p className='date'>Valid Till : 20 Aug 2025</p>
            <div className='d-flex justify-content-between alignitems-center'>
              <div className='price  d-flex align-items-center gap-2'>
                <label>Start  from</label>
                <h4>$15</h4>
              </div>
              <button type='button' className='blue-btn'>Subscribed</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Myplans