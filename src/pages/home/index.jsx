import React from 'react'
import Header from '../../component/header';
import { Banner, Chooseplan, HomeCategories, HomeServices, OnlineCourse, PopularCertifictes, TrustedPrtner } from '../../component';
import { Container } from 'react-bootstrap';
import Footer from '../../component/footer';
import imageMap from '../../utils/helpers';


const Home = () => {

  return (
    <div className='landing-page-wrapped' style={{ background: `url(${imageMap['bg.png']})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <section className='hero-section'>
        <Container>
          <Header />
          <Banner />
        </Container>
      </section>
      <Container>
        <HomeCategories />
        <HomeServices/>
        <PopularCertifictes />
        <OnlineCourse />
        <Chooseplan />
      </Container>
      {/* <TrustedPrtner/> */}
      <Footer />
    </div>
  )
}

export default Home
