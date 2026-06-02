// src/pages/BlogAdmin.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth, storage } from "../../firebase";

const CATEGORIES = [
  "Tech",
  "Tutorial",
  "Personal",
  "Opinion",
  "Project",
  "Other",
];

// ── Image resizer (canvas-based, keeps localStorage/Storage small) ────────────
function resizeImage(file, maxW = 1200, maxH = 800, quality = 0.82) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxW || height > maxH) {
          const ratio = Math.min(maxW / width, maxH / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// ── Upload base64 image to Firebase Storage, return public URL ────────────────
async function uploadImageToStorage(base64, path) {
  const storageRef = ref(storage, path);
  await uploadString(storageRef, base64, "data_url");
  return await getDownloadURL(storageRef);
}

const BlogAdmin = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState("list"); // "list" | "editor"
  const [editingPost, setEditingPost] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Tech");
  const [coverImage, setCoverImage] = useState(""); // local base64 preview
  const [coverImageUrl, setCoverImageUrl] = useState(""); // Firebase Storage URL
  const [publishing, setPublishing] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [activeFormats, setActiveFormats] = useState({});

  // ── Auth guard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        navigate("/blog/login");
      } else {
        setUser(u);
        setAuthLoading(false);
      }
    });
    return unsub;
  }, [navigate]);

  // ── Load all posts ─────────────────────────────────────────────────────────
  const loadPosts = useCallback(async () => {
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toMillis?.() ?? d.data().createdAt,
        updatedAt: d.data().updatedAt?.toMillis?.() ?? d.data().updatedAt,
      }));
      setPosts(fetched);
    } catch (err) {
      console.error("Load posts error:", err);
    }
  }, []);

  useEffect(() => {
    if (!authLoading) loadPosts();
  }, [authLoading, loadPosts]);

  // ── Editor helpers ─────────────────────────────────────────────────────────
  const updateActiveFormats = useCallback(() => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikeThrough: document.queryCommandState("strikeThrough"),
      insertUnorderedList: document.queryCommandState("insertUnorderedList"),
      insertOrderedList: document.queryCommandState("insertOrderedList"),
      justifyLeft: document.queryCommandState("justifyLeft"),
      justifyCenter: document.queryCommandState("justifyCenter"),
      justifyRight: document.queryCommandState("justifyRight"),
    });
  }, []);

  const exec = (command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    updateActiveFormats();
  };

  // ── Cover image ─────────────────────────────────────────────────────────────
  const handleCoverImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Resize to 1200×630 (ideal blog cover / OG ratio)
    const resized = await resizeImage(file, 1200, 630, 0.85);
    setCoverImage(resized); // show preview immediately
    e.target.value = "";
  };

  // ── Inline body image ───────────────────────────────────────────────────────
  const handleInsertImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const resized = await resizeImage(file, 900, 600, 0.8);
    exec("insertImage", resized);
    setTimeout(() => {
      editorRef.current?.querySelectorAll("img").forEach((img) => {
        img.style.maxWidth = "100%";
        img.style.borderRadius = "8px";
        img.style.margin = "12px 0";
      });
    }, 50);
    e.target.value = "";
  };

  const handleInsertLink = () => {
    const url = prompt("Enter URL:");
    if (url) exec("createLink", url);
  };

  // ── Open new post ───────────────────────────────────────────────────────────
  const openNewPost = () => {
    setEditingPost(null);
    setTitle("");
    setCategory("Tech");
    setCoverImage("");
    setCoverImageUrl("");
    setView("editor");
    setTimeout(() => {
      if (editorRef.current) editorRef.current.innerHTML = "<p><br></p>";
    }, 50);
  };

  // ── Open existing post for editing ─────────────────────────────────────────
  const openEditPost = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setCategory(post.category || "Tech");
    setCoverImage(post.coverImage || "");
    setCoverImageUrl(post.coverImageUrl || "");
    setView("editor");
    setTimeout(() => {
      if (editorRef.current) editorRef.current.innerHTML = post.content;
    }, 50);
  };

  // ── Save / Publish ──────────────────────────────────────────────────────────
  const handleSave = async (publish = false) => {
    const content = editorRef.current?.innerHTML || "";
    if (!title.trim()) return alert("Please add a title.");
    if (content.replace(/<[^>]+>/g, "").trim().length < 5)
      return alert("Please write some content.");

    setPublishing(true);

    try {
      let finalCoverUrl = coverImageUrl;

      // Upload cover to Firebase Storage if it's a new local base64 image
      if (coverImage && coverImage.startsWith("data:")) {
        const path = `covers/${Date.now()}_${title.replace(/\s+/g, "_").slice(0, 40)}.jpg`;
        finalCoverUrl = await uploadImageToStorage(coverImage, path);
        setCoverImageUrl(finalCoverUrl);
      }

      // Also upload any inline base64 images in the content to Storage
      let finalContent = content;
      const base64Imgs = content.match(/src="data:image[^"]+"/g) || [];
      for (const match of base64Imgs) {
        const base64 = match.slice(5, -1); // strip src=" and "
        const path = `body/${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`;
        const url = await uploadImageToStorage(base64, path);
        finalContent = finalContent.replace(base64, url);
      }

      const postData = {
        title: title.trim(),
        category,
        coverImage: coverImage.startsWith("data:") ? "" : coverImage,
        coverImageUrl: finalCoverUrl,
        content: finalContent,
        published: publish,
        updatedAt: serverTimestamp(),
      };

      if (editingPost) {
        // Update existing
        await updateDoc(doc(db, "posts", editingPost.id), postData);
      } else {
        // Create new
        await addDoc(collection(db, "posts"), {
          ...postData,
          createdAt: serverTimestamp(),
        });
      }

      await loadPosts();
      setSaveMsg(publish ? "✅ Published!" : "💾 Draft saved!");
      setTimeout(() => setSaveMsg(""), 2500);
      setView("list");
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save. Check console for details.");
    } finally {
      setPublishing(false);
    }
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async (post) => {
    if (!window.confirm("Delete this post permanently?")) return;
    try {
      await deleteDoc(doc(db, "posts", post.id));
      // Try to delete cover from Storage if it's a Storage URL
      if (post.coverImageUrl) {
        try {
          const storageRef = ref(storage, post.coverImageUrl);
          await deleteObject(storageRef);
        // eslint-disable-next-line no-unused-vars
        } catch (_) {
          // Ignore — URL might not be a Storage path ref
        }
      }
      await loadPosts();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ── Toggle publish ──────────────────────────────────────────────────────────
  const handleTogglePublish = async (post) => {
    try {
      await updateDoc(doc(db, "posts", post.id), {
        published: !post.published,
        updatedAt: serverTimestamp(),
      });
      await loadPosts();
    } catch (err) {
      console.error("Toggle publish error:", err);
    }
  };

  const formatDate = (ts) =>
    ts
      ? new Date(ts).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "—";

  const logout = async () => {
    await signOut(auth);
    navigate("/blog");
  };

  // ── Toolbar button ──────────────────────────────────────────────────────────
  const ToolBtn = ({ cmd, label, title: tip, icon }) => (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        exec(cmd);
      }}
      title={tip || label}
      className={`px-2 py-1.5 rounded text-sm font-medium transition-colors min-w-[30px] ${
        activeFormats[cmd]
          ? "bg-purple-600 text-white"
          : "text-gray-300 hover:bg-white/10"
      }`}
    >
      {icon || label}
    </button>
  );

  // ── Auth loading ────────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#050414] flex items-center justify-center">
        <div className="text-gray-500 text-sm animate-pulse">Loading…</div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // POST LIST VIEW
  // ─────────────────────────────────────────────────────────────────────────────
  if (view === "list") {
    return (
      <div className="min-h-screen bg-[#050414] text-white font-sans">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');`}</style>

        {/* Header */}
        <div className="sticky top-0 z-50 bg-[#050414]/90 backdrop-blur-md border-b border-white/5 px-[5vw] md:px-[10vw] py-4 flex items-center justify-between">
          <h1
            className="text-xl font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            ✍️ Blog Admin
          </h1>
          <div className="flex items-center gap-3">
            {saveMsg && (
              <span className="text-sm text-green-400">{saveMsg}</span>
            )}
            <span className="text-xs text-gray-600 hidden md:block">
              {user?.email}
            </span>
            <button
              onClick={() => navigate("/blog")}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              View Blog ↗
            </button>
            <button
              onClick={logout}
              className="text-xs text-gray-500 hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="px-[5vw] md:px-[10vw] py-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                All Posts
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {posts.length} total · {posts.filter((p) => p.published).length}{" "}
                published
              </p>
            </div>
            <button
              onClick={openNewPost}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
            >
              + New Post
            </button>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-24 border border-white/5 rounded-2xl">
              <p className="text-5xl mb-4">📝</p>
              <p className="text-gray-400 mb-6">
                No posts yet. Write your first one!
              </p>
              <button
                onClick={openNewPost}
                className="px-6 py-3 rounded-xl text-white text-sm font-semibold"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                }}
              >
                Write First Post
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-4 bg-gray-900/50 border border-white/5 rounded-xl p-4 hover:border-purple-500/20 transition-colors"
                >
                  {post.coverImageUrl || post.coverImage ? (
                    <img
                      src={post.coverImageUrl || post.coverImage}
                      alt=""
                      className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                      📄
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {post.category} · {formatDate(post.createdAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full border ${
                        post.published
                          ? "text-green-400 bg-green-500/10 border-green-500/20"
                          : "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                    <button
                      onClick={() => handleTogglePublish(post)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                    >
                      {post.published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => openEditPost(post)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // EDITOR VIEW
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#050414] text-white font-sans flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        #blog-editor { outline: none; min-height: 500px; }
        #blog-editor p { margin-bottom: 1rem; }
        #blog-editor h1 { font-size: 2rem; font-weight: 800; margin: 1.5rem 0 0.75rem; font-family: 'Syne', sans-serif; }
        #blog-editor h2 { font-size: 1.5rem; font-weight: 700; margin: 1.25rem 0 0.5rem; font-family: 'Syne', sans-serif; }
        #blog-editor h3 { font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.5rem; font-family: 'Syne', sans-serif; }
        #blog-editor img { max-width: 100%; border-radius: 8px; margin: 12px 0; }
        #blog-editor ul { list-style: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        #blog-editor ol { list-style: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
        #blog-editor li { margin-bottom: 0.3rem; }
        #blog-editor blockquote { border-left: 3px solid #8245ec; padding-left: 1rem; color: #9ca3af; font-style: italic; margin: 1rem 0; }
        #blog-editor a { color: #a855f7; text-decoration: underline; }
        #blog-editor hr { border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 1.5rem 0; }
        #blog-editor code { font-family: monospace; background: rgba(130,69,236,0.12); padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
        #blog-editor:empty:before { content: 'Start writing your post here…'; color: #4b5563; }
      `}</style>

      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-[#0a0520]/95 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView("list")}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            ← Posts
          </button>
          <span className="text-gray-700">|</span>
          <span className="text-sm text-gray-400">
            {editingPost ? "Editing post" : "New post"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {saveMsg && <span className="text-sm text-green-400">{saveMsg}</span>}
          <button
            onClick={() => handleSave(false)}
            disabled={publishing}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 transition-colors disabled:opacity-40"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={publishing}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105 disabled:opacity-40 disabled:scale-100"
            style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
          >
            {publishing ? "Saving…" : "Publish →"}
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-[#0d0820] border-b border-white/5 px-4 py-2 flex flex-wrap items-center gap-1">
        {/* Block format */}
        <select
          onChange={(e) => {
            exec("formatBlock", e.target.value);
            e.target.value = "p";
          }}
          className="bg-transparent text-gray-300 text-xs border border-white/10 rounded px-2 py-1.5 mr-1 focus:outline-none"
          defaultValue="p"
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="blockquote">Quote</option>
          <option value="pre">Code</option>
        </select>

        {/* Font size */}
        <select
          onChange={(e) => exec("fontSize", e.target.value)}
          className="bg-transparent text-gray-300 text-xs border border-white/10 rounded px-2 py-1.5 mr-2 focus:outline-none"
          defaultValue="3"
        >
          <option value="1">Small</option>
          <option value="3">Normal</option>
          <option value="4">Large</option>
          <option value="5">XL</option>
          <option value="6">XXL</option>
        </select>

        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* Format */}
        <ToolBtn cmd="bold" icon={<b>B</b>} title="Bold (Ctrl+B)" />
        <ToolBtn cmd="italic" icon={<i>I</i>} title="Italic (Ctrl+I)" />
        <ToolBtn cmd="underline" icon={<u>U</u>} title="Underline (Ctrl+U)" />
        <ToolBtn cmd="strikeThrough" icon={<s>S</s>} title="Strikethrough" />

        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* Alignment */}
        <ToolBtn cmd="justifyLeft" icon="⬅" title="Align Left" />
        <ToolBtn cmd="justifyCenter" icon="≡" title="Center" />
        <ToolBtn cmd="justifyRight" icon="➡" title="Align Right" />

        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* Lists */}
        <ToolBtn cmd="insertUnorderedList" icon="• —" title="Bullet List" />
        <ToolBtn cmd="insertOrderedList" icon="1." title="Numbered List" />

        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* Color pickers */}
        <div className="flex items-center gap-1">
          <label className="text-xs text-gray-500">A</label>
          <input
            type="color"
            defaultValue="#ffffff"
            onChange={(e) => exec("foreColor", e.target.value)}
            className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
            title="Text Color"
          />
        </div>
        <div className="flex items-center gap-1">
          <label className="text-xs text-gray-500">🖊</label>
          <input
            type="color"
            defaultValue="#8245ec"
            onChange={(e) => exec("hiliteColor", e.target.value)}
            className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
            title="Highlight Color"
          />
        </div>

        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* Image insert */}
        <button
          onClick={() => fileInputRef.current?.click()}
          title="Insert Image"
          className="px-2 py-1.5 rounded text-sm text-gray-300 hover:bg-white/10 transition-colors"
        >
          🖼 Image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleInsertImage}
        />

        {/* Link */}
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleInsertLink();
          }}
          title="Insert Link"
          className="px-2 py-1.5 rounded text-sm text-gray-300 hover:bg-white/10 transition-colors"
        >
          🔗 Link
        </button>

        {/* Divider */}
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            exec("insertHorizontalRule");
          }}
          title="Divider"
          className="px-2 py-1.5 rounded text-sm text-gray-300 hover:bg-white/10 transition-colors"
        >
          — Divider
        </button>

        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* Undo / Redo */}
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            exec("undo");
          }}
          title="Undo"
          className="px-2 py-1.5 rounded text-sm text-gray-300 hover:bg-white/10"
        >
          ↩
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            exec("redo");
          }}
          title="Redo"
          className="px-2 py-1.5 rounded text-sm text-gray-300 hover:bg-white/10"
        >
          ↪
        </button>
      </div>

      {/* Editor Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-8">
        <div className="mb-6 space-y-4">
          {/* Cover image */}
          <div>
            {coverImage || coverImageUrl ? (
              <div className="relative group">
                <img
                  src={coverImage || coverImageUrl}
                  alt="Cover"
                  className="w-full max-h-64 object-cover rounded-xl"
                />
                <button
                  onClick={() => {
                    setCoverImage("");
                    setCoverImageUrl("");
                  }}
                  className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full w-7 h-7 text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ) : (
              <button
                onClick={() => coverInputRef.current?.click()}
                className="w-full border-2 border-dashed border-white/10 hover:border-purple-500/40 rounded-xl py-8 text-gray-500 hover:text-purple-400 text-sm transition-colors"
              >
                + Add Cover Image
              </button>
            )}
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverImage}
            />
          </div>

          {/* Category */}
          <div className="flex items-center gap-3 flex-wrap">
            <label className="text-xs text-gray-500 uppercase tracking-wider">
              Category
            </label>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                    category === cat
                      ? "bg-purple-600 border-purple-500 text-white"
                      : "bg-transparent border-white/10 text-gray-400 hover:border-purple-500/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title…"
            className="w-full bg-transparent text-3xl md:text-4xl font-bold text-white placeholder-gray-700 border-none outline-none"
            style={{ fontFamily: "'Syne', sans-serif" }}
          />
          <div className="h-px bg-white/5" />
        </div>

        {/* Content editable editor */}
        <div
          id="blog-editor"
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onKeyUp={updateActiveFormats}
          onMouseUp={updateActiveFormats}
          onInput={updateActiveFormats}
          className="text-gray-200 leading-relaxed text-base focus:outline-none"
          style={{ minHeight: "500px", wordBreak: "break-word" }}
        />
      </div>
    </div>
  );
};

export default BlogAdmin;
