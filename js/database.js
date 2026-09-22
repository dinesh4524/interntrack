/* SQLite Relational Database Engine for InternTrack (In-Memory & LocalStorage Persisted) */

export class InternTrackDatabase {
  constructor() {
    this.tables = {
      student_profile: [],
      opportunities: [],
      applications: [],
      skills: [],
      certifications: [],
      projects: []
    };
    this.init();
  }

  init() {
    const savedDb = localStorage.getItem('interntrack_sqlite_db_v1');
    if (savedDb) {
      try {
        this.tables = JSON.parse(savedDb);
        return;
      } catch (e) {
        console.warn('Failed to parse saved database, re-seeding...', e);
      }
    }
    this.seedInitialDatabase();
  }

  save() {
    localStorage.setItem('interntrack_sqlite_db_v1', JSON.stringify(this.tables));
  }

  seedInitialDatabase() {
    this.tables.student_profile = [
      {
        id: "std_101",
        name: "Dinesh Kumar",
        title: "Undergraduate Security Researcher & Software Engineer",
        degree: "B.E. Computer Science & Engineering",
        specialization: "Cyber Security",
        institution: "College of Engineering",
        cgpa: 8.48,
        graduation_year: 2028,
        profile_completion: 85,
        email: "dinesh.kumar@campus.edu",
        location: "Bangalore, India",
        created_at: "2026-09-01 10:00:00"
      }
    ];

    this.tables.opportunities = [
      {
        id: "opp_1",
        featured: 1,
        company: "SecureNet Labs",
        role: "Cybersecurity Intern",
        category: "Cybersecurity",
        logo_text: "SN",
        logo_color: "#00f2fe",
        location: "Bangalore, India",
        work_mode: "Hybrid",
        stipend: "₹15,000",
        stipend_numeric: 15000,
        duration: "6 Months",
        deadline: "2026-09-30 23:59:59",
        deadline_formatted: "30 SEP 2026",
        required_skills: "Python,Linux,Networking,Cybersecurity",
        min_cgpa: 7.5,
        allowed_branches: "Computer Science & Engineering,Information Technology,Cyber Security,Electronics",
        grad_years: "2027,2028",
        description: "Join our Red & Blue team operations to analyze zero-day vulnerabilities, audit perimeter networks, and build automated penetration testing scripts.",
        application_count: 42,
        match_score: 94
      },
      {
        id: "opp_2",
        featured: 0,
        company: "CloudScale AI",
        role: "Cloud DevOps & Platform Engineer Intern",
        category: "Cloud",
        logo_text: "CS",
        logo_color: "#8b5cf6",
        location: "Hyderabad, India",
        work_mode: "Remote",
        stipend: "₹25,000",
        stipend_numeric: 25000,
        duration: "3 Months",
        deadline: "2026-09-26 23:59:59",
        deadline_formatted: "26 SEP 2026",
        required_skills: "Cloud,Linux,Python,Git",
        min_cgpa: 8.0,
        allowed_branches: "Computer Science & Engineering,Information Technology,Cyber Security",
        grad_years: "2027,2028",
        description: "Architect high-throughput Kubernetes deployments and build automated CI/CD pipelines supporting distributed microservices.",
        application_count: 88,
        match_score: 88
      },
      {
        id: "opp_3",
        featured: 0,
        company: "Apex FinTech",
        role: "Full Stack Web Developer Intern",
        category: "Web Development",
        logo_text: "AF",
        logo_color: "#10b981",
        location: "Mumbai, India",
        work_mode: "Hybrid",
        stipend: "₹20,000",
        stipend_numeric: 20000,
        duration: "6 Months",
        deadline: "2026-10-05 23:59:59",
        deadline_formatted: "05 OCT 2026",
        required_skills: "Web Development,SQL,Git,Python",
        min_cgpa: 7.0,
        allowed_branches: "Computer Science & Engineering,Information Technology,Cyber Security,Data Science",
        grad_years: "2026,2027,2028",
        description: "Design reactive customer-facing investment dashboards with sub-second latency and resilient SQL transaction safety.",
        application_count: 110,
        match_score: 91
      },
      {
        id: "opp_4",
        featured: 0,
        company: "Quantum Cyber Intelligence",
        role: "AI & Threat Analytics Research Fellow",
        category: "AI / ML",
        logo_text: "QC",
        logo_color: "#f43f5e",
        location: "Bangalore, India",
        work_mode: "On-site",
        stipend: "₹30,000",
        stipend_numeric: 30000,
        duration: "6 Months",
        deadline: "2026-09-24 23:59:59",
        deadline_formatted: "24 SEP 2026",
        required_skills: "Machine Learning,Python,Cybersecurity,SQL",
        min_cgpa: 8.2,
        allowed_branches: "Computer Science & Engineering,Cyber Security,Artificial Intelligence",
        grad_years: "2027,2028",
        description: "Leverage deep transformer models and graph neural nets to identify stealth cyber threat actors across multi-terabyte log repositories.",
        application_count: 65,
        match_score: 96
      },
      {
        id: "opp_5",
        featured: 0,
        company: "Nova Robotics",
        role: "Embedded Systems & Linux Kernel Intern",
        category: "Linux & Core",
        logo_text: "NR",
        logo_color: "#f59e0b",
        location: "Pune, India",
        work_mode: "On-site",
        stipend: "₹18,000",
        stipend_numeric: 18000,
        duration: "4 Months",
        deadline: "2026-10-12 23:59:59",
        deadline_formatted: "12 OCT 2026",
        required_skills: "Linux,Networking,Git",
        min_cgpa: 7.2,
        allowed_branches: "Computer Science & Engineering,Electronics,Cyber Security",
        grad_years: "2027,2028",
        description: "Write lightweight device driver routines and configure real-time Linux kernels for autonomous warehouse robots.",
        application_count: 34,
        match_score: 82
      },
      {
        id: "opp_6",
        featured: 0,
        company: "DeepMatrix Systems",
        role: "Backend & Data Pipeline Engineer Intern",
        category: "Web Development",
        logo_text: "DM",
        logo_color: "#00f2fe",
        location: "Chennai, India",
        work_mode: "Hybrid",
        stipend: "₹22,000",
        stipend_numeric: 22000,
        duration: "6 Months",
        deadline: "2026-10-18 23:59:59",
        deadline_formatted: "18 OCT 2026",
        required_skills: "Java,SQL,Git,Networking",
        min_cgpa: 7.8,
        allowed_branches: "Computer Science & Engineering,Information Technology",
        grad_years: "2027,2028",
        description: "Build asynchronous event streaming backends in Java and optimize distributed databases for real-time order processing.",
        application_count: 52,
        match_score: 89
      }
    ];

    this.tables.applications = [
      {
        id: "app_1",
        opportunity_id: "opp_1",
        company: "SecureNet Labs",
        role: "Cybersecurity Intern",
        applied_date: "15 Sep 2026",
        status: "Shortlisted",
        status_stage: 2,
        notes: "Resume shortlisted by lead architect. Technical interview scheduled for 28 Sep.",
        created_at: "2026-09-15 14:30:00"
      },
      {
        id: "app_2",
        opportunity_id: "opp_4",
        company: "Quantum Cyber Intelligence",
        role: "AI & Threat Analytics Research Fellow",
        applied_date: "18 Sep 2026",
        status: "Interview",
        status_stage: 3,
        notes: "Round 1 technical clearing completed. Final research discussion pending.",
        created_at: "2026-09-18 11:20:00"
      },
      {
        id: "app_3",
        opportunity_id: "opp_2",
        company: "CloudScale AI",
        role: "Cloud DevOps & Platform Engineer Intern",
        applied_date: "19 Sep 2026",
        status: "Screening",
        status_stage: 1,
        notes: "Application under assessment by engineering recruiting team.",
        created_at: "2026-09-19 09:45:00"
      }
    ];

    this.tables.skills = [
      { id: "sk_1", name: "Cybersecurity", category: "Security", mastery_percent: 88, is_active: 1 },
      { id: "sk_2", name: "Python", category: "Programming", mastery_percent: 94, is_active: 1 },
      { id: "sk_3", name: "Linux", category: "Systems", mastery_percent: 82, is_active: 1 },
      { id: "sk_4", name: "Networking", category: "Infrastructure", mastery_percent: 85, is_active: 1 },
      { id: "sk_5", name: "Machine Learning", category: "AI", mastery_percent: 76, is_active: 1 },
      { id: "sk_6", name: "Web Development", category: "Frontend/Backend", mastery_percent: 86, is_active: 1 },
      { id: "sk_7", name: "SQL", category: "Data", mastery_percent: 84, is_active: 1 },
      { id: "sk_8", name: "Cloud", category: "DevOps", mastery_percent: 72, is_active: 0 },
      { id: "sk_9", name: "Java", category: "Programming", mastery_percent: 85, is_active: 1 },
      { id: "sk_10", name: "Git", category: "Tools", mastery_percent: 90, is_active: 1 }
    ];

    this.tables.certifications = [
      {
        id: "cert_1",
        name: "NPTEL Java Programming",
        issuer: "IIT Kharagpur / NPTEL",
        grade: "Elite + Gold (92%)",
        issue_date: "Aug 2025",
        verified: 1
      },
      {
        id: "cert_2",
        name: "NPTEL Cybersecurity & Privacy",
        issuer: "IIT Madras / NPTEL",
        grade: "Elite + Silver (88%)",
        issue_date: "Nov 2025",
        verified: 1
      },
      {
        id: "cert_3",
        name: "NPTEL Data Science for Engineers",
        issuer: "IIT Madras / NPTEL",
        grade: "Elite (81%)",
        issue_date: "Apr 2026",
        verified: 1
      }
    ];

    this.tables.projects = [
      {
        id: "proj_1",
        title: "Phishing Email Detector",
        description: "AI-powered heuristic & NLP pipeline detecting zero-day phishing attempts with 97.4% precision.",
        tech_stack: "Python,Scikit-Learn,FastAPI,NLP",
        impact: "Analyzed 10,000+ test samples"
      },
      {
        id: "proj_2",
        title: "VigilStride - Threat Sentinel",
        description: "Automated network intrusion telemetry monitor parsing anomalous packet flows across distributed subnets.",
        tech_stack: "Cybersecurity,Linux,Networking,Python",
        impact: "Real-time packet anomaly detection"
      },
      {
        id: "proj_3",
        title: "Smart Attendance System",
        description: "Biometric and contactless attendance management portal with anti-spoofing face embeddings.",
        tech_stack: "Web Development,SQL,OpenCV,JavaScript",
        impact: "Adopted by student laboratory"
      }
    ];

    this.save();
  }

