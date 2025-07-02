import React from 'react';
import './footer.scss';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_BASE_URL;
const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        {/* <img src={`${baseUrl}images/fulllogo-1.png`} alt="AZTECH Logo" className="footer__logo" /> */}
        <div className="footer__container">
          <div className="footer__section">
            <img src={`${baseUrl}images/fulllogo-1.png`} alt="AZTECH Logo" className="footer__logo" />
          </div>

          {/* <div className="footer__section">
          <h3>Phone Number</h3>
          <a href="tel:+18001234567">+1 (800) 123–4567</a>
        </div> */}

          <div className="footer__section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
                            <li><Link to={`${baseUrl}faq`}>FAQ</Link></li>
              <li><Link to={`${baseUrl}terms-condition`}>Terms and Conditions</Link></li>
              <li><Link to={`${baseUrl}privacy-policy`}>Privacy Policy</Link></li>

            </ul>
          </div>

          <div className="footer__section">
            <h3>Explore</h3>
            <ul>
              <li><a href="#">Services</a></li>
              <li><a href="#">Produts</a></li>
              <li><a href="#">Digital Mall</a></li>
              {/* <li><a href="#">Media & Press</a></li>
              <li><a href="#">Events & Webinars</a></li> */}
            </ul>
          </div>
          <div className="footer__section">
            <h3>Email</h3>
            <a href="mailto:contact@aztech.com">contact@aztech.com</a>
            {/* <h3>Address</h3>
            <p>Lorem Ipsum dorme<br />Si amor 48568595</p>
            <h3>Phone Number</h3>
            <p>  <a href="tel:+18001234567">+1 (800) 123–4567</a></p> */}
          </div>
          <div className="footer__section">
            <h3>Our Vision</h3>
            <p>To build an inclusive digital ecosystem where <b>education meets entertainment, and opportunities to earn are accessible to all </b>– empowering users to grow, connect, and thrive in a rewarding environment.</p>
            {/* <div className="footer__social">
              <a href="#" className="footer__icon">🔗</a>
              <a href="#" className="footer__icon">🔗</a>
              <a href="#" className="footer__icon">🔗</a>
              <a href="#" className="footer__icon">🔗</a>
            </div> */}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
