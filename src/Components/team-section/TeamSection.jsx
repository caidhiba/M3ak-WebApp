// import { FaLinkedin, FaTimes, FaGlobe } from "react-icons/fa";
// import './TeamSection.css'

// const teamMembers = [
//   {
//     name: "Wissam Shaath",
//     job: "Eating Disorder Therapist",
//     image: "/src/assets/Team-member.png", 
//   },
//   {
//     name: "Dr. Marwa Azab",
//     job: "Anxiety Disorder Therapist",
//     image: "/src/assets/Team-member.png",
//   },
//   {
//     name: "Dr. Sophie Cheval",
//     job: "Children Therapist",
//     image: "/src/assets/Team-member.png",
//   },
//   {
//     name: "Dr. Hatim Alzahim",
//     job: "Depression Therapist",
//     image: "/src/assets/Team-member.png",
//   },
// ];

// const TeamSection = () => {
//   return (
//     <section className="team-section">
//       <h2>Our team</h2>
//       <p>These are the available therapists :</p>
//       <div className="team-grid">
//         {teamMembers.map((member, index) => (
//           <div key={index} className="team-card">
//             <img src={member.image} alt={member.name} />
//             <h3>{member.name}</h3>
//             <p>{member.job}</p>
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
//               Suspendisse varius enim in eros elementum tristique.
//             </p>
//             <div className="icons">
//               <FaLinkedin />
//               <FaTimes />
//               <FaGlobe />
//             </div>
//           </div>
//         ))}
//       </div>
//       <button className="view-all-button">View All</button>
//     </section>
//   );
// };

// export default TeamSection;    
import { useState,useEffect } from "react";
import { FaLinkedin, FaTimes, FaGlobe, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import './TeamSection.css';
import axios from "axios";
/*const teamMembers = [
  {
    name: "Wissam Shaath",
    job: "Eating Disorder Therapist",
    image: "/src/assets/Team-member.png", 
  },
  {
    name: "Dr. Marwa Azab",
    job: "Anxiety Disorder Therapist",
    image: "/src/assets/Team-member.png",
  },
  {
    name: "Dr. Sophie Cheval",
    job: "Children Therapist",
    image: "/src/assets/Team-member.png",
  },
  {
    name: "Dr. Hatim Alzahim",
    job: "Depression Therapist",
    image: "/src/assets/Team-member.png",
  },
];*/

const TeamSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [therapists, setTherapists] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:8000/api/GestionAccounts/HomeTherapists/")
      .then((response) => {
        setTherapists(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des thérapeutes :", error);
      });
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? therapists.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === therapists.length - 1 ? 0 : prev + 1));
  };


  return (
    <section className="team-section">
      <h2>Our team</h2>
      <p>These are the available therapists:</p>

      {/* Slider container for mobile */}
     <div className="slider-container">
        <button className="arrow left" onClick={handlePrev}>
          <FaChevronLeft />
        </button>

        <div className="team-card-slider">
          <div className="team-card">
            <img src={`${therapists[currentIndex]?.user.photo}`} alt={therapists[currentIndex]?.user.first_name} />
            <h3>{therapists[currentIndex]?.user.first_name}{therapists[currentIndex]?.user.last_name}</h3>
            
            {therapists[currentIndex]?.languages_spoken && therapists[currentIndex]?.languages_spoken.length > 0 && (
                <p><strong>Langues parlées :</strong> {therapists[currentIndex]?.languages_spoken.map(lan => lan.name).join(", ")} </p>
            )}

            {therapists[currentIndex]?.specialites?.length > 0 && (
                <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <strong>Specializations:</strong>{" "}
                  {therapists[currentIndex]?.specialites
                    .slice(0, 3)
                    .map((spec, idx, arr) => (
                      <span key={idx}>
                        {spec.nom}
                        {idx < arr.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  {therapists[currentIndex]?.specialites.length > 3 && " ..."}
                </p>
              )}
            <p>
              <p>{therapists[currentIndex]?.bio}</p>
            </p>
            <div className="icons">
              <FaLinkedin />
              <FaTimes />
              <FaGlobe />
            </div>
          </div>
        </div>

        <button className="arrow right" onClick={handleNext}>
          <FaChevronRight />
        </button>
      </div>
      
      {/* Desktop Grid */}
      <div className="team-grid">
        {therapists.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.user.photo} alt={member.user.first_name} />
            <h3>{member.user.first_name}{member.user.last_name}</h3>
            {/*<p>{member.job}</p>*/}
            {member.languages_spoken && member.languages_spoken.length > 0 && (
            <p><strong>Langues parlées :</strong>              
                  {member.languages_spoken.map(lan => lan.name).join(", ")}                
            </p>
            )}
            {member.specialites?.length > 0 && (
              <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <strong>Specializations:</strong>{" "}
                {member.specialites
                  .slice(0, 3)
                  .map((spec, idx, arr) => (
                    <span key={idx}>
                      {spec.nom}
                      {idx < arr.length - 1 ? ", " : ""}
                    </span>
                  ))}
                {member.specialites.length > 3 && " ..."}
              </p>
            )}
            <p>
              {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Suspendisse varius enim in eros elementum tristique.*/}
              {member.bio}
            </p>
            <div className="icons">
              <FaLinkedin />
              <FaTimes />
              <FaGlobe />
            </div>
          </div>
        ))}
      </div>

      <button className="view-all-button">View All</button>
    </section>
  );
};

export default TeamSection;
