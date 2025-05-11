import React, { useState, useEffect, useRef,useContext  } from 'react';
import axios from 'axios';
import '../Styles/Business.css';
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { AuthContext } from '../auth/AuthContext';
const Business = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const {userinfo ,user,isLoading} = useContext(AuthContext);
  const LANGUAGES = ["Français", "Anglais", "Espagnol", "Allemand", "Arabe", "Chinois"];
  const [availableSpecializations, setAvailableSpecializations] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    city: '',
    profilePicture: null,
    licenseNumber: '',
    issuingOrganization: '',
    issueDate: '',
    specializations: [],//specializations: '',
    otherSpecialization: '', // 👈 ajouté ici
    yearsOfExperience: '',
    availability: '',
    languages: [],//languages: '',
    certifications: '',
    resume: null,
    motivationText: '',
    clientType: '',
    contributionText: '',
    motivationLetter: '',
    referralSource: '',
    consentAgreement: '',
  });

  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    dateOfBirth: false,
    city: false,
    licenseNumber: false,
    issuingOrganization: false,
    issueDate: false,
    specializations: false,
    yearsOfExperience: false,
    resume: false,
    motivationText: false,
    clientType: false,
    consentAgreement: false,
    languages: false,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem('therapistFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    /*const fetchSpecializations = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/gestion-mental-health/specialites/');
        const data = await response.json();
        setAvailableSpecializations(data); // assure-toi que data est un tableau d'objets ou de strings
      } catch (error) {
        console.error('Erreur lors du chargement des spécialisations:', error);
      }
    };
  
    fetchSpecializations();*/
  }, []);

  useEffect(() => {
    localStorage.setItem('therapistFormData', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    
    if (type === 'file' && files && files[0]) {
      if (name === 'profilePicture') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(files[0]);
      }
      setFormData({ ...formData, [name]: files[0] });
    } else {
      const newValue = type === 'checkbox' ? checked : value;
      setFormData({ ...formData, [name]: newValue });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleCheckboxChange = (e, langue) => {
    const isChecked = e.target.checked;
    const updatedLanguages = isChecked
      ? [...formData.languages, langue]
      : formData.languages.filter((l) => l !== langue);
  
    setFormData({ ...formData, languages: updatedLanguages });
  
    if (errors.languages) {
      setErrors({ ...errors, languages: false });
    }
  };

  const handleSpecializationChange = (e, specialization) => {
    const isChecked = e.target.checked;
    const updatedSpecs = isChecked
      ? [...formData.specializations, specialization]//specialization.id
      : formData.specializations.filter((s) => s !== specialization);//specialization.id
  
    setFormData({ ...formData, specializations: updatedSpecs });
  
    if (errors.specializations) {
      setErrors({ ...errors, specializations: false });
    }
  };
  


  const validateStep = () => {
    let isValid = true;
    const newErrors = {...errors};

    switch (currentStep) {
      case 1:
        //newErrors.fullName = !formData.fullName;
        //newErrors.email = !formData.email;
        //newErrors.dateOfBirth = !formData.dateOfBirth;
        newErrors.city = !formData.city;
        isValid =!newErrors.city; //!newErrors.fullName && !newErrors.email && 
                  //!newErrors.dateOfBirth && !newErrors.city;
        break;
      case 2:
        newErrors.licenseNumber = !formData.licenseNumber;
        newErrors.issuingOrganization = !formData.issuingOrganization;
        newErrors.issueDate = !formData.issueDate;
        isValid = !newErrors.licenseNumber && !newErrors.issuingOrganization && 
                  !newErrors.issueDate;
        break;
      case 3:
        /*newErrors.specializations = !formData.specializations;
        newErrors.yearsOfExperience = !formData.yearsOfExperience;
        isValid = !newErrors.specializations && !newErrors.yearsOfExperience;*/
        newErrors.specializations = formData.specializations.length === 0 ||  (formData.specializations.includes('other') && !formData.otherSpecialization);
        newErrors.yearsOfExperience = !formData.yearsOfExperience;
        isValid = !newErrors.specializations && !newErrors.yearsOfExperience;
        break;
      case 4:
        isValid = true; 
        break;
      case 5:
        newErrors.resume = !formData.resume;
        isValid = !newErrors.resume;
        break;
      case 6:
        newErrors.motivationText = !formData.motivationText;
        newErrors.clientType = !formData.clientType;
        isValid = !newErrors.motivationText && !newErrors.clientType;
        break;
      case 7:
        newErrors.consentAgreement = formData.consentAgreement !== 'agree';
        isValid = !newErrors.consentAgreement;
        break;
      default:
        isValid = true;
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
  console.log(formDataToSend)
  console.log(formData)
  // Remplir les champs un par un
  formDataToSend.append('license_number', formData.licenseNumber);
  formDataToSend.append('issuing_organization', formData.issuingOrganization);
  formDataToSend.append('issue_date', formData.issueDate);
  formDataToSend.append('photo', formData.profilePicture);
  

  if (formData.otherSpecialization){
    formDataToSend.append('other_specialization', formData.otherSpecialization);
  }else{
    formData.specializations.forEach((spec, index) => {
    formDataToSend.append(`specialites`, spec.id || spec); // selon structure
  });
  }
  formDataToSend.append('annees_experience', formData.yearsOfExperience);
  formDataToSend.append('availability', formData.availability);
  formDataToSend.append('languages', JSON.stringify(formData.languages));

  formDataToSend.append('certificate', formData.certifications); // ← fichier 
  formDataToSend.append('resume_cv',formData.resume ); // ← fileInput.files[0] 

  formDataToSend.append('motivation', formData.motivationText);
  formDataToSend.append('client_type', formData.clientType);
  formDataToSend.append('referral_source', formData.referralSource);
  formDataToSend.append('motivation_letter', formData.motivationLetter);

  formDataToSend.append('consent_agreement', formData.consentAgreement === 'agree');
  console.log('data form to send ',formDataToSend)
  console.log('user?.access',user?.access)
  try {
     const response = await fetch('http://127.0.0.1:8000/api/GestionAccounts/patient-demandes/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user?.access}` // si tu utilises JWT
      },
      body: formDataToSend
    });
   /*const response = await axios.post(
        'http://127.0.0.1:8000/api/GestionAccounts/patient-demandes/',
         formDataToSend,
         {
          headers: {
            Authorization: `Bearer ${user?.access}`,  // Ton token JWT
            // Pas besoin de 'Content-Type' ici avec FormData
          },
         }
     );*/
    console.log('Demande envoyée avec succès', response);
    if (response.status === 200 || response.status === 201) {
       setSubmitStatus({ success: true, message: 'Demande soumise avec succès !' });
       localStorage.removeItem('therapistFormData');
    } else {
       setSubmitStatus({ success: false, message: 'Erreur lors de la soumission.' });
    }
   /* if (response.ok) {
      setSubmitStatus({ success: true, message: 'Demande soumise avec succès !' });
      localStorage.removeItem('therapistFormData');
    } else {
      const errData = await response.json();
      setSubmitStatus({ success: false, message: 'Erreur lors de la soumission.', details: errData });
    }*/
  } catch (error) {
    setSubmitStatus({ success: false, message: 'Une erreur réseau est survenue.' });
  } finally {
    setIsSubmitting(false);
  }





    /*try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus({ success: true, message: 'Application submitted successfully!' });
      localStorage.removeItem('therapistFormData');
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Submission failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }*/
  };

  const renderProgressIndicator = () => (
    <div className={`progress-indicator ${isMobile ? 'mobile' : ''}`}>
      {[...Array(totalSteps)].map((_, index) => (
        <React.Fragment key={index}>
          <div
            className={`step-indicator ${
              index + 1 < currentStep
                ? 'completed'
                : index + 1 === currentStep
                ? 'active'
                : ''
            }`}
            aria-current={index + 1 === currentStep ? 'step' : null}
            aria-label={`Step ${index + 1}`}
          >
            {index + 1 < currentStep ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              index + 1
            )}
          </div>
          {index < totalSteps - 1 && !isMobile && <div className="progress-line"></div>}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <h2>Let's Get to Know You First</h2>
            {/*<div className="form-group">
              <label>Full Name <span className="required">*</span></label>
              <input 
                type="text" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleInputChange} 
                className={`form-input ${errors.fullName ? 'error' : ''}`} 
                required 
              />
              {errors.fullName && <span className="error-message">This field is required</span>}
            </div>
            <div className="form-group">
              <label>Email <span className="required">*</span></label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="hello@example.com" 
                required 
              />
              {errors.email && <span className="error-message">This field is required</span>}
            </div>
            <div className="form-group">
              <label>Date of Birth <span className="required">*</span></label>
              <input 
                type="date" 
                name="dateOfBirth" 
                value={formData.dateOfBirth} 
                onChange={handleInputChange} 
                className={`form-input ${errors.dateOfBirth ? 'error' : ''}`}
                required 
              />
              {errors.dateOfBirth && <span className="error-message">This field is required</span>}
            </div>
            <div className="form-group">
              <label>City / Wilaya <span className="required">*</span></label>
              <input 
                type="text" 
                name="city" 
                value={formData.city} 
                onChange={handleInputChange} 
                className={`form-input ${errors.city ? 'error' : ''}`}
                required 
              />
              {errors.city && <span className="error-message">This field is required</span>}
            </div>*/}
            <div className="form-group">
              <label>Upload Profile Picture</label>
              <input 
                type="file" 
                name="profilePicture" 
                onChange={handleInputChange} 
                className="form-input" 
                accept="image/*" 
              />
              {preview && (
                <div className="image-preview">
                  <img src={preview} alt="Profile preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </div>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h2>Professional License</h2>
            <div className="form-group">
              <label>License Number <span className="required">*</span></label>
              <input 
                type="text" 
                name="licenseNumber" 
                value={formData.licenseNumber} 
                onChange={handleInputChange} 
                className={`form-input ${errors.licenseNumber ? 'error' : ''}`} 
                required 
              />
              {errors.licenseNumber && <span className="error-message">This field is required</span>}
            </div>
            <div className="form-group">
              <label>Issuing Organization <span className="required">*</span></label>
              <input 
                type="text" 
                name="issuingOrganization" 
                value={formData.issuingOrganization} 
                onChange={handleInputChange} 
                className={`form-input ${errors.issuingOrganization ? 'error' : ''}`}
                required 
              />
              {errors.issuingOrganization && <span className="error-message">This field is required</span>}
            </div>
            <div className="form-group">
              <label>Issue Date <span className="required">*</span></label>
              <input 
                type="date" 
                name="issueDate" 
                value={formData.issueDate} 
                onChange={handleInputChange} 
                className={`form-input ${errors.issueDate ? 'error' : ''}`}
                required 
              />
              {errors.issueDate && <span className="error-message">This field is required</span>}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <h2>Professional Info</h2>
            {/*<div className="form-group">
              <label>Specializations <span className="required">*</span></label>
              <input 
                type="text" 
                name="specializations" 
                value={formData.specializations} 
                onChange={handleInputChange} 
                className={`form-input ${errors.specializations ? 'error' : ''}`}
                required 
              />
              {errors.specializations && <span className="error-message">This field is required</span>}
            </div>*/}

            <div className="form-group" ref={dropdownRef}>
                <label>Spécialisations <span className="required">*</span></label>
                <button type="button" onClick={() => setDropdownOpen(!dropdownOpen)} className="dropdown-toggle">
                     Choisir des spécialisations
                </button>
                {dropdownOpen && (
                <div className="dropdown-menu">   
                    {availableSpecializations.map((spec) => (
                      <div key={spec} className="checkbox-option">
                        <input
                          type="checkbox"
                          value={spec}
                          checked={formData.specializations.includes(spec)}
                          onChange={(e) => handleSpecializationChange(e, spec)}
                          id={`spec-${spec.id}`}
                        />
                        <label htmlFor={`spec-${spec.id}`}>{spec.nom}</label>
                      </div>
                    ))}
                    {/* Option Autre */}
                    <div className="checkbox-option">
                        <input
                          type="checkbox"
                          value="other"
                          checked={formData.specializations.includes('other')}
                          onChange={(e) => handleSpecializationChange(e, 'other')}
                          id="spec-other"
                        />
                        <label htmlFor="spec-other">Autre (à préciser)</label>
                    </div>
                    {/* Champ texte si "Autre" est cochée */}
                    {formData.specializations.includes('other') && (
                        <div className="form-group">
                          <label>Précisez votre spécialisation</label>
                          <input
                            type="text"
                            name="otherSpecialization"
                            value={formData.otherSpecialization || ''}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                    )}
                </div>
                )}
                {errors.specializations && <span className="error-message">Veuillez sélectionner au moins une spécialisation</span>}
            </div>
            <div className="form-group">
              <label>Years of Experience <span className="required">*</span></label>
              <input 
                type="number" 
                name="yearsOfExperience" 
                value={formData.yearsOfExperience} 
                onChange={handleInputChange} 
                className={`form-input ${errors.yearsOfExperience ? 'error' : ''}`}
                min="0"
                required 
              />
              {errors.yearsOfExperience && <span className="error-message">This field is required</span>}
            </div>
            <div className="form-group">
              <label>Availability</label>
              <input 
                type="text" 
                name="availability" 
                value={formData.availability} 
                onChange={handleInputChange} 
                className="form-input" 
                placeholder="e.g. Weekdays 9-5" 
              />
            </div>
            {/*<div className="form-group">
              <label>Languages Spoken</label>
              <input 
                type="text" 
                name="languages" 
                value={formData.languages} 
                onChange={handleInputChange} 
                className="form-input" 
                placeholder="e.g. Arabic, French, English..."
              />
            </div>*/}
            <div className="form-group">
                    <label>Langues parlées :</label>
                    {LANGUAGES.map((langue) => (
                      <div key={langue} className="checkbox-option">
                        <input
                          type="checkbox"
                          value={langue}
                          checked={formData.languages.includes(langue)}
                          onChange={(e) => handleCheckboxChange(e, langue)}
                          id={`lang-${langue}`}
                        />
                        <label htmlFor={`lang-${langue}`}>{langue}</label>
                      </div>
                    ))}
                    {errors.languages && <span className="error-message">Veuillez sélectionner au moins une langue</span>}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="form-step">
            <h2>Certifications & Licenses</h2>
            <div className="form-group">
              <textarea 
                name="certifications" 
                value={formData.certifications} 
                onChange={handleInputChange} 
                className="form-textarea" 
                placeholder="List any certifications or training (optional)" 
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="form-step">
            <h2>Resume / CV <span className="required">*</span></h2>
            <div className="form-group">
              <label>Upload File (PDF or DOC) <span className="required">*</span></label>
              <input 
                type="file" 
                name="resume" 
                onChange={handleInputChange} 
                className={`form-input ${errors.resume ? 'error' : ''}`}
                accept=".pdf,.doc,.docx" 
                required 
              />
              {errors.resume && <span className="error-message">This field is required</span>}
              {formData.resume && (
                <div className="file-info">
                  Selected file: {formData.resume.name}
                </div>
              )}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="form-step">
            <h2>Motivation</h2>
            <div className="form-group">
              <label>What motivates you to join our platform? <span className="required">*</span></label>
              <textarea 
                name="motivationText" 
                value={formData.motivationText} 
                onChange={handleInputChange} 
                className={`form-textarea ${errors.motivationText ? 'error' : ''}`}
                required 
              />
              {errors.motivationText && <span className="error-message">This field is required</span>}
            </div>
            <div className="form-group">
              <label>Client Types or Approaches <span className="required">*</span></label>
              <select 
                name="clientType" 
                value={formData.clientType} 
                onChange={handleInputChange} 
                className={`form-select ${errors.clientType ? 'error' : ''}`}
                required
              >
                <option value="">Select one...</option>
                <option value="children">Children</option>
                <option value="adolescents">Adolescents</option>
                <option value="adults">Adults</option>
                <option value="couples">Couples</option>
                <option value="families">Families</option>
                <option value="seniors">Seniors</option>
              </select>
              {errors.clientType && <span className="error-message">This field is required</span>}
            </div>
            <div className="form-group">
              <label>How will you contribute to the platform?</label>
              <textarea 
                name="contributionText" 
                value={formData.contributionText} 
                onChange={handleInputChange} 
                className="form-textarea" 
              />
            </div>
            <div className="form-group">
              <label>Motivation Letter</label>
              <textarea 
                name="motivationLetter" 
                value={formData.motivationLetter} 
                onChange={handleInputChange} 
                className="form-textarea" 
              />
            </div>
          </div>
        );
      case 7:
        return (
          <div className="form-step">
            <h2>Socials & Consent</h2>
            <div className="form-group">
              <label>How did you hear about us?</label>
              <select 
                name="referralSource" 
                value={formData.referralSource} 
                onChange={handleInputChange} 
                className="form-select"
              >
                <option value="">Select one...</option>
                <option value="social-media">Social Media</option>
                <option value="friend">Friend / Colleague</option>
                <option value="search">Search Engine</option>
                <option value="publication">Publication / Article</option>
              </select>
            </div>
            <div className="form-group">
              <label>Consent Agreement <span className="required">*</span></label>
              <select 
                name="consentAgreement" 
                value={formData.consentAgreement} 
                onChange={handleInputChange} 
                className={`form-select ${errors.consentAgreement ? 'error' : ''}`}
                required
              >
                <option value="">Select one...</option>
                <option value="agree">I agree to the terms</option>
                <option value="disagree">I do not agree</option>
              </select>
              {errors.consentAgreement && <span className="error-message">You must agree to the terms</span>}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="business-page-wrapper">
      <Header />
      <div className="business-container">
        <h1 className="form-title">Therapist Registration</h1>
        {submitStatus.success ? (
          <div className="success-message">
            <h2>Thank you for your application!</h2>
            <p>We've received your therapist registration and will review it shortly.</p>
            <p>You'll receive a confirmation email with next steps.</p>
          </div>
        ) : (
          <div className="form-card">
            {renderProgressIndicator()}
            <form onSubmit={handleSubmit}>
              {renderStep()}
              <div className="form-navigation">
                <div className="step-counter">Step {currentStep}/{totalSteps}</div>
                <div className="nav-buttons">
                  {currentStep > 1 && (
                    <button type="button" onClick={prevStep} className="back-button">Back</button>
                  )}
                  {currentStep < totalSteps ? (
                    <button type="button" onClick={nextStep} className="next-button">Next</button>
                  ) : (
                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Business;