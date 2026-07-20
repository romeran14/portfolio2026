import { z } from "zod";
import { personalSchema, type PersonalInfo } from "@/lib/schemas/personal.schema";
import {
  experienceListSchema,
  type Experience,
} from "@/lib/schemas/experience.schema";
import {
  projectListSchema,
  type Project,
} from "@/lib/schemas/project.schema";

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// ---------------------------------------------------------------------------
// Personal Information
// ---------------------------------------------------------------------------

const personalData = {
  name: "Romeran Rodriguez",
  title: "Senior FullStack Developer",
  bio: "FullStack Developer with 6+ years of experience building scalable web applications. Specialized in React, Next.js, TypeScript, Nest.js, and Laravel. Passionate about clean architecture, performance optimization, and crafting immersive user experiences with advanced animations and motion design.",
  shortBio:
    "Senior FullStack Developer with 6+ years building scalable web apps with React, Next.js, TypeScript, Nest.js & Laravel.",
  location: "Maracaibo, Venezuela",
  phone: "+584126923306",
  socials: {
    github: "https://github.com/romeran14",
    linkedin: "https://linkedin.com/in/romeran-rodriguez",
    email: "romeran14@gmail.com",
  },
} satisfies z.input<typeof personalSchema>;

export const personal: PersonalInfo = personalSchema.parse(personalData);

// ---------------------------------------------------------------------------
// Work Experience
// ---------------------------------------------------------------------------

const experienceData: z.input<typeof experienceListSchema> = [
  {
    company: "Marcelo Design (MDX)",
    role: "Full Stack Developer",
    location: "Caracas, Venezuela",
    period: { start: "2025-08", end: "present" },
    description:
      "Development of immersive and interactive web experiences focusing on high-end UI/UX. Specialized in advanced web animations and scalable backend architectures.",
    highlights: [
      "Specialized in advanced web animations using GSAP, Next.js, React, and Vanilla JS",
      "Architected scalable microservices and APIs with Nest.js and dependency injection",
      "Implemented real-time communication via WebSockets for live UI updates",
      "Developed comprehensive unit and e2e test suites using Jest and Supertest",
      "Built background pipelines and task queues for optimized server response times",
      "Implemented caching strategies and optimized database queries for high performance",
    ],
    technologies: [
      "Next.js",
      "React",
      "GSAP",
      "Nest.js",
      "TypeORM",
      "WebSockets",
      "Jest",
      "JWT",
    ],
  },
  {
    company: "Bitnat Redes y Sistemas",
    role: "Full Stack Developer",
    location: "Maracaibo, Venezuela",
    period: { start: "2023-03", end: "2025-07" },
    description:
      "Web application development with React/TypeScript and Next.js on the frontend, and Laravel with MySQL on the backend. Led migration of legacy PHP systems to Laravel.",
    highlights: [
      "Designed reusable component libraries following SOLID principles",
      "Migrated high-traffic legacy PHP codebases to modern Laravel architecture",
      "Implemented server-side rendering (SSR) and static site generation (SSG) with Next.js",
      "Built real-time features with WebSockets using Pusher.js and Laravel Echo",
      "Developed robust state management patterns with Redux and Context API",
      "Implemented refresh token mechanisms with async-mutex for seamless auth flows",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "Laravel",
      "MySQL",
      "Redux",
      "Pusher.js",
      "Sanctum",
    ],
  },
  {
    company: "Tesla Media Group",
    role: "Frontend Developer",
    location: "Los Angeles, U.S.",
    period: { start: "2020-02", end: "2023-03" },
    description:
      "Content management, SEO optimization, and site development. Specialized in CMS customization, template development, and performance optimization.",
    highlights: [
      "Developed custom WordPress and Joomla templates from scratch with responsive design",
      "Implemented on-page SEO best practices and performed audits with Screaming Frog",
      "Built custom CMS components and modules using PHP for specialized functionalities",
      "Optimized website performance through image optimization, caching, and asset minification",
      "Managed CMS migrations, core updates, and cross-browser compatibility testing",
    ],
    technologies: [
      "WordPress",
      "Joomla",
      "PHP",
      "JavaScript",
      "jQuery",
      "Bootstrap",
      "SCSS",
      "SEO",
    ],
  },
];

export const experience: Experience[] =
  experienceListSchema.parse(experienceData);

