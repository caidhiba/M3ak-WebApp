import React from 'react'
import '../Styles/TherapistsList.css'
import Header from '../Components/Header/Header.jsx'
import Footer from '../Components/Footer/Footer.jsx'
import Filters from '../Components/filters/Filters.jsx'
import TherapistCard from '../Components/TherapistCard/TherapistCard.jsx'
import { therapistsData } from "../data/therapistsData";

const TherapistsList = () => {
  return (
    <>
      <Header />
      <div className="part">

      </div>
      <div className="middle">
          <div className="left-menu">
            <Filters/>
          </div>

          <div className="right-part">
            
            <div className="title">
              Find your Therapist:
              <div className="t2">
                Empowering you to heal, grow, and thrive with personalized support.
              </div>
            </div>

           

            <div className="search-sort">
            <div className="search-wrapper">
              <i className="fa fa-search search-icon" aria-hidden="true"></i>
              <input type="text" placeholder="Search" className="search-input" />
            </div>
            <select className="sort-dropdown">
              <option>Sort by</option>
              <option>Category</option>
              <option>Gender</option>
              <option>Language spoker</option>
              <option>Availability</option>
              <option>Experience</option>
            </select>
            </div>

            <div className="cards">
              {therapistsData.map((therapist, index) => (
                <TherapistCard
                  key={index}
                  name={therapist.name}
                  categories={therapist.categories}
                  description={therapist.description}
                  image={therapist.image}
                />
              ))} 
            </div>

          </div>
      </div>
      <Footer />
    </>
  )
}

export default TherapistsList
