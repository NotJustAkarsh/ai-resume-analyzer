import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import InterviewForm from "../components/InterviewForm";
import Footer from "../components/Footer";
import "../style/home.scss";

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <main className="home-main">
        <Hero />
        <InterviewForm />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
