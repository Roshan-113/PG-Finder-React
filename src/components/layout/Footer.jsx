import { Building2, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

// Enhanced footer with social links - Day 11
export function Footer() {
  const companyLinks = ['About Us', 'Careers', 'Press', 'Blog'];
  const supportLinks = ['Help Center', 'Safety Tips', 'FAQs', 'Contact Us'];
  const legalLinks = ['Terms of Service', 'Privacy Policy', 'Cookie Policy'];
  
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center">
                <Building2 className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-white">PG Finder</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Find your perfect PG accommodation and compatible roommates with ease. Safe, verified, and hassle-free.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail size={16} className="text-primary-500" />
                <span>support@pgfinder.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone size={16} className="text-primary-500" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-primary-500" />
                <span>Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2026 PG Finder. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {legalLinks.map((link) => (
                <a key={link} href="#" className="text-sm text-gray-500 hover:text-primary-400 transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
