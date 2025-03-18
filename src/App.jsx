import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import "./index.css";

function App() {
  useEffect(() => {
    const storedStudents = localStorage.getItem("students");
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }
  }, []);

  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: "", age: "", email: "" });

  const navigate = useNavigate();

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
      const updatedStudents = [...students, formData];
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      setFormData({ name: "", age: "", email: "" });
      alert("Your entry is successfully saved!");
      navigate("/list");
    }
  };

  const handleDeleteStudent = (index) => {
    setStudents((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <Navigation />
      <Routes>
        <Route
          path="/add"
          element={
            <AddStudent
              formData={formData}
              handleInputChange={handleInputChange}
              handleAddStudent={handleAddStudent}
            />
          }
        />
        <Route
          path="/list"
          element={
            <StudentList
              students={students}
              handleDeleteStudent={handleDeleteStudent}
            />
          }
        />
        <Route
          path="/list/:id"
          element={<SingleStudent students={students} />}
        />
        <Route path="*" element={<DefaultRedirect />} />
      </Routes>
    </div>
  );
}

function Navigation() {
  return (
    <div className="header">
      <Link to="/add" className="nav-button">
        Add
      </Link>
      <Link to="/list" className="nav-button">
        List
      </Link>
    </div>
  );
}

function AddStudent({ formData, handleInputChange, handleAddStudent }) {
  return (
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
            onChange={(e) => {
              const cleanedValue = e.target.value.replace(/[0-9]/g, "");
              handleInputChange({
                target: { name: "name", value: cleanedValue },
              });
            }}
            required
            title="Name cannot contain any numbers."
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
            onKeyDown={(e) => {
              if (e.key === "e" || e.key === "E") e.preventDefault();
            }}
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
            title="Email must contain both '.' and '@'"
          />
        </div>
        <button type="submit" className="submit-button">
          Save
        </button>
      </form>
    </div>
  );
}

function StudentList({ students, handleDeleteStudent }) {
  return (
    <div className="list-container">
      <h2>Student List</h2>
      {students.length === 0 ? (
        <p>No students added yet.</p>
      ) : (
        <ul className="student-list">
          {students.map((student, index) => (
            <li key={index} className="student-entry">
              <Link
                to={`/list/${index + 1}`}
                style={{ textDecoration: "none", color: "inherit", flex: 1 }}
              >
                <div className="student-info">
                  <p>
                    <strong>ID:</strong> {index + 1}
                  </p>
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
              </Link>
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
  );
}

function SingleStudent({ students }) {
  const { id } = useParams();
  const index = parseInt(id, 10) - 1;
  const student = students[index];
  if (!student) return <div>Student not found.</div>;
  return (
    <div className="form-container">
      <h2>Student Details</h2>
      <p>
        <strong>ID:</strong> {id}
      </p>
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
  );
}

function DefaultRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/add");
  }, [navigate]);
  return null;
}

export default App;
