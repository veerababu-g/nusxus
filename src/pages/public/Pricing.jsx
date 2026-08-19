import React from 'react';
import { Link } from 'react-router-dom';

// Starting prices are intentionally illustrative placeholders ("configurable amount" per spec).
// In a later phase these should be fetched from the Admin-managed /api/pricing endpoint
// instead of being hard-coded here.
const packages = [
  {
    name: 'Starter Website',
    price: 'Starting from a configurable amount',
    description: 'A focused, professional site for small businesses getting online.',
    features: ['Up to 5 pages', 'Responsive design', 'Contact form', 'Basic SEO setup']
  },
  {
    name: 'Business Website',
    price: 'Starting from a configurable amount',
    description: 'A larger site for businesses that need more structure and content.',
    features: ['Up to 12 pages', 'CMS-style content sections', 'Advanced SEO', 'Analytics integration']
  },
  {
    name: 'Custom Web Application',
    price: 'Custom quote',
    description: 'Dashboards, portals and internal tools tailored to your workflow.',
    features: ['Custom features and workflows', 'Database-backed', 'Admin management', 'API integrations']
  },
  {
    name: 'AI & Automation',
    price: 'Custom quote',
    description: 'Practical AI and automation built around a real business need.',
    features: ['AI chatbot / assistant', 'Workflow automation', 'Integration with existing tools']
  }
];

const Pricing = () => (
  <div className="page container section">
    <span className="eyebrow">Investment</span>
    <h1>Pricing</h1>
    <p>
      Exact pricing depends on scope. The figures below are starting points and are managed by
      our team — get in touch for a quote tailored to your project.
    </p>
    <div className="grid grid--4">
      {packages.map((pkg) => (
        <div className="card" key={pkg.name}>
          <h3>{pkg.name}</h3>
          <p className="price">{pkg.price}</p>
          <p>{pkg.description}</p>
          <ul className="list">
            {pkg.features.map((f) => <li key={f}>{f}</li>)}
          </ul>
          <Link to="/request-quote" className="btn btn--primary">Request a Quote</Link>
        </div>
      ))}
    </div>
  </div>
);

export default Pricing;
