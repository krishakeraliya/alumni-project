// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../App.css"; 

// const images = [
//   "/assets/gallery1.jpg",
//   "/assets/gallery2.jpg",
//   "/assets/gallery3.jpg",
//   "/assets/gallery4.jpg",
//   "/assets/gallery5.jpg",
//   "/assets/gallery6.jpg",
//   "/assets/gallery7.jpg",
//   "/assets/gallery8.jpg",
//   "/assets/gallery9.jpg",
//   "/assets/gallery10.jpg",
// ];

// const GalleryPreview = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-white py-10" onClick={() => navigate("/gallery")}>
//       <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-8 underline underline-offset-8 decoration-sky-400">
//         Gallery Preview
//       </h2>

//       <div className="overflow-hidden max-w-7xl mx-auto rounded-2xl shadow-md border border-gray-200">
//         <div className="infinite-scroll-track">
//           <div className="infinite-scroll-content">
//             {images.map((src, i) => (
//               <img
//                 key={`img1-${i}`}
//                 src={src}
//                 alt={`Gallery ${i + 1}`}
//                 className="w-64 h-44 object-cover rounded-xl shadow-md mx-2 hover:scale-105 transition-transform duration-300"
//               />
//             ))}
//             {images.map((src, i) => (
//               <img
//                 key={`img2-${i}`}
//                 src={src}
//                 alt={`Gallery ${i + 1}`}
//                 className="w-64 h-44 object-cover rounded-xl shadow-md mx-2 hover:scale-105 transition-transform duration-300"
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       <p className="text-center text-sm text-gray-500 mt-4 italic">
//         Click to view full gallery →
//       </p>
//     </div>
//   );
// };

// export default GalleryPreview;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import api from "../api/api";

const GalleryPreview = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const base = api?.defaults?.baseURL?.replace(/\/api\/?$/, "") || window.location.origin || "http://localhost:5000";

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/gallery');
        setImages(res.data.images || []);
      } catch (err) {
        console.error('Failed to load gallery preview', err);
      }
    };
    fetch();
  }, []);

  const previewImages = images.slice(0, 10);

  return (
    <div className="bg-white py-10" onClick={() => navigate("/gallery")}>
      <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-8 underline underline-offset-8 decoration-sky-400">
        Gallery Preview
      </h2>

      <div className="overflow-hidden max-w-7xl mx-auto rounded-2xl shadow-md border border-gray-200">
        <div className="infinite-scroll-track">
          <div className="infinite-scroll-content flex items-center px-4 py-6">
            {previewImages.length > 0 ? (
              previewImages.map((img, i) => (
                <img
                  key={`img1-${i}`}
                  src={img.url.startsWith('http') ? img.url : `${base}${img.url}`}
                  alt={img.originalName || `Gallery ${i + 1}`}
                  className="w-64 h-44 object-cover rounded-xl shadow-md mx-2 hover:scale-105 transition-transform duration-300"
                />
              ))
            ) : (
              <p className="text-gray-500 px-4">No gallery images yet — click to add.</p>
            )}
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-4 italic">
        Click to view full gallery →
      </p>
    </div>
  );
};

export default GalleryPreview;
