'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import {
  Search,
  ArrowUpDown,
  Download,
  Eye,
  X,
  Plus,
  Pen,
    Trash,
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { getAllPlants, updatePlant, deletePlant } from '../api/plant';
import { addPlant } from '../api/plant';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import Modal from '@/components/ui/modal';
import api, { baseURL } from '@/services/api';

const PlantCms = () => {
   const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    scientificName: '',
    genus: '',
    description: '',
    price: '',
    watering: '',
    fertilizing: '',
    note: '',
    harvesting: '',
    categoryId: '',
    image: null,
    galleryImages: [],
  });

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const data = await getAllPlants();
        setPlants(data);
        const uniqueCategories = Array.from(
          new Map(data.map((item) => [item.category.id, item.category])).values()
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };
    fetchPlants();
  }, []);

  const handleSubmit = async () => {
  const form = new FormData();

  for (const key in formData) {
    if (key === 'galleryImages') {
      if (formData.galleryImages.length > 0) {
        formData.galleryImages.forEach((file) => form.append('galleryImages', file));
      }
    } else if (key === 'image') {
      if (formData.image) {
        form.append('image', formData.image);
      }
    } else {
      const value = formData[key] || (editMode && selectedPlant ? selectedPlant[key] : '');
      form.append(key, value);
    }
  }

  try {
    if (editMode && selectedPlant) {
      await updatePlant(selectedPlant.id, form);
      alert('Plant updated successfully!');
    } else {
      await addPlant(form);
      alert('Plant added successfully!');
    }

    const updatedPlants = await getAllPlants();
    setPlants(updatedPlants);
    resetForm();
  } catch (error) {
    alert(editMode ? 'Failed to update plant.' : 'Failed to add plant.');
  }
};

  const resetForm = () => {
    setFormData({
      name: '',
      scientificName: '',
      genus: '',
      description: '',
      price: '',
      watering: '',
      fertilizing: '',
      note: '',
      harvesting: '',
      categoryId: '',
      image: null,
      galleryImages: [],
    });
    setSelectedPlant(null);
    setAddModalOpen(false);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'galleryImages' ? Array.from(files) : files[0],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const filteredPlants = plants.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedPlants = [...filteredPlants].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleExport = () => {
    if (!plants.length) {
      alert('No plant data to export.');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Plant Catalog Report', 14, 20);

    const headers = [['Name', 'Scientific Name', 'Genus', 'Price', 'Watering', 'Fertilizing', 'Harvesting', 'Category']];
    const data = plants.map((item) => [
      item.name,
      item.scientificName,
      item.genus,
      item.price,
      item.watering,
      item.fertilizing,
      item.harvesting,
      item.category.name,
    ]);

    autoTable(doc, {
      startY: 30,
      head: headers,
      body: data,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [74, 124, 89] },
    });

    doc.save('plant_report.pdf');
  };

  const handleViewImage = (plant) => {
    setSelectedPlant(plant);
    setModalOpen(true);
  };

  const handleEdit = (plant) => {
    setSelectedPlant(plant);
    setFormData({
      name: plant.name,
      scientificName: plant.scientificName,
      genus: plant.genus,
      description: plant.description,
      price: plant.price,
      watering: plant.watering,
      fertilizing: plant.fertilizing,
      note: plant.note,
      harvesting: plant.harvesting,
      categoryId: plant.categoryId,
      image: null,
      galleryImages: [],
    });
    setAddModalOpen(true);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this plant?');
    if (!confirm) return;

    try {
      await deletePlant(id);
      const updatedPlants = await getAllPlants();
      setPlants(updatedPlants);
      alert('Plant deleted successfully!');
    } catch (error) {
      alert('Failed to delete plant.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Plant CMS</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-[#4A7C59] text-white hover:bg-[#4A7C59]/90"
            onClick={() => setAddModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Plant
          </Button>
          <Button
            variant="outline"
            className="bg-[#4A7C59] text-white hover:bg-[#4A7C59]/90"
            onClick={handleExport}
          >
            Export Plants
            <Download className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <Input
              type="text"
              placeholder="Search by plant name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('name')}>
                  <div className="flex items-center space-x-1">
                    <span>Plant Name</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="px-4 py-3">Scientific Name</th>
                <th className="px-4 py-3">Genus</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Watering</th>
                <th className="px-4 py-3">Fertilizing</th>
                <th className="px-4 py-3">Harvesting</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedPlants.length > 0 ? (
                sortedPlants.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-sm">{item.scientificName}</td>
                    <td className="px-4 py-3 text-sm">{item.genus}</td>
                    <td className="px-4 py-3 text-sm">₱{item.price}</td>
                    <td className="px-4 py-3 text-sm">{item.watering}</td>
                    <td className="px-4 py-3 text-sm">{item.fertilizing}</td>
                    <td className="px-4 py-3 text-sm">{item.harvesting}</td>
                    <td className="px-4 py-3 text-sm">{item.category?.name}</td>
                    <td className="px-4 py-3 text-sm">
                      <Button variant="ghost" size="sm" onClick={() => handleViewImage(item)}>
                        <Eye size={16} className="mr-1" /> View
                      </Button>
                    </td>
                    <td className="px-4 py-3 text-sm flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                        <Pen size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                        <Trash size={16} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-4 py-3 text-center text-gray-500">
                    No plant data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    <Modal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  title={`${selectedPlant?.name} Gallery`}
  onSave={() => setModalOpen(false)}
  saveLabel="Close"
  cancelLabel=""
>
  <Swiper
    navigation
    modules={[Navigation]}
    spaceBetween={20}
    slidesPerView={1}
    className="rounded-md"
  >
    {selectedPlant?.galleryImages?.map((img, idx) => (
      <SwiperSlide key={idx}>
        <img
          src={`${baseURL.replace("/api", "")}/uploads/${img.imageUrl}`}
          alt={`Plant ${selectedPlant.name}`}
          className="w-full h-[400px] object-contain rounded-md"
        />
      </SwiperSlide>
    ))}
  </Swiper>
</Modal>


   <Modal
  isOpen={addModalOpen}
  onClose={resetForm}
  title={editMode ? 'Edit Plant' : 'Add Plant'}
  onSave={handleSubmit}
>
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Name</label>
    <Input required type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />

    <label className="block text-sm font-medium text-gray-700">Scientific Name</label>
    <Input required type="text" name="scientificName" placeholder="Scientific Name" value={formData.scientificName} onChange={handleInputChange} />

    <label className="block text-sm font-medium text-gray-700">Genus</label>
    <Input required type="text" name="genus" placeholder="Genus" value={formData.genus} onChange={handleInputChange} />

    <label className="block text-sm font-medium text-gray-700">Description</label>
    <Input required type="text" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} />

    <label className="block text-sm font-medium text-gray-700">Price</label>
    <Input required type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} />

    <label className="block text-sm font-medium text-gray-700">Note</label>
    <Input type="text" name="note" placeholder="Note" value={formData.note} onChange={handleInputChange} />

    <label className="block text-sm font-medium text-gray-700">Watering</label>
    <select required name="watering" value={formData.watering} onChange={handleInputChange} className="w-full border rounded px-3 py-2">
      <option value="">Select Watering</option>
      <option value="daily">Daily</option>
      <option value="twice_a_week">Twice a week</option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
    </select>

    <label className="block text-sm font-medium text-gray-700">Fertilizing</label>
    <select required name="fertilizing" value={formData.fertilizing} onChange={handleInputChange} className="w-full border rounded px-3 py-2">
      <option value="">Select Fertilizing</option>
      <option value="daily">Daily</option>
      <option value="twice_a_week">Twice a week</option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
    </select>

    <label className="block text-sm font-medium text-gray-700">Harvesting</label>
    <select required name="harvesting" value={formData.harvesting} onChange={handleInputChange} className="w-full border rounded px-3 py-2">
      <option value="">Select Harvesting</option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
      <option value="every 3 months">Every 3 months</option>
      <option value="every 6 months">Every 6 months</option>
      <option value="yearly">Yearly</option>
    </select>

    <label className="block text-sm font-medium text-gray-700">Category</label>
    <select required name="categoryId" value={formData.categoryId} onChange={handleInputChange} className="w-full border rounded px-3 py-2">
      <option value="">Select Category</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>{cat.name}</option>
      ))}
    </select>

    {!editMode && (
      <>
        <div>
          <label className="block text-sm font-medium text-gray-700">Plant Profile Image</label>
          <input required name="image" type="file" onChange={handleInputChange} />
        </div>
        <br />
        <div>
          <label className="block text-sm font-medium text-gray-700">Plant Multiple Images</label>
          <input required name="galleryImages" type="file" multiple onChange={handleInputChange} />
        </div>
      </>
    )}
  </div>
</Modal>


    </div>
  );
};

export default PlantCms;
