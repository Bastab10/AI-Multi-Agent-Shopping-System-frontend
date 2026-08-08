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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Background Glow */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-violet-100 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 grid lg:grid-cols-2 items-center gap-16">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-violet-500" />

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
              className="flex items-center gap-3 bg-white border border-gray-200 hover:border-violet-500 px-7 py-4 rounded-2xl font-semibold shadow-sm transition"
            >
              Resume
              <FaDownload />
            </a>
          </div>

          {/* Social */}
          <div className="flex gap-5 mt-10">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300 flex items-center justify-center text-slate-700"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300 flex items-center justify-center text-slate-700"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="mailto:your@email.com"
              className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300 flex items-center justify-center text-slate-700"
            >
              <FaEnvelope />
            </a>

            <a
              href="https://leetcode.com/"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300 flex items-center justify-center text-slate-700"
            >
              <FaCode />
            </a>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center items-center"
        >
          {/* Background Glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-violet-200 to-violet-100 blur-3xl opacity-50" />
          
          {/* Geometric Shapes */}
          <div className="relative z-10">
            {/* Main Circle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-[400px] h-[400px] rounded-full border-2 border-violet-200 flex items-center justify-center"
            >
              {/* Inner Circle */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-[320px] h-[320px] rounded-full border border-violet-300 flex items-center justify-center"
              >
                {/* BS Monogram */}
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-[200px] h-[200px] rounded-3xl bg-gradient-to-br from-violet-600 to-violet-400 flex items-center justify-center shadow-2xl"
                  >
                    <span className="text-7xl font-black text-white tracking-tighter">
                      BS
                    </span>
                  </motion.div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-violet-300 opacity-60"
                  />
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-violet-400 opacity-60"
                  />
                </div>
              </motion.div>
            </motion.div>
            
            {/* Code Brackets */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-0 left-0 text-6xl text-violet-300 font-mono"
            >
              {"{"}
            </motion.div>
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-0 right-0 text-6xl text-violet-300 font-mono"
            >
              {"}"}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;