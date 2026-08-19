import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await api.get('/admin/dashboard/summary');
        setSummary(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard summary.');
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="form__error">{error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Leads</h2>
      <div className="grid grid--4">
        <div className="stat-card">
          <span className="stat-card__value">{summary.leads.total}</span>
          <span className="stat-card__label">Total Leads</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{summary.leads.new}</span>
          <span className="stat-card__label">New Enquiries</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{summary.leads.contacted}</span>
          <span className="stat-card__label">Contacted Leads</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{summary.leads.qualified}</span>
          <span className="stat-card__label">Qualified Leads</span>
        </div>
      </div>

      <h2>Projects</h2>
      <div className="grid grid--4">
        <div className="stat-card">
          <span className="stat-card__value">{summary.projects.active}</span>
          <span className="stat-card__label">Active Projects</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{summary.projects.completed}</span>
          <span className="stat-card__label">Completed Projects</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{summary.pendingActions}</span>
          <span className="stat-card__label">Pending Actions</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
