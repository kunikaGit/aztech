import React from 'react'
import './banner.scss'
import imageMap from '../../../utils/helpers'
import TypingInput from './TypingInput'

const Banner = () => {
  return (
    <div className='banner'>
      <div className='two-grid'>
        <div className='hero-content'>
          <h3 className='label'>Smart Reward System</h3>
          <h1>Your All-in-One Digital Mall for Learning, Creativity & Growth</h1>
          <p>Explore AI tools, education, music, codes, eBooks, and more – all under one roof. Earn rewards, refer friends, and unlock unlimited digital possibilities!</p>
          <div className='searchbox'>
            {/* <input type='text' placeholder='Search course' /> */}
            {/* <button type='button'>Search</button> */}
            <TypingInput/>
          </div>
        </div>
        <div className='hero-img'>
          <img src={imageMap['banner-img.png']} alt='hero'/>
          <div className="accounts">
            <div className='imgaes'>
              <img src={imageMap['profile4.png']}/>
              <img src={imageMap['profile3.png']}/>
              <img src={imageMap['profile2.png']}/>
              <img src={imageMap['profile1.png']}/>
            </div>
            <div className='about-it'>
              <h4>78K</h4>
              <span>Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
