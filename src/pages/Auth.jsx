import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import { loginUser, registerUser } from "../services/authApi";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let res;

      if (isLogin) {
        res = await loginUser({
          email: form.email,
          password: form.password,
        });
      } else {
        if (form.password !== form.confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        res = await registerUser({
          name: form.name,
          email: form.email,
          password: form.password,
        });
      }

      login(res.data.user, res.data.token);

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {" "}
        {/* RIGHT SIDE */}
        <section className="w-full">
          <h2 className="text-4xl font-black text-gray-900">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="mt-2 text-gray-500">
            {isLogin
              ? "Sign in to continue to ShopIntel."
              : "Create your free ShopIntel account."}
          </p>{" "}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-5 py-4 pr-12 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {!isLogin && (
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Login"
                  : "Create Account"}

              <ArrowRight size={18} />
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-gray-500">OR</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full h-12 border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50"
            >
              <FcGoogle size={22} />
              Continue with Google
            </button>
          </form>
          <p className="mt-8 text-center text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}

            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setForm({
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                });
              }}
              className="ml-2 font-semibold text-blue-600 hover:text-blue-700 hover:underline transition"
            >
              {isLogin ? "Create Account" : "Login"}
            </button>
          </p>
          <p className="mt-8 text-center text-sm text-gray-400">
            By continuing you agree to our
            <span className="text-blue-600 cursor-pointer hover:underline">
              {" "}
              Terms of Service
            </span>{" "}
            and
            <span className="text-blue-600 cursor-pointer hover:underline">
              {" "}
              Privacy Policy
            </span>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
