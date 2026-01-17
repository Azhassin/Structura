import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import MatrixRain from '../components/MatrixRain';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.data.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setErrorMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@codeforge.com',
      link: 'mailto:contact@codeforge.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: '123 Web Street, Digital City',
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixRain />
      <Header />
      <ChatBot />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-4 pt-32 pb-12">
        <div className="container mx-auto text-center z-10">
          <div className="max-w-4xl mx-auto space-y-6 scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Get In <span className="text-green-400">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              Let's discuss your project and bring your vision to life
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-12 px-4 z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card
                    key={index}
                    className="bg-gray-900/50 border-green-500/30 hover:border-green-500 transition-all duration-300 scroll-animate opacity-0 translate-y-10 group"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                          <Icon className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                          <CardTitle className="text-green-400 text-lg">{info.title}</CardTitle>
                          <CardDescription className="text-gray-400 text-sm mt-1">
                            <a href={info.link} className="hover:text-green-400 transition-colors">
                              {info.value}
                            </a>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}

              {/* Additional Info */}
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30 scroll-animate opacity-0 translate-y-10" style={{ transitionDelay: '300ms' }}>
                <CardContent className="pt-6">
                  <h3 className="text-green-400 font-semibold mb-2">Business Hours</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Monday - Friday: 9:00 AM - 6:00 PM
                  </p>
                  <p className="text-gray-400 text-sm">
                    Saturday - Sunday: Closed
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-900/50 border-green-500/30 scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
                <CardHeader>
                  <CardTitle className="text-green-400 text-2xl">Send Us a Message</CardTitle>
                  <CardDescription className="text-gray-400">
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                      <CheckCircle className="w-16 h-16 text-green-400" />
                      <h3 className="text-2xl font-semibold text-green-400">Message Sent!</h3>
                      <p className="text-gray-400 text-center">
                        Thank you for contacting us. We'll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-gray-300">
                            Your Name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="bg-gray-800 border-green-500/30 text-white placeholder:text-gray-500 focus:border-green-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-300">
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
                            className="bg-gray-800 border-green-500/30 text-white placeholder:text-gray-500 focus:border-green-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-gray-300">
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Website Development Inquiry"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="bg-gray-800 border-green-500/30 text-white placeholder:text-gray-500 focus:border-green-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-gray-300">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us about your project..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="bg-gray-800 border-green-500/30 text-white placeholder:text-gray-500 focus:border-green-500 resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold shadow-lg shadow-green-500/50 transition-all duration-300 hover:scale-105"
                      >
                        Send Message
                        <Send className="ml-2 w-4 h-4" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="relative py-12 px-4 z-10">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-gray-900/50 border-green-500/30 overflow-hidden scroll-animate opacity-0 translate-y-10 transition-all duration-1000">
            <div className="h-96 bg-gray-800 flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="w-12 h-12 text-green-400 mx-auto" />
                <p className="text-gray-400">Map Integration Placeholder</p>
                <p className="text-gray-500 text-sm">Location: 123 Web Street, Digital City</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;