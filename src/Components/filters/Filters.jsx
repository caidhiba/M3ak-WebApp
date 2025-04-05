import React from 'react'
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

export default Filters
