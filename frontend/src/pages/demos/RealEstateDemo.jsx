import React from 'react';
import { Home, Search, MapPin, Bed, Bath, Square, Heart, Phone, Mail, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';

const RealEstateDemo = () => {
  const properties = [
    { id: 1, title: 'Modern Villa', location: 'Beverly Hills, CA', price: 2450000, beds: 5, baths: 4, sqft: 4200, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop', tag: 'Featured' },
    { id: 2, title: 'Downtown Penthouse', location: 'Manhattan, NY', price: 3200000, beds: 3, baths: 3, sqft: 2800, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop', tag: 'New' },
    { id: 3, title: 'Lakefront Estate', location: 'Lake Tahoe, NV', price: 1850000, beds: 4, baths: 3, sqft: 3500, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop', tag: 'Hot' },
    { id: 4, title: 'Contemporary Home', location: 'Austin, TX', price: 980000, beds: 4, baths: 2, sqft: 2400, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop', tag: '' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
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
              {['Buy', 'Rent', 'Sell', 'Agents', 'About'].map(item => (
                <a key={item} href="#" className="text-slate-600 hover:text-sky-600 transition-colors">{item}</a>
              ))}
            </nav>
            <div className="flex items-center gap-4">
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
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-2xl">
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
                <select className="w-full border rounded-lg px-3 py-2 outline-none">
                  <option>All Types</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Condo</option>
                  <option>Villa</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-500 mb-1 block">Price Range</label>
                <select className="w-full border rounded-lg px-3 py-2 outline-none">
                  <option>Any Price</option>
                  <option>$500k - $1M</option>
                  <option>$1M - $2M</option>
                  <option>$2M - $5M</option>
                  <option>$5M+</option>
                </select>
              </div>
            </div>
            <Button className="w-full mt-4 bg-sky-600 hover:bg-sky-700 py-6">
              <Search className="w-5 h-5 mr-2" /> Search Properties
            </Button>
          </div>
        </div>
      </section>

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

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Properties</h2>
              <p className="text-slate-600">Handpicked properties for you</p>
            </div>
            <Button variant="outline">View All <ChevronRight className="ml-2 w-4 h-4" /></Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map(property => (
              <div key={property.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-56">
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-sky-50">
                    <Heart className="w-5 h-5 text-slate-400 hover:text-red-500" />
                  </button>
                  {property.tag && (
                    <Badge className="absolute top-4 left-4 bg-sky-600 text-white">{property.tag}</Badge>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-2xl font-bold text-sky-600 mb-2">${(property.price / 1000000).toFixed(2)}M</p>
                  <h3 className="font-bold text-slate-900 mb-1">{property.title}</h3>
                  <p className="text-slate-500 text-sm flex items-center gap-1 mb-4">
                    <MapPin className="w-4 h-4" /> {property.location}
                  </p>
                  <div className="flex items-center justify-between text-sm text-slate-600 border-t pt-4">
                    <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {property.beds}</span>
                    <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {property.baths}</span>
                    <span className="flex items-center gap-1"><Square className="w-4 h-4" /> {property.sqft}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sky-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Home?</h2>
          <p className="text-sky-100 mb-8 max-w-xl mx-auto">Our expert agents are here to help you every step of the way.</p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-white text-sky-600 hover:bg-slate-100">
              <Phone className="w-4 h-4 mr-2" /> Call Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Mail className="w-4 h-4 mr-2" /> Contact Us
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
