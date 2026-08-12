 import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const BlogLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // If already logged in, go straight to admin
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/blog/admin");
    });
    return unsub;
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/blog/admin");
    } catch (err) {
      // Show friendly messages instead of raw Firebase codes
      const msgs = {
        "auth/user-not-found": "No account found with that email.",
        "auth/wrong-password": "Incorrect password. Try again.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/too-many-requests": "Too many attempts. Please wait a moment.",
        "auth/invalid-credential": "Incorrect email or password.",
      };
      setError(msgs[err.code] || "Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050414] flex items-center justify-center px-4">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');`}</style>

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-4 text-2xl">
            🔐
          </div>
          <h1
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Admin Login
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Only you can access this page
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-xs text-gray-400 mb-2 block tracking-wider uppercase">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoFocus
              className="w-full bg-gray-900/80 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/60 transition-colors placeholder-gray-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-gray-400 mb-2 block tracking-wider uppercase">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full bg-gray-900/80 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/60 transition-colors placeholder-gray-600"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all"
            style={{
              background: loading
                ? "rgba(130,69,236,0.4)"
                : "linear-gradient(135deg, #7c3aed, #a855f7)",
            }}
          >
            {loading ? "Signing in…" : "Enter Admin →"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/blog")}
            className="w-full text-center text-xs text-gray-600 hover:text-gray-400 transition-colors py-2"
          >
            ← Back to Blog
          </button>
        </form>

        {/* Setup hint — remove after first login */}
        <p className="text-center text-xs text-gray-700 mt-8">
          First time? Create your admin account in Firebase Console →<br />
          Authentication → Users → Add user
        </p>
      </div>
    </div>
  );
};

export default BlogLogin;
