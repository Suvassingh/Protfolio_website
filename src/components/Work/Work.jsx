import React, { useState, useEffect } from "react";
import { projects } from "../../constants";

// Tech logos imports (keep all your existing ones)
import htmlLogo from "../../assets/tech_logo/html.png";
import cssLogo from "../../assets/tech_logo/css.png";
import javascriptLogo from "../../assets/tech_logo/javascript.png";
import reactjsLogo from "../../assets/tech_logo/reactjs.png";
import nextjsLogo from "../../assets/tech_logo/nextjs.png";
import tailwindcssLogo from "../../assets/tech_logo/tailwindcss.png";
import gsapLogo from "../../assets/tech_logo/gsap.png";
import materialuiLogo from "../../assets/tech_logo/materialui.png";
import bootstrapLogo from "../../assets/tech_logo/bootstrap.png";
import nodejsLogo from "../../assets/tech_logo/nodejs.png";
import expressjsLogo from "../../assets/tech_logo/express.png";
import mysqlLogo from "../../assets/tech_logo/mysql.png";
import mongodbLogo from "../../assets/tech_logo/mc.png"; // your MongoDB logo
import firebaseLogo from "../../assets/tech_logo/firebase.png";
import postgresqlLogo from "../../assets/tech_logo/postgre.png";
import flutterLogo from "../../assets/tech_logo/flutter.png";
import cLogo from "../../assets/tech_logo/c.png";
import cppLogo from "../../assets/tech_logo/cpp.png";
import pythonLogo from "../../assets/tech_logo/python.png";
import dartLogo from "../../assets/tech_logo/dart.png";
import gitLogo from "../../assets/tech_logo/git.png";
import githubLogo from "../../assets/tech_logo/github.png";
import vscodeLogo from "../../assets/tech_logo/vscode.png";
import postmanLogo from "../../assets/tech_logo/postman.png";
import figmaLogo from "../../assets/tech_logo/figma.png";
import netlifyLogo from "../../assets/tech_logo/netlify.png";
import vercelLogo from "../../assets/tech_logo/vercel.png";

// Map tag strings → logo image
const TECH_LOGOS = {
  HTML: htmlLogo,
  CSS: cssLogo,
  JavaScript: javascriptLogo,
  "React JS": reactjsLogo,
  "Next JS": nextjsLogo,
  "Tailwind CSS": tailwindcssLogo,
  GSAP: gsapLogo,
  "Material UI": materialuiLogo,
  Bootstrap: bootstrapLogo,
  "Node js": nodejsLogo,
  "Express JS": expressjsLogo,
  MySQL: mysqlLogo,
  MongoDB: mongodbLogo,
  Firebase: firebaseLogo,
  PostgreSQL: postgresqlLogo,
  Flutter: flutterLogo,
  C: cLogo,
  "C++": cppLogo,
  Python: pythonLogo,
  Dart: dartLogo,
  Git: gitLogo,
  Github: githubLogo,
  "VS Code": vscodeLogo,
  Postman: postmanLogo,
  Figma: figmaLogo,
  Netlify: netlifyLogo,
  Vercel: vercelLogo,
};

//   Work Component  
const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filter, setFilter] = useState("All");

  // Get all unique tags from projects for filter buttons
  const allTags = ["All", ...new Set(projects.flatMap((p) => p.tags))];

  // Filter projects based on selected tag
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(filter));

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const getImages = (project) =>
    project.images?.length ? project.images : [project.image];

  const goToPreviousImage = (e) => {
    e.stopPropagation();
    const images = getImages(selectedProject);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNextImage = (e) => {
    e.stopPropagation();
    const images = getImages(selectedProject);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section
      id="work"
      className="py-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative"
    >
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">PROJECTS</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          A showcase of the projects I have worked on, highlighting my skills
          and experience in various technologies.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === tag
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Projects Grid – now maps filteredProjects */}
      <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleOpenModal(project)}
            className="border border-white bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-purple-500/50 hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="p-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-500 mb-4 pt-4 line-clamp-3">
                {project.description}
              </p>
              <div className="mb-4">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-[#251f38] text-xs font-semibold text-purple-500 rounded-full px-2 py-1 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal – unchanged, still works with selectedProject */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="relative bg-gray-900 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="flex justify-end px-4 pt-4 flex-shrink-0">
              <button
                onClick={handleCloseModal}
                className="text-white text-3xl font-bold leading-none hover:text-purple-500 transition-colors"
              >
                &times;
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1">
              {/* Image Carousel */}
              <div className="relative w-full bg-gray-900 px-4">
                {getImages(selectedProject).length > 1 && (
                  <>
                    <button
                      onClick={goToPreviousImage}
                      className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full z-10"
                    >
                      &#8249;
                    </button>
                    <button
                      onClick={goToNextImage}
                      className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full z-10"
                    >
                      &#8250;
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                      {getImages(selectedProject).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(idx);
                          }}
                          className={`w-2.5 h-2.5 rounded-full ${
                            idx === currentImageIndex
                              ? "bg-purple-500"
                              : "bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
                <img
                  src={getImages(selectedProject)[currentImageIndex]}
                  alt={selectedProject.title}
                  className="w-full max-h-64 md:max-h-80 object-contain rounded-xl shadow-2xl"
                />
              </div>

              {/* Text details */}
              <div className="p-6 lg:p-8">
                <h3 className="text-xl lg:text-3xl font-bold text-white mb-4">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-400 mb-6 text-sm lg:text-base whitespace-pre-line">
                  {selectedProject.longDescription ||
                    selectedProject.description}
                </p>

                {/* Tags with logos */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag, index) => {
                    const logo = TECH_LOGOS[tag];
                    return (
                      <span
                        key={index}
                        className="inline-flex items-center bg-[#251f38] text-xs font-semibold text-purple-500 rounded-full px-3 py-1 gap-2"
                      >
                        {logo && (
                          <img src={logo} alt={tag} className="w-4 h-4" />
                        )}
                        {tag}
                      </span>
                    );
                  })}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] bg-gray-800 hover:bg-purple-800 text-gray-400 px-4 py-2 rounded-xl text-sm lg:text-base font-semibold text-center transition-colors"
                  >
                    View Code
                  </a>
                  {selectedProject.webapp && (
                    <a
                      href={selectedProject.webapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[120px] bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded-xl text-sm lg:text-base font-semibold text-center transition-colors"
                    >
                      View Live
                    </a>
                  )}
                  {selectedProject.apk && (
                    <a
                      href={selectedProject.apk}
                      download
                      className="flex-1 min-w-[120px] bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-xl text-sm lg:text-base font-semibold text-center transition-colors"
                    >
                      Download APK
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Work;
