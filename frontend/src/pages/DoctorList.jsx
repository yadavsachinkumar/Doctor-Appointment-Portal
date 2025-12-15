import { useEffect, useState } from "react";

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Doctors</h2>

      {doctors.length === 0 ? (
        <p style={{ textAlign: "center" }}>Loading doctors...</p>
      ) : (
        doctors.map((doc) => (
          <div
            key={doc.id || doc._id} // works even if backend uses _id
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#fff",
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 5px 0" }}>{doc.name}</h3>
              <p style={{ margin: 0, color: "#555" }}>{doc.specialization}</p>
            </div>
            <div style={{ fontWeight: "bold", color: "#4CAF50" }}>
              ₹{doc.fee || doc.consultationFee}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
