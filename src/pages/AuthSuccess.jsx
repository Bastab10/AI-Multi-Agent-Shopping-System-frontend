import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const userParam = searchParams.get("user");

    if (!token || !userParam) {
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(decodeURIComponent(userParam));

      login(user, token);

      navigate("/");
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          Signing you in...
        </h2>

        <p className="mt-3 text-gray-500">
          Please wait...
        </p>
      </div>
    </div>
  );
}