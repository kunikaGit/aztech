import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './component/header'
import { Outlet } from 'react-router-dom'
import Footer from './component/footer'
import imageMap from './utils/helpers'

const Mainlayout = () => {
    return (
        <>
            <div style={{ background: `url(${imageMap['bg.png']})`,backgroundRepeat:'no-repeat'}}>
            <Container>
                <Header />
                <Outlet />
            </Container>
            <Footer />
        </div >
        </>
    )
}

export default Mainlayout
