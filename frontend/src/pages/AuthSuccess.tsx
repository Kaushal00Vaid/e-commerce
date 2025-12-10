import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function AuthSuccess() {
  const [params] = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/";
    }
  }, []);

  return <h2>Logging you in...</h2>;
}
