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
  XCircle,
  Eye,
  UserCheck,
  UserX,
  Plus,
  Trash2,
  Save,
  Bell,
  MapPin,
  Phone,
  Mail,
  Lock,
  Paperclip
} from "lucide-react";

import "./styles.css";

/* =========================================================
   EDULINK ESWATINI
   Functional frontend prototype
   Demo data only
   ========================================================= */

const PASSWORD = "demo123";

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

const NAV_META = {
  dashboard: ["Overview", LayoutDashboard],
  schools: ["School Management", School],
  admissions: ["Applications", FileText],
  students: ["Students", Users],
  teachers: ["Staff Management", GraduationCap],
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

/* =========================================================
   DEMO DATA
   ========================================================= */

const initialData = {
  schools: [
    {
      id: "S1",
      name: "Hermann Gmeiner High School",
      centre: "3333",
      location: "Manzini",
      type: "High School",
      phone: "+268 2400 0000",
      email: "demo@school.sz",
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
          id: "STAFF1",
          name: "Dr. J. Dlamini",
          role: "Principal",
          email: "principal@demo.sz"
        },
        {
          id: "STAFF2",
          name: "Mr. B. Mamba",
          role: "Deputy Principal",
          email: "deputy@demo.sz"
        },
        {
          id: "STAFF3",
          name: "Mr. M. Nkosi",
          role: "Teacher",
          email: "teacher@demo.sz",
          subjects: ["Mathematics", "English"],
          grades: ["Form 1", "Form 2"]
        },
        {
          id: "STAFF4",
          name: "Ms. P. Mamba",
          role: "Accountant",
          email: "accountant@demo.sz"
        },
        {
          id: "STAFF5",
          name: "Mrs. S. Hlophe",
          role: "Secretary",
          email: "secretary@demo.sz"
        }
      ]
    },
    {
      id: "S2",
      name: "Mbabane Valley Secondary School",
      centre: "4444",
      location: "Mbabane",
      type: "High School",
      phone: "+268 2400 1111",
      email: "valley@demo.sz",
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
      phone: "+268 2400 2222",
      email: "royal@demo.sz",
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
      id: "ST001",
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
        Science: {
          test: 76,
          exam: 80,
          comment: "Good effort"
        }
      }
    },

    {
      id: "ST002",
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
        },
        Science: {
          test: 69,
          exam: 73,
          comment: ""
        }
      }
    },

    {
      id: "ST003",
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
        },
        English: {
          test: 65,
          exam: 62,
          comment: ""
        }
      }
    }
  ],

  applications: [],

  payments: [
    {
      id: "PAY001",
      studentId: "ST001",
      parentEmail: "parent@demo.sz",
      schoolId: "S1",
      amount: 1500,
      status: "APPROVED",
      receipt: "Demo receipt - E1500",
      date: "2026-08-20"
    },

    {
      id: "PAY002",
      studentId: "ST002",
      parentEmail: "parent@demo.sz",
      schoolId: "S1",
      amount: 1000,
      status: "PENDING",
      receipt: "Demo receipt - E1000",
      date: "2026-08-21"
    }
  ],

  notifications: [
    {
      id: "N001",
      title: "Welcome to EduLink Eswatini",
      body: "This is a fictional demonstration notification.",
      audience: "all",
      schoolId: "S1",
      date: "2026-08-21"
    }
  ],

  calendar: [
    {
      id: "C001",
      title: "Parent Meeting",
      date: "2026-09-05",
      time: "14:00",
      details: "Main hall",
      schoolId: "S1"
    }
  ]
};

/* =========================================================
   DEMO ACCOUNTS
   ========================================================= */

const ACCOUNTS = {
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

  "admin@demo.sz": {
    role: "System Admin",
    name: "EduLink Administrator"
  }
};

/* =========================================================
   HELPERS
   ========================================================= */

function cloneInitialData() {
  return JSON.parse(JSON.stringify(initialData));
}

