
import React, {useState} from 'react';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from '../firebase/config'
import { doc, setDoc } from "firebase/firestore";


export default function Login() {

 const [formData, setFormData] = useState({
  email: "",
  password:"",
 })


  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("")

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));

  if (name === 'email') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(
      value && !emailPattern.test(value) ? 'Enter a valid email' : ''
    );
  }

  if (name === 'password') {
    setPasswordError(
      value.length < 8 ? 'Password must be at least 8 characters' : ''
    );
  }
}

const handleLoginOrSignup = async (e) => {
  e.preventDefault();

  // 🔍 Form validation (as before)
  let valid = true;

  if (!formData.email) {
    setEmailError("Email is required");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    setEmailError("Enter a valid email");
    valid = false;
  } else {
    setEmailError("");
  }

  if (!formData.password) {
    setPasswordError("Password is required");
    valid = false;
  } else if (formData.password.length < 8) {
    setPasswordError("Password must be at least 8 characters");
    valid = false;
  } else {
    setPasswordError("");
  }

  if (!valid) return;

  try {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    formData.email,
    formData.password
  );
  const user = userCredential.user;
  navigate("/chat");

} catch (error) {
  console.error("Login error code:", error.code);

  if (error.code === "auth/user-not-found") {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: "New User",
        role: "user",
      });

      console.log("Account created:", user.email);
      navigate("/chat");

    } catch (signupError) {
      console.error("Signup failed:", signupError.code, signupError.message);
      alert("Signup failed: " + signupError.message);
    }

  } else {
    alert("Login failed: " + error.message);
  }
}
};



  return (
    <>
    <div className=' bg-white md:space-y-[123px] space-y-[50px] flex flex-col'>
      <div className='app-container alex-brush font-bold md:text-4xl text-2xl'>WazzUpp</div>

      <div className="w-full max-w-md md:m-auto px-6 md:px-0 md:space-y-[50px]">
        
        <div>
        <h2 className="text-2xl font-semibold text-gray-900 text-center pb-[9px]">Welcome Back</h2>
        <p className="text-sm text-gray-500 mb-6 text-center ">Welcome back! Please enter your details</p>
        </div>

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

                <form onSubmit={handleLoginOrSignup}>
                        {/* Email */}
                        <div className="mb-4">
                          <label className="block text-sm text-gray-700 mb-1">Email address</label>
                          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2">
                            <MdEmail className="text-gray-400 w-5 h-5 mr-2" />
                            <input
                              type="email"
                              className="w-full border-none outline-none text-base "                           
                              placeholder="lima.sadie87@gmail.com"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                             {emailError && (
                                <p className="text-red-500 text-xs mt-1">{emailError}</p>
                              )}
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                          <label className="block text-sm text-gray-700 mb-1">Password</label>
                          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2">
                            <RiLockPasswordLine className="text-gray-400 w-5 h-5 mr-2" />
                            <input
                              type="password"
                              className="w-full border-none outline-none text-base bg-transparent"
                              placeholder="Min. 8 characters"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                            />
                          
                          </div>
                          {passwordError && (
                                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                              )}
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
                        <button   type="submit" className="w-full bg-[#FBAD04] text-black font-medium py-3 rounded-xl hover:bg-yellow-500 transition">
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

