
import React from 'react';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaGoogle, FaCheckCircle } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Login() {
  return (
    <>
    <div className=' bg-white md:space-y-[123px] space-y-[50px] flex flex-col'>
      <div className='app-container alex-brush font-bold md:text-4xl text-2xl'>WazzUpp</div>

      <div className="w-full max-w-md m-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-900 text-center pb-[9px]">Welcome Back</h2>
        <p className="text-sm text-gray-500 mb-6 text-center pb-[50px]">Welcome back! Please enter your details</p>

        <div className='space-y-[30px]'>
                {/* Google Login Button */}
                <div>
                <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-3 mb-4 hover:bg-gray-100 transition">
                  <img src="/public/Google.svg" alt="Google" className="w-5 h-5" />
                  <span className="text-sm font-medium">Log in with Google</span>
                </button>
                </div>

                <div className="flex items-center my-4">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="mx-2 text-sm text-gray-400">Or Log In with email</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <form action="">
                        {/* Email */}
                        <div className="mb-4">
                          <label className="block text-sm text-gray-700 mb-1">Email address</label>
                          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2">
                            <MdEmail className="text-gray-400 w-5 h-5 mr-2" />
                            <input
                              type="email"
                              className="w-full border-none outline-none text-sm"
                              placeholder="lima.sadie87@gmail.com"
                              defaultValue="lima.sadie87@gmail.com"
                            />
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2"
                              viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round"
                                d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                          <label className="block text-sm text-gray-700 mb-1">Password</label>
                          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2">
                            <RiLockPasswordLine className="text-gray-400 w-5 h-5 mr-2" />
                            <input
                              type="password"
                              className="w-full border-none outline-none text-sm"
                              placeholder="Min. 8 characters"
                            />
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2"
                              viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round"
                                d="M15 12h.01M12 12h.01M9 12h.01M12 12v.01M12 15v.01" />
                            </svg>
                          </div>
                        </div>

                        {/* Remember and Forgot */}
                        <div className="flex justify-between items-center mb-6">
                          <label className="flex items-center text-sm text-black">
                            <input type="checkbox" className="mr-2" />
                            Remember me <span className='text-gray-500'>(15 days)</span>
                          </label>
                          <a href="#" className="text-sm text-black font-medium hover:underline">Forgot password?</a>
                        </div>

                        {/* Login Button */}
                        <button className="w-full bg-[#FBAD04] text-black font-medium py-3 rounded-xl hover:bg-yellow-500 transition">
                          Log In
                        </button>

                        {/* Sign Up */}
                        <p className="text-sm text-center mt-4 text-gray-500">
                          Don’t have an account? <a href="#" className="text-black font-semibold hover:underline">Sign up</a>
                        </p>
                </form>
                
        </div>

      </div>

        {/* Terms */}
        <div className="text-sm text-gray-500 w-full max-w-[310px] text-center m-auto md:pt-[211px] pt-[120px]">
          By Logging In, you agree to our <a href="#" className="underline text-black font-semibold">Terms of Service</a> and <a href="#" className="underline text-black font-semibold">Privacy Policy</a>.
        </div>

    </div>
      </>
  );
}
