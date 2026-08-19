import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const statuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Won', 'Lost'];

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLeads = useCallback(async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/admin/leads', {
        params: { search: search || undefined, status: status || undefined, sort, page, limit: 20 }
      });
      setLeads(data.leads);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load leads.');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status, sort]);

  useEffect(() => { fetchLeads(1); }, [fetchLeads]);

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      await api.put(`/admin/leads/${leadId}`, { status: newStatus });
      setLeads((prev) => prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l)));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status.');
    }
  };

  return (
    <div>
      <h1>Leads / Clients</h1>

      <div className="toolbar">
        <input
          placeholder="Search by name, email, company, enquiry ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="highestBudget">Highest budget</option>
          <option value="status">Status</option>
        </select>
      </div>

      {loading && <p>Loading leads...</p>}
      {error && <p className="form__error">{error}</p>}

      {!loading && !error && (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Company</th><th>Email</th><th>Phone</th>
                <th>Country</th><th>Project Type</th><th>Budget</th><th>Status</th><th>Date</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id}>
                  <td>{lead.enquiryId}</td>
                  <td>{lead.name}</td>
                  <td>{lead.company}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.country}</td>
                  <td>{lead.projectType}</td>
                  <td>{lead.budget}</td>
                  <td>
                    <select value={lead.status} onChange={(e) => handleStatusChange(lead._id, e.target.value)}>
                      {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td><Link to={`/admin/leads/${lead._id}`}>View</Link></td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr><td colSpan="11">No leads found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {pagination.pages > 1 && (
        <div className="pagination">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={p === pagination.page ? 'pagination__btn pagination__btn--active' : 'pagination__btn'}
              onClick={() => fetchLeads(p)}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leads;
