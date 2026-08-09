import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";

const BlogPreview = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ─── Helpers ───────────────────────────────────────────────────────────
  const cleanHtml = (html) => {
    const withoutStyle = html.replace(/<style[^>]*>.*?<\/style>/gi, "");
    const withoutScript = withoutStyle.replace(
      /<script[^>]*>.*?<\/script>/gi,
      "",
    );
    return withoutScript;
  };

  const excerpt = (html) => {
    const text = cleanHtml(html).replace(/<[^>]+>/g, "");
    return text.slice(0, 100) + (text.length > 100 ? "…" : "");
  };

  const formatDate = (ts) =>
    new Date(ts).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // ─── Fetch posts ─────────────────────────────────────────────────────
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const q = query(
          collection(db, "posts"),
          where("published", "==", true),
          orderBy("createdAt", "desc"),
          limit(3),
        );
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toMillis?.() ?? doc.data().createdAt,
        }));
        setPosts(fetched);
      } catch (err) {
        console.error("Error fetching blog preview:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  // ─── Render ──────────────────────────────────────────────────────────
  return (
    <section className="py-16 px-[12vw] md:px-[7vw] lg:px-[20vw] bg-gradient-to-b from-gray-900/30 to-transparent">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white">LATEST FROM BLOG</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg">
          Thoughts, tutorials, and stories.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-pulse text-gray-500">Loading posts…</div>
        </div>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500">
          No posts yet. Check back soon!
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/blog?post=${post.id}`)}
              className="bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-purple-500 hover:shadow-purple-500/20 transition-all duration-300"
            >
              {post.coverImageUrl && (
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">
                  {post.category || "Blog"}
                </span>
                <h3 className="text-xl font-bold text-white mt-3 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {excerpt(post.content)}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(post.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/blog")}
          className="px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transition-transform"
        >
          View All Posts →
        </button>
      </div>
    </section>
  );
};

export default BlogPreview;
