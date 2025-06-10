import React from 'react'
import imageMap from '../../../utils/helpers'
import './homecategories.scss'
const HomeCategories = () => {
    return (
        <section className='home-category-wrapped'>
            {/* <div className='main-heading'>
                <h2>EXPLORE AZ TECH - YOUR SMART DIGITAL REWARD SYSTEM</h2>
                <h2>REFER -PLAY - EARN UNLIMITED INCOME</h2>
            </div> */}

            <div className="main-heading">
  <h2>
    <span className="black-part">EXPLORE AZ TECH </span>
    <span className="highlight-part">YOUR SMART DIGITAL REWARD SYSTEM</span>
  </h2>
  <h2 className="sub-heading">REFER - PLAY - EARN UNLIMITED INCOME</h2>
</div>

            <div className='two-grid'>
                <div className='cat-banner'>
                    {/* <ul>
                        <li>AI Courses</li>
                        <li>Creative Tools</li>
                        <li>Digital Products</li>
                        <li>Smart Learning</li>
                    </ul> */}
                    <div className='cat-img'>
                        <img src={imageMap['category-banner.png']} alt='img' />
                    </div>
                </div>
                <div className='content'>
                    <div className='label'>
                        <span>Introduction Video</span>
                    </div>
                    <h3 className='title'>Welcome to AZ Tech — The Future of Learning & Earning</h3>
                    <div className='d-flex align-items-center justify-content-between detail-author'>
                        <span className='author'>Presented by AZ Tech</span>
                        <span className='date'>Launching 2025</span>
                    </div>
                    <p>Discover how AZ Tech is revolutionizing digital access through a Smart Reward System. Learn, create, earn, and grow — all in one powerful platform designed for dreamers and doers.</p>
                    <button type='button' className='blue-btn'>
                        Watch Now
                    </button>
                </div>
            </div>
        </section>
    )
}

export default HomeCategories