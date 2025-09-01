// Skills Section Logo's
import htmlLogo from "./assets/tech_logo/html.png";
import cssLogo from "./assets/tech_logo/css.png";
// import sassLogo from "./assets/tech_logo/sass.png";
import javascriptLogo from "./assets/tech_logo/javascript.png";
import reactjsLogo from "./assets/tech_logo/reactjs.png";
// import angularLogo from "./assets/tech_logo/angular.png";
// import reduxLogo from "./assets/tech_logo/redux.png";
import nextjsLogo from "./assets/tech_logo/nextjs.png";
import tailwindcssLogo from "./assets/tech_logo/tailwindcss.png";
import gsapLogo from "./assets/tech_logo/gsap.png";
import materialuiLogo from "./assets/tech_logo/materialui.png";
import bootstrapLogo from "./assets/tech_logo/bootstrap.png";
// import springbootLogo from "./assets/tech_logo/springboot.png";
import nodejsLogo from "./assets/tech_logo/nodejs.png";
import cLogo from "./assets/tech_logo/c.png";
// import csharpLogo from "./assets/tech_logo/csharp.png";
import gitLogo from "./assets/tech_logo/git.png";
import githubLogo from "./assets/tech_logo/github.png";
import expressjsLogo from "./assets/tech_logo/express.png";
import mysqlLogo from "./assets/tech_logo/mysql.png";
import mongodbLogo from "./assets/tech_logo/mc.png";
import firebaseLogo from "./assets/tech_logo/firebase.png";
import postgresqlLogo from "./assets/tech_logo/postgre.png";
// import javaLogo from "./assets/tech_logo/java.png";
import pythonLogo from "./assets/tech_logo/python.png";
// import typescriptLogo from "./assets/tech_logo/typescript.png";
import vscodeLogo from "./assets/tech_logo/vscode.png";
import postmanLogo from "./assets/tech_logo/postman.png";
import mcLogo from "./assets/tech_logo/mc.png";
import figmaLogo from "./assets/tech_logo/figma.png";
import netlifyLogo from "./assets/tech_logo/netlify.png";
import vercelLogo from "./assets/tech_logo/vercel.png";
import flutterLogo from "./assets/tech_logo/flutter.png"
import cpp from "./assets/tech_logo/cpp.png";
import dart from"./assets/tech_logo/dart.png"

// education logo
import lotusLogo from './assets/education_logo/lotus.png'
import arnikoLogo from './assets/education_logo/arniko.png'
import kuLogo from './assets/education_logo/ku.png'

// project logo
import eStoreLogo from './assets/project/e-store.png'
import sewaMitraLogo from './assets/project/sewamitra.png'
import telemedicalLogo from './assets/project/d1.png'





export const SkillsInfo = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", logo: htmlLogo },
      { name: "CSS", logo: cssLogo },
      // { name: "SASS", logo: sassLogo },
      { name: "JavaScript", logo: javascriptLogo },
      { name: "React JS", logo: reactjsLogo },
      // { name: "Angular", logo: angularLogo },
      // { name: "Redux", logo: reduxLogo },
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
      // { name: "Springboot", logo: springbootLogo },
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
      // { name: "Java", logo: javaLogo },
      { name: "Python", logo: pythonLogo },
      // { name: "C-Sharp", logo: csharpLogo },
      { name: "JavaScript", logo: javascriptLogo },
      // { name: "TypeScript", logo: typescriptLogo },
      { name: "Dart", logo: dart }, 
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", logo: gitLogo },
      { name: "Github", logo: githubLogo },
      { name: "VS Code", logo: vscodeLogo },
      { name: "Postman", logo: postmanLogo },
      // { name: "Compass", logo: mcLogo },
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
      tags: ["Flutter", "API", "Firebase"],
      github: "https://github.com/Suvassingh/SEWAMITRA1.git",
      webapp: "",
      apk: "/public/sewamitra.apk",
    },
    {
      id: 2,
      title: "Telemedical App",
      description:
        "A telemedical app is a digital platform that allows patients to consult doctors and healthcare providers remotely via video, audio, or chat. It enables appointment scheduling, health record management, and real-time medical advice, making healthcare accessible and convenient from anywhere.                                It might not be available on web and mobile because of not deployed yet.And git reposirtory is private.If you want then send me the mail i will provide it to you.",
      image: telemedicalLogo,
      tags: ["Flutter", "Firebase", "WebRtc"],
      github: "https://github.com/Suvassingh/TelemedicalApp.git",
      webapp: "",
    },
    
  ];