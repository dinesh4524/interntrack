/* InternTrack Seed Data & Mock Database */

export const studentProfile = {
  id: "std_dinesh_2028",
  name: "Dinesh Kumar",
  title: "Undergraduate Security Researcher & Software Engineer",
  degree: "B.E. Computer Science & Engineering",
  specialization: "Cyber Security",
  institution: "College of Engineering",
  cgpa: 8.48,
  graduationYear: 2028,
  profileCompletion: 85,
  avatarText: "DK",
  email: "dinesh.kumar@campus.edu",
  location: "Bangalore, India",
  skills: [
    "Python",
    "Java",
    "Cybersecurity",
    "Web Development",
    "SQL",
    "Machine Learning",
    "Linux",
    "Networking",
    "Git"
  ],
  certifications: [
    {
      id: "cert_1",
      name: "NPTEL Java Programming",
      issuer: "IIT Kharagpur / NPTEL",
      grade: "Elite + Gold (92%)",
      date: "Aug 2025",
      verified: true
    },
    {
      id: "cert_2",
      name: "NPTEL Cybersecurity & Privacy",
      issuer: "IIT Madras / NPTEL",
      grade: "Elite + Silver (88%)",
      date: "Nov 2025",
      verified: true
    },
    {
      id: "cert_3",
      name: "NPTEL Data Science for Engineers",
      issuer: "IIT Madras / NPTEL",
      grade: "Elite (81%)",
      date: "Apr 2026",
      verified: true
    }
  ],
  projects: [
    {
      id: "proj_1",
      title: "Phishing Email Detector",
      description: "AI-powered heuristic & NLP pipeline detecting sophisticated zero-day phishing attempts with 97.4% precision.",
      techStack: ["Python", "Scikit-Learn", "FastAPI", "NLP"],
      impact: "Analyzed 10,000+ test samples"
    },
    {
      id: "proj_2",
      title: "VigilStride - Threat Sentinel",
      description: "Automated network intrusion telemetry monitor parsing anomalous packet flows across distributed subnets.",
      techStack: ["Cybersecurity", "Linux", "Networking", "Python"],
      impact: "Real-time packet anomaly detection"
    },
    {
      id: "proj_3",
      title: "Smart Attendance System",
      description: "Biometric and contactless attendance management portal with anti-spoofing face embeddings.",
      techStack: ["Web Development", "SQL", "OpenCV", "JavaScript"],
      impact: "Adopted by student laboratory"
    }
  ]
};

