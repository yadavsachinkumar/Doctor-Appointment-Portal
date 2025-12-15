import { Routes, Route, Link } from "react-router-dom";
import DoctorList from "./pages/DoctorList";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";
import "./App.css";

function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-btn">Doctors</Link>
        <Link to="/book" className="nav-btn">Book</Link>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<DoctorList />} />
          <Route path="/book" element={<BookAppointment />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
