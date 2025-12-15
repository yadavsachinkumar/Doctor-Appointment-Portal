import React, { useState, useEffect } from "react";
import axios from "axios";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    patientName: "",
    doctorId: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(res.data);
      } catch (err) {
        setError("Failed to load doctors");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { patientName, doctorId, date, time } = form;

    if (!patientName || !doctorId || !date || !time) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/appointments", form);
      alert("Appointment booked successfully");
      setForm({ patientName: "", doctorId: "", date: "", time: "" });
    } catch {
      alert("Booking failed");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading doctors...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  // Reusable styles
  const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      backgroundColor: "#f9f9f9",
    },
    title: { textAlign: "center", marginBottom: "20px" },
    form: { display: "flex", flexDirection: "column", gap: "12px" },
    input: { padding: "10px", fontSize: "14px", borderRadius: "5px", border: "1px solid #ccc" },
    button: {
      padding: "12px",
      backgroundColor: "#4CAF50",
      color: "white",
      fontWeight: "bold",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Book Appointment</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="patientName"
          placeholder="Patient Name"
          value={form.patientName}
          onChange={handleChange}
          style={styles.input}
        />
        <select
          name="doctorId"
          value={form.doctorId}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d.id || d._id} value={d.id || d._id}>
              {d.name} ({d.specialization})
            </option>
          ))}
        </select>
        <input type="date" name="date" value={form.date} onChange={handleChange} style={styles.input} />
        <input type="time" name="time" value={form.time} onChange={handleChange} style={styles.input} />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
