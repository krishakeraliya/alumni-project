



// // src/pages/FullGallery.jsx
// import React, { useEffect, useState } from "react";
// import api from "../api/api";

// function FullGallery() {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const res = await api.get('/gallery');
//         setImages(res.data.images || []);
//       } catch (err) {
//         console.error("Error fetching gallery images:", err);
//       }
//     };
//     fetchImages();
//   }, []);

//   // helper to build absolute URL if backend served at different origin
// const base = api?.defaults?.baseURL?.replace(/\/api\/?$/, "") || window.location.origin || "http://localhost:5000";

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white px-6 py-12">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl sm:text-5xl font-bold text-center text-blue-900 mb-12">
//           SCET Nexus <span className="text-blue-500">Gallery</span>
//         </h1>

//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {images.map((img, idx) => (
//             <div
//               key={img._id || idx}
//               className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-shadow duration-300"
//             >
//              <img
//   src={img.url.startsWith('http') ? img.url : `${base}${img.url}`}
//   alt={img.originalName || `Gallery ${idx + 1}`}
//   className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
// />
//             </div>
//           ))}
//         </div>

//         {images.length === 0 && (
//           <p className="text-center text-gray-500 mt-10 text-lg">No images to display yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default FullGallery;

import React, { useEffect, useState } from "react";
import api from "../api/api";

function FullGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api.get("/gallery");
        setImages(res.data.images || []);
      } catch (err) {
        console.error("Error fetching gallery images:", err);
      }
    };
    fetchImages();
  }, []);

  const base =
    api?.defaults?.baseURL?.replace(/\/api\/?$/, "") ||
    window.location.origin ||
    "http://localhost:5000";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 px-6 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-4 drop-shadow-sm tracking-tight">
          SCET Nexus <span className="text-blue-600">Gallery</span>
        </h1>
        <p className="text-gray-600 mb-12 text-base sm:text-lg">
          A visual collection capturing the spirit of innovation and collaboration at SCET.
        </p>

        {images.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {images.map((img, idx) => (
              <div
                key={img._id || idx}
                className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 bg-white/30 backdrop-blur-sm border border-white/50"
              >
                <img
                  src={
                    img.url.startsWith("http")
                      ? img.url
                      : `${base}${img.url}`
                  }
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Soft white fade overlay on hover */}
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-12 text-lg italic">
            No images to display yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default FullGallery;
