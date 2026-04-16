import React from 'react';
import { FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { useClinicInfo } from '../hooks/useApi';
import { normalizeClinicInfo } from '../utils/clinicInfo';

const TopBar = () => {
  const { data: apiClinicInfo } = useClinicInfo();
  const displayClinicInfo = normalizeClinicInfo(apiClinicInfo);
  
  return (
    <div className="hidden lg:block bg-brand-teal text-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <FaPhone className="w-3 h-3" />
              <span>Front Desk: {displayClinicInfo.contact.phone.frontDesk}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="w-3 h-3" />
              <span>{displayClinicInfo.contact.email.general}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FaClock className="w-3 h-3" />
            <span>Mon-Sat: {displayClinicInfo.contact.hours.weekdays} | Sun: {displayClinicInfo.contact.hours.sunday}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
