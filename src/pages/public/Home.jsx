import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="page">
    <section className="hero">
      <div className="container hero__inner">
        <span className="eyebrow">Digital solutions partner</span>
        <h1>Digital Solutions Built Around Your Business</h1>
        <p className="hero__subtitle">
          We design and develop modern websites, business applications and practical AI-powered
          solutions for growing businesses.
        </p>
        <div className="hero__actions">
          <Link to="/request-quote" className="btn btn--primary">Start Your Project</Link>
          <Link to="/projects" className="btn btn--secondary">Explore Our Work</Link>
        </div>

        <div className="trace-divider">
          <div className="trace-node"><span className="trace-node__label">Design</span></div>
          <div className="trace-node"><span className="trace-node__label">Build</span></div>
          <div className="trace-node"><span className="trace-node__label">Launch</span></div>
          <div className="trace-node"><span className="trace-node__label">Support</span></div>
        </div>
      </div>
    </section>

    <section className="section container ">
      <span className="eyebrow">What we do</span>
      <h2>Practical digital solutions, not buzzwords</h2>
      <p>
        Nexus IT Web is a digital solutions partner helping businesses improve their online
        presence, customer experience and business operations through modern websites, web
        applications, automation and practical AI solutions — built with React, Node.js,
        Express and MongoDB, using AI-assisted development alongside human engineering, testing
        and quality control.
      </p>
    </section>

    <section className="section section--muted">
      <div className="container">
        <span className="eyebrow">Why Nexus</span>
        <h2>Built for how you actually work</h2>
        <div className="grid grid--4">
          <div className="card">
            <h3>Business-first approach</h3>
            <p>We understand the business problem before writing a single line of code.</p>
          </div>
          <div className="card">
            <h3>AI-assisted efficiency</h3>
            <p>Modern AI tools accelerate development, always with human technical oversight.</p>
          </div>
          <div className="card">
            <h3>Direct communication</h3>
            <p>Talk directly with the people building your project — no middlemen.</p>
          </div>
          <div className="card">
            <h3>Transparent process</h3>
            <p>Clear requirements, scope, milestones and pricing from day one.</p>
          </div>
          <div className="card">
            <h3>Modern technology</h3>
            <p>We use appropriate, modern technologies based on your actual requirements.</p>
          </div>
          <div className="card">
            <h3>Responsive products</h3>
            <p>Every product is designed and tested for mobile, tablet and desktop.</p>
          </div>
          <div className="card">
            <h3>Quality control</h3>
            <p>Testing, validation and deployment are built into every delivery.</p>
          </div>
          <div className="card">
            <h3>Long-term support</h3>
            <p>We continue supporting and improving your solution after launch.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section container">
      <span className="eyebrow">Capabilities</span>
      <h2>Services</h2>
      <div className="grid grid--3">
        <div className="card"><h3>Website Development</h3><p>Business, corporate, portfolio and landing pages.</p></div>
        <div className="card"><h3>Web Applications</h3><p>Dashboards, booking systems, customer portals and internal tools.</p></div>
        <div className="card"><h3>E-commerce</h3><p>Catalogues, cart, orders, admin management and payment integration.</p></div>
        <div className="card"><h3>AI Solutions</h3><p>Chatbots, AI customer support, document assistants and AI search.</p></div>
        <div className="card"><h3>Automation</h3><p>Email workflows, notifications and business process automation.</p></div>
        <div className="card"><h3>Maintenance</h3><p>Bug fixing, updates, performance improvements and ongoing support.</p></div>
      </div>
      <Link to="/services" className="btn btn--secondary" style={{ marginTop: '1.5rem' }}>
        View all services
      </Link>
    </section>

    <section className="section section--cta">
      <div className="container">
        <span className="eyebrow">Get started</span>
        <h2>Ready to talk about your project?</h2>
        <p>Tell us what you're building — we'll get back to you with next steps.</p>
        <Link to="/request-quote" className="btn btn--primary">Request a Quote</Link>
      </div>
    </section>
  </div>
);

export default Home;
