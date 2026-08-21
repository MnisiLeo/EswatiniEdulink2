import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  School,
  Search,
  ShieldCheck,
  Users,
  GraduationCap,
  Wallet,
  MessageSquare,
  Menu,
  X,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  LogOut,
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  Receipt,
  Settings,
  Boxes,
  FileText,
  UserPlus,
  CalendarDays,
  Upload,
  ClipboardList,
  UserCheck,
  XCircle,
  Eye
} from "lucide-react";
import "./styles.css";

/* =========================================================
   EDULINK ESWATINI
   Prototype / Demo data only
   ========================================================= */

const PASSWORD = "demo123";
const STORAGE_KEY = "edulink-eswatini-demo";

const ROLE_PERMISSIONS = {
  "System Admin": [
    "dashboard",
    "schools",
    "settings"
  ],

  Principal: [
    "dashboard",
    "admissions",
    "students",
    "teachers",
    "attendance",
    "marks",
    "finance",
    "spaces",
    "resources",
    "notifications",
    "calendar",
    "reports",
    "settings"
  ],

  "Deputy Principal": [
    "dashboard",
    "admissions",
    "students",
    "teachers",
    "attendance",
    "marks",
    "finance",
    "spaces",
    "resources",
    "notifications",
    "calendar",
    "reports"
  ],

  Teacher: [
    "dashboard",
    "students",
    "attendance",
    "marks",
    "calendar"
  ],

  Accountant: [
    "dashboard",
    "finance"
  ],

  Secretary: [
    "dashboard",
    "notifications",
    "calendar"
  ],

  Parent: [
    "dashboard",
    "schools",
    "children",
    "applications",
    "attendance",
    "marks",
    "fees",
    "notifications"
  ]
};

const NAVIGATION = {
  dashboard: ["Overview", LayoutDashboard],
  schools: ["School Management", School],
  admissions: ["Applications", FileText],
  students: ["Students", Users],
  teachers: ["Teachers", GraduationCap],
  attendance: ["Attendance", CalendarCheck],
  marks: ["Marks & Performance", BookOpen],
  finance: ["Finance", Wallet],
  spaces: ["Available Spaces", Boxes],
  resources: ["Resources", Boxes],
  notifications: ["Notifications", MessageSquare],
  calendar: ["School Calendar", CalendarDays],
  children: ["My Children", Users],
  applications: ["My Applications", FileText],
  fees: ["School Fees", Receipt],
  reports: ["Reports", FileText],
  settings: ["Settings", Settings]
};

const DEMO_ACCOUNTS = {
  "parent@demo.sz": {
    role: "Parent",
    name: "Demo Parent",
    schoolId: "S1"
  },

  "teacher@demo.sz": {
    role: "Teacher",
    name: "Mr. M. Nkosi",
    schoolId: "S1",
    subjects: ["Mathematics", "English"],
    grades: ["Form 1", "Form 2"]
  },

  "principal@demo.sz": {
    role: "Principal",
    name: "Dr. J. Dlamini",
    schoolId: "S1"
  },

  "deputy@demo.sz": {
    role: "Deputy Principal",
    name: "Mr. B. Mamba",
    schoolId: "S1"
  },

  "accountant@demo.sz": {
    role: "Accountant",
    name: "Ms. P. Mamba",
    schoolId: "S1"
  },

  "secretary@demo.sz": {
    role: "Secretary",
    name: "Mrs. S. Hlophe",
    schoolId: "S1"
  },

  "admin@demo.sz": {
    role: "System Admin",
    name: "EduLink Administrator"
  }
};

const INITIAL_DATA = {
  schools: [
    {
      id: "S1",
      name: "Hermann Gmeiner High School",
      centre: "3333",
      location: "Manzini",
      type: "High School",
      fees: 3000,
      status: "APPROVED",
      admission: "OPEN",
      spaces: {
        "Form 1": 20,
        "Form 2": 10,
        "Form 3": 15,
        "Form 4": 12,
        "Form 5": 13
      },
      staff: [
        {
          name: "Dr. J. Dlamini",
          role: "Principal"
        },
        {
          name: "Mr. B. Mamba",
          role: "Deputy Principal"
        },
        {
          name: "Mr. M. Nkosi",
          role: "Teacher",
          subjects: ["Mathematics", "English"],
          grades: ["Form 1", "Form 2"]
        },
        {
          name: "Ms. P. Mamba",
          role: "Accountant"
        },
        {
          name: "Mrs. S. Hlophe",
          role: "Secretary"
        }
      ]
    },

    {
      id: "S2",
      name: "Mbabane Valley Secondary School",
      centre: "4444",
      location: "Mbabane",
      type: "High School",
      fees: 2800,
      status: "APPROVED",
      admission: "OPEN",
      spaces: {
        "Form 1": 14,
        "Form 2": 8,
        "Form 3": 11,
        "Form 4": 7,
        "Form 5": 5
      },
      staff: []
    },

    {
      id: "S3",
      name: "Royal Hills Primary School",
      centre: "5555",
      location: "Lobamba",
      type: "Primary School",
      fees: 2200,
      status: "APPROVED",
      admission: "OPEN",
      spaces: {
        "Grade 1": 12,
        "Grade 2": 10,
        "Grade 3": 9,
        "Grade 4": 8,
        "Grade 5": 10,
        "Grade 6": 7,
        "Grade 7": 6
      },
      staff: []
    }
  ],

  pendingSchools: [],

  students: [
    {
      id: "ST-001",
      name: "Lwazi Mamba",
      form: "Form 1",
      schoolId: "S1",
      parentEmail: "parent@demo.sz",
      attendance: 97,
      subjects: {
        Mathematics: {
          test: 80,
          exam: 84,
          comment: "Strong progress"
        },
        English: {
          test: 88,
          exam: 90,
          comment: "Excellent reading"
        },
        Chemistry: {
          test: 78,
          exam: 78,
          comment: "Good work"
        },
        Agriculture: {
          test: 60,
          exam: 60,
          comment: ""
        },
        Physics: {
          test: 100,
          exam: 100,
          comment: "Excellent"
        }
      }
    },

    {
      id: "ST-002",
      name: "Ayanda Hlophe",
      form: "Form 2",
      schoolId: "S1",
      parentEmail: "parent@demo.sz",
      attendance: 94,
      subjects: {
        Mathematics: {
          test: 72,
          exam: 70,
          comment: "Keep practising"
        },
        English: {
          test: 75,
          exam: 78,
          comment: "Good effort"
        }
      }
    },

    {
      id: "ST-003",
      name: "Sibusiso Dlamini",
      form: "Form 3",
      schoolId: "S1",
      parentEmail: "otherparent@demo.sz",
      attendance: 87,
      subjects: {
        Mathematics: {
          test: 61,
          exam: 60,
          comment: "Needs support"
        }
      }
    }
  ],

  applications: [],

  payments: [
    {
      id: "PAY-1",
      studentId: "ST-001",
      parentEmail: "parent@demo.sz",
      amount: 1500,
      status: "APPROVED",
      receipt: "Demo receipt - E1500"
    },

    {
      id: "PAY-2",
      studentId: "ST-002",
      parentEmail: "parent@demo.sz",
      amount: 1000,
      status: "PENDING",
      receipt: "Demo receipt - E1000"
    }
  ],

  notifications: [
    {
      id: "N1",
      title: "Welcome to EduLink Eswatini",
      body: "This is fictional demonstration data.",
      audience: "all"
    }
  ],

  calendar: [
    {
      id: "C1",
      title: "Parent Meeting",
      date: "2026-09-05",
      time: "14:00",
      details: "Main school hall"
    }
  ]
};

