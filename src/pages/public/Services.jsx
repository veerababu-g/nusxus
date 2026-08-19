import React from 'react';

const serviceCategories = [
  {
    title: 'Website Development',
    items: ['Business websites', 'Landing pages', 'Corporate websites', 'Portfolio websites', 'Responsive websites']
  },
  {
    title: 'Web Applications',
    items: ['Admin dashboards', 'Booking systems', 'Management systems', 'Customer portals', 'Internal business tools']
  },
  {
    title: 'E-commerce',
    items: ['Product catalogues', 'Cart', 'Orders', 'Admin management', 'Payment integration']
  },
  {
    title: 'AI Solutions',
    items: ['AI chatbots', 'AI customer support', 'AI document assistants', 'AI search', 'AI workflow integration']
  },
  {
    title: 'Automation',
    items: ['Email workflows', 'Notifications', 'Data processing', 'Business process automation']
  },
  {
    title: 'Maintenance',
    items: ['Bug fixing', 'Updates', 'Performance improvements', 'Deployment', 'Ongoing support']
  }
];

const Services = () => (
  <div className="page container section">
    <span className="eyebrow">Capabilities</span>
    <h1>Services</h1>
    <p>Everything below is scoped per project — get in touch and we'll help you figure out what you actually need.</p>
    <div className="grid grid--2">
      {serviceCategories.map((cat) => (
        <div className="card" key={cat.title}>
          <h3>{cat.title}</h3>
          <ul className="list">
            {cat.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

export default Services;
