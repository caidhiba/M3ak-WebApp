import React from 'react'
import '../Styles/Home.css'
import Header from '../Components/Header/Header'
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TeamSection from '../Components/team-section/TeamSection';
import BookSection from '../Components/book-section/BookSection';


const testimonials = [
  {
    id: 1,
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
    name: "Fedsi Imane",
    position: "position, Company name",
    image: "/src/assets/pfp-therapist.avif", // Replace with actual images
  },
  {
    id: 2,
    rating: 3,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
    name: "Hemmam nour el houda",
    position: "position, Company name",
    image: "/src/assets/pfp-therapist.avif",
  },
  {
    id: 3,
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
    name: "Larbes Nardjes",
    position: "position, Company name",
    image: "/src/assets/pfp-therapist.avif",
  },
];
const Home = () => {

  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 3 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev >= testimonials.length - 3 ? 0 : prev + 1));
  };

  return (
    <>
    
    <Header />
    <section className="hero">
    <div className="hero-content">
      <h1>Find The Perfect <br /> Therapist Online</h1>
      <p>
        Feeling Stressed, Anxious Or Depressed? Check Your Mood And Anxiety
        With Our Free Online Test. Online Evidence-Based Programs To Help
        Improve The Way You Feel.
      </p>
      <div className="hero-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign In</button>
      </div>
    </div>
    <div className="hero-image">
      <img src="/src/assets/clinic.png" alt="Therapist Illustration" />
    </div>
  </section>
  {/* _______________therapy choices part__________________ */}
  <section className="therapy-options">
      <h2>Understanding Your Journey:</h2>
      <p className="therapy-subtitle">What type of therapy are you looking for?</p>
      
      <div className="therapy-cards">
        <div className="therapy-card">
          <img src="/src/assets/teen-therapy.png" alt="Teen Therapy" />
          <h3>Teen Therapy</h3>
        </div>

        <div className="therapy-card">
          <img src="/src/assets/couples-therapy.png" alt="Adult Therapy" />
          <h3>Adult Therapy</h3>
        </div>

        <div className="therapy-card">
          <img src="/src/assets/couples-therapy.png" alt="Couples Therapy" />
          <h3>Couples Therapy</h3>
        </div>
      </div>
    </section>
    {/* ___________ratings section_____________ */}
    <div className="testimonials-container">
  <h2 className="testimonials-title">Customer Testimonials</h2>
  <p className="testimonials-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <div className="testimonials-wrapper">
    <button onClick={prevSlide} className="arrow-button arrow-left">
      <ChevronLeft size={24} />
    </button>
    <div className="testimonials-cards">
      {testimonials.slice(index, index + 3).map((t, i) => (
        <div key={i} className="testimonial-card">
          <div className="testimonial-stars">
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <span key={starIndex} className={starIndex < t.rating ? "text-yellow-400" : "text-gray-300"}>★</span>
            ))}
          </div>
          <p className="testimonial-text">"{t.text}"</p>
          <div className="testimonial-user">
            <img src={t.image} alt={t.name} />
            <div className="testimonial-user-info">
              <p className="testimonial-user-name">{t.name}</p>
              <p className="testimonial-user-position">{t.position}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    <button onClick={nextSlide} className="arrow-button arrow-right">
      <ChevronRight size={24} />
    </button>
  </div>
</div>
{/* _______________booking section_____________ */}
  <section className="hero">
      <div className="hero-content">
        <h1>Transform Your Life with Our Therapy Services</h1>
        <p>
          Our therapy services are designed to support your mental and emotional well-being. 
          We offer personalized approaches to help you navigate life's challenges.
        </p>
        <button className="hero-button">Book Consultation</button>
      </div>
      <div className="hero-image">
        <img src="/src/assets/booking-image.png" alt="Therapy Session" />
      </div>
    </section>
    {/* ___________our team section__________ */}
    <TeamSection />
    {/* ________Book section_________---- */}
    <BookSection />

  </>
  )
}

export default Home
