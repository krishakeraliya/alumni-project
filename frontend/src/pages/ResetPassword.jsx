// import { useParams } from "react-router-dom";
// import { useState } from "react";

// function ResetPassword() {
//   const { token } = useParams();
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch(`http://192.168.46.221:5000/api/auth/reset-password/${token}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ password }),
//     });

//     const data = await res.json();
//     alert(data.message);
//   };

//   return (
//     <div className="p-4">
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           placeholder="New Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Reset</button>
//       </form>
//     </div>
//   );
// }

// export default ResetPassword;


import { useParams } from "react-router-dom";
import { useState } from "react";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (password !== confirmPassword) {
      setMsg("⚠ Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        `http://192.168.46.221:5000/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setMsg("❌ " + (data.message || "Reset failed"));
        return;
      }

      setMsg("✅ " + (data.message || "Password reset successful! Please login."));
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMsg("❌ Server error. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-lg">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
          🔐 Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div className="relative w-full">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-1 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="relative w-full">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-1 focus:ring-blue-500 outline-none"
              required
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
            >
              →
            </button>
          </div>

          {msg && (
            <p
              className={`text-sm text-center ${
                msg.startsWith("✅")
                  ? "text-green-600"
                  : msg.startsWith("⚠")
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {msg}
            </p>
          )}
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          <span
            onClick={() => (window.location.href = "/")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