  // SQL Query Execution Engine
  executeSQL(rawSql) {
    const startTime = performance.now();
    const sql = rawSql.trim();
    if (!sql) return { success: false, error: "Empty query provided.", executionTimeMs: 0 };

    try {
      const lower = sql.toLowerCase();

      // SHOW TABLES / .tables
      if (lower.startsWith('show tables') || lower === '.tables') {
        const rows = Object.keys(this.tables).map(t => ({ table_name: t, row_count: this.tables[t].length }));
        const duration = (performance.now() - startTime).toFixed(2);
        return { success: true, columns: ['table_name', 'row_count'], rows, executionTimeMs: duration };
      }

      // SELECT queries
      if (lower.startsWith('select')) {
        const fromMatch = sql.match(/from\s+([a-zA-Z0-9_]+)/i);
        if (!fromMatch) {
          return { success: false, error: "Missing FROM clause in SELECT query.", executionTimeMs: 0 };
        }
        const tableName = fromMatch[1].toLowerCase();
        if (!this.tables[tableName]) {
          return { success: false, error: `Table '${tableName}' does not exist in SQLite database.`, executionTimeMs: 0 };
        }

        let dataset = [...this.tables[tableName]];

        // Handle WHERE
        const whereMatch = sql.match(/where\s+(.+?)(?:\s+order\s+by|\s+limit|\s*$)/i);
        if (whereMatch) {
          const conditionStr = whereMatch[1];
          dataset = dataset.filter(row => {
            try {
              // Basic numeric comparison e.g. stipend_numeric >= 20000 or status = 'Shortlisted'
              if (conditionStr.includes('>=')) {
                const [col, val] = conditionStr.split('>=').map(s => s.trim().replace(/['"]/g, ''));
                return Number(row[col]) >= Number(val);
              }
              if (conditionStr.includes('<=')) {
                const [col, val] = conditionStr.split('<=').map(s => s.trim().replace(/['"]/g, ''));
                return Number(row[col]) <= Number(val);
              }
              if (conditionStr.includes('>')) {
                const [col, val] = conditionStr.split('>').map(s => s.trim().replace(/['"]/g, ''));
                return Number(row[col]) > Number(val);
              }
              if (conditionStr.includes('<')) {
                const [col, val] = conditionStr.split('<').map(s => s.trim().replace(/['"]/g, ''));
                return Number(row[col]) < Number(val);
              }
              if (conditionStr.includes('=')) {
                const [col, val] = conditionStr.split('=').map(s => s.trim().replace(/['"]/g, ''));
                return String(row[col]).toLowerCase() === String(val).toLowerCase();
              }
              if (conditionStr.toLowerCase().includes('like')) {
                const [col, val] = conditionStr.split(/like/i).map(s => s.trim().replace(/['"%]/g, ''));
                return String(row[col]).toLowerCase().includes(val.toLowerCase());
              }
              return true;
            } catch (e) {
              return true;
            }
          });
        }

        // Handle ORDER BY
        const orderMatch = sql.match(/order\s+by\s+([a-zA-Z0-9_]+)(?:\s+(asc|desc))?/i);
        if (orderMatch) {
          const col = orderMatch[1];
          const dir = (orderMatch[2] || 'asc').toLowerCase();
          dataset.sort((a, b) => {
            if (a[col] < b[col]) return dir === 'asc' ? -1 : 1;
            if (a[col] > b[col]) return dir === 'asc' ? 1 : -1;
            return 0;
          });
        }

        // Handle LIMIT
        const limitMatch = sql.match(/limit\s+(\d+)/i);
        if (limitMatch) {
          const lim = parseInt(limitMatch[1], 10);
          dataset = dataset.slice(0, lim);
        }

        // Select specific columns
        const selectColsMatch = sql.match(/select\s+(.+?)\s+from/i);
        let columns = [];
        if (selectColsMatch && selectColsMatch[1].trim() !== '*') {
          const reqCols = selectColsMatch[1].split(',').map(c => c.trim());
          columns = reqCols;
          dataset = dataset.map(row => {
            const newRow = {};
            reqCols.forEach(c => { newRow[c] = row[c] !== undefined ? row[c] : null; });
            return newRow;
          });
        } else {
          columns = dataset.length > 0 ? Object.keys(dataset[0]) : (this.tables[tableName].length > 0 ? Object.keys(this.tables[tableName][0]) : []);
        }

        const duration = (performance.now() - startTime).toFixed(2);
        return { success: true, columns, rows: dataset, executionTimeMs: duration };
      }

      // INSERT query
      if (lower.startsWith('insert into')) {
        const insertMatch = sql.match(/insert\s+into\s+([a-zA-Z0-9_]+)\s*\((.+?)\)\s*values\s*\((.+?)\)/i);
        if (!insertMatch) {
          return { success: false, error: "Malformed INSERT statement syntax.", executionTimeMs: 0 };
        }
        const tableName = insertMatch[1].toLowerCase();
        if (!this.tables[tableName]) {
          return { success: false, error: `Table '${tableName}' not found.`, executionTimeMs: 0 };
        }
        const cols = insertMatch[2].split(',').map(c => c.trim());
        const vals = insertMatch[3].split(',').map(v => v.trim().replace(/^['"]|['"]$/g, ''));
        const newRow = {};
        cols.forEach((col, i) => { newRow[col] = vals[i]; });
        if (!newRow.id) newRow.id = `rec_${Date.now()}`;
        this.tables[tableName].push(newRow);
        this.save();
        const duration = (performance.now() - startTime).toFixed(2);
        return { success: true, message: `1 row inserted into '${tableName}'.`, rowsAffected: 1, executionTimeMs: duration };
      }

      // UPDATE query
      if (lower.startsWith('update')) {
        const updateMatch = sql.match(/update\s+([a-zA-Z0-9_]+)\s+set\s+(.+?)(?:\s+where\s+(.+?))?$/i);
        if (!updateMatch) return { success: false, error: "Malformed UPDATE statement.", executionTimeMs: 0 };
        const tableName = updateMatch[1].toLowerCase();
        if (!this.tables[tableName]) return { success: false, error: `Table '${tableName}' not found.`, executionTimeMs: 0 };
        
        const setClauses = updateMatch[2].split(',').map(s => s.trim());
        const whereClause = updateMatch[3];
        let affected = 0;

        this.tables[tableName] = this.tables[tableName].map(row => {
          let matches = true;
          if (whereClause) {
            if (whereClause.includes('=')) {
              const [col, val] = whereClause.split('=').map(s => s.trim().replace(/['"]/g, ''));
              matches = String(row[col]) === String(val);
            }
          }
          if (matches) {
            affected++;
            const updated = { ...row };
            setClauses.forEach(clause => {
              const [col, val] = clause.split('=').map(s => s.trim().replace(/['"]/g, ''));
              updated[col] = val;
            });
            return updated;
          }
          return row;
        });

        this.save();
        const duration = (performance.now() - startTime).toFixed(2);
        return { success: true, message: `${affected} row(s) updated in '${tableName}'.`, rowsAffected: affected, executionTimeMs: duration };
      }

      return { success: false, error: "Unsupported SQL dialect command. Try SELECT, INSERT, UPDATE, or SHOW TABLES.", executionTimeMs: 0 };

    } catch (err) {
      return { success: false, error: err.message, executionTimeMs: 0 };
    }
  }

  reset() {
    this.seedInitialDatabase();
    return { success: true, message: "SQLite Database re-initialized to default schema & seeds." };
  }
}

export const db = new InternTrackDatabase();
