import React, { useState } from 'react';
import api from '../../api/axios';

const initialState = { name: '', email: '', phone: '', company: '', subject: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });
    try {
      const { data } = await api.post('/contact', form);
      setStatus({ state: 'success', message: data.message });
      setForm(initialState);
    } catch (err) {
      setStatus({
        state: 'error',
        message: err.response?.data?.message || 'Something went wrong. Please try again.'
      });
    }
  };

  return (
    <div className="page container section">
      <span className="eyebrow">Get in touch</span>
      <h1>Contact Us</h1>
      <p>Have a question or just want to say hello? Send us a message.</p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form__row">
          <label>Name *
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>Email *
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
        </div>
        <div className="form__row">
          <label>Phone
            <input name="phone" value={form.phone} onChange={handleChange} />
          </label>
          <label>Company
            <input name="company" value={form.company} onChange={handleChange} />
          </label>
        </div>
        <label>Subject
          <input name="subject" value={form.subject} onChange={handleChange} />
        </label>
        <label>Message *
          <textarea name="message" rows="6" value={form.message} onChange={handleChange} required />
        </label>

        <button className="btn btn--primary" type="submit" disabled={status.state === 'loading'}>
          {status.state === 'loading' ? 'Sending...' : 'Send Message'}
        </button>

        {status.state === 'success' && <p className="form__success">{status.message}</p>}
        {status.state === 'error' && <p className="form__error">{status.message}</p>}
      </form>
    </div>
  );
};

export default Contact;
