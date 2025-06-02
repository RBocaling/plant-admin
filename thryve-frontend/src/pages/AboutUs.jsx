import SectionHeading from '../components/SectionHeading';
import rosemarGardenImg from '../assets/Rosemar Garden.png';
import GardenPreview1 from '../assets/GardenPreviews/GardenPreview1.png';
import GardenPreview2 from '../assets/GardenPreviews/GardenPreview2.png';
import GardenPreview3 from '../assets/GardenPreviews/GardenPreview3.png';
import GardenPreview4 from '../assets/GardenPreviews/GardenPreview4.png';

const AboutUs = () => {
  // Team members
  const team = [
    {
      name: 'Miguel Santos',
      role: 'Plant Specialist',
      image: 'https://mediaproxy.salon.com/width/1200/height/675/https://media2.salon.com/2013/01/Facebook-no-profile-picture-icon-620x389.jpg',
    },
    {
      name: 'Noreen Valois',
      role: 'Founder & Plant Owner',
      image: 'https://mediaproxy.salon.com/width/1200/height/675/https://media2.salon.com/2013/01/Facebook-no-profile-picture-icon-620x389.jpg',
    },
    {
      name: 'Ana Rivera',
      role: 'Plant Specialist',
      image: 'https://mediaproxy.salon.com/width/1200/height/675/https://media2.salon.com/2013/01/Facebook-no-profile-picture-icon-620x389.jpg',
    },
  ];
  
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl max-w-2xl mx-auto text-neutral/90">
            Get to know the team behind Rosemar Garden and Thryve
          </p>
        </div>
      </section>
      
      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="scroll-animation">
              <SectionHeading title="Our Story" />
              <p className="mb-6 text-gray-600 leading-relaxed">
                Welcome to Rosemar Garden – Where Every Bloom Tells a Story.
              </p>
              <p className="mb-6 text-gray-600 leading-relaxed">
                Since the year 2000, Rosemar Garden has been your trusted floral partner, bringing over two decades of passion, creativity, and dedication to every bouquet we craft. From classic roses to vibrant mixed arrangements, we offer a wide variety of fresh plants tailored to every occasion.
              </p>
              <p className="mb-6 text-gray-600 leading-relaxed">
                Whether you're celebrating a milestone or simply brightening someone's day, our florists are here to bring your floral vision to life.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Have something specific in mind? Let us know! Or leave it to our experienced team to create a one-of-a-kind arrangement that speaks from the heart. At Rosemar Garden, we turn flowers into unforgettable moments.
              </p>
            </div>
            <div className="scroll-animation">
              <div className="relative">
                <img 
                  src={rosemarGardenImg} 
                  alt="Rosemar Garden" 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
                <div className="absolute -bottom-8 -left-8 p-4 bg-white shadow-lg rounded-lg">
                  <p className="text-primary font-bold text-xl">Est. 2000</p>
                  <p className="text-gray-600">Serving plant lovers for over 2 decades</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="section-padding bg-neutral">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="scroll-animation bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                <span className="inline-block w-10 h-10 rounded-full bg-primary text-white mr-4 flex items-center justify-center text-xl">M</span>
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To bring the joy and beauty of plants into every home, while promoting sustainable living and environmental awareness. We aim to make plant care accessible, enjoyable, and rewarding for everyone, regardless of their experience level.
              </p>
            </div>
            <div className="scroll-animation bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                <span className="inline-block w-10 h-10 rounded-full bg-primary text-white mr-4 flex items-center justify-center text-xl">V</span>
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To become the leading provider of plant care solutions, creating a global community of plant enthusiasts who share knowledge and passion for greenery. We envision a world where everyone can experience the physical and mental benefits of living with plants.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Meet the Team */}
      <section className="section-padding bg-white">
        <div className="container">
          <SectionHeading 
            title="Meet The Team" 
            subtitle="The passionate people behind our success"
            center={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="scroll-animation text-center"
              >
                <div className="relative mb-6 inline-block">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-64 h-64 object-cover rounded-full border-4 border-white shadow-lg mx-auto"
                  />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-1">{member.name}</h3>
                <p className="text-accent">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Gallery */}
      <section className="section-padding bg-neutral">
        <div className="container">
          <SectionHeading 
            title="Our Garden" 
            subtitle="Take a virtual tour of our lovely garden space"
            center={true}
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img 
              src={GardenPreview1} 
              alt="Garden" 
              className="scroll-animation w-full h-64 object-cover rounded-lg"
            />
            <img 
              src={GardenPreview2} 
              alt="Garden" 
              className="scroll-animation w-full h-64 object-cover rounded-lg"
            />
            <img 
              src={GardenPreview3} 
              alt="Garden" 
              className="scroll-animation w-full h-64 object-cover rounded-lg"
            />
            <img 
              src={GardenPreview4} 
              alt="Garden" 
              className="scroll-animation w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-accent py-16">
        <div className="container">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Plant Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Visit our store or download the Thryve app to explore our collection and care guides.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-white text-accent font-semibold rounded-md shadow-lg transition-all hover:bg-opacity-90">
                Download App
              </button>
              <button className="px-8 py-4 bg-primary text-white font-semibold rounded-md shadow-lg transition-all hover:bg-opacity-90">
                Visit Our Store
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
