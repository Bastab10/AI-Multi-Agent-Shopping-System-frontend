
// Premium Auth.jsx
// Replace your existing Auth.jsx with this file.
// NOTE: Uses Tailwind CSS.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authApi";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
export default function Auth() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let res;

      if (isLogin) {
        res = await loginUser({
          email: formData.email,
          password: formData.password,
        });
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        res = await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
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
    <div className="min-h-screen bg-gradient-to-br from-[#58C7B3] via-[#6fd7c6] to-[#9ee9dd] flex items-center justify-center p-6">
      <div className="w-full max-w-7xl bg-white rounded-[36px] shadow-2xl overflow-hidden grid lg:grid-cols-2">

        <div className="hidden lg:flex flex-col justify-between p-14">
          <div>
            <div className="flex items-center gap-3 mb-8">
             
              <h2 className="text-3xl font-black">ShopIntel</h2>
            </div>

            <h1 className="text-6xl font-black leading-tight">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>

            <p className="text-gray-500 mt-6 text-lg">
              Smart AI Shopping Platform with personalized recommendations.
            </p>

            <button className="mt-8 bg-[#58C7B3] hover:bg-[#45b5a2] transition text-white px-8 py-4 rounded-full">
              Explore →
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500" className="rounded-3xl h-52 object-cover"/>
            <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500" className="rounded-3xl h-72 mt-10 object-cover"/>
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500" className="rounded-3xl h-52 object-cover"/>
          </div>
        </div>

        <div className="bg-slate-50 flex items-center justify-center p-10">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#58C7B3] flex items-center justify-center shadow-lg">
              <ShoppingBag className="text-white w-9 h-9"/>
            </div>

            <h2 className="text-center text-4xl font-bold mt-6">
              {isLogin ? "Login" : "Register"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 mt-8">
              {!isLogin && (
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name"
                className="w-full h-14 rounded-xl border border-gray-200 bg-gray-50 px-5 focus:ring-2 focus:ring-[#58C7B3] outline-none"/>
              )}

              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email"
              className="w-full h-14 rounded-xl border border-gray-200 bg-gray-50 px-5 focus:ring-2 focus:ring-[#58C7B3] outline-none"/>

              <div className="relative">
                <input type={showPassword?"text":"password"} name="password" value={formData.password}
                onChange={handleChange} placeholder="Password"
                className="w-full h-14 rounded-xl border border-gray-200 bg-gray-50 px-5 pr-12 focus:ring-2 focus:ring-[#58C7B3] outline-none"/>
                <button type="button" onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2">
                  {showPassword?<EyeOff/>:<Eye/>}
                </button>
              </div>

              {!isLogin && (
                <input type={showPassword?"text":"password"} name="confirmPassword"
                value={formData.confirmPassword} onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full h-14 rounded-xl border border-gray-200 bg-gray-50 px-5 focus:ring-2 focus:ring-[#58C7B3] outline-none"/>
              )}

              <button className="w-full h-14 rounded-xl bg-[#58C7B3] hover:bg-[#45b5a2] transition text-white font-bold flex items-center justify-center gap-2">
                {loading ? "Please wait..." : (isLogin ? "Login" : "Create Account")}
                <ArrowRight size={20}/>
              </button>
            </form>

            <div className="text-center mt-6">
              {isLogin ? (
                <>Don't have an account?
                  <button type="button" onClick={()=>setIsLogin(false)} className="ml-2 text-[#58C7B3] font-bold">Register</button>
                </>
              ) : (
                <>Already have an account?
                  <button type="button" onClick={()=>setIsLogin(true)} className="ml-2 text-[#58C7B3] font-bold">Login</button>
                </>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
