import { useNavigate,Link } from "react-router-dom";
import { useTheme } from "../context/ResumeContext";

export const Home=()=>{
    const {dark} = useTheme();
    const navigate = useNavigate();
  return (
    <div className={dark ?'min-h-screen pt-10 bg-linear-to-br  from-slate-900 via-gray-900 to-black text-white flex flex-col items-center justify-center px-6':'pt-10 min-h-screen bg-linear-to-br  from-slate-100 via-gray-100 to-white text-black flex flex-col items-center justify-center px-6'}>
      {/* Hero Section */}
      <header className="text-center max-w-2xl">
        <h1 className="md:text-5xl text-3xl font-extrabold mb-4 bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
          AI-Powered Resume Analyzer
        </h1>
        <p className={dark?"text-gray-300 text-lg mb-6":"text-gray-500 text-lg mb-6"}>
          Optimize your resume for Applicant Tracking Systems (ATS) and land your dream job with ease.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-linear-to-r hover:cursor-pointer from-indigo-500 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition">
           <Link className="hover:cursor-pointer" to='/analyze'>Get Started</Link>
          </button>
          <button className={dark?"px-6 py-3 border hover:cursor-pointer border-white/30 rounded-lg font-semibold hover:bg-white/10 transition":"px-6 py-3 border hover:cursor-pointer bg-gray-400/10 border-gray-400/30 rounded-lg font-semibold hover:bg-gray-400/30 transition"} onClick={()=>{navigate('/about')}}>
            Learn More
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="mt-20 grid md:grid-cols-3 gap-8 w-full max-w-6xl">
        <div className={dark?"bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-transform":"bg-gray-400/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-transform"}>
          <h3 className="text-xl font-semibold mb-2">📄 Smart Resume Parsing</h3>
          <p className={dark?"text-gray-400 text-sm":"text-gray-600 text-sm"}>Automatically extracts and analyzes key sections from your resume for better optimization.</p>
        </div>
        <div className={dark?"bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-transform":"bg-gray-400/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-transform"}>
          <h3 className="text-xl font-semibold mb-2">💼 Job Description Match</h3>
          <p className={dark?"text-gray-400 text-sm":"text-gray-600 text-sm"}>Compare your resume with job descriptions to get keyword match scores and insights.</p>
        </div>
        <div className={dark?"bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-transform":"bg-gray-400/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-transform"}>
          <h3 className="text-xl font-semibold mb-2">🚀 Improvement Suggestions</h3>
          <p className={dark?"text-gray-400 text-sm":"text-gray-600 text-sm"}>Receive actionable feedback to enhance your resume and improve your ATS score.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 pb-10 text-gray-500 text-sm text-center">
        © 2025 Resume Analyzer. All rights reserved.
      </footer>
    </div>
  );
}

