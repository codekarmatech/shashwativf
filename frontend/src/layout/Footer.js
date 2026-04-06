import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { clinicInfo } from '../data/clinic';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Media & Academics', href: '/mediacoverage' },
    { name: 'Success Stories', href: '/stories' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  const socialLinks = [
    { name: 'Facebook', href: clinicInfo.socialMedia.facebook, icon: FaFacebook },
    { name: 'Instagram', href: clinicInfo.socialMedia.instagram, icon: FaInstagram },
    { name: 'YouTube', href: clinicInfo.socialMedia.youtube, icon: FaYoutube },
    { name: 'LinkedIn', href: clinicInfo.socialMedia.linkedin, icon: FaLinkedin }
  ];

  return (
    <footer className="bg-brand-ink text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Contact Information */}
          <div>
            <div className="text-2xl font-heading font-bold mb-4">
              Shashwat IVF
            </div>
            <p className="text-gray-300 mb-6">
              NABH-accredited IVF & Women's Hospital providing comprehensive fertility and women's health services with ethical, transparent care.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="w-4 h-4 mt-1 text-brand-coral flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  {clinicInfo.contact.address.full}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FaPhone className="w-4 h-4 text-brand-coral" />
                <div className="text-sm">
                  <div>Front Desk: {clinicInfo.contact.phone.frontDesk}</div>
                  <div>Appointments: {clinicInfo.contact.phone.appointments}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FaEnvelope className="w-4 h-4 text-brand-coral" />
                <div className="text-sm text-gray-300">
                  {clinicInfo.contact.email.general}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-300 hover:text-brand-coral transition-colors duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="mt-6">
              <h4 className="text-md font-medium mb-3">Legal</h4>
              <div className="space-y-2">
                <Link to="/privacy" className="text-gray-300 hover:text-brand-coral transition-colors duration-200 text-sm block">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-300 hover:text-brand-coral transition-colors duration-200 text-sm block">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          {/* Clinic Snapshot & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Clinic Snapshot</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-brand-coral">{clinicInfo.metrics.townsReached}</div>
                <div className="text-xs text-gray-300">Towns Reached</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-brand-coral">{clinicInfo.metrics.livesImpacted}</div>
                <div className="text-xs text-gray-300">Lives Impacted</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-brand-coral">{clinicInfo.metrics.yearsExperience}</div>
                <div className="text-xs text-gray-300">Years Experience</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-brand-coral">{clinicInfo.metrics.successRate}</div>
                <div className="text-xs text-gray-300">Success Rate</div>
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-brand-coral transition-colors duration-200"
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-xs text-gray-400 space-y-1">
                <div>NABH Accredited IVF Centre</div>
                <div>FOGSI Certified Training Centre</div>
                <div>ISO 9001:2015 Certified</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Shashwat IVF & Women's Hospital. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Designed with care for your fertility journey • Developed by{' '}
            <a 
              href="https://www.codingbullz.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-coral hover:text-white transition-colors"
            >
              www.codingbullz.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
