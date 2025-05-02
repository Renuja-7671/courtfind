import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AddArenaForm = () => {
  const navigate = useNavigate();
  // State variables for form inputs
  const [arenaName, setArenaName] = useState('');
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh

    // Simple validation
    if (!arenaName || !streetName || !city) {
      setError('All fields are required');
      return;
    }

    setError(''); // Clear error if validation passes

    // Send the data to the backend API
    fetch("http://localhost:8000/api/owner/arenas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        arenaName,
        streetName,
        city,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message); // Display success message
          setArenaName(''); // Reset form fields
          setStreetName('');
          setCity('');

          navigate("/add-courts"); // Navigate to the next page after success
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while adding the arena.");
      });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Add Arena</h2>
      <form onSubmit={handleSubmit}>
        {/* Arena Name */}
        <div>
          <label>Name of the Arena</label>
          <input 
            type="text" 
            value={arenaName} 
            onChange={(e) => setArenaName(e.target.value)} 
            placeholder="Ground Name"
            style={{ 
              width: '100%', 
              padding: '8px', 
              margin: '10px 0', 
              borderRadius: '8px', // Rounded edges 
              border: '1px solid #ccc' 
            }}
          />
        </div>

        {/* Address - Street Name */}
        <div>
          <label>Address</label>
          <input 
            type="text" 
            value={streetName} 
            onChange={(e) => setStreetName(e.target.value)} 
            placeholder="Street Name"
            style={{ 
              width: '100%', 
              padding: '8px', 
              margin: '10px 0', 
              borderRadius: '8px', //  Rounded edges 
              border: '1px solid #ccc' 
            }}
          />
          {/* Address - City */}
          <input 
            type="text" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            placeholder="City"
            style={{ 
              width: '100%', 
              padding: '8px', 
              margin: '10px 0', 
              borderRadius: '8px', // ✅ Rounded edges 
              border: '1px solid #ccc' 
            }}
          />
        </div>

        {/* Error Message */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p style={{ marginTop: '10px' }}>Click Next to add a court</p>

        {/* Next Button */}
        <button 
          type="submit"
          style={{ 
            backgroundColor: '#0C57EC', 
            color: 'white', 
            padding: '10px', 
            width: '30%', 
            marginTop: '10px', 
            marginRight: 'auto',
            borderRadius: '8px', // ✅ Rounded edges 
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default AddArenaForm;
