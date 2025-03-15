import React, { useState } from "react";
import "./index.css";

export default function App() {
  const [view, setView] = useState("add");
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: "", age: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (formData.name.trim() !== "") {
      setStudents((prev) => [...prev, formData]);
      setFormData({ name: "", age: "" });
    }
  };

  return (
    <div className="container">
      {/* Navigation Buttons */}
      <header className="header">
        <button
          className={`nav-button ${view === "add" ? "active" : ""}`}
          onClick={() => setView("add")}
        >
          Add
        </button>
        <button
          className={`nav-button ${view === "list" ? "active" : ""}`}
          onClick={() => setView("list")}
        >
          List
        </button>
      </header>

      {/* Add Form */}
      {view === "add" && (
        <div className="form-container">
          <h2>Add Student</h2>
          <form onSubmit={handleAddStudent}>
            <div className="input-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="submit-button">
              Save
            </button>
          </form>
        </div>
      )}

      {/* Student List Dropdown */}
      {view === "list" && (
        <div className="list-container">
          <h2>Student List</h2>
          {students.length === 0 ? (
            <p>No students added yet.</p>
          ) : (
            <details className="dropdown">
              <summary>Show Students</summary>
              <ul className="student-list">
                {students.map((student, index) => (
                  <li key={index}>
                    {student.name} - Age: {student.age || "N/A"}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
