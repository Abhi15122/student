import React from "react";

const StudentList = ({ students, onAddNew }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Student List</h2>
        <button
          onClick={onAddNew}
          style={{
            padding: "0.3rem 0.6rem",
            border: "1px solid #ccc",
            backgroundColor: "lightgreen",
            cursor: "pointer",
          }}
        >
          Add New Student
        </button>
      </div>
      {students.length === 0 ? (
        <p>No students added yet.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {students.map((student, index) => (
            <li
              key={index}
              style={{
                padding: "0.5rem",
                borderBottom: "1px solid #eee",
              }}
            >
              {student.name} {student.age && `- Age: ${student.age}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;
