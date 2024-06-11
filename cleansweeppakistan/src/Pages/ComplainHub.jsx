import React, { useState } from 'react';
import axios from 'axios';
import { base_url, imageDB } from '../config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ComplainHub = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    email: '',
    areaName: ''
  });
  const [submitting, setSubmitting] = useState(false); // State variable for submission status
  const [submitSuccess, setSubmitSuccess] = useState(false); // State variable for submission success

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 4);
      setSelectedImages(filesArray);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Start submitting

    try {
      const uploadPromises = selectedImages.map(async (image) => {
        const imageName = `${Date.now()}_${image.name}`;
        const storageRef = ref(imageDB, `complaints/${imageName}`);
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);
        return imageUrl;
      });

      const imageUrls = await Promise.all(uploadPromises);

      const complaintData = {
        ...formData,
        images: imageUrls
      };

      await axios.post(`${base_url}/complain`, complaintData);
      console.log('Complaint submitted successfully!');
      setSubmitSuccess(true); // Set submit success
    } catch (error) {
      console.error('Failed to submit complaint:', error);
    } finally {
      setSubmitting(false); // End submitting
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6">
      <form onSubmit={handleSubmit}>
        <h2 className="text-4xl font-semibold text-center mb-12">Complain Hub</h2>

        <div className="mb-4 flex space-x-4">
          <input 
            type="text" 
            placeholder="Name" 
            className="w-1/2 p-3 border border-gray-300 rounded-full"
            value={formData.name}
            onChange={handleChange}
            name="name"
            required
          />
          <input 
            type="text" 
            placeholder="Phone Number" 
            className="w-1/2 p-3 border border-gray-300 rounded-full"
            value={formData.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            required
          />
        </div>
        
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Address" 
            className="w-full p-3 border border-gray-300 rounded-full"
            value={formData.address}
            onChange={handleChange}
            name="address"
            required
          />
        </div>
        
        <div className="mb-4 flex space-x-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-1/2 p-3 border border-gray-300 rounded-full"
            value={formData.email}
            onChange={handleChange}
            name="email"
            required
          />
          <input 
            type="text" 
            placeholder="Area Name" 
            className="w-1/2 p-3 border border-gray-300 rounded-full"
            value={formData.areaName}
            onChange={handleChange}
            name="areaName"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block font-medium mb-2">Upload Images (up to 4)</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-full"
            multiple
          />
          {selectedImages.length > 0 && (
            <div className="mt-4 flex gap-1">
              {selectedImages.map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt={`Selected ${index + 1}`} className="w-32 h-32 object-cover"/>
              ))}
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="h-25 w-[35%] bg-[#505150] text-white py-3 rounded-full font-semibold hover:bg-gray-400 transition duration-300 mx-auto block"
          disabled={submitting} // Disable button while submitting
        >
          {submitting ? 'Submitting...' : 'Submit'} {/* Change button text based on submission status */}
        </button>
        {submitting && <p className="text-center mt-3 text-gray-500">Submitting complaint...</p>} {/* Display submitting message */}
        {submitSuccess && <p className="text-center mt-3 text-green-500">Complaint submitted successfully!</p>} {/* Display success message */}
      </form>
    </div>
  );
}

export default ComplainHub
