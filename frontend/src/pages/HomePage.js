import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroBento from '../components/home/HeroBento';
import ImpactMetrics from '../components/home/ImpactMetrics';
import ServicesBento from '../components/home/ServicesBento';
import WhyShashwat from '../components/home/WhyShashwat';
import LeadersSection from '../components/home/LeadersSection';
import GlobalImpact from '../components/home/GlobalImpact';
import PatientJourney from '../components/home/PatientJourney';
import SuccessStoriesPreview from '../components/home/SuccessStoriesPreview';
import BlogPreview from '../components/home/BlogPreview';
import FinalCTA from '../components/home/FinalCTA';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Shashwat IVF & Women's Hospital - NABH Accredited Fertility Center in Ahmedabad</title>
        <meta 
          name="description" 
          content="Leading NABH-accredited IVF and women's hospital in Ahmedabad. Comprehensive fertility treatments including IVF, egg freezing, and women's health services with ethical, transparent care." 
        />
        <meta name="keywords" content="IVF Ahmedabad, fertility treatment, egg freezing, women's hospital, NABH accredited, Dr Shital Punjabi, FOGSI training centre" />
        <meta property="og:title" content="Shashwat IVF & Women's Hospital - Premier Fertility Care in Ahmedabad" />
        <meta property="og:description" content="NABH-accredited fertility center offering comprehensive IVF, egg freezing, and women's health services with 20+ years of expertise." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://shashwativf.com/" />
      </Helmet>

      <main>
        <HeroBento />
        <ImpactMetrics />
        <ServicesBento />
        <WhyShashwat />
        <LeadersSection />
        <GlobalImpact />
        <PatientJourney />
        <SuccessStoriesPreview />
        <BlogPreview />
        <FinalCTA />
      </main>
    </>
  );
};

export default HomePage;
