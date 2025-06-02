import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import { Facebook, MessageSquare, Mail, Phone } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Thank you! Your message has been sent.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage('');
      }, 5000);
    }, 1500);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto text-neutral/90">
            We'd love to hear from you. Get in touch with our team.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="scroll-animation bg-neutral rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white mb-4">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Phone</h3>
              <p className="text-gray-600 mb-2">0905-338-9195</p>
              <p className="text-gray-600">0917-447-6929</p>
            </div>

            <div className="scroll-animation bg-neutral rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white mb-4">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Email</h3>
              <p className="text-gray-600">rainrainegoaway@yahoo.com</p>
            </div>

            <div className="scroll-animation bg-neutral rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white mb-4">
                <Facebook size={24} />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Social Media</h3>
              <p className="text-gray-600 mb-2">Facebook: Rosemar Garden</p>
              <p className="text-gray-600">Messenger: Noreen Valois</p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Information */}
      <section className="section-padding bg-neutral">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="scroll-animation">
              <SectionHeading title="Visit Our Store" />
              <ul className="space-y-6">
                <li className="flex items-start">
                  <span className="inline-block bg-primary text-white p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-1">Location</h3>
                    <p className="text-gray-600">New Antipolo Public Market</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <span className="inline-block bg-primary text-white p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-1">Open Hours</h3>
                    <p className="text-gray-600">7:00AM - 6:00PM</p>
                    <p className="text-gray-600">Monday to Saturday</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <span className="inline-block bg-primary text-white p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-1">Delivery</h3>
                    <p className="text-gray-600">We offer local delivery services</p>
                    <p className="text-gray-600">Contact us for more details</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="scroll-animation">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.802876975!2d121.17245807584551!3d14.553667185363154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c7dc88a5b70f%3A0x8c2e8864b5c5ef89!2sNew%20Antipolo%20Public%20Market!5e0!3m2!1sen!2sph!4v1684644621461!5m2!1sen!2sph"
                className="w-full h-80 rounded-lg border-4 border-white shadow-lg"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <SectionHeading
              title="Send Us a Message"
              subtitle="Have a question or feedback? Fill out the form below."
              center={true}
            />

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your message here..."
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-primary w-full flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {submitMessage && (
                  <p className="mt-4 text-center text-green-600 font-medium">
                    {submitMessage}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Follow Us CTA */}
      <section className="section-padding bg-accent">
        <div className="container">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-8">Connect With Us On Social Media</h2>
            <div className="flex justify-center space-x-8">
              <a href="#" className="p-4 bg-white/20 rounded-full transition-transform hover:scale-110">
                <Facebook size={32} />
              </a>
              <a href="#" className="p-4 bg-white/20 rounded-full transition-transform hover:scale-110">
                <MessageSquare size={32} />
              </a>
              <a href="#" className="p-4 bg-white/20 rounded-full transition-transform hover:scale-110">
                <Mail size={32} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;