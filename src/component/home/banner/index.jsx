import React from 'react'
import './banner.scss'
import imageMap from '../../../utils/helpers'
import TypingInput from './TypingInput'
import ImageSlider from '../imageSlider'
import { Link } from 'react-router-dom'


const Banner = () => {
const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <div className='banner'>
      {/* <div className='searchbox'>
            <TypingInput/>
          </div> */}
      <div className='two-grid'>
        <div className='hero-content'>
          <h3 className='label'>Smart Reward System</h3>
          {/* <h1>Your All In One<br/>
            SMART DIGITAL MALL<br/>
            SMART LEARNING<br/>
            SMART REWARD<br/>
            JOIN US NOW
          </h1> */}

          <h1 class="banner-heading">
            Your All In One<br />
            <span>Smart Digital Mall, </span>
            <span>Smart Rewards,</span>
            <span>Smart Learning</span><br />
            <Link to={`${baseUrl}signup`} className='em'>Join us now</Link>
          </h1>
          {/* <Link to={`${baseUrl}signup`} className='blue-button'>Signup Now</Link> */}
          <p>Ready to level up your life? Dive into awesome AI tools, epic eBooks, cool code, music, and more — all in one digital mall. Learn new stuff, earn rewards, and bring your friends along for the ride. Let’s make smart moves together!</p>
          
        </div>

        <ImageSlider images={['https://az-file-uploads.s3.eu-west-1.amazonaws.com/banner-1-1.png', 'https://az-file-uploads.s3.eu-west-1.amazonaws.com/banner-1-2.png','https://az-file-uploads.s3.eu-west-1.amazonaws.com/banner-1-3.png']}/>
        {/* <div className='hero-img'>
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
        </div> */}
      </div>
    </div>
  )
}

export default Banner
