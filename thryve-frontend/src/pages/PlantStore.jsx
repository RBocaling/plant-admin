import { useState } from 'react';
import { Search, Filter, ChevronDown, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PlantGrid from '../components/PlantGrid.jsx';
import PlantDetailModal from '@/components/PlantDetailModal';
import HeroBanner from "../assets/Plant Store HeroBanner.png";
import plantsData from '../data/PlantsData.js';

// Filter categories and their items
const filterCategories = [
  {
    name: 'All Plants',
    value: 'all'
  },
  {
    name: 'Flowering',
    value: 'flowering',
    items: ['Santan', 'Pandacaqui', 'White Angel', 'Rosal', 'Daisy']
  },
  {
    name: 'Orchids',
    value: 'orchids',
    items: ['Phallinopsis', "Vanda's", 'Vanda Straf', 'Dancing Lady', 'Dendro']
  },
  {
    name: 'Fruit Trees',
    value: 'fruit-trees',
    items: ['Calamansi', 'Lemon', 'Pamela', 'Sampaloc', 'Pirante Orange']
  },
  {
    name: 'Vegetables',
    value: 'vegetables',
    items: ['Talong', 'Sitaw', 'Okra', 'Sili Sigang', 'Kamatis']
  },
  {
    name: 'Herbs',
    value: 'herbs',
    items: ['Basil', 'Mint', 'Taragon', 'Italian Orgnanic', 'Rosemary']
  },
  {
    name: 'Hanging/Vines',
    value: 'hanging',
    items: ['Basil', 'Mint', 'Taragon', 'Italian Orgnanic', 'Rosemary']
  },
  {
    name: 'Pine Trees',
    value: 'pine-trees',
    items: ['Araucaria', 'Needle Pine', 'Silver Pine', 'Italian Pine', 'Cypress']
  },
  {
    name: 'Trees',
    value: 'trees',
    items: ['Fire Tree', 'Tabebuya', 'Melindres', 'Powder Puff', 'Talisay Tree']
  },
  {
    name: 'Plants',
    value: 'plants',
    items: ['Palmera', 'Red Palm', 'Blue Palm', 'Fishtail', 'Royal Palm']
  },
  {
    name: 'Bamboo',
    value: 'bamboo',
    items: ['Thai Bamboo', 'Japanese Bamboo', 'Chinese Bamboo', 'Buddha Bamboo']
  },
  {
    name: 'Indoor',
    value: 'indoor',
    items: ['Sanado', 'Peace Lily', 'Caladium', 'Philodendron', 'Bromeliad']
  },
  {
    name: 'Cactus',
    value: 'cactus',
    items: ['Jade Plant', 'Fortune Plant', 'Prosperity Bamboo', 'Money Tree']
  },
  {
    name: 'Fertilizer',
    value: 'fertilizer',
    items: ['Seven', 'Dithane', 'Lannate', 'Osmocote', 'Turton']
  },
  {
    name: 'Seedling Bag',
    value: 'seedling',
    items: ['Seedling Tray']
  },
  {
    name: 'Soil Bag',
    value: 'soil',
    items: ['Organic', 'Loam Soil', 'Mixed Soil', 'Garden Soil']
  },
  {
    name: 'Coco',
    value: 'coco',
    items: ['Cocopeat', 'Cocohusk', 'Cocofiber', 'Coco Cubes', 'Coco Chop']
  },
  {
    name: 'Step Bricks',
    value: 'bricks',
    items: ['Step Brick']
  },
  {
    name: 'Pots',
    value: 'pots',
    items: ['Clay Pot', 'Plastic Pot', 'Cement Pot', 'Hanging Pot']
  }
];

const PlantStore = () => {
  const [filter, setFilter] = useState('all');
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const itemsPerPage = 12;


  // Filter plants based on category and search term
  const filteredPlants = plantsData.filter(plant => {
    const matchesCategory = filter === 'all' || plant.category === filter;
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (plant.scientificName && plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sort plants based on selected option
  const sortedPlants = [...filteredPlants].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.sizes[0].price - b.sizes[0].price;
      case 'price-desc':
        return b.sizes[0].price - a.sizes[0].price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Paginate plants
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlants = sortedPlants.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedPlants.length / itemsPerPage);


  console.log('Current plants:', currentPlants);
  console.log('Selected item:', selectedPlant);

  // Open item detail dialog
  const handlePlantClick = (plant) => {
    console.log('Clicked item:', plant);
    setSelectedPlant(plant);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlant(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Handle size selection and update price
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  // Toggle filter visibility
  const toggleFilterVisibility = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleContactSeller = (plant) => {
    toast.success("Interest Recorded!", {
      description: `We've noted your interest in ${plant.name}. A seller will contact you soon.`
    });
    handleCloseModal();
  };

  return (
    <div className="pt-20">
      {/* Hero Banner Section */}
      <section className="relative">
        <div className="absolute inset-0">
          <img
            src={HeroBanner}
            alt="Plant Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white bg-opacity-80"></div>
        </div>
        <div className="container relative z-10 text-center py-24 md:py-32">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Rosemar Garden Plant Store
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-600">
            Discover our carefully curated collection of beautiful, healthy plants for your home.
          </p>
        </div>
      </section>

      {/* Store Section */}
      <section className="section-padding bg-white py-12">
        <div className="container">
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search something..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Button */}
              <button
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-md border border-gray-300"
                onClick={toggleFilterVisibility}
              >
                <Filter size={18} />
                Filter
                <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Sort */}
              <div className="w-full md:w-48 lg:w-64">
                <Select value={sortOption} onValueChange={(value) => setSortOption(value)}>
                  <SelectTrigger className="w-full bg-white border border-gray-300">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="default" className="[&>span:first-child]:hidden">Default</SelectItem>
                    <SelectItem value="price-asc" className="[&>span:first-child]:hidden">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc" className="[&>span:first-child]:hidden">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc" className="[&>span:first-child]:hidden">Name: A to Z</SelectItem>
                    <SelectItem value="name-desc" className="[&>span:first-child]:hidden">Name: Z to A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filter Categories */}
            {isFilterOpen && (
              <div className="overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex flex-nowrap gap-2 min-w-max">
                  {filterCategories.map((category) => (
                    <button
                      key={category.value}
                      className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${filter === category.value
                        ? 'bg-primary text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      onClick={() => setFilter(category.value)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <PlantGrid plants={currentPlants} onPlantClick={handlePlantClick} />

          {/* Pagination - Updated to match image reference */}
          {sortedPlants.length > itemsPerPage && (
            <div className="mt-12 flex justify-center">
              <div className="inline-flex items-center gap-2 bg-white rounded-md p-2 shadow-sm">
                <button
                  onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                  className={`px-4 py-2 text-sm font-medium rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-gray-100'
                    }`}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {Array.from({ length: Math.min(totalPages, 6) }, (_, i) => {
                  let pageNumber;

                  if (totalPages <= 6) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 5 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`size-8 flex items-center justify-center rounded-full ${currentPage === pageNumber
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  className={`px-4 py-2 text-sm font-medium rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-gray-100'
                    }`}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {/* Plant Detail Modal */}
          <PlantDetailModal
            plant={selectedPlant}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onContactSeller={handleContactSeller}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="bg-primary rounded-lg p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Help Finding the Right Plant?</h2>
              <p className="mb-6 text-neutral/90">
                Our plant experts are here to help you find the perfect plant for your space and lifestyle.
              </p>
              <button className="bg-white text-primary font-medium px-6 py-3 rounded-md transition-colors hover:bg-neutral">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlantStore;