import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Palette, ShoppingCart, Smartphone, Bot, Search, Wrench, Zap, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import ProfessionalBackground from '../components/ProfessionalBackground';
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
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const categories = ['All', 'E-commerce', 'Portfolio', 'Corporate', 'Blog', 'Restaurant', 'Real Estate', 'Healthcare', 'Education'];

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

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ProfessionalBackground />
      <ScrollProgress />
      <Header />
      <ChatBot />

      {/* Cursor follower effect */}
      <div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
        }}
      />

      {/* Hero Section with parallax */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        {/* Floating geometric shapes */}
        <div
          className="absolute top-20 left-10 w-32 h-32 border-2 border-purple-300/30 rounded-2xl rotate-12"
          style={{
            transform: `translateY(${scrollY * 0.3}px) rotate(${12 + scrollY * 0.05}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
        <div
          className="absolute bottom-40 right-20 w-24 h-24 border-2 border-blue-300/30 rounded-full"
          style={{
            transform: `translateY(${-scrollY * 0.4}px) scale(${1 + scrollY * 0.0005})`,
            transition: 'transform 0.1s ease-out',
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-lg rotate-45"
          style={{
            transform: `translateY(${scrollY * 0.2}px) rotate(${45 + scrollY * 0.08}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
        />

        <div className="container mx-auto text-center z-10">
          <ParallaxSection speed={0.2}>
            <div className="max-w-5xl mx-auto space-y-8 scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Trusted by 500+ Businesses Worldwide</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Transform Your
              </span>
              <span className="block mt-2 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent">
                Digital Presence
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We craft <span className="font-semibold text-purple-600">stunning websites</span> that drive growth, 
              engage customers, and elevate your brand to new heights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-6 text-lg shadow-2xl shadow-purple-500/30 transition-all duration-300 hover:scale-105 rounded-full"
                onClick={() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Our Work
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg transition-all duration-300 hover:scale-105 rounded-full font-semibold"
                >
                  Start Your Project
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">500+</div>
                <div className="text-sm text-gray-600 mt-1">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">98%</div>
                <div className="text-sm text-gray-600 mt-1">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">50+</div>
                <div className="text-sm text-gray-600 mt-1">Expert Team</div>
              </div>
            </div>
          </ParallaxSection>
        </div>
      </section>

      {/* Services Section with stagger animations */}
      <section id="services" className="relative py-24 px-4 z-10 bg-white/50 backdrop-blur-sm">
        {/* Floating accent circles */}
        <div
          className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl"
          style={{
            transform: `translateY(${scrollY * 0.15}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        />
        <div
          className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl"
          style={{
            transform: `translateY(${-scrollY * 0.12}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        />

        <div className="container mx-auto relative">
          <ParallaxSection speed={0.15}>
            <div className="text-center mb-16 scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
            <Badge className="mb-4 bg-purple-100 text-purple-700 px-4 py-2">Our Services</Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent">
              Everything You Need to Succeed Online
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Comprehensive solutions tailored to your business goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Sparkles;
              return (
                <Card
                  key={service.id}
                  className="bg-white/80 backdrop-blur-sm border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 scroll-animate opacity-0 translate-y-10 group cursor-pointer hover:-translate-y-2"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900">{service.title}</CardTitle>
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

      {/* Demo Catalogue Section */}
      <section ref={catalogRef} className="relative py-24 px-4 z-10">
        <div className="container mx-auto">
          <div className="text-center mb-12 scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
            <Badge className="mb-4 bg-purple-100 text-purple-700 px-4 py-2">Our Portfolio</Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent">
              Websites That Make an Impact
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-8">
              Explore our portfolio of high-performing websites
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={`rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30 hover:scale-105'
                      : 'border-purple-200 text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </ParallaxSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWebsites.map((website, index) => (
              <Card
                key={website.id}
                className="bg-white/80 backdrop-blur-sm border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden group scroll-animate opacity-0 translate-y-10 cursor-pointer hover:-translate-y-2"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={website.image}
                    alt={website.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <Badge className="absolute top-4 right-4 bg-white/90 text-purple-700 font-medium shadow-lg backdrop-blur-sm">
                    {website.category}
                  </Badge>
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
                        className="border-purple-200 text-purple-600 text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 z-10 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 text-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-purple-200" />
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Ready to Elevate Your Business?
            </h2>
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
              Let's create something extraordinary together. Get started with a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-purple-50 px-10 py-6 text-lg shadow-2xl transition-all duration-300 hover:scale-105 rounded-full font-bold"
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
