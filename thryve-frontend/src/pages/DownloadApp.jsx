import { Download, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";

const DownloadApp = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="container py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <SectionHeading
              title="Get the Thryve App"
              subtitle="Download our app and take your plant care experience to the next level"
              center={false}
            />
            
            <div className="text-gray-600 max-w-md space-y-4">
              <p>Never forget to water your plants again. Track, monitor, and care for your plants with ease using our intuitive mobile application.</p>
              <p>Access detailed care guides, set reminders, and connect with plant experts - all from your smartphone.</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Download Now</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all">
                    <div className="h-8 w-8 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                        <path d="M17.05,12.536l-2.937-1.588l2.937-1.588v3.176Zm-9.571,5.337V6.337c0-0.645,0.46-1.206,1.085-1.333c0.298-0.061,3.684-0.998,5.354-2.708c0.209-0.217,0.325-0.505,0.325-0.799v-0.498h1.76c0.203,0,0.407,0.082,0.554,0.246c0.167,0.186,0.257,0.428,0.254,0.683v5.453c0,0.254-0.087,0.498-0.254,0.681c-0.146,0.164-0.35,0.246-0.554,0.246h-5.381v9.392c0,0.257-0.086,0.499-0.25,0.685c-0.147,0.167-0.352,0.252-0.562,0.252h-1.76c-0.204,0-0.415-0.085-0.562-0.252C7.087,18.624,7,18.382,7,18.125v-0.252Z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-xs">Download on the</div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </button>
                  
                  <button className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all">
                    <div className="h-8 w-8 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                        <path d="M17.523,12c0,0.852-0.239,1.646-0.644,2.333l3.097,3.111c1.239-1.543,1.984-3.492,1.984-5.618c0-2.019-0.663-3.891-1.781-5.407l-3.089,3.092C17.313,10.387,17.523,11.171,17.523,12z M10.995,5.398C11.338,5.398,11.676,5.416,12,5.458v-4.96C6.741,0.966,2.257,5.449,2.257,10.709c0,0.622,0.074,1.256,0.214,1.865l3.958-0.039C6.385,10.636,8.518,5.398,10.995,5.398z M14.132,8.314l3.113-3.096C15.839,3.995,13.943,3.295,12,3.286v5.038C12.717,8.324,13.427,8.428,14.132,8.314z M2.068,17.446c0.839,0.853,1.795,1.557,2.835,2.085l2.624-4.522c-0.448-0.248-0.674-0.423-0.938-0.673L2.068,17.446z M12,18.531c-0.784,0-1.52-0.199-2.17-0.536l-2.731,4.044c1.491,0.62,3.126,0.961,4.818,0.961c1.68,0,3.261-0.336,4.721-0.922l-2.607-4.14C13.399,18.308,12.723,18.531,12,18.531z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-xs">GET IT ON</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Scan to Download</h3>
                <div className="bg-white p-4 inline-flex rounded-lg shadow-md">
                  <QrCode size={120} className="text-primary" />
                </div>
              </div>
              
              <div className="pt-4">
                <Link to="/" className="btn-primary inline-flex items-center gap-2">
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center md:justify-end">
            <div className="relative max-w-[280px]">
              {/* Phone frame */}
              <div className="relative z-10 border-8 border-gray-800 rounded-[3rem] overflow-hidden shadow-xl">
                {/* Screen content */}
                <div className="aspect-[9/16] bg-primary/10 flex flex-col items-center justify-center p-4">
                  <img src="/lovable-uploads/67ac2224-bd23-4bd6-8f7e-0f740357f819.png" alt="Plant App Screenshot" className="w-full h-full object-cover rounded-2xl" />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-1/4 -right-16 w-40 h-40 bg-primary/10 rounded-full -z-10"></div>
              <div className="absolute bottom-1/4 -left-16 w-32 h-32 bg-secondary/10 rounded-full -z-10"></div>
              <div className="absolute top-1/2 -left-5 w-10 h-10 bg-accent/10 rounded-full -z-10"></div>
              <div className="absolute bottom-1/3 -right-5 w-16 h-16 bg-primary/10 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-neutral py-16">
        <div className="container">
          <SectionHeading
            title="App Features"
            subtitle="Everything you need to care for your plants in one place"
            center={true}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Download className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Plant Care Reminders</h3>
              <p className="text-gray-600">Never miss a watering day with customized reminders based on plant needs</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Download className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Plant Identification</h3>
              <p className="text-gray-600">Simply take a photo and discover what plant you have</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Download className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Care Guides</h3>
              <p className="text-gray-600">Access detailed care information for thousands of plants</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-primary text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Level Up Your Plant Care?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Download the Thryve app today and start giving your plants the care they deserve.
          </p>
          <button className="px-8 py-4 bg-white text-primary font-semibold rounded-md shadow-lg transition-all hover:bg-opacity-90 flex items-center gap-2 mx-auto">
            <Download size={20} />
            Download App Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;