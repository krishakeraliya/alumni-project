

// import React, { useState, useEffect, useRef } from "react";
// import api from "../api/api";

// export default function AdminGallery() {
//   const [files, setFiles] = useState([]);
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     loadImages();
//   }, []);

//   const loadImages = async () => {
//     try {
//       const res = await api.get('/gallery');
//       setImages(res.data.images || []);
//     } catch (err) {
//       console.error("Error loading images:", err);
//     }
//   };

//   const onFileChange = (e) => {
//     setFiles(e.target.files);
//   };

//   const handleSelectFiles = () => {
//     if (fileInputRef.current) fileInputRef.current.click();
//   };

//   const handleUpload = async () => {
//     if (!files || files.length === 0) return alert("Select images first");

//     const form = new FormData();
//     for (let i = 0; i < files.length; i++) {
//       form.append('images', files[i]);
//     }
//     form.append('uploadedBy', 'admin');

//     try {
//       setLoading(true);
//       await api.post('/gallery/upload', form, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setFiles([]);
//       loadImages();
//       alert('Upload successful');
//     } catch (err) {
//       console.error("Upload error:", err);
//       alert('Upload failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!id) return alert("Invalid image ID");
//     if (!window.confirm('Delete this image?')) return;

//     try {
//       // call backend to delete image
//       const res = await api.delete(`/gallery/${id}`);
//       if (res.status === 200) {
//         // reload images after successful delete
//         loadImages();
//         alert("Image deleted successfully");
//       } else {
//         alert("Failed to delete image");
//       }
//     } catch (err) {
//       // log full error for debugging
//       console.error("Delete error:", err.response || err);
//       // show message even if file was missing but DB record deleted
//       if (err.response && err.response.data && err.response.data.message) {
//         alert(err.response.data.message);
//       } else {
//         alert("Delete failed. Check console for details.");
//       }
//     }
//   };

//   // derive base URL safely
//   const base = api?.defaults?.baseURL?.replace(/\/api\/?$/, "") || window.location.origin || "http://localhost:5000";

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Admin Gallery</h2>

//       <div className="mb-6 flex items-center gap-4">
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={onFileChange}
//           ref={fileInputRef}
//           style={{ display: 'none' }}
//         />
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-600 text-white rounded"
//           onClick={handleSelectFiles}
//         >
//           Select Images
//         </button>
//         <button
//           type="button"
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//           onClick={handleUpload}
//           disabled={loading}
//         >
//           {loading ? 'Uploading...' : 'Upload'}
//         </button>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {images.length === 0 && <p>No images available</p>}
//         {images.map(img => (
//           <div key={img._id || img.id} className="relative">
//             <img
//               src={img.url.startsWith('http') ? img.url : `${base}${img.url}`}
//               alt={img.originalName || 'image'}
//               className="w-full h-40 object-cover rounded"
//             />
//             <button
//               onClick={() => handleDelete(img._id || img.id)}
//               className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from "react";
import api from "../api/api";
import toast, { Toaster } from "react-hot-toast";  // <-- import toast

export default function AdminGallery() {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const res = await api.get('/gallery');
      setImages(res.data.images || []);
    } catch (err) {
      console.error("Error loading images:", err);
      toast.error("Failed to load images");
    }
  };

  const onFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSelectFiles = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) return toast.error("Select images first");

    const form = new FormData();
    for (let i = 0; i < files.length; i++) {
      form.append('images', files[i]);
    }
    form.append('uploadedBy', 'admin');

    try {
      setLoading(true);
      await api.post('/gallery/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFiles([]);
      loadImages();
      toast.success("Upload successful");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return toast.error("Invalid image ID");
    if (!window.confirm('Delete this image?')) return;

    try {
      const res = await api.delete(`/gallery/${id}`);
      if (res.status === 200) {
        loadImages();
        toast.success("Image deleted successfully");
      } else {
        toast.error("Failed to delete image");
      }
    } catch (err) {
      console.error("Delete error:", err.response || err);
      if (err.response?.data?.message) toast.error(err.response.data.message);
      else toast.error("Delete failed. Check console.");
    }
  };

  const base = api?.defaults?.baseURL?.replace(/\/api\/?$/, "") || window.location.origin || "http://localhost:5000";

  return (
    <div className="p-6">
      <Toaster position="top-right" reverseOrder={false} />  {/* <-- Add Toaster */}
      <h2 className="text-2xl font-bold mb-4">Admin Gallery</h2>

      <div className="mb-6 flex items-center gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <button
          type="button"
          className="px-4 py-2 bg-gray-600 text-white rounded"
          onClick={handleSelectFiles}
        >
          Select Images
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.length === 0 && <p>No images available</p>}
        {images.map(img => (
          <div key={img._id || img.id} className="relative">
            <img
              src={img.url.startsWith('http') ? img.url : `${base}${img.url}`}
              alt={img.originalName || 'image'}
              className="w-full h-40 object-cover rounded"
            />
            <button
              onClick={() => handleDelete(img._id || img.id)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

