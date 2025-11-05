// // frontend/src/components/Footer.jsx
// import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
// import { Link } from "react-router-dom";

// function Footer() {
//   return (
//     <footer className="bg-[#111827] text-[#F9FAFB]">
//       {/* Top Border */}
//       <div className="h-1 w-full bg-gradient-to-r from-[#1E3A8A] to-[#10B981]"></div>

//       {/* Main Footer */}
//       <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//         {/* Column 1: Logo & About */}
//         <div>
//           <div className="flex items-center gap-2 mb-4">
//             <div className="w-10 h-10 bg-gradient-to-r from-[#1E3A8A] to-[#10B981] rounded-full flex items-center justify-center text-white font-bold text-lg">
//               N
//             </div>
//             <h2 className="text-2xl font-bold">SCET Nexus</h2>
//           </div>
//           <p className="text-gray-300 text-sm leading-relaxed">
//             SCET Nexus connects alumni, students, and faculty, fostering growth
//             and opportunities for the entire SCET community.
//           </p>
//         </div>
        
//         {/* Column 2: Quick Links */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//           <ul className="space-y-2 text-sm">
//             {["Home", "About Us", "Gallery", "Contact"].map((link, idx) => (
//               <li key={idx}>
//                 <Link
//                   to={`/${link.toLowerCase().replace(" ", "")}`}
//                   className="text-gray-300 hover:text-[#10B981] transition-colors duration-200"
//                 >
//                   {link}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Column 3: Contact Info */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
//           <ul className="text-sm text-gray-300 space-y-2">
//             <li>📍 Sarvajanik College of Engineering & Technology, Surat</li>
//             <li>📧 mitalidesai@scet.ac.in</li>
//             <li>☎️ +91 12345 67890</li>
//           </ul>
//         </div>

//         {/* Column 4: Social Media */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
//           <div className="flex space-x-4">
//             <a
//               href="https://linkedin.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-[#1E3A8A] hover:bg-[#10B981] transition-colors p-3 rounded-full shadow-md"
//             >
//               <FaLinkedin className="text-white text-xl" />
//             </a>
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-[#1E3A8A] hover:bg-[#10B981] transition-colors p-3 rounded-full shadow-md"
//             >
//               <FaInstagram className="text-white text-xl" />
//             </a>
//             <a
//               href="https://facebook.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-[#1E3A8A] hover:bg-[#10B981] transition-colors p-3 rounded-full shadow-md"
//             >
//               <FaFacebook className="text-white text-xl" />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
//         © 2025 SCET Nexus | Crafted by Harshil Gajipara & Krisha Keraliya 
//       </div>
//     </footer>
//   );
// }

// export default Footer;


// frontend/src/components/Footer.jsx
import { FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const links = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Gallery", path: "/gallery" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-[#111827] text-[#F9FAFB]">
      {/* Top Border */}
      <div className="h-1 w-full bg-gradient-to-r from-[#1E3A8A] to-[#10B981]"></div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Logo & About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-[#1E3A8A] to-[#10B981] rounded-full flex items-center justify-center text-white font-bold text-lg">
              N
            </div>
            <h2 className="text-2xl font-bold">SCET Nexus</h2>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            SCET Nexus connects alumni, students, and faculty, fostering growth
            and opportunities for the entire SCET community.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {links.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.path}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-gray-300 hover:text-[#10B981] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>📍 Sarvajanik College of Engineering & Technology, Surat</li>
            <li>📧 mitali.desai@scet.ac.in</li>
            <li>☎️ +91 94286 29730</li>
          </ul>
        </div>

        {/* Column 4: Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/school/sarvajanik-college-of-engineering-&-technology/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1E3A8A] hover:bg-[#10B981] transition-colors p-3 rounded-full shadow-md"
            >
              <FaLinkedin className="text-white text-xl" />
            </a>
            <a
              href="https://www.instagram.com/scet____/?igsh=ZXlwMGQ0NTdvaG5h#"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1E3A8A] hover:bg-[#10B981] transition-colors p-3 rounded-full shadow-md"
            >
              <FaInstagram className="text-white text-xl" />
            </a>
            <a
              href="https://www.youtube.com/@scetofficial4273"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1E3A8A] hover:bg-[#10B981] transition-colors p-3 rounded-full shadow-md"
            >
              <FaYoutube className="text-white text-xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © 2025 SCET Nexus | Crafted by Harshil Gajipara & Krisha Keraliya
      </div>
    </footer>
  );
}

export default Footer;

