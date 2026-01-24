import React from 'react';
import { Camera, Instagram, Mail, ExternalLink, Award, Heart } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';

const PortfolioDemo = () => {
  const works = [
    { id: 1, title: 'Urban Landscape', category: 'Photography', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop' },
    { id: 2, title: 'Brand Identity', category: 'Design', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop' },
    { id: 3, title: 'Product Shoot', category: 'Photography', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop' },
    { id: 4, title: 'Web Design', category: 'Design', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop' },
    { id: 5, title: 'Portrait Series', category: 'Photography', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=400&fit=crop' },
    { id: 6, title: 'App Interface', category: 'Design', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-2 text-sm">
        <Link to="/" className="hover:underline">← Back to Structura Studio</Link>
        <span className="mx-4">|</span>
        <span>This is a demo preview of a Portfolio website</span>
      </div>

      {/* Header */}
      <header className="fixed top-8 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4 px-6 bg-neutral-900/80 backdrop-blur-lg rounded-full">
            <div className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-amber-400" />
              <span className="text-xl font-bold">CreativeShowcase</span>
            </div>
            <nav className="hidden md:flex gap-8">
              {['Work', 'About', 'Services', 'Contact'].map(item => (
                <a key={item} href="#" className="text-neutral-400 hover:text-white transition-colors">{item}</a>
              ))}
            </nav>
            <Button className="bg-amber-500 hover:bg-amber-600 text-black rounded-full">Hire Me</Button>
          </div>
        </div>
      </header>

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
            <Button size="lg" className="bg-white text-black hover:bg-neutral-200 rounded-full px-8">View Portfolio</Button>
            <Button size="lg" variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800 rounded-full px-8">Get in Touch</Button>
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

      {/* Work Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Selected Works</h2>
            <p className="text-neutral-400">A curated collection of my best projects</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {works.map(work => (
              <div key={work.id} className="group relative overflow-hidden rounded-2xl cursor-pointer">
                <img src={work.image} alt={work.title} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Badge className="bg-amber-500 text-black mb-2">{work.category}</Badge>
                  <h3 className="text-xl font-bold">{work.title}</h3>
                  <ExternalLink className="absolute bottom-6 right-6 w-5 h-5 text-amber-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-neutral-900">
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
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>Award Winner</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-amber-400" />
                  <span>100% Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">Have a project in mind? I&apos;d love to hear about it.</p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black rounded-full px-8">
              <Mail className="w-4 h-4 mr-2" /> Contact Me
            </Button>
            <Button size="lg" variant="outline" className="border-neutral-700 hover:bg-neutral-800 rounded-full px-8">
              <Instagram className="w-4 h-4 mr-2" /> Follow
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-neutral-800 text-center text-neutral-500">
        <p>Demo created by Structura Studio</p>
      </footer>
    </div>
  );
};

export default PortfolioDemo;
