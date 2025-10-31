import { useState, useRef } from "react"
import { toast } from 'react-toastify'
import axios from 'axios'
import { useTheme } from "../context/ResumeContext"
export const Analyze = () => {
  const { dark } = useTheme();
  const [file, setFile] = useState(null);
  const desc = useRef(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const handleAnalyze = async (file, desc) => {
    setResult(false)
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/resume/analyze`
    if (!file || !desc) return;

    const formdata = new FormData();
    formdata.append('job_desc', desc);
    formdata.append('resume', file)
    setLoading(true)
    try {
      const res = await axios.post(url, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(res.data);
      setLoading(false)
      toast.success("Successfully analyzed the resume")
    } catch (error) {
      setLoading(false)
      toast.error("Failed to analyze the resume")
    }
  }
  return (
    <div className={dark ? 'min-h-screen bg-linear-to-br  from-slate-900 via-gray-900 to-black text-white flex flex-col items-center pt-20 px-6' : 'min-h-screen bg-linear-to-br  from-slate-100 via-gray-100 to-white text-black flex flex-col items-center pt-20 px-6'}>

      {/* Header */}
      <h1 className="md:text-5xl text-3xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
        Analyze Your Resume
      </h1>
      <p className="text-gray-400 mb-8 text-center max-w-xl">
        Upload your resume (PDF format) and let our AI model evaluate it against
        the latest job requirements to generate your ATS score and suggestions.
      </p>

      {/* Upload Section */}
      <div className={dark ? "bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 w-full max-w-lg text-center" : "bg-gray-500/10 backdrop-blur-lg border border-white/20 rounded-2xl text-black p-8 w-full max-w-lg text-center"}>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleAnalyze(file, desc.current.value)
        }}
          className='flex flex-col'
        >

          <input
            type="file"
            accept=".pdf"
            name="resume"
            onChange={(e) => setFile(e.target.files[0])}
            className={dark ? "block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 cursor-pointer" :
              "block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-black hover:file:bg-indigo-600 cursor-pointer"}
          />
          <div className="flex flex-col w-full max-w-2xl mx-auto my-6">
            <label htmlFor="jobDescription" className={dark ? "text-gray-100 text-sm font-medium mb-2" : "text-gray-600 text-sm font-medium mb-2"}>
              Job Description
            </label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              rows="6"
              ref={desc}
              placeholder="Paste the job description here..."
              className={dark ? "bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-gray-400 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200" : "bg-gray-100 backdrop-blur-lg border border-white/20 text-black placeholder-gray-400 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"}
            ></textarea>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="mt-3 w-full bg-linear-to-r from-indigo-500 to-purple-600 py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 hover:cursor-pointer"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </form>
      </div>

      {/* Output Section */}
      {result && (
        <div className="mt-10 grid md:grid-cols-3 gap-6 w-full max-w-6xl">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-2">ATS Score</h2>
            <p className="text-3xl font-bold">{result.ATS}%</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-2">Keyword Match</h2>
            <p className="text-3xl font-bold">{result.keyword_match}%</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl mb-10 p-6">
            <h2 className="text-lg font-semibold mb-2">Suggestions</h2>
            <ul className="list-disc pl-5  text-sm text-gray-300">
              {result.suggestions?.map((s) => (
                <li key={s.id}>{s}.</li>
              ))}
            </ul>

          </div>
        </div>
      )}
    </div>
  )
}