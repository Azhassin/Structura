import React, { useState } from 'react';
import { UtensilsCrossed, Clock, MapPin, Phone, Star, Calendar, ChefHat, Wine, Check, X, Users } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';

const RestaurantDemo = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [reservationModal, setReservationModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', date: '', time: '', guests: '2'
  });

  const menuItems = [
    { name: 'Truffle Risotto', desc: 'Arborio rice, black truffle, parmesan', price: 32, image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300&h=300&fit=crop', category: 'mains' },
    { name: 'Grilled Salmon', desc: 'Atlantic salmon, lemon butter, asparagus', price: 38, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=300&fit=crop', category: 'mains' },
    { name: 'Wagyu Steak', desc: 'A5 wagyu, seasonal vegetables, red wine jus', price: 85, image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=300&h=300&fit=crop', category: 'mains' },
    { name: 'Lobster Linguine', desc: 'Fresh lobster, cherry tomatoes, basil', price: 45, image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300&h=300&fit=crop', category: 'mains' },
    { name: 'Caesar Salad', desc: 'Romaine, parmesan, croutons, classic dressing', price: 16, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=300&fit=crop', category: 'starters' },
    { name: 'French Onion Soup', desc: 'Caramelized onions, gruyère, crusty bread', price: 14, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=300&fit=crop', category: 'starters' },
    { name: 'Tiramisu', desc: 'Espresso-soaked ladyfingers, mascarpone', price: 12, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=300&fit=crop', category: 'desserts' },
    { name: 'Crème Brûlée', desc: 'Vanilla custard, caramelized sugar crust', price: 11, image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=300&h=300&fit=crop', category: 'desserts' },
  ];

  const [menuFilter, setMenuFilter] = useState('all');
  const filteredMenu = menuFilter === 'all' ? menuItems : menuItems.filter(item => item.category === menuFilter);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleReservation = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.date && formData.time) {
      showNotification('Reservation confirmed! We look forward to seeing you.');
      setReservationModal(false);
      setFormData({ name: '', email: '', date: '', time: '', guests: '2' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'About' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-4 z-[100] bg-amber-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fadeIn">
          <Check className="w-5 h-5" />
          {notification}
        </div>
      )}

      {/* Reservation Modal */}
      {reservationModal && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4" onClick={() => setReservationModal(false)}>
          <div className="bg-stone-900 rounded-2xl p-8 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-serif">Make a Reservation</h3>
              <button onClick={() => setReservationModal(false)} className="text-stone-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleReservation} className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-stone-800 rounded-lg border border-stone-700 focus:border-amber-500 outline-none" 
                required
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-stone-800 rounded-lg border border-stone-700 focus:border-amber-500 outline-none" 
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="px-4 py-3 bg-stone-800 rounded-lg border border-stone-700 focus:border-amber-500 outline-none" 
                  required
                />
                <input 
                  type="time" 
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                  className="px-4 py-3 bg-stone-800 rounded-lg border border-stone-700 focus:border-amber-500 outline-none" 
                  required
                />
              </div>
              <select 
                value={formData.guests}
                onChange={e => setFormData({...formData, guests: e.target.value})}
                className="w-full px-4 py-3 bg-stone-800 rounded-lg border border-stone-700 focus:border-amber-500 outline-none"
              >
                <option value="2">2 Guests</option>
                <option value="4">4 Guests</option>
                <option value="6">6 Guests</option>
                <option value="8">8+ Guests</option>
              </select>
              <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 py-6">
                Confirm Reservation
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-amber-700 to-orange-700 text-white text-center py-2 text-sm">
        <Link to="/" className="hover:underline">← Back to Structura Studio</Link>
        <span className="mx-4">|</span>
        <span>This is a demo preview of a Restaurant website</span>
      </div>

      {/* Header */}
      <header className="bg-stone-950/90 backdrop-blur-md sticky top-0 z-50 border-b border-stone-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-8 h-8 text-amber-400" />
              <span className="text-2xl font-serif">Bistro Elegante</span>
            </div>
            <nav className="hidden md:flex gap-8">
              {navItems.map(item => (
                <button 
                  key={item.id} 
                  onClick={() => setActiveTab(item.id)}
                  className={`transition-colors ${activeTab === item.id ? 'text-amber-400' : 'text-stone-300 hover:text-amber-400'}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <Button className="bg-amber-600 hover:bg-amber-700" onClick={() => setReservationModal(true)}>
              Reserve Table
            </Button>
          </div>
        </div>
      </header>

      {/* HOME TAB */}
      {activeTab === 'home' && (
        <>
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
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700" onClick={() => setReservationModal(true)}>
                  <Calendar className="w-4 h-4 mr-2" /> Book a Table
                </Button>
                <Button size="lg" variant="outline" className="border-stone-600 hover:bg-stone-800" onClick={() => setActiveTab('menu')}>
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
                {menuItems.slice(0, 4).map((item, i) => (
                  <div key={i} className="group cursor-pointer" onClick={() => setActiveTab('menu')}>
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
                <Button size="lg" variant="outline" className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white" onClick={() => setActiveTab('menu')}>
                  View Full Menu
                </Button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* MENU TAB */}
      {activeTab === 'menu' && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-amber-600/20 text-amber-400 border-amber-600/30 mb-4">Our Menu</Badge>
              <h2 className="text-4xl font-serif mb-4">Culinary Excellence</h2>
            </div>
            
            {/* Menu Filter */}
            <div className="flex justify-center gap-4 mb-12">
              {['all', 'starters', 'mains', 'desserts'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setMenuFilter(cat)}
                  className={`px-6 py-2 rounded-full capitalize transition-all ${
                    menuFilter === cat ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {cat === 'all' ? 'All Dishes' : cat}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredMenu.map((item, i) => (
                <div key={i} className="bg-stone-900 rounded-2xl overflow-hidden group hover:bg-stone-800 transition-colors">
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <Badge className="absolute top-4 left-4 bg-amber-600 capitalize">{item.category}</Badge>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-serif">{item.name}</h3>
                      <span className="text-amber-400 font-serif text-xl">${item.price}</span>
                    </div>
                    <p className="text-stone-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ABOUT TAB */}
      {activeTab === 'about' && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=700&fit=crop" alt="Our Story" className="rounded-2xl" />
              </div>
              <div>
                <Badge className="bg-amber-600/20 text-amber-400 border-amber-600/30 mb-4">Our Story</Badge>
                <h2 className="text-4xl font-serif mb-6">A Legacy of Excellence</h2>
                <p className="text-stone-300 mb-4">
                  Founded in 1998, Bistro Elegante has been serving exceptional cuisine for over 25 years. What started as a small family restaurant has grown into one of the city's most celebrated dining destinations.
                </p>
                <p className="text-stone-300 mb-6">
                  Our award-winning chefs combine classical techniques with modern innovation, creating dishes that delight the senses and tell a story with every bite. We source only the finest ingredients from local farms and trusted suppliers.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-stone-900 p-4 rounded-xl text-center">
                    <p className="text-3xl font-serif text-amber-400">25+</p>
                    <p className="text-stone-400 text-sm">Years of Excellence</p>
                  </div>
                  <div className="bg-stone-900 p-4 rounded-xl text-center">
                    <p className="text-3xl font-serif text-amber-400">15</p>
                    <p className="text-stone-400 text-sm">Culinary Awards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* RESERVATIONS TAB */}
      {activeTab === 'reservations' && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-12">
              <Badge className="bg-amber-600/20 text-amber-400 border-amber-600/30 mb-4">Reservations</Badge>
              <h2 className="text-4xl font-serif mb-4">Book Your Table</h2>
              <p className="text-stone-400">Reserve your spot for an unforgettable dining experience</p>
            </div>
            <div className="bg-stone-900 p-8 rounded-2xl">
              <form onSubmit={handleReservation} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-stone-400 mb-2 text-sm">Your Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-stone-800 rounded-lg border border-stone-700 focus:border-amber-500 outline-none" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-2 text-sm">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-stone-800 rounded-lg border border-stone-700 focus:border-amber-500 outline-none" 
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-stone-400 mb-2 text-sm">Date</label>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                      className="w-full px-4 py-3 bg-stone-800 rounded-lg border border-stone-700 focus:border-amber-500 outline-none" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-2 text-sm">Time</label>
                    <input 
                      type="time" 
                      value={formData.time}
                      onChange={e => setFormData({...formData, time: e.target.value})}
                      className="w-full px-4 py-3 bg-stone-800 rounded-lg border border-stone-700 focus:border-amber-500 outline-none" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-2 text-sm">Guests</label>
                    <select 
                      value={formData.guests}
                      onChange={e => setFormData({...formData, guests: e.target.value})}
                      className="w-full px-4 py-3 bg-stone-800 rounded-lg border border-stone-700 focus:border-amber-500 outline-none"
                    >
                      <option value="2">2 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="6">6 Guests</option>
                      <option value="8">8+ Guests</option>
                    </select>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 py-6 text-lg">
                  <Calendar className="w-5 h-5 mr-2" /> Confirm Reservation
                </Button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* CONTACT TAB */}
      {activeTab === 'contact' && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-amber-600/20 text-amber-400 border-amber-600/30 mb-4">Contact Us</Badge>
              <h2 className="text-4xl font-serif mb-4">Get In Touch</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-stone-900 p-8 rounded-2xl text-center">
                <MapPin className="w-10 h-10 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-serif mb-2">Location</h3>
                <p className="text-stone-400">123 Gourmet Street<br />Culinary District</p>
              </div>
              <div className="bg-stone-900 p-8 rounded-2xl text-center">
                <Phone className="w-10 h-10 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-serif mb-2">Phone</h3>
                <p className="text-stone-400">+1 (555) 123-4567</p>
              </div>
              <div className="bg-stone-900 p-8 rounded-2xl text-center">
                <Clock className="w-10 h-10 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-serif mb-2">Hours</h3>
                <p className="text-stone-400">Tue-Sun: 6:00 PM - 11:00 PM</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 bg-stone-950 text-center text-stone-500 border-t border-stone-800">
        <p>Demo created by Structura Studio</p>
      </footer>
    </div>
  );
};

export default RestaurantDemo;
