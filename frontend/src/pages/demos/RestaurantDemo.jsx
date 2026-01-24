import React from 'react';
import { UtensilsCrossed, Clock, MapPin, Phone, Star, Calendar, ChefHat, Wine } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';

const RestaurantDemo = () => {
  const menuItems = [
    { name: 'Truffle Risotto', desc: 'Arborio rice, black truffle, parmesan', price: 32, image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300&h=300&fit=crop' },
    { name: 'Grilled Salmon', desc: 'Atlantic salmon, lemon butter, asparagus', price: 38, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=300&fit=crop' },
    { name: 'Wagyu Steak', desc: 'A5 wagyu, seasonal vegetables, red wine jus', price: 85, image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=300&h=300&fit=crop' },
    { name: 'Lobster Linguine', desc: 'Fresh lobster, cherry tomatoes, basil', price: 45, image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300&h=300&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-amber-700 to-orange-700 text-white text-center py-2 text-sm">
        <Link to="/" className="hover:underline">← Back to Structura Studio</Link>
        <span className="mx-4">|</span>
        <span>This is a demo preview of a Restaurant website</span>
      </div>

      {/* Header */}
      <header className="absolute top-8 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-8 h-8 text-amber-400" />
              <span className="text-2xl font-serif">Bistro Elegante</span>
            </div>
            <nav className="hidden md:flex gap-8">
              {['Home', 'Menu', 'About', 'Reservations', 'Contact'].map(item => (
                <a key={item} href="#" className="text-stone-300 hover:text-amber-400 transition-colors">{item}</a>
              ))}
            </nav>
            <Button className="bg-amber-600 hover:bg-amber-700">Reserve Table</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop" alt="Restaurant" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/50 to-stone-950" />
        </div>
        <div className="relative text-center px-4">
          <Badge className="bg-amber-600/20 text-amber-400 border-amber-600/30 mb-6">Fine Dining Experience</Badge>
          <h1 className="text-6xl md:text-8xl font-serif mb-6">Bistro Elegante</h1>
          <p className="text-xl text-stone-300 max-w-2xl mx-auto mb-8">
            An unforgettable culinary journey where tradition meets innovation
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
              <Calendar className="w-4 h-4 mr-2" /> Book a Table
            </Button>
            <Button size="lg" variant="outline" className="border-stone-600 hover:bg-stone-800">
              View Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-stone-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: ChefHat, label: 'Master Chefs', value: 'Award-winning' },
              { icon: Wine, label: 'Wine Selection', value: '500+ Labels' },
              { icon: Star, label: 'Rating', value: '4.9 Stars' },
              { icon: Clock, label: 'Experience', value: '25+ Years' },
            ].map((item, i) => (
              <div key={i}>
                <item.icon className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                <p className="text-2xl font-serif text-white mb-1">{item.value}</p>
                <p className="text-stone-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-amber-600/20 text-amber-400 border-amber-600/30 mb-4">Our Menu</Badge>
            <h2 className="text-4xl font-serif mb-4">Signature Dishes</h2>
            <p className="text-stone-400 max-w-xl mx-auto">Crafted with passion using the finest locally-sourced ingredients</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {menuItems.map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-amber-400 font-serif text-2xl">${item.price}</p>
                  </div>
                </div>
                <h3 className="text-xl font-serif mb-2 group-hover:text-amber-400 transition-colors">{item.name}</h3>
                <p className="text-stone-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white">
              View Full Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-900/50 to-orange-900/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif mb-6">Reserve Your Table</h2>
              <p className="text-stone-300 mb-8">Join us for an extraordinary dining experience. Our team is ready to make your evening unforgettable.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-stone-300">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span>123 Gourmet Street, Culinary District</span>
                </div>
                <div className="flex items-center gap-3 text-stone-300">
                  <Phone className="w-5 h-5 text-amber-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-stone-300">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span>Tue-Sun: 6:00 PM - 11:00 PM</span>
                </div>
              </div>
            </div>
            <div className="bg-stone-900 p-8 rounded-2xl">
              <h3 className="text-2xl font-serif mb-6">Make a Reservation</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-stone-800 rounded-lg border border-stone-700 focus:border-amber-500 outline-none" />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-stone-800 rounded-lg border border-stone-700 focus:border-amber-500 outline-none" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="px-4 py-3 bg-stone-800 rounded-lg border border-stone-700 focus:border-amber-500 outline-none" />
                  <input type="time" className="px-4 py-3 bg-stone-800 rounded-lg border border-stone-700 focus:border-amber-500 outline-none" />
                </div>
                <select className="w-full px-4 py-3 bg-stone-800 rounded-lg border border-stone-700 focus:border-amber-500 outline-none">
                  <option>Number of Guests</option>
                  <option>2 Guests</option>
                  <option>4 Guests</option>
                  <option>6 Guests</option>
                  <option>8+ Guests</option>
                </select>
                <Button className="w-full bg-amber-600 hover:bg-amber-700 py-6">Reserve Now</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-stone-950 text-center text-stone-500 border-t border-stone-800">
        <p>Demo created by Structura Studio</p>
      </footer>
    </div>
  );
};

export default RestaurantDemo;
