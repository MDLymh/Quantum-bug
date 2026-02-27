import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { CircleUserRound, LogOut } from 'lucide-react';


interface NavLink {
  name: string;
  link: string;
}

interface User {
  name: string;
  email?: string;
}

interface NavbarProps {
  links: NavLink[];          // Links de navegación (Dashboard, etc.)
  authLinks: NavLink[];      // Links para invitados (Login, Register)
  logoutRoute: string;       // Nombre de la ruta o URL de logout (ej: '/logout')
  user: User | null;         // auth.user desde Laravel
  logoName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  links, 
  authLinks, 
  logoutRoute, 
  user, 
  logoName = "QuantumBug" 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    router.post(logoutRoute);
  };

  return (
    <nav className="border-b border-indigo-600 w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo e Inertia Links Principales */}
          <div className="flex items-center space-x-10 h-full">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              {logoName}
            </Link>
            
            <div className="hidden md:flex space-x-6 h-full items-center">
              {links.map((item, idx) => (
                <Link 
                  key={idx} 
                  href={item.link} 
                  className="text-sm font-medium dark:text-white  hover:text-indigo-600 h-full items-center flex transition capitalize"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-6">
                <span className="text-sm dark:text-white">Hola, {user.name}</span>
                
                
                <button 
                  onClick={handleLogout}
                  className="text-sm font-semibold text-red-500 hover:text-red-700 transition cursor-pointer"
                >
                  <LogOut />
                </button>
                <Link href="settings/profile" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition">
                  <CircleUserRound />
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {authLinks.map((item, idx) => (
                  <Link 
                    key={idx} 
                    href={item.link} 
                    className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                      idx === authLinks.length - 1 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm' 
                      : 'dark:text-white hover:bg-gray-50 hover:text-black'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen 
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden border-t border-indigo-600 py-4 px-4 space-y-2">
          {links.map((item, idx) => (
            <Link key={idx} href={item.link} className="block text-gray-700 py-2 font-medium">
              {item.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-indigo-600">
            {user ? (
              <>
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left text-red-500 font-bold py-2 cursor-pointer"
                >
                  Cerrar Sesión
                </button>
                <Link href="settings/profile" className="block text-gray-700 py-2 font-medium">
                  Perfil
                </Link>
              </>
            ) : (
              authLinks.map((item, idx) => (
                <Link key={idx} href={item.link} className="block text-gray-700 py-2 font-medium">
                  {item.name}
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;