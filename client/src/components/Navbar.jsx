import { NavLink } from "react-router-dom";
import { MdOutlineDarkMode } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { CiLight } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ResumeContext";
import axios from 'axios'
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import {motion} from 'motion/react'
export const NavBar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [status, setStatus] = useState(false)

    const [nav,setNav] = useState(false)

    const [bar,setBar] = useState(true)
    const {dark,setDark} = useTheme();
    useEffect(() => {
        const verifyAuth = async () => {
            if(location.pathname=='/'){
                const token = localStorage.getItem("authtoken"); // fix key name too
                if (token) {
                    try {
                        const res = await axios.get(
                            `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );

                        if (res.data.success) {
                            navigate(location.pathname);
                            setStatus(true);
                        } else {
                            navigate("/");
                        }
                    } catch (error) {
                        console.error(error);
                        navigate("/");
                    }
                } else {
                    navigate("/");
                }
            }

            if (location.pathname === "/analyze") {
                const token = localStorage.getItem("authtoken"); // fix key name too
                if (token) {
                    try {
                        const res = await axios.get(
                            `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );

                        if (res.data.success) {
                            navigate(location.pathname);
                        } else {
                            navigate("/login");
                        }
                    } catch (error) {
                        console.error(error);
                        navigate("/login");
                    }
                } else {
                    navigate("/login");
                }
            }
        };

        verifyAuth();
    }, [location.pathname]);

    const handleSign = (e) => {
        localStorage.removeItem('authtoken');
        setStatus(false)
        navigate('/')
    }
    return (
        <>
            <div className={dark?"bg-linear-to-r p-1 px-4 from-indigo-500 via-purple-500 to-pink-500 dark:from-slate-900 dark:to-slate-800 backdrop-blur-sm sticky top-0 z-50 shadow-md flex justify-between text-white items-center":"bg-linear-to-r p-1 px-4 from-indigo-500 via-purple-500 to-pink-500  backdrop-blur-sm sticky top-0 z-50 shadow-md flex justify-between text-white items-center"}>
                <div className="hidden gap-3 md:flex">
                    <div className="flex  gap-2">
                        <div className="font-bold p-1 px-2.5 text-xl  border-gray-100  bg-white/20 backdrop-blur-md rounded-xl ">RA</div>
                        <div className="font-medium p-1 text-xl ">ResumeAnalyzer</div>
                    </div>
                    <NavLink to='/analyze' className={({isActive})=> isActive?"p-2 hover:cursor-pointer bg-white/20 backdrop-blur-md rounded-xl":"p-2 hover:cursor-pointer hover:bg-white/20 backdrop-blur-md rounded-xl"} end>
                        Analyze Resume
                    </NavLink>
                    <NavLink  to='/'
                        className={({isActive})=> isActive?"p-2 hover:cursor-pointer bg-white/20 backdrop-blur-md rounded-xl":"p-2 hover:cursor-pointer hover:bg-white/20 backdrop-blur-md rounded-xl"} end>Home
                    </NavLink>
                    <NavLink to='/about' className={({isActive})=> isActive?"p-2 hover:cursor-pointer bg-white/20 backdrop-blur-md rounded-xl":"p-2 hover:cursor-pointer hover:bg-white/20 backdrop-blur-md rounded-xl"} end>
                        About
                    </NavLink>
                </div>

                <div className="p-3.5 md:flex hidden gap-3">
                    {!dark && <MdOutlineDarkMode
                    onClick={()=>{
                        setDark((e)=>!e)
                    }} color="white" className='text-3xl hover:cursor-pointer p-1' />}
                    {dark &&<CiLight
                    onClick={()=>{
                        setDark((e)=>!e)
                    }}
                    color="yellow" className='text-3xl hover:cursor-pointer p-1' />}
                    {status && <button onClick={handleSign} className="text-black  text-sm font-bold hover:cursor-pointer py-1 rounded-md bg-white px-2">SIGN OUT</button>}
                    {!status && <NavLink to='/login' className=" hover:cursor-pointer text-sm font-bold py-1 rounded-md bg-white text-black px-2">LOG IN</NavLink>}
                    {!status && <NavLink to='/register' className="text-white hover:cursor-pointer text-sm font-bold py-1 rounded-md  px-2">SIGN IN</NavLink>}

                </div>

                <div className="flex py-2 md:hidden justify-between z-50 min-w-full">

                <div className="flex  gap-1">
                    <div className="font-bold my-1  text-xl p-1 px-2  border-gray-100  bg-white/20 backdrop-blur-md rounded-xl ">RA</div>
                    <div className="font-medium p-1 my-1 text-xl ">ResumeAnalyzer</div>
                </div>
                
                <div className="flex  py-2 ">
                    {!dark && <MdOutlineDarkMode
                    onClick={()=>{
                        setDark((e)=>!e)
                    }} color="white" className='text-3xl hover:cursor-pointer p-1' />}
                    {dark &&<CiLight
                    onClick={()=>{
                        setDark((e)=>!e)
                    }}
                    color="yellow" className='text-3xl hover:cursor-pointer p-1' />}
                    {!nav && <HiOutlineBars3 className="text-3xl pt-1.2" onClick={()=>{
                        setNav(e=>!e)
                    }}/>}
                    {nav &&<IoMdClose className="text-3xl pt-1.2" onClick={()=>{
                        setNav(e=>!e)
                    }}/>}
                </div>
                    </div>

                <motion.div 
                initial={{opacity:0,y:-100}}
                animate={ nav?{opacity:1,y:125} : {opacity:0,y:-100}}
                transition={{duration:0.5}}
                className={dark?" z-0 bg-linear-to-r p-1 px-4 py-4 from-indigo-500 via-purple-500 to-pink-500 dark:from-slate-900 dark:to-slate-800 backdrop-blur-sm fixed left-0 min-w-screen md:hidden  shadow-md  text-white ":"bg-linear-to-r p-1 px-4 py-4 from-indigo-500 via-purple-500 md:hidden to-pink-500 min-w-screen backdrop-blur-sm fixed  left-0 shadow-md   text-white "}>
                    <NavLink to='/analyze' onClick={()=>{setNav(n=>!n)}} end>
                        <div className="p-2 hover:cursor-pointer hover:bg-white/20 backdrop-blur-md rounded-xl">Analyze Resume</div>
                    </NavLink>
                    <NavLink to='/' onClick={()=>{setNav(n=>!n)}}>
                        <div className="p-2 hover:cursor-pointer hover:bg-white/20 backdrop-blur-md rounded-xl">Home</div>
                    </NavLink>
                    <NavLink to='/about' onClick={()=>{setNav(n=>!n)}}>
                        <div className="p-2 hover:cursor-pointer hover:bg-white/20 backdrop-blur-md rounded-xl">About</div>
                    </NavLink>
                    <div className="mt-2">

                    {status && <button onClick={handleSign}  className="text-black  text-sm font-bold hover:cursor-pointer py-1 rounded-md bg-white px-2">SIGN OUT</button>}
                    {!status && <NavLink to='/login'onClick={()=>{setNav(n=>!n)}} className=" hover:cursor-pointer text-sm font-bold py-1  rounded-md bg-white text-black px-2">LOG IN</NavLink>}
                    {!status && <NavLink to='/register'onClick={()=>{setNav(n=>!n)}} className="text-white hover:cursor-pointer text-sm font-bold py-1 rounded-md  px-2">SIGN IN</NavLink>}
                    </div>
                </motion.div>
            </div>
        </>
    )
}