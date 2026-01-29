import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, Send, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import AnimatedBackground from '../components/AnimatedBackground';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactPage = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [scrollY, setScrollY] = useState(0);

  // Handle hash navigation to scroll to contact form
  useEffect(() => {
    if (location.hash === '#contact-form-section') {
      setTimeout(() => {
        const formElement = document.getElementById('contact-form-section');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    } else {
      window.scrollTo(0, 0);
    }

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
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await axios.post(`${API}/contact/send-email`, formData);
      
      if (response.data.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setErrorMessage(error.response?.data?.detail || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'naseemazhan@outlook.com',
      link: 'mailto:naseemazhan@outlook.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+44 7342328508',
      link: 'tel:+447342328508'
    }
  ];

  return (
    <>
      <div className="min-h-screen relative" data-testid="contact-page">
        <AnimatedBackground />
        <Header />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center px-4 pt-32 pb-12">
        {/* Floating shapes */}
        <div
          className="absolute top-20 left-10 w-28 h-28 border-2 border-blue-300/30 rounded-full"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
        <div
          className="absolute bottom-20 right-10 w-20 h-20 border-2 border-teal-300/30 rounded-2xl rotate-45"
          style={{
            transform: `translateY(${-scrollY * 0.15}px) rotate(${45 + scrollY * 0.03}deg)`,
          }}
        />

        <div className="container mx-auto text-center z-10">
          <div className="max-w-4xl mx-auto space-y-6 scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
            <Badge className="mb-4 bg-teal-100 text-teal-700 px-4 py-2">
              <Sparkles className="w-4 h-4 inline mr-2" />
              Contact Us
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              Let&apos;s discuss your project and bring your vision to life
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-12 px-4 z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card
                    key={index}
                    className="bg-white/90 backdrop-blur-md border-2 border-teal-100 hover:border-teal-400 transition-all duration-500 hover:shadow-[0_15px_40px_-10px_rgba(20,184,166,0.4)] scroll-animate opacity-0 translate-y-10 group cursor-pointer"
                    style={{ transitionDelay: `${index * 100}ms` }}
                    data-testid={`contact-info-${info.title.toLowerCase()}`}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-teal-500/30">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-teal-600 text-lg">{info.title}</CardTitle>
                          <CardDescription className="text-gray-600 text-sm mt-1">
                            <a href={info.link} className="hover:text-teal-500 transition-colors">
                              {info.value}
                            </a>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card 
                id="contact-form-section"
                className="bg-white/90 backdrop-blur-md border-2 border-teal-100 scroll-animate opacity-0 translate-y-10 transition-all duration-1000 hover:shadow-[0_20px_60px_-15px_rgba(20,184,166,0.3)]"
                data-testid="contact-form-card"
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Send Us a Message</CardTitle>
                  <CardDescription className="text-gray-600">
                    Fill out the form below and we&apos;ll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center animate-bounce">
                        <CheckCircle className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Message Sent!</h3>
                      <p className="text-gray-600 text-center">
                        Thank you for contacting us. We&apos;ll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                      {errorMessage && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                          {errorMessage}
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-gray-700 font-medium">
                            Your Name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className="bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400 rounded-xl transition-all duration-300"
                            data-testid="name-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-700 font-medium">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className="bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400 rounded-xl transition-all duration-300"
                            data-testid="email-input"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-gray-700 font-medium">
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Website Development Inquiry"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400 rounded-xl transition-all duration-300"
                          data-testid="subject-input"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-gray-700 font-medium">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us about your project..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          rows={6}
                          className="bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400 rounded-xl resize-none transition-all duration-300"
                          data-testid="message-input"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold shadow-lg shadow-teal-500/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl py-6"
                        data-testid="submit-button"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            Send Message
                            <Send className="w-5 h-5" />
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      </div>
      {/* ChatBot outside main container for proper fixed positioning */}
      <ChatBot />
    </>
  );
};

export default ContactPage;
