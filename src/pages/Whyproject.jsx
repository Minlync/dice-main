// src/pages/Whyproject.jsx
import React from "react";

const Whyproject = () => {
  return (
    <div
      style={{
        fontFamily: "Roboto, sans-serif",
        display: "flex",
        justifyContent: "center", // centers content horizontally
        padding: "40px",
      }}
    >
      {/* Container with max width */}
      <div style={{ maxWidth: "1200px", width: "100%" }}>
        
        {/* Section 1: 2 columns with placeholder image */}
        <section
          style={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
            marginBottom: "60px",
            flexWrap: "wrap", // responsive: stacks on small screens
          }}
        >
          {/* Left column: text */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            <h1>Why We Created This Project</h1>
            <p>
              This project was designed to solve real user problems, simplify processes,
              and provide a better experience. We focused on making it easy to understand
              and use for everyone.
            </p>
            <p>
              The goal was to combine functionality with usability, creating something
              that people actually need and enjoy.
            </p>
          </div>

          {/* Right column: placeholder image */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            <img
              src="https://source.unsplash.com/600x400/?technology,abstract"
              alt="Project Illustration"
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </div>
        </section>

        {/* Section 2: pure text */}
        <section>
          <h1>Our Vision</h1>
          <p>
            The idea behind this project is to provide clarity, efficiency, and a platform
            for people to engage with tools that make life easier. We aim to constantly
            improve and iterate based on real feedback.
          </p>
          <p>
            By focusing on user needs first, we hope to create a product that truly makes
            a difference and stands the test of time.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Whyproject;
