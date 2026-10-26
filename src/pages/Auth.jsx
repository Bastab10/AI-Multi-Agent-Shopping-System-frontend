import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { loginUser, registerUser } from "../services/authApi";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !isLogin &&
      form.password !== form.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      let res;

      if (isLogin) {
        res = await loginUser({
          email: form.email,
          password: form.password,
        });
      } else {
        res = await registerUser({
          name: form.name,
          email: form.email,
          password: form.password,
        });
      }

      login(res.data.user, res.data.token);

      const from = location.state?.from || "/";

      navigate(from, {
        replace: true,
      });
    } catch (err) {
      console.error("Authentication error:", err);

      alert(
        err.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "https://ai-multi-agent-shopping-system.onrender.com.app/api/auth/google";
  };

  const handleModeChange = () => {
    setIsLogin((previous) => !previous);

    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setShowPassword(false);
  };

  return (
    <main
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-5
        py-8
        bg-gradient-to-br
        from-[#fffafa]
        via-[#fdfaff]
        to-[#f8f4ff]
      "
    >
      <div className="w-full max-w-[980px]">
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            overflow-hidden
            rounded-[24px]
            border
            border-white
            bg-white
            shadow-[0_20px_50px_rgba(100,80,180,0.08)]
          "
        >
          <div
            className="
              hidden
              lg:flex
              flex-col
              justify-between
              h-[520px]
              p-10
              bg-gradient-to-br
              from-[#eeeaff]
              via-[#f4edff]
              to-[#fff0f7]
              text-gray-800
            "
          >
            <div>
              <div className="flex items-center gap-2">
                <Sparkles
                  size={19}
                  className="text-violet-500"
                  strokeWidth={1.8}
                />

                <span className="text-lg font-extralight tracking-tight text-gray-800">
                  ShopIntel
                </span>
              </div>

              <div className="mt-20 max-w-md">
                <h1 className="text-[46px] font-extralight leading-[1.05] tracking-tight text-gray-800">
                  Smart
                  <br />
                  <span className="text-violet-500">
                    SHOPPING
                  </span>
                </h1>

                <p className="mt-5 max-w-sm text-[13px] leading-6 font-extralight text-gray-500">
                  Your AI-powered shopping assistant
                  for discovering products, comparing
                  options and making smarter buying
                  decisions.
                </p>
              </div>
            </div>

            <div>
              <div className="flex gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-400" />
                <span className="h-2 w-2 rounded-full border border-violet-300" />
                <span className="h-2 w-2 rounded-full border border-violet-300" />
              </div>

              <p className="mt-4 text-[11px] font-extralight text-gray-400">
                Discover • Compare • Choose
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center px-7 py-9 sm:px-12">
            <section className="w-full max-w-[390px]">
              <div className="mb-6">
                <h2 className="text-[31px] font-extralight tracking-tight text-gray-800">
                  {isLogin
                    ? "Welcome Back"
                    : "Create Account"}
                </h2>

                <p className="mt-1.5 text-[13px] font-extralight text-gray-400">
                  {isLogin
                    ? "Sign in to continue to ShopIntel."
                    : "Create your free ShopIntel account."}
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-3.5"
              >
                {!isLogin && (
                  <div>
                    <label className="mb-1.5 block text-[11px] font-extralight text-gray-500">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="
                        w-full
                        h-11
                        rounded-xl
                        border
                        border-gray-400
                        bg-[#fdfcff]
                        px-4
                        text-[13px]
                        font-extralight
                        text-gray-700
                        outline-none
                        transition
                        placeholder:text-gray-300
                        focus:border-violet-300
                        focus:ring-4
                        focus:ring-violet-50
                      "
                    />
                  </div>
                )}

                <div>
                  <label className="mb-1.5 block text-[11px] font-extralight text-gray-500">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      h-11
                      rounded-xl
                      border
                      border-gray-400
                      bg-[#fdfcff]
                      px-4
                      text-[13px]
                      font-extralight
                      text-gray-700
                      outline-none
                      transition
                      placeholder:text-gray-300
                      focus:border-violet-300
                      focus:ring-4
                      focus:ring-violet-50
                    "
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-extralight text-gray-500">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="
                        w-full
                        h-11
                        rounded-xl
                        border
                        border-gray-400
                        bg-[#fdfcff]
                        px-4
                        pr-11
                        text-[13px]
                        font-extralight
                        text-gray-700
                        outline-none
                        transition
                        placeholder:text-gray-300
                        focus:border-violet-300
                        focus:ring-4
                        focus:ring-violet-50
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (previous) => !previous
                        )
                      }
                      className="
                        absolute
                        right-3.5
                        top-1/2
                        -translate-y-1/2
                        text-gray-300
                        hover:text-gray-500
                        transition
                      "
                    >
                      {showPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="mb-1.5 block text-[11px] font-extralight text-gray-500">
                      Confirm Password
                    </label>

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      className="
                        w-full
                        h-11
                        rounded-xl
                        border
                        border-gray-400
                        bg-[#fdfcff]
                        px-4
                        text-[13px]
                        font-extralight
                        text-gray-700
                        outline-none
                        transition
                        placeholder:text-gray-300
                        focus:border-violet-300
                        focus:ring-4
                        focus:ring-violet-50
                      "
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full
                    h-11
                    rounded-xl
                    bg-violet-500
                    text-white
                    text-[13px]
                    font-extralight
                    flex
                    items-center
                    justify-center
                    gap-2
                    transition
                    hover:bg-violet-500
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {loading ? (
                    "Please wait..."
                  ) : (
                    <>
                      {isLogin
                        ? "Sign In"
                        : "Create Account"}

                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <div className="relative py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-400" />
                  </div>

                  <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-[10px] font-extralight text-gray-600">
                      OR
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="
                    w-full
                    h-11
                    rounded-xl
                    border
                    border-gray-400
                    bg-white
                    flex
                    items-center
                    justify-center
                    gap-3
                    text-[13px]
                    font-extralight
                    text-gray-500
                    transition
                    hover:bg-gray-50
                    hover:border-gray-300
                  "
                >
                  <FcGoogle size={19} />
                  Continue with Google
                </button>
              </form>

              <p className="mt-5 text-center text-[12px] font-extralight text-gray-600">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}

                <button
                  type="button"
                  onClick={handleModeChange}
                  className="
                    ml-2
                    font-medium
                    text-violet-500
                    hover:text-violet-500
                    hover:underline
                    transition
                  "
                >
                  {isLogin
                    ? "Create Account"
                    : "Login"}
                </button>
              </p>

              <p className="mt-5 text-center text-[10px] font-extralight leading-4 text-gray-600">
                By continuing you agree to our
                <span className="text-violet-500 cursor-pointer hover:underline">
                  {" "}
                  Terms of Service
                </span>
                {" "}and
                <span className="text-violet-500 cursor-pointer hover:underline">
                  {" "}
                  Privacy Policy
                </span>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}