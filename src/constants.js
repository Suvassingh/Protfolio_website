// Skills Section Logo's
import htmlLogo from "./assets/tech_logo/html.png";
import cssLogo from "./assets/tech_logo/css.png";
import sassLogo from "./assets/tech_logo/sass.png";
import javascriptLogo from "./assets/tech_logo/javascript.png";
import reactjsLogo from "./assets/tech_logo/reactjs.png";
import angularLogo from "./assets/tech_logo/angular.png";
import reduxLogo from "./assets/tech_logo/redux.png";
import nextjsLogo from "./assets/tech_logo/nextjs.png";
import tailwindcssLogo from "./assets/tech_logo/tailwindcss.png";
import gsapLogo from "./assets/tech_logo/gsap.png";
import materialuiLogo from "./assets/tech_logo/materialui.png";
import bootstrapLogo from "./assets/tech_logo/bootstrap.png";
import springbootLogo from "./assets/tech_logo/springboot.png";
import nodejsLogo from "./assets/tech_logo/nodejs.png";
import cLogo from "./assets/tech_logo/c.png";
import csharpLogo from "./assets/tech_logo/csharp.png";
import gitLogo from "./assets/tech_logo/git.png";
import githubLogo from "./assets/tech_logo/github.png";
import expressjsLogo from "./assets/tech_logo/express.png";
import mysqlLogo from "./assets/tech_logo/mysql.png";
import mongodbLogo from "./assets/tech_logo/mc.png";
import firebaseLogo from "./assets/tech_logo/firebase.png";
import postgresqlLogo from "./assets/tech_logo/postgre.png";
import javaLogo from "./assets/tech_logo/java.png";
import pythonLogo from "./assets/tech_logo/python.png";
import typescriptLogo from "./assets/tech_logo/typescript.png";
import vscodeLogo from "./assets/tech_logo/vscode.png";
import postmanLogo from "./assets/tech_logo/postman.png";
import mcLogo from "./assets/tech_logo/mc.png";
import figmaLogo from "./assets/tech_logo/figma.png";
import netlifyLogo from "./assets/tech_logo/netlify.png";
import vercelLogo from "./assets/tech_logo/vercel.png";
import flutterLogo from "./assets/tech_logo/flutter.png"
import cpp from "./assets/tech_logo/cpp.png";

// education logo
import lotusLogo from './assets/education_logo/lotus.png'
import arnikoLogo from './assets/education_logo/arniko.png'
import kuLogo from './assets/education_logo/ku.png'

// project logo
import eStoreLogo from './assets/project/e-store.png'
import sewaMitraLogo from './assets/project/sewamitra.png'





