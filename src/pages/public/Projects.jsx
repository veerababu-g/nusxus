import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from './projectsData';

const Projects = () => (
  <div className="page container section">
    <span className="eyebrow">Our work</span>
    <h1>Our Projects</h1>
    <p>
      A mix of client and demonstration work. Demonstration projects are clearly labeled — we
      never present internal or example work as paid client results.
    </p>
    <div className="grid grid--2">
      {projects.map((p) => (
        <div className="card" key={p.slug}>
          <h3>{p.name} {p.isDemo && <span className="tag">Demonstration Project</span>}</h3>
          <p className="muted">{p.industry}</p>
          <p>{p.problem}</p>
          <Link to={`/projects/${p.slug}`} className="btn btn--secondary">View Details</Link>
        </div>
      ))}
    </div>
  </div>
);

export default Projects;
