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
import figmaLogo from "./assets/tech_logo/figma.png";
import netlifyLogo from "./assets/tech_logo/netlify.png";
import vercelLogo from "./assets/tech_logo/vercel.png";
import flutterLogo from "./assets/tech_logo/flutter.png";
import cpp from "./assets/tech_logo/cpp.png";
import dart from "./assets/tech_logo/dart.png";

// education logo
import lotusLogo from "./assets/education_logo/lotus.png";
import arnikoLogo from "./assets/education_logo/arniko.png";
import kuLogo from "./assets/education_logo/ku.png";

// project logo
import eStoreLogo from "./assets/project/e-store.png";
import sewaMitraLogo from "./assets/project/sewamitra.png";
import telemedicalLogo from "./assets/project/d1.png";
import shopifyLogo from "./assets/project/shopify.png";
import group from "./assets/project/group.jpg";
import certi from "./assets/project/certi.jpg";
import finderLogo from "./assets/project/finder.png";
import quickBiteLogo from "./assets/project/quickbite.png";
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
      { name: "C++", logo: cpp },
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

export const experience = [
  {
    id: 1,
    company: "Tech Solutions Inc.",
    role: "Fullstack Developer Intern",
    date: "June 2024 – Present",
    img: eStoreLogo, // or use a logo
    desc: "Built RESTful APIs with Node/Express and integrated with React frontend. Optimized database queries and reduced load time by 30%.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    id: 2,
    company: "Freelance",
    role: "UI/UX Designer & Developer",
    date: "Jan 2024 – May 2024",
    img: eStoreLogo,
    desc: "Designed and developed responsive websites for small businesses. Implemented modern UI/UX principles and ensured cross‑browser compatibility.",
    tech: ["Figma", "HTML/CSS", "JavaScript", "Tailwind"],
  },
];

export const projects = [
  {
    id: 0,
    title: "E-Store",
    description:
      "E-commerce web platform simplifying online buying and selling of products. Built on the MERN stack with Stripe integration for secure payments, covering product listings, cart, and order tracking.",
    image: eStoreLogo,
    tags: ["HTML", "CSS", "JavaScript", "React JS", "API", "MongoDB", "Stripe"],
    github: "https://github.com/Suvassingh/E-Commerc.git",
    webapp: "https://emptymind.vercel.app/",
  },
  {
    id: 1,
    title: "SewaMitra",
    description:
      "Home services marketplace connecting service providers with users through location-based matching. Built with Flutter, Firebase, and OpenStreetMap (OSM), covering provider discovery, booking, and direct contact.",
    image: sewaMitraLogo,
    tags: ["Flutter", "Firebase", "OpenStreetMap", "API"],
    github: "https://github.com/Suvassingh/SEWAMITRA1.git",
    webapp: "",
    apk: "/public/sewamitra.apk",
  },
  {
    id: 2,
    title: "Telemedical App",
    description:
      "Doctor-patient telehealth app enabling consultations via chat, audio, and video. Implemented real-time communication using Flutter, WebRTC, and LiveKit, with Supabase for backend data and Redis for caching, containerized with Docker for deployment. Not yet deployed to web/mobile — repository is private, email me for access.",
    image: certi,
    images: [certi, telemedicalLogo, group],
    tags: [
      "Flutter",
      "Firebase",
      "WebRTC",
      "LiveKit",
      "Supabase",
      "Redis",
      "Docker",
    ],
    github:
      "https://github.com/Suvassingh/Nexora-health--Next-generation-healthcare-with-a-strong-modern-presence.git",
    webapp: "",
  },
  {
    id: 3,
    title: "QuickBite",
    description:
      "Multi-vendor food delivery platform with dedicated rider and vendor-facing apps, covering live order tracking and the full delivery flow. Built with Flutter and Node.js, handling real-time state across order placement, dispatch, and delivery confirmation.",
    image: quickBiteLogo,
    tags: ["Flutter", "Node.js", "API", "Real-time Tracking"],
    github: "https://github.com/Suvassingh/QuickBite_Rider_App.git",
    webapp: "",
    apk: "",
  },
  {
    id: 4,
    title: "Finder",
    description:
      "Multi-category service finder app for discovering rooms, hotels, buses, salons, and more. Built with Flutter, Django, and MySQL, letting users view service details and contact providers directly by phone.",
    image: finderLogo,
    tags: ["Flutter", "Django", "MySQL", "API"],
    github: "https://github.com/Suvassingh/Services.git",
    webapp: "",
  },
  {
    id: 5,
    title: "Shopi",
    description:
      "E-commerce storefront clone with product listings, cart, secure payments, and customizable themes. Built with Flutter, Firebase, and GetX for state management.",
    image: shopifyLogo,
    tags: ["Flutter", "Firebase", "GetX"],
    github: "https://github.com/Suvassingh/Shopify.git",
    webapp: "",
  },
];