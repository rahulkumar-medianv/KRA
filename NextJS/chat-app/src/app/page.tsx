"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Send OTP
  // const handleSendOtp = async () => {
  //   if (!email) return;

  //   try {
  //     setLoading(true);
  //     setMessage("");

  //     const res = await fetch("http://localhost:3000/auth/send-otp", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email }),
  //     });

  //     if (!res.ok) throw new Error("Failed to send OTP");

  //     setShowModal(true);
  //   } catch (err: any) {
  //     setMessage(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Verify OTP
  // const handleVerifyOtp = async () => {
  //   if (otp.length !== 6) return;

  //   try {
  //     setVerifyLoading(true);

  //     const res = await fetch("http://localhost:3000/auth/verify-otp", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, otp }),
  //     });

  //     if (!res.ok) throw new Error("Invalid OTP");

  //     setShowModal(false);
  //     setMessage("✅ Login Successful!");
  //   } catch (err: any) {
  //     setMessage("❌ " + err.message);
  //   } finally {
  //     setVerifyLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-300 to-blue-200">
      {/* Card */}
      <div className="bg-white w-[380px] p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🔐 Login
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          // onClick={handleSendOtp}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>

      {/* OTP Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-[350px] p-6 rounded-2xl shadow-xl animate-scaleIn">
            <h3 className="text-xl font-semibold text-center mb-4">
              Enter 6-Digit OTP
            </h3>

            <input
              type="text"
              maxLength={6}
              className="w-full text-center tracking-[10px] text-xl px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={otp}
              // onChange={(e) =>
              //   setOtp(e.target.value.replace(/\D/g, ""))
              // }
            />

            <button
              // onClick={handleVerifyOtp}
              disabled={verifyLoading}
              className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 disabled:opacity-50"
            >
              {verifyLoading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}