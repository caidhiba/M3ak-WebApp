import { FaLinkedin, FaTimes, FaGlobe } from "react-icons/fa";
import './TeamSection.css'

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
  return (
    <section className="team-section">
      <h2>Our team</h2>
      <p>These are the available therapists :</p>
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
