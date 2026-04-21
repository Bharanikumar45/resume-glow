export interface CourseRec {
  skill: string;
  title: string;
  url: string;
  provider: string;
}

// Role -> required skills (lowercased for matching)
const ROLE_SKILLS: Record<string, string[]> = {
  "frontend developer": ["react", "typescript", "javascript", "html", "css", "tailwind", "next.js", "redux"],
  "backend developer": ["node.js", "python", "sql", "postgresql", "rest api", "docker", "redis", "mongodb"],
  "full stack developer": ["react", "node.js", "typescript", "sql", "docker", "rest api", "next.js", "aws"],
  "data scientist": ["python", "pandas", "numpy", "scikit-learn", "sql", "tensorflow", "statistics", "machine learning"],
  "data analyst": ["sql", "excel", "python", "tableau", "power bi", "pandas", "statistics"],
  "devops engineer": ["docker", "kubernetes", "aws", "terraform", "ci/cd", "linux", "python", "jenkins"],
  "machine learning engineer": ["python", "tensorflow", "pytorch", "scikit-learn", "mlops", "docker", "sql", "aws"],
  "mobile developer": ["react native", "swift", "kotlin", "flutter", "dart", "firebase"],
  "ui/ux designer": ["figma", "adobe xd", "prototyping", "user research", "wireframing", "design systems"],
  "product manager": ["jira", "agile", "scrum", "roadmapping", "analytics", "user research", "sql"],
  "cloud engineer": ["aws", "azure", "gcp", "terraform", "kubernetes", "docker", "linux"],
  "cybersecurity analyst": ["network security", "siem", "linux", "python", "owasp", "penetration testing"],
};

