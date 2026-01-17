import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, Shield, TrendingUp, Palette, ShoppingCart, Smartphone, Bot, Search, Wrench } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import MatrixRain from '../components/MatrixRain';
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

  const categories = ['All', 'E-commerce', 'Portfolio', 'Corporate', 'Blog', 'Restaurant', 'Real Estate', 'Healthcare', 'Education'];

  const filteredWebsites = selectedCategory === 'All'
    ? demoWebsites
    : demoWebsites.filter(site => site.category === selectedCategory);

  useEffect(() => {
    // Scroll animations
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

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixRain />
      <Header />
      <ChatBot />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="container mx-auto text-center z-10">
          <div className="max-w-4xl mx-auto space-y-8 scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
            <div className="inline-block">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/50 px-4 py-2 text-sm font-mono">
                {'<'} Professional Web Development {'/>'}
              </Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-green-400 font-mono">CodeForge</span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Web Studio
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
              Crafting <span className="text-green-400 font-semibold">professional</span>,{' '}
              <span className="text-green-400 font-semibold">creative</span>, and{' '}
              <span className="text-green-400 font-semibold">efficient</span> web solutions powered by AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-6 text-lg shadow-lg shadow-green-500/50 transition-all duration-300 hover:scale-105"
                onClick={() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Our Work
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-500 text-green-400 hover:bg-green-500/10 px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
                >
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 left-10 w-20 h-20 border-2 border-green-500/30 rounded-lg animate-float"></div>
          <div className="absolute bottom-1/4 right-10 w-16 h-16 border-2 border-green-500/30 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/2 right-1/4 w-12 h-12 border-2 border-green-500/30 rotate-45 animate-float-slow"></div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-24 px-4 z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-green-400">Services</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive web solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <Card
                  key={service.id}
                  className="bg-gray-900/50 border-green-500/30 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 scroll-animate opacity-0 translate-y-10 group cursor-pointer"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-green-400" />
                    </div>
                    <CardTitle className="text-green-400 text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400">
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
      <section ref={catalogRef} className="relative py-24 px-4 z-10 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Website <span className="text-green-400">Catalogue</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Explore our portfolio of professional websites across different industries
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={`font-mono ${
                    selectedCategory === category
                      ? 'bg-green-500 text-black hover:bg-green-600'
                      : 'border-green-500/50 text-green-400 hover:bg-green-500/10'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWebsites.map((website, index) => (
              <Card
                key={website.id}
                className="bg-gray-900/50 border-green-500/30 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 overflow-hidden group scroll-animate opacity-0 translate-y-10"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={website.image}
                    alt={website.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <Badge className="absolute top-4 right-4 bg-green-500 text-black font-mono">
                    {website.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-green-400 text-xl">{website.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {website.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {website.features.slice(0, 3).map((feature, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="border-green-500/30 text-green-400 text-xs"
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
      <section className="relative py-24 px-4 z-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-2xl p-12 scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build Your <span className="text-green-400">Dream Website?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Let's bring your vision to life with cutting-edge technology and creative design
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-6 text-lg shadow-lg shadow-green-500/50 transition-all duration-300 hover:scale-105"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-500 text-green-400 hover:bg-green-500/10 px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
                >
                  Learn More About Us
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