import React, { useState, useEffect, useRef,useContext  } from 'react';
import '../Styles/FindATherapist.css'
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import TherapistCard from '../Components/TherapistCard/TherapistCard.jsx'
import { therapistsData } from "../data/therapistsData";
import axios from 'axios';


const FindATherapist = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptomFrequency, setSymptomFrequency] = useState("");
  const [symptomDuration, setSymptomDuration] = useState("");
  const [therapyType, setTherapyType] = useState(""); 
  const [therapistGender, setTherapistGender] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]); 
  const [symptoms ,setSymptoms] = useState([]); 
  const [matchedTherapists, setMatchedTherapists] = useState([]);

  /*const symptoms = [
    "Anxiety or panic attacks",
    "Sleep disturbances",
    "Mood swings",
    "Constant sadness or emptiness",
    "Intrusive or racing thoughts",
    "Fatigue",
    "Trouble concentrating",
    "Anger",
    "Impulsivity",
    "Avoidance",
    "Feeling disconnected from reality",
    "Loss of interest",
    "Suicidal thoughts",
    "Hearing voices",
    "Delusions"
  ];*/

  const frequencyOptions = [
    "Every day",
    "A few times a week",
    "Occasionally",
    "Rarely",
    "Just recently"
  ];

  const durationOptions = [
    "Less than 2 weeks",
    "2-4 weeks",
    "1-6 months",
    "Over 6 months",
    "Since childhood"
  ];

  /*const therapyTypeOptions = [
    "Individual Therapy",
    "Couples Therapy",
    "Teen Counseling"
  ];*/
  const therapyTypeOptions = [
    "Children",
    "Couples",
    "Teen",
    "Adults"
  ];
  /*const genderOptions = [
    "Female",
    "Male",
    "Doesn't matter"
  ];*/
  const genderOptions = [
    "Femme",
    "Homme",
    "Doesn't matter"
  ];
  
  const languageOptions = ["Français", "Anglais", "Espagnol", "Allemand", "Arabe", "Chinois","Other"];
  useEffect(() => {
      const fetchSymptoms = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/gestion-mental-health/symptomes/');
          const data = await response.json();
          setSymptoms(data); // assure-toi que data est un tableau d'objets ou de strings          
          console.log(data)
        } catch (error) {
          console.error('Erreur lors du chargement des spécialisations:', error);
        }
      };   
      fetchSymptoms();
  }, []);
