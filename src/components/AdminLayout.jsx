import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/leads', label: 'Leads / Clients' },
  { to: '/admin/projects', label: 'Projects' }
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin">
      <header className="admin__topbar">
        <button
          className="admin__drawerToggle"
          aria-label="Toggle sidebar"
          onClick={() => setDrawerOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="admin__topbarBrand">Nexus IT Web Admin</div>
        <div className="admin__topbarUser">
          {admin?.name} <span className="admin__badge">{admin?.role}</span>
        </div>
      </header>

      <div className="admin__body">
        <aside className={`admin__sidebar ${drawerOpen ? 'admin__sidebar--open' : ''}`}>
          <nav>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `admin__navLink ${isActive ? 'admin__navLink--active' : ''}`
                }
                onClick={() => setDrawerOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <button className="admin__navLink admin__logout" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        </aside>

        <main className="admin__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
