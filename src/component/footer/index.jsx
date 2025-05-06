import React from "react"
import { Container } from "react-bootstrap"
import imageMap from "../../utils/helpers"
import { Link } from "react-router-dom"
import './footer.scss'
const Footer = () => {
    return (
        <footer>
            <Container>
                <div className="logo">
                    <img src={imageMap['logo-light.svg']} alt="logo" />
                </div>
                <div className="footer-flex">
                    <div className="left-side">
                        <div className="content">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </div>
                    </div>
                    <div className="right-side">
                        <ul>
                            <li><Link to="#"><img src={imageMap['insta.svg']} alt="instagram" /></Link></li>
                            <li><Link to="#"><img src={imageMap['fb.svg']} alt="fb" /></Link></li>
                            <li><Link to="#"><img src={imageMap['linkedin.svg']} alt="linkedin" /></Link></li>
                            <li><Link to="#"><img src={imageMap['youtube.svg']} alt="youtube" /></Link></li>
                        </ul>
                    </div>
                </div>
                <div className="copy-right">
                    <div className="copy">©Copyright 2025</div>
                    <div className="links">
                        <Link to="">Privacy Policy</Link>
                        <Link to="">Terms & Condition</Link>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
export default Footer