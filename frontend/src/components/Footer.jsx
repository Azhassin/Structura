import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-green-500/30 pt-16 pb-8 z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-8 h-8 text-green-500" />
              <span className="text-xl font-bold text-green-400 font-mono tracking-wider">
                CodeForge
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Crafting professional, creative, and efficient web solutions for your business.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-green-400 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Services
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-green-400 font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">Custom Web Design</li>
              <li className="text-gray-400 text-sm">E-commerce Solutions</li>
              <li className="text-gray-400 text-sm">AI Integration</li>
              <li className="text-gray-400 text-sm">SEO Optimization</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-green-400 font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 mt-0.5 text-green-500" />
                <span>contact@codeforge.com</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 mt-0.5 text-green-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-green-500" />
                <span>123 Web Street, Digital City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-500/30 pt-8 mt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CodeForge Web Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;