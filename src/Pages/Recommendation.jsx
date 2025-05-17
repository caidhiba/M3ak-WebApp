
import '../Styles/Recommendation.css'; // Create this CSS file
import React, { useState } from "react";
import axios from "axios";
export default function Recommendation() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [datePub, setDatePub] = useState("");
  const [raison, setRaison] = useState("");
  //const [dateRecommendation, setDateRecommendation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:8000/api/gestion-library/books/recommend/", {
        title,
        author,
        date_pub_livre: datePub,
        raison_de_recommendation: raison,
        //date_recommendation: dateRecommendation,
        //therapeute: 1, // à remplacer dynamiquement selon le contexte
      });

      alert("Recommendation saved!");
      // reset form if needed
      setTitle("");
      setAuthor("");
      setDatePub("");
      setRaison("");
      //setDateRecommendation("");
    } catch (error) {
      console.error("Error submitting recommendation:", error);
      alert("Failed to save recommendation.");
    }
  };
 
  return (
    
    <div className="recommendation-container">
      <form className="recommendation-form" onSubmit={handleSubmit}>
        <h2>Let’s start the book recommendation</h2>
        <p className="subtitle">One book can change a mind—recommend yours</p>

        <label>Enter title of the book</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Enter author of the book</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <label>Enter Date of book publishing</label>
        <input
          type="date"
          value={datePub}
          onChange={(e) => setDatePub(e.target.value)}
          required
        />

        <label>
          Enter the reason of your recommendation: why are you suggesting this
          book?
        </label>
        <textarea
          rows="4"
          value={raison}
          onChange={(e) => setRaison(e.target.value)}
          required
        ></textarea>

        <div className="buttons">
          <button type="button" className="cancel-button" onClick={() => window.location.reload()}>
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save
          </button>
        </div>
      </form>

      <div className="recommendation-image" />
    </div>
  );
}
{/*<div className="recommendation-container">
      <div className="recommendation-form">
        <h2>Let’s start the book recommendation</h2>
        <p className="subtitle">One book can change a mind—recommend yours</p>

        <label>Enter title of the book</label>
        <input type="text" />

        <label>Enter author of the book</label>
        <input type="text" />

        <label>Enter Date of book publishing</label>
        <input type="text" />

        <label>
          
          enter the raison of your recommendation: why are you suggesting this book?
        </label>
        <textarea rows="4"></textarea>

        <div className="buttons">
          <button className="cancel-button">Cancel</button>
          <button className="save-button">Save</button>
        </div>
      </div>

      <div className="recommendation-image" />
    </div>*/}