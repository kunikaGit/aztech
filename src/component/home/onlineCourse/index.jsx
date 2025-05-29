import React from 'react'
import './onlincourse.scss'
const OnlineCourse = () => {
    return (
        <section className='online-couse-wrapped'>
            <div className='two-grid'>
                <div className='grid-item four-cards'>
                    <div className='cards'>
                        <h3>1500+</h3>
                        <span>Digital Products Across All Categories</span>
                    </div>
                    <div className='cards'>
                        <h3>10,000+</h3>
                        <span>Happy Users and Growing Fast</span>
                    </div>
                    <div className='cards'>
                        <h3>333 Days</h3>
                        <span>Access Premium Tools with One-Time Plans</span>
                    </div>
                    <div className='cards'>
                        <h3>10-Level</h3>
                        <span>Smart Referral Tree to Maximize Rewards</span>
                    </div>
                </div>
                <div className='grid-item'>
                    <div className='main-heading'>
                        <h2>Your One-Stop Digital Mall – Explore. Earn. Excel.</h2>
                        <p>From AI tools and learning resources to music, eBooks, and research papers – AZ Tech is your all-in-one platform.
                            Shop smart, grow your skills, and earn rewards. Whether you're a student, creator, or pro, we’ve got something for you.</p>
                        <ul>
                            <li>AI-Powered Creativity Tools</li>
                            <li>Educational & Professional Resources</li>
                            <li>Entertainment: Music, Videos, More</li>
                            <li>Reward-Backed Digital Shopping</li>
                        </ul>
                        <button type='button' className='blue-btn'>View Details</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OnlineCourse