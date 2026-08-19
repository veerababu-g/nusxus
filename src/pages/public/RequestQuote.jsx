import React, { useState } from 'react';
import api from '../../api/axios';

const initialState = {
  name: '', email: '', phone: '', country: '',
  company: '', industry: '', website: '',
  projectType: '', description: '', businessProblem: '', requirements: '', referenceWebsites: '',
  budget: 'Not Sure', timeline: 'Flexible', additionalNotes: ''
};

const budgetOptions = ['Under $50', '$100-$500', '$5000-$1,500', '$2,500-$5,000', '$5,000+', 'Not Sure'];
const timelineOptions = ['ASAP', '2-4 weeks', '1-2 months', '2-3 months', 'Flexible'];

const RequestQuote = () => {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ state: 'idle', message: '', enquiryId: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: '', enquiryId: '' });
    try {
      const { data } = await api.post('/leads', form);
      setStatus({ state: 'success', message: data.message, enquiryId: data.enquiryId });
      setForm(initialState);
    } catch (err) {
      setStatus({
        state: 'error',
        message: err.response?.data?.message || 'Something went wrong. Please try again.',
        enquiryId: ''
      });
    }
  };

  return (
    <div className="page container section">
      <span className="eyebrow">Start a project</span>
      <h1>Request a Quote</h1>
      <p>Tell us about your project — the more detail you give us, the better we can help.</p>

      <form className="form" onSubmit={handleSubmit}>
        <h3>Personal</h3>
        <div className="form__row">
          <label>Full Name *
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
          <label>Country
            <input name="country" value={form.country} onChange={handleChange} />
          </label>
        </div>

        <h3>Business</h3>
        <div className="form__row">
          <label>Company Name
            <input name="company" value={form.company} onChange={handleChange} />
          </label>
          <label>Industry
            <input name="industry" value={form.industry} onChange={handleChange} />
          </label>
        </div>
        <label>Website URL
          <input name="website" value={form.website} onChange={handleChange} />
        </label>

        <h3>Project</h3>
        <label>Project Type
          <input name="projectType" value={form.projectType} onChange={handleChange} placeholder="e.g. Business website, Web app, AI integration" />
        </label>
        <label>Project Description
          <textarea name="description" rows="4" value={form.description} onChange={handleChange} />
        </label>
        <label>Business Problem
          <textarea name="businessProblem" rows="3" value={form.businessProblem} onChange={handleChange} />
        </label>
        <label>Required Features
          <textarea name="requirements" rows="3" value={form.requirements} onChange={handleChange} />
        </label>
        <label>Reference Websites
          <input name="referenceWebsites" value={form.referenceWebsites} onChange={handleChange} />
        </label>

        <h3>Budget &amp; Timeline</h3>
        <div className="form__row">
          <label>Budget
            <select name="budget" value={form.budget} onChange={handleChange}>
              {budgetOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </label>
          <label>Timeline
            <select name="timeline" value={form.timeline} onChange={handleChange}>
              {timelineOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </label>
        </div>

        <label>Additional Requirements
          <textarea name="additionalNotes" rows="4" value={form.additionalNotes} onChange={handleChange} />
        </label>

        <button className="btn btn--primary" type="submit" disabled={status.state === 'loading'}>
          {status.state === 'loading' ? 'Submitting...' : 'Submit Request'}
        </button>

        {status.state === 'success' && (
          <p className="form__success">
            {status.message} Your enquiry reference is <strong>{status.enquiryId}</strong>.
          </p>
        )}
        {status.state === 'error' && <p className="form__error">{status.message}</p>}
      </form>
    </div>
  );
};

export default RequestQuote;
