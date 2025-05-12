import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './component/header'
import { Outlet } from 'react-router-dom'
import Footer from './component/footer'

const Mainlayout = () => {
    return (
        <>
            <Container>
                <Header />
                <Outlet />
            </Container>
            <Footer />
        </>
    )
}

export default Mainlayout