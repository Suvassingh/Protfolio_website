// // src/pages/BlogPage.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
// import { db } from "../../firebase";

// const BlogPage = () => {
//   const [posts, setPosts] = useState([]);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // ── Fetch published posts from Firestore ──────────────────────────────────
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const q = query(
//           collection(db, "posts"),
//           where("published", "==", true),
//           orderBy("createdAt", "desc"),
//         );
//         const snapshot = await getDocs(q);
//         const fetched = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//           // Firestore Timestamps → milliseconds for consistent handling
//           createdAt: doc.data().createdAt?.toMillis?.() ?? doc.data().createdAt,
//           updatedAt: doc.data().updatedAt?.toMillis?.() ?? doc.data().updatedAt,
//         }));
//         setPosts(fetched);
//       } catch (err) {
//         console.error("Failed to fetch posts:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // ── Helpers ───────────────────────────────────────────────────────────────
//   const formatDate = (ts) =>
//     new Date(ts).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });

//   const readTime = (html) => {
//     const text = html.replace(/<[^>]+>/g, "");
//     const words = text.trim().split(/\s+/).length;
//     return Math.max(1, Math.ceil(words / 200));
//   };

//   const excerpt = (html) => {
//     const text = html.replace(/<[^>]+>/g, "");
//     return text.slice(0, 160) + (text.length > 160 ? "…" : "");
//   };

//   // ── Single post view ──────────────────────────────────────────────────────
//   if (selectedPost) {
//     return (
//       <div className="min-h-screen bg-[#050414] text-white font-sans">
//         {/* Header */}
//         <div className="sticky top-0 z-50 bg-[#050414]/80 backdrop-blur-md border-b border-white/5 px-[7vw] md:px-[20vw] py-4 flex items-center justify-between">
//           <button
//             onClick={() => setSelectedPost(null)}
//             className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
//           >
//             ← Back to Blog
//           </button>
//           <button
//             onClick={() => navigate("/blog/login")}
//             className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
//           >
//             Admin
//           </button>
//         </div>

//         {/* Post Content */}
//         <article className="px-[7vw] md:px-[20vw] py-16 max-w-4xl mx-auto">
//           {selectedPost.coverImage && (
//             <img
//               src={selectedPost.coverImage}
//               alt={selectedPost.title}
//               className="w-full max-h-96 object-cover rounded-2xl mb-10 shadow-[0_0_40px_rgba(130,69,236,0.2)]"
//             />
//           )}

//           <div className="flex items-center gap-3 mb-6">
//             <span className="text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
//               {selectedPost.category || "Blog"}
//             </span>
//             <span className="text-xs text-gray-500">
//               {formatDate(selectedPost.createdAt)}
//             </span>
//             <span className="text-xs text-gray-500">
//               · {readTime(selectedPost.content)} min read
//             </span>
//           </div>

//           <h1
//             className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6"
//             style={{ fontFamily: "'Syne', sans-serif" }}
//           >
//             {selectedPost.title}
//           </h1>

//           <div className="flex items-center gap-3 mb-12 pb-8 border-b border-white/5">
//             <div className="w-9 h-9 rounded-full bg-purple-700 flex items-center justify-center text-sm font-bold">
//               S
//             </div>
//             <div>
//               <p className="text-sm font-medium text-white">Subhash Singh</p>
//               <p className="text-xs text-gray-500">Author</p>
//             </div>
//           </div>

//           <div
//             className="blog-content"
//             dangerouslySetInnerHTML={{ __html: selectedPost.content }}
//           />
//         </article>

//         <style>{`
//           @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
//           .blog-content { color: #d1d5db; line-height: 1.85; font-size: 1.05rem; }
//           .blog-content h1, .blog-content h2, .blog-content h3 { color: #fff; font-family: 'Syne', sans-serif; margin: 2rem 0 1rem; }
//           .blog-content h1 { font-size: 2rem; }
//           .blog-content h2 { font-size: 1.5rem; }
//           .blog-content h3 { font-size: 1.25rem; }
//           .blog-content p { margin-bottom: 1.25rem; }
//           .blog-content img { max-width: 100%; border-radius: 12px; margin: 1.5rem 0; box-shadow: 0 0 30px rgba(130,69,236,0.15); }
//           .blog-content ul, .blog-content ol { padding-left: 1.5rem; margin-bottom: 1.25rem; }
//           .blog-content li { margin-bottom: 0.5rem; }
//           .blog-content blockquote { border-left: 3px solid #8245ec; padding-left: 1rem; color: #9ca3af; font-style: italic; margin: 1.5rem 0; }
//           .blog-content strong { color: #e5e7eb; }
//           .blog-content a { color: #a855f7; text-decoration: underline; }
//           .blog-content pre { background: #0d0820; border: 1px solid rgba(130,69,236,0.2); border-radius: 8px; padding: 1rem; overflow-x: auto; margin: 1.5rem 0; }
//           .blog-content code { font-family: monospace; font-size: 0.9em; background: rgba(130,69,236,0.1); padding: 2px 6px; border-radius: 4px; }
//         `}</style>
//       </div>
//     );
//   }

//   // ── Posts feed ────────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-[#050414] text-white font-sans">
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');`}</style>

//       {/* Navbar */}
//       <div className="sticky top-0 z-50 bg-[#050414]/80 backdrop-blur-md border-b border-white/5 px-[7vw] md:px-[20vw] py-4 flex items-center justify-between">
//         <button
//           onClick={() => navigate("/")}
//           className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
//         >
//           ← Back to Portfolio
//         </button>
//         <button
//           onClick={() => navigate("/blog/login")}
//           className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
//         >
//           Admin
//         </button>
//       </div>

//       {/* Hero */}
//       <div className="px-[7vw] md:px-[20vw] pt-20 pb-16 text-center">
//         <p className="text-xs tracking-widest text-purple-400 uppercase mb-4">
//           Thoughts &amp; Writings
//         </p>
//         <h1
//           className="text-5xl md:text-7xl font-bold text-white"
//           style={{ fontFamily: "'Syne', sans-serif" }}
//         >
//           The Blog
//         </h1>
//         <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">
//           Ideas, tutorials, and stories from my journey in tech.
//         </p>
//       </div>

//       {/* Posts */}
//       <div className="px-[7vw] md:px-[20vw] pb-24">
//         {/* Loading skeleton */}
//         {loading ? (
//           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//             {[1, 2, 3].map((n) => (
//               <div
//                 key={n}
//                 className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden animate-pulse"
//               >
//                 <div className="w-full h-48 bg-white/5" />
//                 <div className="p-6 space-y-3">
//                   <div className="h-3 bg-white/5 rounded w-1/3" />
//                   <div className="h-4 bg-white/5 rounded w-3/4" />
//                   <div className="h-3 bg-white/5 rounded w-full" />
//                   <div className="h-3 bg-white/5 rounded w-5/6" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : posts.length === 0 ? (
//           <div className="text-center py-24">
//             <p className="text-6xl mb-6">✍️</p>
//             <p className="text-gray-500 text-lg">
//               No posts yet. Check back soon!
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//             {posts.map((post) => (
//               <article
//                 key={post.id}
//                 onClick={() => setSelectedPost(post)}
//                 className="group bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-purple-500/30 hover:-translate-y-1 transition-all duration-300"
//               >
//                 {post.coverImage ? (
//                   <img
//                     src={post.coverImage}
//                     alt={post.title}
//                     className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                 ) : (
//                   <div className="w-full h-48 bg-gradient-to-br from-purple-900/40 to-[#0d0820] flex items-center justify-center text-4xl">
//                     📝
//                   </div>
//                 )}
//                 <div className="p-6">
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
//                       {post.category || "Blog"}
//                     </span>
//                     <span className="text-xs text-gray-600">
//                       {readTime(post.content)} min read
//                     </span>
//                   </div>
//                   <h2
//                     className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2"
//                     style={{ fontFamily: "'Syne', sans-serif" }}
//                   >
//                     {post.title}
//                   </h2>
//                   <p className="text-sm text-gray-500 line-clamp-3 mb-4">
//                     {excerpt(post.content)}
//                   </p>
//                   <p className="text-xs text-gray-600">
//                     {formatDate(post.createdAt)}
//                   </p>
//                 </div>
//               </article>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogPage;


// src/pages/BlogPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ── Fetch published posts from Firestore ──────────────────────────────────
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, "posts"),
          where("published", "==", true),
          orderBy("createdAt", "desc"),
        );
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toMillis?.() ?? doc.data().createdAt,
          updatedAt: doc.data().updatedAt?.toMillis?.() ?? doc.data().updatedAt,
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

  // ── Helpers ───────────────────────────────────────────────────────────────
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

  // ── Single post view (supports full custom layout) ────────────────────────
  if (selectedPost) {
    // If post uses full custom HTML layout, render only the raw HTML
    if (selectedPost.fullCustomLayout) {
      return (
        <div className="min-h-screen">
          <div className="sticky top-0 z-50 bg-white/80 dark:bg-[#050414]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 px-4 py-3">
            <button
              onClick={() => setSelectedPost(null)}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 text-sm font-medium"
            >
              ← Back to Blog
            </button>
          </div>
          <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
        </div>
      );
    }

    // Default blog post layout (with header, author, etc.)
    return (
      <div className="min-h-screen bg-[#050414] text-white font-sans">
        <div className="sticky top-0 z-50 bg-[#050414]/80 backdrop-blur-md border-b border-white/5 px-[7vw] md:px-[20vw] py-4 flex items-center justify-between">
          <button
            onClick={() => setSelectedPost(null)}
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
          <div className="flex items-center gap-3 mb-6">
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
          <div className="flex items-center gap-3 mb-12 pb-8 border-b border-white/5">
            <div className="w-9 h-9 rounded-full bg-purple-700 flex items-center justify-center text-sm font-bold">
              S
            </div>
            <div>
              <p className="text-sm font-medium text-white">Subhash Singh</p>
              <p className="text-xs text-gray-500">Author</p>
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

  // ── Posts feed (unchanged) ────────────────────────────────────────────────
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
                onClick={() => setSelectedPost(post)}
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