export const initialOpportunities = [
  {
    id: "opp_1",
    featured: true,
    company: "SecureNet Labs",
    role: "Cybersecurity Intern",
    category: "Cybersecurity",
    logoText: "SN",
    logoColor: "#00f2fe",
    location: "Bangalore, India",
    workMode: "Hybrid",
    stipend: "₹15,000",
    stipendNumeric: 15000,
    duration: "6 Months",
    deadline: "2026-09-30T23:59:59",
    deadlineFormatted: "30 SEP 2026",
    requiredSkills: ["Python", "Linux", "Networking", "Cybersecurity"],
    minCgpa: 7.5,
    allowedBranches: ["Computer Science & Engineering", "Information Technology", "Cyber Security", "Electronics"],
    gradYears: [2027, 2028],
    description: "Join our Red & Blue team operations to analyze zero-day vulnerabilities, audit perimeter networks, and build automated penetration testing scripts.",
    responsibilities: [
      "Conduct dynamic vulnerability scanning and penetration test drills on internal testbeds.",
      "Analyze Linux kernel audit logs and packet captures for suspicious telemetry.",
      "Develop custom Python automation tools for threat intelligence aggregation."
    ],
    eligibility: "B.E./B.Tech pre-final / final year students with solid foundational knowledge in TCP/IP, Linux system administration, and basic Python scripting.",
    benefits: [
      "Mentorship from certified OSCP/CISSP security leads.",
      "Full-time PPO opportunity based on performance.",
      "Access to enterprise threat simulation labs."
    ],
    applicationCount: 42,
    matchScore: 94
  },
  {
    id: "opp_2",
    featured: false,
    company: "CloudScale AI",
    role: "Cloud DevOps & Platform Engineer Intern",
    category: "Cloud",
    logoText: "CS",
    logoColor: "#8b5cf6",
    location: "Hyderabad, India",
    workMode: "Remote",
    stipend: "₹25,000",
    stipendNumeric: 25000,
    duration: "3 Months",
    deadline: "2026-09-26T23:59:59",
    deadlineFormatted: "26 SEP 2026",
    requiredSkills: ["Cloud", "Linux", "Python", "Git"],
    minCgpa: 8.0,
    allowedBranches: ["Computer Science & Engineering", "Information Technology", "Cyber Security"],
    gradYears: [2027, 2028],
    description: "Architect high-throughput Kubernetes deployments and build automated CI/CD pipelines supporting distributed microservices.",
    responsibilities: [
      "Optimize container build times and manage Terraform state files.",
      "Deploy observability tooling using Prometheus and Grafana dashboards.",
      "Script cloud backup automations with Python and AWS SDK."
    ],
    eligibility: "Passionate engineer with hands-on command over Linux CLI, basic AWS/GCP concepts, and Git workflow.",
    benefits: [
      "₹25,000 monthly stipend + remote workspace allowance.",
      "Direct work on live multi-region infrastructure."
    ],
    applicationCount: 88,
    matchScore: 88
  },
  {
    id: "opp_3",
    featured: false,
    company: "Apex FinTech",
    role: "Full Stack Web Developer Intern",
    category: "Web Development",
    logoText: "AF",
    logoColor: "#10b981",
    location: "Mumbai, India",
    workMode: "Hybrid",
    stipend: "₹20,000",
    stipendNumeric: 20000,
    duration: "6 Months",
    deadline: "2026-10-05T23:59:59",
    deadlineFormatted: "05 OCT 2026",
    requiredSkills: ["Web Development", "SQL", "Git", "Python"],
    minCgpa: 7.0,
    allowedBranches: ["Computer Science & Engineering", "Information Technology", "Cyber Security", "Data Science"],
    gradYears: [2026, 2027, 2028],
    description: "Design reactive customer-facing investment dashboards with sub-second latency and resilient SQL transaction safety.",
    responsibilities: [
      "Develop responsive UI modules with modern web component frameworks.",
      "Optimize complex relational SQL queries for high-volume ledger audits.",
      "Implement secure OAuth2 / JWT authentication layers."
    ],
    eligibility: "Strong command of modern CSS/JS/HTML, relational schemas, and RESTful API design.",
    benefits: [
      "Stipend + performance bonuses.",
      "Opportunity to shape next-gen financial tooling."
    ],
    applicationCount: 110,
    matchScore: 91
  },
  {
    id: "opp_4",
    featured: false,
    isWide: true,
    company: "Quantum Cyber Intelligence",
    role: "AI & Threat Analytics Research Fellow",
    category: "AI / ML",
    logoText: "QC",
    logoColor: "#f43f5e",
    location: "Bangalore, India",
    workMode: "On-site",
    stipend: "₹30,000",
    stipendNumeric: 30000,
    duration: "6 Months",
    deadline: "2026-09-24T23:59:59",
    deadlineFormatted: "24 SEP 2026",
    requiredSkills: ["Machine Learning", "Python", "Cybersecurity", "SQL"],
    minCgpa: 8.2,
    allowedBranches: ["Computer Science & Engineering", "Cyber Security", "Artificial Intelligence"],
    gradYears: [2027, 2028],
    description: "Leverage deep transformer models and graph neural nets to identify stealth cyber threat actors across multi-terabyte log repositories.",
    responsibilities: [
      "Train unsupervised anomaly detection classifiers on firewall event streams.",
      "Build interactive Jupyter benchmarks and data visualization pipelines.",
      "Co-author technical papers on adversarial machine learning defenses."
    ],
    eligibility: "Solid background in Python, Scikit-learn/PyTorch fundamentals, and security heuristics.",
    benefits: [
      "Highest industry stipend (₹30,000/mo).",
      "Direct guidance by research scientists & patent holders."
    ],
    applicationCount: 65,
    matchScore: 96
  },
  {
    id: "opp_5",
    featured: false,
    company: "Nova Robotics",
    role: "Embedded Systems & Linux Kernel Intern",
    category: "Linux & Core",
    logoText: "NR",
    logoColor: "#f59e0b",
    location: "Pune, India",
    workMode: "On-site",
    stipend: "₹18,000",
    stipendNumeric: 18000,
    duration: "4 Months",
    deadline: "2026-10-12T23:59:59",
    deadlineFormatted: "12 OCT 2026",
    requiredSkills: ["Linux", "Networking", "Git"],
    minCgpa: 7.2,
    allowedBranches: ["Computer Science & Engineering", "Electronics", "Cyber Security"],
    gradYears: [2027, 2028],
    description: "Write lightweight device driver routines and configure real-time Linux kernels for autonomous warehouse robots.",
    responsibilities: [
      "Debug UART, I2C and CAN bus telemetry logs.",
      "Optimize low-latency kernel interrupts."
    ],
    eligibility: "Good understanding of C/C++ or Python, Linux device tree, and hardware interfacing.",
    benefits: ["Hardware prototyping equipment provided.", "Flexible working hours."],
    applicationCount: 34,
    matchScore: 82
  },
  {
    id: "opp_6",
    featured: false,
    company: "DeepMatrix Systems",
    role: "Backend & Data Pipeline Engineer Intern",
    category: "Web Development",
    logoText: "DM",
    logoColor: "#00f2fe",
    location: "Chennai, India",
    workMode: "Hybrid",
    stipend: "₹22,000",
    stipendNumeric: 22000,
    duration: "6 Months",
    deadline: "2026-10-18T23:59:59",
    deadlineFormatted: "18 OCT 2026",
    requiredSkills: ["Java", "SQL", "Git", "Networking"],
    minCgpa: 7.8,
    allowedBranches: ["Computer Science & Engineering", "Information Technology"],
    gradYears: [2027, 2028],
    description: "Build asynchronous event streaming backends in Java and optimize distributed databases for real-time order processing.",
    responsibilities: [
      "Develop REST APIs and Kafka message consumer services in Java.",
      "Write automated JUnit test suites with >85% code coverage."
    ],
    eligibility: "Strong OOP fundamentals in Java, SQL indexing understanding, and Git proficiency.",
    benefits: ["Hybrid work schedule (2 days office / 3 days remote).", "Pre-placement offer."],
    applicationCount: 52,
    matchScore: 89
  }
];

