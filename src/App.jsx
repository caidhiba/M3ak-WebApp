import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import TherapistsList from "./Pages/TherapistsList";
import Header from "./Components/Header/Header"

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/therapists-list" element={<TherapistsList />} />
      </Routes>
    </Router>
  );
}
