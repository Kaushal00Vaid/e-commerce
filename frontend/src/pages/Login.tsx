export default function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>Login</h1>
      <button onClick={handleLogin}>Continue with Google</button>
    </div>
  );
}
