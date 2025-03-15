import React from "react";

const Header = ({ view, setView }) => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        marginBottom: "1rem",
      }}
    >
      <button
        onClick={() => setView("add")}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: view === "add" ? "lightblue" : "white",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        Add
      </button>
      <button
        onClick={() => setView("list")}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: view === "list" ? "lightblue" : "white",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        List
      </button>
    </header>
  );
};

export default Header;
