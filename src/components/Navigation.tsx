
import React from 'react';
import { Home, Plus, Heart, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const currentPath = window.location.pathname;

  const navigationItems = [
    { path: '/', icon: Home, label: 'Главная' },
    { path: '/create', icon: Plus, label: 'Создать' },
    { path: '/dashboard', icon: Heart, label: 'Мои мечты' },
    { path: '/popular', icon: Compass, label: 'Исследовать' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="text-2xl">🌍</div>
            <span className="text-gray-800 font-bold text-xl">Моя Карта Желаний</span>
          </div>
          
          <div className="flex items-center gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => window.location.href = item.path}
                  className={`text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 ${
                    isActive ? 'bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white' : ''
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
