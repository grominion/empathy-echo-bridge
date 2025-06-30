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
  X
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const navItems = [
    { name: 'Accueil', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Historique', path: '/history', icon: <History className="w-4 h-4" /> },
    { name: 'Développement', path: '/personal-development', icon: <TrendingUp className="w-4 h-4" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'Préférences', path: '/preferences', icon: <Settings className="w-4 h-4" /> },
    { name: 'Admin', path: '/admin', icon: <Shield className="w-4 h-4" /> }
  ];

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo et Titre */}
        <Link to="/" className="flex items-center text-xl font-semibold text-gray-800">
          <img src="/logo.png" alt="Empathy Coach Logo" className="h-8 w-auto mr-2" />
          Empathy Coach
        </Link>

        {/* Navigation Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-gray-600 hover:text-blue-600 flex items-center space-x-2 ${location.pathname === item.path ? 'text-blue-700 font-medium' : ''}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Actions (Boutons) */}
        <div className="hidden md:flex items-center space-x-4">
          {notifications > 0 && (
            <Button variant="outline">
              Notifications ({notifications})
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold leading-none">shadcn</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    shadcn@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open side menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:w-64">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navigate through the application.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-3 py-2 px-4 rounded-md hover:bg-gray-100 ${location.pathname === item.path ? 'bg-gray-100 font-medium' : ''}`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
