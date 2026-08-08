import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaCode,
  FaArrowRight,
  FaDownload,
} from "react-icons/fa";


function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#F8F9FC] min-h-screen flex items-center"
    >
      {/* Background Glow */}
      <div className="absolute top-32 right-20 w-[500px] h-[500px] rounded-full bg-violet-200/50 blur-3xl"></div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 grid lg:grid-cols-2 items-center gap-16">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-violet-500"></div>
            <span className="uppercase tracking-[4px] text-sm font-semibold text-violet-600">
              FULL STACK DEVELOPER
            </span>
          </div>

          <h1 className="leading-none">
            <span className="block text-6xl lg:text-7xl font-black text-slate-900">
              Smart
            </span>

            <span className="block text-7xl lg:text-8xl font-black text-slate-300">
              DEVELOPER
            </span>
          </h1>

          <h2 className="mt-5 text-3xl font-bold text-slate-800">
            Bastab Saikia
          </h2>

          <p className="mt-6 max-w-xl text-lg text-slate-500 leading-8">
            I build scalable, modern and responsive web applications using
            React, Node.js, Express and MongoDB with clean UI and powerful
            backend architecture.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 mt-10">

            <a
              href="#projects"
              className="flex items-center gap-3 bg-violet-600 hover:bg-violet-700 text-white px-7 py-4 rounded-2xl font-semibold transition"
            >
              View My Work
              <FaArrowRight />
            </a>

            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-3 bg-white border border-gray-200 hover:border-violet-500 px-7 py-4 rounded-2xl font-semibold shadow-sm"
            >
              Resume
              <FaDownload />
            </a>

          </div>

          {/* Social */}
          <div className="flex gap-5 mt-10">

            {[
              <FaGithub />,
              <FaLinkedinIn />,
              <FaEnvelope />,
              <FaCode />,
            ].map((icon, index) => (
              <a
                key={index}
                href="/"
                className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300 flex items-center justify-center text-slate-700"
              >
                {icon}
              </a>
            ))}

          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
          className="relative flex justify-center"
        >

          <div className="absolute w-[430px] h-[430px] rounded-full bg-violet-100 blur-2xl"></div>

          <img
            src={profile}
            alt="Bastab"
            className="relative z-10 w-[420px] animate-bounce"
            style={{
              animationDuration: "4s",
            }}
          />

        </motion.div>

      </div>
    </section>
  );
}

export default Hero;