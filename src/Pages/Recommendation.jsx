import React from 'react';
import '../Styles/Recommendation.css'; // Create this CSS file

export default function Recommendation() {
  return (
    <div className="recommendation-container">
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
    </div>
  );
}
