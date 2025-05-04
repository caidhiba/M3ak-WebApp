
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../Styles/Recommendation.css";

// export default function Recommendation() {
//   const [form, setForm] = useState({
//     title: '',
//     author: '',
//     date: '',
//     reason: ''
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Recommendation Submitted:', form);
//     // Add actual submit logic here (e.g., API call)
//     navigate('/');
//   };

//   return (
//     <div className="recommendation-container">
//       <form className="recommendation-form" >
//         <h2>Let's start the book recommendation</h2>
//         <p className="subtitle">One book can change a mind—recommend yours</p>

//         <label>Enter title de livre</label>
//         <input type="text" name="title" value={form.title} onChange={handleChange} required />

//         <label>Enter author de livre</label>
//         <input type="text" name="author" value={form.author} onChange={handleChange} required />

//         <label>Enter Date publication du livre</label>
//         <input type="date" name="date" value={form.date} onChange={handleChange} required />

//         <label>
//           Entrez la raison de la recommandation : pourquoi proposez-vous ce livre ?
//         </label>
//         <textarea name="reason" value={form.reason} onChange={handleChange} required />

//         <div className="button-group">
//           <button type="button" onClick={() => navigate('/')}>Cancel</button>
//           <button type="submit">Save</button>
//         </div>
//       </form>

//       <div className="recommendation-image">
//         <img src="/assets/book-stack.jpg" alt="Stack of books" />
//       </div>
//     </div>
//   );
// }
