
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  History,
  Settings,
  BarChart3,
  Shield,
  TrendingUp,
  Menu,
  LogOut,
  User
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  authRequired?: boolean;
  adminOnly?: boolean;
}

export const Navigation: React.FC = () => {
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const navItems: NavItem[] = [
    { name: 'Accueil', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Historique', path: '/history', icon: <History className="w-4 h-4" />, authRequired: true },
    { name: 'Développement', path: '/personal-development', icon: <TrendingUp className="w-4 h-4" />, authRequired: true },
    { name: 'Dashboard', path: '/dashboard', icon: <BarChart3 className="w-4 h-4" />, authRequired: true },
    { name: 'Préférences', path: '/preferences', icon: <Settings className="w-4 h-4" />, authRequired: true },
    { name: 'Admin', path: '/admin', icon: <Shield className="w-4 h-4" />, adminOnly: true }
  ];

  const visibleItems = navItems.filter(item => {
    if (item.adminOnly) return isAdmin;
    if (item.authRequired) return user;
    return true;
  });

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo et Titre */}
        <Link to="/" className="flex items-center text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-sm font-bold">E</span>
          </div>
          <span className="bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
            ECHO
          </span>
        </Link>

        {/* Navigation Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {visibleItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-gray-600 hover:text-indigo-600 flex items-center space-x-2 transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50 ${
                location.pathname === item.path ? 'text-indigo-700 bg-indigo-50 font-medium' : ''
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 p-0 rounded-full hover:bg-indigo-50">
                  <Avatar className="h-10 w-10 border-2 border-indigo-200">
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-semibold">
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none">
                      {user.user_metadata?.full_name || 'Utilisateur'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                    {isAdmin && (
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium mt-1 w-fit">
                        Admin
                      </span>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/preferences" className="flex items-center cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Préférences
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                <User className="mr-2 h-4 w-4" />
                Connexion
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:w-64">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
                <SheetDescription className="text-left">
                  Naviguez dans l'application.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-2">
                {visibleItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-3 py-3 px-4 rounded-md hover:bg-gray-100 transition-colors ${
                      location.pathname === item.path ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
                
                {user ? (
                  <div className="pt-4 border-t border-gray-200 mt-4">
                    <div className="px-4 py-2 text-sm text-gray-600">
                      <p className="font-medium">{user.user_metadata?.full_name || 'Utilisateur'}</p>
                      <p className="text-xs">{user.email}</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-3 py-3 px-4 rounded-md hover:bg-red-50 text-red-600 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-200 mt-4">
                    <Link
                      to="/auth"
                      className="flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700"
                    >
                      <User className="w-4 h-4" />
                      <span>Connexion</span>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