export const initialApplications = [
  {
    id: "app_1",
    opportunityId: "opp_1",
    company: "SecureNet Labs",
    role: "Cybersecurity Intern",
    appliedDate: "15 Sep 2026",
    status: "Shortlisted",
    statusStage: 2, // 0: Applied, 1: Screening, 2: Shortlisted, 3: Interview, 4: Selected
    stages: ["Applied", "Screening", "Shortlisted", "Interview", "Selected"],
    notes: "Resume shortlisted by lead architect. Technical interview scheduled for 28 Sep."
  },
  {
    id: "app_2",
    opportunityId: "opp_4",
    company: "Quantum Cyber Intelligence",
    role: "AI & Threat Analytics Research Fellow",
    appliedDate: "18 Sep 2026",
    status: "Interview",
    statusStage: 3,
    stages: ["Applied", "Screening", "Shortlisted", "Interview", "Selected"],
    notes: "Round 1 technical clearing completed. Final research discussion pending."
  },
  {
    id: "app_3",
    opportunityId: "opp_2",
    company: "CloudScale AI",
    role: "Cloud DevOps & Platform Engineer Intern",
    appliedDate: "19 Sep 2026",
    status: "Screening",
    statusStage: 1,
    stages: ["Applied", "Screening", "Shortlisted", "Interview", "Selected"],
    notes: "Application under assessment by engineering recruiting team."
  }
];

