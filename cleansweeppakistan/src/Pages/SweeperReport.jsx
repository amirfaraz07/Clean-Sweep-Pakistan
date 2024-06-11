// import React, { useState } from 'react';
// import editIcon from '../images/editIcon.png';
// import deleteIcon from '../images/deleteIcon.png';

// const SweeperReport = () => {
//   const [areas, setAreas] = useState([
//     { id: 1, sweeperId: 'ID-7xxxx0', name: 'Lucky', complaints: 5 },
//     { id: 2, sweeperId: 'ID-7xxxx6', name: 'Chris', complaints: 3 },
//     { id: 3, sweeperId: 'ID-7xxxx4', name: 'Cheema', complaints: 8 },
//   ]);
//   const [searchArea, setSearchArea] = useState('');
//   const [newArea, setNewArea] = useState(false);

//   const handleSearchChange = (e) => {
//     setSearchArea(e.target.value);
//   };

//   const handleAddArea = () => {
//     const newId = areas.length ? areas[areas.length - 1].id + 1 : 1;
//     setAreas([...areas, { id: newId, sweeperId: '', name: '', complaints: 0, isEditing: true }]);
//     setNewArea(true);
//   };

//   const handleSave = (id, key, value) => {
//     setAreas(
//       areas.map((area) =>
//         area.id === id ? { ...area, [key]: value, isEditing: false } : area
//       )
//     );
//     setNewArea(false);
//   };

//   const handleEdit = (id) => {
//     setAreas(areas.map((area) => (area.id === id ? { ...area, isEditing: true } : area)));
//   };

//   const handleDelete = (id) => {
//     setAreas(areas.filter((area) => area.id !== id));
//   };

//   return (
//     <div className="p-[7%]">
//       <h2 className="text-4xl font-semibold text-center mb-6">Sweeper's Report</h2>
//       <div className="flex justify-center mb-8">
//         {/* search area */}
//         <input
//           type="text"
//           placeholder="Search"
//           value={searchArea}
//           onChange={handleSearchChange}
//           className="border bg-[#505150] text-center text-white placeholder-white rounded-full w-[117px] p-2 mr-4"
//         />
//         {/* add button */}
//         <button
//           onClick={handleAddArea}
//           className="bg-[#505150] text-white py-2 px-10 rounded-full hover:bg-gray-400"
//         >
//           Add
//         </button>
//       </div>
//       {/* table for status area name edit delete */}

//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="py-2">Sweeper's ID</th>
//             <th className="py-2 text-left">Sweeper's Name</th>
//             <th className="py-2">No. of Complaints</th>
//             <th className="py-2">Edit</th>
//             <th className="py-2">Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {areas
//             .filter((area) =>
//               area.name.toLowerCase().includes(searchArea.toLowerCase())
//             )
//             .map((area) => (
//               <tr key={area.id} className="border-t">
//                 <td className="py-2 text-center">
//                   {area.isEditing ? (
//                     <input
//                       type="text"
//                       placeholder='Enter Sweeper id'
//                       defaultValue={area.sweeperId}
//                       onBlur={(e) => handleSave(area.id, 'sweeperId', e.target.value)}
//                       className="border border-gray-300 rounded p-2"
//                     />
//                   ) : (
//                     area.sweeperId
//                   )}
//                 </td>
//                 <td className="py-2">
//                   {area.isEditing ? (
//                     <input
//                       type="text"
//                       defaultValue={area.name}
//                       onBlur={(e) => handleSave(area.id, 'name', e.target.value)}
//                       className="border border-gray-300 rounded p-2 w-full"
//                     />
//                   ) : (
//                     area.name
//                   )}
//                 </td>
//                 <td className="py-2 text-center">
//                   {area.isEditing ? (
//                     <input
//                       type="number"
//                       defaultValue={area.complaints}
//                       onBlur={(e) => handleSave(area.id, 'complaints', e.target.value)}
//                       className="border border-gray-300 rounded p-2 w-full"
//                     />
//                   ) : (
//                     area.complaints
//                   )}
//                 </td>
//                 <td className="py-2 text-center">
//                   <button onClick={() => handleEdit(area.id)}>
//                     <img src={editIcon} alt="edit" className="h-6 w-6 inline" />
//                   </button>
//                 </td>
//                 <td className="py-2 text-center">
//                   <button onClick={() => handleDelete(area.id)}>
//                     <img src={deleteIcon} alt="delete" className="h-6 w-6 inline" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default SweeperReport;

