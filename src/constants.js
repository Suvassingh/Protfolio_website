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