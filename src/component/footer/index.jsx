import React from 'react';
import './footer.scss';
import imageMap from '../../utils/helpers';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <img src={imageMap['logo.png']} alt="AZTECH Logo" className="footer__logo" />
          <p>Email</p>
          <a href="mailto:contact@neovision.com">contact@neovision.com</a>
          <p>Address</p>
          <p>Lorem Ipsum dorme<br />Si amor 48568595</p>
        </div>

        <div className="footer__section">
          <p>Phone Number</p>
          <a href="tel:+18001234567">+1 (800) 123–4567</a>
        </div>

        <div className="footer__section">
          <p>Quick Links</p>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div className="footer__section">
          <p>Explore</p>
          <ul>
            <li><a href="#">Product Demos</a></li>
            <li><a href="#">Case Studies</a></li>
            <li><a href="#">Testimonials</a></li>
            <li><a href="#">Media & Press</a></li>
            <li><a href="#">Events & Webinars</a></li>
          </ul>
        </div>

        <div className="footer__section">
          <p>LEARNING COURSES BY TOP INSTRUCTORS</p>
          <p>Dive into a world where technology and virtual reality converge to create mind-blowing experiences.</p>
          <div className="footer__social">
            <a href="#" className="footer__icon">🔗</a>
            <a href="#" className="footer__icon">🔗</a>
            <a href="#" className="footer__icon">🔗</a>
            <a href="#" className="footer__icon">🔗</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
