import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import AuthSuccess from "./pages/AuthSuccess.tsx";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
      </Routes>
    </>
  );
}

export default App;
