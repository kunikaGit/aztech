import React from 'react'
import imageMap from '../../../utils/helpers'
import './homecategories.scss'
const HomeCategories = () => {
    return (
        <section className='home-category-wrapped'>
            <div className='main-heading'>
                <h2>Discover the Category to boost your skills in Aztech</h2>
            </div>
            <div className='two-grid'>
                <div className='cat-banner'>
                    <ul>
                        <li>Videos</li>
                        <li>Images</li>
                        <li>Papers</li>
                        <li>EBooks</li>
                    </ul>
                    <div className='cat-img'>
                    <img src={imageMap['category-banner.png']} alt='img' />
                    </div>
                </div>
                <div className='content'>
                    <div className='label'>
                        <span>Trending Video</span>
                    </div>
                    <h3 className='title'>Transform Your Skills With Our Videos</h3>
                    <div className='d-flex align-items-center justify-content-between detail-author'>
                        <span className='author'>Henry Leonardo</span>
                        <span className='date'>08 February 2025 </span>
                    </div>
                    <p>Virtual Reality (VR) is no longer a concept of the future—it’s a reality reshaping how we interact, work, and entertain ourselves.</p>
                    <button type='button' className='blue-btn'>
                        View Details
                    </button>
                </div>
            </div>
        </section>
    )
}

export default HomeCategories