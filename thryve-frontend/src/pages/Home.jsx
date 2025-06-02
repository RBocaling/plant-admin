import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import { Star, ScanLine, Leaf, BotMessageSquare, Box } from 'lucide-react';
import rosemarGardenLoc from '../assets/Rosemar Garden Location.png';

const HomePage = () => {
    // Featured plants data
    const featuredPlants = [
        {
            id: 1,
            name: 'Monstera Deliciosa',
            image: 'https://potsforplants.ph/cdn/shop/products/monstera-deliciosa-swiss-cheese-plant-246419.jpg?v=1697027493',
            price: '₱850.00',
            size: 'M',
        },
        {
            id: 2,
            name: 'Snake Plant',
            image: 'https://images.squarespace-cdn.com/content/v1/54fbb611e4b0d7c1e151d22a/1610074066643-OP8HDJUWUH8T5MHN879K/Snake+Plant.jpg?format=1000w',
            price: '₱550.00',
            size: 'S',
        },
        {
            id: 3,
            name: 'Fiddle Leaf Fig',
            image: 'https://www.shelmerdine.com/wp-content/uploads/2018/08/Fiddle-Leaf-Fig-Tree.jpg',
            price: '₱1,250.00',
            size: 'L',
        },
    ];

    // Features data
    const features = [
        {
            title: 'AR Scanning',
            description: 'Scan your plant using AR to instantly detect health issues and receive helpful insights.',
            icon: <ScanLine className="h-10 w-10 text-secondary" />,
        },
        {
            title: 'Prescriptive Analytics',
            description: 'Get smart, data-driven suggestions to optimize your plant care based on real-time conditions.',
            icon: <Leaf className="h-10 w-10 text-secondary" />,
        },
        {
            title: 'Powered with AI',
            description: 'Ask questions and get instant guidance from an AI assistant trained in plant care.',
            icon: <BotMessageSquare className="h-10 w-10 text-secondary" />,
        },
        {
            title: '3D Model Viewer',
            description: 'Explore an interactive 3D model of your plant to better understand its structure and needs.',
            icon: <Box className="h-10 w-10 text-secondary" />,
        },
    ];

    // Testimonials data
    const testimonials = [
        {
            id: 1,
            content: "Thryve completely changed how I care for my plants. I'm no longer killing them accidentally!",
            author: "Maria Santos",
            role: "Plant Enthusiast",
            rating: 5,
        },
        {
            id: 2,
            content: "The reminders are a game-changer for busy plant parents. Highly recommend this app!",
            author: "John Mendoza",
            role: "Urban Gardener",
            rating: 5,
        },
        {
            id: 3,
            content: "From a plant killer to a plant parent, all thanks to Thryve's care guides and reminders.",
            author: "Ana Cruz",
            role: "Beginner Plant Collector",
            rating: 4,
        },
    ];

    return (
        <main className='relative z-50'>
            {/* Hero Banner */}
            <section className="relative min-h-screen flex items-center pt-20">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url(https://images.pexels.com/photos/32059881/pexels-photo-32059881/free-photo-of-vibrant-tropical-plant-in-sunlit-interior.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
                        backgroundBlendMode: "overlay",
                    }}
                >
                    <div className="absolute inset-0 bg-black/35"></div>
                </div>
                <div className="container relative z-10 text-white text-center">
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
                            Keep Your Plants Thriving with{' '}
                            <span className="italic">
                                th<span className="text-[#569F8B]">r</span>yve
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
                            The complete plant care management system that helps you nurture your green companions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up justify-center">
                            <button className="bg-[#569F8B] btn-accent text-center">
                                Download App
                            </button>
                            <Link to="/plant-store" className="px-6 py-3 font-semibold border-2 border-white rounded-md transition-all duration-300 hover:bg-white hover:text-primary">
                                Browse Shop
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section-padding bg-white">
                <div className="container">
                    <SectionHeading
                        title="How Thryve Works"
                        subtitle="Take the guesswork out of plant care with our easy-to-use features"
                        center={true}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="scroll-animation p-6 rounded-lg border border-gray-100 hover:border-secondary transition-all duration-300 text-center"
                            >
                                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/5 p-3">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-primary">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Plants */}
            <section className="section-padding bg-neutral">
                <div className="container">
                    <SectionHeading
                        title="Featured Plants"
                        subtitle="Discover our collection of beautiful, easy-to-care-for plants"
                        center={true}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredPlants.map((plant) => (
                            <div
                                key={plant.id}
                                className="scroll-animation card overflow-hidden"
                            >
                                <img src={plant.image} alt={plant.name} className="w-full h-64 object-cover" />
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-xl text-primary">{plant.name}</h3>
                                        <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full">
                                            {plant.size}
                                        </span>
                                    </div>
                                    <p className="font-semibold text-accent">{plant.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/plant-store" className="btn-primary">
                            View All Plants
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Store Section */}
            <section className="section-padding bg-white">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="scroll-animation order-2 md:order-1">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                                Welcome to Rosemar Garden
                            </h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Since 2000, Rosemar Garden has been your trusted floral partner, bringing over two decades of passion, creativity, and dedication to every bouquet we craft. From classic roses to vibrant mixed arrangements, we offer a wide variety of fresh plants tailored to every occasion.
                            </p>
                            <Link to="/about-us" className="btn-primary inline-block">
                                Learn More About Us
                            </Link>
                        </div>
                        <div className="scroll-animation order-1 md:order-2">
                            <img
                                src={rosemarGardenLoc}
                                alt="Rosemar Garden Location"
                                className="rounded-lg shadow-lg w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="section-padding bg-primary text-white">
                <div className="container">
                    <SectionHeading
                        title="Our Services"
                        subtitle="We provide a range of services to help you care for your plants"
                        center={true}
                        className="text-white"


                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="scroll-animation p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 transition-transform hover:scale-105">
                            <h3 className="text-xl font-semibold mb-4">Indoor & Outdoor Plant Sales</h3>
                            <p className="mb-4 text-neutral/90">Looking to green up your space? We offer a wide variety of indoor and outdoor plants, perfect for homes, offices, and gardens.</p>
                        </div>
                        <div className="scroll-animation p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 transition-transform hover:scale-105">
                            <h3 className="text-xl font-semibold mb-4">Fruit Trees & Edible Plants</h3>
                            <p className="mb-4 text-neutral/90">Grow your own food with our selection of fruit-bearing trees, herbs, and vegetables—ideal for sustainable and healthy living.</p>
                        </div>
                        <div className="scroll-animation p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 transition-transform hover:scale-105">
                            <h3 className="text-xl font-semibold mb-4">Pot Variety for Every Style</h3>
                            <p className="mb-4 text-neutral/90">From classic ceramic to modern plastic and eco-friendly terracotta, we've got the perfect pot to suit your plant's needs and your aesthetic.</p>
                        </div>
                        <div className="scroll-animation p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 transition-transform hover:scale-105">
                            <h3 className="text-xl font-semibold mb-4">Landscaping Services</h3>
                            <p className="mb-4 text-neutral/90">Transform your garden or outdoor area with our custom landscaping solutions designed to bring your vision to life.</p>
                        </div>
                        <div className="scroll-animation p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 transition-transform hover:scale-105">
                            <h3 className="text-xl font-semibold mb-4">Pool Grotto Installation</h3>
                            <p className="mb-4 text-neutral/90">Elevate your backyard with a professionally designed and installed pool grotto—bringing natural beauty and relaxation to your home.</p>
                        </div>
                        <div className="scroll-animation p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 transition-transform hover:scale-105">
                            <h3 className="text-xl font-semibold mb-4">On-Site Market Presence</h3>
                            <p className="mb-4 text-neutral/90">Conveniently located at the New Antipolo Public Market, visit us in person to see our full range of products and get expert plant care advice.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section-padding bg-neutral">
                <div className="container">
                    <SectionHeading
                        title="What Our Users Say"
                        subtitle="Don't just take our word for it - hear from our plant-loving community"
                        center={true}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="scroll-animation p-6 rounded-lg bg-white border border-gray-100 shadow-sm"
                            >
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={18}
                                            className={i < testimonial.rating ? "fill-accent text-accent" : "text-gray-300"}
                                        />
                                    ))}
                                </div>
                                <p className="mb-6 text-gray-600 italic">"{testimonial.content}"</p>
                                <div>
                                    <p className="font-semibold text-primary">{testimonial.author}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-accent py-16">
                <div className="container">
                    <div className="text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Level Up Your Plant Care?</h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Download the Thryve app today and start giving your plants the care they deserve.
                        </p>
                        <button className="px-8 py-4 bg-white text-accent font-semibold rounded-md shadow-lg transition-all hover:bg-opacity-90">
                            Download App Now
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomePage;