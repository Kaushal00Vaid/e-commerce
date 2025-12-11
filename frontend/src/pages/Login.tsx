export default function Login() {
  const googleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="min-h-screen bg-[#F7EFE5] flex items-center justify-center px-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-sm w-full border border-[#E8DCCB]">
        <h1 className="text-3xl font-serif font-bold text-center text-[#8B5E34]">
          Welcome Back
        </h1>

        <p className="mt-3 text-center text-gray-600 text-sm">
          Sign in to continue your handcrafted shopping journey.
        </p>

        <button
          onClick={googleLogin}
          className="w-full mt-8 py-3 rounded-xl border border-[#8B5E34] text-[#8B5E34] hover:bg-[#8B5E34] hover:text-white transition flex items-center justify-center gap-3"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
