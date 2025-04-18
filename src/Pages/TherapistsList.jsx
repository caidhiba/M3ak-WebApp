import React from 'react'
import '../Styles/TherapistsList.css'
import Header from '../Components/Header/Header.jsx'
import Footer from '../Components/Footer/Footer.jsx'
import Filters from '../Components/filters/Filters.jsx'
import TherapistCard from '../Components/TherapistCard/TherapistCard.jsx'
import hatim from '../Assets/Hatim_Alzahim.webp'
import wissam from '../Assets/Wissam_Shaath.webp';
import sophie from '../Assets/Team-member.png'
import marwa from '../Assets/Marwa_Azab.jpg'

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
            <TherapistCard
              name="Dr. Hatim Alzahim"
              categories={["Cognitive Behavioral", "Anxiety", "Teens"]}
              description="Passionate about guiding young people through mental health challenges."
              image={hatim}
            />

            <TherapistCard
              name="Wissam Shaath"
              categories={["Depression", "Couples", "Stress"]}
              description="Helping couples and individuals find emotional balance."
              image={wissam}
            />
            <TherapistCard
              name=" Dr. Sophie Cheval"
              categories={["Cognitive Behavioral", "Anxiety", "Teens"]}
              description="Passionate about guiding young people through mental health challenges."
              image={sophie}
            />

            <TherapistCard
              name="Dr. Marwa Azab"
              categories={["Depression", "Couples", "Stress"]}
              description="Helping couples and individuals find emotional balance."
              image={marwa}
            />
            </div>

          </div>
      </div>
      <Footer />
    </>
  )
}

export default TherapistsList
