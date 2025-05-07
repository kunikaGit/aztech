import React from 'react'
import imageMap from '../../../utils/helpers'
import './trustedpartner.scss'
const TrustedPrtner = () => {
    return (
        <section className='trusted-partner'>
            <div className='two-grid'>
                <div className='content'>
                    <label>Our Partners</label>
                    <div className='main-heading'>
                       <h2> Our Trusted Partners.</h2>
                       <p>Lorem ipsum dolor on adipisci elit  sed do eiusmod tempor dolo mag dsu aliqua eni ad minim lut emit.</p>
                    </div>
                </div>
                <div className='image'>
                    <img src={imageMap['partners-logo.png']} alt='partners'/>
                </div>
            </div>
        </section>
    )
}

export default TrustedPrtner