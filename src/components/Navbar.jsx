import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
 
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <svg
            className="navbar__mark"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 14V6C2 4.89543 2.89543 4 4 4H10" stroke="#2F6FED" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 6V14C18 15.1046 17.1046 16 16 16H10" stroke="#00A891" strokeWidth="2" strokeLinecap="round" />
            <circle cx="10" cy="4" r="2" fill="#2F6FED" />
            <circle cx="10" cy="16" r="2" fill="#00A891" />
          </svg>
          Nexus IT Web
        </Link>

        <button
          className="navbar__toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/request-quote" className="btn btn--primary navbar__cta" onClick={() => setOpen(false)}>
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
