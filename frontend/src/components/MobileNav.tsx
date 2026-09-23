import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, Briefcase, CheckCircle, Layers, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: Compass },
    { to: '/opportunities', label: 'Explore', icon: Briefcase },
    { to: '/applications', label: 'Applications', icon: CheckCircle },
    { to: '/skills', label: 'Skills', icon: Layers },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav
      className="mobile-bottom-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 62,
        background: 'rgba(5, 8, 17, 0.94)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 8px',
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.to || (item.to !== '/dashboard' && location.pathname.startsWith(item.to));

        return (
          <NavLink
            key={item.to}
            to={item.to}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              textDecoration: 'none',
              color: isActive ? 'var(--accent-cyan)' : '#64748b',
              fontSize: 10.5,
              fontWeight: isActive ? 700 : 500,
              padding: '6px 8px',
              borderRadius: 10,
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
          >
            <Icon size={19} color={isActive ? 'var(--accent-cyan)' : '#64748b'} />
            <span>{item.label}</span>
            {isActive && (
              <span
                style={{
                  position: 'absolute',
                  top: 2,
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: 'var(--accent-cyan)',
                  boxShadow: '0 0 6px var(--accent-cyan)',
                }}
              />
            )}
          </NavLink>
        );
      })}

      <style>{`
        @media (min-width: 769px) {
          .mobile-bottom-bar {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};
