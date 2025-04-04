import React from 'react'
import '../Styles/TherapistsList.css'
import Header from '../Components/Header/Header.jsx'
import Footer from '../Components/Footer/Footer.jsx'
import Filters from '../Components/filters/Filters.jsx'

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

            <div className="search-bar">
              search bar
            </div>

            <div className="cards">
              les cartes
            </div>
          </div>
      </div>
      <Footer />
    </>
  )
}

export default TherapistsList
