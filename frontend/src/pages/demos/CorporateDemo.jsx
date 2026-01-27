import React, { useState } from 'react';
import { Building2, Users, Target, Award, ChevronRight, Phone, Mail, MapPin, ArrowRight, Check, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';

const CorporateDemo = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [contactModal, setContactModal] = useState(false);
  const [notification, setNotification] = useState(null);

  const services = [
    { icon: Target, title: 'Strategic Consulting', desc: 'Data-driven strategies to accelerate your business growth', details: ['Market Analysis', 'Growth Strategy', 'Competitive Intelligence'] },
    { icon: Users, title: 'Team Development', desc: 'Building high-performance teams for sustainable success', details: ['Leadership Training', 'Team Building', 'Performance Coaching'] },
    { icon: Building2, title: 'Digital Transformation', desc: 'Modernizing operations with cutting-edge technology', details: ['Process Automation', 'Cloud Migration', 'Digital Strategy'] },
    { icon: Award, title: 'Quality Assurance', desc: 'Ensuring excellence in every deliverable', details: ['Quality Audits', 'Compliance Reviews', 'Best Practices'] },
  ];

  const stats = [
    { value: '$2.5B+', label: 'Revenue Generated' },
    { value: '500+', label: 'Enterprise Clients' },
    { value: '98%', label: 'Client Retention' },
    { value: '45+', label: 'Countries Served' },
  ];

  const caseStudies = [
    { title: 'FinTech Transformation', client: 'Global Bank Corp', result: '40% cost reduction', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop' },
    { title: 'Supply Chain Optimization', client: 'Retail Giants Inc', result: '60% efficiency gain', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=250&fit=crop' },
    { title: 'Digital Marketing Strategy', client: 'Tech Startup X', result: '300% ROI increase', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop' },
  ];

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000);
  };

  const handleContact = (e) => {
    e.preventDefault();
    showNotification('Message sent! We\'ll contact you soon.');
    setContactModal(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'insights', label: 'Insights' },
    { id: 'careers', label: 'Careers' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-4 z-[100] bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fadeIn">
          <Check className="w-5 h-5" />
          {notification}
        </div>
      )}

      {/* Contact Modal */}
      {contactModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setContactModal(false)}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Contact Us</h3>
              <button onClick={() => setContactModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleContact} className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 outline-none" required />
              <input type="email" placeholder="Work Email" className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 outline-none" required />
              <input type="text" placeholder="Company Name" className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 outline-none" />
              <select className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 outline-none">
                <option>Select Service</option>
                {services.map(s => <option key={s.title}>{s.title}</option>)}
              </select>
              <textarea placeholder="How can we help?" className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 outline-none resize-none h-24" />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-6">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white text-center py-2 text-sm">
        <Link to="/" className="hover:underline">← Back to Structura Studio</Link>
        <span className="mx-4">|</span>
        <span>This is a demo preview of a Corporate website</span>
      </div>

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">TechCorp</span>
            </div>
            <nav className="hidden md:flex gap-8">
              {navItems.map(item => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`transition-colors font-medium ${activeTab === item.id ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setContactModal(true)}>
              Contact Us
            </Button>
          </div>
        </div>
      </header>

      {/* HOME TAB */}
      {activeTab === 'home' && (
        <>
          {/* Hero */}
          <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-32 overflow-hidden">
            <div className="absolute inset-0 bg-slate-800/50 opacity-50" />
            <div className="container mx-auto px-4 relative">
              <div className="max-w-3xl">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-6">Global Business Solutions</Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Transforming Businesses for the Digital Age
                </h1>
                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  We partner with industry leaders to drive innovation, optimize operations, and deliver measurable results that matter.
                </p>
                <div className="flex gap-4">
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100" onClick={() => setActiveTab('services')}>
                    Explore Services <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={() => showNotification('Video coming soon!')}>
                    Watch Video
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
                    <p className="text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Services Preview */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <Badge className="bg-blue-100 text-blue-600 mb-4">Our Services</Badge>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Comprehensive Business Solutions</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => setActiveTab('services')}>
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                      <service.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-slate-600 mb-4">{service.desc}</p>
                    <span className="text-blue-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ABOUT TAB */}
      {activeTab === 'about' && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <Badge className="bg-blue-100 text-blue-600 mb-4">About Us</Badge>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">Leading the Future of Business Consulting</h2>
                <p className="text-slate-600 mb-4">
                  Founded in 2005, TechCorp has grown from a small consulting firm to a global leader in business transformation. We've helped over 500 enterprises across 45 countries achieve their strategic goals.
                </p>
                <p className="text-slate-600 mb-6">
                  Our team of 200+ experts brings decades of combined experience across industries, from finance and healthcare to technology and manufacturing.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-2xl font-bold text-blue-600">200+</p>
                    <p className="text-slate-600 text-sm">Expert Consultants</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-2xl font-bold text-blue-600">18+</p>
                    <p className="text-slate-600 text-sm">Years Experience</p>
                  </div>
                </div>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=500&fit=crop" alt="Our Team" className="rounded-2xl shadow-xl" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SERVICES TAB */}
      {activeTab === 'services' && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="bg-blue-100 text-blue-600 mb-4">Our Services</Badge>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">How We Can Help</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                      <p className="text-slate-500">{service.desc}</p>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    {service.details.map((detail, j) => (
                      <div key={j} className="flex items-center gap-2 text-slate-600">
                        <Check className="w-5 h-5 text-blue-600" />
                        {detail}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50" onClick={() => setContactModal(true)}>
                    Request Consultation
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INSIGHTS TAB */}
      {activeTab === 'insights' && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="bg-blue-100 text-blue-600 mb-4">Case Studies</Badge>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Success Stories</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {caseStudies.map((study, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer">
                  <div className="h-48 overflow-hidden">
                    <img src={study.image} alt={study.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <p className="text-blue-600 text-sm font-medium mb-2">{study.client}</p>
                    <h3 className="font-bold text-slate-900 text-lg mb-3">{study.title}</h3>
                    <Badge className="bg-green-100 text-green-600">{study.result}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CAREERS TAB */}
      {activeTab === 'careers' && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <Badge className="bg-blue-100 text-blue-600 mb-4">Careers</Badge>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Join Our Team</h2>
              <p className="text-slate-600">Be part of a team that's shaping the future of business</p>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Senior Consultant', dept: 'Strategy', location: 'New York' },
                { title: 'Digital Transformation Lead', dept: 'Technology', location: 'San Francisco' },
                { title: 'Business Analyst', dept: 'Analytics', location: 'Remote' },
                { title: 'Project Manager', dept: 'Operations', location: 'Chicago' },
              ].map((job, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">{job.title}</h3>
                    <p className="text-slate-500 text-sm">{job.dept} • {job.location}</p>
                  </div>
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" onClick={() => showNotification('Application submitted!')}>
                    Apply
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Schedule a consultation with our experts and discover how we can help you achieve your goals.</p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100" onClick={() => setContactModal(true)}>
            Schedule Consultation <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Phone, label: 'Call Us', value: '+1 (800) 123-4567' },
              { icon: Mail, label: 'Email Us', value: 'contact@techcorp.com' },
              { icon: MapPin, label: 'Visit Us', value: '123 Business Ave, NY' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <p className="text-slate-400 mb-1">{item.label}</p>
                <p className="text-lg font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 text-center text-slate-500">
        <p>Demo created by Structura Studio</p>
      </footer>
    </div>
  );
};

export default CorporateDemo;
