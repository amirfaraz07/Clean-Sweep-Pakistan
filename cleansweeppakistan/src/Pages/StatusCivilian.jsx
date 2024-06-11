import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base_url } from '../config';

const StatusCivilian = () => {
  const [areas, setAreas] = useState([]);
  const [searchArea, setSearchArea] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

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

  const handleSearchChange = (e) => {
    setSearchArea(e.target.value);
  };

  const handleSearchFocus = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchBlur = () => {
    setIsSearchExpanded(false);
  };

  return (
    <div className="p-[7%]">
      <h2 className="text-4xl font-semibold text-center mb-6">Status Page</h2>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search"
          value={searchArea}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          className={`border bg-[#505150] text-center text-white placeholder-white rounded-full p-2 transition-width duration-300 ${
            isSearchExpanded ? 'w-[50%]' : 'w-32'
          }`}
        />
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Status</th>
            <th className="py-2 text-left">Area Name</th>
            <th className="py-2 text-center">Launch a Complaint</th>
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
                    className={`h-6 w-6 rounded-full ${area.status === 'inactive' ? 'bg-[#FF9595]' : 'bg-[#AAFF95]'}`}
                    disabled
                  ></button>
                </td>
                <td className="py-2">{area.name}</td>
                <td className="py-2 text-center">
                  <Link to='/complain-hub'>
                    <button className="bg-[#505150] text-white py-2 px-4 rounded-full hover:bg-gray-400">
                      Launch
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatusCivilian;