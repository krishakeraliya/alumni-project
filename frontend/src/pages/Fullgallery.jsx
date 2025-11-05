// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function FullGallery() {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const res = await axios.get("/api/gallery");
//         setImages(res.data.images || []);
//       } catch (err) {
//         console.error("Error fetching gallery images:", err);
//       }
//     };

//     fetchImages();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white px-6 py-12">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl sm:text-5xl font-bold text-center text-blue-900 mb-12">
//           SCET Nexus <span className="text-blue-500">Gallery</span>
//         </h1>

//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {images.map((img, idx) => (
//             <div
//               key={idx}
//               className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-shadow duration-300"
//             >
//               <img
//                 src={img.url}
//                 alt={`Gallery ${idx + 1}`}
//                 className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
//               />
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



// src/pages/FullGallery.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api";

function FullGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api.get('/gallery');
        setImages(res.data.images || []);
      } catch (err) {
        console.error("Error fetching gallery images:", err);
      }
    };
    fetchImages();
  }, []);

  // helper to build absolute URL if backend served at different origin
const base = api?.defaults?.baseURL?.replace(/\/api\/?$/, "") || window.location.origin || "http://localhost:5000";

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-blue-900 mb-12">
          SCET Nexus <span className="text-blue-500">Gallery</span>
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((img, idx) => (
            <div
              key={img._id || idx}
              className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-shadow duration-300"
            >
             <img
  src={img.url.startsWith('http') ? img.url : `${base}${img.url}`}
  alt={img.originalName || `Gallery ${idx + 1}`}
  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
/>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <p className="text-center text-gray-500 mt-10 text-lg">No images to display yet.</p>
        )}
      </div>
    </div>
  );
}

export default FullGallery;