export const skillUniverseNodes = [
  {
    id: "skill_cyber",
    name: "Cybersecurity",
    category: "Security",
    level: "Advanced (88%)",
    icon: "shield",
    relatedOppIds: ["opp_1", "opp_4"],
    roadmap: [
      "TCP/IP & OSI Packet Analysis (Wireshark / tcpdump)",
      "Linux System Hardening & Log Forensic Parsing",
      "Vulnerability Assessment & OWASP Top 10 Exploitation",
      "Network Penetration Testing & Automated Scripting"
    ],
    desc: "Core discipline for guarding digital networks, identity infrastructure, and mitigating zero-day exploits."
  },
  {
    id: "skill_python",
    name: "Python",
    category: "Programming",
    level: "Mastery (94%)",
    icon: "code",
    relatedOppIds: ["opp_1", "opp_2", "opp_3", "opp_4"],
    roadmap: [
      "Object-Oriented Programming & Data Structures",
      "Automated Scripting & Socket Programming",
      "Data Manipulation with NumPy / Pandas",
      "Asynchronous I/O & FastAPI Microservices"
    ],
    desc: "Versatile language powering security scripting, automation, backend APIs, and ML models."
  },
  {
    id: "skill_linux",
    name: "Linux",
    category: "Systems",
    level: "Proficient (82%)",
    icon: "terminal",
    relatedOppIds: ["opp_1", "opp_2", "opp_5"],
    roadmap: [
      "Bash Shell Scripting & CLI Fluency",
      "User Permissions & PAM Security Architecture",
      "Systemd Service Automation & Cron Configuration",
      "Kernel Telemetry & eBPF Tracing"
    ],
    desc: "The operating backbone for servers, cloud containers, and enterprise security platforms."
  },
  {
    id: "skill_networking",
    name: "Networking",
    category: "Infrastructure",
    level: "Proficient (85%)",
    icon: "globe",
    relatedOppIds: ["opp_1", "opp_5", "opp_6"],
    roadmap: [
      "Subnetting, VLANs, and Routing Protocols (BGP / OSPF)",
      "DNS, HTTPS, TLS Handshake & Certificate Authorities",
      "Firewalls, NAT, and VPN Tunnel Implementations",
      "Software Defined Networking (SDN) Fundamentals"
    ],
    desc: "Foundational protocols and topology ensuring reliable and shielded data communication."
  },
  {
    id: "skill_aiml",
    name: "Machine Learning",
    category: "AI",
    level: "Intermediate (76%)",
    icon: "cpu",
    relatedOppIds: ["opp_4"],
    roadmap: [
      "Supervised & Unsupervised Learning Mathematics",
      "Feature Engineering & NLP Vectorization",
      "Neural Networks with PyTorch / TensorFlow",
      "Model Evaluation, Bias Auditing & Deployment"
    ],
    desc: "Algorithmic intelligence recognizing anomalies, NLP classification, and predictive heuristics."
  },
  {
    id: "skill_web",
    name: "Web Development",
    category: "Frontend/Backend",
    level: "Proficient (86%)",
    icon: "layout",
    relatedOppIds: ["opp_3"],
    roadmap: [
      "Semantic HTML5, CSS3 Grid/Flexbox, & Web Standards",
      "Modern JavaScript ESNext & Reactive Component Architecture",
      "RESTful API Integration & Client-Side Caching",
      "Web Security (XSS, CSRF, CORS & Content Security Policies)"
    ],
    desc: "Interactive user interfaces and high-performance digital portals for modern web applications."
  },
  {
    id: "skill_sql",
    name: "SQL",
    category: "Data",
    level: "Proficient (84%)",
    icon: "database",
    relatedOppIds: ["opp_3", "opp_4", "opp_6"],
    roadmap: [
      "Relational Schema Design & Normalization",
      "Complex Joins, Aggregations & Subqueries",
      "Indexing Strategies & Query Execution Plan Optimization",
      "ACID Transactions & Row-Level Locking"
    ],
    desc: "The structured language for transactional consistency and lightning-fast data querying."
  },
  {
    id: "skill_cloud",
    name: "Cloud",
    category: "DevOps",
    level: "Intermediate (72%)",
    icon: "cloud",
    relatedOppIds: ["opp_2"],
    roadmap: [
      "Core Cloud Computing Principles (IaaS vs PaaS vs FaaS)",
      "Docker Containerization & Multi-Stage Builds",
      "Kubernetes Pod Orchestration & Ingress Controllers",
      "Infrastructure as Code (Terraform) & Cloud Security"
    ],
    desc: "Elastic, scalable infrastructure powering global web scale applications."
  },
  {
    id: "skill_java",
    name: "Java",
    category: "Programming",
    level: "Proficient (85%)",
    icon: "coffee",
    relatedOppIds: ["opp_6"],
    roadmap: [
      "Core Java & Memory Model (Garbage Collection)",
      "Java Collections Framework & Concurrency",
      "Spring Boot Microservices & JPA / Hibernate",
      "Unit Testing & Microservices Resilience"
    ],
    desc: "Enterprise-grade OOP language for rock-solid banking backends and distributed architectures."
  },
  {
    id: "skill_git",
    name: "Git",
    category: "Tools",
    level: "Advanced (90%)",
    icon: "git-branch",
    relatedOppIds: ["opp_2", "opp_3", "opp_5", "opp_6"],
    roadmap: [
      "Branching Strategies (GitFlow, Trunk-based)",
      "Interactive Rebasing, Cherry-Picking & Conflict Resolution",
      "Automated GitHub Actions CI/CD Workflows",
      "GPG Commit Signing & Repository Security"
    ],
    desc: "Standard distributed version control empowering collaborative software engineering."
  }
];