// ---------------------------------------------------------------------------
// Projects (Placeholders — replace with real project data)
// ---------------------------------------------------------------------------

const projectsData: z.input<typeof projectListSchema> = [
  {
    slug: "mammo",
    title: "Mammo",
    summary:
      "Sales of digital mammography machines, installation, service, parts supply, and training.",
    description:
      "A commercial website for Mammo featuring equipment sales, installation services, parts supply, maintenance, and training offerings.",
    role: "Frontend Developer",
    challenge:
      "Creating a professional Joomla-based brochure site that clearly explains medical equipment offerings and support services.",
    solution:
      "Built a structured Joomla website with service sections, product details, and easy access to contact information.",
    impact:
      "Improved the client’s online presence and made it easier for buyers to understand available equipment and support services.",
    technologies: ["Joomla", "PHP", "HTML", "CSS", "SEO"],
    links: {
      live: "https://mammo.com/",
    },
    images: {
      thumbnail: "/projects_images/mammo.jpg",
    },
    featured: true,
    order: 0,
  },
  {
    slug: "san-diego-criminal-attorney",
    title: "San Diego Criminal Attorney",
    summary:
      "A law firm website that presents experience, client trust, and criminal defense services.",
    description:
      "A Joomla-based website built for a criminal defense law firm to showcase services, team expertise, and contact options.",
    role: "Frontend Developer",
    challenge:
      "Designing a trustworthy legal website with a strong service-focused structure and easy access to consultation requests.",
    solution:
      "Delivered a Joomla site with clear service pages, attorney information, and strong calls to action that reinforced credibility.",
    impact:
      "Strengthened the client’s online credibility and improved lead generation through a more modern and clear layout.",
    technologies: ["Joomla", "PHP", "HTML", "CSS", "SEO"],
    links: {
      live: "https://www.sandiego-criminalattorney.com/",
    },
    images: {
      thumbnail: "/projects_images/san_diego.PNG",
    },
    featured: true,
    order: 1,
  },
  {
    slug: "suarez-physical-therapy",
    title: "Suarez Physical Therapy",
    summary:
      "A Las Vegas physical therapy clinic website offering rehabilitation services and patient support.",
    description:
      "A Joomla-based website for a therapy center, highlighting treatments, patient care, and appointment information.",
    role: "Frontend Developer",
    challenge:
      "Conveying trust and approachable care while presenting therapy services clearly to prospective patients.",
    solution:
      "Built a patient-friendly Joomla site with service pages, location details, and easy contact pathways.",
    impact:
      "Improved the clinic’s online visibility and made it simpler for patients to learn about services and reach out.",
    technologies: ["Joomla", "PHP", "HTML", "CSS", "SEO"],
    links: {
      live: "https://www.suarezpt.com/",
    },
    images: {
      thumbnail: "/projects_images/suarez.jpg",
    },
    featured: true,
    order: 2,
  },
  {
    slug: "fake-twitter",
    title: "Fake Twitter",
    summary:
      "A React social network clone with animated UI, cloud media support, and routing.",
    description:
      "A social media imitation built with React, using SASS, Chakra UI, Framer Motion, react-router, Axios, Lodash, and Cloudinary.",
    role: "Full Stack Developer",
    challenge:
      "Creating a polished social feed experience with animations, media uploads, and responsive navigation.",
    solution:
      "Implemented a modern React UI with motion effects, cloud media integration, and client-side routing.",
    impact:
      "Delivered a compelling demo that showcases interaction design and modern frontend tooling.",
    technologies: [
      "React",
      "SASS",
      "Chakra UI",
      "Framer Motion",
      "React Router",
      "Axios",
      "Cloudinary",
    ],
    links: {
      live: "https://faketwitter-front.vercel.app/",
    },
    images: {
      thumbnail: "/projects_images/twitter.jpg",
    },
    featured: true,
    order: 3,
  },
  {
    slug: "criptotapp",
    title: "CriptotApp",
    summary:
      "A live crypto tracker with market charts and RapidAPI data integration.",
    description:
      "A React application that shows live cryptocurrency prices, charts, and historical data using Redux-Query and RapidAPI.",
    role: "Frontend Developer",
    challenge:
      "Displaying real-time crypto prices and history data in a performant, easy-to-read dashboard.",
    solution:
      "Connected to RapidAPI feeds, used Redux-Query for state management, and built responsive charts for market tracking.",
    impact:
      "Created a modern crypto dashboard that helps users monitor currency performance in real time.",
    technologies: ["React", "Redux-Query", "RapidAPI", "JavaScript", "CSS"],
    links: {
      live: "https://cripto-steel.vercel.app/#/",
    },
    images: {
      thumbnail: "/projects_images/cripto.jpg",
    },
    featured: false,
    order: 4,
  },
  {
    slug: "mdx-technical-test",
    title: "MDX Technical Test",
    summary:
      "A technical exercise showcasing immersive GSAP and Three.js page interactions.",
    description:
      "A portfolio technical test built to demonstrate advanced animations and immersive experiences with GSAP and Three.js.",
    role: "Frontend Developer",
    challenge:
      "Building a visually engaging experience that remains performant and accessible.",
    solution:
      "Used GSAP and Three.js to create motion-driven scenes, scroll-triggered transitions, and interactive effects.",
    impact:
      "Delivered an impressive technical demo that highlights animation skills and modern frontend techniques.",
    technologies: ["GSAP", "Three.js", "React", "JavaScript", "WebGL"],
    links: {
      live: "https://mdx-prueba-tecnica.vercel.app/",
    },
    images: {
      thumbnail: "/projects_images/mdx.jpg",
    },
    featured: false,
    order: 5,
  },
  {
    slug: "teslo-shop",
    title: "Teslo Shop",
    summary:
      "An online clothing store built with Next.js, MongoDB, and PayPal checkout.",
    description:
      "An e-commerce application featuring clothing products, cart management, JWT auth, and PayPal payment flow.",
    role: "Full Stack Developer",
    challenge:
      "Building a seamless shopping experience with secure checkout and product management.",
    solution:
      "Implemented Next.js storefront pages, MongoDB persistence, SWR data fetching, and PayPal payment integration.",
    impact:
      "Delivered a production-ready store demo with fast browsing and a polished checkout experience.",
    technologies: [
      "Next.js",
      "MongoDB",
      "Axios",
      "Material UI",
      "JWT",
      "PayPal",
      "SWR",
    ],
    links: {
      live: "https://teslo-shop-roan.vercel.app/",
    },
    images: {
      thumbnail: "/projects_images/teslo_shop.PNG",
    },
    featured: false,
    order: 6,
  },
  {
    slug: "pluspalm",
    title: "Pluspalm",
    summary:
      "A legal fork of the original roofing site, presenting eco-responsible product messaging.",
    description:
      "A legally compliant fork of the Pluspalm website that showcases roofing products and sustainability values.",
    role: "Frontend Developer",
    challenge:
      "Recreating the original product presentation while respecting legal restrictions on the source site.",
    solution:
      "Built a clean product showcase with eco-friendly messaging and an accessible content structure.",
    impact:
      "Delivered a compliant version of the site that preserves product positioning and brand clarity.",
    technologies: ["React", "Next.js", "CSS", "HTML", "SEO"],
    links: {
      live: "https://pluspalm.vercel.app/",
    },
    images: {
      thumbnail: "/projects_images/exopalm.png",
    },
    featured: false,
    order: 7,
  },
  {
    slug: "old-portfolio",
    title: "Old Portfolio",
    summary:
      "A previous portfolio from 2022 showcasing early projects and developer growth.",
    description:
      "An older personal portfolio that highlights early work, design evolution, and project experience.",
    role: "Frontend Developer",
    challenge:
      "Showcasing early portfolio work in a way that still reflects growth and technical capability.",
    solution:
      "Built a compact portfolio site with project summaries, visuals, and contact information.",
    impact:
      "Served as an early portfolio that helped secure new freelance and full-time opportunities.",
    technologies: ["React", "JavaScript", "CSS", "HTML"],
    links: {
      live: "https://portfolio-romeran-14.vercel.app/",
    },
    images: {
      thumbnail: "/projects_images/porfolio.PNG",
    },
    featured: false,
    order: 8,
  },
];

export const projects: Project[] = projectListSchema.parse(projectsData);

// ---------------------------------------------------------------------------
// Composite Config (single import for convenience)
// ---------------------------------------------------------------------------

export interface PortfolioConfig {
  personal: PersonalInfo;
  experience: Experience[];
  projects: Project[];
  navigation: NavItem[];
}

export const portfolioConfig: PortfolioConfig = {
  personal,
  experience,
  projects,
  navigation,
};
