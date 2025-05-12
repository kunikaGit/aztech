import React from 'react'
import Header from '../../component/header';
import { Banner, Chooseplan, HomeCategories, OnlineCourse, PopularCertifictes, TrustedPrtner } from '../../component';
import { Container } from 'react-bootstrap';
import Footer from '../../component/footer';


const Home = () => {

  return (
    <div className='landing-page-wrapped'>
      <Banner />
      <HomeCategories/>
      <PopularCertifictes/>
      <OnlineCourse/>
      <Chooseplan/>
      <TrustedPrtner/>
    </div>
  )
}

export default Home
