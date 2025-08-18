// src/components/LoginPage.js
import React, { useState } from "react";
import { authService } from "../authentication/auth";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignup) {
        // Sign up new user
        await authService.signUp(email, password, email.split("@")[0]); 
      } else {
        // Login existing user
        await authService.signIn(email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authService.signInWithGoogle();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
        />
        <button type="submit" style={{ margin: "10px 0", padding: "8px 16px" }}>
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>

      <p>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button onClick={() => setIsSignup(!isSignup)} style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}>
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>

      <hr />
      <button onClick={handleGoogleLogin} style={{ padding: "8px 16px", background: "#4285F4", color: "white", border: "none", cursor: "pointer" }}>
        Continue with Google
      </button>
    </div>
  );
};

export default LoginPage;