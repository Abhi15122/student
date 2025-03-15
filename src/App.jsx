import React, { useState } from "react";
import "./index.css";

export default function App() {
  const [view, setView] = useState("add");
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: "", age: "", email: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.age !== ""
    ) {
      setStudents((prev) => [...prev, formData]);
      setFormData({ name: "", age: "", email: "" });
      alert("Your entry is successfully saved!");
    }
  };

  const handleDeleteStudent = (index) => {
    setStudents((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
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

      {view === "add" && (
        <div className="form-container">
          <h2>Add Student</h2>
          <form onSubmit={handleAddStudent}>
            <div className="input-group">
              <label>
                Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label>
                Age <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
                min="1"
                max="50"
                step="any"
              />
            </div>
            <div className="input-group">
              <label>
                Email <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                pattern="(?=.*@)(?=.*\.).+"
                title="Email must contain '@' and '.'"
              />
            </div>
            <button type="submit" className="submit-button">
              Save
            </button>
          </form>
        </div>
      )}

      {view === "list" && (
        <div className="list-container">
          <h2>Student List</h2>
          {students.length === 0 ? (
            <p>No students added yet.</p>
          ) : (
            <ul className="student-list">
              {students.map((student, index) => (
                <li key={index} className="student-entry">
                  <div className="student-info">
                    <p>
                      <strong>Name:</strong> {student.name}
                    </p>
                    <p>
                      <strong>Age:</strong> {student.age}
                    </p>
                    <p>
                      <strong>Email:</strong> {student.email}
                    </p>
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteStudent(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
