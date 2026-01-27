import React, { useState } from 'react';
import { Home, Search, MapPin, Bed, Bath, Square, Heart, Phone, Mail, ChevronRight, X, Check, Filter } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';

const RealEstateDemo = () => {
  const [activeTab, setActiveTab] = useState('buy');
  const [savedProperties, setSavedProperties] = useState([]);
  const [notification, setNotification] = useState(null);
  const [inquiryModal, setInquiryModal] = useState(null);
  const [filters, setFilters] = useState({ type: 'All Types', price: 'Any Price' });

  const properties = [
    { id: 1, title: 'Modern Villa', location: 'Beverly Hills, CA', price: 2450000, beds: 5, baths: 4, sqft: 4200, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop', tag: 'Featured', type: 'Villa' },
    { id: 2, title: 'Downtown Penthouse', location: 'Manhattan, NY', price: 3200000, beds: 3, baths: 3, sqft: 2800, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop', tag: 'New', type: 'Apartment' },
    { id: 3, title: 'Lakefront Estate', location: 'Lake Tahoe, NV', price: 1850000, beds: 4, baths: 3, sqft: 3500, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop', tag: 'Hot', type: 'House' },
    { id: 4, title: 'Contemporary Home', location: 'Austin, TX', price: 980000, beds: 4, baths: 2, sqft: 2400, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop', tag: '', type: 'House' },
    { id: 5, title: 'Luxury Condo', location: 'Miami, FL', price: 750000, beds: 2, baths: 2, sqft: 1800, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop', tag: 'New', type: 'Condo' },
    { id: 6, title: 'Beachfront House', location: 'Malibu, CA', price: 4500000, beds: 6, baths: 5, sqft: 5200, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop', tag: 'Featured', type: 'House' },
  ];

  const rentalProperties = [
    { id: 101, title: 'Studio Apartment', location: 'San Francisco, CA', price: 2500, beds: 1, baths: 1, sqft: 650, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop', tag: 'Available', type: 'Apartment' },
    { id: 102, title: 'Family Home', location: 'Portland, OR', price: 3800, beds: 3, baths: 2, sqft: 1800, image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop', tag: '', type: 'House' },
    { id: 103, title: 'Luxury Loft', location: 'Seattle, WA', price: 4200, beds: 2, baths: 2, sqft: 1400, image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&h=400&fit=crop', tag: 'New', type: 'Apartment' },
  ];

  const displayProperties = activeTab === 'rent' ? rentalProperties : properties;

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000);
  };

  const toggleSaved = (id) => {
    if (savedProperties.includes(id)) {
      setSavedProperties(savedProperties.filter(p => p !== id));
      showNotification('Removed from saved');
    } else {
      setSavedProperties([...savedProperties, id]);
      showNotification('Property saved!');
    }
  };

  const handleInquiry = (e) => {
    e.preventDefault();
    showNotification('Inquiry sent! An agent will contact you soon.');
    setInquiryModal(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-4 z-[100] bg-sky-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fadeIn">
          <Check className="w-5 h-5" />
          {notification}
        </div>
      )}

      {/* Inquiry Modal */}
      {inquiryModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setInquiryModal(null)}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Property Inquiry</h3>
              <button onClick={() => setInquiryModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="mb-6">
              <img src={inquiryModal.image} alt={inquiryModal.title} className="w-full h-32 object-cover rounded-lg mb-3" />
              <h4 className="font-bold text-slate-900">{inquiryModal.title}</h4>
              <p className="text-sky-600 font-bold">
                {activeTab === 'rent' ? `$${inquiryModal.price.toLocaleString()}/mo` : `$${(inquiryModal.price / 1000000).toFixed(2)}M`}
              </p>
            </div>
            <form onSubmit={handleInquiry} className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border rounded-lg focus:border-sky-500 outline-none" required />
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 border rounded-lg focus:border-sky-500 outline-none" required />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 border rounded-lg focus:border-sky-500 outline-none" />
              <textarea placeholder="Your message..." className="w-full px-4 py-3 border rounded-lg focus:border-sky-500 outline-none resize-none h-24" />
              <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 py-6">
                <Mail className="w-5 h-5 mr-2" /> Send Inquiry
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white text-center py-2 text-sm">
        <Link to="/" className="hover:underline">← Back to Structura Studio</Link>
        <span className="mx-4">|</span>
        <span>This is a demo preview of a Real Estate website</span>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Home className="w-8 h-8 text-sky-600" />
              <span className="text-xl font-bold text-slate-900">PrimeProperty</span>
            </div>
            <nav className="hidden md:flex gap-6">
              {['buy', 'rent', 'sell', 'agents', 'about'].map(item => (
                <button 
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={`capitalize transition-colors ${activeTab === item ? 'text-sky-600 font-medium' : 'text-slate-600 hover:text-sky-600'}`}
                >
                  {item}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="relative">
                <Heart className={`w-5 h-5 ${savedProperties.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                {savedProperties.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {savedProperties.length}
                  </span>
                )}
              </Button>
              <Button variant="ghost">Sign In</Button>
              <Button className="bg-sky-600 hover:bg-sky-700">List Property</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero with Search */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 to-sky-900">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=800&fit=crop" alt="Real Estate" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center text-white mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Find Your Dream Home</h1>
            <p className="text-xl text-sky-200">Discover the perfect property from our exclusive listings</p>
          </div>

          {/* Search Tabs */}
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2 mb-4">
              <button 
                onClick={() => setActiveTab('buy')}
                className={`px-6 py-2 rounded-t-lg font-medium ${activeTab === 'buy' ? 'bg-white text-sky-600' : 'bg-white/10 text-white'}`}
              >
                Buy
              </button>
              <button 
                onClick={() => setActiveTab('rent')}
                className={`px-6 py-2 rounded-t-lg font-medium ${activeTab === 'rent' ? 'bg-white text-sky-600' : 'bg-white/10 text-white'}`}
              >
                Rent
              </button>
            </div>
            <div className="bg-white rounded-2xl rounded-tl-none p-6 shadow-2xl">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <label className="text-sm text-slate-500 mb-1 block">Location</label>
                  <div className="flex items-center border rounded-lg px-3 py-2">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    <input type="text" placeholder="City, neighborhood, or ZIP" className="flex-1 ml-2 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-slate-500 mb-1 block">Property Type</label>
                  <select 
                    value={filters.type}
                    onChange={e => setFilters({...filters, type: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 outline-none"
                  >
                    <option>All Types</option>
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Condo</option>
                    <option>Villa</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-500 mb-1 block">Price Range</label>
                  <select 
                    value={filters.price}
                    onChange={e => setFilters({...filters, price: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 outline-none"
                  >
                    <option>Any Price</option>
                    <option>$500k - $1M</option>
                    <option>$1M - $2M</option>
                    <option>$2M - $5M</option>
                    <option>$5M+</option>
                  </select>
                </div>
              </div>
              <Button className="w-full mt-4 bg-sky-600 hover:bg-sky-700 py-6" onClick={() => showNotification('Searching properties...')}>
                <Search className="w-5 h-5 mr-2" /> Search Properties
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* BUY/RENT TAB - Properties */}
      {(activeTab === 'buy' || activeTab === 'rent') && (
        <>
          {/* Stats */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: '15K+', label: 'Properties Listed' },
                  { value: '$8B+', label: 'Total Sales' },
                  { value: '12K+', label: 'Happy Clients' },
                  { value: '500+', label: 'Expert Agents' },
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-3xl font-bold text-sky-600">{stat.value}</p>
                    <p className="text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Properties Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    {activeTab === 'rent' ? 'Properties for Rent' : 'Properties for Sale'}
                  </h2>
                  <p className="text-slate-600">Handpicked properties for you</p>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-slate-500" />
                  <span className="text-slate-500">{displayProperties.length} properties</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProperties.map(property => (
                  <div key={property.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-56">
                      <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <button 
                        onClick={() => toggleSaved(property.id)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-sky-50"
                      >
                        <Heart className={`w-5 h-5 ${savedProperties.includes(property.id) ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                      </button>
                      {property.tag && (
                        <Badge className="absolute top-4 left-4 bg-sky-600 text-white">{property.tag}</Badge>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-2xl font-bold text-sky-600 mb-2">
                        {activeTab === 'rent' ? `$${property.price.toLocaleString()}/mo` : `$${(property.price / 1000000).toFixed(2)}M`}
                      </p>
                      <h3 className="font-bold text-slate-900 mb-1">{property.title}</h3>
                      <p className="text-slate-500 text-sm flex items-center gap-1 mb-4">
                        <MapPin className="w-4 h-4" /> {property.location}
                      </p>
                      <div className="flex items-center justify-between text-sm text-slate-600 border-t pt-4 mb-4">
                        <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {property.beds}</span>
                        <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {property.baths}</span>
                        <span className="flex items-center gap-1"><Square className="w-4 h-4" /> {property.sqft.toLocaleString()}</span>
                      </div>
                      <Button className="w-full bg-sky-600 hover:bg-sky-700" onClick={() => setInquiryModal(property)}>
                        Contact Agent
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* SELL TAB */}
      {activeTab === 'sell' && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">List Your Property</h2>
              <p className="text-slate-600">Get the best value for your property with our expert agents</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); showNotification('Listing request submitted!'); }}>
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Property Address" className="w-full px-4 py-3 border rounded-lg focus:border-sky-500 outline-none" required />
                  <select className="w-full px-4 py-3 border rounded-lg focus:border-sky-500 outline-none">
                    <option>Property Type</option>
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Condo</option>
                  </select>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <input type="number" placeholder="Bedrooms" className="w-full px-4 py-3 border rounded-lg focus:border-sky-500 outline-none" />
                  <input type="number" placeholder="Bathrooms" className="w-full px-4 py-3 border rounded-lg focus:border-sky-500 outline-none" />
                  <input type="number" placeholder="Square Feet" className="w-full px-4 py-3 border rounded-lg focus:border-sky-500 outline-none" />
                </div>
                <input type="text" placeholder="Expected Price" className="w-full px-4 py-3 border rounded-lg focus:border-sky-500 outline-none" />
                <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border rounded-lg focus:border-sky-500 outline-none" required />
                <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 py-6">
                  Get Free Valuation
                </Button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* AGENTS TAB */}
      {activeTab === 'agents' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Expert Agents</h2>
              <p className="text-slate-600">Work with the best in the industry</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { name: 'Sarah Johnson', specialty: 'Luxury Homes', sales: '$45M+', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
                { name: 'Michael Chen', specialty: 'Commercial', sales: '$62M+', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
                { name: 'Emily Davis', specialty: 'First-time Buyers', sales: '$28M+', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
              ].map((agent, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all text-center">
                  <img src={agent.image} alt={agent.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                  <h3 className="font-bold text-slate-900 text-lg">{agent.name}</h3>
                  <p className="text-sky-600 text-sm mb-2">{agent.specialty}</p>
                  <p className="text-slate-500 text-sm mb-4">{agent.sales} in sales</p>
                  <Button variant="outline" className="w-full border-sky-600 text-sky-600 hover:bg-sky-50" onClick={() => showNotification('Contact request sent!')}>
                    Contact Agent
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ABOUT TAB */}
      {activeTab === 'about' && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">About PrimeProperty</h2>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                PrimeProperty has been connecting buyers and sellers with their dream properties since 2005. With over 500 expert agents across 45 cities, we have helped thousands of families find their perfect home.
              </p>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                Our commitment to excellence, transparency, and client satisfaction has made us one of the most trusted names in real estate. Whether you are buying your first home or selling a luxury estate, we are here to guide you every step of the way.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-sky-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Home?</h2>
          <p className="text-sky-100 mb-8 max-w-xl mx-auto">Our expert agents are here to help you every step of the way.</p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-white text-sky-600 hover:bg-slate-100" onClick={() => setActiveTab('buy')}>
              Browse Properties
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => showNotification('Call feature coming soon!')}>
              <Phone className="w-4 h-4 mr-2" /> Call Now
            </Button>
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

export default RealEstateDemo;
