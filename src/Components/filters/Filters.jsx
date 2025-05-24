import React, { useState } from 'react';
import "./Filters.css";

const Filters = ({ onFilterChange, onClearAll, isFiltered }) => {
  const [filters, setFilters] = useState({
    category: [],
    gender: '',
    language: [],
    experience: 0
  });
  console.log(filters)
  const LANGUAGES = ["French", "English", "Spanish", "German", "Arabic", "Chinese"];
  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      category: checked
        ? [...prev.category, value]
        : prev.category.filter(cat => cat !== value)
    }));
  };

  const handleRadio = (e) => {
    setFilters(prev => ({ ...prev, gender: e.target.value }));
  };

  const handleLanguage = (lang) => {
  setFilters(prev => ({
    ...prev,
    language: prev.language.includes(lang)
      ? prev.language.filter(l => l !== lang)  // désélectionner si déjà sélectionné
      : [...prev.language, lang]                // ajouter sinon
  }));
};

  const handleExperience = (e) => {
    setFilters(prev => ({ ...prev, experience: parseInt(e.target.value) }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const clearFilters = () => {
    const cleared = { category: [], gender: '', language: [], experience: 0 };
    setFilters(cleared);
    onClearAll();
  };

  return (
    <div className='main'>
      <div className="titlee">
        Filters:
        {isFiltered && (
          <span className="clear-all" onClick={clearFilters}>Clear all</span>
        )}
      </div>
      <hr className="line" />

      <div className="groups">
        <div className="filter-grp">
          <h3>Category</h3>
          <label>
            <input 
              type="checkbox" 
              value="individual" 
              checked={filters.category.includes('individual')} 
              onChange={handleCheckbox} 
            /> Individual Therapy
          </label>
          <label>
            <input 
              type="checkbox" 
              value="couples" 
              checked={filters.category.includes('couples')} 
              onChange={handleCheckbox} 
            /> Couples Therapy
          </label>
          <label>
            <input 
              type="checkbox" 
              value="adolescent" 
              checked={filters.category.includes('adolescent')} 
              onChange={handleCheckbox} 
            /> Adolescent Therapy
          </label>
        </div>

        <hr className="line" />

        <div className="filter-grp">
          <h3>Gender</h3>
          <label>
            <input 
              type="radio" 
              name="gender" 
              value="male" 
              checked={filters.gender === 'male'} 
              onChange={handleRadio} 
            /> Male
          </label>
          <label>
            <input 
              type="radio" 
              name="gender" 
              value="female" 
              checked={filters.gender === 'female'} 
              onChange={handleRadio} 
            /> Female
          </label>
        </div>

        <hr className="line" />

        <div className="filter-grp">
          <h3>Language Spoken</h3>
          <div className="buttons">
            {LANGUAGES.map((lang) => (
               <button
                  key={lang}
                  className={filters.language.includes(lang) ? 'selected' : ''}
                   onClick={() => handleLanguage(lang)}
               >
                   {lang}
              </button>
             ))}

          </div>
        </div>

        <hr className="line" />

        <div className="filter-grp">
          <h3>Experience: {filters.experience}+ years</h3>
          <input 
            type="range" 
            min="0" 
            max="20" 
            value={filters.experience} 
            onChange={handleExperience} 
          />
        </div>

        <hr className="line" />

        <div className="filter-grp buttons-container">
          <button className="clear-btn" onClick={clearFilters}>
            Clear
          </button>
          <button className="apply-btn" onClick={applyFilters}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;


/*import React, { useState } from 'react';
import "./Filters.css";

const Filters = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    gender: '',
    language: '',
    experience: 0,
  });

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    const updatedCategories = checked
      ? [...selectedFilters.category, value]
      : selectedFilters.category.filter(cat => cat !== value);
    setSelectedFilters(prev => ({ ...prev, category: updatedCategories }));
  };

  const handleRadio = (e) => {
    setSelectedFilters(prev => ({ ...prev, gender: e.target.value }));
  };

  const handleLanguage = (lang) => {
    setSelectedFilters(prev => ({ ...prev, language: lang }));
  };

  const handleExperienceChange = (e) => {
    setSelectedFilters(prev => ({ ...prev, experience: parseInt(e.target.value) }));
  };

  const applyFilters = () => {
    onFilterChange(selectedFilters);
  };

  const clearFilters = () => {
    const cleared = { category: [], gender: '', language: '', experience: 0 };
    setSelectedFilters(cleared);
    onFilterChange(cleared);
  };

  return (
    <div className='main'>
      <div className="titlee">Filters:</div>
      <hr className="line" />

      <div className="groups">
        <div className="filter-grp">
          <h3>Category <span onClick={clearFilters}>Clear</span></h3>
          <label><input type="checkbox" value="Individual" onChange={handleCheckbox} /> Individual Therapy</label>
          <label><input type="checkbox" value="Couples" onChange={handleCheckbox} /> Couples Therapy</label>
          <label><input type="checkbox" value="Adolescent" onChange={handleCheckbox} /> Adolescent Therapy</label>
        </div>

        <hr className="line" />

        <div className="filter-grp">
          <h3>Gender</h3>
          <label><input type="radio" name="gender" value="male" onChange={handleRadio} /> Male</label>
          <label><input type="radio" name="gender" value="female" onChange={handleRadio} /> Female</label>
        </div>

        <hr className="line" />

        <div className="filter-grp">
          <h3>Language Spoken</h3>
          <div className="buttons">
            {['Arabic', 'English', 'French', 'Spanish'].map((lang) => (
              <button key={lang} onClick={() => handleLanguage(lang)}>{lang}</button>
            ))}
          </div>
        </div>

        <hr className="line" />

        <div className="filter-grp">
          <h3>Experience</h3>
          <input type="range" min="0" max="20" value={selectedFilters.experience} onChange={handleExperienceChange} />
        </div>

        <hr className="line" />

        <div className="filter-grp">
          <button className="clear-btn" onClick={clearFilters}>Clear</button>
          <button className="apply-btn" onClick={applyFilters}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default Filters;*/



/*import React from 'react'
import "./Filters.css"

const Filters = () => {
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
          <label><input type="checkbox" /> Individual Therapy</label>
          <label><input type="checkbox" /> Couples Therapy</label>
          <label><input type="checkbox" /> Adolescent Therapy</label>
          </div>
          
        </div>
        
        <hr className="line" />

        <div className="filter-grp">
        <h3>Gender <span>Clear</span></h3>
        <label><input type="radio" name="gender" /> Male</label>
        <label><input type="radio" name="gender" /> Female</label>
        </div>

        <hr className="line" />

        <div className="filter-grp">
          <h3>Language Spoken <span>Clear</span></h3>
          <div className="buttons">
            <button>Arabic</button>
            <button>English</button>
            <button>French</button>
            <button>Spanish</button>
            <button>Italian</button>
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
        <h3>Experience <span>Clear</span></h3>
        <input type="range" min="0" max="20" />
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

export default Filters*/