function loadData() {
  try {
    const stored = localStorage.getItem(
      "edulink-demo-data"
    );

    if (!stored) {
      return cloneInitialData();
    }

    const parsed = JSON.parse(stored);

    if (
      !parsed ||
      !Array.isArray(parsed.schools) ||
      !Array.isArray(parsed.pendingSchools) ||
      !Array.isArray(parsed.students) ||
      !Array.isArray(parsed.applications) ||
      !Array.isArray(parsed.payments) ||
      !Array.isArray(parsed.notifications) ||
      !Array.isArray(parsed.calendar)
    ) {
      return cloneInitialData();
    }

    return parsed;
  } catch {
    return cloneInitialData();
  }
}

function saveData(data) {
  try {
    localStorage.setItem(
      "edulink-demo-data",
      JSON.stringify(data)
    );
  } catch {
    /* Demo storage failure should not crash the UI. */
  }
}

function totalSpaces(spaces = {}) {
  return Object.values(spaces).reduce(
    (sum, value) => sum + Number(value || 0),
    0
  );
}

function average(student) {
  const values = Object.values(
    student.subjects || {}
  ).flatMap((subject) => [
    Number(subject.test || 0),
    Number(subject.exam || 0)
  ]);

  if (!values.length) return 0;

  return Math.round(
    values.reduce((a, b) => a + b, 0) /
      values.length
  );
}

