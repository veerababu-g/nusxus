import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';

const statuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Won', 'Lost'];

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const { data } = await api.get(`/admin/leads/${id}`);
        setLead(data.lead);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load lead.');
      }
    };
    fetchLead();
  }, [id]);

  const handleChange = (field, value) => setLead({ ...lead, [field]: value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put(`/admin/leads/${id}`, lead);
      setLead(data.lead);
      alert('Lead updated.');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleArchive = async () => {
    try {
      await api.put(`/admin/leads/${id}/archive`);
      navigate('/admin/leads');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to archive lead.');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/leads/${id}?confirm=true`);
      navigate('/admin/leads');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete lead.');
    }
  };

  if (error) return <p className="form__error">{error}</p>;
  if (!lead) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/admin/leads" className="back-link">&larr; Back to Leads</Link>
      <h1>{lead.name} <span className="muted">({lead.enquiryId})</span></h1>

      <form className="form" onSubmit={handleSave}>
        <h3>Contact information</h3>
        <div className="form__row">
          <label>Name <input value={lead.name || ''} onChange={(e) => handleChange('name', e.target.value)} /></label>
          <label>Company <input value={lead.company || ''} onChange={(e) => handleChange('company', e.target.value)} /></label>
        </div>
        <div className="form__row">
          <label>Email <input value={lead.email || ''} onChange={(e) => handleChange('email', e.target.value)} /></label>
          <label>Phone <input value={lead.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} /></label>
        </div>
        <label>Country <input value={lead.country || ''} onChange={(e) => handleChange('country', e.target.value)} /></label>

        <h3>Business information</h3>
        <div className="form__row">
          <label>Industry <input value={lead.industry || ''} onChange={(e) => handleChange('industry', e.target.value)} /></label>
          <label>Website <input value={lead.website || ''} onChange={(e) => handleChange('website', e.target.value)} /></label>
        </div>

        <h3>Project information</h3>
        <label>Project Type <input value={lead.projectType || ''} onChange={(e) => handleChange('projectType', e.target.value)} /></label>
        <label>Requirements <textarea rows="3" value={lead.requirements || ''} onChange={(e) => handleChange('requirements', e.target.value)} /></label>
        <div className="form__row">
          <label>Budget
            <input value={lead.budget || ''} onChange={(e) => handleChange('budget', e.target.value)} />
          </label>
          <label>Timeline
            <input value={lead.timeline || ''} onChange={(e) => handleChange('timeline', e.target.value)} />
          </label>
        </div>
        <label>Additional Notes <textarea rows="3" value={lead.additionalNotes || ''} onChange={(e) => handleChange('additionalNotes', e.target.value)} /></label>

        <h3>Status</h3>
        <label>
          <select value={lead.status} onChange={(e) => handleChange('status', e.target.value)}>
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>

        <h3>Communication (internal only)</h3>
        <div className="form__row">
          <label>Contact Date
            <input type="date" value={lead.contactDate ? lead.contactDate.slice(0, 10) : ''} onChange={(e) => handleChange('contactDate', e.target.value)} />
          </label>
          <label>Follow-up Date
            <input type="date" value={lead.followUpDate ? lead.followUpDate.slice(0, 10) : ''} onChange={(e) => handleChange('followUpDate', e.target.value)} />
          </label>
        </div>
        <label>Internal Notes
          <textarea rows="4" value={lead.internalNotes || ''} onChange={(e) => handleChange('internalNotes', e.target.value)} />
        </label>

        <div className="form__actions">
          <button className="btn btn--primary" type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" className="btn btn--secondary" onClick={handleArchive}>
            Archive
          </button>
          {!confirmingDelete ? (
            <button type="button" className="btn btn--danger" onClick={() => setConfirmingDelete(true)}>
              Delete
            </button>
          ) : (
            <span className="confirm-delete">
              Are you sure you want to delete this record? This action cannot be easily undone.
              <button type="button" className="btn btn--secondary" onClick={() => setConfirmingDelete(false)}>Cancel</button>
              <button type="button" className="btn btn--danger" onClick={handleDelete}>Delete</button>
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default LeadDetail;
