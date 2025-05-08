import React from 'react'
import imageMap from '../../utils/helpers'
import { Container } from 'react-bootstrap'
import Header from '../../component/header'
import Footer from '../../component/footer'
import './detail.scss'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
const ProductDetail = () => {
    return (
        <>
            <Container>
                <Header />
                <section className='product-details'>
                    <div className='two_grid'>
                        <div className='content'>
                            <div className='main-heading'>
                                <h2>Programming with Python : HandsOn Introduction for Beginners</h2>
                            </div>
                            <div className='review'>
                                <span>5.5</span>
                                <img src={imageMap['startIcon.svg']} alt='star' />
                            </div>
                            <div className='more-details'>
                                <div className='detail-item'>
                                    <div className='item'>
                                        <p>Last Updates</p>
                                        <span>Aug 2021</span>
                                    </div>
                                    <div className='item'>
                                        <p>Level</p>
                                        <span>Advance</span>
                                    </div>
                                    <div className='item'>
                                        <p>Students</p>
                                        <span>150,668</span>
                                    </div>
                                    <div className='item'>
                                        <p>Language</p>
                                        <span>English</span>
                                    </div>

                                </div>
                                <div className='actions'>
                                    <div className='action-item'><FavoriteBorderIcon /> Wishlist</div>
                                    <div className='action-item'><ShareOutlinedIcon />Share</div>
                                </div>
                            </div>
                            <div className='course-video'>
                                <img src={imageMap['youtube-preview.png']} alt='youtube' />
                            </div>
                            <div className='description-box'>
                                <h4 className='sub-heading'>Overview</h4>
                                <p>This course has been specifically designed for beginners who have been looking to obtain a hands-on learning experience with Python, teaching you concepts of programming right from the basics and Python being the most simplest language for a beginner to start with.</p>
                                <p>It is the right time to start learning the in-demand Python language because of its gaining popularity in the fields on Data Science, Backend Development, Internet of Things, etc. Keep yourself equipped with the most sought-after skills!</p>
                                <p>You will work on a project at the end of this course, which has been designed for you to implement all the topics which you would have mastered by the end of this course to give you enough confidence to start writing your own independent programs in Python.</p>
                            </div>
                        </div>
                        <div className='price-chart'>
                            <h2>Rp. 220.400</h2>
                            <div className='price'>
                                Rp 445.000
                                <div className='discount'>28% off</div>
                            </div>
                            <div className='action-btn'>
                                <button type='button' className='field'>Add to Cart</button>
                                <button type='button' className='outlined'>Buy Now</button>
                            </div>
                            <div className='course-list'>
                                <h3 className='title'>This course includes</h3>
                                <ul>
                                    <li>2 hours on-demand video</li>
                                    <li>1 article</li>
                                    <li>50 downloadable resources</li>
                                    <li>Full lifetime access</li>
                                    <li>Access on mobile and TV</li>
                                    <li>Certificate of completion</li>
                                </ul>
                            </div>
                            <div className='profile'>
                                <h3 className='title'>About the Instructor</h3>
                                <div className='profile-photo'>
                                    <div className='img'>
                                        <img src={imageMap['profile4.png']} alt='profile'/>
                                    </div>
                                    <div className='detail'>
                                        <h4>DR. Soman Jumakir</h4>
                                        <span>Founder Naruto Edu</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
                <Footer />
        </>
    )
}

export default ProductDetail