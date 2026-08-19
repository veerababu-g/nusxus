import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div className="container footer__inner">
      <div className="footer__col">
        <h4>Nexus IT Web</h4>
        <p>
          A digital solutions partner helping businesses improve their online presence, customer
          experience and business operations through modern websites, web applications, automation
          and practical AI solutions.
        </p>
      </div>

      <div className="footer__col">
        <h4>Company</h4>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/pricing">Pricing</Link>
      </div>

      <div className="footer__col">
        <h4>Get in touch</h4>
        <Link to="/contact">Contact</Link>
        <Link to="/request-quote">Request a Quote</Link>
        <Link to="/faq">FAQ</Link>
      </div>

      <div className="footer__col">
        <h4>Legal</h4>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms">Terms &amp; Conditions</Link>
      </div>
    </div>
    <div className="footer__bottom">
      <div className="container">
        &copy; {new Date().getFullYear()} Nexus IT Web. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
