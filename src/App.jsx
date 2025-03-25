import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to install axios: npm install axios
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import "./index.css";

function App() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: "", age: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch students from backend on mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/students/");
        console.log("Fetched students:", response.data); // Add this for debugging
        setStudents(response.data);
      } catch (error) {
        console.error(
          "Detailed error:",
          error.response ? error.response.data : error.message
        );
      }
    };
    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.age !== ""
    ) {
      setSuccessMessage(""); // Reset success message
      setIsLoading(true);

      try {
        // Send data to backend
        const response = await axios.post(
          "http://localhost:8000/api/students/",
          formData
        );

        // Add new student to local state
        const newStudent = response.data;
        setStudents((prevStudents) => [...prevStudents, newStudent]);

        // Reset form and show success message
        setFormData({ name: "", age: "", email: "" });
        setIsLoading(false);

        setSuccessMessage("Your entry is successfully saved!");
        setTimeout(() => setSuccessMessage(""), 2000);

        // Navigate to list
        setTimeout(() => {
          navigate("/list");
        }, 200);
      } catch (error) {
        console.error("Error adding student", error);
        setIsLoading(false);
        setSuccessMessage("Failed to add student. Please try again.");
      }
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      // Delete from backend
      await axios.delete(`http://localhost:8000/api/students/${id}/`);

      // Remove from local state
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
    } catch (error) {
      console.error("Error deleting student", error);
    }
  };

  // Rest of the code remains the same...
  // Just replace handleDeleteStudent in StudentList with:
  // handleDeleteStudent={(student) => handleDeleteStudent(student.id)}

  // ... (rest of your existing components)
}

export default App;
