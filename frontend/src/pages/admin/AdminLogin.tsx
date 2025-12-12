import axios from "axios";
import { useState } from "react";
import { ShieldCheck, Lock, Mail } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("adminToken", res.data.token);
      window.location.href = "/admin/products";
    } catch (e) {
      alert("Invalid Login");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E1A47] via-[#24123a] to-[#1a0b2e] flex items-center justify-center px-6">
      {/* Admin Card */}
      <div className="max-w-md w-full bg-[#3D2459]/90 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-10 shadow-2xl relative overflow-hidden">
        {/* Top Gold Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#D4AF37]/10 p-4 rounded-full mb-4 border border-[#D4AF37]/20 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <ShieldCheck className="text-[#D4AF37] w-10 h-10" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#F3E5AB] tracking-wide">
            Admin Portal
          </h2>
          <p className="text-[#CAB8D9] text-sm mt-2 font-light">
            Authorized Personnel Only
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-2">
              Admin ID
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 group-focus-within:text-[#D4AF37] transition"
                size={18}
              />
              <input
                type="email"
                placeholder="admin@hindcrafts.com"
                className="w-full bg-[#2E1A47] border border-[#D4AF37]/30 rounded-lg py-3.5 pl-12 pr-4 text-[#F3E5AB] placeholder-[#CAB8D9]/30 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-2">
              Secure Key
            </label>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 group-focus-within:text-[#D4AF37] transition"
                size={18}
              />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#2E1A47] border border-[#D4AF37]/30 rounded-lg py-3.5 pl-12 pr-4 text-[#F3E5AB] placeholder-[#CAB8D9]/30 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleLogin}
            className="w-full mt-4 bg-[#D4AF37] text-[#2E1A47] py-4 rounded-lg font-bold text-lg hover:bg-[#C5A065] transition shadow-lg shadow-[#D4AF37]/10 active:scale-[0.98]"
          >
            Authenticate Access
          </button>
        </div>

        {/* Footer Text */}
        <p className="text-center text-[#CAB8D9]/40 text-xs mt-8">
          System Activity is Logged & Monitored
        </p>
      </div>
    </div>
  );
}
