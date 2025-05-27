import React from 'react'
import imageMap from '../../utils/helpers'

const Whoweare = () => {
  return (
    <div className='whoweare'>
        <div className='images'>
            <img src={imageMap['gallery1.png']} alt='img1' className='img1'/>
            <img src={imageMap['gallery2.png']} alt='img2'className='img1'/>
        </div>
        <div className='heading'>
            <div className='logo'>
                <img src='images/logo.png'/>
                <h3>Who we are?</h3>
            </div>
            <h2>Since 1998, our agency has delivered quality services, driven by passion and dedication.</h2>
        </div>
        <div className='content'>
            Our team is passionate about empowering brands through tailored strategies, blending insights with creativity to create campaigns that resonate deeply with audiences and drive sustainable business success.
        </div>
        <div className='number-wrappd'>
            <div className='number-box'>
                <h3>1,20000+</h3>
                <span>Completed Project</span>
            </div>
              <div className='number-box'>
                <h3>1.3 mil+</h3>
                <span>Happy Clients</span>
            </div>
              <div className='number-box'>
                <h3>1.3 mil+</h3>
                <span>Happy Clients</span>
            </div>
        </div>


        <div className='portfolio'>
            <h2>Effortless integration, infinite opportunities ahead</h2>
            <img src={imageMap['colors.png']} alt='slider' className='slider'/>
            <h4>Connect more than 100+ <br/> Educational Works</h4>
            <button className='all-button'>Explore All</button>
        </div>
    </div>
  )
}

export default Whoweare