import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import logo from '../assets/Thryve Logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Plant Store', path: '/plant-store' },
    { name: 'About Us', path: '/about-us' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${location.pathname !== '/' || scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container flex items-center justify-between mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Thryve Logo" className={`h-8 ${location.pathname === '/' && !scrolled && 'filter brightness-0 invert'}`} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-poppins text-sm font-medium relative transition-colors
                ${location.pathname === link.path
                  ? 'text-[#569F8B] after:absolute after:left-0 after:bottom-[-5px] after:h-[2px] after:w-full after:bg-[#569F8B]'
                  : location.pathname !== '/' || scrolled ? 'text-black hover:text-[#4A7C59]' : 'text-white hover:text-black/80'
                }
              `}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Download Button and Login Icon Container */}
        <div className="hidden md:flex items-center gap-5">
          <Link to="/download" className="bg-[#569F8B] btn-accent">
            Download App
          </Link>

          <Link
            to="/login"
            className={`p-2 transition-colors hover:text-[#4A7C59] ${location.pathname !== '/' || scrolled ? 'text-black' : 'text-white'
              }`}
          >
            <LogIn size={24} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 ${location.pathname !== '/' || scrolled ? 'text-primary' : 'text-white'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-[62px] left-0 right-0 bottom-0 bg-white z-40 animate-fade-in">
          <div className="container flex flex-col py-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`py-4 text-lg font-poppins font-medium border-b border-gray-100 ${location.pathname === link.path ? 'text-accent' : 'text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button className="mt-8 btn-accent">
              Download App
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;