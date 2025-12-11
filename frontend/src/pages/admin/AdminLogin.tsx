import axios from "axios";
import { useState } from "react";

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
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Admin Login</h2>

      <input
        type="email"
        placeholder="Admin Email"
        className="border p-2 w-full mb-2"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-2"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-black text-white px-4 py-2 rounded w-full"
      >
        Login
      </button>
    </div>
  );
}