export const SkillsInfo = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", logo: htmlLogo },
      { name: "CSS", logo: cssLogo },
      { name: "SASS", logo: sassLogo },
      { name: "JavaScript", logo: javascriptLogo },
      { name: "React JS", logo: reactjsLogo },
      { name: "Angular", logo: angularLogo },
      { name: "Redux", logo: reduxLogo },
      { name: "Next JS", logo: nextjsLogo },
      { name: "Tailwind CSS", logo: tailwindcssLogo },
      { name: "GSAP", logo: gsapLogo },
      { name: "Material UI", logo: materialuiLogo },
      { name: "Bootstrap", logo: bootstrapLogo },
      { name: "Flutter", logo: flutterLogo },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Springboot", logo: springbootLogo },
      { name: "Node js", logo: nodejsLogo },
      { name: "Express JS", logo: expressjsLogo },
      { name: "MySQL", logo: mysqlLogo },
      { name: "MongoDB", logo: mongodbLogo },
      { name: "Firebase", logo: firebaseLogo },
      { name: "PostgreSQL", logo: postgresqlLogo },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "C", logo: cLogo },
      { name: "C++", logo:cpp },
      { name: "Java", logo: javaLogo },
      { name: "Python", logo: pythonLogo },
      { name: "C-Sharp", logo: csharpLogo },
      { name: "JavaScript", logo: javascriptLogo },
      { name: "TypeScript", logo: typescriptLogo },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", logo: gitLogo },
      { name: "Github", logo: githubLogo },
      { name: "VS Code", logo: vscodeLogo },
      { name: "Postman", logo: postmanLogo },
      { name: "Compass", logo: mcLogo },
      { name: "Vercel", logo: vercelLogo },
      { name: "Netlify", logo: netlifyLogo },
      { name: "Figma", logo: figmaLogo },
    ],
  },
];
export const education = [
  {
    id: 0,
    img: kuLogo,
    school: "kathmandu university",
    date: "Dec 2022 - Till now",
    GPA: "3.5",
    desc: "I am pursuing my Bachelor's degree in Computer Science (B.Sc.) at Kathmandu University, Dulikhel. Throughout my studies, I explore a variety of subjects that deepen my understanding of computing and technology. From learning Data Structures and Algorithms to working on Web Development and Database Management Systems, I gain practical insights into the world of software development. My time at KU allows me to work on projects that apply theoretical concepts to real-world problems.",
    degree: "Bachelor of Science - BSC (Computer Science)",
  },
  {
    id: 1,
    img: arnikoLogo,
    school: "Arniko Awasiya Secondary School, Biratnagar",
    date: "2020AD - 2022AD",
    GPA: "3.14",
    desc: "I completed my Class 12 education from Arniko Awasiya Secondary School, Biratnagar, under the NEB board, where I studied Physics, Chemistry, and Mathematics (PCM) with Computer Science.",
    degree: "NEB(XII) - PCM with Computer Science",
  },
  {
    id: 2,
    img: lotusLogo,
    school: "Lotus English Boarding School , Lahan",
    date: "Completed on 2020AD",
    GPA: "3.90",
    desc: "I completed my class 10 education from Lotus English Boarding School, Lahan, under the NEB board, where I studied different subjects.",
    degree: "NEB(X)",
  },
];



  export const projects = [
    {
      id: 0,
      title: "E-Store",
      description:
        "An e-store website is an online platform that allows businesses and individuals to buy and sell products or services over the internet. It provides features like product listings, shopping carts, secure payment gateways, and order tracking. E-commerce websites make shopping convenient, accessible 24/7, and often offer a wide variety of products at competitive prices.",
      image: eStoreLogo,
      tags: [
        "HTML",
        "CSS",
        "JavaScript",
        "React JS",
        "API",
        "mongoDb",
        "Stripe",
      ],
      github: "https://github.com/Suvassingh/E-commerce.git",
      webapp: "https://emptymind.vercel.app/",
    },
    {
      id: 1,
      title: "SewaMitra",
      description:
        "A service provider app is a platform that connects customers with professionals or businesses, enabling easy booking, payment, and delivery of services like home care, or repairs—all in one place.",
      image: sewaMitraLogo,
      tags: [
        "Flutter",
        "API",
        "Firebase"
      ],
      github: "https://github.com/Suvassingh/SEWAMITRA1.git",
      webapp: "",
      apk:"/public/sewamitra.apk"
    },
    {
      id: 2,
      title: "Movie Recommendation App",
      description:
        "A React-based web application that provides movie recommendations based on different criteria, such as genres, user preferences, and popular trends. The intuitive design and smooth experience make it a go-to app for movie enthusiasts.",
      image: vercelLogo,
      tags: ["React JS", "API", "HTML", "CSS", "JavaScript"],
      github: "https://github.com/codingmastr/Movie-Recommendation-App",
      webapp: "",

    },
    {
      id: 3,
      title: "Email Validator NPM Package",
      description:
        "An efficient and customizable NPM package for validating email addresses. Built using React.js and Node.js, it provides robust validation features to help developers ensure that email inputs meet required formats and standards.",
      image: vercelLogo,
      tags: ["React JS", "Node.js", "NPM", "Validation"],
      github: "https://github.com/codingmastr/cmtk-email-validator",
      webapp: "https://www.npmjs.com/package/cmtk-email-validator",
    },
    {
      id: 4,
      title: "Task Reminder Chrome Extension Tool",
      description:
        "A productivity-boosting Chrome extension designed to help users manage and remember their daily tasks. Built using JavaScript, it offers a simple interface with reminders and task notifications to keep users on track.",
      image: vercelLogo,
      tags: ["JavaScript", "Chrome Extension", "HTML", "CSS"],
      github: "https://github.com/codingmastr/Task-Reminder-Tool",
      webapp: "chrome://extensions/?id=kngheeibjnnidhfoomkpnbeghackheci",
    },
    {
      id: 5,
      title: "Webverse Digital",
      description:
        "The official website for Webverse Digital, a creative digital marketing agency. Built using HTML, CSS, and JavaScript, it features visually appealing animations and a clean design to showcase the agency's services.",
      image: vercelLogo,
      tags: ["HTML", "CSS", "JavaScript", "Framer Motion"],
      github: "https://github.com/codingmastr/Webverse-Digital",
      webapp: "https://webversedigital.com/",
    },
    {
      id: 6,
      title: "Coding Master",
      description:
        "An ed-tech platform where users can access tech and coding-related blogs, notes, interview questions, e-books, and premium content with payment integration. Built with full-stack technologies for a seamless learning experience.",
      image: vercelLogo,
      tags: [
        "React JS",
        "Node.js",
        "MongoDB",
        "Express",
        "Payment Integration",
      ],
      github: "https://codingmasterweb.in/",
      webapp: "https://codingmasterweb.in/",
    },
    {
      id: 7,
      title: "Image Search App",
      description:
        "A React.js-based image search application that allows users to search and download high-quality images from the web. Built using external APIs to ensure a vast library of results for various queries.",
      image: vercelLogo,
      tags: ["React JS", "API", "Search Feature", "CSS", "Javascript"],
      github: "https://github.com/codingmastr/Image-Search-App",
      webapp: "https://imagsearch.netlify.app/",
    },
    {
      id: 8,
      title: "Image Background Remover",
      description:
        "An efficient background removal app built with React.js and API integration. Users can upload any image, remove the background, and download the transparent version for further use.",
      image: vercelLogo,
      tags: [
        "React JS",
        "API",
        "Image Processing",
        "HTML",
        "CSS",
        "Javascript",
      ],
      github: "https://github.com/codingmastr/Image-Background-Remover",
      webapp: "https://removeyourbg.netlify.app/",
    },
  ];