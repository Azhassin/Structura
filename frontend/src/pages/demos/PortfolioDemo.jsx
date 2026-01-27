import React, { useState } from 'react';
import { Camera, Instagram, Mail, ExternalLink, Award, Heart, Check, X, Send } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';

const PortfolioDemo = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [contactModal, setContactModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [likedWorks, setLikedWorks] = useState([]);

  const works = [
    { id: 1, title: 'Urban Landscape', category: 'photography', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop', desc: 'City skyline at golden hour' },
    { id: 2, title: 'Brand Identity', category: 'design', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop', desc: 'Complete brand redesign for startup' },
    { id: 3, title: 'Product Shoot', category: 'photography', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop', desc: 'Minimalist product photography' },
    { id: 4, title: 'Web Design', category: 'design', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop', desc: 'E-commerce website redesign' },
    { id: 5, title: 'Portrait Series', category: 'photography', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=400&fit=crop', desc: 'Professional headshots collection' },
    { id: 6, title: 'App Interface', category: 'design', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop', desc: 'Mobile app UI/UX design' },
    { id: 7, title: 'Nature Collection', category: 'photography', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop', desc: 'Landscape photography series' },
    { id: 8, title: 'Logo Design', category: 'design', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop', desc: 'Modern logo concepts' },
  ];

  const categories = ['all', 'photography', 'design'];
  const filteredWorks = categoryFilter === 'all' ? works : works.filter(w => w.category === categoryFilter);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000);
  };

  const toggleLike = (id) => {
    if (likedWorks.includes(id)) {
      setLikedWorks(likedWorks.filter(w => w !== id));
    } else {
      setLikedWorks([...likedWorks, id]);
      showNotification('Added to favorites!');
    }
  };

  const handleContact = (e) => {
    e.preventDefault();
    showNotification('Message sent! I\'ll get back to you soon.');
    setContactModal(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-4 z-[100] bg-amber-500 text-black px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fadeIn">
          <Check className="w-5 h-5" />
          {notification}
        </div>
      )}

      {/* Contact Modal */}
      {contactModal && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4" onClick={() => setContactModal(false)}>
          <div className="bg-neutral-900 rounded-2xl p-8 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Get in Touch</h3>
              <button onClick={() => setContactModal(false)} className="text-neutral-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleContact} className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-amber-500 outline-none" required />
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-amber-500 outline-none" required />
              <select className="w-full px-4 py-3 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-amber-500 outline-none">
                <option>Project Type</option>
                <option>Photography</option>
                <option>Brand Design</option>
                <option>Web Design</option>
                <option>Other</option>
              </select>
              <textarea placeholder="Tell me about your project..." className="w-full px-4 py-3 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-amber-500 outline-none resize-none h-32" />
              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black py-6">
                <Send className="w-5 h-5 mr-2" /> Send Message
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-2 text-sm">
        <Link to="/" className="hover:underline">← Back to Structura Studio</Link>
        <span className="mx-4">|</span>
        <span>This is a demo preview of a Portfolio website</span>
      </div>

      {/* Header */}
      <header className="bg-neutral-950/90 backdrop-blur-md sticky top-0 z-50 border-b border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-amber-400" />
              <span className="text-xl font-bold">CreativeShowcase</span>
            </div>
            <nav className="hidden md:flex gap-8">
              {navItems.map(item => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`transition-colors ${activeTab === item.id ? 'text-amber-400' : 'text-neutral-400 hover:text-white'}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <Button className="bg-amber-500 hover:bg-amber-600 text-black rounded-full" onClick={() => setContactModal(true)}>
              Hire Me
            </Button>
          </div>
        </div>
      </header>

      {/* HOME TAB */}
      {activeTab === 'home' && (
        <>
          {/* Hero */}
          <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-neutral-950 to-neutral-950" />
            <div className="container mx-auto px-4 text-center relative z-10">
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-6">Award-Winning Designer & Photographer</Badge>
              <h1 className="text-6xl md:text-8xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Creative</span>
                <br />
                <span className="text-white">Visionary</span>
              </h1>
              <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
                Transforming ideas into stunning visual experiences. Specializing in photography, brand design, and digital art.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="bg-white text-black hover:bg-neutral-200 rounded-full px-8" onClick={() => setActiveTab('work')}>
                  View Portfolio
                </Button>
                <Button size="lg" variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800 rounded-full px-8" onClick={() => setContactModal(true)}>
                  Get in Touch
                </Button>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-16 border-y border-neutral-800">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: '150+', label: 'Projects Completed' },
                  { value: '50+', label: 'Happy Clients' },
                  { value: '8', label: 'Years Experience' },
                  { value: '12', label: 'Awards Won' },
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-4xl font-bold text-amber-400">{stat.value}</p>
                    <p className="text-neutral-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Work Preview */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Selected Works</h2>
                <p className="text-neutral-400">A curated collection of my best projects</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {works.slice(0, 6).map(work => (
                  <div key={work.id} className="group relative overflow-hidden rounded-2xl cursor-pointer" onClick={() => setActiveTab('work')}>
                    <img src={work.image} alt={work.title} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <Badge className="bg-amber-500 text-black mb-2 capitalize">{work.category}</Badge>
                      <h3 className="text-xl font-bold">{work.title}</h3>
                      <ExternalLink className="absolute bottom-6 right-6 w-5 h-5 text-amber-400" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Button variant="outline" className="border-neutral-700 hover:bg-neutral-800 rounded-full px-8" onClick={() => setActiveTab('work')}>
                  View All Work
                </Button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* WORK TAB */}
      {activeTab === 'work' && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Portfolio</h2>
              <p className="text-neutral-400 mb-8">Browse my complete collection of work</p>
              
              {/* Category Filter */}
              <div className="flex justify-center gap-4">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-6 py-2 rounded-full capitalize transition-all ${
                      categoryFilter === cat 
                        ? 'bg-amber-500 text-black' 
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                    }`}
                  >
                    {cat === 'all' ? 'All Work' : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorks.map(work => (
                <div key={work.id} className="group relative overflow-hidden rounded-2xl">
                  <img src={work.image} alt={work.title} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <button 
                    onClick={() => toggleLike(work.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${likedWorks.includes(work.id) ? 'fill-amber-500 text-amber-500' : 'text-white'}`} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Badge className="bg-amber-500 text-black mb-2 capitalize">{work.category}</Badge>
                    <h3 className="text-xl font-bold mb-1">{work.title}</h3>
                    <p className="text-neutral-400 text-sm">{work.desc}</p>
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
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop" alt="Artist" className="rounded-2xl" />
              </div>
              <div>
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4">About Me</Badge>
                <h2 className="text-4xl font-bold mb-6">Passionate About Creating Visual Stories</h2>
                <p className="text-neutral-400 mb-6">
                  With over 8 years of experience in photography and design, I help brands and individuals tell their unique stories through compelling visuals.
                </p>
                <p className="text-neutral-400 mb-6">
                  My work has been featured in major publications including Vogue, National Geographic, and Forbes. I believe that every project is an opportunity to create something extraordinary.
                </p>
                <div className="flex gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span>Award Winner</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-amber-400" />
                    <span>100% Satisfaction</span>
                  </div>
                </div>
                <Button className="bg-amber-500 hover:bg-amber-600 text-black rounded-full px-8" onClick={() => setContactModal(true)}>
                  Work With Me
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SERVICES TAB */}
      {activeTab === 'services' && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4">Services</Badge>
              <h2 className="text-4xl font-bold mb-4">What I Offer</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { title: 'Photography', desc: 'Professional photography for events, products, portraits, and more.', price: 'From $500', features: ['High-res images', 'Professional editing', 'Quick turnaround'] },
                { title: 'Brand Design', desc: 'Complete brand identity design including logos, guidelines, and assets.', price: 'From $1,500', features: ['Logo design', 'Color palette', 'Brand guidelines'] },
                { title: 'Web Design', desc: 'Modern, responsive website designs that convert visitors into customers.', price: 'From $2,000', features: ['Custom design', 'Mobile responsive', 'SEO optimized'] },
              ].map((service, i) => (
                <div key={i} className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 hover:border-amber-500/50 transition-all">
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-neutral-400 mb-4">{service.desc}</p>
                  <p className="text-amber-400 font-bold text-lg mb-6">{service.price}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feat, j) => (
                      <li key={j} className="flex items-center gap-2 text-neutral-400 text-sm">
                        <Check className="w-4 h-4 text-amber-500" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full border-neutral-700 hover:bg-neutral-800 rounded-full" onClick={() => setContactModal(true)}>
                    Get Quote
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT TAB */}
      {activeTab === 'contact' && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-12">
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4">Contact</Badge>
              <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
              <p className="text-neutral-400">Have a project in mind? I'd love to hear about it.</p>
            </div>
            <div className="bg-neutral-900 p-8 rounded-2xl">
              <form onSubmit={handleContact} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-amber-500 outline-none" required />
                  <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-amber-500 outline-none" required />
                </div>
                <select className="w-full px-4 py-3 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-amber-500 outline-none">
                  <option>Project Type</option>
                  <option>Photography</option>
                  <option>Brand Design</option>
                  <option>Web Design</option>
                  <option>Other</option>
                </select>
                <textarea placeholder="Tell me about your project..." className="w-full px-4 py-3 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-amber-500 outline-none resize-none h-32" />
                <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black py-6 rounded-full">
                  <Send className="w-5 h-5 mr-2" /> Send Message
                </Button>
              </form>
            </div>
            <div className="flex justify-center gap-8 mt-12">
              <a href="#" className="text-neutral-400 hover:text-amber-400 transition-colors" onClick={(e) => { e.preventDefault(); showNotification('Email copied!'); }}>
                <Mail className="w-6 h-6" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-amber-400 transition-colors" onClick={(e) => { e.preventDefault(); showNotification('Opening Instagram...'); }}>
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 border-t border-neutral-800 text-center text-neutral-500">
        <p>Demo created by Structura Studio</p>
      </footer>
    </div>
  );
};

export default PortfolioDemo;
