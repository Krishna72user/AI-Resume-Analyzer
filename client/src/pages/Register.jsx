import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from '../context/ResumeContext'

export const Register = () => {
  const navigate = useNavigate();
  const { dark } = useTheme();
  const [verify, setVerify] = useState(false);
  const [send, setSend] = useState(false);
  const [error, setError] = useState(null);

  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const name = useRef(null);
  const email = useRef(null);
  const pass = useRef(null);
  const otp = useRef(null);

  const handleOtpSend = async () => {
    setOtpLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/otp/sendotp`,
        { email: email.current.value },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.success) {
        setSend(true);
        toast.success("Otp sent successfully")
      }
    } catch (error) {
      setError("Failed to send OTP. Try again.");
      toast.error("Failed to send Otp")
    } finally {
      setOtpLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    setVerifyLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/otp/verify`,
        {
          email: email.current.value,
          otp: otp.current.value,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.success) {
        setVerify(true);
        toast.success("Verificaton Successfull")
      }
    } catch (error) {
      setError("Invalid OTP. Try again.");
      toast.error('Invalid OTP')
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        {
          name: name.current.value,
          email: email.current.value,
          password: pass.current.value,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        localStorage.setItem("authtoken", res.data.token);
        toast.success("Registration Successfull")
        navigate("/");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong.");
      toast.error("Registration Failed")
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className={dark ? 'min-h-screen bg-linear-to-br  from-slate-900 via-gray-900 to-black text-white flex flex-col items-center pt-20 px-6' : 'min-h-screen bg-linear-to-br  from-slate-100 via-gray-100 to-white text-black flex flex-col items-center pt-20 px-6'}>
      <div className={dark ? "flex flex-col gap-3.5   bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md" : "flex flex-col gap-3.5   bg-gray-400/10 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md"}>
        <h2 className="md:text-3xl text-2xl text-center font-bold">Create Account</h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-2">
          {verify && (
            <>
              <label htmlFor="name">Full Name</label>
              <input
                ref={name}
                required
                className={dark ? "w-full px-4 py-2 bg-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" : "w-full px-4 py-2 bg-gray-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"}
                type="text"
                id="name"
                placeholder="John Doe"
              />
            </>
          )}

          <label htmlFor="email">Email</label>
          <input
            ref={email}
            required
            className={dark ? "w-full px-4 py-2 bg-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" : "w-full px-4 py-2 bg-gray-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"}
            type="email"
            id="email"
            placeholder="example@gmail.com"
            disabled={verifyLoading || otpLoading || verify}
          />

          {verify && (
            <>
              <label htmlFor="pass">Password</label>
              <input
                ref={pass}
                required
                className={dark ? "w-full px-4 py-2 bg-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" : "w-full px-4 py-2 bg-gray-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"}
                type="password"
                id="pass"
                placeholder="••••••••"
              />
            </>
          )}

          {!send && (
            <button
              type="button"
              onClick={handleOtpSend}
              className="w-full mt-5 px-4 py-2 bg-blue-500 rounded-2xl hover:cursor-pointer disabled:opacity-60"
              disabled={otpLoading}
            >
              {otpLoading ? "Sending..." : "Send OTP"}
            </button>
          )}

          {!verify && send && (
            <>
              <label htmlFor="otp">OTP</label>
              <input
                id="otp"
                type="text"
                ref={otp}
                className={dark ? "w-full px-4 py-2 bg-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" : "w-full px-4 py-2 bg-gray-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"}
              />
              <button
                type="button"
                onClick={handleOtpVerify}
                className="w-full mt-5 px-4 py-2 bg-blue-500 rounded-2xl hover:cursor-pointer disabled:opacity-60"
                disabled={verifyLoading}
              >
                {verifyLoading ? "Verifying..." : "Verify"}
              </button>
            </>
          )}

          {error && <div className="text-red-500 text-center">{error}</div>}

          {verify && (
            <button
              type="submit"
              disabled={registerLoading}
              className="w-full mt-5 px-4 py-2 bg-blue-500 rounded-2xl hover:cursor-pointer disabled:opacity-60"
            >
              {registerLoading ? "Registering..." : "Register"}
            </button>
          )}
        </form>

        <div className="text-center">
          Already have an account?{" "}
          <Link className="text-blue-400" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
