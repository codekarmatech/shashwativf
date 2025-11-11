import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';
import { useClinicInfo } from '../hooks/useApi';
import { clinicInfo } from '../data/clinic';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { data: apiClinicInfo } = useClinicInfo();
  const displayClinicInfo = apiClinicInfo || clinicInfo;

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'About Us', 
      href: '/about',
      submenu: [
        { name: 'About Shashwat', href: '/about' },
        { name: 'Our Leaders', href: '/about/leaders' },
        { name: 'Our Team', href: '/about/team' },
        { name: 'Foundation', href: '/foundation' }
      ]
    },
    { name: 'Services', href: '/services' },
    { name: 'Media & Academics', href: '/media' },
    { name: 'Success Stories', href: '/stories' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/Shasheat IVF R-03.png" 
                alt="Shashwat IVF & Women's Hospital" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-brand-teal ${
                    isActive(item.href) 
                      ? 'text-brand-teal border-b-2 border-brand-teal pb-1' 
                      : 'text-brand-ink'
                  }`}
                >
                  {item.name}
                </Link>
                
                {/* Submenu */}
                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-4 py-2 text-sm text-brand-ink hover:bg-brand-tealSoft hover:text-brand-teal transition-colors duration-200"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`tel:${displayClinicInfo.appointments_phone || displayClinicInfo.contact?.phone?.appointments}`}
              className="text-sm font-medium text-brand-teal hover:text-brand-ink transition-colors duration-200 flex items-center space-x-2"
            >
              <FaPhone className="w-3 h-3" />
              <span>{displayClinicInfo.appointments_phone || displayClinicInfo.contact?.phone?.appointments}</span>
            </a>
            <Link
              to="/contact"
              className="bg-brand-coral text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-brand-ink hover:text-brand-teal transition-colors duration-200"
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-brand-teal bg-brand-tealSoft'
                        : 'text-brand-ink hover:text-brand-teal hover:bg-brand-tealSoft'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {/* Mobile Submenu */}
                  {item.submenu && (
                    <div className="pl-4">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-3 py-2 text-sm text-brand-muted hover:text-brand-teal transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-4 pb-2 space-y-2">
                <a
                  href={`tel:${displayClinicInfo.appointments_phone || displayClinicInfo.contact?.phone?.appointments}`}
                  className="block w-full text-center bg-brand-teal text-white px-4 py-3 rounded-full text-sm font-medium"
                >
                  Call Now
                </a>
                <Link
                  to="/contact"
                  className="block w-full text-center bg-brand-coral text-white px-4 py-3 rounded-full text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