const handleSubmit = async () => {
    try {
    const payload = {
      symptoms: selectedSymptoms.map(symptom => symptom.id_symptome), // envoyer les ID
      frequency: symptomFrequency,
      duration: symptomDuration,
      therapy_type: therapyType,
      gender: therapistGender,
      languages: selectedLanguages
    };
    console.log(payload)
    const response =await axios.post('http://localhost:8000/api/gestion-mental-health/find-therapists/', payload);
    
    //const matchedTherapists = response.data;

    console.log("Matched therapists:", response.data);
    // 👉 tu peux maintenant remplacer therapistsData par ce résultat dynamiquement
    setMatchedTherapists(response.data);

    // on passe à l'étape suivante SEULEMENT quand on reçoit les résultats
    setCurrentStep(7);
   } catch (error) {
    console.error("Erreur lors de la recherche des thérapeutes:", error);
   }
};


  const handleSymptomSelection = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(item => item !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleLanguageSelection = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter(item => item !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };
  
  const handleAllLanguagesSelection = () => {
    if (selectedLanguages.length === languageOptions.length) {
      setSelectedLanguages([]);
    } else {
      setSelectedLanguages([...languageOptions]);
    }
  };

  const nextStep = () => {
    //setCurrentStep(currentStep + 1);
    if (currentStep === 6 && matchedTherapists.length === 0) {
        handleSubmit(); // Fais la soumission AVANT de passer à l'étape 7
    } //else {
    setCurrentStep(currentStep + 1);
    //}
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStepIndicator = () => {
    return (
      <div className="progress-container">
        <div className="progress-indicator">
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div key={step} className={`step-circle ${currentStep >= step ? 'active' : ''}`}>
              <span className="step-number">{step}</span>
              <span className="step-label">
                {step === 1 && "Symptoms"}
                {step === 2 && "Frequency"}
                {step === 3 && "Duration"}
                {step === 4 && "Therapy"}
                {step === 5 && "Gender"}
                {step === 6 && "Language"}
                {step === 7 && "Results"}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="question-title">What symptoms are you experiencing?</h2>
            <div className="options-grid">
              {symptoms.map((symptom) => (
                <button
                  key={symptom.id_symptome}
                  className={`option-button ${selectedSymptoms.includes(symptom) ? 'selected' : ''}`}
                  onClick={() => handleSymptomSelection(symptom)}
                >
                  {symptom.nom}
                </button>
              ))}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="question-title">How often do you feel these symptoms?</h2>
            <div className="options-list">
              {frequencyOptions.map((option) => (
                <button
                  key={option}
                  className={`option-button ${symptomFrequency === option ? 'selected' : ''}`}
                  onClick={() => setSymptomFrequency(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="question-title">How long have you had these symptoms?</h2>
            <div className="options-list">
              {durationOptions.map((option) => (
                <button
                  key={option}
                  className={`option-button ${symptomDuration === option ? 'selected' : ''}`}
                  onClick={() => setSymptomDuration(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="question-title">What type of therapy are you looking for?</h2>
            <div className="options-list">
              {therapyTypeOptions.map((option) => (
                <button
                  key={option}
                  className={`option-button ${therapyType === option ? 'selected' : ''}`}
                  onClick={() => setTherapyType(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        );
      case 5:
        return (
          <>
            <h2 className="question-title">What therapist gender do you prefer?</h2>
            <div className="options-list">
              {genderOptions.map((option) => (
                <button
                  key={option}
                  className={`option-button ${therapistGender === option ? 'selected' : ''}`}
                  onClick={() => setTherapistGender(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        );
      case 6:
        return (
          <>
            <h2 className="question-title">What languages do you prefer?</h2>
            <p className="language-subtitle">Select one or multiple languages</p>
            <div className="options-grid language-grid">
              
              {languageOptions.map((option) => (
                <button
                  key={option}
                  className={`option-button ${selectedLanguages.includes(option) ? 'selected' : ''}`}
                  onClick={() => handleLanguageSelection(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        );
      case 7:
        return (
          <>
            <h2 className="question-title">Your Matched Therapists</h2>
            <div className="results-summary">
              <p>Based on your responses, we've found these therapists who may be a good match for you:</p>
              <div className="cards">
              {Array.isArray(matchedTherapists) && matchedTherapists.length > 0 ? (
                matchedTherapists.map((therapist, index) => (               
                       <TherapistCard
                            key={index}
                            id={therapist.id}
                            name={`${therapist.user.first_name} ${therapist.user.last_name}`}
                            client_type={therapist.client_type}
                            description={therapist.bio}
                            image={`http://127.0.0.1:8000${therapist.user.photo}`}
                            languages={therapist.languages_spoken}
                            specializations={therapist.specialites}
                        />
                 ))
               ) : (
                  <p>No therapists matched your criteria.</p>
               )}
                {therapistsData.map((therapist, index) => (
                <TherapistCard
                key={index}
                id={therapist.id}
                name={therapist.name}
                categories={therapist.categories}
                description={therapist.description}
               image={therapist.image}
             />
             ))} 
            </div>
          </div>
          </>
        );
      default:
        return null;
    }
  };

  const handleMoreTherapists =async () => {
    nextStep(); 
  };

  return (
    <div className="find-therapist-wrapper">
      <Header />
      
      <div className="part"></div>
      
      <div className="main-content">
        <div className="page-title-container">
          <h1 className="page-title">Get Matched with the Right Therapist for You</h1>
          <div className="t2">
            Empowering you to heal, grow, and thrive with personalized support.
          </div>
        </div>
        
        <div className="questionnaire-container">
          {renderStepIndicator()}
          
          <div className="questionnaire-content">
            {renderStepContent()}
          </div>
          
          <div className="navigation-buttons">
            {currentStep > 1 && (
              <button className="back-button" onClick={prevStep}>
                Back
              </button>
            )}
            
            {currentStep < 7 ? (
              <button 
                className="next-button" 
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && selectedSymptoms.length === 0) ||
                  (currentStep === 2 && !symptomFrequency) ||
                  (currentStep === 3 && !symptomDuration) ||
                  (currentStep === 4 && !therapyType) ||
                  (currentStep === 5 && !therapistGender) ||
                  (currentStep === 6 && selectedLanguages.length === 0)
                }
              >
                Next
              </button>
            ) : (
              <button className="submit-button" onClick={handleMoreTherapists}>
                Find More Therapists
              </button>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default FindATherapist;

{/*<TherapistCard
                key={index}
                name={therapist.name}
                categories={therapist.categories}
                description={therapist.description}
               image={therapist.image}
                />*/}