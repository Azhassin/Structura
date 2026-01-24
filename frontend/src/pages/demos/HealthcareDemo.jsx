import React from 'react';
import { Stethoscope, Calendar, Clock, Phone, MapPin, Star, Users, Shield, Heart, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';

const HealthcareDemo = () => {
  const departments = [
    { name: 'Cardiology', icon: Heart, desc: 'Heart health specialists' },
    { name: 'Pediatrics', icon: Users, desc: 'Children healthcare' },
    { name: 'Emergency', icon: Shield, desc: '24/7 emergency care' },
    { name: 'General Medicine', icon: Stethoscope, desc: 'Primary healthcare' },
  ];

  const doctors = [
    { name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop', rating: 4.9 },
    { name: 'Dr. Michael Chen', specialty: 'Pediatrician', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop', rating: 4.8 },
    { name: 'Dr. Emily Williams', specialty: 'General Physician', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop', rating: 4.9 },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-center py-2 text-sm">
        <Link to="/" className="hover:underline">← Back to Structura Studio</Link>
        <span className="mx-4">|</span>
        <span>This is a demo preview of a Healthcare website</span>
      </div>

      {/* Top Bar */}
      <div className="bg-teal-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between text-sm">
          <div className="flex gap-6">
            <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> +1 (800) 123-CARE</span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> 123 Medical Center Dr</span>
          </div>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Mon-Fri: 8AM-8PM</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900">MedCare</span>
                <span className="text-xs text-teal-600 block -mt-1">Clinic</span>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              {['Home', 'Services', 'Doctors', 'Patients', 'About', 'Contact'].map(item => (
                <a key={item} href="#" className="text-slate-600 hover:text-teal-600 transition-colors">{item}</a>
              ))}
            </nav>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Calendar className="w-4 h-4 mr-2" /> Book Appointment
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-teal-50 to-cyan-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-teal-100 text-teal-600 mb-4">Trusted Healthcare Partner</Badge>
              <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Your Health is Our <span className="text-teal-600">Top Priority</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                Providing exceptional healthcare services with compassion, expertise, and cutting-edge technology. Your wellness journey starts here.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                  Book Appointment <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                  Our Services
                </Button>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=500&fit=crop" alt="Healthcare" className="rounded-2xl shadow-2xl" />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">24/7 Emergency</p>
                    <p className="text-sm text-slate-500">Always here for you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-teal-100 text-teal-600 mb-4">Our Departments</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Specialized Care Units</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Comprehensive healthcare services across multiple specialties</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {departments.map((dept, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-600 transition-colors">
                  <dept.icon className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{dept.name}</h3>
                <p className="text-slate-600 text-sm">{dept.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '25+', label: 'Years Experience' },
              { value: '50K+', label: 'Patients Served' },
              { value: '100+', label: 'Expert Doctors' },
              { value: '98%', label: 'Patient Satisfaction' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-4xl font-bold mb-1">{stat.value}</p>
                <p className="text-teal-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-teal-100 text-teal-600 mb-4">Our Team</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet Our Doctors</h2>
            <p className="text-slate-600">Expert healthcare professionals dedicated to your wellbeing</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {doctors.map((doc, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="h-72 overflow-hidden">
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{doc.name}</h3>
                  <p className="text-teal-600 mb-3">{doc.specialty}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{doc.rating}</span>
                  </div>
                  <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700">Book Appointment</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Schedule Your Visit?</h2>
            <p className="text-teal-100 mb-8 max-w-xl mx-auto">Book an appointment online or call us to speak with our friendly staff.</p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-slate-100">
                <Calendar className="w-4 h-4 mr-2" /> Book Online
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="w-4 h-4 mr-2" /> Call Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-center text-slate-500">
        <p>Demo created by Structura Studio</p>
      </footer>
    </div>
  );
};

export default HealthcareDemo;
