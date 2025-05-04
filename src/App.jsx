import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import BookShop from "./Pages/BookShop"
import Header from "./Components/Header/Header"
import Contact from "./Pages/Contact"; 
import Login from "./Pages/Login"; 
import SignIN from "./Pages/SignIn"; 
import TherapistsList from "./Pages/TherapistsList";
import PaymentPage from "./Pages/PaymentPage";
import BookDetail from "./Components/BookDetail/BookDetail";
import Recommendation from "./Pages/recommendation";
export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/therapists-list" element={<TherapistsList />} />
        <Route path="/BookShop" element={<BookShop />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<SignIN />} /> 
        <Route path="/payment" element={<PaymentPage role="therapist" />} />

        <Route path="/book/:id" element={<BookDetail />} />
       


      <Route path="/recommendation" element={<Recommendation />} />

      </Routes>
    </Router>
  );
}