function aggregate(student) {
  return Object.values(
    student.subjects || {}
  ).reduce(
    (sum, subject) =>
      sum +
      Number(subject.test || 0) +
      Number(subject.exam || 0),
    0
  );
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

/* =========================================================
   APP
   ========================================================= */

function App() {
  const [data, setData] = useState(loadData);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    saveData(data);
  }, [data]);

  if (!user) {
    return (
      <Public
        data={data}
        setData={setData}
        onLogin={(loggedUser) => {
          setUser(loggedUser);
          setPage("dashboard");
        }}
      />
    );
  }

  const permissions =
    ROLE_PERMISSIONS[user.role] || [];

  return (
    <div className="app">
      <aside
        className={`sidebar ${
          mobile ? "open" : ""
        }`}
      >
        <div className="brand">
          <div className="brandIcon">
            <ShieldCheck size={22} />
          </div>

          <div>
            EduLink <span>ESWATINI</span>
          </div>
        </div>

        <div className="roleBadge">
          {user.role}
        </div>

        <nav>
          {permissions.map((key) => {
            const meta = NAV_META[key];

            if (!meta) return null;

            const [label, Icon] = meta;

            return (
              <button
                key={key}
                className={
                  page === key
                    ? "navActive"
                    : ""
                }
                onClick={() => {
                  setPage(key);
                  setMobile(false);
                }}
              >
                <Icon size={18} />
                {label}
              </button>
            );
          })}
        </nav>

        <button
          className="logout"
          onClick={() => {
            setUser(null);
            setPage("home");
          }}
        >
          <LogOut size={18} />
          Sign out
        </button>
      </aside>

      <main className="main">
        <header className="topbar">
          <button
            className="mobileBtn"
            onClick={() =>
              setMobile((value) => !value)
            }
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
                      (school) =>
                        school.id ===
                        user.schoolId
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
          <Page
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

function Public({
  data,
  setData,
  onLogin
}) {
  const [search, setSearch] = useState("");
  const [showLogin, setShowLogin] =
    useState(false);
  const [showRegistration, setShowRegistration] =
    useState(false);
  const [selectedSchool, setSelectedSchool] =
    useState(null);

  const schools = data.schools.filter(
    (school) => {
      const text =
        `${school.name} ${school.centre} ${school.location}`.toLowerCase();

      return (
        school.status === "APPROVED" &&
        text.includes(
          search.toLowerCase()
        )
      );
    }
  );

  if (selectedSchool) {
    return (
      <div className="public">
        <PublicHeader
          onLogin={() =>
            setShowLogin(true)
          }
          onSchools={() =>
            setSelectedSchool(null)
          }
        />

        <SchoolProfile
          school={selectedSchool}
          onBack={() =>
            setSelectedSchool(null)
          }
          onLogin={() =>
            setShowLogin(true)
          }
        />

        {showLogin && (
          <LoginModal
            onClose={() =>
              setShowLogin(false)
            }
            onLogin={onLogin}
          />
        )}
      </div>
    );
  }

  return (
    <div className="public">
      <PublicHeader
        onLogin={() =>
          setShowLogin(true)
        }
        onSchools={() =>
          document
            .getElementById("schools")
            ?.scrollIntoView({
              behavior: "smooth"
            })
        }
      />

      <section className="hero">
        <div className="heroCopy">
          <span className="eyebrow">
            EDUCATION • CONNECTION • OPPORTUNITY
          </span>

          <h1>
            One platform for{" "}
            <em>
              schools, parents and students.
            </em>
          </h1>

          <p>
            Find schools, check available
            spaces, apply online, monitor
            your child's progress and stay
            connected with school
            communications.
          </p>

          <div className="actions">
            <button
              className="primary"
              onClick={() =>
                document
                  .getElementById("schools")
                  ?.scrollIntoView({
                    behavior: "smooth"
                  })
              }
            >
              Find a School
              <ChevronRight size={17} />
            </button>

            <button
              className="secondary"
              onClick={() =>
                setShowRegistration(true)
              }
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
              <strong>
                {data.schools.length}
              </strong>
              <small>
                Registered schools
              </small>
            </div>

            <div>
              <strong>
                {data.schools.reduce(
                  (total, school) =>
                    total +
                    totalSpaces(
                      school.spaces
                    ),
                  0
                )}
              </strong>
              <small>
                Available spaces
              </small>
            </div>

            <div>
              <strong>
                {
                  data.applications.filter(
                    (item) =>
                      item.status ===
                      "PENDING"
                  ).length
                }
              </strong>
              <small>
                Active applications
              </small>
            </div>
          </div>

          <div className="miniNote">
            <CheckCircle size={18} />
            Secure role-based school
            management
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
            Search approved participating
            schools by name, Centre Number
            or location.
          </p>
        </div>

        <div className="searchBox">
          <Search size={19} />

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search school, Centre Number or location..."
          />
        </div>

        <div className="schoolGrid">
          {schools.map((school) => (
            <button
              className="schoolCard"
              key={school.id}
              onClick={() =>
                setSelectedSchool(
                  school
                )
              }
            >
              <div className="schoolIcon">
                <School />
              </div>

              <div className="schoolCardBody">
                <div className="schoolLine">
                  <span>{school.type}</span>

                  <b>
                    {school.admission ===
                    "OPEN"
                      ? "Admissions Open"
                      : "Admissions Closed"}
                  </b>
                </div>

                <h3>{school.name}</h3>

                <p>
                  Centre Number:{" "}
                  {school.centre}
                </p>

                <p>{school.location}</p>

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
              </div>
            </button>
          ))}
        </div>

        {!schools.length && (
          <div className="empty">
            No approved schools match your
            search.
          </div>
        )}
      </section>

      <section
        className="publicSection alt"
        id="about"
      >
        <div className="sectionHead">
          <span className="eyebrow">
            HOW IT WORKS
          </span>

          <h2>
            One connected education
            experience
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
            EduLink <span>ESWATINI</span>
          </div>
        </div>

        <p>
          Fictional prototype data • Not
          affiliated with ECESWA or SNAT.
        </p>
      </footer>

      {showLogin && (
        <LoginModal
          onClose={() =>
            setShowLogin(false)
          }
          onLogin={onLogin}
        />
      )}

      {showRegistration && (
        <SchoolRegistration
          data={data}
          setData={setData}
          onClose={() =>
            setShowRegistration(false)
          }
        />
      )}
    </div>
  );
}

/* =========================================================
   PUBLIC HEADER
   ========================================================= */

function PublicHeader({
  onLogin,
  onSchools
}) {
  return (
    <header className="publicHeader">
      <div className="brand">
        <div className="brandIcon">
          <ShieldCheck size={22} />
        </div>

        <div>
          EduLink <span>ESWATINI</span>
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

function Feature({
  icon,
  title,
  text
}) {
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

function LoginModal({
  onClose,
  onLogin
}) {
  const roles = [
    ["Parent", "parent@demo.sz", UserPlus],
    ["Teacher", "teacher@demo.sz", GraduationCap],
    ["Principal", "principal@demo.sz", ShieldCheck],
    [
      "Deputy Principal",
      "deputy@demo.sz",
      ShieldCheck
    ],
    [
      "Accountant",
      "accountant@demo.sz",
      Wallet
    ],
    [
      "Secretary",
      "secretary@demo.sz",
      MessageSquare
    ],
    [
      "System Admin",
      "admin@demo.sz",
      Settings
    ]
  ];

  const [email, setEmail] =
    useState("parent@demo.sz");

  const [password, setPassword] =
    useState(PASSWORD);

  const [selectedRole, setSelectedRole] =
    useState("Parent");

  const [error, setError] =
    useState("");

  function selectRole(role, address) {
    setSelectedRole(role);
    setEmail(address);
    setPassword(PASSWORD);
    setError("");
  }

  function submit() {
    const normalized =
      email.trim().toLowerCase();

    const account = ACCOUNTS[normalized];

    if (!account || password !== PASSWORD) {
      setError(
        "Incorrect demo email or password."
      );
      return;
    }

    onLogin({
      email: normalized,
      ...account
    });
  }

  return (
    <Modal
      title="Login to EduLink"
      onClose={onClose}
    >
      <p className="muted">
        Select a role for the prototype
        presentation.
      </p>

      <div className="loginRoleGrid">
        {roles.map(
          ([label, address, Icon]) => (
            <button
              type="button"
              key={label}
              className={`loginRoleCard ${
                selectedRole === label
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                selectRole(
                  label,
                  address
                )
              }
            >
              <span className="loginRoleIcon">
                <Icon size={19} />
              </span>

              <span className="loginRoleText">
                <b>{label}</b>
                <small>
                  {address}
                </small>
              </span>

              <ChevronRight size={17} />
            </button>
          )
        )}
      </div>

      <label>
        Email
        <input
          value={email}
          onChange={(event) =>
            setEmail(
              event.target.value
            )
          }
        />
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(
              event.target.value
            )
          }
        />
      </label>

      <div className="demoBox">
        Demo password: <b>{PASSWORD}</b>
        <br />
        Selected role:{" "}
        <b>{selectedRole}</b>
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
  const [form, setForm] =
    useState({
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

  const [done, setDone] =
    useState(false);

  function update(key, value) {
    setForm((old) => ({
      ...old,
      [key]: value
    }));
  }

  function submit(event) {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.centre.trim() ||
      !form.location.trim() ||
      !form.principal.trim()
    ) {
      return;
    }

    const staffNames = form.staff
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean);

    const pendingSchool = {
      ...form,
      id: uid("PS"),
      status: "PENDING",
      staff: [
        {
          id: uid("STAFF"),
          name: form.principal,
          role: "Principal"
        },
        ...(form.deputy.trim()
          ? [
              {
                id: uid("STAFF"),
                name: form.deputy,
                role: "Deputy Principal"
              }
            ]
          : []),
        ...staffNames.map((name) => ({
          id: uid("STAFF"),
          name,
          role: "Teacher"
        }))
      ],
      spaces: {},
      fees: 0
    };

    setData((old) => ({
      ...old,
      pendingSchools: [
        ...old.pendingSchools,
        pendingSchool
      ]
    }));

    setDone(true);
  }

  return (
    <Modal
      title="Register Your School"
      onClose={onClose}
    >
      {done ? (
        <>
          <div className="successBox">
            <CheckCircle />
            School registration submitted.
          </div>

          <p className="muted">
            The System Admin will verify
            whether the school exists and
            whether the information provided
            is truthful before approving or
            rejecting the school.
          </p>

          <button
            className="primary full"
            onClick={onClose}
          >
            Done
          </button>
        </>
      ) : (
        <form onSubmit={submit}>
          <div className="formGrid">
            <label>
              School name*
              <input
                value={form.name}
                onChange={(e) =>
                  update(
                    "name",
                    e.target.value
                  )
                }
                required
              />
            </label>

            <label>
              Centre Number*
              <input
                value={form.centre}
                onChange={(e) =>
                  update(
                    "centre",
                    e.target.value
                  )
                }
                required
              />
            </label>

            <label>
              Location*
              <input
                value={form.location}
                onChange={(e) =>
                  update(
                    "location",
                    e.target.value
                  )
                }
                required
              />
            </label>

            <label>
              School type
              <select
                value={form.type}
                onChange={(e) =>
                  update(
                    "type",
                    e.target.value
                  )
                }
              >
                <option>Primary School</option>
                <option>High School</option>
                <option>Combined School</option>
              </select>
            </label>

            <label>
              School phone
              <input
                value={form.phone}
                onChange={(e) =>
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
                onChange={(e) =>
                  update(
                    "email",
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Principal name*
              <input
                value={form.principal}
                onChange={(e) =>
                  update(
                    "principal",
                    e.target.value
                  )
                }
                required
              />
            </label>

            <label>
              Deputy Principal name
              <input
                value={form.deputy}
                onChange={(e) =>
                  update(
                    "deputy",
                    e.target.value
                  )
                }
              />
            </label>
          </div>

          <label>
            Other staff names
            <textarea
              value={form.staff}
              onChange={(e) =>
                update(
                  "staff",
                  e.target.value
                )
              }
              placeholder="Separate staff names with commas"
            />
          </label>

          <div className="demoBox">
            <b>Important:</b> This prototype
            submits the school to System
            Admin approval. It does not
            automatically register the school.
          </div>

          <button
            className="primary full"
            type="submit"
          >
            Submit School for Approval
          </button>
        </form>
      )}
    </Modal>
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
            Centre Number:{" "}
            <b>{school.centre}</b> •{" "}
            {school.location} •{" "}
            {school.type}
          </p>
        </div>

        <span className="openBadge">
          {school.admission === "OPEN"
            ? "ADMISSIONS OPEN"
            : "ADMISSIONS CLOSED"}
        </span>
      </div>

      <div className="profileGrid">
        <div className="infoPanel">
          <h3>Available spaces</h3>

          <div className="bigNumber">
            {totalSpaces(school.spaces)}
          </div>

          <div className="spaceRows">
            {Object.entries(
              school.spaces || {}
            ).map(
              ([grade, number]) => (
                <div key={grade}>
                  <span>{grade}</span>
                  <b>
                    {Number(number) > 0
                      ? number
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
            {Number(
              school.fees || 0
            ).toLocaleString()}
          </div>

          <p>
            Demo annual school fees.
            Parents must log in before
            applying.
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

/* =========================================================
   PAGE ROUTER
   ========================================================= */

function Page({
  page,
  user,
  data,
  setData,
  setPage
}) {
  switch (page) {
    case "dashboard":
      return (
        <Dashboard
          user={user}
          data={data}
          setPage={setPage}
        />
      );

    case "schools":
      return (
        <SchoolDirectory
          user={user}
          data={data}
        />
      );

    case "admissions":
      return (
        <Admissions
          user={user}
          data={data}
          setData={setData}
        />
      );

    case "students":
      return (
        <Students
          user={user}
          data={data}
        />
      );

    case "teachers":
      return (
        <StaffManagement
          user={user}
          data={data}
          setData={setData}
        />
      );

    case "attendance":
      return (
        <Attendance
          user={user}
          data={data}
          setData={setData}
        />
      );

    case "marks":
      return (
        <Marks
          user={user}
          data={data}
          setData={setData}
        />
      );

    case "finance":
      return (
        <Finance
          user={user}
          data={data}
          setData={setData}
        />
      );

    case "spaces":
      return (
        <Spaces
          user={user}
          data={data}
          setData={setData}
        />
      );

    case "resources":
      return (
        <Resources
          user={user}
          data={data}
          setData={setData}
        />
      );

    case "notifications":
      return (
        <Notifications
          user={user}
          data={data}
          setData={setData}
        />
      );

    case "calendar":
      return (
        <Calendar
          user={user}
          data={data}
          setData={setData}
        />
      );

    case "children":
      return (
        <Children
          user={user}
          data={data}
        />
      );

    case "applications":
      return (
        <ParentApplications
          user={user}
          data={data}
          setData={setData}
        />
      );

    case "fees":
      return (
        <ParentFees
          user={user}
          data={data}
          setData={setData}
        />
      );

    case "reports":
      return (
        <Reports
          user={user}
          data={data}
        />
      );

    case "settings":
      return (
        <SettingsPage
          user={user}
        />
      );

    default:
      return (
        <Dashboard
          user={user}
          data={data}
          setPage={setPage}
        />
      );
  }
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
      <AdminDashboard
        data={data}
        setPage={setPage}
      />
    );
  }

  if (user.role === "Parent") {
    return (
      <ParentDashboard
        user={user}
        data={data}
        setPage={setPage}
      />
    );
  }

  const school = data.schools.find(
    (item) => item.id === user.schoolId
  );

  const students = data.students.filter(
    (student) =>
      student.schoolId === user.schoolId
  );

  const applications =
    data.applications.filter(
      (application) =>
        application.schoolId ===
        user.schoolId
    );

  if (
    user.role === "Teacher"
  ) {
    return (
      <TeacherDashboard
        user={user}
        students={students}
        setPage={setPage}
      />
    );
  }

  if (
    user.role === "Accountant"
  ) {
    return (
      <AccountantDashboard
        user={user}
        data={data}
        students={students}
        setPage={setPage}
      />
    );
  }

  if (
    user.role === "Secretary"
  ) {
    return (
      <SecretaryDashboard
        user={user}
        data={data}
        setPage={setPage}
      />
    );
  }

  return (
    <SchoolAdminDashboard
      user={user}
      school={school}
      students={students}
      applications={applications}
      data={data}
      setPage={setPage}
    />
  );
}

/* =========================================================
   ADMIN DASHBOARD
   ========================================================= */

function AdminDashboard({
  data,
  setPage
}) {
  return (
    <>
      <PageHeader
        eyebrow="SYSTEM ADMINISTRATION"
        title="Platform Overview"
        text="Manage participating schools and keep the EduLink platform running smoothly."
      />

      <div className="statGrid">
        <Stat
          icon={<School />}
          label="Registered Schools"
          value={data.schools.length}
        />

        <Stat
          icon={<Clock />}
          label="Pending Schools"
          value={data.pendingSchools.length}
        />

        <Stat
          icon={<CheckCircle />}
          label="Approved Schools"
          value={
            data.schools.filter(
              (school) =>
                school.status ===
                "APPROVED"
            ).length
          }
        />

        <Stat
          icon={<XCircle />}
          label="Rejected"
          value="—"
        />
      </div>

      <div className="dashboardGrid">
        <Panel
          title="School verification"
          icon={<ShieldCheck />}
        >
          <p className="muted">
            Every school registration must
            be checked before approval.
          </p>

          <button
            className="primary"
            onClick={() =>
              setPage("schools")
            }
          >
            Review Schools
          </button>
        </Panel>

        <Panel
          title="Administrator responsibility"
          icon={<Settings />}
        >
          <p className="muted">
            System Admin does not manage
            school academic performance,
            fees or school notifications.
          </p>
        </Panel>
      </div>
    </>
  );
}

/* =========================================================
   SCHOOL ADMIN DASHBOARD
   ========================================================= */

function SchoolAdminDashboard({
  user,
  school,
  students,
  applications,
  data,
  setPage
}) {
  if (!school) {
    return (
      <EmptyState text="School account could not be found." />
    );
  }

  const outstanding = data.payments
    .filter(
      (payment) =>
        payment.schoolId === school.id
    )
    .reduce(
      (sum, payment) =>
        sum +
        (payment.status ===
        "APPROVED"
          ? 0
          : Number(payment.amount || 0)),
      0
    );

  return (
    <>
      <PageHeader
        eyebrow={user.role}
        title={school.name}
        text="School management dashboard."
      />

      <div className="statGrid">
        <Stat
          icon={<Users />}
          label="Students"
          value={students.length}
        />

        <Stat
          icon={<FileText />}
          label="Applications"
          value={
            applications.filter(
              (item) =>
                item.status === "PENDING"
            ).length
          }
        />

        <Stat
          icon={<Boxes />}
          label="Available Spaces"
          value={totalSpaces(
            school.spaces
          )}
        />

        <Stat
          icon={<Wallet />}
          label="Fees Overview"
          value={`E${outstanding.toLocaleString()}`}
        />
      </div>

      <div className="dashboardGrid">
        <Panel
          title="Admissions"
          icon={<ClipboardList />}
        >
          <p>
            Active applications:{" "}
            <b>
              {
                applications.filter(
                  (item) =>
                    item.status ===
                    "PENDING"
                ).length
              }
            </b>
          </p>

          <button
            className="secondary"
            onClick={() =>
              setPage("admissions")
            }
          >
            Manage Applications
          </button>
        </Panel>

        <Panel
          title="Academic performance"
          icon={<BookOpen />}
        >
          <p>
            School average:{" "}
            <b>
              {students.length
                ? Math.round(
                    students.reduce(
                      (sum, student) =>
                        sum +
                        average(student),
                      0
                    ) /
                      students.length
                  )
                : 0}
              %
            </b>
          </p>

          <button
            className="secondary"
            onClick={() =>
              setPage("marks")
            }
          >
            View Marks
          </button>
        </Panel>
      </div>
    </>
  );
}

/* =========================================================
   TEACHER DASHBOARD
   ========================================================= */

function TeacherDashboard({
  user,
  students,
  setPage
}) {
  const assigned = students.filter(
    (student) =>
      user.grades?.includes(student.form)
  );

  return (
    <>
      <PageHeader
        eyebrow="TEACHER"
        title="Teaching Overview"
        text="View school students and manage marks and attendance for the subjects and grades assigned to you."
      />

      <div className="statGrid">
        <Stat
          icon={<Users />}
          label="Students in Assigned Grades"
          value={assigned.length}
        />

        <Stat
          icon={<BookOpen />}
          label="Subjects"
          value={user.subjects?.length || 0}
        />

        <Stat
          icon={<CalendarCheck />}
          label="Attendance"
          value="Teacher register"
        />

        <Stat
          icon={<CalendarDays />}
          label="Calendar"
          value="School"
        />
      </div>

      <Panel
        title="Student overview"
        icon={<Users />}
      >
        <StudentTable
          students={assigned}
        />
      </Panel>
    </>
  );
}

/* =========================================================
   ACCOUNTANT DASHBOARD
   ========================================================= */

function AccountantDashboard({
  user,
  data,
  students,
  setPage
}) {
  const payments = data.payments.filter(
    (payment) =>
      payment.schoolId === user.schoolId
  );

  return (
    <>
      <PageHeader
        eyebrow="ACCOUNTANT"
        title="Finance Department"
        text="Manage student fee balances, payments and parent receipt verification."
      />

      <div className="statGrid">
        <Stat
          icon={<Users />}
          label="Students"
          value={students.length}
        />

        <Stat
          icon={<Wallet />}
          label="Payments"
          value={payments.length}
        />

        <Stat
          icon={<Clock />}
          label="Pending Receipts"
          value={
            payments.filter(
              (p) =>
                p.status === "PENDING"
            ).length
          }
        />
      </div>

      <Panel
        title="Student fee table"
        icon={<Wallet />}
      >
        <FeeTable
          students={students}
          payments={payments}
          feeAmount={
            data.schools.find(
              (school) =>
                school.id ===
                user.schoolId
            )?.fees || 0
          }
        />
      </Panel>

      <button
        className="primary"
        onClick={() =>
          setPage("finance")
        }
      >
        Open Finance
      </button>
    </>
  );
}

/* =========================================================
   SECRETARY DASHBOARD
   ========================================================= */

function SecretaryDashboard({
  data,
  setPage
}) {
  return (
    <>
      <PageHeader
        eyebrow="SECRETARY"
        title="School Communications"
        text="Manage announcements, notifications and the school calendar."
      />

      <div className="dashboardGrid">
        <Panel
          title="Notifications"
          icon={<Bell />}
        >
          <p>
            {data.notifications.length}{" "}
            notification records.
          </p>

          <button
            className="primary"
            onClick={() =>
              setPage(
                "notifications"
              )
            }
          >
            Manage Notifications
          </button>
        </Panel>

        <Panel
          title="School Calendar"
          icon={<CalendarDays />}
        >
          <p>
            {data.calendar.length} calendar
            events.
          </p>

          <button
            className="secondary"
            onClick={() =>
              setPage("calendar")
            }
          >
            Open Calendar
          </button>
        </Panel>
      </div>
    </>
  );
}

/* =========================================================
   PARENT DASHBOARD
   ========================================================= */

function ParentDashboard({
  user,
  data,
  setPage
}) {
  const children =
    data.students.filter(
      (student) =>
        student.parentEmail ===
        user.email
    );

  return (
    <>
      <PageHeader
        eyebrow="PARENT PORTAL"
        title="My Family"
        text="Only children linked to your parent account are shown here."
      />

      {!children.length ? (
        <EmptyState text="No enrolled children are linked to this account yet. Approved school applications will link a child to your account." />
      ) : (
        <div className="childGrid">
          {children.map((child) => (
            <div
              className="childCard"
              key={child.id}
            >
              <div className="childTop">
                <div className="avatar">
                  {child.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <h3>
                    {child.name}
                  </h3>

                  <p>
                    {child.form}
                  </p>
                </div>
              </div>

              <div className="childStats">
                <div>
                  <small>
                    Attendance
                  </small>
                  <strong>
                    {child.attendance}%
                  </strong>
                </div>

                <div>
                  <small>
                    Average
                  </small>
                  <strong>
                    {average(child)}%
                  </strong>
                </div>

                <div>
                  <small>
                    Aggregate
                  </small>
                  <strong>
                    {aggregate(child)}
                  </strong>
                </div>
              </div>

              <button
                className="secondary full"
                onClick={() =>
                  setPage("children")
                }
              >
                View Child
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="dashboardGrid">
        <Panel
          title="Applications"
          icon={<FileText />}
        >
          <p>
            Apply to participating schools
            and upload required documents.
          </p>

          <button
            className="primary"
            onClick={() =>
              setPage("applications")
            }
          >
            My Applications
          </button>
        </Panel>

        <Panel
          title="Find a School"
          icon={<School />}
        >
          <p>
            Search schools and check spaces
            before applying.
          </p>

          <button
            className="secondary"
            onClick={() =>
              setPage("schools")
            }
          >
            Find School
          </button>
        </Panel>
      </div>
    </>
  );
}

/* =========================================================
   SCHOOL DIRECTORY FOR LOGGED-IN PARENT
   ========================================================= */

function SchoolDirectory({
  user,
  data
}) {
  const [search, setSearch] =
    useState("");

  const [selected, setSelected] =
    useState(null);

  const schools = data.schools.filter(
    (school) => {
      const text =
        `${school.name} ${school.centre} ${school.location}`.toLowerCase();

      return (
        school.status === "APPROVED" &&
        text.includes(
          search.toLowerCase()
        )
      );
    }
  );

  return (
    <>
      <PageHeader
        eyebrow="SCHOOL DIRECTORY"
        title="Find a School"
        text="Search participating schools and view available spaces."
      />

      <div className="searchBox">
        <Search size={19} />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="School, Centre Number or location..."
        />
      </div>

      <div className="schoolGrid">
        {schools.map((school) => (
          <div
            className="schoolCard"
            key={school.id}
          >
            <div className="schoolIcon">
              <School />
            </div>

            <div className="schoolCardBody">
              <div className="schoolLine">
                <span>{school.type}</span>
                <b>
                  {school.admission ===
                  "OPEN"
                    ? "OPEN"
                    : "CLOSED"}
                </b>
              </div>

              <h3>{school.name}</h3>

              <p>
                Centre: {school.centre}
              </p>

              <p>
                <MapPin size={14} />{" "}
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
                className="secondary full"
                onClick={() =>
                  setSelected(school)
                }
              >
                View School
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <Modal
          title={selected.name}
          onClose={() =>
            setSelected(null)
          }
        >
          <p>
            Centre Number:{" "}
            <b>{selected.centre}</b>
          </p>

          <p>
            Location:{" "}
            <b>{selected.location}</b>
          </p>

          <p>
            Admission:{" "}
            <b>{selected.admission}</b>
          </p>

          <h3>Available spaces</h3>

          <div className="spaceRows">
            {Object.entries(
              selected.spaces || {}
            ).map(
              ([form, count]) => (
                <div key={form}>
                  <span>{form}</span>
                  <b>
                    {Number(count) > 0
                      ? count
                      : "FULL"}
                  </b>
                </div>
              )
