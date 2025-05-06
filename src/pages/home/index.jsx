import React from 'react'
import Header from '../../component/header';
import { Banner, HomeCategories, PopularCertifictes } from '../../component';
import { Container } from 'react-bootstrap';


const Home = () => {

  return (
    <div className='landing-page-wrapped'>
      <Container>
      <Header />
      <Banner />
      <HomeCategories/>
      <PopularCertifictes/>
      </Container>
    </div>
  )
}

export default Home
