import React from 'react'
import './banner.scss'
import imageMap from '../../../utils/helpers'

const Banner = () => {
  return (
    <div className='banner'>
      <div className='two-grid'>
        <div className='hero-content'>
          <h3 className='label'>Introduction Interactive</h3>
          <h1>Learning Courses by Top Instructors</h1>
          <p>Choose from over 4.000 courses on topics like Web Design, Web Development, Mobile Development, and much more</p>
          <div className='searchbox'>
            <input type='text' placeholder='Search course' />
            <button type='button'>Search</button>
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
