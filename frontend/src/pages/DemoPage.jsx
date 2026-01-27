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
  
  // Scroll to top with smooth animation on page load
  useEffect(() => {
    // Immediately scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Show loading animation briefly
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
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
  
  // Loading animation overlay
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-slate-600 animate-pulse">Loading demo...</p>
        </div>
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
