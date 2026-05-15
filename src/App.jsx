// // export default App
// import React from "react";
// import Navbar from "./components/Navbar/Navbar";
// import About from "./components/About/About";
// import Skills from "./components/Skills/Skills";
// import Experience from "./components/Experience/Experience";
// import Work from "./components/Work/Work";
// import Education from "./components/Education/Education";
// import Contact from "./components/Contact/Contact";
// import Footer from "./components/Footer/Footer";
// import BlurBlob from "./components/BlurBlob";

// const App = () => {
//   return (
//     <div className="bg-[#050414]">
//       <BlurBlob
//         position={{ top: "35%", left: "20%" }}
//         size={{ width: "30%", height: "40%" }}
//       />

//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
//       <div className="relative pt-20">
//         <Navbar />
//         <About />
//         <Skills />
//         <Experience />
//         <Work />
//         <Education />
//         <Contact />
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default App;


// Install react-router-dom first: npm install react-router-dom

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Work from "./components/Work/Work";
import Education from "./components/Education/Education";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import BlurBlob from "./components/BlurBlob";

// Blog pages
import BlogPage from "./components/Blog/BlogPage";
import BlogLogin from "./components/Blog/BlogLogin";
import BlogAdmin from "./components/Blog/BlogAdmin";

// ─── Portfolio Home ───────────────────────────────────────────────────────────
const Home = () => (
  <div className="bg-[#050414]">
    <BlurBlob
      position={{ top: "35%", left: "20%" }}
      size={{ width: "30%", height: "40%" }}
    />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    <div className="relative pt-20">
      <Navbar />
      <About />
      <Skills />
      <Experience />
      <Work />
      <Education />
      <Contact />
      <Footer />
    </div>
  </div>
);

// ─── App with Router ──────────────────────────────────────────────────────────
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/login" element={<BlogLogin />} />
      <Route path="/blog/admin" element={<BlogAdmin />} />
    </Routes>
  </BrowserRouter>
);

export default App;