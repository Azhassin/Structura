import React from 'react';
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
  
  return (
    <>
      <DemoComponent />
      <ChatBot />
    </>
  );
};

export default DemoPage;
