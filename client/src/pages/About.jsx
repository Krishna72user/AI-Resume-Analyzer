import { useTheme } from "../context/ResumeContext";
export default function About() {
  const {dark} = useTheme();
  return (
    <section
      id="about"
      className={dark ?'pt-20 min-h-screen bg-linear-to-br  from-slate-900 via-gray-900 to-black text-white flex flex-col items-center  px-6':'min-h-screen bg-linear-to-br  from-slate-100 via-gray-100 to-white text-black flex flex-col items-center pt-20 px-6'}
    >
      <div className="max-w-4xl text-center">
        <h2 className="md:text-5xl text-3xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
          About Resume Analyzer
        </h2>
        <p className={dark?"text-gray-300 text-lg leading-relaxed mb-8":"text-gray-500 text-lg leading-relaxed mb-8"}>
          Resume Analyzer is an AI-powered platform designed to help job seekers
          optimize their resumes for Applicant Tracking Systems (ATS).
          It automatically extracts keywords, analyzes job descriptions,
          and provides actionable feedback to help your resume stand out in
          the hiring process.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div className={dark?"bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-left":"bg-gray-400/20 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-left"}>
            <h3 className="text-xl font-semibold mb-2">🎯 Our Mission</h3>
            <p className={dark ?"text-gray-400 text-sm":"text-gray-600 text-sm"}>
              To simplify the job application process by using AI to empower
              candidates with insights that improve their resumes and increase
              interview opportunities.
            </p>
          </div>
          <div className={dark?"bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-left":"bg-gray-400/20 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-left"}>
            <h3 className="text-xl font-semibold mb-2">🤖 How It Works</h3>
            <p className={dark ?"text-gray-400 text-sm":"text-gray-600 text-sm"}>
              Our AI scans your uploaded resume and job description, then
              calculates an ATS compatibility score, keyword match percentage,
              and gives smart suggestions for improvement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
