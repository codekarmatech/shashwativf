import React from 'react';
import { FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { useClinicInfo } from '../hooks/useApi';
import { clinicInfo } from '../data/clinic';

const TopBar = () => {
  const { data: apiClinicInfo } = useClinicInfo();
  const displayClinicInfo = apiClinicInfo || clinicInfo;
  
  return (
    <div className="hidden lg:block bg-brand-teal text-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <FaPhone className="w-3 h-3" />
              <span>Front Desk: {displayClinicInfo.front_desk_phone || displayClinicInfo.contact?.phone?.frontDesk}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="w-3 h-3" />
              <span>{displayClinicInfo.general_email || displayClinicInfo.contact?.email?.general}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FaClock className="w-3 h-3" />
            <span>Mon-Sat: {displayClinicInfo.weekday_hours || displayClinicInfo.hours?.weekdays} | Sun: {displayClinicInfo.sunday_hours || displayClinicInfo.hours?.sunday}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
