// frontend/src/pages/Contact.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

function Contact() {
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-[#10B981] text-2xl" />,
      title: "Address",
      detail:
        "Sarvajanik College of Engineering & Technology (SCET), Surat, Gujarat",
    },
    {
      icon: <FaEnvelope className="text-[#10B981] text-2xl" />,
      title: "Email",
      detail: "mitali.desai@scet.ac.in",
    },
    {
      icon: <FaPhone className="text-[#10B981] text-2xl" />,
      title: "Phone",
      detail: "94286 29730",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen py-16 px-6">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-[#1E3A8A]">Contact Us</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
          We’d love to hear from you. Reach out for queries, collaborations, or
          support.
        </p>
      </motion.div>

      {/* Contact Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="container mx-auto max-w-5xl bg-white rounded-xl shadow-xl p-10"
      >
        <h2 className="text-2xl font-semibold text-[#1E3A8A] mb-8 text-center">
          Get in Touch
        </h2>

        {/* Animated Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {contactInfo.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 p-6 rounded-xl shadow-md flex flex-col items-center text-center"
            >
              {item.icon}
              <h3 className="text-lg font-semibold text-[#1E3A8A] mt-3">
                {item.title}
              </h3>
              <p className="text-gray-700 mt-2">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Guided By Section ABOVE Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#1E3A8A] to-[#10B981] text-white p-5 rounded-lg shadow-md text-center mb-8"
        >
          <p className="font-medium text-lg">
            Guided by <span className="font-semibold">Prof. Mitali Desai</span>{" "}
            (IC Starfrom)
          </p>
          <a
            href="https://www.linkedin.com/in/mitali-desai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-2 text-white hover:text-gray-200 transition"
          >
            <FaLinkedin className="mr-2 text-xl" /> LinkedIn Profile
          </a>
        </motion.div>

        {/* Map Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <iframe
            title="SCET Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.5600547110665!2d72.83106057499637!3d21.17024028207457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e48f79cd6f3%3A0xa82d49f683e4c2a!2sSarvajanik%20College%20Of%20Engineering%20%26%20Technology%20(SCET)!5e0!3m2!1sen!2sin!4v1708270000000!5m2!1sen!2sin"
            className="w-full h-80 rounded-xl border-0 shadow-md"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Contact;