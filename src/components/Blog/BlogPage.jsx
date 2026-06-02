// src/pages/BlogPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, query, where, orderBy, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch all published posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, "posts"),
          where("published", "==", true),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toMillis?.() ?? doc.data().createdAt,
        }));
        setPosts(fetched);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Load single post from URL query param ?post=ID
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const postId = params.get("post");
    if (postId && posts.length > 0) {
      const found = posts.find((p) => p.id === postId);
      if (found) {
        setSelectedPost(found);
      } else {
        // Direct link to unpublished or not yet loaded
        const fetchSingle = async () => {
          const postRef = doc(db, "posts", postId);
          const snap = await getDoc(postRef);
          if (snap.exists() && snap.data().published) {
            setSelectedPost({ id: snap.id, ...snap.data() });
          }
        };
        fetchSingle();
      }
    } else {
      setSelectedPost(null);
    }
  }, [location.search, posts]);

  // Helpers
  const formatDate = (ts) =>
    new Date(ts).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const readTime = (html) => {
    const text = html.replace(/<[^>]+>/g, "");
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const excerpt = (html) => {
    const text = html.replace(/<[^>]+>/g, "");
    return text.slice(0, 160) + (text.length > 160 ? "…" : "");
  };

  // Share helpers
  const getShareUrl = () => {
    const base = window.location.origin + window.location.pathname;
    return `${base}?post=${selectedPost.id}`;
  };

  const shareOnTwitter = () => {
    const url = getShareUrl();
    const text = `Check out "${selectedPost.title}" by Subhash Singh`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = getShareUrl();
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
  };

  const shareOnFacebook = () => {
    const url = getShareUrl();
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
  };

  const shareOnWhatsApp = () => {
    const url = getShareUrl();
    const text = `${selectedPost.title} - ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const copyLink = async () => {
    const url = getShareUrl();
    await navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  // Single post view (with share buttons)
  if (selectedPost) {
    // Full custom layout – render raw HTML without extra chrome
    if (selectedPost.fullCustomLayout) {
      return (
        <div className="min-h-screen">
          <div className="sticky top-0 z-50 bg-white/80 dark:bg-[#050414]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 px-4 py-3">
            <button
              onClick={() => {
                setSelectedPost(null);
                navigate("/blog");
              }}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 text-sm font-medium"
            >
              ← Back to Blog
            </button>
          </div>
          <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
        </div>
      );
    }

    // Default blog layout with share buttons
    return (
      <div className="min-h-screen bg-[#050414] text-white font-sans">
        <div className="sticky top-0 z-50 bg-[#050414]/80 backdrop-blur-md border-b border-white/5 px-[7vw] md:px-[20vw] py-4 flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedPost(null);
              navigate("/blog");
            }}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
          >
            ← Back to Blog
          </button>
          <button
            onClick={() => navigate("/blog/login")}
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
          >
            Admin
          </button>
        </div>

        <article className="px-[7vw] md:px-[20vw] py-16 max-w-4xl mx-auto">
          {selectedPost.coverImageUrl && (
            <img
              src={selectedPost.coverImageUrl}
              alt={selectedPost.title}
              className="w-full max-h-96 object-cover rounded-2xl mb-10 shadow-[0_0_40px_rgba(130,69,236,0.2)]"
            />
          )}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
              {selectedPost.category || "Blog"}
            </span>
            <span className="text-xs text-gray-500">
              {formatDate(selectedPost.createdAt)}
            </span>
            <span className="text-xs text-gray-500">
              · {readTime(selectedPost.content)} min read
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {selectedPost.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4 mb-12 pb-8 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-purple-700 flex items-center justify-center text-sm font-bold">
                S
              </div>
              <div>
                <p className="text-sm font-medium text-white">Subhash Singh</p>
                <p className="text-xs text-gray-500">Author</p>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 mr-1">Share:</span>
              <button
                onClick={shareOnTwitter}
                className="p-2 rounded-full bg-gray-800 hover:bg-[#1DA1F2] transition-colors"
                aria-label="Share on Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="p-2 rounded-full bg-gray-800 hover:bg-[#0077B5] transition-colors"
                aria-label="Share on LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </button>
              <button
                onClick={shareOnFacebook}
                className="p-2 rounded-full bg-gray-800 hover:bg-[#1877F2] transition-colors"
                aria-label="Share on Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.591 0 0 .592 0 1.325v21.351C0 23.408.592 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.733 0 1.325-.592 1.325-1.325V1.325C24 .592 23.408 0 22.675 0z" />
                </svg>
              </button>
              <button
                onClick={shareOnWhatsApp}
                className="p-2 rounded-full bg-gray-800 hover:bg-[#25D366] transition-colors"
                aria-label="Share on WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.032 2.002c-5.523 0-10 4.476-10 10 0 1.79.476 3.547 1.38 5.088L2 22l5.074-1.348c1.484.825 3.168 1.26 4.958 1.26 5.523 0 10-4.476 10-10s-4.477-10-10-10zm.032 18.346c-1.516 0-3.002-.412-4.284-1.188l-.307-.182-3.064.814.815-2.994-.2-.317c-.867-1.37-1.324-2.94-1.324-4.573 0-4.605 3.747-8.352 8.354-8.352 4.606 0 8.352 3.747 8.352 8.352 0 4.606-3.746 8.354-8.352 8.354zm4.575-6.254c-.252-.126-1.49-.736-1.72-.82-.23-.084-.397-.126-.564.126-.167.252-.647.82-.793.988-.146.168-.292.189-.544.063-.252-.126-1.063-.392-2.025-1.252-.748-.668-1.254-1.495-1.4-1.748-.147-.252-.015-.388.11-.514.112-.112.252-.294.378-.44.126-.147.168-.252.252-.42.084-.168.042-.315-.021-.44-.063-.126-.564-1.36-.773-1.862-.203-.49-.409-.423-.564-.432-.147 0-.315-.008-.483-.008-.168 0-.44.063-.67.315-.23.252-.878.856-.878 2.09 0 1.233.898 2.424 1.023 2.592.126.168 1.764 2.698 4.274 3.78.598.258 1.065.413 1.43.53.6.191 1.147.164 1.578.099.482-.074 1.49-.608 1.699-1.195.21-.587.21-1.09.147-1.195-.063-.105-.23-.168-.482-.294z" />
                </svg>
              </button>
              <button
                onClick={copyLink}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="Copy link"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
          />
        </article>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
          .blog-content { color: #d1d5db; line-height: 1.85; font-size: 1.05rem; }
          .blog-content h1, .blog-content h2, .blog-content h3 { color: #fff; font-family: 'Syne', sans-serif; margin: 2rem 0 1rem; }
          .blog-content h1 { font-size: 2rem; }
          .blog-content h2 { font-size: 1.5rem; }
          .blog-content h3 { font-size: 1.25rem; }
          .blog-content p { margin-bottom: 1.25rem; }
          .blog-content img { max-width: 100%; border-radius: 12px; margin: 1.5rem 0; box-shadow: 0 0 30px rgba(130,69,236,0.15); }
          .blog-content ul, .blog-content ol { padding-left: 1.5rem; margin-bottom: 1.25rem; }
          .blog-content li { margin-bottom: 0.5rem; }
          .blog-content blockquote { border-left: 3px solid #8245ec; padding-left: 1rem; color: #9ca3af; font-style: italic; margin: 1.5rem 0; }
          .blog-content strong { color: #e5e7eb; }
          .blog-content a { color: #a855f7; text-decoration: underline; }
          .blog-content pre { background: #0d0820; border: 1px solid rgba(130,69,236,0.2); border-radius: 8px; padding: 1rem; overflow-x: auto; margin: 1.5rem 0; }
          .blog-content code { font-family: monospace; font-size: 0.9em; background: rgba(130,69,236,0.1); padding: 2px 6px; border-radius: 4px; }
        `}</style>
      </div>
    );
  }

  // Posts feed (list view)
  return (
    <div className="min-h-screen bg-[#050414] text-white font-sans">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');`}</style>
      <div className="sticky top-0 z-50 bg-[#050414]/80 backdrop-blur-md border-b border-white/5 px-[7vw] md:px-[20vw] py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
        >
          ← Back to Portfolio
        </button>
        <button
          onClick={() => navigate("/blog/login")}
          className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
        >
          Admin
        </button>
      </div>

      <div className="px-[7vw] md:px-[20vw] pt-20 pb-16 text-center">
        <p className="text-xs tracking-widest text-purple-400 uppercase mb-4">
          Thoughts &amp; Writings
        </p>
        <h1
          className="text-5xl md:text-7xl font-bold text-white"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          The Blog
        </h1>
        <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">
          Ideas, tutorials, and stories from my journey in tech.
        </p>
      </div>

      <div className="px-[7vw] md:px-[20vw] pb-24">
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-white/5" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-white/5 rounded w-1/3" />
                  <div className="h-4 bg-white/5 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded w-full" />
                  <div className="h-3 bg-white/5 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-6">✍️</p>
            <p className="text-gray-500 text-lg">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                onClick={() => navigate(`/blog?post=${post.id}`)}
                className="group bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-purple-500/30 hover:-translate-y-1 transition-all duration-300"
              >
                {post.coverImageUrl ? (
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-purple-900/40 to-[#0d0820] flex items-center justify-center text-4xl">
                    📝
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                      {post.category || "Blog"}
                    </span>
                    <span className="text-xs text-gray-600">
                      {readTime(post.content)} min read
                    </span>
                  </div>
                  <h2
                    className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                    {excerpt(post.content)}
                  </p>
                  <p className="text-xs text-gray-600">
                    {formatDate(post.createdAt)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;