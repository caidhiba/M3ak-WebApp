import React from 'react'
import './FiltersBook.css'

const FiltersBook = () => {
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
