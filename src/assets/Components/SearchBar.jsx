import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState(''); 
  const [debouncedQuery, setDebouncedQuery] = useState(query); 
  const [options, setOptions] = useState([]); 
  const [filteredOptions, setFilteredOptions] = useState([]); 
  const [loading, setLoading] = useState(false);

  const sampleOptions = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew',
  ];

  const fetchOptions = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setOptions(sampleOptions); 
    setLoading(false);
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      const filtered = options.filter(option =>
        option.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options); 
    }
  }, [debouncedQuery, options]);
    
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query); 
    }, 500); 

    return () => clearTimeout(timer); 
  }, [query]);


  return (
    <div className="dropdown-search">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} 
      />

      {loading && <p>Loading options...</p>}
      <ul>
        {filteredOptions.map((option, index) => (
          <li key={index}>{option}</li> 
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