import React, { useState, useEffect } from 'react';
import editIcon from '../images/editIcon.png';
import deleteIcon from '../images/deleteIcon.png';
import axios from 'axios';
import { base_url } from '../config';

const SweeperReport = () => {
  const [sweepers, setSweepers] = useState([]);
  const [searchArea, setSearchArea] = useState('');

  useEffect(() => {
    fetchSweepers();
  }, []);

  const fetchSweepers = async () => {
    try {
      const response = await axios.get(`${base_url}/sweeper`);
      setSweepers(response.data);
    } catch (error) {
      console.error('Error fetching sweepers:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchArea(e.target.value);
  };

  const handleAddSweeper = () => {
    const newSweeper = { sweeperId: '', name: '', numberOfComplaints: 0, isEditing: true };
    setSweepers([...sweepers, newSweeper]);
  };

  const handleSave = async (id, key, value) => {
    try {
      const updatedSweepers = sweepers.map((sweeper) =>
        sweeper._id === id ? { ...sweeper, [key]: value, isEditing: false } : sweeper
      );
      setSweepers(updatedSweepers);

      const sweeperToSave = updatedSweepers.find((sweeper) => sweeper._id === id);
      if (id) {
        await axios.put(`${base_url}/sweeper/${id}`, sweeperToSave);
      } else {
        const response = await axios.post(`${base_url}/sweeper`, sweeperToSave);
        setSweepers(sweepers.map((sweeper) => (sweeper.isEditing ? response.data : sweeper)));
      }
    } catch (error) {
      console.error('Error saving sweeper:', error);
    }
  };

  const handleEdit = (id) => {
    setSweepers(sweepers.map((sweeper) => (sweeper._id === id ? { ...sweeper, isEditing: true } : sweeper)));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${base_url}/sweeper/${id}`);
      setSweepers(sweepers.filter((sweeper) => sweeper._id !== id));
    } catch (error) {
      console.error('Error deleting sweeper:', error);
    }
  };

  return (
    <div className="p-[7%]">
      <h2 className="text-4xl font-semibold text-center mb-6">Sweeper's Report</h2>
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
          onClick={handleAddSweeper}
          className="bg-[#505150] text-white py-2 px-10 rounded-full hover:bg-gray-400"
        >
          Add
        </button>
      </div>
      {/* table for status area name edit delete */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Sweeper's ID</th>
            <th className="py-2 text-left">Sweeper's Name</th>
            <th className="py-2">No. of Complaints</th>
            <th className="py-2">Edit</th>
            <th className="py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {sweepers
            .filter((sweeper) => sweeper.name.toLowerCase().includes(searchArea.toLowerCase()))
            .map((sweeper) => (
              <tr key={sweeper._id} className="border-t">
                <td className="py-2 text-center">
                  {sweeper.isEditing ? (
                    <input
                      type="text"
                      placeholder="Enter Sweeper id"
                      defaultValue={sweeper.sweeperId}
                      onBlur={(e) => handleSave(sweeper._id, 'sweeperId', e.target.value)}
                      className="border border-gray-300 rounded p-2"
                    />
                  ) : (
                    sweeper.sweeperId
                  )}
                </td>
                <td className="py-2">
                  {sweeper.isEditing ? (
                    <input
                      type="text"
                      defaultValue={sweeper.name}
                      onBlur={(e) => handleSave(sweeper._id, 'name', e.target.value)}
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                  ) : (
                    sweeper.name
                  )}
                </td>
                <td className="py-2 text-center">
                  {sweeper.isEditing ? (
                    <input
                      type="number"
                      defaultValue={sweeper.numberOfComplaints}
                      onBlur={(e) => handleSave(sweeper._id, 'numberOfComplaints', e.target.value)}
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                  ) : (
                    sweeper.numberOfComplaints
                  )}
                </td>
                <td className="py-2 text-center">
                  <button onClick={() => handleEdit(sweeper._id)}>
                    <img src={editIcon} alt="edit" className="h-6 w-6 inline" />
                  </button>
                </td>
                <td className="py-2 text-center">
                  <button onClick={() => handleDelete(sweeper._id)}>
                    <img src={deleteIcon} alt="delete" className="h-6 w-6 inline" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default SweeperReport;
