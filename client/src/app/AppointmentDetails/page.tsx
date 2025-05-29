'use client'
import React from "react";
import Header from "../components/Header"; // adjust the path as needed

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="p-6">
        <p className="text-gray-700 text-lg">Welcome to the homepage!</p>
      </main>
    </div>
  );
};

export default Home;