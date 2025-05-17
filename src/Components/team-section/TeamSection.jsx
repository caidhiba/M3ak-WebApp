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
import { useState } from "react";
import { FaLinkedin, FaTimes, FaGlobe, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import './TeamSection.css';

const teamMembers = [
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
];

const TeamSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  //const [teamMembers, setTeamMembers] = useState([]);
  
  /*useEffect(() => {
    axios.get("http://localhost:8000/api/top-therapeutes/")
      .then((response) => {
        setTeamMembers(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des thérapeutes :", error);
      });
  }, []);*/

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
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
            <img src={teamMembers[currentIndex].image} alt={teamMembers[currentIndex].name} />
            <h3>{teamMembers[currentIndex].name}</h3>
            <p>{teamMembers[currentIndex].job}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Suspendisse varius enim in eros elementum tristique.
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
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.job}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Suspendisse varius enim in eros elementum tristique.
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
