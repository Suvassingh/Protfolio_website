import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ⚠️ Change this password to something only you know
const ADMIN_PASSWORD = "subhash@blog2025";

const BlogLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem("blog_auth", "true");
        navigate("/blog/admin");
      } else {
        setError("Incorrect password. Try again.");
        setLoading(false);
      }
    }, 600);
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
          <div>
            <label className="text-xs text-gray-400 mb-2 block tracking-wider uppercase">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your admin password"
              required
              autoFocus
              className="w-full bg-gray-900/80 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/60 transition-colors placeholder-gray-600"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2">
              {error}
            </p>
          )}

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
            {loading ? "Verifying…" : "Enter Admin →"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/blog")}
            className="w-full text-center text-xs text-gray-600 hover:text-gray-400 transition-colors py-2"
          >
            ← Back to Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogLogin;
