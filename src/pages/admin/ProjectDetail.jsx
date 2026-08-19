import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';

const statuses = [
  'New', 'Planning', 'Design', 'Development', 'Testing',
  'Client Review', 'Revision', 'Deployment', 'Completed', 'On Hold', 'Cancelled'
];

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await api.get(`/admin/projects/${id}`);
        setProject(data.project);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load project.');
      }
    };
    fetchProject();
  }, [id]);

  const handleChange = (field, value) => setProject({ ...project, [field]: value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...project, clientId: project.clientId?._id || project.clientId };
      const { data } = await api.put(`/admin/projects/${id}`, payload);
      setProject({ ...data.project, clientId: project.clientId });
      alert('Project updated.');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleArchive = async () => {
    try {
      await api.put(`/admin/projects/${id}/archive`);
      navigate('/admin/projects');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to archive project.');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/projects/${id}?confirm=true`);
      navigate('/admin/projects');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete project.');
    }
  };

  if (error) return <p className="form__error">{error}</p>;
  if (!project) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/admin/projects" className="back-link">&larr; Back to Projects</Link>
      <h1>{project.name} <span className="muted">({project.projectId})</span></h1>
      {project.clientId?.name && (
        <p className="muted">Client: {project.clientId.name} {project.clientId.company ? `(${project.clientId.company})` : ''}</p>
      )}

      <div className="progress-bar progress-bar--lg">
        <div className="progress-bar__fill" style={{ width: `${project.progress}%` }} />
      </div>
      <p className="muted">{project.progress}% complete</p>

      <form className="form" onSubmit={handleSave}>
        <label>Project Name <input value={project.name || ''} onChange={(e) => handleChange('name', e.target.value)} /></label>
        <label>Description <textarea rows="3" value={project.description || ''} onChange={(e) => handleChange('description', e.target.value)} /></label>

        <div className="form__row">
          <label>Status
            <select value={project.status} onChange={(e) => handleChange('status', e.target.value)}>
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label>Progress (%)
            <input type="number" min="0" max="100" value={project.progress} onChange={(e) => handleChange('progress', Number(e.target.value))} />
          </label>
        </div>

        <div className="form__row">
          <label>Deadline
            <input type="date" value={project.deadline ? project.deadline.slice(0, 10) : ''} onChange={(e) => handleChange('deadline', e.target.value)} />
          </label>
          <label>Priority
            <select value={project.priority} onChange={(e) => handleChange('priority', e.target.value)}>
              <option>Low</option><option>Medium</option><option>High</option><option>Urgent</option>
            </select>
          </label>
        </div>

        <div className="form__row">
          <label>Budget
            <input type="number" value={project.budget || ''} onChange={(e) => handleChange('budget', Number(e.target.value))} />
          </label>
          <label>Payment Status
            <select value={project.paymentStatus} onChange={(e) => handleChange('paymentStatus', e.target.value)}>
              <option>Unpaid</option><option>Deposit Paid</option><option>Partially Paid</option><option>Paid in Full</option>
            </select>
          </label>
        </div>

        <label>Assigned Developer <input value={project.assignedTo || ''} onChange={(e) => handleChange('assignedTo', e.target.value)} /></label>
        <label>Notes <textarea rows="3" value={project.notes || ''} onChange={(e) => handleChange('notes', e.target.value)} /></label>

        <div className="form__actions">
          <button className="btn btn--primary" type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" className="btn btn--secondary" onClick={handleArchive}>
            Archive Project
          </button>
          {!confirmingDelete ? (
            <button type="button" className="btn btn--danger" onClick={() => setConfirmingDelete(true)}>
              Delete Project
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

export default ProjectDetail;
