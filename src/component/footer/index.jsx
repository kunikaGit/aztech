import React from 'react';
import './footer.scss';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
      <img src='images/fulllogo.png' alt="AZTECH Logo" className="footer__logo" />
      <div className="footer__container">
        <div className="footer__section">
          <h3>Email</h3>
          <a href="mailto:contact@neovision.com">contact@neovision.com</a>
          <h3>Address</h3>
          <p>Lorem Ipsum dorme<br />Si amor 48568595</p>
        </div>

        <div className="footer__section">
          <h3>Phone Number</h3>
          <a href="tel:+18001234567">+1 (800) 123–4567</a>
        </div>

        <div className="footer__section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div className="footer__section">
          <h3>Explore</h3>
          <ul>
            <li><a href="#">Product Demos</a></li>
            <li><a href="#">Case Studies</a></li>
            <li><a href="#">Testimonials</a></li>
            <li><a href="#">Media & Press</a></li>
            <li><a href="#">Events & Webinars</a></li>
          </ul>
        </div>

        <div className="footer__section">
          <h3>LEARNING COURSES BY TOP INSTRUCTORS</h3>
          <p>Dive into a world where technology and virtual reality converge to create mind-blowing experiences.</p>
          <div className="footer__social">
            <a href="#" className="footer__icon">🔗</a>
            <a href="#" className="footer__icon">🔗</a>
            <a href="#" className="footer__icon">🔗</a>
            <a href="#" className="footer__icon">🔗</a>
          </div>
        </div>
      </div>
      </Container>
    </footer>
  );
};

export default Footer;
