import { Link } from 'react-router-dom';
import { Facebook, Mail, Phone } from 'lucide-react';
import logo from '../assets/Thryve Logo.png';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/">
              <img src={logo} alt="Thryve Logo" className="h-8 filter brightness-0 invert mb-4" />
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-neutral/90">
              Your personal plant care companion. Helping you grow happier, healthier plants.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/RosemarGarden" className="hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/plant-store" className="text-sm hover:text-accent transition-colors">Plant Store</Link></li>
              <li><Link to="/about-us" className="text-sm hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/faqs" className="text-sm hover:text-accent transition-colors">FAQs</Link></li>
              <li><Link to="/contact-us" className="text-sm hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-accent transition-colors">Plant Care Tips</a></li>
              <li><a href="#" className="text-sm hover:text-accent transition-colors">Plant Identification</a></li>
              <li><a href="#" className="text-sm hover:text-accent transition-colors">Watering Schedule</a></li>
              <li><a href="#" className="text-sm hover:text-accent transition-colors">Disease Detection</a></li>
              <li><a href="#" className="text-sm hover:text-accent transition-colors">Community Forum</a></li>
            </ul>
          </div>

          {/* Other Roles */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Other Roles</h3>
            <ul className="space-y-3">
              <li><Link to="/login" className="text-sm hover:text-accent transition-colors">Plant Garden Owner</Link></li>
              <li><Link to="/login" className="text-sm hover:text-accent transition-colors">Plant Specialist</Link></li>
              <li><Link to="/login" className="text-sm hover:text-accent transition-colors">IT Admin</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone size={18} className="mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">0905-338-9195<br />0917-447-6929</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-3 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@thryve.com" className="text-sm hover:text-accent transition-colors">
                  info@thryve.com
                </a>
              </li>
              <li className="text-sm">
                <p className="font-semibold mb-1">Store Location:</p>
                <p>New Antipolo Public Market</p>
              </li>
              <li className="text-sm">
                <p className="font-semibold mb-1">Open Hours:</p>
                <p>7:00AM-6:00PM</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-6 text-center text-sm text-neutral/80">
          <p>&copy; {year} Thryve. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;