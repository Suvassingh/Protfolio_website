import React from "react";
import Tilt from "react-parallax-tilt";
import ReactTypingEffect from "react-typing-effect";
import profileImage from "../../assets/profile.png";

const About = () => {
  return (
    <section
      id="about"
      className="py-4 px-[7vw] md:px-[20vw] font-sans mt-16 md:mt-24 lg:mt-32"
    >
      <div className="flex flex-col-reverse md:flex-row justify-between items-center">
        {/* Left side */}
        <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-0">
          <h1 className="text-3xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
            Hi, I am
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Subhash Singh
          </h2>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 leading-tight">
            <span className="text-gray-700 dark:text-white">I am a </span>
            <span className="text-[#B245ec]">
              <ReactTypingEffect
                text={[
                  "Fullstack Developer",
                  "App Developer",
                  "UI/UX Designer",
                  "Tech Enthusiast",
                ]}
                speed={100}
                eraseSpeed={50}
                typingDelay={500}
                eraseDelay={2000}
                cursorRenderer={(cursor) => (
                  <span className="text-[#8245ec]">{cursor}</span>
                )}
              />
            </span>
          </h3>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-10 mt-8 leading-relaxed">
            I am a full-stack developer with over 3 years of experience in
            building scalable web applications. Skilled in both front-end and
            back-end development, I specialize in the MERN stack, Flutter and
            other modern technologies to create seamless user experiences and
            efficient solutions.
          </p>

          {/* Responsive button group */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-5">
            <a
              href="https://drive.google.com/file/d/1zlMbpgFStAhKAV0-095NUSebqUIImPsq/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white py-3 px-8 rounded-full text-lg font-bold transition duration-300 transform hover:scale-105 w-full sm:w-auto text-center"
              style={{
                background: "linear-gradient(90deg, #8245ec, #a855f7)",
                boxShadow: "0 0 2px #8245ec, 0 0 2px #8245ec, 0 0 40px #8245ec",
              }}
            >
              DOWNLOAD CV
            </a>

            <a
              href="/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white py-3 px-8 rounded-full text-lg font-bold transition duration-300 transform hover:scale-105 w-full sm:w-auto text-center"
              style={{
                background: "linear-gradient(90deg, #8245ec, #a855f7)",
                boxShadow: "0 0 2px #8245ec, 0 0 2px #8245ec, 0 0 40px #8245ec",
              }}
            >
              Blog Page
            </a>
          </div>
        </div>

        {/* Right side – profile image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <Tilt
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-[30rem] md:h-[30rem] border-4 border-purple-700 rounded-full"
            tiltMaxAngleX={20}
            tiltMaxAngleY={20}
            perspective={1000}
            scale={1.05}
            transitionSpeed={1000}
            gyroscope={true}
          >
            <img
              src={profileImage}
              alt="Subhash"
              className="w-full h-full rounded-full object-cover drop-shadow-[0_10px_20px_rgba(130,69,236,0.5)]"
            />
          </Tilt>
        </div>
      </div>
    </section>
  );
};

export default About;
