import React from 'react'
import './onlincourse.scss'
const OnlineCourse = () => {
  return (
   <section className='online-couse-wrapped'>
    <div className='two-grid'>
        <div className='grid-item four-cards'>
            <div className='cards'>
                <h3>35+</h3>
                <span>Elevate ye business our courses</span>
            </div>
            <div className='cards'>
                <h3>35+</h3>
                <span>Elevate ye business our courses</span>
            </div>
            <div className='cards'>
                <h3>35+</h3>
                <span>Elevate ye business our courses</span>
            </div>
            <div className='cards'>
                <h3>35+</h3>
                <span>Elevate ye business our courses</span>
            </div>
        </div>
        <div className='grid-item'>
            <div className='main-heading'>
                <h2>Flexible Online Courses for Busy Professionals</h2>
                <p>Balancing work life and education has never ben easier with or flexible online courses designed for busy professionals. Access highquality content and interactive lessons from an dev anytime and anywhere. Our courses are tailored</p>
                <ul>
                    <li>Personal Development</li>
                    <li>Language Learning</li>
                    <li>Creative Arts</li>
                    <li>Professional Skills</li>
                </ul>
                <button type='button' className='blue-btn'>View Details</button>
            </div>
        </div>
    </div>
   </section>
  )
}

export default OnlineCourse