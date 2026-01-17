import React, { useEffect } from 'react';
import { Code2, Rocket, Users, Award, Target, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import MatrixRain from '../components/MatrixRain';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

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

  const values = [
    {
      icon: Target,
      title: 'Mission Driven',
      description: 'We are committed to delivering exceptional web solutions that drive real business results.'
    },
    {
      icon: Heart,
      title: 'Client Focused',
      description: 'Your success is our success. We work closely with you to understand and achieve your goals.'
    },
    {
      icon: Rocket,
      title: 'Innovation First',
      description: 'We leverage the latest technologies, including AI, to create cutting-edge digital experiences.'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Every project undergoes rigorous testing to ensure the highest standards of excellence.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '200+', label: 'Happy Clients' },
    { number: '50+', label: 'Team Members' },
    { number: '10+', label: 'Years Experience' }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixRain />
      <Header />
      <ChatBot />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-4 pt-32 pb-20">
        <div className="container mx-auto text-center z-10">
          <div className="max-w-4xl mx-auto space-y-6 scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              About <span className="text-green-400">CodeForge</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              Building the future of web, one line of code at a time
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative py-20 px-4 z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gray-900/50 border border-green-500/30 rounded-2xl p-8 md:p-12 scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
            <div className="flex items-center gap-3 mb-6">
              <Code2 className="w-8 h-8 text-green-400" />
              <h2 className="text-3xl font-bold text-green-400">Our Story</h2>
            </div>
            <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
              <p>
                CodeForge Web Studio was founded with a simple yet powerful vision: to democratize professional web development and make it accessible to businesses of all sizes. What started as a small team of passionate developers has grown into a full-service digital agency.
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

      {/* Values Section */}
      <section className="relative py-20 px-4 z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-green-400">Values</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="bg-gray-900/50 border-green-500/30 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 scroll-animate opacity-0 translate-y-10 group"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-green-400" />
                    </div>
                    <CardTitle className="text-green-400 text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-4 z-10 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2 font-mono">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 px-4 z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our <span className="text-green-400">Team</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Talented professionals dedicated to your success
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-2xl p-12 text-center scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
            <Users className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-green-400 mb-4">Our Expert Team</h3>
            <p className="text-gray-400 text-lg">
              Our diverse team of developers, designers, and strategists brings together years of experience and cutting-edge expertise. We're passionate about creating digital solutions that make a real impact.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;