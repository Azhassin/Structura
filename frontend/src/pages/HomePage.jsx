import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Palette, ShoppingCart, Smartphone, Bot, Search, Wrench } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import AnimatedBackground from '../components/AnimatedBackground';
import ScrollProgress from '../components/ScrollProgress';
import ParallaxSection from '../components/ParallaxSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import { demoWebsites, services } from '../mock';

const iconMap = {
  Palette,
  ShoppingCart,
  Smartphone,
  Bot,
  Search,
  Wrench
};

const HomePage = () => {
  const catalogRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const categories = ['All', 'E-commerce', 'Portfolio', 'Corporate', 'Blog', 'Restaurant', 'Real Estate', 'Healthcare', 'Education'];

  // Filter websites based on selected category
  const filteredWebsites = selectedCategory === 'All'
    ? demoWebsites
    : demoWebsites.filter(site => site.category === selectedCategory);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Get icon animation class based on icon name
  const getIconAnimationClass = (iconName) => {
    switch(iconName) {
      case 'Palette': return ''; // No animation
      case 'ShoppingCart': return 'group-hover:animate-cart-run';
      case 'Smartphone': return 'group-hover:animate-phone-vibrate';
      case 'Bot': return 'group-hover:animate-bot-wink';
      case 'Search': return 'group-hover:animate-search-sparkle';
      case 'Wrench': return 'group-hover:animate-wrench-shake';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <ScrollProgress />
      <Header />
      <ChatBot />

      {/* Cursor follower effect */}
      <div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)',
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
        }}
      />

      {/* Hero Section with parallax */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        {/* Floating geometric shapes */}
        <div
          className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-300/30 rounded-2xl rotate-12"
          style={{
            transform: `translateY(${scrollY * 0.3}px) rotate(${12 + scrollY * 0.05}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
        <div
          className="absolute bottom-40 right-20 w-24 h-24 border-2 border-teal-300/30 rounded-full"
          style={{
            transform: `translateY(${-scrollY * 0.4}px) scale(${1 + scrollY * 0.0005})`,
            transition: 'transform 0.1s ease-out',
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-lg rotate-45"
          style={{
            transform: `translateY(${scrollY * 0.2}px) rotate(${45 + scrollY * 0.08}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
        />

        <div className="container mx-auto text-center z-10">
          <ParallaxSection speed={0.2}>
            <div className="max-w-5xl mx-auto space-y-8 scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 bg-clip-text text-transparent animate-gradient">
                  Transform Your
                </span>
                <span className="block mt-2 bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 bg-clip-text text-transparent">
                  Digital Presence
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We craft <span className="font-semibold text-teal-600">stunning websites</span> that drive growth, 
                engage customers, and elevate your brand to new heights.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold px-8 py-6 text-lg shadow-2xl shadow-teal-500/30 transition-all duration-300 hover:scale-105 rounded-full"
                  onClick={() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="view-our-work-btn"
                >
                  View Our Work
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-teal-500 text-teal-600 hover:bg-teal-50 px-8 py-6 text-lg transition-all duration-300 hover:scale-105 rounded-full font-semibold"
                    data-testid="start-project-btn"
                  >
                    Start Your Project
                  </Button>
                </Link>
              </div>
            </div>
          </ParallaxSection>
        </div>
      </section>

      {/* Services Section with animated icons */}
      <section id="services" className="relative py-24 px-4 z-10 bg-white/50 backdrop-blur-sm">
        {/* Floating accent circles */}
        <div
          className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-teal-200/30 rounded-full blur-3xl"
          style={{
            transform: `translateY(${scrollY * 0.15}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        />
        <div
          className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-cyan-200/30 to-teal-200/30 rounded-full blur-3xl"
          style={{
            transform: `translateY(${-scrollY * 0.12}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        />

        <div className="container mx-auto relative">
          <ParallaxSection speed={0.15}>
            <div className="text-center mb-16 scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
              <Badge className="mb-4 bg-teal-100 text-teal-700 px-4 py-2">Our Services</Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-teal-800 bg-clip-text text-transparent">
                Everything You Need to Succeed Online
              </h2>
              <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                Comprehensive solutions tailored to your business goals
              </p>
            </div>
          </ParallaxSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Sparkles;
              const delay = index * 150;
              const iconAnimClass = getIconAnimationClass(service.icon);
              
              return (
                <Card
                  key={service.id}
                  className="bg-white/90 backdrop-blur-md border-2 border-teal-100 hover:border-teal-400 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(20,184,166,0.4)] scroll-animate opacity-0 translate-y-10 group cursor-pointer relative overflow-hidden"
                  style={{ 
                    transitionDelay: `${delay}ms`,
                  }}
                  data-testid={`service-card-${service.id}`}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  <CardHeader className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-teal-500/30 overflow-hidden">
                      <Icon className={`w-8 h-8 text-white ${iconAnimClass}`} />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors duration-300">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-base">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Catalogue Section with parallax */}
      <section ref={catalogRef} className="relative py-24 px-4 z-10">
        {/* Animated background waves */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(20, 184, 166, 0.1) 50%, transparent 70%)',
            transform: `translateX(${scrollY * 0.2}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        />
        
        <div className="container mx-auto relative">
          <ParallaxSection speed={0.1}>
            <div className="text-center mb-12 scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
              <Badge className="mb-4 bg-teal-100 text-teal-700 px-4 py-2">Our Portfolio</Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-teal-800 bg-clip-text text-transparent">
                Websites That Make an Impact
              </h2>
              <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-8">
                Explore our portfolio of high-performing websites
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className={`rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg shadow-teal-500/30 hover:scale-105'
                        : 'border-teal-200 text-teal-600 hover:bg-teal-50'
                    }`}
                    data-testid={`category-${category.toLowerCase().replace(' ', '-')}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </ParallaxSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWebsites.length > 0 ? (
              filteredWebsites.map((website, index) => (
                <Card
                  key={`${website.id}-${selectedCategory}`}
                  className="bg-white/90 backdrop-blur-md border-2 border-teal-100 hover:border-teal-400 transition-all duration-700 hover:shadow-[0_25px_70px_-20px_rgba(20,184,166,0.5)] overflow-hidden group cursor-pointer relative animate-fade-in-up"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both',
                  }}
                  data-testid={`portfolio-card-${website.id}`}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={website.image}
                      alt={website.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-900/40 to-transparent group-hover:from-teal-900/90 transition-all duration-500"></div>
                    
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold shadow-2xl backdrop-blur-sm border-0 transform group-hover:scale-110 transition-transform duration-300">
                      {website.category}
                    </Badge>
                    
                    {/* Sparkle effect on hover */}
                    <Sparkles className="absolute top-4 left-4 w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-180" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-900">{website.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {website.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {website.features.slice(0, 3).map((feature, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="border-teal-200 text-teal-600 text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No websites found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 z-10 bg-gradient-to-br from-blue-600 via-teal-500 to-cyan-500 text-white overflow-hidden">
        {/* Animated background elements */}
        <div
          className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.15}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          style={{
            transform: `translate(-${scrollY * 0.12}px, -${scrollY * 0.1}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        />
        
        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto text-center scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-cyan-200 animate-pulse-glow" />
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Ready to Elevate Your Business?
            </h2>
            <p className="text-xl text-cyan-100 mb-10 max-w-2xl mx-auto">
              Let's create something extraordinary together. Get started with a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-white text-teal-600 hover:bg-cyan-50 px-10 py-6 text-lg shadow-2xl transition-all duration-300 hover:scale-105 rounded-full font-bold"
                  data-testid="get-started-cta-btn"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-10 py-6 text-lg transition-all duration-300 hover:scale-105 rounded-full font-semibold backdrop-blur-sm"
                  data-testid="learn-more-btn"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
