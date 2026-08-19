import React from 'react';

const faqs = [
  {
    q: 'What technologies do you use?',
    a: 'Primarily React.js, Node.js, Express.js and MongoDB, with modern deployment tooling. We choose the right technology for the project, not the other way around.'
  },
  {
    q: 'Do you use AI to build projects?',
    a: 'Yes — AI tools help accelerate development, but every project still goes through human engineering, testing and quality control. AI does not automatically produce perfect code.'
  },
  {
    q: 'How much does a project cost?',
    a: 'It depends on scope. See our Pricing page for starting points, or request a quote and we\u2019ll get back to you with real numbers.'
  },
  {
    q: 'Do you offer support after launch?',
    a: 'Yes, ongoing maintenance and support is part of how we work — bug fixes, updates and performance improvements included.'
  },
  {
    q: 'How do I get started?',
    a: 'Fill out the Request a Quote form with as much detail as you can, and our team will follow up with next steps.'
  }
];

const FAQ = () => (
  <div className="page container section">
    <span className="eyebrow">Questions</span>
    <h1>Frequently Asked Questions</h1>
    <div className="faq-list">
      {faqs.map((item) => (
        <details className="faq-item" key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  </div>
);

export default FAQ;
