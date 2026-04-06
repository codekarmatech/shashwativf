import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import RootLayout from './layout/RootLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LeadersPage from './pages/LeadersPage';
import TeamPage from './pages/TeamPage';
import FoundationPage from './pages/FoundationPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import MediaPage from './pages/MediaPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="about/leaders" element={<LeadersPage />} />
            <Route path="about/team" element={<TeamPage />} />
            <Route path="foundation" element={<FoundationPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:slug" element={<ServiceDetailPage />} />
            <Route path="stories" element={<SuccessStoriesPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogDetailPage />} />
            <Route path="coverageofmedia" element={<MediaPage />} />
            <Route path="mediacoverage" element={<Navigate to="/coverageofmedia" replace />} />
            <Route path="media" element={<Navigate to="/coverageofmedia" replace />} />
            <Route path="contact" element={<ContactPage />} />
            {/* Additional routes will be added here */}
            <Route path="*" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-brand-ink mb-4">Page Coming Soon</h1><p className="text-brand-muted">This page is under construction.</p></div></div>} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
