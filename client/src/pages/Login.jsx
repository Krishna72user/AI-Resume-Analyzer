import { useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTheme } from '../context/ResumeContext'
export const Login = () => {
    const email = useRef(null)
    const pass = useRef(null)
    const { dark } = useTheme();
    const navigate = useNavigate()
    const [status, setStatus] = useState(false)

    const [err, setErr] = useState(null)
    const handleLogin = async (e) => {
        e.preventDefault()
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`
        try {
            setStatus(true)
            const res = await axios.post(url,
                { email: email.current.value, password: pass.current.value },
                {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                }
            )
            if (res.data.success) {
                localStorage.setItem('authtoken', res.data.token)
                toast.success("Login Successfull")
                navigate('/')
            }
        } catch (error) {
            setErr(error?.response?.data?.message)
            toast.error("Login Failed")
        }
        finally {
            setStatus(false)
        }

    }
    return (
        <div className={dark ? 'min-h-screen bg-linear-to-br  from-slate-900 via-gray-900 to-black text-white flex flex-col items-center pt-20 px-6' : 'min-h-screen bg-linear-to-br  from-slate-100 via-gray-100 to-white text-black flex flex-col items-center pt-20 px-6'}>

            <div className={dark ? "flex flex-col gap-3.5   bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md" : "flex flex-col gap-3.5   bg-gray-400/10 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md"}>
                <h2 className="md:text-3xl text-2xl text-center font-bold ">Login</h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-2 " >
                    <label className="block" htmlFor="email">Email</label>
                    <input required ref={email} className={dark ? "w-full px-4 py-2 bg-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" : "w-full px-4 py-2 bg-gray-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"} type="email" id='email' placeholder="example@gmail.com" />
                    <label className="block" htmlFor="pass">Password</label>
                    <input ref={pass} className={dark ? "w-full px-4 py-2 bg-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" : "w-full px-4 py-2 bg-gray-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"} required type="password" id='pass' placeholder="••••••••" />

                    {err && <div className='text-red-500 text-center'>{err}</div>}

                    {!status && <button type="submit" className="w-full mt-5 px-4 py-2 bg-blue-500 rounded-2xl hover:cursor-pointer">Login</button>}
                    {status && <div className="w-full mt-5 px-4 py-2 text-center bg-blue-500 rounded-2xl hover:cursor-pointer">Submitting...</div>}
                </form>
                <div className="text-center">Don't have an account ? <Link to='/register' className="text-blue-400">Register</Link></div>
            </div>
        </div>
    )
}