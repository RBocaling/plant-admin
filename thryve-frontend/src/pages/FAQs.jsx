import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  // FAQ items
  const faqItems = [
    {
      question: 'What is Thryve?',
      answer: 'Thryve is a comprehensive plant care management system designed to help both novice and experienced plant owners care for their plants effectively. The app provides reminders, care guides, plant identification, and a community platform to ensure your plants thrive.',
    },
    {
      question: 'How does Thryve work?',
      answer: 'Thryve works by allowing you to create a digital inventory of your plants. Once you add a plant to your collection (either by taking a photo for identification or selecting from our database), the app creates a customized care schedule. You\'ll receive notifications for watering, fertilizing, repotting, and other care tasks. The app also monitors environmental factors like light and humidity to ensure optimal growing conditions.',
    },
    {
      question: 'Is Thryve free to use?',
      answer: 'Thryve offers a free basic version that includes plant identification, basic care reminders, and access to our plant database. For advanced features like detailed care analytics, unlimited plant profiles, and expert consultations, we offer premium subscription options starting at a small monthly fee. Visit our website for current pricing information.',
    },
    {
      question: 'Can I use Thryve offline?',
      answer: 'No, many of Thryve\'s core features are not available offline. Plant identification, AI chat, and using AR Scan require an internet connection.',
    },
    {
      question: 'Do I need to create an account to use Thryve?',
      answer: 'While you can browse the plant database without an account, creating a free account is recommended to save your plant collection, receive care reminders, and track your plants\' progress over time. Creating an account also lets you sync your data across multiple devices.',
    },
    {
      question: 'How accurate is the plant identification feature?',
      answer: 'Our plant identification technology uses advanced machine learning algorithms APIs.',
    },
    {
      question: 'Does Thryve work for both indoor and outdoor plants?',
      answer: 'Yes, Thryve supports both indoor houseplants and outdoor garden plants. The care recommendations are tailored based on the plant type and whether it\'s grown indoors or outdoors.',
    },
  ];
  
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl max-w-2xl mx-auto text-neutral/90">
            Find answers to common questions about Thryve and plant care
          </p>
        </div>
      </section>
      
      {/* FAQs Section */}
      <section className="section-padding bg-neutral">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {faqItems.map((item, index) => (
                <div key={index} className="border-b border-gray-100 last:border-b-0">
                  <button
                    className="w-full py-5 px-6 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h3 className="font-semibold text-primary text-lg">{item.question}</h3>
                    <span className={`transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-96 py-2' : 'max-h-0'}`}
                  >
                    <p className="px-6 pb-5 text-gray-600">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Still Have Questions */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">Still Have Questions?</h2>
            <p className="text-gray-600 mb-8">
              Can't find the answer you're looking for? Please contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="btn-primary">
                Contact Support
              </button>
              <button className="px-6 py-3 font-semibold border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors">
                Visit Help Center
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQs;