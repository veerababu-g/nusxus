import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from './projectsData';

const ProjectDetails = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="page container section">
        <h1>Project not found</h1>
        <Link to="/projects" className="btn btn--secondary">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="page container section">
      <Link to="/projects" className="back-link">&larr; Back to Projects</Link>
      <h1>{project.name} {project.isDemo && <span className="tag">Demonstration Project</span>}</h1>
      <p className="muted">{project.industry}</p>

      <h2>Problem</h2>
      <p>{project.problem}</p>

      <h2>Solution</h2>
      <p>{project.solution}</p>

      <h2>Features</h2>
      <ul className="list">
        {project.features.map((f) => <li key={f}>{f}</li>)}
      </ul>

      <h2>Technologies</h2>
      <div className="tag-row">
        {project.technologies.map((t) => <span className="tag" key={t}>{t}</span>)}
      </div>
    </div>
  );
};

export default ProjectDetails;
