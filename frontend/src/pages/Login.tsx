import { Sparkles } from "lucide-react";

export default function Login() {
  const googleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    // Background: Deep Royal Gradient
    <div className="min-h-screen bg-gradient-to-br from-[#2E1A47] via-[#24123a] to-[#1a0b2e] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[150px] opacity-5 pointer-events-none"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-[#3D2459]/80 backdrop-blur-md shadow-2xl rounded-2xl p-10 max-w-sm w-full border border-[#D4AF37]/30">
        <div className="flex justify-center mb-4">
          <Sparkles className="text-[#D4AF37] w-8 h-8 opacity-80" />
        </div>

        <h1 className="text-4xl font-serif font-bold text-center text-[#D4AF37] tracking-wide drop-shadow-sm">
          Welcome Back
        </h1>

        <p className="mt-4 text-center text-[#CAB8D9] text-sm font-light leading-relaxed">
          Sign in to continue your journey into <br /> timeless handcrafted
          artistry.
        </p>

        <button
          onClick={googleLogin}
          className="group w-full mt-10 py-3.5 rounded-xl border border-[#D4AF37] text-[#D4AF37] font-semibold hover:bg-[#D4AF37] hover:text-[#2E1A47] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-[#D4AF37]/20"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="google"
            className="w-5 h-5 grayscale group-hover:grayscale-0 transition duration-300"
          />
          Continue with Google
        </button>

        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="h-[1px] w-12 bg-[#D4AF37]/20"></div>
          <span className="text-[#CAB8D9] text-xs uppercase tracking-widest">
            Secure Access
          </span>
          <div className="h-[1px] w-12 bg-[#D4AF37]/20"></div>
        </div>
      </div>
    </div>
  );
}
