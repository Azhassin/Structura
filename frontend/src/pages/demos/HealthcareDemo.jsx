import React, { useState } from 'react';
import { Stethoscope, Calendar, Clock, Phone, MapPin, Star, Users, Shield, Heart, ChevronRight, X, Check } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';

const HealthcareDemo = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [appointmentModal, setAppointmentModal] = useState(null);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', date: '', time: '', reason: ''
  });

  const departments = [
    { name: 'Cardiology', icon: Heart, desc: 'Heart health specialists', services: ['ECG', 'Echocardiogram', 'Stress Tests'] },
    { name: 'Pediatrics', icon: Users, desc: 'Children healthcare', services: ['Vaccinations', 'Growth Monitoring', 'Developmental Care'] },
    { name: 'Emergency', icon: Shield, desc: '24/7 emergency care', services: ['Trauma Care', 'Critical Care', 'Ambulance Service'] },
    { name: 'General Medicine', icon: Stethoscope, desc: 'Primary healthcare', services: ['Health Checkups', 'Preventive Care', 'Chronic Disease Management'] },
  ];

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop', rating: 4.9, experience: '15 years', available: ['Mon', 'Wed', 'Fri'] },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Pediatrician', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop', rating: 4.8, experience: '12 years', available: ['Tue', 'Thu', 'Sat'] },
    { id: 3, name: 'Dr. Emily Williams', specialty: 'General Physician', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop', rating: 4.9, experience: '10 years', available: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
  ];

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAppointment = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.date) {
      showNotification(`Appointment booked with ${appointmentModal.name}!`);
      setAppointmentModal(null);
      setFormData({ name: '', email: '', phone: '', date: '', time: '', reason: '' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'patients', label: 'Patients' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-4 z-[100] bg-teal-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fadeIn">
          <Check className="w-5 h-5" />
          {notification}
        </div>
      )}

      {/* Appointment Modal */}
      {appointmentModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setAppointmentModal(null)}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Book Appointment</h3>
              <button onClick={() => setAppointmentModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center gap-4 mb-6 p-4 bg-teal-50 rounded-xl">
              <img src={appointmentModal.image} alt={appointmentModal.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h4 className="font-bold text-slate-900">{appointmentModal.name}</h4>
                <p className="text-teal-600">{appointmentModal.specialty}</p>
              </div>
            </div>
            <form onSubmit={handleAppointment} className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:border-teal-500 outline-none" 
                required
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:border-teal-500 outline-none" 
                required
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:border-teal-500 outline-none" 
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="px-4 py-3 border rounded-lg focus:border-teal-500 outline-none" 
                  required
                />
                <select 
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                  className="px-4 py-3 border rounded-lg focus:border-teal-500 outline-none"
                >
                  <option value="">Select Time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>
              <textarea 
                placeholder="Reason for visit (optional)" 
                value={formData.reason}
                onChange={e => setFormData({...formData, reason: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:border-teal-500 outline-none resize-none h-24"
              />
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 py-6">
                <Calendar className="w-5 h-5 mr-2" /> Confirm Appointment
              </Button>
            </form>
          </div>
        </div>
      )}

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
              {navItems.map(item => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`transition-colors ${activeTab === item.id ? 'text-teal-600 font-medium' : 'text-slate-600 hover:text-teal-600'}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => setActiveTab('doctors')}>
              <Calendar className="w-4 h-4 mr-2" /> Book Appointment
            </Button>
          </div>
        </div>
      </header>

      {/* HOME TAB */}
      {activeTab === 'home' && (
        <>
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
                    Providing exceptional healthcare services with compassion, expertise, and cutting-edge technology.
                  </p>
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-teal-600 hover:bg-teal-700" onClick={() => setActiveTab('doctors')}>
                      Book Appointment <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                    <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50" onClick={() => setActiveTab('services')}>
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

          {/* Departments Preview */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <Badge className="bg-teal-100 text-teal-600 mb-4">Our Departments</Badge>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Specialized Care Units</h2>
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                {departments.map((dept, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300 group cursor-pointer" onClick={() => setActiveTab('services')}>
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
        </>
      )}

      {/* SERVICES TAB */}
      {activeTab === 'services' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-teal-100 text-teal-600 mb-4">Our Services</Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Comprehensive Healthcare</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">We offer a wide range of medical services to meet all your healthcare needs</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {departments.map((dept, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center">
                      <dept.icon className="w-8 h-8 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{dept.name}</h3>
                      <p className="text-slate-500">{dept.desc}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="font-medium text-slate-700">Services Offered:</p>
                    {dept.services.map((service, j) => (
                      <div key={j} className="flex items-center gap-2 text-slate-600">
                        <Check className="w-5 h-5 text-teal-600" />
                        {service}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6 bg-teal-600 hover:bg-teal-700" onClick={() => setActiveTab('doctors')}>
                    Book Consultation
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DOCTORS TAB */}
      {activeTab === 'doctors' && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-teal-100 text-teal-600 mb-4">Our Team</Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet Our Doctors</h2>
              <p className="text-slate-600">Expert healthcare professionals dedicated to your wellbeing</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {doctors.map((doc) => (
                <div key={doc.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="h-72 overflow-hidden">
                    <img src={doc.image} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{doc.name}</h3>
                    <p className="text-teal-600 mb-3">{doc.specialty}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        {doc.rating}
                      </span>
                      <span>{doc.experience}</span>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-slate-500 mb-2">Available:</p>
                      <div className="flex gap-2">
                        {doc.available.map((day, j) => (
                          <span key={j} className="px-2 py-1 bg-teal-50 text-teal-600 text-xs rounded">{day}</span>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={() => setAppointmentModal(doc)}>
                      Book Appointment
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PATIENTS TAB */}
      {activeTab === 'patients' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-teal-100 text-teal-600 mb-4">Patient Resources</Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">For Our Patients</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { title: 'Patient Portal', desc: 'Access your medical records, test results, and appointment history online.', action: 'Login to Portal' },
                { title: 'Insurance Info', desc: 'We accept most major insurance plans. Contact us to verify your coverage.', action: 'Check Coverage' },
                { title: 'Billing & Payment', desc: 'Multiple payment options available. Flexible payment plans for your convenience.', action: 'Pay Online' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{item.desc}</p>
                  <Button variant="outline" className="w-full border-teal-600 text-teal-600 hover:bg-teal-50" onClick={() => showNotification(`${item.title} feature coming soon!`)}>
                    {item.action}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT TAB */}
      {activeTab === 'contact' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-teal-100 text-teal-600 mb-4">Contact Us</Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Get In Touch</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              {[
                { icon: MapPin, title: 'Location', info: '123 Medical Center Dr, Healthcare City, HC 12345' },
                { icon: Phone, title: 'Phone', info: '+1 (800) 123-CARE' },
                { icon: Clock, title: 'Hours', info: 'Mon-Fri: 8AM-8PM, Sat: 9AM-5PM' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.info}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Appointment CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Schedule Your Visit?</h2>
            <p className="text-teal-100 mb-8 max-w-xl mx-auto">Book an appointment online or call us to speak with our friendly staff.</p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-slate-100" onClick={() => setActiveTab('doctors')}>
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
