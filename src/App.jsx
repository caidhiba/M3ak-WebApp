import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import BookShop from "./Pages/BookShop";
import Header from "./Components/Header/Header";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import SignIN from "./Pages/SignIn";
import TherapistsList from "./Pages/TherapistsList";
import PaymentPage from "./Pages/PaymentPage";
import Business from "./Pages/Business";
import BookDetail from "./Components/BookDetail/BookDetail";

import FindATherapist from "./Pages/FindATherapist";

import Recommendation from "./Pages/Recommendation";
import RoleProvider from "../src/auth/RoleContext";//pour que le user si il est thyra

import VideoCall from "./Pages/InVideoCall";
import ChatApp from "./Pages/ChatApp";
import PrivateRoute from "./auth/PrivateRoute";//pour que le user si il est authentifié ou pas
//  const userRole = "therapist"
// export default function App() {
 
//   return (
//     <Router>
      
//       <Header  role={userRole}/>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/therapists-list" element={<TherapistsList />} />
//         <Route path="/BookShop" element={<BookShop />} />
//         <Route path="/contact" element={<Contact />} /> 
//         <Route path="/login" element={<Login />} /> 
//         <Route path="/signup" element={<SignIN />} /> 
//         <Route path="/payment" element={<PaymentPage role="therapist" />} />
//        <Route path="/Business" element={<Business/>} /> 
//         <Route path="/book/:id" element={<BookDetail />} />
//        <Route path="/recommendation" element={<Recommendation />} />
//       </Routes>
//     </Router>
//   );
// }

//import Recommendation from "./Pages/recommendation";


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
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/FindATherapist" element={<FindATherapist />} />
          
          {/**************************************************** */}  
          {/** pour les page qui sont accessible par le user si il est authentifié */}         
          {/*<Route element={<PrivateRoute />}>  🗒️ decommente le PrivateRoute pour que le user si il est authentifié ou pas*/}
           
                 <Route path="/payment" element={<PaymentPage />} />
                 {/* Route réservée aux clients */}
                 <Route element={<RoleProvider allowedRoles={["patient"]} />}>
                      <Route path="/Business" element={<Business />} />
                 </Route>
         
                 {/* Routes réservées aux thérapeutes */}
                 <Route element={<RoleProvider allowedRoles={["therapeute"]} />}>
                     <Route path="/recommendation" element={<Recommendation />} />
                 </Route>

                 <Route path="/VideoCall" element={<VideoCall />} />
                 <Route path="/MyContactes" element={<ChatApp />} />
          
          {/*</Route>*/}
          {/**************************************************** */}     
        </Routes>     
      </Router>


  );
}