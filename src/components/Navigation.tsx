
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, History, Settings, Brain } from 'lucide-react';

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Accueil' },
    { path: '/history', icon: History, label: 'Historique' },
    { path: '/admin', icon: Brain, label: 'Admin' },
    { path: '/preferences', icon: Settings, label: 'Préférences' }
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="font-bold text-xl text-gray-800">ECHO</span>
        </div>

        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate(item.path)}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  );
};