// Curated direct course links per skill
const COURSES: Record<string, { title: string; url: string; provider: string }> = {
  react: { title: "React – The Complete Guide", url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/", provider: "Udemy" },
  typescript: { title: "Understanding TypeScript", url: "https://www.udemy.com/course/understanding-typescript/", provider: "Udemy" },
  javascript: { title: "JavaScript – freeCodeCamp", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", provider: "freeCodeCamp" },
  html: { title: "HTML & CSS – freeCodeCamp", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", provider: "freeCodeCamp" },
  css: { title: "Modern CSS – Kevin Powell", url: "https://www.kevinpowell.co/courses/", provider: "Kevin Powell" },
  tailwind: { title: "Tailwind CSS From Scratch", url: "https://tailwindcss.com/docs/installation", provider: "Tailwind Docs" },
  "next.js": { title: "Next.js Learn", url: "https://nextjs.org/learn", provider: "Vercel" },
  redux: { title: "Redux Essentials", url: "https://redux.js.org/tutorials/essentials/part-1-overview-concepts", provider: "Redux Docs" },
  "node.js": { title: "Node.js – The Complete Guide", url: "https://www.udemy.com/course/nodejs-the-complete-guide/", provider: "Udemy" },
  python: { title: "Python for Everybody", url: "https://www.coursera.org/specializations/python", provider: "Coursera" },
  sql: { title: "SQL for Data Science", url: "https://www.coursera.org/learn/sql-for-data-science", provider: "Coursera" },
  postgresql: { title: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com/", provider: "PG Tutorial" },
  "rest api": { title: "REST API Design", url: "https://www.coursera.org/learn/api-design-apigee-gcp", provider: "Coursera" },
  docker: { title: "Docker Mastery", url: "https://www.udemy.com/course/docker-mastery/", provider: "Udemy" },
  redis: { title: "Redis University", url: "https://university.redis.com/", provider: "Redis" },
  mongodb: { title: "MongoDB University", url: "https://learn.mongodb.com/", provider: "MongoDB" },
  aws: { title: "AWS Cloud Practitioner", url: "https://www.coursera.org/learn/aws-cloud-practitioner-essentials", provider: "Coursera" },
  azure: { title: "Microsoft Azure Fundamentals", url: "https://learn.microsoft.com/en-us/training/paths/azure-fundamentals/", provider: "Microsoft Learn" },
  gcp: { title: "Google Cloud Fundamentals", url: "https://www.coursera.org/learn/gcp-fundamentals", provider: "Coursera" },
  kubernetes: { title: "Kubernetes for Beginners", url: "https://kubernetes.io/training/", provider: "Kubernetes" },
  terraform: { title: "HashiCorp Terraform", url: "https://developer.hashicorp.com/terraform/tutorials", provider: "HashiCorp" },
  "ci/cd": { title: "CI/CD with GitHub Actions", url: "https://docs.github.com/en/actions/learn-github-actions", provider: "GitHub" },
  linux: { title: "Linux Foundation Intro", url: "https://www.edx.org/course/introduction-to-linux", provider: "edX" },
  jenkins: { title: "Jenkins, From Zero To Hero", url: "https://www.udemy.com/course/jenkins-from-zero-to-hero/", provider: "Udemy" },
  pandas: { title: "Pandas Tutorial", url: "https://www.kaggle.com/learn/pandas", provider: "Kaggle" },
  numpy: { title: "NumPy Tutorial", url: "https://numpy.org/learn/", provider: "NumPy" },
  "scikit-learn": { title: "Intro to Machine Learning", url: "https://www.kaggle.com/learn/intro-to-machine-learning", provider: "Kaggle" },
  tensorflow: { title: "TensorFlow Developer", url: "https://www.coursera.org/professional-certificates/tensorflow-in-practice", provider: "Coursera" },
  pytorch: { title: "Deep Learning with PyTorch", url: "https://pytorch.org/tutorials/", provider: "PyTorch" },
  "machine learning": { title: "Machine Learning – Andrew Ng", url: "https://www.coursera.org/specializations/machine-learning-introduction", provider: "Coursera" },
  statistics: { title: "Statistics with Python", url: "https://www.coursera.org/specializations/statistics-with-python", provider: "Coursera" },
  mlops: { title: "MLOps Specialization", url: "https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops", provider: "Coursera" },
  excel: { title: "Excel Skills for Business", url: "https://www.coursera.org/specializations/excel", provider: "Coursera" },
  tableau: { title: "Tableau Training", url: "https://www.tableau.com/learn/training", provider: "Tableau" },
  "power bi": { title: "Power BI Learning", url: "https://learn.microsoft.com/en-us/power-bi/", provider: "Microsoft Learn" },
  "react native": { title: "React Native – The Practical Guide", url: "https://www.udemy.com/course/react-native-the-practical-guide/", provider: "Udemy" },
  swift: { title: "Swift – Hacking with Swift", url: "https://www.hackingwithswift.com/100", provider: "Hacking with Swift" },
  kotlin: { title: "Kotlin for Android", url: "https://developer.android.com/courses/android-basics-kotlin/course", provider: "Google" },
  flutter: { title: "Flutter & Dart – Complete Guide", url: "https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/", provider: "Udemy" },
  dart: { title: "Dart Language Tour", url: "https://dart.dev/guides", provider: "Dart" },
  firebase: { title: "Firebase Fundamentals", url: "https://firebase.google.com/docs", provider: "Google" },
  figma: { title: "Figma for Beginners", url: "https://www.figma.com/resources/learn-design/", provider: "Figma" },
  "adobe xd": { title: "Adobe XD Tutorials", url: "https://helpx.adobe.com/xd/tutorials.html", provider: "Adobe" },
  prototyping: { title: "Prototyping with Figma", url: "https://www.coursera.org/learn/prototyping-design", provider: "Coursera" },
  "user research": { title: "Intro to User Research", url: "https://www.coursera.org/learn/user-research", provider: "Coursera" },
  wireframing: { title: "Wireframing Course", url: "https://www.coursera.org/projects/wireframes", provider: "Coursera" },
  "design systems": { title: "Design Systems – Figma", url: "https://www.designsystems.com/", provider: "Design Systems" },
  jira: { title: "Jira Fundamentals", url: "https://university.atlassian.com/student/page/1191734-free-courses", provider: "Atlassian" },
  agile: { title: "Agile with Atlassian Jira", url: "https://www.coursera.org/learn/agile-atlassian-jira", provider: "Coursera" },
  scrum: { title: "Scrum Fundamentals", url: "https://www.scrum.org/professional-scrum-certifications", provider: "Scrum.org" },
  roadmapping: { title: "Product Roadmapping", url: "https://www.productschool.com/free-courses", provider: "Product School" },
  analytics: { title: "Google Analytics Academy", url: "https://analytics.google.com/analytics/academy/", provider: "Google" },
  "network security": { title: "Network Security", url: "https://www.coursera.org/learn/network-security", provider: "Coursera" },
  siem: { title: "SIEM Fundamentals", url: "https://www.splunk.com/en_us/training.html", provider: "Splunk" },
  owasp: { title: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/", provider: "OWASP" },
  "penetration testing": { title: "Penetration Testing", url: "https://www.offsec.com/courses/pen-200/", provider: "OffSec" },
};

export interface AdvisorResult {
  matched: string[];
  missing: CourseRec[];
  matchedRole: string | null;
  totalRequired: number;
}

export function analyzeSkills(targetPosition: string, userSkills: string[]): AdvisorResult {
  const role = targetPosition.trim().toLowerCase();
  if (!role) return { matched: [], missing: [], matchedRole: null, totalRequired: 0 };

  // Find best-matching role
  let bestKey: string | null = null;
  let bestScore = 0;
  for (const key of Object.keys(ROLE_SKILLS)) {
    const score = key === role ? 100 : role.includes(key) || key.includes(role) ? 50 : 0;
    if (score > bestScore) {
      bestScore = score;
      bestKey = key;
    }
  }
  if (!bestKey) return { matched: [], missing: [], matchedRole: null, totalRequired: 0 };

  const required = ROLE_SKILLS[bestKey];
  const userLower = userSkills.map((s) => s.toLowerCase().trim());

  const matched: string[] = [];
  const missing: CourseRec[] = [];
  for (const skill of required) {
    const has = userLower.some((u) => u === skill || u.includes(skill) || skill.includes(u));
    if (has) {
      matched.push(skill);
    } else {
      const c = COURSES[skill];
      if (c) missing.push({ skill, ...c });
      else missing.push({ skill, title: `Learn ${skill}`, url: `https://www.google.com/search?q=${encodeURIComponent("best course for " + skill)}`, provider: "Search" });
    }
  }

  return { matched, missing, matchedRole: bestKey, totalRequired: required.length };
}

export const SUGGESTED_ROLES = Object.keys(ROLE_SKILLS);