import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 text-white pt-16 pb-8 z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">PixelForge</span>
                <span className="text-xs text-teal-300 -mt-1">Studio</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Crafting exceptional digital experiences for forward-thinking businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-teal-300 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-teal-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-teal-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-teal-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-teal-300 font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">Custom Web Design</li>
              <li className="text-gray-300 text-sm">E-commerce Solutions</li>
              <li className="text-gray-300 text-sm">AI Integration</li>
              <li className="text-gray-300 text-sm">SEO Optimization</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-teal-300 font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-300 text-sm">
                <Mail className="w-4 h-4 mt-0.5 text-teal-400" />
                <span>naseemazhan@outlook.com</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300 text-sm">
                <Phone className="w-4 h-4 mt-0.5 text-teal-400" />
                <span>+44 7342328508</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-teal-800/30 pt-8 mt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} PixelForge Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
