import React, { useEffect, useState } from 'react';
import { Code2, Rocket, Users, Award, Target, Heart, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import AnimatedBackground from '../components/AnimatedBackground';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';

const AboutPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

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
      observer.disconnect();
    };
  }, []);

  const values = [
    {
      icon: Target,
      title: 'Mission Driven',
      description: 'We are committed to delivering exceptional web solutions that drive real business results.',
      animClass: 'group-hover:animate-target-hit'
    },
    {
      icon: Heart,
      title: 'Client Focused',
      description: 'Your success is our success. We work closely with you to understand and achieve your goals.',
      animClass: 'group-hover:animate-heart-fill'
    },
    {
      icon: Rocket,
      title: 'Innovation First',
      description: 'We leverage the latest technologies, including AI, to create cutting-edge digital experiences.',
      animClass: 'group-hover:animate-rocket-launch'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Every project undergoes rigorous testing to ensure the highest standards of excellence.',
      animClass: 'group-hover:animate-medal-shine'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" data-testid="about-page">
      <AnimatedBackground />
      <Header />
      <ChatBot />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-4 pt-32 pb-20">
        {/* Floating shapes */}
        <div
          className="absolute top-20 right-10 w-32 h-32 border-2 border-blue-300/30 rounded-2xl rotate-12"
          style={{
            transform: `translateY(${scrollY * 0.2}px) rotate(${12 + scrollY * 0.03}deg)`,
          }}
        />
        <div
          className="absolute bottom-20 left-10 w-24 h-24 border-2 border-teal-300/30 rounded-full"
          style={{
            transform: `translateY(${-scrollY * 0.15}px)`,
          }}
        />

        <div className="container mx-auto text-center z-10">
          <div className="max-w-4xl mx-auto space-y-6 scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
            <Badge className="mb-4 bg-teal-100 text-teal-700 px-4 py-2">
              <Sparkles className="w-4 h-4 inline mr-2" />
              About Us
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                PixelForge
              </span>
              <span className="block mt-2 text-slate-800">Studio</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              Building the future of web, one pixel at a time
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative py-20 px-4 z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white/80 backdrop-blur-md border-2 border-teal-100 rounded-3xl p-8 md:p-12 scroll-animate opacity-0 translate-y-10 transition-all duration-1000 hover:shadow-[0_20px_60px_-15px_rgba(20,184,166,0.3)] hover:border-teal-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Our Story</h2>
            </div>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                PixelForge Studio was founded with a simple yet powerful vision: to democratize professional web development and make it accessible to businesses of all sizes. What started as a small team of passionate developers has grown into a full-service digital agency.
              </p>
              <p>
                We combine technical expertise with creative innovation to deliver websites that not only look stunning but also drive real business results. Our team specializes in custom web development, e-commerce solutions, and AI-powered features that set your business apart from the competition.
              </p>
              <p>
                Today, we're proud to serve clients across multiple industries, from startups to established enterprises, helping them build their digital presence and achieve their online goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section with Animated Icons */}
      <section className="relative py-20 px-4 z-10 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
            <Badge className="mb-4 bg-teal-100 text-teal-700 px-4 py-2">Our Values</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-teal-800 bg-clip-text text-transparent">
              The Principles That Guide Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything we do is driven by our core values
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="bg-white/90 backdrop-blur-md border-2 border-teal-100 hover:border-teal-400 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(20,184,166,0.4)] scroll-animate opacity-0 translate-y-10 group cursor-pointer"
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 15;
                    const rotateY = (centerX - x) / 15;
                    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
                  }}
                  data-testid={`value-card-${index}`}
                >
                  <CardHeader>
                    <div className={`w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 shadow-lg shadow-teal-500/30 overflow-hidden ${value.animClass}`}>
                      <Icon className="w-7 h-7 text-white icon-inner" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors duration-300">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
