import React from 'react';
import { Building2, Users, Target, Award, ChevronRight, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';

const CorporateDemo = () => {
  const services = [
    { icon: Target, title: 'Strategic Consulting', desc: 'Data-driven strategies to accelerate your business growth' },
    { icon: Users, title: 'Team Development', desc: 'Building high-performance teams for sustainable success' },
    { icon: Building2, title: 'Digital Transformation', desc: 'Modernizing operations with cutting-edge technology' },
    { icon: Award, title: 'Quality Assurance', desc: 'Ensuring excellence in every deliverable' },
  ];

  const stats = [
    { value: '$2.5B+', label: 'Revenue Generated' },
    { value: '500+', label: 'Enterprise Clients' },
    { value: '98%', label: 'Client Retention' },
    { value: '45+', label: 'Countries Served' },
  ];

  return (
    <div className="min-h-screen bg-white">
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
              {['About', 'Services', 'Industries', 'Insights', 'Careers'].map(item => (
                <a key={item} href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">{item}</a>
              ))}
            </nav>
            <Button className="bg-blue-600 hover:bg-blue-700">Contact Us</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
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
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                Explore Services <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
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

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-600 mb-4">Our Services</Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Comprehensive Business Solutions</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We offer end-to-end services designed to help your organization thrive in today&apos;s competitive landscape.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <service.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-4">{service.desc}</p>
                <a href="#" className="text-blue-600 font-medium flex items-center gap-2 hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Schedule a consultation with our experts and discover how we can help you achieve your goals.</p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
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
