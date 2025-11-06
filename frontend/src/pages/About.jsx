// frontend/src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaFileAlt,
  FaHandshake,
  FaLock,
  FaCamera,
  FaBullhorn,
  FaLaptopCode,
  FaChalkboardTeacher,
} from "react-icons/fa";
import AboutImg from "../assets/about.png"; // replace with real SCET image

function About() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
        {/* Left - Image */}
        <div className="flex-1">
          <img
            src={AboutImg}
            alt="SCET Nexus Illustration"
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* Right - Content */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-[#1E3A8A] mb-4 flex items-center gap-3">
            <FaLaptopCode className="text-[#10B981]" />
            About <span className="text-[#10B981]">SCET Nexus</span>
          </h1>
          <h3 className="text-xl italic text-gray-600 mb-6">
            "Connecting Alumni, Students & Opportunities at SCET"
          </h3>
          {/* <p className="text-gray-700 leading-relaxed mb-4">
            <strong>SCET Nexus</strong> is a dedicated digital platform designed
            for the <strong>Sarvajanik College of Engineering & Technology</strong>.
            It focuses exclusively on helping students of SCET connect with alumni
            for <span className="text-[#10B981] font-medium">summer internships </span> 
            and <span className="text-[#10B981] font-medium">final-year projects</span>.
          </p> */}
           <p className="text-gray-700 leading-relaxed mb-4">
            <strong>SCET Nexus</strong> is a dedicated digital platform designed for the
            <strong> Sarvajanik College of Engineering & Technology</strong>.
           It serves as a bridge between students and alumni, where final-year students can share their internship and project experiences, and juniors can explore these to connect, learn, and grow.
          </p>
        </div>
      </section>

      {/* What & Why Section */}
      <section className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        {/* <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold text-[#1E3A8A] mb-4">
            What is SCET Nexus?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            SCET Nexus is not just a portal, it’s a bridge between{" "}
            <strong>students</strong> and <strong>alumni</strong>. 
            It provides a structured way to find guidance, opportunities, 
            and connect with mentors for academic and professional growth.
          </p>
        </div> */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold text-[#1E3A8A] mb-4">
            What is SCET Nexus?
          </h2>
          <p className="text-gray-700 leading-relaxed">
      SCET Nexus is not just a portal — it’s a bridge that connects
            <strong> students</strong>  across <strong>batches and with alumni.
</strong>. 
           It provides a structured way for final-year students to share their experiences and for juniors to gain guidance, opportunities, and mentorship for academic and professional growth.
          </p>
        </div>

{/* 
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold text-[#1E3A8A] mb-4">
            Why SCET Nexus?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Students often struggle to find the right internships and reliable
            project guidance. Nexus ensures that opportunities come directly 
            from trusted alumni, creating a safe, reliable, and 
            <span className="text-[#10B981] font-medium"> SCET-only ecosystem</span>.
          </p>
        </div> */}
         <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold text-[#1E3A8A] mb-4">
            Why SCET Nexus?
          </h2>
          <p className="text-gray-700 leading-relaxed">
         Students often face challenges in finding genuine internships and reliable project guidance.
Nexus bridges this gap by offering verified opportunities shared by final-year students and trusted alumni, creating a secure and
            <span className="text-[#10B981] font-medium"> SCET-exclusive learning ecosystem.

</span>.
          </p>
        </div>
      </section>

      {/* How Section */}
      <section className="container mx-auto px-6 py-12">
        {/* <div className="bg-gradient-to-r from-[#1E3A8A] to-[#10B981] rounded-xl shadow-lg p-10 text-white">
          <h2 className="text-3xl font-semibold mb-6">How SCET Nexus Works?</h2>
          <ol className="list-decimal ml-6 space-y-3">
            <li>Students log in securely using SCET credentials.</li>
            <li>Alumni post available internships & project opportunities.</li>
            <li>Students can apply directly through Nexus portal.</li>
            <li>Faculty validate and monitor all activities.</li>
            <li>Students gain real-world exposure & alumni give back to SCET.</li>
          </ol>
        </div> */}
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#10B981] rounded-xl shadow-lg p-10 text-white">
          <h2 className="text-3xl font-semibold mb-6">How SCET Nexus Works?</h2>
          <ol className="list-decimal ml-6 space-y-3">
            <li>Students log in securely using SCET credentials.</li>
            <li>Alumni post available internships & project opportunities.</li>
            <li>Final-year students share their own internship and project experiences, while juniors explore them for guidance.</li>
            <li>Faculty validate and monitor all activities.</li>
            <li>Students gain real-world exposure & alumni give back to SCET.</li>
          </ol>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { icon: <FaBriefcase className="text-[#10B981] text-3xl" />, title: "Internship Opportunities" },
          { icon: <FaFileAlt className="text-[#1E3A8A] text-3xl" />, title: "Final Year Projects" },
          { icon: <FaHandshake className="text-[#10B981] text-3xl" />, title: "Alumni-Student Mentorship" },
          { icon: <FaLock className="text-[#1E3A8A] text-3xl" />, title: "Secure Authentication" },
          { icon: <FaCamera className="text-[#10B981] text-3xl" />, title: "Event Gallery" },
          { icon: <FaBullhorn className="text-[#1E3A8A] text-3xl" />, title: "Official Announcements" },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition"
          >
            {feature.icon}
            <h3 className="text-lg font-medium text-gray-700">
              {feature.title}
            </h3>
          </motion.div>
        ))}
      </section>

      {/* Vision & Mission */}
      <section className="container mx-auto px-6 py-12 text-center">
        {/* <h2 className="text-3xl font-semibold text-[#1E3A8A] mb-4">
          Vision & Mission
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          The vision of SCET Nexus is to create a sustainable digital ecosystem 
          where <strong>alumni</strong> and <strong>students</strong> collaborate 
          to foster innovation, professional development, and career growth.  
          Our mission is to make internships and final-year projects more accessible, 
          transparent, and impactful for every SCET student.
        </p> */}
        <h2 className="text-3xl font-semibold text-[#1E3A8A] mb-4">
          Vision & Mission
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          The vision of SCET Nexus is to build a collaborative digital ecosystem
          where <strong>alumni</strong> and <strong>students</strong> stay connected, sharing experiences that inspire innovation and growth.
          Our mission is to make internship and project experiences — from final-year students to alumni — accessible, authentic, and valuable for every SCET learner.
        </p>
      </section>

      {/* Credits */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03, boxShadow: "0px 10px 25px rgba(16,185,129,0.4)" }}
          className="bg-white rounded-xl shadow-lg p-8 text-center"
        >
          <h2 className="text-2xl font-semibold text-[#1E3A8A] mb-4 flex items-center justify-center gap-2">
            <FaLaptopCode className="text-[#10B981]" /> Crafted & Designed By
          </h2>
          <p className="text-gray-700">Harshil Gajipara & Krisha Keraliya</p>

          <h2 className="text-2xl font-semibold text-[#10B981] mt-6 mb-4 flex items-center justify-center gap-2">
            <FaChalkboardTeacher className="text-[#1E3A8A]" /> Guided By
          </h2>
          <p className="text-gray-700">
            Prof. Mitali Desai <br />
            <span className="text-sm italic">
              Internship & Project Coordinator
            </span>
          </p>
        </motion.div>
      </section>
    </div>
  );
}

export default About;
