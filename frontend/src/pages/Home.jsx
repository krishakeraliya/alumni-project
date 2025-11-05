// src/pages/Home.jsx
import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import AuthModal from "../components/AuthModal";
import GalleryPreview from "../components/GalleryPreview";
import Footer from "../components/Footer";

function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Header />
      <Navbar onLoginClick={() => setShowModal(true)} />
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
      <HeroSlider />
      <GalleryPreview/>
      <Footer/>
    </>
  );
}

export default Home;
