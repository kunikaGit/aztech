import React from 'react'
import Footer from '../../component/footer';
import { Container } from 'react-bootstrap';
import Header from '../../component/header';
import './courses.scss'
import imageMap from '../../utils/helpers';
import { EyeIcon, MessageIcon, StarIcon } from '../../icons/icons';
import { useNavigate } from 'react-router-dom';

const cards = [
    { image: 'certificate1.png' },
    { image: 'certificate2.png' },
    { image: 'certificate3.png' }
]
const Courses = () => {
    const navigate = useNavigate()
    return (
        <>
            <Container>
                <Header />
                <div className='courses-wrapped'>
                    <div className='two-grid'>
                        <div className='heading'>
                            <div className='relative'>
                                {/* <h1 className='title-heading'>Courses</h1> */}
                                <img src={imageMap['course-text.svg']} alt='course' />
                            </div>
                        </div>
                        <div className='main-content'>
                            <h2>Aztech is one of world best virtual learning network eLearning</h2>
                            <p>Choose from over 4.000 courses on topics like Web Design, Web Development, Mobile Development, and much more</p>
                            <button type='button' className='blue-btn'>Explore Now</button>
                        </div>
                    </div>
                <section className='course-listing'>
                    <div className='main-heading'>
                        <h2>Most Popular Certificates</h2>
                    </div>
                    <div className='certificate-cards'>
                        {cards.map((item, index) => (
                            <div className='cards' key={index}>
                                <div className='img' onClick={()=>navigate('/detail')}><img src={imageMap[`${item.image}`]} /></div>
                                <div className='content'>
                                    <h3 className='title'>Inflation calculator (2024...</h3>
                                    <p>Ever-so-useful Excel Inflation Calculator covering 50 countries. Fully editable.</p>
                                    <div className='spc'>
                                        <div className='item'>Calculator</div>
                                        <div className='item'>Inflation</div>
                                        <div className='item'>Finance</div>
                                    </div>
                                    <ul className='p-0 list-content'>
                                        <li><StarIcon /><b>4.6</b>(480 Review)</li>
                                        <li><EyeIcon />1,840</li>
                                        <li><MessageIcon />249</li>
                                    </ul>
                                    <div className='card_footer'>
                                        <div className='d-flex gap-3'>
                                            <img src={imageMap['dummy-img.png']} alt='profile' />
                                            <div className='profile-content'>
                                                <h3 className='name'>Diana Jones</h3>
                                                <h3 className='des'>Pegasus Team</h3>
                                            </div>
                                        </div>
                                        <button type='button'>$12.00</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='main-heading'>
                        <h2>Most Popular Certificates</h2>
                    </div>
                    <div className='certificate-cards'>
                        {cards.map((item, index) => (
                            <div className='cards' key={index}>
                                <div className='img' onClick={()=>navigate('/detail')}><img src={imageMap[`${item.image}`]} /></div>
                                <div className='content'>
                                    <h3 className='title'>Inflation calculator (2024...</h3>
                                    <p>Ever-so-useful Excel Inflation Calculator covering 50 countries. Fully editable.</p>
                                    <div className='spc'>
                                        <div className='item'>Calculator</div>
                                        <div className='item'>Inflation</div>
                                        <div className='item'>Finance</div>
                                    </div>
                                    <ul className='p-0 list-content'>
                                        <li><StarIcon /><b>4.6</b>(480 Review)</li>
                                        <li><EyeIcon />1,840</li>
                                        <li><MessageIcon />249</li>
                                    </ul>
                                    <div className='card_footer'>
                                        <div className='d-flex gap-3'>
                                            <img src={imageMap['dummy-img.png']} alt='profile' />
                                            <div className='profile-content'>
                                                <h3 className='name'>Diana Jones</h3>
                                                <h3 className='des'>Pegasus Team</h3>
                                            </div>
                                        </div>
                                        <button type='button'>$12.00</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='main-heading'>
                        <h2>Most Popular Certificates</h2>
                    </div>
                    <div className='certificate-cards'>
                        {cards.map((item, index) => (
                            <div className='cards' key={index}>
                                <div className='img' onClick={()=>navigate('/detail')}><img src={imageMap[`${item.image}`]} /></div>
                                <div className='content'>
                                    <h3 className='title'>Inflation calculator (2024...</h3>
                                    <p>Ever-so-useful Excel Inflation Calculator covering 50 countries. Fully editable.</p>
                                    <div className='spc'>
                                        <div className='item'>Calculator</div>
                                        <div className='item'>Inflation</div>
                                        <div className='item'>Finance</div>
                                    </div>
                                    <ul className='p-0 list-content'>
                                        <li><StarIcon /><b>4.6</b>(480 Review)</li>
                                        <li><EyeIcon />1,840</li>
                                        <li><MessageIcon />249</li>
                                    </ul>
                                    <div className='card_footer'>
                                        <div className='d-flex gap-3'>
                                            <img src={imageMap['dummy-img.png']} alt='profile' />
                                            <div className='profile-content'>
                                                <h3 className='name'>Diana Jones</h3>
                                                <h3 className='des'>Pegasus Team</h3>
                                            </div>
                                        </div>
                                        <button type='button'>$12.00</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                </div>
            </Container>
            <Footer />
        </>
    )
}

export default Courses;