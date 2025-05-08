import React from 'react'
import Header from '../../component/header';
import { Banner, Chooseplan, HomeCategories, OnlineCourse, PopularCertifictes, TrustedPrtner } from '../../component';
import { Container } from 'react-bootstrap';
import Footer from '../../component/footer';


const Home = () => {

  return (
    <div className='landing-page-wrapped'>
      <Container>
      <Header />
      <Banner />
      <HomeCategories/>
      <PopularCertifictes/>
      <OnlineCourse/>
      <Chooseplan/>
      <TrustedPrtner/>
      <Footer/>
      </Container>
    </div>
  )
}

export default Home
