import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import EcommerceDemo from './demos/EcommerceDemo';
import PortfolioDemo from './demos/PortfolioDemo';
import CorporateDemo from './demos/CorporateDemo';
import BlogDemo from './demos/BlogDemo';
import RestaurantDemo from './demos/RestaurantDemo';
import RealEstateDemo from './demos/RealEstateDemo';
import HealthcareDemo from './demos/HealthcareDemo';
import EducationDemo from './demos/EducationDemo';
import ChatBot from '../components/ChatBot';

const DemoPage = () => {
  const { category } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  
  // Scroll to top on page load - instant for better mobile performance
  useEffect(() => {
    // Use instant scroll for mobile, smooth for desktop
    const isMobile = window.innerWidth <= 768;
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Shorter loading time on mobile
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, isMobile ? 100 : 300);
    
    return () => clearTimeout(timer);
  }, [category]);
  
  const demoComponents = {
    'e-commerce': EcommerceDemo,
    'ecommerce': EcommerceDemo,
    'portfolio': PortfolioDemo,
    'corporate': CorporateDemo,
    'blog': BlogDemo,
    'restaurant': RestaurantDemo,
    'real-estate': RealEstateDemo,
    'realestate': RealEstateDemo,
    'healthcare': HealthcareDemo,
    'education': EducationDemo,
  };
  
  const normalizedCategory = category?.toLowerCase().replace(/\s+/g, '-');
  const DemoComponent = demoComponents[normalizedCategory];
  
  if (!DemoComponent) {
    return <Navigate to="/" replace />;
  }
  
  // Simpler loading state for mobile
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="animate-fadeIn">
      <DemoComponent />
      <ChatBot />
    </div>
  );
};

export default DemoPage;
