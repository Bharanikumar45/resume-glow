export interface PersonalInfo {
  fullName: string;
  phone: string;
  email: string;
  linkedin: string;
  portfolio: string;
  location: string;
  photo: string;
}

export interface Education {
  id: string;
  degree: string;
  college: string;
  year: string;
  cgpa: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  bullets: string;
}

export interface Project {
  id: string;
  title: string;
  stack: string;
  description: string;
  link: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface SimpleItem {
  id: string;
  title: string;
  detail: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  targetPosition: string;
  summary: string;
  education: Education[];
  skills: string[]; // legacy, kept for compatibility (treated as hard skills)
  hardSkills: string[];
  softSkills: string[];
  languages: Language[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  leadership: SimpleItem[];
  extracurricular: SimpleItem[];
  achievements: SimpleItem[];
}

export const emptyResume: ResumeData = {
  personal: {
    fullName: "Alex Morgan",
    phone: "+1 555 123 4567",
    email: "alex.morgan@email.com",
    linkedin: "linkedin.com/in/alexmorgan",
    portfolio: "alexmorgan.dev",
    location: "San Francisco, CA",
    photo: "",
  },
  targetPosition: "Frontend Developer",
  summary:
    "Results-driven Frontend Developer with 5+ years building scalable React applications. Expertise in TypeScript, performance optimization, and design systems. Proven record of shipping products used by millions and mentoring engineering teams.",
  education: [
    {
      id: "e1",
      degree: "B.S. Computer Science",
      college: "Stanford University",
      year: "2018 - 2022",
      cgpa: "3.9",
    },
  ],
  skills: [],
  hardSkills: [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "TailwindCSS",
    "GraphQL",
    "PostgreSQL",
    "AWS",
    "Docker",
    "Jest",
  ],
  softSkills: [
    "Team Leadership",
    "Communication",
    "Problem Solving",
    "Time Management",
    "Adaptability",
    "Mentoring",
  ],
  languages: [
    { id: "l1", name: "English", level: "Native" },
    { id: "l2", name: "Spanish", level: "Professional" },
  ],
  experience: [
    {
      id: "x1",
      company: "Acme Corp",
      role: "Senior Frontend Engineer",
      duration: "Jan 2023 - Present",
      bullets:
        "Led migration to React 19 + TypeScript, reducing bundle size by 38%\nMentored 4 junior engineers and ran weekly architecture reviews\nShipped checkout redesign that lifted conversion 18%\nBuilt internal design system adopted across 6 product teams",
    },
  ],
  projects: [
    {
      id: "p1",
      title: "DevFlow",
      stack: "Next.js, tRPC, Postgres",
      description:
        "Open-source workflow automation tool with 2k+ GitHub stars and 500+ weekly active users.",
      link: "github.com/alex/devflow",
    },
  ],
  certifications: [
    { id: "c1", name: "AWS Solutions Architect", issuer: "Amazon", year: "2024" },
    { id: "c2", name: "Meta Frontend Developer", issuer: "Coursera", year: "2023" },
  ],
  leadership: [
    {
      id: "ld1",
      title: "Tech Lead — Frontend Guild",
      detail:
        "Led 12-person guild defining frontend standards, code review practices, and onboarding curriculum.",
    },
    {
      id: "ld2",
      title: "President — University CS Club",
      detail: "Grew membership from 40 to 200+ and organized 3 annual hackathons.",
    },
  ],
  extracurricular: [
    {
      id: "ec1",
      title: "Open Source Contributor",
      detail: "Active contributor to React, Vite, and TanStack Router. 50+ merged PRs.",
    },
    {
      id: "ec2",
      title: "Tech Speaker",
      detail: "Spoke at ReactConf 2024 and 5 local meetups on frontend performance.",
    },
  ],
  achievements: [
    {
      id: "a1",
      title: "Hackathon Winner — TechCrunch Disrupt 2023",
      detail: "1st place out of 200+ teams for AI-powered accessibility tool.",
    },
    {
      id: "a2",
      title: "Dean's List — All Semesters",
      detail: "Top 5% of graduating class at Stanford CS.",
    },
  ],
};
