import React, { useEffect, useState } from 'react';
import editIcon from '../images/editIcon.png';
import deleteIcon from '../images/deleteIcon.png';
import { base_url } from '../config';
import axios from 'axios'

const StatusAdmin = () => {
  const [areas, setAreas] = useState([]);
  const [searchArea, setSearchArea] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const fetchAllAreas = async (id, newName) => {
    try {
      const {data} = await axios.get(`${base_url}/area`)
      console.log(`data = ${data}`, JSON.stringify(data, null, 2))
      setAreas(data);
    } catch (error) {
      console.log(error);
    }
    };

  useEffect(() => {
    fetchAllAreas();
  },[])


  
  const handleSave = async (id, newName) => {
    try {
      if( isEdit ) {
        await axios.put(`${base_url}/area/${id}`, { name : newName });
      } else {
        await axios.post(`${base_url}/area`, { name: newName });
        setAreas(areas.map((area) => (area.id === id ? { ...area, name: newName, isEditing: false } : area)));
      }
    } catch (error) {
      console.error('Error updating area:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchArea(e.target.value);
  };

  const handleAddArea = () => {
  const newId = areas.length ? areas[areas.length - 1]._id + 1 : 1; // Update to use '_id' instead of 'id'
  const newArea = { _id: newId, name: '', status: 'red', isEditing: true }; // Ensure new area object matches existing structure
  setAreas([...areas, newArea]);
};


const toggleStatus = async (id) => {
  try {
    // Find the area index in the array
    const areaIndex = areas.findIndex(area => area._id === id);
    if (areaIndex === -1) return; // If area not found, exit

    // Update the local state optimistically
    const updatedAreas = [...areas];
    updatedAreas[areaIndex] = {
      ...updatedAreas[areaIndex],
      status: updatedAreas[areaIndex].status === 'inactive' ? 'active' : 'inactive'
    };
    setAreas(updatedAreas);

    // Make the server update request using the updated status
    await axios.put(`${base_url}/area/${id}`, { status: updatedAreas[areaIndex].status });
    console.log('Status updated on the server');
  } catch (error) {
    console.error('Failed to update status on the server:', error);
    // Revert local state if server update fails
    fetchAllAreas(); // Reload areas from server
  }
};

  
  

  const handleEdit = async (id) => {
    setIsEdit(true);
    setAreas(areas.map((area) => (area._id === id ? { ...area, isEditing: true } : area)));
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`${base_url}/area/${id}`);
      setAreas(areas.filter((area) => area._id !== id));
    } catch (error) {
      console.error('Error deleting area:', error);
    }
  };

  return (
    <div className="p-[7%]">
      <h2 className="text-4xl font-semibold text-center mb-6">Status Page</h2>
      <div className="flex justify-center mb-8">
        {/* search area */}
        <input
          type="text"
          placeholder="Search"
          value={searchArea}
          onChange={handleSearchChange}
          className="border bg-[#505150] text-center text-white placeholder-white rounded-full w-[117px] p-2 mr-4"
        />
        {/* add button */}
        <button
          onClick={handleAddArea}
          className="bg-[#505150] text-white py-2 px-10 rounded-full hover:bg-gray-400"
        >
          Add
        </button>
      </div>
      {/* table for status area name edit delete */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Status</th>
            <th className="py-2 text-left">Area Name</th>
            <th className="py-2">Edit</th>
            <th className="py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {areas
            .filter((area) =>
              area.name.toLowerCase().includes(searchArea.toLowerCase())
            )
            .map((area) => (
              <tr key={area.id} className="border-t">
                <td className="py-2 text-center">
                  <button
                    onClick={() => toggleStatus(area._id)}
                    className={`h-6 w-6 rounded-full ${area.status === 'inactive' ? 'bg-[#FF9595]' : 'bg-[#AAFF95]'}`}
                  ></button>
                </td>
                <td className="py-2">
                  {area.isEditing ? (
                    <input
                      type="text"
                      defaultValue={area.name}
                      onBlur={ (e) => handleSave(area._id, e.target.value)}
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                  ) : (
                    area.name
                  )}
                </td>
                <td className="py-2 text-center">
                  <button onClick={() => handleEdit(area._id)}>
                    <img src={editIcon} alt="edit" className="h-6 w-6 inline" />
                  </button>
                </td>
                <td className="py-2 text-center">
                  <button onClick={() => handleDelete(area._id)}>
                    <img src={deleteIcon} alt="delete" className="h-6 w-6 inline" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatusAdmin;