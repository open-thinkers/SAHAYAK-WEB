import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Loader from './Loader';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Extract unique values for dropdowns
const getUniqueValues = (data, columnIndex) => {
  return [...new Set(data.map(row => row[columnIndex]))];
};

const calculateAverages = (data) => {
  if (!data || data.length === 0) return [];
  const totalEntries = data.length;
  const sum = new Array(data[0].length).fill(0);

  data.forEach(row => {
    for (let i = 3; i < row.length; i++) {
      sum[i] += parseInt(row[i], 10) || 0; // Safeguard against NaN
    }
  });

  const averages = sum.map(s => (s / totalEntries).toFixed(2)).slice(3);
  return averages;
};

const Hotspot = () => {
  const [filters, setFilters] = useState({
    state: '',
    district: '',
    year: '',
  });
  const [crimeData, setCrimeData] = useState(null); // State for crime data
  const [filteredData, setFilteredData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://raw.githubusercontent.com/bhaluop/JSON-Store/main/WcData.json'); 
        const data = await response.json();
        setCrimeData(data);
        setFilteredData(data.data); // Set initial data to filteredData
        const averages = calculateAverages(data.data);
        const labels = data.fields.slice(3).map(field => field.label);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Average Crime Data',
              data: averages,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        });

        // Set initial districts
        const initialDistricts = getUniqueValues(data.data, 1);
        setDistricts(initialDistricts);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  
    // Reset district filter when state changes
    if (name === 'state') {
      // Clear district selection
      setFilters(prevFilters => ({
        ...prevFilters,
        district: ''
      }));
  
      // Update districts based on the selected state
      const updatedDistricts = getUniqueValues(
        crimeData.data.filter(row => row[0].toLowerCase() === value.toLowerCase()),
        1
      );
      setDistricts(updatedDistricts);
    }
  };



  const filterData = () => {
    if (!crimeData || !crimeData.data) return;
  
    const filtered = crimeData.data.filter((row) => {
      const matchesState = filters.state ? row[0].toLowerCase().includes(filters.state.toLowerCase()) : true;
      const matchesDistrict = filters.district ? row[1].toLowerCase().includes(filters.district.toLowerCase()) : true;
      const matchesYear = filters.year ? row[2].toLowerCase().includes(filters.year.toLowerCase()) : true;
  
      return matchesState && matchesDistrict && matchesYear;
    });
  
    setFilteredData(filtered);
    if (filtered.length > 0) {
      setShowTable(true);
      const averages = calculateAverages(filtered);
      setChartData({
        labels: crimeData.fields.slice(3).map(field => field.label),
        datasets: [
          {
            label: 'Filtered Crime Data',
            data: averages,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }
        ]
      });
    } else {
      setShowTable(false);
    }
  };
  

  // Handle loading and error states
  if (loading) return <Loader/>;
  if (error) return <div>{error}</div>;

  if (!crimeData) return null; // Prevent rendering before data is fetched

  const states = getUniqueValues(crimeData.data, 0);
  const years = getUniqueValues(crimeData.data, 2);

  return (
  <div className="p-6 max-w-full mx-auto bg-gray-100 rounded-lg shadow-lg">
    <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center md:text-left">Crime Against Women Search</h1>

    {/* Search Filters with Dropdowns */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label className="block mb-2 text-gray-600 font-medium text-sm md:text-base">State/UT</label>
        <select
          name="state"
          value={filters.state}
          onChange={handleFilterChange}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm md:text-base"
        >
          <option value="">Select state</option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-2 text-gray-600 font-medium text-sm md:text-base">District</label>
        <select
          name="district"
          value={filters.district}
          onChange={handleFilterChange}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm md:text-base"
        >
          <option value="">Select district</option>
          {districts.map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-2 text-gray-600 font-medium text-sm md:text-base">Year</label>
        <select
          name="year"
          value={filters.year}
          onChange={handleFilterChange}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm md:text-base"
        >
          <option value="">Select year</option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Search Button */}
    <button
      onClick={filterData}
      className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 w-full md:w-auto"
    >
      Search
    </button>

    {/* Bar Chart for Average or Filtered Data */}
    <div className="mb-6 h-64 md:h-96">
  <Bar 
    data={chartData} 
    options={{ 
      responsive: true, 
      maintainAspectRatio: false, 
      plugins: { 
        legend: { 
          position: 'top', 
          labels: { 
            font: { 
              size: 12, 
              md: { size: 16 } 
            } 
          } 
        }, 
        tooltip: { 
          callbacks: { 
            label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}` 
          } 
        } 
      },
      scales: {
        x: {
          ticks: {
            autoSkip: true,
            maxRotation: 45,
            minRotation: 0,
            font: {
              size: 8, // Adjusted size for better readability on mobile
              md: { size: 14 } // Larger size for desktop
            }
          },
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            display: true
          },
          ticks: {
            font: {
              size: 10, // Adjusted size for better readability on mobile
              md: { size: 14 } // Larger size for desktop
            }
          }
        }
      }
    }} 
  />
</div>

{showTable && (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          {crimeData.fields.map((field, index) => (
            <th key={index} className="py-2 px-4 text-nowrap">
              {field.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredData.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="py-2 px-4 text-center">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>

    )}
  </div>
);
}

export default Hotspot;