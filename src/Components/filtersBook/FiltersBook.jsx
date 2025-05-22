import React, { useState ,useEffect} from "react";
import './FiltersBook.css'

const FiltersBook = ({ onFilterChange }) => {
  return (
      <div className='main'>
      <div className="titlee">
        Filters:
      </div>

      <hr className="line" />

      <div className="groups">
        <div className="filter-grp">
          <div className="left">
          <h3>Category <span>Clear</span></h3>
          <label><input type="checkbox" /> Mental Health</label>
          <label><input type="checkbox" /> Psychology</label>
          <label><input type="checkbox" /> Personal Development</label>
          <label><input type="checkbox" /> Spiritual Growth</label>
          </div>
          
        </div>
        
        <hr className="line" />

        <div className="filter-grp">
        <h3>Target Audience <span>Clear</span></h3>
        <label><input type="radio" name="gender" /> Couples</label>
        <label><input type="radio" name="gender" /> Adults</label>
        <label><input type="radio" name="gender" /> Teens</label>
        </div>

        <hr className="line" />

        <div className="filter-grp">
          <h3>Language Spoken <span>Clear</span></h3>
          <div className="buttons">
            <button>Arabic</button>
            <button>English</button>
            <button>French</button>
          </div>
        </div>

        <hr className="line" />

        <div className="filter-grp">
        <h3>Availability <span>Clear</span></h3>
        <button>Available Today</button>
        <button>Available this week</button>
        <button>Available this Month</button>
        </div>

        <hr className="line" />

        <div className="filter-grp">
        <h3>Purpose <span>Clear</span></h3>
        <button>Self-Healing</button>
        <button>Understand Mental Health</button>
        <button>Improve Relationships</button>
        <button>Spiritual Growth</button>
        </div>

        <hr className="line" />

        <div className="filter-grp">
        <h3>Price Range <span>Clear</span></h3>
        <input type="range" min="900" max="2000" />
        </div>

        <hr className="line" />

        <div className="filter-grp">
          <button className="clear-btn">Clear</button>
          <button className="apply-btn">Apply</button>
        </div>
      </div>
    </div>
  )
}

export default FiltersBook





/**
  <div className='main'>
      <div className="titlee">Filters:</div>
      <hr className="line" />

      <div className="filter-grp">
        <h3>Language <span onClick={() => handleButtonClick('language', '')}>Clear</span></h3>
        <div className="buttons">
                {LANGUAGES.map((langue) => (
                      <div key={langue} className="checkbox-option">
                        <input
                          type="checkbox"
                          value={langue}
                          checked={filters.language.includes(langue)}
                          onChange={() => toggleLanguage(langue)}
                          id={`lang-${langue}`}
                        />
                        <label htmlFor={`lang-${langue}`}>{langue}</label>
                      </div>
            ))}
        </div>
      </div>
      <hr className="line" />

     
      <div className="filter-grp">
        <h3>Author <span onClick={() => handleChange({ target: { name: 'author', value: '' } })}>Clear</span></h3>
        <input
          type="text"
          name="author"
          placeholder="Author name"
          value={filters.author}
          onChange={handleChange}
        />
      </div>
      <hr className="line" />

      
      <div className="filter-grp">
        <h3>Stock <span onClick={() => handleButtonClick('stock', '')}>Clear</span></h3>
        <div className="buttons">
          <button onClick={() => handleButtonClick('stock', 'in')}>In Stock</button>
          <button onClick={() => handleButtonClick('stock', 'out')}>Out of Stock</button>
        </div>
      </div>
      <hr className="line" />

      
      <div className="filter-grp">
        <h3>Pages (min) <span onClick={() => handleChange({ target: { name: 'pages', value: '' } })}>Clear</span></h3>
        <input
          type="number"
          name="pages"
          placeholder="Minimum pages"
          value={filters.pages}
          onChange={handleChange}
        />
      </div>
      <hr className="line" />

      
      <div className="filter-grp">
        <h3>Price (max): {filters.price} <span onClick={() => handleRangeChange({ target: { value: 2000 } })}>Clear</span></h3>
        <input
          type="range"
          name="price"
          min="900"
          max="2000"
          value={filters.price}
          onChange={handleRangeChange}
        />
      </div>
      <hr className="line" />

      
      <div className="filter-grp">
        <button className="clear-btn" onClick={clearFilters}>Clear All</button>
      </div>
    </div>
 */












/*const LANGUAGES = ["Français", "Anglais", "Espagnol", "Allemand", "Arabe", "Chinois"];
  const [filters, setFilters] = useState({
    price: 2000,
    language: [],
    stock: '',
    pages: '',
    author: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleButtonClick = (name, value) => {
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  const toggleLanguage = (lang) => {
  let updated = [...filters.language];
  if (updated.includes(lang)) {
    updated = updated.filter(l => l !== lang); // retirer la langue
  } else {
    updated.push(lang); // ajouter la langue
  }
  const updatedFilters = { ...filters, language: updated };
  setFilters(updatedFilters);
  onFilterChange(updatedFilters);
};

  const handleRangeChange = (e) => {
    const value = parseInt(e.target.value);
    const updatedFilters = { ...filters, price: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    const cleared = {
      price: 2000,
      language: '',
      stock: '',
      pages: '',
      author: ''
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };*/