export interface PersonalInfo {
  fullName: string;
  phone: string;
  email: string;
  linkedin: string;
  portfolio: string;
  location: string;
  photo: string; // dataURL
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
  bullets: string; // newline separated
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

export interface ResumeData {
  personal: PersonalInfo;
  targetPosition: string;
  summary: string;
  education: Education[];
  skills: string[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
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
    "Results-driven Software Engineer with 5+ years building scalable web applications. Expertise in React, Node.js, and cloud architecture. Proven track record of shipping products used by millions.",
  education: [
    {
      id: "e1",
      degree: "B.S. Computer Science",
      college: "Stanford University",
      year: "2018 - 2022",
      cgpa: "3.9",
    },
  ],
  skills: ["React", "TypeScript", "Node.js", "AWS", "PostgreSQL", "Docker", "GraphQL", "Python"],
  experience: [
    {
      id: "x1",
      company: "Acme Corp",
      role: "Senior Software Engineer",
      duration: "Jan 2023 - Present",
      bullets:
        "Led migration to microservices, reducing latency by 45%\nMentored 4 junior engineers and ran weekly architecture reviews\nShipped checkout redesign that lifted conversion 18%",
    },
  ],
  projects: [
    {
      id: "p1",
      title: "DevFlow",
      stack: "Next.js, tRPC, Postgres",
      description: "Open-source workflow automation tool with 2k+ GitHub stars.",
      link: "github.com/alex/devflow",
    },
  ],
  certifications: [
    { id: "c1", name: "AWS Solutions Architect", issuer: "Amazon", year: "2024" },
  ],
};