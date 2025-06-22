import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config"; // Adjust path to your Firebase config

const LoginComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalMessage, setGeneralMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "email") {
      setEmailError("");
    }
    if (name === "password") {
      setPasswordError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setGeneralMessage("");

    let valid = true;
    if (!formData.email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setEmailError("Enter a valid email address");
      valid = false;
    }
    if (!formData.password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (formData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      valid = false;
    }
    if (!valid) return;

    if (!auth) {
      setGeneralMessage("Authentication service is not available. Please try again later.");
      console.error("Firebase auth is not initialized.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setGeneralMessage("Login successful!");
      console.log("Successfully logged in:", userCredential.user);
      navigate("/chat");
    } catch (error) {
      console.error("Login error:", error.code, error.message);
      if (error.code === "auth/user-not-found") {
        try {
          const newUserCredential = await createUserWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
          );
          setGeneralMessage("Account created and logged in!");
          console.log("Successfully registered and logged in:", newUserCredential.user);
          navigate("/chat");
        } catch (registerError) {
          console.error("Registration failed:", registerError.code, registerError.message);
          setGeneralMessage("Failed to register: " + (registerError.message || "Unknown error"));
        }
      } else if (error.code === "auth/invalid-credential") {
        setGeneralMessage("Incorrect email or password. Please try again.");
      } else {
        setGeneralMessage("Login failed: " + (error.message || "Unknown error"));
      }
    }
  };

  const handleGoogleSignIn = async () => {
    if (isGoogleLoading) return; // Prevent multiple clicks
    setIsGoogleLoading(true);
    setGeneralMessage("");

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // Extract Google Access Token and user info (from your snippet)
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      // Log token and user info (optional, for debugging or API use)
      console.log("Google Access Token:", token);
      console.log("Google Sign-In successful:", user);

      setGeneralMessage("Signed in with Google!");
      navigate("/chat");
    } catch (error) {
      console.error("Google Sign-In error:", error.code, error.message);
      const email = error.customData?.email || "Unknown email";
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("Error email:", email, "Credential:", credential);

      if (error.code === "auth/cancelled-popup-request") {
        setGeneralMessage("Google Sign-In was cancelled. Please try again.");
      } else if (error.code === "auth/popup-blocked") {
        setGeneralMessage("Popup was blocked by your browser. Please allow popups and try again.");
      } else if (error.code === "auth/account-exists-with-different-credential") {
        setGeneralMessage(`The email ${email} is already linked to another sign-in method. Try signing in with that method.`);
      } else {
        setGeneralMessage("Google Sign-In failed: " + (error.message || "Unknown error"));
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div>
      <h2>Login or Sign Up</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </div>
        {generalMessage && <p>{generalMessage}</p>}
        <button type="submit">Log In / Sign Up</button>
      </form>
      <div>
        <button onClick={handleGoogleSignIn} disabled={isGoogleLoading}>
          {isGoogleLoading ? "Loading..." : "Sign In with Google"}
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;