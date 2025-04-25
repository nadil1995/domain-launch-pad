
import { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWorkflow } from '@/context/WorkflowContext';
import UserMenu from './UserMenu';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentStep, setCurrentStep, user, setUser } = useWorkflow();
  
  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'How It Works', href: '#workflow' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleGetStarted = () => {
    setCurrentStep('packages');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentStep('landing');
  };

  const handleLogin = () => {
    setCurrentStep('auth');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container-custom mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2" onClick={() => setCurrentStep('landing')}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-600 to-brand-800"></div>
              <span className="font-bold text-xl text-gray-900">EmailLaunch</span>
            </a>
          </div>
          
          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <UserMenu name={user.name} onLogout={handleLogout} />
            ) : (
              <>
                <Button 
                  onClick={handleLogin}
                  variant="ghost"
                  className="hidden md:inline-flex items-center"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Log in
                </Button>
                <Button 
                  onClick={handleGetStarted}
                  className="hidden md:inline-flex bg-brand-600 hover:bg-brand-700 text-white"
                >
                  Get Started
                </Button>
              </>
            )}
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-brand-600 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="container-custom py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-medium text-gray-700 hover:text-brand-600"
              >
                {item.label}
              </a>
            ))}
            {!user && (
              <>
                <Button 
                  onClick={() => {
                    handleLogin();
                    setMobileMenuOpen(false);
                  }}
                  variant="ghost"
                  className="w-full justify-center"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Log in
                </Button>
                <Button 
                  onClick={() => {
                    handleGetStarted();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
