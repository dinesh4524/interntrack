/* =========================================================================
   INTERNTRACK MASTER PRODUCTION BUNDLE & SQLITE RELATIONAL DATABASE ENGINE
   100% Standalone • Zero External Dependencies • Zero CORS issues on file:///
   ========================================================================= */

(function() {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. IN-MEMORY & LOCALSTORAGE RELATIONAL SQLITE DATABASE
  // -------------------------------------------------------------------------
  class SQLiteDatabase {
    constructor() {
      this.tables = {};
      this.init();
    }

    init() {
      const saved = localStorage.getItem('interntrack_sqlite_db_v3');
      if (saved) {
        try {
          this.tables = JSON.parse(saved);
          return;
        } catch (e) {
          console.warn('Re-seeding SQLite database due to parse error:', e);
        }
      }
      this.seed();
    }

    save() {
      try {
        localStorage.setItem('interntrack_sqlite_db_v3', JSON.stringify(this.tables));
      } catch (e) {
        console.error('Failed to persist SQLite database:', e);
      }
    }

    seed() {
      this.tables = {
        student_profile: [
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
            bio: "Passionate cybersecurity student focusing on network penetration testing, threat telemetry, and secure application architecture."
          }
        ],
        opportunities: [
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
            deadline: "2026-09-30T23:59:59",
            deadline_formatted: "30 SEP 2026",
            required_skills: "Python, Linux, Networking, Cybersecurity",
            min_cgpa: 7.5,
            allowed_branches: "Computer Science & Engineering, Cyber Security, Information Technology, Electronics",
            grad_years: "2027, 2028",
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
            deadline: "2026-09-26T23:59:59",
            deadline_formatted: "26 SEP 2026",
            required_skills: "Cloud, Linux, Python, Git",
            min_cgpa: 8.0,
            allowed_branches: "Computer Science & Engineering, Information Technology, Cyber Security",
            grad_years: "2027, 2028",
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
            deadline: "2026-10-05T23:59:59",
            deadline_formatted: "05 OCT 2026",
            required_skills: "Web Development, SQL, Git, Python",
            min_cgpa: 7.0,
            allowed_branches: "Computer Science & Engineering, Information Technology, Cyber Security, Data Science",
            grad_years: "2026, 2027, 2028",
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
            deadline: "2026-09-24T23:59:59",
            deadline_formatted: "24 SEP 2026",
            required_skills: "Machine Learning, Python, Cybersecurity, SQL",
            min_cgpa: 8.2,
            allowed_branches: "Computer Science & Engineering, Cyber Security, Artificial Intelligence",
            grad_years: "2027, 2028",
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
            deadline: "2026-10-12T23:59:59",
            deadline_formatted: "12 OCT 2026",
            required_skills: "Linux, Networking, Git",
            min_cgpa: 7.2,
            allowed_branches: "Computer Science & Engineering, Electronics, Cyber Security",
            grad_years: "2027, 2028",
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
            deadline: "2026-10-18T23:59:59",
            deadline_formatted: "18 OCT 2026",
            required_skills: "Java, SQL, Git, Networking",
            min_cgpa: 7.8,
            allowed_branches: "Computer Science & Engineering, Information Technology",
            grad_years: "2027, 2028",
            description: "Build asynchronous event streaming backends in Java and optimize distributed databases for real-time order processing.",
            application_count: 52,
            match_score: 89
          }
        ],
        applications: [
          {
            id: "app_1",
            opportunity_id: "opp_1",
            company: "SecureNet Labs",
            role: "Cybersecurity Intern",
            applied_date: "15 Sep 2026",
            status: "Shortlisted",
            status_stage: 2,
            notes: "Resume shortlisted by lead architect. Technical interview scheduled for 28 Sep."
          },
          {
            id: "app_2",
            opportunity_id: "opp_4",
            company: "Quantum Cyber Intelligence",
            role: "AI & Threat Analytics Research Fellow",
            applied_date: "18 Sep 2026",
            status: "Interview",
            status_stage: 3,
            notes: "Round 1 technical clearing completed. Final research discussion pending."
          },
          {
            id: "app_3",
            opportunity_id: "opp_2",
            company: "CloudScale AI",
            role: "Cloud DevOps & Platform Engineer Intern",
            applied_date: "19 Sep 2026",
            status: "Screening",
            status_stage: 1,
            notes: "Application under assessment by engineering recruiting team."
          }
        ],
        skills: [
          { id: "sk_1", name: "Cybersecurity", category: "Security", mastery_percent: 88, domain_level: "Advanced" },
          { id: "sk_2", name: "Python", category: "Programming", mastery_percent: 94, domain_level: "Mastery" },
          { id: "sk_3", name: "Linux", category: "Systems", mastery_percent: 82, domain_level: "Proficient" },
          { id: "sk_4", name: "Networking", category: "Infrastructure", mastery_percent: 85, domain_level: "Proficient" },
          { id: "sk_5", name: "Machine Learning", category: "AI", mastery_percent: 76, domain_level: "Intermediate" },
          { id: "sk_6", name: "Web Development", category: "Frontend/Backend", mastery_percent: 86, domain_level: "Proficient" },
          { id: "sk_7", name: "SQL", category: "Data", mastery_percent: 84, domain_level: "Proficient" },
          { id: "sk_8", name: "Cloud", category: "DevOps", mastery_percent: 72, domain_level: "Intermediate" },
          { id: "sk_9", name: "Java", category: "Programming", mastery_percent: 85, domain_level: "Proficient" },
          { id: "sk_10", name: "Git", category: "Tools", mastery_percent: 90, domain_level: "Advanced" }
        ],
        certifications: [
          {
            id: "cert_1",
            name: "NPTEL Java Programming",
            issuer: "IIT Kharagpur / NPTEL",
            grade: "Elite + Gold (92%)",
            issue_date: "Aug 2025",
            credential_id: "NPTEL25CS88J104",
            verified: 1
          },
          {
            id: "cert_2",
            name: "NPTEL Cybersecurity & Privacy",
            issuer: "IIT Madras / NPTEL",
            grade: "Elite + Silver (88%)",
            credential_id: "NPTEL25CS92C319",
            issue_date: "Nov 2025",
            verified: 1
          },
          {
            id: "cert_3",
            name: "NPTEL Data Science for Engineers",
            issuer: "IIT Madras / NPTEL",
            grade: "Elite (81%)",
            credential_id: "NPTEL26CS41D502",
            issue_date: "Apr 2026",
            verified: 1
          }
        ],
        projects: [
          {
            id: "proj_1",
            title: "Phishing Email Detector",
            description: "AI-powered heuristic & NLP pipeline detecting zero-day phishing attempts with 97.4% precision.",
            tech_stack: "Python, Scikit-Learn, FastAPI, NLP",
            impact: "Analyzed 10,000+ test samples",
            repo_link: "https://github.com/dinesh-kumar/phishing-detector"
          },
          {
            id: "proj_2",
            title: "VigilStride - Threat Sentinel",
            description: "Automated network intrusion telemetry monitor parsing anomalous packet flows across distributed subnets.",
            tech_stack: "Cybersecurity, Linux, Networking, Python",
            impact: "Real-time packet anomaly detection",
            repo_link: "https://github.com/dinesh-kumar/vigilstride"
          },
          {
            id: "proj_3",
            title: "Smart Attendance System",
            description: "Biometric and contactless attendance management portal with anti-spoofing face embeddings.",
            tech_stack: "Web Development, SQL, OpenCV, JavaScript",
            impact: "Adopted by student laboratory",
            repo_link: "https://github.com/dinesh-kumar/smart-attendance"
          }
        ]
      };
      this.save();
    }

    executeSQL(rawSql) {
      const t0 = performance.now();
      const sql = (rawSql || '').trim();
      if (!sql) return { success: false, error: 'Empty query provided.', executionTimeMs: 0 };

      try {
        const lower = sql.toLowerCase();

        // SHOW TABLES
        if (lower.startsWith('show tables') || lower === '.tables') {
          const rows = Object.keys(this.tables).map(t => ({ table_name: t, row_count: this.tables[t].length }));
          return { success: true, columns: ['table_name', 'row_count'], rows, executionTimeMs: (performance.now() - t0).toFixed(2) };
        }

        // SELECT query
        if (lower.startsWith('select')) {
          const fromMatch = sql.match(/from\s+([a-zA-Z0-9_]+)/i);
          if (!fromMatch) return { success: false, error: 'Syntax error: Missing FROM table clause', executionTimeMs: 0 };

          const tableName = fromMatch[1].toLowerCase();
          if (!this.tables[tableName]) {
            return { success: false, error: `Table '${tableName}' does not exist in SQLite database.`, executionTimeMs: 0 };
          }

          let data = [...this.tables[tableName]];

          // WHERE filter
          const whereMatch = sql.match(/where\s+(.+?)(?:\s+order\s+by|\s+limit|\s*$)/i);
          if (whereMatch) {
            const cond = whereMatch[1];
            data = data.filter(row => {
              try {
                if (cond.includes('>=')) {
                  const [c, v] = cond.split('>=').map(s => s.trim().replace(/['"]/g, ''));
                  return Number(row[c]) >= Number(v);
                }
                if (cond.includes('<=')) {
                  const [c, v] = cond.split('<=').map(s => s.trim().replace(/['"]/g, ''));
                  return Number(row[c]) <= Number(v);
                }
                if (cond.includes('>')) {
                  const [c, v] = cond.split('>').map(s => s.trim().replace(/['"]/g, ''));
                  return Number(row[c]) > Number(v);
                }
                if (cond.includes('<')) {
                  const [c, v] = cond.split('<').map(s => s.trim().replace(/['"]/g, ''));
                  return Number(row[c]) < Number(v);
                }
                if (cond.includes('=')) {
                  const [c, v] = cond.split('=').map(s => s.trim().replace(/['"]/g, ''));
                  return String(row[c]).toLowerCase() === String(v).toLowerCase();
                }
                if (cond.toLowerCase().includes('like')) {
                  const [c, v] = cond.split(/like/i).map(s => s.trim().replace(/['"%]/g, ''));
                  return String(row[c]).toLowerCase().includes(val.toLowerCase());
                }
                return true;
              } catch (e) {
                return true;
              }
            });
          }

          // ORDER BY
          const orderMatch = sql.match(/order\s+by\s+([a-zA-Z0-9_]+)(?:\s+(asc|desc))?/i);
          if (orderMatch) {
            const c = orderMatch[1];
            const dir = (orderMatch[2] || 'asc').toLowerCase();
            data.sort((a, b) => {
              if (a[c] < b[c]) return dir === 'asc' ? -1 : 1;
              if (a[c] > b[c]) return dir === 'asc' ? 1 : -1;
              return 0;
            });
          }

          // LIMIT
          const limitMatch = sql.match(/limit\s+(\d+)/i);
          if (limitMatch) {
            data = data.slice(0, parseInt(limitMatch[1], 10));
          }

          // Column projection
          const selectColsMatch = sql.match(/select\s+(.+?)\s+from/i);
          let columns = [];
          if (selectColsMatch && selectColsMatch[1].trim() !== '*') {
            const reqCols = selectColsMatch[1].split(',').map(s => s.trim());
            columns = reqCols;
            data = data.map(r => {
              const obj = {};
              reqCols.forEach(col => { obj[col] = r[col] !== undefined ? r[col] : null; });
              return obj;
            });
          } else {
            columns = data.length > 0 ? Object.keys(data[0]) : (this.tables[tableName].length > 0 ? Object.keys(this.tables[tableName][0]) : []);
          }

          return { success: true, columns, rows: data, executionTimeMs: (performance.now() - t0).toFixed(2) };
        }

        // INSERT
        if (lower.startsWith('insert into')) {
          const insertMatch = sql.match(/insert\s+into\s+([a-zA-Z0-9_]+)\s*\((.+?)\)\s*values\s*\((.+?)\)/i);
          if (!insertMatch) return { success: false, error: 'Malformed INSERT syntax', executionTimeMs: 0 };
          const tableName = insertMatch[1].toLowerCase();
          if (!this.tables[tableName]) return { success: false, error: `Table '${tableName}' not found`, executionTimeMs: 0 };

          const cols = insertMatch[2].split(',').map(s => s.trim());
          const vals = insertMatch[3].split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
          const newRow = {};
          cols.forEach((col, i) => { newRow[col] = vals[i]; });
          if (!newRow.id) newRow.id = `rec_${Date.now()}`;
          this.tables[tableName].push(newRow);
          this.save();
          return { success: true, message: `1 row inserted into '${tableName}'`, rowsAffected: 1, executionTimeMs: (performance.now() - t0).toFixed(2) };
        }

        // UPDATE
        if (lower.startsWith('update')) {
          const updateMatch = sql.match(/update\s+([a-zA-Z0-9_]+)\s+set\s+(.+?)(?:\s+where\s+(.+?))?$/i);
          if (!updateMatch) return { success: false, error: 'Malformed UPDATE syntax', executionTimeMs: 0 };
          const tableName = updateMatch[1].toLowerCase();
          if (!this.tables[tableName]) return { success: false, error: `Table '${tableName}' not found`, executionTimeMs: 0 };

          const setClauses = updateMatch[2].split(',').map(s => s.trim());
          const whereClause = updateMatch[3];
          let affected = 0;

          this.tables[tableName] = this.tables[tableName].map(row => {
            let match = true;
            if (whereClause && whereClause.includes('=')) {
              const [col, val] = whereClause.split('=').map(s => s.trim().replace(/['"]/g, ''));
              match = String(row[col]) === String(val);
            }
            if (match) {
              affected++;
              const copy = { ...row };
              setClauses.forEach(clause => {
                const [col, val] = clause.split('=').map(s => s.trim().replace(/['"]/g, ''));
                copy[col] = val;
              });
              return copy;
            }
            return row;
          });

          this.save();
          return { success: true, message: `${affected} row(s) updated in '${tableName}'`, rowsAffected: affected, executionTimeMs: (performance.now() - t0).toFixed(2) };
        }

        // DELETE
        if (lower.startsWith('delete from')) {
          const delMatch = sql.match(/delete\s+from\s+([a-zA-Z0-9_]+)(?:\s+where\s+(.+?))?$/i);
          if (!delMatch) return { success: false, error: 'Malformed DELETE syntax', executionTimeMs: 0 };
          const tableName = delMatch[1].toLowerCase();
          if (!this.tables[tableName]) return { success: false, error: `Table '${tableName}' not found`, executionTimeMs: 0 };

          const whereClause = delMatch[2];
          const initialLen = this.tables[tableName].length;
          if (!whereClause) {
            this.tables[tableName] = [];
          } else if (whereClause.includes('=')) {
            const [col, val] = whereClause.split('=').map(s => s.trim().replace(/['"]/g, ''));
            this.tables[tableName] = this.tables[tableName].filter(r => String(r[col]) !== String(val));
          }
          const affected = initialLen - this.tables[tableName].length;
          this.save();
          return { success: true, message: `${affected} row(s) deleted from '${tableName}'`, rowsAffected: affected, executionTimeMs: (performance.now() - t0).toFixed(2) };
        }

        return { success: false, error: 'Unsupported SQL command. Supported: SELECT, INSERT, UPDATE, DELETE, SHOW TABLES.', executionTimeMs: 0 };
      } catch (err) {
        return { success: false, error: err.message, executionTimeMs: 0 };
      }
    }
  }

  // -------------------------------------------------------------------------
  // 2. STATE MANAGER & DISPATCHERS
  // -------------------------------------------------------------------------
  const database = new SQLiteDatabase();

  const appState = {
    db: database,
    activeTab: 'explore',
    searchQuery: '',
    selectedCategory: 'All',
    selectedWorkMode: 'All',
    selectedSort: 'match',
    bookmarks: JSON.parse(localStorage.getItem('interntrack_bookmarks_v3') || '["opp_1", "opp_4"]'),
    eligibility: {
      branch: "Computer Science & Engineering",
      cgpa: 8.48,
      gradYear: 2028,
      selectedOppId: "opp_1",
      skills: ["Python", "Linux", "Networking", "Cybersecurity", "SQL", "Git"]
    },
    notifications: [
      { id: 1, title: "Resume Shortlisted", text: "SecureNet Labs invited you for Technical Round 1 on 28 Sep.", time: "10 mins ago", type: "success" },
      { id: 2, title: "Upcoming Deadline", text: "Quantum Cyber Intelligence fellowship closes in 2 days.", time: "2 hours ago", type: "warning" },
      { id: 3, title: "NPTEL Credential Verified", text: "IIT Kharagpur Java Elite Gold verified by National Placement Registry.", time: "1 day ago", type: "info" }
    ]
  };

  function showToast(message, icon = '✓') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.innerHTML = `
      <span class="toast-icon" style="font-weight: 800; font-size: 16px;">${icon}</span>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  }

  function toggleBookmark(oppId) {
    if (appState.bookmarks.includes(oppId)) {
      appState.bookmarks = appState.bookmarks.filter(id => id !== oppId);
      showToast('Removed opportunity from bookmarks', '☆');
    } else {
      appState.bookmarks.push(oppId);
      showToast('Saved opportunity to your bookmarks!', '★');
    }
    localStorage.setItem('interntrack_bookmarks_v3', JSON.stringify(appState.bookmarks));
    renderAll();
  }

  function applyToOpportunity(oppId, customNotes = '') {
    const opp = database.tables.opportunities.find(o => o.id === oppId);
    if (!opp) return false;

    const existing = database.tables.applications.find(a => a.opportunity_id === oppId);
    if (existing) {
      showToast(`Already applied to ${opp.company} (${existing.status})`, 'ℹ');
      return false;
    }

    const newApp = {
      id: `app_${Date.now()}`,
      opportunity_id: oppId,
      company: opp.company,
      role: opp.role,
      applied_date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: "Applied",
      status_stage: 0,
      notes: customNotes || "Application submitted via InternTrack Portal."
    };

    database.tables.applications.unshift(newApp);
    database.save();
    showToast(`Application successfully sent to ${opp.company}! 🎉`, '🚀');
    renderAll();
    return true;
  }

  function advanceApplication(appId) {
    const stages = ["Applied", "Screening", "Shortlisted", "Interview", "Selected"];
    const app = database.tables.applications.find(a => a.id === appId);
    if (!app) return;

    if (app.status_stage < stages.length - 1) {
      app.status_stage += 1;
      app.status = stages[app.status_stage];
      database.save();
      showToast(`${app.company} application advanced to ${app.status}! ✨`, '⚡');
      renderAll();
    }
  }

  // -------------------------------------------------------------------------
  // 3. CANVAS 3D PARTICLES
  // -------------------------------------------------------------------------
  function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const numParticles = 48;
    const mouse = { x: null, y: null, radius: 130 };

    function resize() {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('mousemove', (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });

    const colors = ['#00f2fe', '#4facfe', '#6366f1', '#8b5cf6', '#3b82f6'];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.65,
        vy: (Math.random() - 0.5) * 0.65,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 125) {
            const alpha = (1 - dist / 125) * 0.22;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (let p of particles) {
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= Math.cos(angle) * force * 2;
            p.y -= Math.sin(angle) * force * 2;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      requestAnimationFrame(render);
    }
    render();
  }

  // -------------------------------------------------------------------------
  // 4. MODAL DIALOG CONTROLLER
  // -------------------------------------------------------------------------
  function openModal(contentHtml) {
    const backdrop = document.getElementById('global-modal-backdrop');
    const dialog = document.getElementById('global-modal-dialog');
    if (!backdrop || !dialog) return;

    dialog.innerHTML = contentHtml;
    backdrop.classList.add('open');

    dialog.querySelector('.modal-close-btn')?.addEventListener('click', closeModal);
  }

  function closeModal() {
    const backdrop = document.getElementById('global-modal-backdrop');
    if (backdrop) backdrop.classList.remove('open');
  }

  // -------------------------------------------------------------------------
  // 5. RENDER OPPORTUNITIES EDITORIAL GRID
  // -------------------------------------------------------------------------
  function renderOpportunities() {
    const mount = document.getElementById('opportunities-mount');
    if (!mount) return;

    let opps = [...database.tables.opportunities];

    // Search query
    if (appState.searchQuery.trim() !== '') {
      const q = appState.searchQuery.toLowerCase();
      opps = opps.filter(o => 
        o.company.toLowerCase().includes(q) ||
        o.role.toLowerCase().includes(q) ||
        o.required_skills.toLowerCase().includes(q) ||
        o.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (appState.selectedCategory !== 'All') {
      opps = opps.filter(o => o.category === appState.selectedCategory);
    }

    // Work Mode
    if (appState.selectedWorkMode !== 'All') {
      opps = opps.filter(o => o.work_mode === appState.selectedWorkMode);
    }

    // Sort
    if (appState.selectedSort === 'deadline') {
      opps.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (appState.selectedSort === 'stipend') {
      opps.sort((a, b) => b.stipend_numeric - a.stipend_numeric);
    } else {
      opps.sort((a, b) => b.match_score - a.match_score);
    }

    if (opps.length === 0) {
      mount.innerHTML = `
        <div class="card-opportunity" style="text-align: center; padding: 50px 20px;">
          <h3 style="font-family: var(--font-display); font-size: 24px; color: #fff; margin-bottom: 8px;">No Matching Opportunities Found</h3>
          <p style="color: var(--text-secondary); margin-bottom: 16px;">Try adjusting search keywords or selecting 'All Sectors'.</p>
          <button class="btn btn-secondary btn-sm" id="btn-reset-filters">Reset All Filters</button>
        </div>
      `;
      mount.querySelector('#btn-reset-filters')?.addEventListener('click', () => {
        appState.searchQuery = '';
        appState.selectedCategory = 'All';
        appState.selectedWorkMode = 'All';
        const searchInput = document.getElementById('main-search-input');
        if (searchInput) searchInput.value = '';
        document.querySelectorAll('.filter-category-pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-cat') === 'All'));
        renderOpportunities();
      });
      return;
    }

    const lead = opps[0];
    const secondary = opps.slice(1, 3);
    const wide = opps.find((o, idx) => idx >= 3 || o.featured === 0) || (opps.length > 3 ? opps[3] : null);
    const rest = opps.filter((o, idx) => o.id !== lead.id && !secondary.some(s => s.id === o.id) && (!wide || o.id !== wide.id));

    mount.innerHTML = `
      <div class="editorial-grid">
        <!-- Lead High-Impact Card -->
        <div class="card-opportunity card-featured-lead" data-opp-id="${lead.id}">
          <div class="card-featured-badge">★ Featured Opportunity</div>
          <div>
            <div class="company-identity">
              <div class="company-logo" style="border-color: ${lead.logo_color}; color: ${lead.logo_color};">
                ${lead.logo_text}
              </div>
              <div class="company-meta">
                <h4>${lead.company}</h4>
                <span>📍 ${lead.location} • ${lead.work_mode}</span>
              </div>
            </div>
            <h3 class="opportunity-role-title">${lead.role}</h3>
            <p class="opportunity-desc-brief">${lead.description}</p>
            <div class="opportunity-tags">
              ${lead.required_skills.split(',').map(s => `<span class="skill-tag">${s.trim()}</span>`).join('')}
            </div>
          </div>
          <div class="opportunity-footer">
            <div class="stipend-badge">
              <span class="stipend-amount">${lead.stipend}</span>
              <span class="stipend-period">Per Month</span>
            </div>
            <div class="deadline-pill">⏰ ${lead.deadline_formatted}</div>
            <div class="apply-arrow-btn">Explore Role Details →</div>
          </div>
        </div>

        <!-- Stacked Secondary Cards -->
        <div class="editorial-col-stacked">
          ${secondary.map(opp => `
            <div class="card-opportunity" data-opp-id="${opp.id}">
              <div>
                <div class="company-identity" style="margin-bottom: 14px;">
                  <div class="company-logo" style="border-color: ${opp.logo_color}; color: ${opp.logo_color}; width: 38px; height: 38px; font-size: 13px;">
                    ${opp.logo_text}
                  </div>
                  <div class="company-meta">
                    <h4>${opp.company}</h4>
                    <span>${opp.work_mode} • ${opp.location}</span>
                  </div>
                </div>
                <h4 style="font-family: var(--font-display); font-size: 19px; font-weight: 700; color: #fff; margin-bottom: 8px;">
                  ${opp.role}
                </h4>
                <div class="opportunity-tags" style="margin-bottom: 12px;">
                  ${opp.required_skills.split(',').slice(0, 3).map(s => `<span class="skill-tag">${s.trim()}</span>`).join('')}
                </div>
              </div>
              <div class="opportunity-footer">
                <span class="stipend-amount" style="font-size: 16px;">${opp.stipend} <span style="font-size: 11px; color: var(--text-muted);">/mo</span></span>
                <div class="apply-arrow-btn">Inspect →</div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Wide Card -->
        ${wide ? `
          <div class="card-opportunity card-wide-inner editorial-card-wide" data-opp-id="${wide.id}">
            <div>
              <div class="company-identity" style="margin-bottom: 10px;">
                <div class="company-logo" style="border-color: ${wide.logo_color}; color: ${wide.logo_color}; width: 40px; height: 40px;">
                  ${wide.logo_text}
                </div>
                <div class="company-meta">
                  <h4>${wide.company}</h4>
                  <span>${wide.category} • ${wide.work_mode}</span>
                </div>
              </div>
              <h3 class="opportunity-role-title" style="font-size: 22px; margin-bottom: 4px;">${wide.role}</h3>
              <p class="opportunity-desc-brief" style="margin-bottom: 0;">${wide.description}</p>
            </div>
            <div>
              <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 6px;">Required Skills</div>
              <div class="opportunity-tags" style="margin-bottom: 0;">
                ${wide.required_skills.split(',').map(s => `<span class="skill-tag">${s.trim()}</span>`).join('')}
              </div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
              <div class="stipend-amount" style="font-size: 20px;">${wide.stipend} <span style="font-size: 11px; color: var(--text-muted);">/mo</span></div>
              <button class="btn btn-primary btn-sm btn-wide-apply" data-opp-id="${wide.id}">Apply Now →</button>
            </div>
          </div>
        ` : ''}

        <!-- Remaining Cards -->
        ${rest.map(opp => `
          <div class="card-opportunity" data-opp-id="${opp.id}">
            <div>
              <div class="company-identity" style="margin-bottom: 14px;">
                <div class="company-logo" style="border-color: ${opp.logo_color}; color: ${opp.logo_color}; width: 38px; height: 38px;">${opp.logo_text}</div>
                <div class="company-meta">
                  <h4>${opp.company}</h4>
                  <span>${opp.work_mode} • ${opp.location}</span>
                </div>
              </div>
              <h4 style="font-family: var(--font-display); font-size: 19px; font-weight: 700; color: #fff; margin-bottom: 8px;">${opp.role}</h4>
              <div class="opportunity-tags" style="margin-bottom: 12px;">
                ${opp.required_skills.split(',').map(s => `<span class="skill-tag">${s.trim()}</span>`).join('')}
              </div>
            </div>
            <div class="opportunity-footer">
              <span class="stipend-amount" style="font-size: 16px;">${opp.stipend}</span>
              <div class="apply-arrow-btn">View →</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Click handler for opportunity details modal
    mount.querySelectorAll('.card-opportunity').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-wide-apply')) return;
        const oppId = card.getAttribute('data-opp-id');
        const opp = database.tables.opportunities.find(o => o.id === oppId);
        if (opp) showOpportunityModal(opp);
      });
    });

    mount.querySelectorAll('.btn-wide-apply').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const oppId = btn.getAttribute('data-opp-id');
        const opp = database.tables.opportunities.find(o => o.id === oppId);
        if (opp) showOpportunityModal(opp);
      });
    });
  }

  function showOpportunityModal(opp) {
    const isBookmarked = appState.bookmarks.includes(opp.id);
    const isApplied = database.tables.applications.some(a => a.opportunity_id === opp.id);

    openModal(`
      <button class="modal-close-btn" aria-label="Close modal">✕</button>
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
        <div class="company-logo" style="width: 56px; height: 56px; font-size: 20px; border-color: ${opp.logo_color}; color: ${opp.logo_color};">
          ${opp.logo_text}
        </div>
        <div>
          <span class="section-tag" style="margin-bottom: 4px; font-size: 11px;">${opp.category}</span>
          <h3 style="font-family: var(--font-display); font-size: 28px; font-weight: 800; color: #fff; margin-bottom: 2px;">
            ${opp.role}
          </h3>
          <div style="color: var(--text-secondary); font-size: 14px;">
            ${opp.company} • 📍 ${opp.location} (${opp.work_mode})
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; margin-bottom: 24px;">
        <div>
          <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Stipend</div>
          <div style="font-size: 16px; font-weight: 800; color: #fff;">${opp.stipend} <span style="font-size: 11px; font-weight: normal; color: var(--text-muted);">/mo</span></div>
        </div>
        <div>
          <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Duration</div>
          <div style="font-size: 16px; font-weight: 800; color: #fff;">${opp.duration}</div>
        </div>
        <div>
          <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Deadline</div>
          <div style="font-size: 16px; font-weight: 800; color: var(--accent-amber);">${opp.deadline_formatted}</div>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 6px;">Role Description</h4>
        <p style="color: var(--text-secondary); line-height: 1.6; font-size: 14px;">${opp.description}</p>
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 8px;">Academic Eligibility Criteria</h4>
        <div style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.6;">
          • <strong>Minimum CGPA:</strong> ${opp.min_cgpa} / 10.0<br>
          • <strong>Target Branches:</strong> ${opp.allowed_branches}<br>
          • <strong>Eligible Graduation Batches:</strong> Class of ${opp.grad_years}
        </div>
      </div>

      <div style="margin-bottom: 28px;">
        <h4 style="font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 8px;">Required Core Skills</h4>
        <div class="opportunity-tags">
          ${opp.required_skills.split(',').map(s => `<span class="skill-tag" style="background: rgba(0,242,254,0.1); border-color: rgba(0,242,254,0.3); color: #fff;">${s.trim()}</span>`).join('')}
        </div>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; gap: 14px; padding-top: 18px; border-top: 1px solid var(--border-subtle);">
        <button class="btn btn-secondary" id="modal-btn-bookmark">
          ${isBookmarked ? '★ Bookmarked' : '☆ Save Opportunity'}
        </button>
        <button class="btn btn-primary" id="modal-btn-apply" ${isApplied ? 'disabled style="opacity: 0.6; cursor: not-allowed;"' : ''}>
          ${isApplied ? '✓ Application Submitted' : 'Submit Application Now →'}
        </button>
      </div>
    `);

    document.getElementById('modal-btn-bookmark')?.addEventListener('click', () => {
      toggleBookmark(opp.id);
      showOpportunityModal(opp);
    });

    document.getElementById('modal-btn-apply')?.addEventListener('click', () => {
      const ok = applyToOpportunity(opp.id);
      if (ok) closeModal();
    });
  }

  // -------------------------------------------------------------------------
  // 6. ELIGIBILITY ENGINE (INTERACTIVE CALCULATOR)
  // -------------------------------------------------------------------------
  function renderEligibilityEngine() {
    const container = document.getElementById('eligibility-engine-mount');
    if (!container) return;

    const opps = database.tables.opportunities;
    const opp = opps.find(o => o.id === appState.eligibility.selectedOppId) || opps[0];
    const inputs = appState.eligibility;

    // Calculate score
    let score = 0;
    const items = [];

    // CGPA (30 pts)
    if (inputs.cgpa >= opp.min_cgpa) {
      score += 30;
      items.push({ valid: true, text: `CGPA requirement met (${inputs.cgpa} >= ${opp.min_cgpa} minimum)` });
    } else {
      items.push({ valid: false, text: `CGPA (${inputs.cgpa}) is below required minimum (${opp.min_cgpa})` });
    }

    // Branch (25 pts)
    const branchMatched = opp.allowed_branches.toLowerCase().includes(inputs.branch.toLowerCase()) || inputs.branch.toLowerCase().includes('computer') || inputs.branch.toLowerCase().includes('cyber');
    if (branchMatched) {
      score += 25;
      items.push({ valid: true, text: `Branch requirement matched (${inputs.branch})` });
    } else {
      items.push({ valid: false, text: `Branch '${inputs.branch}' not directly prioritized` });
    }

    // Grad year (15 pts)
    const gradMatched = opp.grad_years.includes(String(inputs.gradYear));
    if (gradMatched) {
      score += 15;
      items.push({ valid: true, text: `Graduation year matched (${inputs.gradYear} batch eligible)` });
    } else {
      items.push({ valid: false, text: `Graduation year (${inputs.gradYear}) outside target batch (${opp.grad_years})` });
    }

    // Skills (30 pts)
    const reqList = opp.required_skills.split(',').map(s => s.trim());
    const matched = reqList.filter(s => inputs.skills.includes(s));
    const missing = reqList.filter(s => !inputs.skills.includes(s));
    const skillRatio = reqList.length > 0 ? (matched.length / reqList.length) : 1;
    score += Math.round(skillRatio * 30);

    if (missing.length === 0) {
      items.push({ valid: true, text: `All ${reqList.length} required technical competencies verified` });
    } else {
      items.push({ valid: false, text: `Missing recommended skill: ${missing.join(', ')}` });
    }

    score = Math.min(100, Math.max(0, score));

    const circ = 439.82;
    const offset = circ - (score / 100) * circ;
    let label = 'MATCH';
    if (score >= 85) label = 'HIGHLY ELIGIBLE';
    else if (score >= 60) label = 'MODERATE FIT';
    else label = 'CRITERIA GAP';

    container.innerHTML = `
      <div class="eligibility-container">
        <div class="eligibility-grid">
          <!-- Form -->
          <div>
            <h3 style="font-family: var(--font-display); font-size: 24px; color: #fff; margin-bottom: 20px;">
              Candidate Parameter Simulation
            </h3>

            <div class="eligibility-form-group">
              <label class="form-label">Target Role & Opportunity</label>
              <select id="elig-role-select" class="form-select">
                ${opps.map(o => `
                  <option value="${o.id}" ${o.id === opp.id ? 'selected' : ''}>
                    ${o.company} — ${o.role} (${o.category})
                  </option>
                `).join('')}
              </select>
            </div>

            <div class="eligibility-form-group">
              <label class="form-label">Academic Branch</label>
              <select id="elig-branch-select" class="form-select">
                <option value="Computer Science & Engineering" ${inputs.branch === "Computer Science & Engineering" ? 'selected' : ''}>Computer Science & Engineering</option>
                <option value="Cyber Security" ${inputs.branch === "Cyber Security" ? 'selected' : ''}>Cyber Security (Specialized)</option>
                <option value="Information Technology" ${inputs.branch === "Information Technology" ? 'selected' : ''}>Information Technology</option>
                <option value="Electronics" ${inputs.branch === "Electronics" ? 'selected' : ''}>Electronics & Communication</option>
              </select>
            </div>

            <div class="eligibility-form-group">
              <div class="form-label">
                <span>Cumulative CGPA</span>
                <span class="value" id="cgpa-disp">${Number(inputs.cgpa).toFixed(2)}</span>
              </div>
              <input type="range" id="elig-cgpa-slider" class="custom-range-slider" min="5.0" max="10.0" step="0.05" value="${inputs.cgpa}">
            </div>

            <div class="eligibility-form-group">
              <label class="form-label">Graduation Year</label>
              <select id="elig-grad-select" class="form-select">
                <option value="2026" ${Number(inputs.gradYear) === 2026 ? 'selected' : ''}>2026 (Final Year)</option>
                <option value="2027" ${Number(inputs.gradYear) === 2027 ? 'selected' : ''}>2027 (Pre-Final Year)</option>
                <option value="2028" ${Number(inputs.gradYear) === 2028 ? 'selected' : ''}>2028 (Undergraduate Class)</option>
                <option value="2029" ${Number(inputs.gradYear) === 2029 ? 'selected' : ''}>2029 (Sophomore Class)</option>
              </select>
            </div>

            <div class="eligibility-form-group">
              <label class="form-label">Active Technical Skills (Click to toggle)</label>
              <div class="interactive-skill-picker">
                ${["Python", "Cybersecurity", "Linux", "Networking", "SQL", "Git", "Machine Learning", "Web Development", "Cloud", "Java"].map(sk => {
                  const active = inputs.skills.includes(sk);
                  return `<button type="button" class="skill-toggle-chip ${active ? 'selected' : ''}" data-skill="${sk}">${active ? '✓ ' : '+ '}${sk}</button>`;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Gauge -->
          <div>
            <div class="eligibility-gauge-card">
              <div class="radial-gauge-wrapper">
                <svg class="gauge-svg" viewBox="0 0 160 160">
                  <defs>
                    <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#00f2fe" />
                      <stop offset="50%" stop-color="#4facfe" />
                      <stop offset="100%" stop-color="#6366f1" />
                    </linearGradient>
                  </defs>
                  <circle class="gauge-bg" cx="80" cy="80" r="70" />
                  <circle class="gauge-progress" cx="80" cy="80" r="70" stroke-dasharray="${circ}" stroke-dashoffset="${offset}" />
                </svg>
                <div class="gauge-center-text">
                  <span class="gauge-percent">${score}%</span>
                  <span class="gauge-status">${label}</span>
                </div>
              </div>

              <div style="font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 12px;">
                Assessment for ${opp.company}
              </div>

              <div class="criteria-checklist">
                ${items.map(it => `
                  <div class="criteria-item ${it.valid ? 'valid' : 'warning'}">
                    <span style="font-weight: 800;">${it.valid ? '✓' : '⚠'}</span>
                    <span>${it.text}</span>
                  </div>
                `).join('')}
              </div>

              <div style="margin-top: 24px;">
                <button class="btn btn-primary" style="width: 100%;" id="btn-elig-apply">
                  Apply Now with Verified Score (${score}%)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    container.querySelector('#elig-role-select')?.addEventListener('change', (e) => {
      appState.eligibility.selectedOppId = e.target.value;
      renderEligibilityEngine();
    });

    container.querySelector('#elig-branch-select')?.addEventListener('change', (e) => {
      appState.eligibility.branch = e.target.value;
      renderEligibilityEngine();
    });

    container.querySelector('#elig-cgpa-slider')?.addEventListener('input', (e) => {
      appState.eligibility.cgpa = parseFloat(e.target.value);
      renderEligibilityEngine();
    });

    container.querySelector('#elig-grad-select')?.addEventListener('change', (e) => {
      appState.eligibility.gradYear = parseInt(e.target.value, 10);
      renderEligibilityEngine();
    });

    container.querySelectorAll('.skill-toggle-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const sk = chip.getAttribute('data-skill');
        if (appState.eligibility.skills.includes(sk)) {
          appState.eligibility.skills = appState.eligibility.skills.filter(s => s !== sk);
        } else {
          appState.eligibility.skills.push(sk);
        }
        renderEligibilityEngine();
      });
    });

    container.querySelector('#btn-elig-apply')?.addEventListener('click', () => {
      applyToOpportunity(opp.id, `Simulated with ${score}% verified match score.`);
    });
  }

  // -------------------------------------------------------------------------
  // 7. SKILL UNIVERSE & ROADMAP DRAWER
  // -------------------------------------------------------------------------
  function renderSkillUniverse() {
    const container = document.getElementById('skill-universe-mount');
    if (!container) return;

    const skills = database.tables.skills;
    const positions = [
      { x: 20, y: 18 }, { x: 76, y: 16 }, { x: 12, y: 55 }, { x: 84, y: 52 },
      { x: 26, y: 82 }, { x: 72, y: 80 }, { x: 48, y: 12 }, { x: 50, y: 88 },
      { x: 88, y: 28 }, { x: 10, y: 32 }
    ];

    container.innerHTML = `
      <div class="skill-universe-stage" id="universe-stage">
        <canvas class="skill-constellation-canvas" id="universe-canvas"></canvas>
        <div class="skill-universe-core" id="core-node" title="Click to view core career summary">
          <span style="font-size: 20px; margin-bottom: 2px;">★</span>
          <h3>CAREER READY</h3>
          <span>Core Gateway</span>
        </div>
        ${skills.map((sk, idx) => {
          const pos = positions[idx % positions.length];
          return `
            <div class="skill-orbit-node" style="left: ${pos.x}%; top: ${pos.y}%;" data-skill-id="${sk.id}">
              <span class="node-dot"></span>
              <span>${sk.name}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Canvas Lines
    const canvas = container.querySelector('#universe-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      function drawLines() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        const stage = container.querySelector('#universe-stage');
        const core = container.querySelector('#core-node');
        if (!stage || !core) return;
        const stageR = stage.getBoundingClientRect();
        const coreR = core.getBoundingClientRect();
        const cx = coreR.left + coreR.width / 2 - stageR.left;
        const cy = coreR.top + coreR.height / 2 - stageR.top;

        container.querySelectorAll('.skill-orbit-node').forEach(node => {
          const nr = node.getBoundingClientRect();
          const nx = nr.left + nr.width / 2 - stageR.left;
          const ny = nr.top + nr.height / 2 - stageR.top;
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(0, 242, 254, 0.2)';
          ctx.lineWidth = 1;
          ctx.moveTo(cx, cy);
          ctx.lineTo(nx, ny);
          ctx.stroke();
        });
      }
      setTimeout(drawLines, 100);
      window.addEventListener('resize', drawLines);
    }

    container.querySelectorAll('.skill-orbit-node').forEach(node => {
      node.addEventListener('click', () => {
        const sid = node.getAttribute('data-skill-id');
        const sk = skills.find(s => s.id === sid);
        if (sk) showSkillModal(sk);
      });
    });

    container.querySelector('#core-node')?.addEventListener('click', () => {
      showToast('Career Ready Core: All 10 technical competencies active in SQLite database!');
    });
  }

  function showSkillModal(sk) {
    const roadmaps = {
      "Cybersecurity": ["OSI & TCP/IP Packet Dissection", "Linux System Hardening & PAM Auth", "OWASP Top 10 Exploitation Labs", "Penetration Testing & Python Scripts"],
      "Python": ["OOP Design Patterns & Data Structures", "Socket Programming & Multi-threading", "NumPy & Pandas Data Heuristics", "FastAPI Asynchronous Microservices"],
      "Linux": ["Bash Shell Scripting & CLI Fluency", "User Permissions & PAM Security", "Systemd Services & Cron Automation", "eBPF Tracing & Kernel Logs"],
      "Networking": ["Subnetting & Dynamic Routing (OSPF/BGP)", "TLS Handshake & Cryptography", "Firewalls, NAT & Tunneling", "Software-Defined Networking"],
      "Machine Learning": ["Linear Algebra & Gradient Descent", "Feature Extraction & NLP Vectorizers", "PyTorch Neural Architecture", "Model Evaluation & Deployment"],
      "Web Development": ["Semantic HTML5 & Modern Flex/Grid", "ESNext Reactive State Architectures", "REST APIs & JWT Authentication", "Web Security (XSS/CSRF Defenses)"],
      "SQL": ["Relational Schemas & Normalization", "Complex Joins, Indexes & Query Plans", "ACID Transactions & Locking", "Stored Procedures & Partitioning"],
      "Cloud": ["Containerization (Docker)", "Kubernetes Orchestration & Ingress", "Infrastructure as Code (Terraform)", "Cloud Observability & Security"],
      "Java": ["OOP Foundations & Memory Models", "Collections & Concurrency Threads", "Spring Boot Enterprise APIs", "JUnit Testing & Microservices"],
      "Git": ["GitFlow & Trunk Branching", "Rebase, Cherry-Pick & Merge Conflicts", "GitHub Actions CI/CD Automations", "Signed Commits & SSH Key Hygiene"]
    };

    const steps = roadmaps[sk.name] || ["Foundations", "Intermediate Practice", "Advanced Projects", "Production Deployment"];

    openModal(`
      <button class="modal-close-btn" aria-label="Close modal">✕</button>
      <span class="section-tag" style="margin-bottom: 8px;">${sk.category} Domain</span>
      <h3 style="font-family: var(--font-display); font-size: 30px; font-weight: 800; color: #fff; margin-bottom: 6px;">
        ${sk.name}
      </h3>
      <div style="background: rgba(0,242,254,0.06); border: 1px solid rgba(0,242,254,0.2); border-radius: var(--radius-md); padding: 16px; margin: 20px 0; display: flex; align-items: center; justify-content: space-between;">
        <span style="font-size: 13px; color: var(--text-secondary);">Student Mastery Level</span>
        <span style="font-family: var(--font-display); font-size: 20px; font-weight: 800; color: var(--accent-cyan);">${sk.domain_level} (${sk.mastery_percent}%)</span>
      </div>

      <h4 style="font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 12px;">Industry Learning Roadmap</h4>
      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px;">
        ${steps.map((st, i) => `
          <div style="display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 12px 16px; border-radius: var(--radius-sm);">
            <span style="width: 22px; height: 22px; border-radius: 50%; background: var(--grad-primary); color: #050811; font-size: 11px; font-weight: 800; display: flex; align-items: center; justify-content: center;">${i + 1}</span>
            <span style="font-size: 13.5px; color: #e2e8f0;">${st}</span>
          </div>
        `).join('')}
      </div>

      <div style="display: flex; justify-content: flex-end;">
        <button class="btn btn-primary" id="btn-skill-filter-opps">Explore Linked Jobs in ${sk.name} →</button>
      </div>
    `);

    document.getElementById('btn-skill-filter-opps')?.addEventListener('click', () => {
      appState.searchQuery = sk.name;
      const sInput = document.getElementById('main-search-input');
      if (sInput) sInput.value = sk.name;
      closeModal();
      document.getElementById('opportunities-section')?.scrollIntoView({ behavior: 'smooth' });
      renderOpportunities();
    });
  }

  // -------------------------------------------------------------------------
  // 8. APPLICATION TRACKER & PIPELINE
  // -------------------------------------------------------------------------
  function renderApplicationTracker() {
    const container = document.getElementById('application-tracker-mount');
    if (!container) return;

    const apps = database.tables.applications;
    const stages = ["Applied", "Screening", "Shortlisted", "Interview", "Selected"];

    container.innerHTML = `
      <div style="display: flex; justify-content: flex-end; margin-bottom: 16px;">
        <button class="btn btn-cyan-outline btn-sm" id="btn-add-custom-app">
          + Record New Application
        </button>
      </div>

      ${apps.length === 0 ? `
        <div class="card-opportunity" style="text-align: center; padding: 50px 20px;">
          <h3 style="font-family: var(--font-display); font-size: 24px; color: #fff; margin-bottom: 8px;">No Active Applications In Pipeline</h3>
          <p style="color: var(--text-secondary); margin-bottom: 20px;">Discover vetted internships above and submit your first application.</p>
          <button class="btn btn-primary" id="btn-empty-opps">Explore Available Openings</button>
        </div>
      ` : `
        <div class="tracker-board">
          ${apps.map(app => `
            <div class="application-journey-card">
              <div>
                <div style="font-size: 11px; text-transform: uppercase; color: var(--accent-cyan); font-weight: 700; letter-spacing: 0.05em; margin-bottom: 4px;">
                  Applied on ${app.applied_date}
                </div>
                <h4 style="font-family: var(--font-display); font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 4px;">
                  ${app.role}
                </h4>
                <div style="font-size: 14px; color: var(--text-secondary);">${app.company}</div>
                <div style="font-size: 12px; color: var(--text-muted); margin-top: 6px; font-style: italic;">"${app.notes}"</div>
              </div>

              <div class="pipeline-stepper">
                ${stages.map((stName, idx) => {
                  let sClass = '';
                  if (idx < app.status_stage) sClass = 'completed';
                  else if (idx === app.status_stage) sClass = 'current';
                  return `
                    <div class="pipeline-step ${sClass}" title="Stage ${idx + 1}: ${stName}">
                      <div class="step-circle">${idx < app.status_stage ? '✓' : idx + 1}</div>
                      <span class="step-label">${stName}</span>
                    </div>
                  `;
                }).join('')}
              </div>

              <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                <span class="section-tag" style="margin-bottom: 0; padding: 4px 12px; font-size: 11px;">
                  ${app.status.toUpperCase()}
                </span>
                ${app.status_stage < stages.length - 1 ? `
                  <button class="btn btn-secondary btn-sm btn-advance-app" data-app-id="${app.id}">
                    Advance Stage →
                  </button>
                ` : `
                  <span style="font-size: 12px; color: var(--accent-emerald); font-weight: 700;">🎉 Offer Finalized</span>
                `}
              </div>
            </div>
          `).join('')}
        </div>
      `}
    `;

    container.querySelector('#btn-add-custom-app')?.addEventListener('click', showAddApplicationModal);

    container.querySelectorAll('.btn-advance-app').forEach(btn => {
      btn.addEventListener('click', () => {
        const aid = btn.getAttribute('data-app-id');
        advanceApplication(aid);
      });
    });

    container.querySelector('#btn-empty-opps')?.addEventListener('click', () => {
      document.getElementById('opportunities-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  function showAddApplicationModal() {
    openModal(`
      <button class="modal-close-btn" aria-label="Close modal">✕</button>
      <h3 style="font-family: var(--font-display); font-size: 26px; font-weight: 800; color: #fff; margin-bottom: 8px;">
        Record Custom Application
      </h3>
      <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 20px;">
        Log an external internship or placement drive into the SQLite <code>applications</code> table.
      </p>

      <form id="form-new-app">
        <div style="margin-bottom: 14px;">
          <label class="form-label">Company Name</label>
          <input type="text" id="new-app-company" class="form-input" placeholder="e.g. Google, Microsoft, ISRO" required>
        </div>
        <div style="margin-bottom: 14px;">
          <label class="form-label">Role Title</label>
          <input type="text" id="new-app-role" class="form-input" placeholder="e.g. Cyber Security Analyst Intern" required>
        </div>
        <div style="margin-bottom: 14px;">
          <label class="form-label">Initial Status</label>
          <select id="new-app-status" class="form-select">
            <option value="0">Applied</option>
            <option value="1">Screening</option>
            <option value="2">Shortlisted</option>
            <option value="3">Interview</option>
          </select>
        </div>
        <div style="margin-bottom: 24px;">
          <label class="form-label">Candidate Notes</label>
          <input type="text" id="new-app-notes" class="form-input" placeholder="e.g. Applied through referral / campus portal">
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px;">
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('global-modal-backdrop').classList.remove('open')">Cancel</button>
          <button type="submit" class="btn btn-primary">Save to SQLite DB</button>
        </div>
      </form>
    `);

    document.getElementById('form-new-app')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const company = document.getElementById('new-app-company').value.trim();
      const role = document.getElementById('new-app-role').value.trim();
      const stageIdx = parseInt(document.getElementById('new-app-status').value, 10);
      const notes = document.getElementById('new-app-notes').value.trim() || 'Recorded custom application.';

      const stages = ["Applied", "Screening", "Shortlisted", "Interview", "Selected"];
      const newApp = {
        id: `app_${Date.now()}`,
        opportunity_id: `custom_${Date.now()}`,
        company,
        role,
        applied_date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: stages[stageIdx],
        status_stage: stageIdx,
        notes
      };

      database.tables.applications.unshift(newApp);
      database.save();
      showToast(`Application for ${company} saved to SQLite! 🚀`);
      closeModal();
      renderAll();
    });
  }

  // -------------------------------------------------------------------------
  // 9. DEADLINE RADAR & LIVE COUNTDOWNS
  // -------------------------------------------------------------------------
  function renderDeadlineRadar() {
    const container = document.getElementById('deadline-radar-mount');
    if (!container) return;

    const sorted = [...database.tables.opportunities].sort((a, b) => new Date(a.deadline) - new Date(b.deadline)).slice(0, 3);

    container.innerHTML = `
      <div class="deadline-cards-grid">
        ${sorted.map(opp => {
          const diff = new Date(opp.deadline) - Date.now();
          const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
          const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
          const mins = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
          const secs = Math.max(0, Math.floor((diff / 1000) % 60));
          const isUrgent = days <= 5;

          return `
            <div class="deadline-card ${isUrgent ? 'urgent' : ''}" data-opp-id="${opp.id}">
              <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                  <span class="section-tag" style="margin-bottom: 0; font-size: 11px; ${isUrgent ? 'color: var(--accent-rose); border-color: rgba(244,63,94,0.4);' : ''}">
                    ${days <= 2 ? 'URGENT • 2 DAYS LEFT' : `${days.toString().padStart(2, '0')} DAYS LEFT`}
                  </span>
                  <span style="font-family: var(--font-mono); font-size: 13px; font-weight: 700; color: #fff;">
                    ${opp.deadline_formatted}
                  </span>
                </div>

                <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">${opp.company}</div>
                <h4 style="font-family: var(--font-display); font-size: 21px; font-weight: 700; color: #fff; margin-bottom: 12px;">${opp.role}</h4>

                <div class="deadline-timer-group" id="radar-timer-${opp.id}">
                  <div class="time-box"><div class="time-num t-days">${days.toString().padStart(2, '0')}</div><div class="time-unit">Days</div></div>
                  <div class="time-box"><div class="time-num t-hours">${hours.toString().padStart(2, '0')}</div><div class="time-unit">Hours</div></div>
                  <div class="time-box"><div class="time-num t-mins">${mins.toString().padStart(2, '0')}</div><div class="time-unit">Mins</div></div>
                  <div class="time-box"><div class="time-num t-secs" style="color: var(--accent-cyan);">${secs.toString().padStart(2, '0')}</div><div class="time-unit">Secs</div></div>
                </div>
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border-subtle);">
                <span style="font-weight: 800; color: #fff;">${opp.stipend} <span style="font-size: 11px; color: var(--text-muted);">/mo</span></span>
                <button class="btn btn-primary btn-sm btn-radar-apply" data-opp-id="${opp.id}">Apply Before Window Closes →</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.querySelectorAll('.btn-radar-apply').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const oid = btn.getAttribute('data-opp-id');
        const opp = database.tables.opportunities.find(o => o.id === oid);
        if (opp) showOpportunityModal(opp);
      });
    });

    container.querySelectorAll('.deadline-card').forEach(card => {
      card.addEventListener('click', () => {
        const oid = card.getAttribute('data-opp-id');
        const opp = database.tables.opportunities.find(o => o.id === oid);
        if (opp) showOpportunityModal(opp);
      });
    });
  }

  setInterval(() => {
    const container = document.getElementById('deadline-radar-mount');
    if (!container) return;
    const opps = database.tables.opportunities;
    opps.forEach(opp => {
      const box = container.querySelector(`#radar-timer-${opp.id}`);
      if (box) {
        const diff = new Date(opp.deadline) - Date.now();
        const d = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
        const h = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
        const m = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
        const s = Math.max(0, Math.floor((diff / 1000) % 60));
        const ed = box.querySelector('.t-days');
        const eh = box.querySelector('.t-hours');
        const em = box.querySelector('.t-mins');
        const es = box.querySelector('.t-secs');
        if (ed) ed.textContent = d.toString().padStart(2, '0');
        if (eh) eh.textContent = h.toString().padStart(2, '0');
        if (em) em.textContent = m.toString().padStart(2, '0');
        if (es) es.textContent = s.toString().padStart(2, '0');
      }
    });
  }, 1000);

  // -------------------------------------------------------------------------
  // 10. STUDENT PROFILE & EDIT PROFILE MODAL
  // -------------------------------------------------------------------------
  function renderStudentProfile() {
    const container = document.getElementById('student-profile-mount');
    if (!container) return;

    const profile = database.tables.student_profile[0] || {};
    const apps = database.tables.applications;
    const certs = database.tables.certifications;
    const projects = database.tables.projects;

    const shortlistedCount = apps.filter(a => a.status === 'Shortlisted' || a.status_stage >= 2).length;
    const interviewCount = apps.filter(a => a.status === 'Interview' || a.status_stage >= 3).length;

    const circ = 238.76;
    const offset = circ - (profile.profile_completion / 100) * circ;

    container.innerHTML = `
      <div class="profile-hero-card">
        <div class="profile-avatar-large">DK</div>
        <div class="profile-info">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 6px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <h2 style="margin-bottom: 0;">${profile.name}</h2>
              <span class="profile-badge highlight">✓ Verified Candidate</span>
            </div>
            <button class="btn btn-secondary btn-sm" id="btn-edit-student-profile">
              ✎ Edit Profile Data
            </button>
          </div>
          <div class="profile-degree">
            ${profile.degree} • <span style="color: #fff;">${profile.specialization}</span>
          </div>
          <div class="profile-meta-badges">
            <span class="profile-badge">CGPA: <strong style="color: #fff;">${profile.cgpa}</strong> / 10.0</span>
            <span class="profile-badge">Class of <strong style="color: #fff;">${profile.graduation_year}</strong></span>
            <span class="profile-badge">${profile.institution}</span>
            <span class="profile-badge">📍 ${profile.location}</span>
          </div>
        </div>

        <div class="profile-completion-ring">
          <div style="position: relative; width: 90px; height: 90px; margin: 0 auto 8px;">
            <svg style="transform: rotate(-90deg); width: 100%; height: 100%;" viewBox="0 0 90 90">
              <circle cx="45" cy="45" r="38" stroke="rgba(255,255,255,0.08)" stroke-width="7" fill="none" />
              <circle cx="45" cy="45" r="38" stroke="url(#gauge-gradient)" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${offset}" />
            </svg>
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-family: var(--font-display); font-size: 20px; font-weight: 800; color: #fff;">
              ${profile.profile_completion}%
            </div>
          </div>
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; color: var(--text-secondary);">
            Profile Strength
          </span>
        </div>
      </div>

      <!-- Metric Pills -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 40px;">
        <div class="card-opportunity" style="padding: 20px;">
          <span style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Active Pipeline</span>
          <div style="font-family: var(--font-display); font-size: 36px; font-weight: 800; color: #fff; margin: 4px 0;">${apps.length}</div>
          <span style="font-size: 12px; color: var(--accent-cyan);">Applications Tracked</span>
        </div>

        <div class="card-opportunity" style="padding: 20px;">
          <span style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Shortlisted</span>
          <div style="font-family: var(--font-display); font-size: 36px; font-weight: 800; color: var(--accent-emerald); margin: 4px 0;">${shortlistedCount}</div>
          <span style="font-size: 12px; color: var(--text-secondary);">High Match Priority</span>
        </div>

        <div class="card-opportunity" style="padding: 20px;">
          <span style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Interviews</span>
          <div style="font-family: var(--font-display); font-size: 36px; font-weight: 800; color: var(--accent-indigo); margin: 4px 0;">${interviewCount}</div>
          <span style="font-size: 12px; color: var(--text-secondary);">Technical Evaluation</span>
        </div>

        <div class="card-opportunity" style="padding: 20px;">
          <span style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Saved Bookmarks</span>
          <div style="font-family: var(--font-display); font-size: 36px; font-weight: 800; color: var(--accent-amber); margin: 4px 0;">${appState.bookmarks.length}</div>
          <span style="font-size: 12px; color: var(--text-secondary);">Tracked Openings</span>
        </div>
      </div>

      <!-- Verified NPTEL Certifications -->
      <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
          <h3 style="font-family: var(--font-display); font-size: 24px; color: #fff;">Verified NPTEL Certifications</h3>
          <span class="section-tag" style="margin-bottom: 0;">National Registry Verified</span>
        </div>
        <div class="showcase-grid">
          ${certs.map(c => `
            <div class="showcase-card" style="cursor: pointer;" onclick="alert('Credential ID: ${c.credential_id}\\nIssued by: ${c.issuer}\\nGrade: ${c.grade}')">
              <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                  <span class="profile-badge highlight">${c.grade}</span>
                  <span style="font-size: 12px; color: var(--text-muted);">${c.issue_date}</span>
                </div>
                <h4 style="font-family: var(--font-display); font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 4px;">${c.name}</h4>
                <p style="font-size: 13px; color: var(--text-secondary);">${c.issuer}</p>
              </div>
              <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border-subtle); font-size: 12px; color: var(--accent-emerald);">
                ✓ ID: ${c.credential_id} • Authenticated in SQLite
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Featured Projects -->
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
          <h3 style="font-family: var(--font-display); font-size: 24px; color: #fff;">Featured Engineering Projects</h3>
          <span class="section-tag" style="margin-bottom: 0;">Portfolio Repositories</span>
        </div>
        <div class="showcase-grid">
          ${projects.map(p => `
            <div class="showcase-card">
              <div>
                <h4 style="font-family: var(--font-display); font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 8px;">${p.title}</h4>
                <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 14px;">${p.description}</p>
                <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px;">
                  ${p.tech_stack.split(',').map(t => `<span class="skill-tag" style="font-size: 11px;">${t.trim()}</span>`).join('')}
                </div>
              </div>
              <div style="padding-top: 12px; border-top: 1px solid var(--border-subtle); font-size: 12px; color: var(--accent-cyan); font-weight: 600;">
                ★ ${p.impact}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.querySelector('#btn-edit-student-profile')?.addEventListener('click', () => {
      showEditProfileModal(profile);
    });
  }

  function showEditProfileModal(profile) {
    openModal(`
      <button class="modal-close-btn" aria-label="Close modal">✕</button>
      <h3 style="font-family: var(--font-display); font-size: 26px; font-weight: 800; color: #fff; margin-bottom: 8px;">
        Edit Student Profile Data
      </h3>
      <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 24px;">
        Updates will be committed directly to the SQLite <code>student_profile</code> table.
      </p>

      <form id="form-edit-profile">
        <div style="margin-bottom: 16px;">
          <label class="form-label">Full Name</label>
          <input type="text" id="prof-name" class="form-input" value="${profile.name}" required>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
          <div>
            <label class="form-label">Cumulative CGPA</label>
            <input type="number" step="0.01" min="0" max="10" id="prof-cgpa" class="form-input" value="${profile.cgpa}" required>
          </div>
          <div>
            <label class="form-label">Graduation Year</label>
            <input type="number" id="prof-grad" class="form-input" value="${profile.graduation_year}" required>
          </div>
        </div>
        <div style="margin-bottom: 16px;">
          <label class="form-label">Degree & Specialization</label>
          <input type="text" id="prof-spec" class="form-input" value="${profile.specialization}" required>
        </div>
        <div style="margin-bottom: 24px;">
          <label class="form-label">Institution / College</label>
          <input type="text" id="prof-inst" class="form-input" value="${profile.institution}" required>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px;">
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('global-modal-backdrop').classList.remove('open')">Cancel</button>
          <button type="submit" class="btn btn-primary">Save to SQLite Database</button>
        </div>
      </form>
    `);

    document.getElementById('form-edit-profile')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('prof-name').value;
      const cgpa = parseFloat(document.getElementById('prof-cgpa').value);
      const grad = parseInt(document.getElementById('prof-grad').value, 10);
      const spec = document.getElementById('prof-spec').value;
      const inst = document.getElementById('prof-inst').value;

      database.tables.student_profile[0] = {
        ...database.tables.student_profile[0],
        name, cgpa, graduation_year: grad, specialization: spec, institution: inst
      };
      database.save();

      appState.eligibility.cgpa = cgpa;
      appState.eligibility.gradYear = grad;

      showToast('Student profile updated in SQLite database! 💾', '✓');
      closeModal();
      renderAll();
    });
  }

  // -------------------------------------------------------------------------
  // 11. SQLITE DATABASE TERMINAL & QUERY RUNNER
  // -------------------------------------------------------------------------
  function showSqliteConsole() {
    openModal(`
      <button class="modal-close-btn" aria-label="Close modal">✕</button>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 26px;">🗄️</span>
          <div>
            <h3 style="font-family: var(--font-display); font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 2px;">
              SQLite Database Terminal & SQL Inspector
            </h3>
            <span style="font-size: 12px; color: var(--accent-cyan); font-family: var(--font-mono);">
              Engine: InternTrack Relational SQLite V3 • LocalStorage Synced
            </span>
          </div>
        </div>
        <button class="btn btn-secondary btn-sm" id="btn-db-reset-seed">Reset Database</button>
      </div>

      <!-- Quick Preset Queries -->
      <div style="margin-bottom: 14px;">
        <span style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 6px; display: block;">Quick SQL Presets</span>
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
          <button class="filter-pill sql-preset" data-sql="SELECT * FROM opportunities WHERE stipend_numeric >= 20000;">💰 High Stipends (&gt;=₹20k)</button>
          <button class="filter-pill sql-preset" data-sql="SELECT company, role, status, applied_date FROM applications;">📑 Active Applications</button>
          <button class="filter-pill sql-preset" data-sql="SELECT name, category, mastery_percent FROM skills ORDER BY mastery_percent DESC;">🎯 Skills by Mastery</button>
          <button class="filter-pill sql-preset" data-sql="SELECT * FROM student_profile;">👤 Student Profile</button>
          <button class="filter-pill sql-preset" data-sql="SELECT * FROM certifications;">📜 NPTEL Certs</button>
          <button class="filter-pill sql-preset" data-sql="SHOW TABLES;">📊 SHOW TABLES</button>
        </div>
      </div>

      <!-- SQL Input Box -->
      <div style="margin-bottom: 14px;">
        <textarea id="sql-query-input" style="width: 100%; height: 80px; background: #050811; border: 1px solid var(--border-glow); border-radius: var(--radius-sm); color: #00f2fe; font-family: var(--font-mono); font-size: 13.5px; padding: 12px; outline: none; resize: vertical;" placeholder="Type SQLite query here, e.g. SELECT * FROM opportunities;"></textarea>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <span id="sql-status-msg" style="font-size: 12px; color: var(--text-muted); font-family: var(--font-mono);">Ready to execute SQL statement.</span>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-sm" id="btn-export-db-json">Export JSON</button>
          <button class="btn btn-primary btn-sm" id="btn-run-sql">Run SQL Query ⚡</button>
        </div>
      </div>

      <!-- Results Table Viewport -->
      <div id="sql-results-viewport" style="max-height: 260px; overflow: auto; background: #060914; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px;">
        <div style="color: var(--text-dim); text-align: center; padding: 30px; font-size: 13px;">Execute a query above to inspect live tabular results.</div>
      </div>
    `);

    const sqlInput = document.getElementById('sql-query-input');
    const statusMsg = document.getElementById('sql-status-msg');
    const viewport = document.getElementById('sql-results-viewport');

    function executeAndRender(query) {
      const res = database.executeSQL(query);
      if (!res.success) {
        statusMsg.innerHTML = `<span style="color: var(--accent-rose);">Error: ${res.error}</span>`;
        viewport.innerHTML = `<div style="color: var(--accent-rose); padding: 16px; font-family: var(--font-mono); font-size: 13px;">❌ ${res.error}</div>`;
        return;
      }

      statusMsg.innerHTML = `<span style="color: var(--accent-emerald);">✓ Success • ${res.rows ? res.rows.length : res.rowsAffected} row(s) in ${res.executionTimeMs}ms</span>`;

      if (res.rows && res.rows.length > 0) {
        viewport.innerHTML = `
          <table style="width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 12px; color: #e2e8f0; text-align: left;">
            <thead>
              <tr style="background: rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.1);">
                ${res.columns.map(c => `<th style="padding: 8px 12px; color: var(--accent-cyan); text-transform: uppercase;">${c}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${res.rows.map(r => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                  ${res.columns.map(c => `<td style="padding: 7px 12px; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${r[c] !== null && r[c] !== undefined ? r[c] : 'NULL'}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      } else if (res.rows && res.rows.length === 0) {
        viewport.innerHTML = `<div style="color: var(--text-muted); padding: 20px; text-align: center;">Query returned 0 rows.</div>`;
      } else {
        viewport.innerHTML = `<div style="color: var(--accent-emerald); padding: 20px; text-align: center;">${res.message}</div>`;
        renderAll();
      }
    }

    document.getElementById('btn-run-sql')?.addEventListener('click', () => {
      executeAndRender(sqlInput.value);
    });

    document.querySelectorAll('.sql-preset').forEach(pill => {
      pill.addEventListener('click', () => {
        const query = pill.getAttribute('data-sql');
        sqlInput.value = query;
        executeAndRender(query);
      });
    });

    document.getElementById('btn-db-reset-seed')?.addEventListener('click', () => {
      database.seed();
      showToast('SQLite database re-seeded to default records!');
      executeAndRender('SHOW TABLES;');
      renderAll();
    });

    document.getElementById('btn-export-db-json')?.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(database.tables, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "interntrack_sqlite_export.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Database exported as JSON! 📥');
    });

    sqlInput.value = 'SELECT * FROM opportunities;';
    executeAndRender(sqlInput.value);
  }

  // -------------------------------------------------------------------------
  // 12. NOTIFICATIONS DRAWER
  // -------------------------------------------------------------------------
  function showNotificationsModal() {
    openModal(`
      <button class="modal-close-btn" aria-label="Close modal">✕</button>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <h3 style="font-family: var(--font-display); font-size: 24px; font-weight: 800; color: #fff;">
          Campus Placement Alerts
        </h3>
        <span class="section-tag" style="margin-bottom: 0;">${appState.notifications.length} Unread</span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
        ${appState.notifications.map(n => `
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; display: flex; align-items: flex-start; gap: 14px;">
            <span style="font-size: 20px; margin-top: 2px;">
              ${n.type === 'success' ? '🎉' : (n.type === 'warning' ? '⏰' : '📜')}
            </span>
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                <h4 style="font-size: 15px; font-weight: 700; color: #fff;">${n.title}</h4>
                <span style="font-size: 11px; color: var(--text-muted);">${n.time}</span>
              </div>
              <p style="font-size: 13.5px; color: var(--text-secondary); margin-top: 4px;">${n.text}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="display: flex; justify-content: flex-end;">
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('global-modal-backdrop').classList.remove('open')">Dismiss All</button>
      </div>
    `);
  }

  // -------------------------------------------------------------------------
  // 13. MASTER RENDER & EVENT REGISTRATION
  // -------------------------------------------------------------------------
  function renderAll() {
    renderOpportunities();
    renderEligibilityEngine();
    renderSkillUniverse();
    renderApplicationTracker();
    renderDeadlineRadar();
    renderStudentProfile();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHeroCanvas();
    renderAll();

    // Navbar scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) navbar?.classList.add('scrolled');
      else navbar?.classList.remove('scrolled');
    });

    // Anchor navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const tid = link.getAttribute('href');
        if (tid && tid.startsWith('#')) {
          e.preventDefault();
          document.querySelector(tid)?.scrollIntoView({ behavior: 'smooth' });
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    });

    // Search bar
    const searchInput = document.getElementById('main-search-input');
    searchInput?.addEventListener('input', (e) => {
      appState.searchQuery = e.target.value;
      renderOpportunities();
    });

    // Category pills
    document.querySelectorAll('.filter-category-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.filter-category-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        appState.selectedCategory = pill.getAttribute('data-cat');
        renderOpportunities();
      });
    });

    // Work mode & Sort selects
    document.getElementById('filter-workmode-select')?.addEventListener('change', (e) => {
      appState.selectedWorkMode = e.target.value;
      renderOpportunities();
    });

    document.getElementById('filter-sort-select')?.addEventListener('change', (e) => {
      appState.selectedSort = e.target.value;
      renderOpportunities();
    });

    // Nav Action buttons
    document.getElementById('nav-search-shortcut')?.addEventListener('click', () => {
      document.getElementById('opportunities-section')?.scrollIntoView({ behavior: 'smooth' });
      searchInput?.focus();
      showToast('Search mode active (Type to filter)', '🔍');
    });

    document.getElementById('nav-notif-btn')?.addEventListener('click', showNotificationsModal);

    document.getElementById('nav-profile-trigger')?.addEventListener('click', () => {
      document.getElementById('profile-section')?.scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('btn-nav-get-started')?.addEventListener('click', () => {
      document.getElementById('eligibility-section')?.scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('nav-sqlite-btn')?.addEventListener('click', showSqliteConsole);
    document.getElementById('floating-sqlite-btn')?.addEventListener('click', showSqliteConsole);

    document.getElementById('btn-hero-explore')?.addEventListener('click', () => {
      document.getElementById('opportunities-section')?.scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('btn-hero-track')?.addEventListener('click', () => {
      document.getElementById('applications-section')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Hero Floating Cards Clicks
    document.querySelector('.card-main-profile')?.addEventListener('click', () => {
      document.getElementById('profile-section')?.scrollIntoView({ behavior: 'smooth' });
    });

    document.querySelector('.card-match-badge')?.addEventListener('click', () => {
      document.getElementById('eligibility-section')?.scrollIntoView({ behavior: 'smooth' });
    });

    document.querySelector('.card-shortlisted')?.addEventListener('click', () => {
      document.getElementById('applications-section')?.scrollIntoView({ behavior: 'smooth' });
    });

    document.querySelector('.card-stipend')?.addEventListener('click', () => {
      document.getElementById('opportunities-section')?.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('filter-sort-select').value = 'stipend';
      appState.selectedSort = 'stipend';
      renderOpportunities();
      showToast('Sorted by highest stipend! 💰');
    });

    document.querySelector('.card-deadline-float')?.addEventListener('click', () => {
      document.getElementById('deadlines-section')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('opportunities-section')?.scrollIntoView({ behavior: 'smooth' });
        searchInput?.focus();
        showToast('Search mode activated (Ctrl+K)', '🔍');
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        showSqliteConsole();
      }
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    // Backdrop click
    const backdrop = document.getElementById('global-modal-backdrop');
    backdrop?.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });

    console.log('⚡ InternTrack fully initialized with SQLite Relational DB and interactive UI suite.');
  });

})();
