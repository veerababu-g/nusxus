import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const statuses = [
  'New', 'Planning', 'Design', 'Development', 'Testing',
  'Client Review', 'Revision', 'Deployment', 'Completed', 'On Hold', 'Cancelled'
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchProjects = useCallback(async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/admin/projects', {
        params: { search: search || undefined, status: status || undefined, sort, page, limit: 20 }
      });
      setProjects(data.projects);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load projects.');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status, sort]);

  useEffect(() => { fetchProjects(1); }, [fetchProjects]);

  const inProgress = projects.filter((p) => !['Completed', 'Cancelled'].includes(p.status));
  const completed = projects.filter((p) => p.status === 'Completed');

  return (
    <div>
      <div className="section-header">
        <h1>Projects</h1>
        <button className="btn btn--primary" onClick={() => setShowAddForm((s) => !s)}>
          {showAddForm ? 'Close' : '+ Add Project'}
        </button>
      </div>

      {showAddForm && <AddProjectForm onCreated={() => { setShowAddForm(false); fetchProjects(1); }} />}

      <div className="toolbar">
        <input placeholder="Search by name or project ID..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="deadline">Deadline</option>
          <option value="status">Status</option>
        </select>
      </div>

      {loading && <p>Loading projects...</p>}
      {error && <p className="form__error">{error}</p>}

      {!loading && !error && (
        <>
          <h2>Projects In Progress</h2>
          <ProjectTable projects={inProgress} />

          <h2>Completed Projects</h2>
          <ProjectTable projects={completed} completedView />
        </>
      )}

      {pagination.pages > 1 && (
        <div className="pagination">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={p === pagination.page ? 'pagination__btn pagination__btn--active' : 'pagination__btn'}
              onClick={() => fetchProjects(p)}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectTable = ({ projects, completedView }) => (
  <div className="table-wrap">
    <table className="table">
      <thead>
        <tr>
          <th>Project</th><th>Client</th><th>Type</th><th>Status</th>
          {completedView ? <th>Completion Date</th> : <th>Deadline</th>}
          <th>Progress</th><th>Priority</th><th>Assigned</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((p) => (
          <tr key={p._id}>
            <td>{p.name}</td>
            <td>{p.clientId?.name || '-'}</td>
            <td>{p.projectType}</td>
            <td><span className={`status-pill status-pill--${p.status.replace(/\s/g, '')}`}>{p.status}</span></td>
            <td>{p.deadline ? new Date(p.deadline).toLocaleDateString() : '-'}</td>
            <td>
              <div className="progress-bar">
                <div className="progress-bar__fill" style={{ width: `${p.progress}%` }} />
              </div>
              {p.progress}%
            </td>
            <td>{p.priority}</td>
            <td>{p.assignedTo}</td>
            <td><Link to={`/admin/projects/${p._id}`}>View</Link></td>
          </tr>
        ))}
        {projects.length === 0 && <tr><td colSpan="9">No projects here yet.</td></tr>}
      </tbody>
    </table>
  </div>
);

const AddProjectForm = ({ onCreated }) => {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({
    name: '', clientId: '', description: '', projectType: '', technologies: '',
    startDate: '', deadline: '', budget: '', paymentStatus: 'Unpaid', status: 'New',
    progress: 0, priority: 'Medium', assignedTo: '', notes: ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/admin/leads', { params: { limit: 100 } })
      .then(({ data }) => setLeads(data.leads))
      .catch(() => {});
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await api.post('/admin/projects', {
        ...form,
        technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
        budget: form.budget ? Number(form.budget) : undefined
      });
      onCreated();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="form form--card" onSubmit={handleSubmit}>
      <h3>New Project</h3>
      <div className="form__row">
        <label>Project Name *
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>Client *
          <select name="clientId" value={form.clientId} onChange={handleChange} required>
            <option value="">Select a client / lead</option>
            {leads.map((l) => <option key={l._id} value={l._id}>{l.name} {l.company ? `(${l.company})` : ''}</option>)}
          </select>
        </label>
      </div>
      <label>Description
        <textarea name="description" rows="3" value={form.description} onChange={handleChange} />
      </label>
      <div className="form__row">
        <label>Project Type <input name="projectType" value={form.projectType} onChange={handleChange} /></label>
        <label>Technologies (comma separated) <input name="technologies" value={form.technologies} onChange={handleChange} /></label>
      </div>
      <div className="form__row">
        <label>Start Date <input type="date" name="startDate" value={form.startDate} onChange={handleChange} /></label>
        <label>Deadline <input type="date" name="deadline" value={form.deadline} onChange={handleChange} /></label>
      </div>
      <div className="form__row">
        <label>Budget <input type="number" name="budget" value={form.budget} onChange={handleChange} /></label>
        <label>Payment Status
          <select name="paymentStatus" value={form.paymentStatus} onChange={handleChange}>
            <option>Unpaid</option><option>Deposit Paid</option><option>Partially Paid</option><option>Paid in Full</option>
          </select>
        </label>
      </div>
      <div className="form__row">
        <label>Status
          <select name="status" value={form.status} onChange={handleChange}>
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label>Priority
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option>Low</option><option>Medium</option><option>High</option><option>Urgent</option>
          </select>
        </label>
      </div>
      <div className="form__row">
        <label>Progress (%) <input type="number" min="0" max="100" name="progress" value={form.progress} onChange={handleChange} /></label>
        <label>Assigned Developer <input name="assignedTo" value={form.assignedTo} onChange={handleChange} /></label>
      </div>
      <label>Notes <textarea name="notes" rows="3" value={form.notes} onChange={handleChange} /></label>

      {error && <p className="form__error">{error}</p>}
      <button className="btn btn--primary" type="submit" disabled={saving}>
        {saving ? 'Creating...' : 'Create Project'}
      </button>
    </form>
  );
};

export default Projects;