/* =========================================================
   HELPERS
   ========================================================= */

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }

    return INITIAL_DATA;
  } catch {
    return INITIAL_DATA;
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function totalSpaces(spaces) {
  return Object.values(spaces || {}).reduce(
    (total, value) => total + Number(value || 0),
    0
  );
}

function studentAverage(student) {
  const values = [];

  Object.values(student.subjects || {}).forEach(subject => {
    if (subject.test !== undefined) {
      values.push(Number(subject.test));
    }

    if (subject.exam !== undefined) {
      values.push(Number(subject.exam));
    }
  });

  if (!values.length) {
    return 0;
  }

  return Math.round(
    values.reduce((a, b) => a + b, 0) / values.length
  );
}

function aggregate(student) {
  let total = 0;

  Object.values(student.subjects || {}).forEach(subject => {
    total += Number(subject.test || 0);
    total += Number(subject.exam || 0);
  });

  return total;
}

function useEduData() {
  const [data, setData] = useState(loadData);

  useEffect(() => {
    saveData(data);
  }, [data]);

  return [data, setData];
}

/* =========================================================
   MAIN APP
   ========================================================= */

function App() {
  const [data, setData] = useEduData();
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [mobile, setMobile] = useState(false);

  if (!user) {
    return (
      <PublicSite
        data={data}
        setData={setData}
        onLogin={setUser}
        page={page}
        setPage={setPage}
      />
    );
  }

  const allowed = ROLE_PERMISSIONS[user.role] || [];

  function logout() {
    setUser(null);
    setPage("home");
  }

  return (
    <div className="app">
      <aside className={`sidebar ${mobile ? "open" : ""}`}>
        <div className="brand">
          <div className="brandIcon">
            <ShieldCheck size={22} />
          </div>

          <div>
            EduLink
            <span>ESWATINI</span>
          </div>
        </div>

        <div className="roleBadge">
          {user.role}
        </div>

        <nav>
          {allowed.map(key => {
            const item = NAVIGATION[key];

            if (!item) {
              return null;
            }

            const Label = item[0];
            const Icon = item[1];

            return (
              <button
                key={key}
                className={page === key ? "navActive" : ""}
                onClick={() => {
                  setPage(key);
                  setMobile(false);
                }}
              >
                <Icon size={18} />
                {Label}
              </button>
            );
          })}
        </nav>

        <button
          className="logout"
          onClick={logout}
        >
          <LogOut size={18} />
          Sign out
        </button>
      </aside>

      <main className="main">
        <header className="topbar">
          <button
            className="mobileBtn"
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X /> : <Menu />}
          </button>

          <div>
            <strong>{user.name}</strong>
            <small>
              {user.role}

              {user.schoolId
                ? ` • ${
                    data.schools.find(
                      school => school.id === user.schoolId
                    )?.name || ""
                  }`
                : ""}
            </small>
          </div>

          <div className="topPill">
            DEMO MODE
          </div>
        </header>

        <div className="content">
          <PageRouter
            page={page}
            user={user}
            data={data}
            setData={setData}
            setPage={setPage}
          />
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   PUBLIC WEBSITE
   ========================================================= */

function PublicSite({
  data,
  setData,
  onLogin,
  page,
  setPage
}) {
  const [search, setSearch] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);

  const approvedSchools = data.schools.filter(
    school => school.status === "APPROVED"
  );

  const visibleSchools = approvedSchools.filter(school => {
    const text =
      `${school.name} ${school.centre} ${school.location}`.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  if (selectedSchool) {
    return (
      <div className="public">
        <PublicHeader
          onLogin={() => setLoginOpen(true)}
          onSchools={() => setSelectedSchool(null)}
        />

        <SchoolProfile
          school={selectedSchool}
          onBack={() => setSelectedSchool(null)}
          onLogin={() => setLoginOpen(true)}
        />

        {loginOpen && (
          <LoginModal
            onClose={() => setLoginOpen(false)}
            onLogin={onLogin}
          />
        )}
      </div>
    );
  }

  return (
    <div className="public">
      <PublicHeader
        onLogin={() => setLoginOpen(true)}
        onSchools={() =>
          document
            .getElementById("schools")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      />

      <section className="hero">
        <div className="heroCopy">
          <span className="eyebrow">
            EDUCATION • CONNECTION • OPPORTUNITY
          </span>

          <h1>
            One platform for{" "}
            <em>schools, parents and students.</em>
          </h1>

          <p>
            Find schools, check available spaces, apply online,
            monitor your child's progress and stay connected with
            school communications.
          </p>

          <div className="actions">
            <button
              className="primary"
              onClick={() =>
                document
                  .getElementById("schools")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Find a School
              <ChevronRight size={17} />
            </button>

            <button
              className="secondary"
              onClick={() => setRegistrationOpen(true)}
            >
              Register Your School
            </button>
          </div>
        </div>

        <div className="heroPanel">
          <div className="miniTop">
            <span>EduLink Eswatini</span>
            <b>Prototype</b>
          </div>

          <div className="miniStatGrid">
            <div>
              <strong>{data.schools.length}</strong>
              <small>Registered schools</small>
            </div>

            <div>
              <strong>
                {data.schools.reduce(
                  (total, school) =>
                    total + totalSpaces(school.spaces),
                  0
                )}
              </strong>
              <small>Available spaces</small>
            </div>

            <div>
              <strong>
                {
                  data.applications.filter(
                    application =>
                      application.status === "PENDING"
                  ).length
                }
              </strong>
              <small>Active applications</small>
            </div>
          </div>

          <div className="miniNote">
            <CheckCircle size={18} />
            Secure role-based school management
          </div>
        </div>
      </section>

      <section
        className="publicSection"
        id="schools"
      >
        <div className="sectionHead">
          <span className="eyebrow">
            SCHOOL DIRECTORY
          </span>

          <h2>Find a school</h2>

          <p>
            Search approved participating schools by name,
            Centre Number or location.
          </p>
        </div>

        <div className="searchBox">
          <Search size={19} />

          <input
            value={search}
            onChange={event =>
              setSearch(event.target.value)
            }
            placeholder="Search school, Centre Number or location..."
          />
        </div>

        <div className="schoolGrid">
          {visibleSchools.map(school => (
            <button
              className="schoolCard"
              key={school.id}
              onClick={() => setSelectedSchool(school)}
            >
              <div className="schoolIcon">
                <School />
              </div>

              <div className="schoolCardBody">
                <div className="schoolLine">
                  <span>{school.type}</span>

                  <b>
                    {school.admission === "OPEN"
                      ? "Admissions Open"
                      : "Admissions Closed"}
                  </b>
                </div>

                <h3>{school.name}</h3>

                <p>
                  Centre Number: {school.centre}
                </p>

                <p>{school.location}</p>

                <div className="spaceLine">
                  <strong>
                    {totalSpaces(school.spaces)}
                  </strong>

                  <span>
                    available spaces
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="publicSection alt">
        <div className="sectionHead">
          <span className="eyebrow">
            HOW IT WORKS
          </span>

          <h2>
            One connected education experience
          </h2>
        </div>

        <div className="featureGrid">
          <Feature
            icon="🏫"
            title="Find Schools"
            text="Discover approved schools and available spaces."
          />

          <Feature
            icon="📝"
            title="Online Applications"
            text="Parents submit applications and required documents online."
          />

          <Feature
            icon="📊"
            title="Child Progress"
            text="Parents see only their own children's marks, attendance and performance."
          />

          <Feature
            icon="💳"
            title="School Fees"
            text="Track balances and receipt verification through the correct school role."
          />
        </div>
      </section>

      <footer>
        <div className="brand">
          <div className="brandIcon">
            <ShieldCheck size={21} />
          </div>

          <div>
            EduLink
            <span>ESWATINI</span>
          </div>
        </div>

        <p>
          Fictional prototype data • Not affiliated with ECESWA or SNAT.
        </p>
      </footer>

      {loginOpen && (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          onLogin={onLogin}
        />
      )}

      {registrationOpen && (
        <SchoolRegistration
          data={data}
          setData={setData}
          onClose={() => setRegistrationOpen(false)}
        />
      )}
    </div>
  );
}

function PublicHeader({ onLogin, onSchools }) {
  return (
    <header className="publicHeader">
      <div className="brand">
        <div className="brandIcon">
          <ShieldCheck size={22} />
        </div>

        <div>
          EduLink
          <span>ESWATINI</span>
        </div>
      </div>

      <nav>
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            })
          }
        >
          Home
        </button>

        <button onClick={onSchools}>
          Find a School
        </button>

        <button
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({
                behavior: "smooth"
              })
          }
        >
          About
        </button>

        <button
          className="loginTop"
          onClick={onLogin}
        >
          Login
        </button>
      </nav>
    </header>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="featureCard">
      <div className="featureIcon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
}

/* =========================================================
   LOGIN
   ========================================================= */

function LoginModal({ onClose, onLogin }) {
  const roles = [
    ["Parent", "parent@demo.sz", UserPlus],
    ["Teacher", "teacher@demo.sz", GraduationCap],
    ["Principal", "principal@demo.sz", ShieldCheck],
    ["Deputy Principal", "deputy@demo.sz", ShieldCheck],
    ["Accountant", "accountant@demo.sz", Wallet],
    ["Secretary", "secretary@demo.sz", MessageSquare],
    ["System Admin", "admin@demo.sz", Settings]
  ];

  const [email, setEmail] =
    useState("parent@demo.sz");

  const [password, setPassword] =
    useState("demo123");

  const [selectedRole, setSelectedRole] =
    useState("Parent");

  const [error, setError] =
    useState("");

  function chooseRole(role, address) {
    setSelectedRole(role);
    setEmail(address);
    setPassword("demo123");
    setError("");
  }

  function submit() {
    const account =
      DEMO_ACCOUNTS[
        email.trim().toLowerCase()
      ];

    if (!account) {
      setError(
        "Please select a valid demo role."
      );
      return;
    }

    if (password !== PASSWORD) {
      setError(
        "Incorrect demo password."
      );
      return;
    }

    onLogin({
      email: email.trim().toLowerCase(),
      ...account
    });
  }

  return (
    <Modal
      title="Login to EduLink"
      onClose={onClose}
    >
      <p className="muted">
        Select a role for the presentation.
      </p>

      <div className="loginRoleGrid">
        {roles.map(
          ([role, address, Icon]) => (
            <button
              type="button"
              key={role}
              className={
                "loginRoleCard " +
                (selectedRole === role
                  ? "selected"
                  : "")
              }
              onClick={() =>
                chooseRole(role, address)
              }
            >
              <span className="loginRoleIcon">
                <Icon size={20} />
              </span>

              <span className="loginRoleText">
                <b>{role}</b>
                <small>{address}</small>
              </span>

              <ChevronRight size={18} />
            </button>
          )
        )}
      </div>

      <label>
        Email
        <input
          value={email}
          onChange={event =>
            setEmail(event.target.value)
          }
        />
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={event =>
            setPassword(event.target.value)
          }
        />
      </label>

      <div className="demoBox">
        Demo password:
        <b> demo123</b>
        <br />
        Selected role:
        <b> {selectedRole}</b>
      </div>

      <button
        className="primary full"
        onClick={submit}
      >
        Login as {selectedRole}
      </button>

      {error && (
        <div className="error">
          {error}
        </div>
      )}
    </Modal>
  );
}

/* =========================================================
   SCHOOL REGISTRATION
   ========================================================= */

function SchoolRegistration({
  data,
  setData,
  onClose
}) {
  const [form, setForm] = useState({
    name: "",
    centre: "",
    location: "",
    type: "High School",
    phone: "",
    email: "",
    principal: "",
    deputy: "",
    staff: ""
  });

  const [submitted, setSubmitted] =
    useState(false);

  function update(field, value) {
    setForm({
      ...form,
      [field]: value
    });
  }

  function submit() {
    if (
      !form.name ||
      !form.centre ||
      !form.location ||
      !form.principal
    ) {
      return;
    }

    const staffNames =
      form.staff
        .split(",")
        .map(x => x.trim())
        .filter(Boolean);

    const staff = [
      {
        name: form.principal,
        role: "Principal"
      }
    ];

    if (form.deputy) {
      staff.push({
        name: form.deputy,
        role: "Deputy Principal"
      });
    }

    staffNames.forEach(name => {
      staff.push({
        name,
        role: "Teacher"
      });
    });

    const pendingSchool = {
      ...form,
      id: `PS-${Date.now()}`,
      status: "PENDING",
      staff,
      submittedAt:
        new Date().toISOString()
    };

    setData({
      ...data,
      pendingSchools: [
        ...data.pendingSchools,
        pendingSchool
      ]
    });

    setSubmitted(true);
  }

  return (
    <Modal
      title="Register Your School"
      onClose={onClose}
    >
      {submitted ? (
        <>
          <div className="successBox">
            <CheckCircle />
            Registration submitted for Admin verification.
          </div>

          <p className="muted">
            The System Admin must verify that
            the school exists and that the
            submitted information is truthful.
          </p>

          <button
            className="primary full"
            onClick={onClose}
          >
            Done
          </button>
        </>
      ) : (
        <>
          <div className="formGrid">
            <label>
              School name *
              <input
                value={form.name}
                onChange={e =>
                  update(
                    "name",
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Centre Number *
              <input
                value={form.centre}
                onChange={e =>
                  update(
                    "centre",
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Location *
              <input
                value={form.location}
                onChange={e =>
                  update(
                    "location",
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              School type
              <select
                value={form.type}
                onChange={e =>
                  update(
                    "type",
                    e.target.value
                  )
                }
              >
                <option>High School</option>
                <option>Primary School</option>
              </select>
            </label>

            <label>
              School phone
              <input
                value={form.phone}
                onChange={e =>
                  update(
                    "phone",
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              School email
              <input
                value={form.email}
                onChange={e =>
                  update(
                    "email",
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Principal name *
              <input
                value={form.principal}
                onChange={e =>
                  update(
                    "principal",
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Deputy Principal
              <input
                value={form.deputy}
                onChange={e =>
                  update(
                    "deputy",
                    e.target.value
                  )
                }
              />
            </label>
          </div>

          <label>
            Staff names
            <small>
              Separate names with commas.
            </small>

            <input
              value={form.staff}
              onChange={e =>
                update(
                  "staff",
                  e.target.value
                )
              }
              placeholder="Teacher names, accountant, secretary..."
            />
          </label>

          <div className="demoBox">
            <ShieldCheck size={17} />
            Admin verification is required before
            the school becomes visible in the
            approved school directory.
          </div>

          <button
            className="primary full"
            onClick={submit}
          >
            Submit for verification
          </button>
        </>
      )}
    </Modal>
  );
}

/* =========================================================
   COMMON COMPONENTS
   ========================================================= */

function Modal({
  title,
  onClose,
  children
}) {
  return (
    <div className="modalOverlay">
      <div className="modal">
        <button
          className="close"
          onClick={onClose}
        >
          <X />
        </button>

        <h2>{title}</h2>

        {children}
      </div>
    </div>
  );
}

function HeaderBlock({
  eyebrow,
  title,
  text,
  actions
}) {
  return (
    <div className="pageHead">
      <div>
        <span className="eyebrow">
          {eyebrow}
        </span>

        <h1>{title}</h1>

        {text && <p>{text}</p>}
      </div>

      {actions}
    </div>
  );
}

function Panel({
  title,
  children
}) {
  return (
    <section className="panel">
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}

function Stat({
  label,
  value,
  icon: Icon
}) {
  return (
    <div className="statCard">
      <div className="statIcon">
        <Icon size={20} />
      </div>

      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function Table({
  headers,
  rows
}) {
  return (
    <div className="tableWrap">
      <table>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Status({ status }) {
  let label = status;
  let className = "pending";

  if (status === "APPROVED") {
    label = "APPROVED";
    className = "approved";
  }

  if (status === "DECLINED") {
    label = "DECLINED";
    className = "rejected";
  }

  if (status === "WAITLIST") {
    label = "WAIT LIST";
    className = "waitlist";
  }

  if (status === "PENDING") {
    label = "PENDING";
    className = "pending";
  }

  return (
    <span className={`status ${className}`}>
      {label}
    </span>
  );
}

function Empty({ text }) {
  return (
    <div className="empty">
      <ClipboardList size={30} />
      <p>{text}</p>
    </div>
  );
}

/* =========================================================
   PAGE ROUTER
   ========================================================= */

function PageRouter({
  page,
  user,
  data,
  setData,
  setPage
}) {
  if (page === "dashboard") {
    return (
      <Dashboard
        user={user}
        data={data}
        setPage={setPage}
      />
    );
  }

  if (page === "schools") {
    if (user.role === "System Admin") {
      return (
        <AdminSchools
          data={data}
          setData={setData}
        />
      );
    }

    return (
      <ParentSchools
        user={user}
        data={data}
        setPage={setPage}
      />
    );
  }

  if (page === "admissions") {
    return (
      <Admissions
        user={user}
        data={data}
        setData={setData}
      />
    );
  }

  if (page === "students") {
    return (
      <Students
        user={user}
        data={data}
      />
    );
  }

  if (page === "teachers") {
    return (
      <Teachers
        user={user}
        data={data}
      />
    );
  }

  if (page === "attendance") {
    return (
      <Attendance
        user={user}
        data={data}
        setData={setData}
      />
    );
  }

  if (page === "marks") {
    return (
      <Marks
        user={user}
        data={data}
        setData={setData}
      />
    );
  }

  if (page === "finance") {
    return (
      <Finance
        user={user}
        data={data}
        setData={setData}
      />
    );
  }

  if (page === "spaces") {
    return (
      <Spaces
        user={user}
        data={data}
        setData={setData}
      />
    );
  }

  if (page === "resources") {
    return <Resources />;
  }

  if (page === "notifications") {
    return (
      <Notifications
        user={user}
        data={data}
      />
    );
  }

  if (page === "calendar") {
    return (
      <Calendar
        data={data}
        setData={setData}
        canEdit={
          user.role === "Secretary" ||
          user.role === "Principal" ||
          user.role === "Deputy Principal"
        }
      />
    );
  }

  if (page === "children") {
    return (
      <Children
        user={user}
        data={data}
      />
    );
  }

  if (page === "applications") {
    return (
      <ParentApplications
        user={user}
        data={data}
      />
    );
  }

  if (page === "fees") {
    return (
      <ParentFees
        user={user}
        data={data}
        setData={setData}
      />
    );
  }

  if (page === "reports") {
    return (
      <Reports
        user={user}
        data={data}
      />
    );
  }

  return <SettingsPage />;
}

/* =========================================================
   DASHBOARD
   ========================================================= */

function Dashboard({
  user,
  data,
  setPage
}) {
  if (user.role === "System Admin") {
    return (
      <>
        <HeaderBlock
          eyebrow="PLATFORM ADMINISTRATION"
          title="EduLink Control Centre"
          text="Manage participating schools and keep the platform running smoothly."
        />

        <div className="statGrid">
          <Stat
            label="Registered Schools"
            value={data.schools.length}
            icon={School}
          />

          <Stat
            label="Pending Schools"
            value={data.pendingSchools.length}
            icon={Clock}
          />

          <Stat
            label="Approved Schools"
            value={
              data.schools.filter(
                school =>
                  school.status === "APPROVED"
              ).length
            }
            icon={CheckCircle}
          />
        </div>

        <Panel title="School verification">
          <p className="muted">
            The System Admin checks whether a
            registering school exists and whether
            the submitted information is truthful.
          </p>

          <button
            className="primary"
            onClick={() =>
              setPage("schools")
            }
          >
            Open School Management
          </button>
        </Panel>
      </>
    );
  }

  const school =
    data.schools.find(
      item => item.id === user.schoolId
    );

  let students = data.students;

  if (user.role === "Parent") {
    students = data.students.filter(
      student =>
        student.parentEmail === user.email
    );
  } else if (school) {
    students = data.students.filter(
      student =>
        student.schoolId === school.id
    );
  }

  const average =
    students.length > 0
      ? Math.round(
          students.reduce(
            (total, student) =>
              total + studentAverage(student),
            0
          ) / students.length
        )
      : 0;

  const activeApplications =
    data.applications.filter(
      application =>
        application.schoolId === user.schoolId &&
        application.status === "PENDING"
    ).length;

  if (user.role === "Parent") {
    return (
      <>
        <HeaderBlock
          eyebrow="PARENT PORTAL"
          title="My family dashboard"
          text="Only information linked to your children is shown."
        />

        <div className="statGrid">
          <Stat
            label="My Children"
            value={students.length}
            icon={Users}
          />

          <Stat
            label="Average Performance"
            value={`${average}%`}
            icon={BookOpen}
          />

          <Stat
            label="My Applications"
            value={
              data.applications.filter(
                application =>
                  application.parentEmail ===
                  user.email
              ).length
            }
            icon={FileText}
          />
        </div>

        <Panel title="Privacy">
          <p className="muted">
            You cannot see another student's
            marks, attendance, fees or documents.
          </p>
        </Panel>
      </>
    );
  }

  if (user.role === "Accountant") {
    return (
      <>
        <HeaderBlock
          eyebrow="ACCOUNTANT"
          title={school?.name || "School Finance"}
          text="Financial information only."
        />

        <div className="statGrid">
          <Stat
            label="Students"
            value={students.length}
            icon={Users}
          />

          <Stat
            label="Pending Receipts"
            value={
              data.payments.filter(
                payment =>
                  payment.status === "PENDING"
              ).length
            }
            icon={Receipt}
          />

          <Stat
            label="Outstanding Balances"
            value={`E ${students.reduce(
              (total, student) => {
                const fees =
                  school?.fees || 0;

                const paid =
                  data.payments
                    .filter(
                      payment =>
                        payment.studentId ===
                          student.id &&
                        payment.status ===
                          "APPROVED"
                    )
                    .reduce(
                      (sum, payment) =>
                        sum +
                        Number(
                          payment.amount || 0
                        ),
                      0
                    );

                return (
                  total +
                  Math.max(
                    0,
                    fees - paid
                  )
                );
              },
              0
            )}`}
            icon={Wallet}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderBlock
        eyebrow={user.role.toUpperCase()}
        title={school?.name || "School Dashboard"}
        text="Live demo data updates across authorised modules."
      />

      <div className="statGrid">
        <Stat
          label="Students"
          value={students.length}
          icon={Users}
        />

        <Stat
          label="Active Applications"
          value={activeApplications}
          icon={FileText}
        />

        <Stat
          label="Average Performance"
          value={`${average}%`}
          icon={BookOpen}
        />

        <Stat
          label="Available Spaces"
          value={
            school
              ? totalSpaces(school.spaces)
              : 0
          }
          icon={Boxes}
        />
      </div>

      <Panel title="Role-based access">
        <p className="muted">
          {user.role} access is restricted to
          the responsibilities of that role.
        </p>
      </Panel>
    </>
  );
}

/* =========================================================
   ADMIN SCHOOL MANAGEMENT
   ========================================================= */

function AdminSchools({
  data,
  setData
}) {
  function approveSchool(id) {
    const pending =
      data.pendingSchools.find(
        school => school.id === id
      );

    if (!pending) {
      return;
    }

    const approved = {
      ...pending,
      id: `S-${Date.now()}`,
      status: "APPROVED",
      admission: "OPEN",
      fees: 3000,
      spaces:
        pending.type === "Primary School"
          ? {
              "Grade 1": 12,
              "Grade 2": 10,
              "Grade 3": 9,
              "Grade 4": 8,
              "Grade 5": 10,
              "Grade 6": 7,
              "Grade 7": 6
            }
          : {
              "Form 1": 20,
              "Form 2": 10,
              "Form 3": 15,
              "Form 4": 12,
              "Form 5": 13
            }
    };

    setData({
      ...data,
      schools: [
        ...data.schools,
        approved
      ],
      pendingSchools:
        data.pendingSchools.filter(
          school => school.id !== id
        )
    });
  }

  function rejectSchool(id) {
    setData({
      ...data,
      pendingSchools:
        data.pendingSchools.filter(
          school => school.id !== id
        )
    });
  }

  return (
    <>
      <HeaderBlock
        eyebrow="SYSTEM ADMIN"
        title="School Management"
        text="Verify schools before allowing them onto the EduLink platform."
      />

      <div className="statGrid">
        <Stat
          label="Registered Schools"
          value={data.schools.length}
          icon={School}
        />

        <Stat
          label="Pending Schools"
          value={data.pendingSchools.length}
          icon={Clock}
        />

        <Stat
          label="Total Approved"
          value={
            data.schools.filter(
              school =>
                school.status === "APPROVED"
            ).length
          }
          icon={CheckCircle}
        />
      </div>

      <Panel title="Pending school registrations">
        {data.pendingSchools.length === 0 ? (
          <Empty text="No schools are currently waiting for approval." />
        ) : (
          <Table
            headers={[
              "School",
              "Centre Number",
              "Location",
              "Principal",
              "Type",
              "Actions"
            ]}
            rows={data.pendingSchools.map(
              school => [
                school.name,
                school.centre,
                school.location,
                school.principal,
                school.type,
                <div className="rowActions">
                  <button
                    className="small good"
                    onClick={() =>
                      approveSchool(
                        school.id
                      )
                    }
                  >
                    <CheckCircle size={14} />
                    Approve
                  </button>

                  <button
                    className="small danger"
                    onClick={() =>
                      rejectSchool(
                        school.id
                      )
                    }
                  >
                    <XCircle size={14} />
                    Reject
                  </button>
                </div>
              ]
            )}
          />
        )}
      </Panel>

      <Panel title="Registered schools">
        <Table
          headers={[
            "School",
            "Centre Number",
            "Location",
            "Type",
            "Status"
          ]}
          rows={data.schools.map(
            school => [
              school.name,
              school.centre,
              school.location,
              school.type,
              <Status
                status={school.status}
              />
            ]
          )}
        />
      </Panel>
    </>
  );
}

/* =========================================================
   PARENT SCHOOL DIRECTORY
   ========================================================= */

function ParentSchools({
  user,
  data,
  setPage
}) {
  const [query, setQuery] =
    useState("");

  const schools =
    data.schools.filter(school => {
      if (school.status !== "APPROVED") {
        return false;
      }

      const text =
        `${school.name} ${school.centre} ${school.location}`.toLowerCase();

      return text.includes(
        query.toLowerCase()
      );
    });

  return (
    <>
      <HeaderBlock
        eyebrow="SCHOOL DIRECTORY"
        title="Find a school"
        text="You are already signed in. There is no second parent login required."
      />

      <div className="searchBox">
        <Search />

        <input
          value={query}
          onChange={e =>
            setQuery(e.target.value)
          }
          placeholder="School name, Centre Number or location"
        />
      </div>

      <div className="schoolGrid">
        {schools.map(school => (
          <div
            className="schoolCard signed"
            key={school.id}
          >
            <div className="schoolIcon">
              <School />
            </div>

            <div className="schoolCardBody">
              <h3>{school.name}</h3>

              <p>
                Centre {school.centre} •{" "}
                {school.location}
              </p>

              <div className="spaceLine">
                <strong>
                  {totalSpaces(
                    school.spaces
                  )}
                </strong>

                <span>
                  available spaces
                </span>
              </div>

              <button
                className="primary smallWide"
                onClick={() =>
                  setPage("applications")
                }
              >
                Apply to this school
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================================================
   ADMISSIONS
   ========================================================= */

function Admissions({
  user,
  data,
  setData
}) {
  const applications =
    data.applications.filter(
      application =>
        application.schoolId ===
        user.schoolId
    );

  function changeStatus(
    application,
    newStatus
  ) {
    if (newStatus === "APPROVED") {
      const school =
        data.schools.find(
          item =>
            item.id ===
            application.schoolId
        );

      const available = Number(
        school?.spaces?.[
          application.form
        ] || 0
      );

      if (available <= 0) {
        alert(
          "No available space for this Grade/Form."
        );
        return;
      }

      const updatedSchools =
        data.schools.map(item => {
          if (
            item.id !==
            application.schoolId
          ) {
            return item;
          }

          return {
            ...item,
            spaces: {
              ...item.spaces,
              [application.form]:
                available - 1
            }
          };
        });

      const updatedApplications =
        data.applications.map(item => {
          if (
            item.id !==
            application.id
          ) {
            return item;
          }

          return {
            ...item,
            status: "APPROVED"
          };
        });

      setData({
        ...data,
        schools: updatedSchools,
        applications:
          updatedApplications,
        notifications: [
          ...data.notifications,
          {
            id: `N-${Date.now()}`,
            title:
              "Application approved",
            body:
              `${application.childName}'s application has been approved.`,
            audience:
              application.parentEmail
          }
        ]
      });

      return;
    }

    const updated =
      data.applications.map(item => {
        if (
          item.id !== application.id
        ) {
          return item;
        }

        return {
          ...item,
          status: newStatus
        };
      });

    setData({
      ...data,
      applications: updated
    });
  }

  return (
    <>
      <HeaderBlock
        eyebrow="ADMISSIONS"
        title="Active applications"
        text="Approve, decline or place applications on the waiting list."
      />

      <Panel title="Applications">
        {applications.length === 0 ? (
          <Empty text="No applications have been submitted yet." />
        ) : (
          <Table
            headers={[
              "Child",
              "Parent",
              "Form",
              "Documents",
              "Status",
              "Actions"
            ]}
            rows={applications.map(
              application => [
                application.childName,
                application.parentName ||
                  application.parentEmail,
                application.form,
                `${(
                  application.documents ||
                  []
                ).length} document(s)`,
                <Status
                  status={
                    application.status
                  }
                />,
                <div className="rowActions">
                  <button
                    className="small good"
                    onClick={() =>
                      changeStatus(
                        application,
                        "APPROVED"
                      )
                    }
                  >
                    Approve
                  </button>

                  <button
                    className="small"
                    onClick={() =>
                      changeStatus(
                        application,
                        "WAITLIST"
                      )
                    }
                  >
                    Wait List
                  </button>

                  <button
                    className="small danger"
                    onClick={() =>
                      changeStatus(
                        application,
                        "DECLINED"
                      )
                    }
                  >
                    Decline
                  </button>
                </div>
              ]
            )}
          />
        )}
      </Panel>
    </>
  );
}

/* =========================================================
   STUDENTS
   ========================================================= */

function Students({
  user,
  data
}) {
  let students =
    data.students.filter(
      student =>
        student.schoolId ===
        user.schoolId
    );

  return (
    <>
      <HeaderBlock
        eyebrow="STUDENTS"
        title="Registered students"
        text="Students grouped by Grade/Form, attendance and average performance."
      />

      <Panel title="Student register">
        <Table
          headers={[
            "Form",
            "Student",
            "Attendance",
            "Average"
          ]}
          rows={students
            .sort((a, b) =>
              a.form.localeCompare(
                b.form
              )
            )
            .map(student => [
              student.form,
              student.name,
              `${student.attendance}%`,
              `${studentAverage(
                student
              )}%`
            ])}
        />
      </Panel>
    </>
  );
}

/* =========================================================
   TEACHERS
   ========================================================= */

function Teachers({
  user,
  data
}) {
  const school =
    data.schools.find(
      item => item.id === user.schoolId
    );

  const teachers =
    school?.staff?.filter(
      member =>
        member.role === "Teacher"
    ) || [];

  return (
    <>
      <HeaderBlock
        eyebrow="TEACHERS"
        title="School teaching staff"
      />

      <Panel title="Teachers">
        <Table
          headers={[
            "Name",
            "Role",
            "Subjects",
            "Grades"
          ]}
          rows={teachers.map(
            teacher => [
              teacher.name,
              teacher.role,
              (
                teacher.subjects || []
              ).join(", ") || "—",
              (
                teacher.grades || []
              ).join(", ") || "—"
            ]
          )}
        />
      </Panel>
    </>
  );
}

/* =========================================================
   ATTENDANCE
   ========================================================= */

function Attendance({
  user,
  data,
  setData
}) {
  const [local, setLocal] =
    useState(data.students);

  let students =
    data.students.filter(
      student =>
        student.schoolId ===
        user.schoolId
    );

  if (user.role === "Teacher") {
    students =
      students.filter(student =>
        user.grades?.includes(
          student.form
        )
      );
  }

  function updateAttendance(
    studentId,
    value
  ) {
    const numeric = Math.max(
      0,
      Math.min(
        100,
        Number(value)
      )
    );

    const updated =
      data.students.map(student => {
        if (
          student.id !== studentId
        ) {
          return student;
        }

        return {
          ...student,
          attendance: numeric
        };
      });

    setData({
      ...data,
      students: updated
    });

    setLocal(updated);
  }

  return (
    <>
      <HeaderBlock
        eyebrow="ATTENDANCE"
        title="Attendance register"
        text="Teachers manage attendance. Parents only see their own children's attendance."
      />

      <Panel title="Attendance">
        <Table
          headers={[
            "Form",
            "Student",
            "Attendance",
            "Status"
          ]}
          rows={students.map(
            student => [
              student.form,
              student.name,
              user.role === "Teacher" ? (
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={
                    student.attendance
                  }
                  onChange={event =>
                    updateAttendance(
                      student.id,
                      event.target.value
                    )
                  }
                />
              ) : (
                `${student.attendance}%`
              ),
              student.attendance < 80
                ? "Attendance Warning"
                : "Good"
            ]
          )}
        />
      </Panel>
    </>
  );
}

/* =========================================================
   MARKS
   ========================================================= */

function Marks({
  user,
  data,
  setData
}) {
  const schoolStudents =
    data.students.filter(
      student =>
        student.schoolId ===
        user.schoolId
    );

  const subjects =
    user.role === "Teacher"
      ? user.subjects || []
      : [
          "Mathematics",
          "English",
          "Chemistry",
          "Agriculture",
          "Physics"
        ];

  function saveMark(
    studentId,
    subject,
    field,
    value
  ) {
    const updated =
      data.students.map(student => {
        if (
          student.id !== studentId
        ) {
          return student;
        }

        const current =
          student.subjects?.[
            subject
          ] || {
            test: 0,
            exam: 0,
            comment: ""
          };

        return {
          ...student,
          subjects: {
            ...student.subjects,
            [subject]: {
              ...current,
              [field]:
                field === "comment"
                  ? value
                  : Number(value)
            }
          }
        };
      });

    setData({
      ...data,
      students: updated
    });
  }

  return (
    <>
      <HeaderBlock
        eyebrow="ACADEMIC PERFORMANCE"
        title="Marks"
        text={
          user.role === "Teacher"
            ? "You can only enter marks for subjects you teach."
            : "View student marks and comments."
        }
      />

      {subjects.map(subject => {
        const teacherCanEdit =
          user.role === "Teacher" &&
          user.subjects?.includes(
            subject
          );

        return (
          <Panel
            key={subject}
            title={subject}
          >
            <Table
              headers={[
                "Form",
                "Name",
                "Test",
                "Exam",
                "Average",
                "Comment"
              ]}
              rows={schoolStudents.map(
                student => {
                  const mark =
                    student.subjects?.[
                      subject
                    ] || {
                      test: 0,
                      exam: 0,
                      comment: ""
                    };

                  const average =
                    Math.round(
                      (
                        Number(
                          mark.test || 0
                        ) +
                        Number(
                          mark.exam || 0
                        )
                      ) / 2
                    );

                  return [
                    student.form,
                    student.name,

                    teacherCanEdit ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={
                          mark.test
                        }
                        onChange={event =>
                          saveMark(
                            student.id,
                            subject,
                            "test",
                            event.target.value
                          )
                        }
                      />
                    ) : (
                      mark.test
                    ),

                    teacherCanEdit ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={
                          mark.exam
                        }
                        onChange={event =>
                          saveMark(
                            student.id,
                            subject,
                            "exam",
                            event.target.value
                          )
                        }
                      />
                    ) : (
                      mark.exam
                    ),

                    `${average}%`,

                    teacherCanEdit ? (
                      <input
                        value={
                          mark.comment || ""
                        }
                        placeholder="Comment"
                        onChange={event =>
                          saveMark(
                            student.id,
                            subject,
                            "comment",
                            event.target.value
                          )
                        }
                      />
                    ) : (
                      mark.comment ||
                      "—"
                    )
                  ];
                }
              )}
            />
          </Panel>
        );
      })}
    </>
  );
}

/* =========================================================
   FINANCE
   ========================================================= */

function Finance({
  user,
  data,
  setData
}) {
  const school =
    data.schools.find(
      school =>
        school.id === user.schoolId
    );

  const students =
    data.students.filter(
      student =>
        student.schoolId ===
        user.schoolId
    );

  function approveReceipt(
    paymentId
  ) {
    const payments =
      data.payments.map(payment => {
        if (
          payment.id !== paymentId
        ) {
          return payment;
        }

        return {
          ...payment,
          status: "APPROVED"
        };
      });

    setData({
      ...data,
      payments
    });
  }

  function rejectReceipt(
    paymentId
  ) {
    const payments =
      data.payments.map(payment => {
        if (
          payment.id !== paymentId
        ) {
          return payment;
        }

        return {
          ...payment,
          status: "REJECTED"
        };
      });

    setData({
      ...data,
      payments
    });
  }

  return (
    <>
      <HeaderBlock
        eyebrow="ACCOUNTING"
        title="School finance"
        text="Student fee balances and payment receipt verification."
      />

      <Panel title="Student fee table">
        <Table
          headers={[
            "Form",
            "Student",
            "Total Fees",
            "Paid",
            "Balance"
          ]}
          rows={students.map(
            student => {
              const total =
                school?.fees || 0;

              const paid =
                data.payments
                  .filter(
                    payment =>
                      payment.studentId ===
                        student.id &&
                      payment.status ===
                        "APPROVED"
                  )
                  .reduce(
                    (sum, payment) =>
                      sum +
                      Number(
                        payment.amount || 0
                      ),
                    0
                  );

              return [
                student.form,
                student.name,
                `E ${total.toLocaleString()}`,
                `E ${paid.toLocaleString()}`,
                `E ${Math.max(
                  0,
                  total - paid
                ).toLocaleString()}`
              ];
            }
          )}
        />
      </Panel>

      <Panel title="Pending receipt approvals">
        <Table
          headers={[
            "Student",
            "Amount",
            "Receipt",
            "Status",
            "Actions"
          ]}
          rows={data.payments
            .filter(
              payment =>
                payment.status ===
                "PENDING"
            )
            .map(payment => {
              const student =
                data.students.find(
                  item =>
                    item.id ===
                    payment.studentId
                );

              return [
                student?.name || "Unknown",
                `E ${payment.amount}`,
                payment.receipt,
                <Status status="PENDING" />,
                <div className="rowActions">
                  <button
                    className="small good"
                    onClick={() =>
                      approveReceipt(
                        payment.id
                      )
                    }
                  >
                    Approve
                  </button>

                  <button
                    className="small danger"
                    onClick={() =>
                      rejectReceipt(
                        payment.id
                      )
                    }
                  >
                    Reject
                  </button>
                </div>
              ];
            })}
        />
      </Panel>
    </>
  );
}

/* =========================================================
   SPACES
   ========================================================= */

function Spaces({
  user,
  data,
  setData
}) {
  const school =
    data.schools.find(
      item =>
        item.id === user.schoolId
    );

  const [spaces, setSpaces] =
    useState(
      school?.spaces || {}
    );

  function save() {
    const schools =
      data.schools.map(item => {
        if (item.id !== school.id) {
          return item;
        }

        return {
          ...item,
          spaces
        };
      });

    setData({
      ...data,
      schools
    });
  }

  return (
    <>
      <HeaderBlock
        eyebrow="ADMISSIONS CAPACITY"
        title="Available spaces"
        text="Spaces decrease automatically when applications are approved."
      />

      <Panel
        title={school?.name}
      >
        {Object.entries(spaces).map(
          ([form, number]) => (
            <label
              className="spaceEdit"
              key={form}
            >
              <span>{form}</span>

              <input
                type="number"
                min="0"
                value={number}
                onChange={event =>
                  setSpaces({
                    ...spaces,
                    [form]: Number(
                      event.target.value
                    )
                  })
                }
              />

              <b>
                {number === 0
                  ? "FULL"
                  : `${number} spaces`}
              </b>
            </label>
          )
        )}

        <div className="totalBar">
          <span>
            Total available
          </span>

          <strong>
            {totalSpaces(spaces)}
          </strong>
        </div>

        <button
          className="primary"
          onClick={save}
        >
          Save capacity
        </button>
      </Panel>
    </>
  );
}

/* =========================================================
   PARENT APPLICATIONS
   ========================================================= */

function ParentApplications({
  user,
  data
}) {
  const [schoolId, setSchoolId] =
    useState("");

  const [open, setOpen] =
    useState(false);

  const [form, setForm] =
    useState("");

  const [childName, setChildName] =
    useState("");

  const [previousSchool, setPreviousSchool] =
    useState("");

  const [files, setFiles] =
    useState([]);

  const parentApplications =
    data.applications.filter(
      application =>
        application.parentEmail ===
        user.email
    );

  function submit() {
    const school =
      data.schools.find(
        item =>
          item.id === schoolId
      );

    if (!school) {
      alert(
        "Please select a school."
      );
      return;
    }

    if (!childName || !form) {
      alert(
        "Please complete the required fields."
      );
      return;
    }

    const available = Number(
      school.spaces?.[form] || 0
    );

    if (available <= 0) {
      alert(
        "That Grade/Form is full."
      );
      return;
    }

    const application = {
      id: `APP-${Date.now()}`,
      schoolId: school.id,
      parentEmail: user.email,
      parentName: user.name,
      childName,
      form,
      previousSchool,
      documents: files.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size
      })),
      status: "PENDING",
      createdAt:
        new Date().toISOString()
    };

    setData({
      ...data,
      applications: [
        ...data.applications,
        application
      ],
      notifications: [
        ...data.notifications,
        {
          id: `N-${Date.now()}`,
          title:
            "New application submitted",
          body:
            `${childName} applied to ${school.name}.`,
          audience:
            school.id
        }
      ]
    });

    setOpen(false);
    setChildName("");
    setForm("");
    setPreviousSchool("");
    setFiles([]);
  }

  return (
    <>
      <HeaderBlock
        eyebrow="PARENT APPLICATIONS"
        title="My applications"
        text="Only applications belonging to your parent account are displayed."
        actions={
          <button
            className="primary"
            onClick={() => setOpen(true)}
          >
            Apply to a School
          </button>
        }
      />

      <Panel title="Application status">
        {parentApplications.length === 0 ? (
          <Empty text="You have not submitted an application yet." />
        ) : (
          <Table
            headers={[
              "School",
              "Child",
              "Form",
              "Documents",
              "Status"
            ]}
            rows={parentApplications.map(
              application => {
                const school =
                  data.schools.find(
                    item =>
                      item.id ===
                      application.schoolId
                  );

                return [
                  school?.name ||
                    "Unknown",
                  application.childName,
                  application.form,
                  `${(
                    application.documents ||
                    []
                  ).length} document(s)`,
                  <Status
                    status={
                      application.status
                    }
                  />
                ];
              }
            )}
          />
        )}
      </Panel>

      {open && (
        <Modal
          title="Apply to a School"
          onClose={() =>
            setOpen(false)
          }
        >
          <label>
            School *
            <select
              value={schoolId}
              onChange={event => {
                setSchoolId(
                  event.target.value
                );
                setForm("");
              }}
            >
              <option value="">
                Select a school
              </option>

              {data.schools
                .filter(
                  school =>
                    school.status ===
                    "APPROVED"
                )
                .map(school => (
                  <option
                    key={school.id}
                    value={school.id}
                  >
                    {school.name}
                  </option>
                ))}
            </select>
          </label>

          <label>
            Child full name *
            <input
              value={childName}
              onChange={event =>
                setChildName(
                  event.target.value
                )
              }
            />
          </label>

          <label>
            Grade/Form *
            <select
              value={form}
              onChange={event =>
                setForm(
                  event.target.value
                )
              }
            >
              <option value="">
                Select Grade/Form
              </option>

              {schoolId &&
                Object.entries(
                  data.schools.find(
                    school =>
                      school.id ===
                      schoolId
                  )?.spaces || {}
                ).map(
                  ([grade, spaces]) => (
                    <option
                      key={grade}
                      value={grade}
                      disabled={
                        Number(spaces) <= 0
                      }
                    >
                      {grade}
                      {Number(spaces) <=
                      0
                        ? " — FULL"
                        : ""}
                    </option>
                  )
                )}
            </select>
          </label>

          <label>
            Previous school
            <input
              value={previousSchool}
              onChange={event =>
                setPreviousSchool(
                  event.target.value
                )
              }
            />
          </label>

          <div className="uploadBox">
            <Upload />

            <div>
              <b>
                Required documents
              </b>

              <p>
                Upload transcripts,
                previous reports or
                other required
                documents.
              </p>
            </div>

            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={event =>
                setFiles(
                  Array.from(
                    event.target.files ||
                      []
                  )
                )
              }
            />
          </div>

          {files.length > 0 && (
            <div className="fileList">
              {files.map(file => (
                <span key={file.name}>
                  <FileText size={14} />
                  {file.name}
                </span>
              ))}
            </div>
          )}

          <button
            className="primary full"
            onClick={submit}
          >
            Submit Application
          </button>
        </Modal>
      )}
    </>
  );
}

/* =========================================================
   PARENT CHILDREN
   ========================================================= */

function Children({
  user,
  data
}) {
  const children =
    data.students.filter(
      student =>
        student.parentEmail ===
        user.email
    );

  return (
    <>
      <HeaderBlock
        eyebrow="MY CHILDREN"
        title="My children's performance"
        text="Only your own children's records are displayed."
      />

      <Panel title="Children">
        {children.length === 0 ? (
          <Empty text="No children are linked to this account." />
        ) : (
          <Table
            headers={[
              "Form",
              "Child",
              "Attendance",
              "Average",
              "Aggregate"
            ]}
            rows={children.map(
              child => [
                child.form,
                child.name,
                `${child.attendance}%`,
                `${studentAverage(
                  child
                )}%`,
                aggregate(child)
              ]
            )}
          />
        )}
      </Panel>
    </>
  );
}

/* =========================================================
   PARENT FEES
   ========================================================= */

function ParentFees({
  user,
  data,
  setData
}) {
  const children =
    data.students.filter(
      student =>
        student.parentEmail ===
        user.email
    );

  const [receiptStudent, setReceiptStudent] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [fileName, setFileName] =
    useState("");

  function submitReceipt() {
    if (
      !receiptStudent ||
      !amount
    ) {
      alert(
        "Select a child and enter the payment amount."
      );
      return;
    }

    const payment = {
      id: `PAY-${Date.now()}`,
      studentId: receiptStudent,
      parentEmail: user.email,
      amount: Number(amount),
      status: "PENDING",
      receipt:
        fileName ||
        "Demo uploaded receipt"
    };

    setData({
      ...data,
      payments: [
        ...data.payments,
        payment
      ]
    });

    setReceiptStudent("");
    setAmount("");
    setFileName("");

    alert(
      "Receipt submitted for accountant verification."
    );
  }

  return (
    <>
      <HeaderBlock
        eyebrow="SCHOOL FEES"
        title="My children's fees"
        text="Only your children's balances are shown."
      />

      <Panel title="Fee balances">
        <Table
          headers={[
            "Form",
            "Child",
            "Total Fees",
            "Paid",
            "Balance"
          ]}
          rows={children.map(
            child => {
              const school =
                data.schools.find(
                  item =>
                    item.id ===
                    child.schoolId
                );

              const total =
                school?.fees || 0;

              const paid =
                data.payments
                  .filter(
                    payment =>
                      payment.studentId ===
                        child.id &&
                      payment.status ===
                        "APPROVED"
                  )
                  .reduce(
                    (sum, payment) =>
                      sum +
                      Number(
                        payment.amount ||
                          0
                      ),
                    0
                  );

              return [
                child.form,
                child.name,
                `E ${total.toLocaleString()}`,
                `E ${paid.toLocaleString()}`,
                `E ${Math.max(
                  0,
                  total - paid
                ).toLocaleString()}`
              ];
            }
          )}
        />
      </Panel>

      <Panel title="Submit payment receipt">
        <div className="formGrid">
          <label>
            Child
            <select
              value={receiptStudent}
              onChange={event =>
                setReceiptStudent(
                  event.target.value
                )
              }
            >
              <option value="">
                Select child
              </option>

              {children.map(child => (
                <option
                  key={child.id}
                  value={child.id}
                >
                  {child.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Amount paid
            <input
              type="number"
              value={amount}
              onChange={event =>
                setAmount(
                  event.target.value
                )
              }
            />
          </label>
        </div>

        <label>
          Receipt document
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={event =>
              setFileName(
                event.target.files?.[0]
                  ?.name || ""
              )
            }
          />
        </label>

        <button
          className="primary"
          onClick={submitReceipt}
        >
          Submit Receipt
        </button>
      </Panel>
    </>
  );
}

/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function Notifications({
  user,
  data
}) {
  let notifications =
    data.notifications.filter(
      notification =>
        notification.audience ===
          "all" ||
        notification.audience ===
          user.email ||
        notification.audience ===
          user.schoolId
    );

  return (
    <>
      <HeaderBlock
        eyebrow="NOTIFICATIONS"
        title="School communications"
      />

      <Panel title="Notifications">
        {notifications.length === 0 ? (
          <Empty text="No notifications." />
        ) : (
          notifications.map(
            notification => (
              <div
                className="notification"
                key={notification.id}
              >
                <MessageSquare />

                <div>
                  <b>
                    {notification.title}
                  </b>

                  <p>
                    {notification.body}
                  </p>
                </div>
              </div>
            )
          )
        )}
      </Panel>
    </>
  );
}

/* =========================================================
   CALENDAR
   ========================================================= */

function Calendar({
  data,
  setData,
  canEdit
}) {
  const [event, setEvent] =
    useState({
      title: "",
      date: "",
      time: "",
      details: ""
    });

  function addEvent() {
    if (
      !event.title ||
      !event.date
    ) {
      return;
    }

    setData({
      ...data,
      calendar: [
        ...data.calendar,
        {
          ...event,
          id: `C-${Date.now()}`
        }
      ]
    });

    setEvent({
      title: "",
      date: "",
      time: "",
      details: ""
    });
  }

  return (
    <>
      <HeaderBlock
        eyebrow="SCHOOL CALENDAR"
        title="School calendar"
        text="Shared calendar for authorised users."
      />

      {canEdit && (
        <Panel title="Add event">
          <div className="formGrid">
            <label>
              Event
              <input
                value={event.title}
                onChange={e =>
                  setEvent({
                    ...event,
                    title:
                      e.target.value
                  })
                }
              />
            </label>

            <label>
              Date
              <input
                type="date"
                value={event.date}
                onChange={e =>
                  setEvent({
                    ...event,
                    date:
                      e.target.value
                  })
                }
              />
            </label>

            <label>
              Time
              <input
                type="time"
                value={event.time}
                onChange={e =>
                  setEvent({
                    ...event,
                    time:
                      e.target.value
                  })
                }
              />
            </label>

            <label>
              Details
              <input
                value={event.details}
                onChange={e =>
                  setEvent({
                    ...event,
                    details:
                      e.target.value
                  })
                }
              />
            </label>
          </div>

          <button
            className="primary"
            onClick={addEvent}
          >
            Add event
          </button>
        </Panel>
      )}

      <Panel title="Upcoming events">
        {data.calendar.map(
          calendarEvent => (
            <div
              className="calendarRow"
              key={calendarEvent.id}
            >
              <div className="dateBox">
                <b>
                  {calendarEvent.date}
                </b>

                <span>
                  {calendarEvent.time ||
                    "All day"}
                </span>
              </div>

              <div>
                <h3>
                  {calendarEvent.title}
                </h3>

                <p>
                  {calendarEvent.details}
                </p>
              </div>
            </div>
          )
        )}
      </Panel>
    </>
  );
}

/* =========================================================
   RESOURCES
   ========================================================= */

function Resources() {
  return (
    <>
      <HeaderBlock
        eyebrow="SCHOOL RESOURCES"
        title="Resources"
      />

      <Panel title="School resources">
        <Table
          headers={[
            "Resource",
            "Location",
            "Quantity",
            "Status"
          ]}
          rows={[
            [
              "Desks",
              "Form 1 classroom",
              24,
              "Available"
            ],
            [
              "Chairs",
              "Form 1 classroom",
              30,
              "Available"
            ],
            [
              "Computers",
              "ICT Laboratory",
              20,
              "Available"
            ],
            [
              "Laboratory benches",
              "Science Laboratory",
              18,
              "Available"
            ]
          ]}
        />
      </Panel>
    </>
  );
}

/* =========================================================
   REPORTS
   ========================================================= */

function Reports({
  user,
  data
}) {
  const students =
    data.students.filter(
      student =>
        student.schoolId ===
        user.schoolId
    );

  const subjects = [
    "Mathematics",
    "English",
    "Chemistry",
    "Agriculture",
    "Physics"
  ];

  return (
    <>
      <HeaderBlock
        eyebrow="REPORTS"
        title="Academic reports"
      />

      <Panel title="Subject performance">
        <Table
          headers={[
            "Subject",
            "Average"
          ]}
          rows={subjects.map(
            subject => {
              const values = [];

              students.forEach(
                student => {
                  const mark =
                    student.subjects?.[
                      subject
                    ];

                  if (mark) {
                    values.push(
                      Number(
                        mark.test || 0
                      )
                    );

                    values.push(
                      Number(
                        mark.exam || 0
                      )
                    );
                  }
                }
              );

              let average = 0;

              if (values.length) {
                average = Math.round(
                  values.reduce(
                    (a, b) =>
                      a + b,
                    0
                  ) /
                    values.length
                );
              }

              return [
                subject,
                `${average}%`
              ];
            }
          )}
        />
      </Panel>
    </>
  );
}

/* =========================================================
   SETTINGS
   ========================================================= */

function SettingsPage() {
  return (
    <>
      <HeaderBlock
        eyebrow="SETTINGS"
        title="Prototype settings"
        text="Production authentication, database, document storage, SMS and payment services will be connected later."
      />

      <Panel title="EduLink architecture">
        <div className="activity">
          <span>
            <ShieldCheck />
            Role-based access
          </span>

          <span>
            <Upload />
            Application document upload
          </span>

          <span>
            <ClipboardList />
            Shared demo data
          </span>
        </div>
      </Panel>
    </>
  );
}

/* =========================================================
   SCHOOL PROFILE
   ========================================================= */

function SchoolProfile({
  school,
  onBack,
  onLogin
}) {
  return (
    <section className="profilePage">
      <button
        className="backBtn"
        onClick={onBack}
      >
        ← Back to schools
      </button>

      <div className="profileHero">
        <div>
          <span className="eyebrow">
            APPROVED SCHOOL
          </span>

          <h1>{school.name}</h1>

          <p>
            Centre Number:
            <b> {school.centre}</b>
            {" • "}
            {school.location}
            {" • "}
            {school.type}
          </p>
        </div>

        <span className="openBadge">
          {school.admission ===
          "OPEN"
            ? "ADMISSIONS OPEN"
            : "ADMISSIONS CLOSED"}
        </span>
      </div>

      <div className="profileGrid">
        <div className="infoPanel">
          <h3>
            Available spaces
          </h3>

          <div className="bigNumber">
            {totalSpaces(
              school.spaces
            )}
          </div>

          <div className="spaceRows">
            {Object.entries(
              school.spaces
            ).map(
              ([grade, spaces]) => (
                <div key={grade}>
                  <span>
                    {grade}
                  </span>

                  <b>
                    {Number(spaces) > 0
                      ? spaces
                      : "FULL"}
                  </b>
                </div>
              )
            )}
          </div>
        </div>

        <div className="infoPanel">
          <h3>School fees</h3>

          <div className="feeAmount">
            E{" "}
            {school.fees.toLocaleString()}
          </div>

          <p>
            Demo school fees.
          </p>

          <button
            className="primary"
            onClick={onLogin}
          >
            Login to Apply
          </button>
        </div>
      </div>
    </section>
  );
}

createRoot(
  document.getElementById("root")
).render(<App />);
