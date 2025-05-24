import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/TherapistsList.css';
import Header from '../Components/Header/Header.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import Filters from '../Components/filters/Filters.jsx';
import TherapistCard from '../Components/TherapistCard/TherapistCard.jsx';

const TherapistsList = () => {
  const [therapistsData, setTherapistsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/GestionAccounts/therapists/')
      .then(response => {
        setTherapistsData(response.data);
        setFilteredData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error("Erreur lors du chargement des thérapeutes :", error);
      });
  }, []);

const handleFilterChange = (newFilters) => {
  const results = therapistsData.filter((therapist) => {
    const matchCategory = newFilters.category.length === 0 || 
      newFilters.category.some(cat =>
        therapist.client_type.toLowerCase().includes(cat.toLowerCase())
      );

    const matchGender = !newFilters.gender || therapist.user.sexe === newFilters.gender;

    /*const matchLanguage = newFilters.language.length === 0 || 
     newFilters.language.some(lang => therapist.languages_spoken.includes(lang));*/
     const matchLanguage = newFilters.language.length === 0 || 
            newFilters.language.some(lang => 
              therapist.languages_spoken.some(l => l.name === lang)
            );
    const matchExperience = therapist.annees_experience >= newFilters.experience;

    return matchCategory && matchGender && matchLanguage && matchExperience;
  });
  setFilteredData(results);
  setIsFiltered(true);
};


  const clearAllFilters = () => {
    setFilteredData(therapistsData);
    setIsFiltered(false);
  };

  return (
    <>
      <Header />
      <div className="middle">
        <div className="left-menu">
          <Filters 
            onFilterChange={handleFilterChange} 
            onClearAll={clearAllFilters}
            isFiltered={isFiltered}
          />
        </div>

        <div className="right-part">
          <div className="title">
            Find your Therapist:
            <div className="t2">Empowering you to heal, grow, and thrive with personalized support.</div>
          </div>

          <div className="cards">
            {filteredData.map((therapist) => (
              <TherapistCard
                key={therapist.id}
                id={therapist.id}
                name={`${therapist.user.first_name} ${therapist.user.last_name}`}
                client_type={therapist.client_type}
                description={therapist.bio}
                image={therapist.user.photo}
                languages={therapist.languages_spoken}
                specializations={therapist.specialites}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TherapistsList;


/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/TherapistsList.css';
import Header from '../Components/Header/Header.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import Filters from '../Components/filters/Filters.jsx';
import TherapistCard from '../Components/TherapistCard/TherapistCard.jsx';

const TherapistsList = () => {
  const [therapistsData, setTherapistsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    gender: '',
    language: '',
    experience: 0
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/GestionAccounts/therapists/')
      .then(response => {
        setTherapistsData(response.data);
        setFilteredData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error("Erreur lors du chargement des thérapeutes :", error);
      });
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const results = therapistsData.filter((therapist) => {
      const matchCategory = filters.category.length === 0 || filters.category.some(cat =>
        therapist.client_type.toLowerCase().includes(cat.toLowerCase())
      );
      const matchGender = !filters.gender || therapist.user.gender === filters.gender;
      const matchLanguage = !filters.language || therapist.languages_spoken.includes(filters.language);
      const matchExperience = therapist.experience_years >= filters.experience;

      return matchCategory && matchGender && matchLanguage && matchExperience;
    });
    setFilteredData(results);
  }, [filters, therapistsData]);

  return (
    <>
      <Header />
      <div className="middle">
        <div className="left-menu">
          <Filters onFilterChange={handleFilterChange} />
        </div>

        <div className="right-part">
          <div className="title">
            Find your Therapist:
            <div className="t2">Empowering you to heal, grow, and thrive with personalized support.</div>
          </div>

          <div className="cards">
            {filteredData.map((therapist, index) => (
              <TherapistCard
                key={index}
                id={therapist.id}
                name={`${therapist.user.first_name} ${therapist.user.last_name}`}
                client_type={therapist.client_type}
                description={therapist.bio}
                image={therapist.user.photo}
                languages={therapist.languages_spoken}
                specializations={therapist.specialites}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TherapistsList;*/



/*import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../Styles/TherapistsList.css'
import Header from '../Components/Header/Header.jsx'
import Footer from '../Components/Footer/Footer.jsx'
import Filters from '../Components/filters/Filters.jsx'
import TherapistCard from '../Components/TherapistCard/TherapistCard.jsx'
import { therapistsData } from "../data/therapistsData";

const TherapistsList = () => {


  const [therapistsData, setTherapistsData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/GestionAccounts/therapists/')
      .then(response => {
        setTherapistsData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error("Erreur lors du chargement des thérapeutes :", error);
      });
  }, []);

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
                  id={therapist.id}
                  //name={therapist.user.first_name}{therapist.user.last_name}
                  name={`${therapist.user.first_name} ${therapist.user.last_name}`}
                  client_type={therapist.client_type}
                  description={therapist.bio}
                  image={therapist.user.photo}
                  languages={therapist.languages_spoken}
                  specializations={therapist.specialites}
                />
              ))} 
            </div>

          </div>
      </div>
      <Footer />
    </>
  )
}

export default TherapistsList*/
{/*<TherapistCard
                  key={index}
                  name={therapist.name}
                  categories={therapist.categories}
                  description={therapist.description}
                  image={therapist.image}
                />*/}