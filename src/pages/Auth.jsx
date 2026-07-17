import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShoppingBag, ArrowRight } from "lucide-react";
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
    setForm({ ...form, [e.target.name]: e.target.value });

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

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#58C7B3] via-[#6fd7c6] to-[#9ee9dd] p-4">

      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#58C7B3]">
          <ShoppingBag className="text-white" />
        </div>

        <h1 className="mt-6 text-center text-4xl font-bold">
          {isLogin ? "Login" : "Register"}
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Welcome to ShopIntel
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">

          {!isLogin && (
            <input
              className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-[#58C7B3]"
              placeholder="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          )}

          <input
            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-[#58C7B3]"
            type="email"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <div className="relative">
            <input
              className="w-full rounded-xl border p-3 pr-11 outline-none focus:ring-2 focus:ring-[#58C7B3]"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>
          </div>

          {!isLogin && (
            <input
              className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-[#58C7B3]"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          )}

          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#58C7B3] py-3 font-semibold text-white transition hover:bg-[#46b9a8]"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
            <ArrowRight size={18}/>
          </button>

        </form>

        <p className="mt-6 text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 font-semibold text-[#58C7B3]"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

      </section>

    </main>
  );
}
