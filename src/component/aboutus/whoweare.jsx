import React from 'react'
import imageMap from '../../utils/helpers'

const Whoweare = () => {
  return (
    <div className='whoweare'>
        <div className='images'>
            <img src={imageMap['gallery1.png']} alt='AZ Tech Digital Mall' className='img1'/>
            <img src={imageMap['gallery2.png']} alt='Smart Rewards System' className='img1'/>
        </div>
        <div className='heading'>
            <div className='logo'>
                <img src='images/logo-1.png' alt='AZ Tech Logo' />
                <h3>Who We Are</h3>
            </div>
            <h2>Transforming Digital Learning & Creativity Since 2024</h2>
        </div>
        <div className='content'>
            At AZ Tech, we bring the world’s best digital products—education, AI tools, music, eBooks, research papers, and more—into one seamless digital mall. Our mission is to empower learners and creators of every age and profession by delivering unlimited access to innovation, knowledge, and creativity — all powered by our unique Smart Reward System.
        </div>
        <div className='number-wrappd'>
            <div className='number-box'>
                <h3>4,000+</h3>
                <span>Digital Products Curated for You</span>
            </div>
            <div className='number-box'>
                <h3>100,000+</h3>
                <span>Active Users Growing Daily</span>
            </div>
            <div className='number-box'>
                <h3>10 Levels</h3>
                <span>Referral Rewards Network</span>
            </div>
        </div>

        <div className='portfolio'>
            <h2>Seamless Access, Endless Possibilities</h2>
            <img src={imageMap['colors.png']} alt='Educational Network' className='slider'/>
            <h4>Connect with over 100+ trusted digital creators and educators</h4>
            <button className='all-button'>Explore All Products</button>
        </div>
    </div>
  )
}


export default Whoweare