import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStudentForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() !== "") {
      onAdd(formData);
      setFormData({ name: "", age: "" });
    }
  };

  return (
    <div>
      <h2>Add Student</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age: </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          />
        </div>
        {/* Add more fields as needed */}
        <button
          type="submit"
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddStudentForm;
