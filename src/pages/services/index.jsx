import React from 'react'
import imageMap from '../../utils/helpers'
import './services.scss'
const Services = () => {
    return (
        <div className='services-wrapped'>
            <div className='two-grid'>
                <div className='heading'>
                    <div className='relative'>
                        <img src={imageMap['services.svg']} alt='course' />
                    </div>
                </div>
                <div className='main-content'>
                    <h2>Aztech is one of world best virtual learning network eLearning</h2>
                    <p>Choose from over 4.000 courses on topics like Web Design, Web Development, Mobile Development, and much more</p>
                    <button type='button' className='blue-btn'>Explore Now</button>
                </div>
            </div>
            <div className='service-cards-wrapped'>
                <div className='service-cards'>
                    <div className='icon'>
                        <img src={imageMap['cube.svg']} alt='icon'/>
                    </div>
                    <h3>UI/UX design</h3>
                    <p>Use your preferred shell, whether it's zsh, pwsh, or git bash, seamlessly inside the editor.</p>
                </div>
                  <div className='service-cards'>
                    <div className='icon'>
                        <img src={imageMap['cube.svg']} alt='icon'/>
                    </div>
                    <h3>UI/UX design</h3>
                    <p>Use your preferred shell, whether it's zsh, pwsh, or git bash, seamlessly inside the editor.</p>
                </div>
                  <div className='service-cards'>
                    <div className='icon'>
                        <img src={imageMap['cube.svg']} alt='icon'/>
                    </div>
                    <h3>UI/UX design</h3>
                    <p>Use your preferred shell, whether it's zsh, pwsh, or git bash, seamlessly inside the editor.</p>
                </div>
                    <div className='service-cards'>
                    <div className='icon'>
                        <img src={imageMap['cube.svg']} alt='icon'/>
                    </div>
                    <h3>UI/UX design</h3>
                    <p>Use your preferred shell, whether it's zsh, pwsh, or git bash, seamlessly inside the editor.</p>
                </div>

            </div>
            
        </div>
    )
}

export default Services