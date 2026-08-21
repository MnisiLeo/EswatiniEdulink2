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
  Trash2,
  Plus,
  UserCheck
} from "lucide-react";
import "./styles.css";

/* =========================================================
   EDULINK ESWATINI
   Functional presentation prototype
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
    "calendar",
    "notifications",
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
    "calendar",
    "notifications",
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
  dashboard: ["Dashboard", LayoutDashboard],
  schools: ["Find a School", School],
  admissions: ["Applications", FileText],
  students: ["Students", Users],
  teachers: ["Staff", GraduationCap],
  attendance: ["Attendance", CalendarCheck],
  marks: ["Marks & Performance", BookOpen],
  finance: ["Finance", Wallet],
  children: ["My Children", Users],
  applications: ["My Applications", FileText],
  fees: ["School Fees", Receipt],
  notifications: ["Notifications", MessageSquare],
  calendar: ["School Calendar", CalendarDays],
  reports: ["Reports", FileText],
  settings: ["Settings", Settings]
};

/* =========================================================
   INITIAL DATA
   ========================================================= */

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
      }
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
      }
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
      }
    }
  ],

  pendingSchools: [],

  staff: [
    {
      id: "STF1",
      name: "Dr. J. Dlamini",
      role: "Principal",
      schoolId: "S1"
    },
    {
      id: "STF2",
      name: "Mr. B. Mamba",
      role: "Deputy Principal",
      schoolId: "S1"
    },
    {
      id: "STF3",
      name: "Mr. M. Nkosi",
      role: "Teacher",
      schoolId: "S1",
      subjects: ["Mathematics", "English"],
      grades: ["Form 1", "Form 2"]
    },
    {
      id: "STF4",
      name: "Ms. P. Mamba",
      role: "Accountant",
      schoolId: "S1"
    },
    {
      id: "STF5",
      name: "Mrs. S. Hlophe",
      role: "Secretary",
      schoolId: "S1"
    }
  ],

  students: [
    {
      id: "STU1",
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
        }
      }
    },
    {
      id: "STU2",
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
      id: "STU3",
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
      id: "PAY1",
      studentId: "STU1",
      parentEmail: "parent@demo.sz",
      amount: 1500,
      status: "APPROVED",
      receipt: "Demo receipt E1500"
    },
    {
      id: "PAY2",
      studentId: "STU2",
      parentEmail: "parent@demo.sz",
      amount: 1000,
      status: "PENDING",
      receipt: "Demo receipt E1000"
    }
  ],

  notifications: [
    {
      id: "N1",
      title: "Welcome to EduLink Eswatini",
      body: "Welcome to the EduLink demonstration platform.",
      audience: "all"
    }
  ],

  calendar: [
    {
      id: "CAL1",
      title: "Parent Meeting",
      date: "2026-09-05",
      time: "14:00",
      details: "Main Hall",
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

/* =========================================================
   DATA HELPERS
   ========================================================= */

function createInitialData() {
  return JSON.parse(JSON.stringify(INITIAL_DATA));
}

function loadData() {
  try {
    const saved = localStorage.getItem("edulink-eswatini-data");

    if (!saved) {
      return createInitialData();
    }

    const parsed = JSON.parse(saved);

    if (
      !parsed ||
      !Array.isArray(parsed.schools) ||
      !Array.isArray(parsed.pendingSchools) ||
      !Array.isArray(parsed.staff) ||
      !Array.isArray(parsed.students) ||
      !Array.isArray(parsed.applications) ||
      !Array.isArray(parsed.payments) ||
      !Array.isArray(parsed.notifications) ||
      !Array.isArray(parsed.calendar)
    ) {
      return createInitialData();
    }

    return parsed;
  } catch (error) {
    console.error("EduLink storage error:", error);
    return createInitialData();
  }
}

function saveData(data) {
  try {
    localStorage.setItem(
      "edulink-eswatini-data",
      JSON.stringify(data)
    );
  } catch (error) {
    console.error("Could not save EduLink data:", error);
  }
}

function totalSpaces(spaces) {
  return Object.values(spaces || {}).reduce(
    (total, value) => total + Number(value || 0),
    0
  );
}

function averageStudent(student) {
  const marks = Object.values(student.subjects || {}).flatMap(
    (subject) => [
      Number(subject.test || 0),
      Number(subject.exam || 0)
    ]
  );

  if (!marks.length) {
    return 0;
  }

  return Math.round(
    marks.reduce((total, mark) => total + mark, 0) /
      marks.length
  );
}

function aggregateStudent(student) {
  return Object.values(student.subjects || {}).reduce(
    (total, subject) =>
      total +
      Number(subject.test || 0) +
      Number(subject.exam || 0),
    0
  );
}

/* =========================================================
   APP
   ========================================================= */

function App() {
  const [data, setData] = useState(loadData);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    saveData(data);
  }, [data]);

  function login(account) {
    setUser(account);
    setPage("dashboard");
  }

  function logout() {
    setUser(null);
    setPage("home");
    setMobileMenu(false);
  }

  if (!user) {
    return (
      <PublicHome
        data={data}
        setData={setData}
        onLogin={login}
      />
    );
  }

  return (
    <AuthenticatedApp
      user={user}
      data={data}
      setData={setData}
      page={page}
      setPage={setPage}
      logout={logout}
      mobileMenu={mobileMenu}
      setMobileMenu={setMobileMenu}
    />
  );
}

/* =========================================================
   PUBLIC HOME
   ========================================================= */

function PublicHome({ data, setData, onLogin }) {
  const [search, setSearch] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [registrationOpen, setRegistrationOpen] =
    useState(false);
  const [selectedSchool, setSelectedSchool] =
    useState(null);

  const schools = data.schools.filter(
    (school) => school.status === "APPROVED"
  );

  const filteredSchools = schools.filter((school) => {
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
            onLogin={(account) => {
              setLoginOpen(false);
              onLogin(account);
            }}
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
            <em>schools, parents and students.</em>
          </h1>

          <p>
            Find schools, check available spaces,
            submit applications, monitor your
            child's progress and stay connected
            with school communications.
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
                setRegistrationOpen(true)
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
              <strong>{schools.length}</strong>
              <small>Approved schools</small>
            </div>

            <div>
              <strong>
                {schools.reduce(
                  (total, school) =>
                    total + totalSpaces(school.spaces),
                  0
                )}
              </strong>
              <small>Available spaces</small>
            </div>

            <div>
              <strong>
                {data.pendingSchools.length}
              </strong>
              <small>Pending registrations</small>
            </div>
          </div>

          <div className="miniNote">
            <CheckCircle size={18} />
            <span>
              Connected education management
            </span>
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

          <h2>Find a School</h2>

          <p>
            Search approved schools by name,
            Centre Number or location.
          </p>
        </div>

        <div className="searchBox">
          <Search size={19} />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search school, Centre Number or location..."
          />
        </div>

        <div className="schoolGrid">
          {filteredSchools.map((school) => (
            <button
              className="schoolCard"
              key={school.id}
              onClick={() =>
                setSelectedSchool(school)
              }
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
            HOW EDULINK WORKS
          </span>

          <h2>
            A connected education experience
          </h2>
        </div>

        <div className="featureGrid">
          <Feature
            icon="🏫"
            title="Find Schools"
            text="Parents can discover approved schools and available spaces."
          />

          <Feature
            icon="📝"
            title="Online Applications"
            text="Parents submit applications and upload required documents."
          />

          <Feature
            icon="📊"
            title="Child Performance"
            text="Parents only see the attendance, marks and performance of their own children."
          />

          <Feature
            icon="💳"
            title="Fee Management"
            text="School finance staff manage payments, balances and receipts."
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
          EduLink Eswatini demonstration
          prototype.
        </p>
      </footer>

      {loginOpen && (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          onLogin={(account) => {
            setLoginOpen(false);
            onLogin(account);
          }}
        />
      )}

      {registrationOpen && (
        <SchoolRegistration
          data={data}
          setData={setData}
          onClose={() =>
            setRegistrationOpen(false)
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
            ).map(([grade, number]) => (
              <div key={grade}>
                <span>{grade}</span>

                <b>
                  {number > 0
                    ? number
                    : "FULL"}
                </b>
              </div>
            ))}
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
            Demonstration annual school
            fees. Parents must log in before
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
   LOGIN
   ========================================================= */

function LoginModal({
  onClose,
  onLogin
}) {
  const [email, setEmail] =
    useState("parent@demo.sz");

  const [password, setPassword] =
    useState(PASSWORD);

  const [error, setError] =
    useState("");

  function submit(event) {
    event.preventDefault();

    const address =
      email.trim().toLowerCase();

    const account = ACCOUNTS[address];

    if (!account) {
      setError(
        "Account not found. Use one of the demonstration accounts."
      );
      return;
    }

    if (password !== PASSWORD) {
      setError(
        "Incorrect password. Demo password is demo123."
      );
      return;
    }

    onLogin({
      email: address,
      ...account
    });
  }

  return (
    <Modal
      title="Login to EduLink"
      onClose={onClose}
    >
      <p className="muted">
        One login for every EduLink user.
        Your role determines what you can
        access.
      </p>

      <div className="loginRoleGrid">
        {Object.entries(ACCOUNTS).map(
          ([address, account]) => (
            <button
              type="button"
              className="loginRoleCard"
              key={address}
              onClick={() => {
                setEmail(address);
                setPassword(PASSWORD);
                setError("");
              }}
            >
              <span className="loginRoleIcon">
                <UserCheck size={18} />
              </span>

              <span className="loginRoleText">
                <b>{account.role}</b>
                <small>{address}</small>
              </span>

              <ChevronRight size={16} />
            </button>
          )
        )}
      </div>

      <form onSubmit={submit}>
        <label>
          Email
          <input
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />
        </label>

        <div className="demoBox">
          Demo password: <b>demo123</b>
        </div>

        <button
          type="submit"
          className="primary full"
        >
          Login
        </button>

        {error && (
          <div className="error">
            {error}
          </div>
        )}
      </form>
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
      principal: "",
      deputy: "",
      accountant: "",
      secretary: "",
      teachers: ""
    });

  const [submitted, setSubmitted] =
    useState(false);

  function update(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
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
      alert(
        "School name, Centre Number, location and Principal are required."
      );
      return;
    }

    const pendingSchool = {
      id: `PS-${Date.now()}`,
      name: form.name.trim(),
      centre: form.centre.trim(),
      location: form.location.trim(),
      type: form.type,
      fees: 0,
      admission: "OPEN",
      status: "PENDING",
      spaces: {
        "Form 1": 0,
        "Form 2": 0,
        "Form 3": 0,
        "Form 4": 0,
        "Form 5": 0
      },
      registration: {
        principal: form.principal.trim(),
        deputy: form.deputy.trim(),
        accountant: form.accountant.trim(),
        secretary: form.secretary.trim(),
        teachers: form.teachers
          .split(",")
          .map((name) => name.trim())
          .filter(Boolean)
      }
    };

    setData((current) => ({
      ...current,
      pendingSchools: [
        ...current.pendingSchools,
        pendingSchool
      ]
    }));

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
            School registration submitted.
          </div>

          <p className="muted">
            The school now appears in the
            System Admin's Pending Schools
            section for verification.
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
              School name *
              <input
                value={form.name}
                onChange={(event) =>
                  update(
                    "name",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              Centre Number *
              <input
                value={form.centre}
                onChange={(event) =>
                  update(
                    "centre",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              Location *
              <input
                value={form.location}
                onChange={(event) =>
                  update(
                    "location",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              School type
              <select
                value={form.type}
                onChange={(event) =>
                  update(
                    "type",
                    event.target.value
                  )
                }
              >
                <option>High School</option>
                <option>Secondary School</option>
                <option>Primary School</option>
              </select>
            </label>

            <label>
              Principal *
              <input
                value={form.principal}
                onChange={(event) =>
                  update(
                    "principal",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              Deputy Principal
              <input
                value={form.deputy}
                onChange={(event) =>
                  update(
                    "deputy",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              Accountant
              <input
                value={form.accountant}
                onChange={(event) =>
                  update(
                    "accountant",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              Secretary
              <input
                value={form.secretary}
                onChange={(event) =>
                  update(
                    "secretary",
                    event.target.value
                  )
                }
              />
            </label>

            <label className="fullWidth">
              Teacher names
              <input
                value={form.teachers}
                onChange={(event) =>
                  update(
                    "teachers",
                    event.target.value
                  )
                }
                placeholder="Separate teacher names with commas"
              />
            </label>
          </div>

          <div className="demoBox">
            Submitted schools are not immediately
            approved. The System Admin must first
            verify the information.
          </div>

          <button
            type="submit"
            className="primary full"
          >
            Submit School Registration
          </button>
        </form>
      )}
    </Modal>
  );
}

/* =========================================================
   AUTHENTICATED APP
   ========================================================= */

function AuthenticatedApp({
  user,
  data,
  setData,
  page,
  setPage,
  logout,
  mobileMenu,
  setMobileMenu
}) {
  const allowed =
    ROLE_PERMISSIONS[user.role] || [];

  const school =
    user.schoolId
      ? data.schools.find(
          (item) =>
            item.id === user.schoolId
        )
      : null;

  return (
    <div className="app">
      <aside
        className={
          "sidebar " +
          (mobileMenu ? "open" : "")
        }
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
          {allowed.map((key) => {
            const meta = NAVIGATION[key];

            if (!meta) {
              return null;
            }

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
                  setMobileMenu(false);
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
            onClick={() =>
              setMobileMenu(
                (current) => !current
              )
            }
          >
            {mobileMenu ? (
              <X />
            ) : (
              <Menu />
            )}
          </button>

          <div>
            <strong>{user.name}</strong>

            <small>
              {user.role}

              {school
                ? ` • ${school.name}`
                : ""}
            </small>
          </div>

          <div className="topPill">
            DEMO MODE
          </div>
        </header>

        <div className="content">
          <AuthenticatedPage
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
   PAGE ROUTER
   ========================================================= */

function AuthenticatedPage({
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
        <ParentSchools
          user={user}
          data={data}
          setPage={setPage}
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

    case "children":
      return (
        <MyChildren
          user={user}
          data={data}
        />
      );

    case "applications":
      return (
        <ParentApplications
          user={user}
          data={data}
        />
      );

    case "fees":
      return (
        <ParentFees
          user={user}
          data={data}
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
        <CalendarPage
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
        <AdminSchools
          user={user}
          data={data}
          setData={setData}
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
  const school =
    user.schoolId
      ? data.schools.find(
          (item) =>
            item.id === user.schoolId
        )
      : null;

  if (user.role === "System Admin") {
    return (
      <>
        <HeaderBlock
          eyebrow="SYSTEM ADMINISTRATION"
          title="EduLink Administration"
          text="Manage school onboarding and platform operations."
        />

        <div className="statGrid">
          <Stat
            icon={<School />}
            value={data.schools.length}
            label="Registered schools"
          />

          <Stat
            icon={<Clock />}
            value={data.pendingSchools.length}
            label="Pending schools"
          />

          <Stat
            icon={<CheckCircle />}
            value={
              data.schools.filter(
                (schoolItem) =>
                  schoolItem.status ===
                  "APPROVED"
              ).length
            }
            label="Approved schools"
          />
        </div>

        <Panel title="Admin responsibility">
          <p className="muted">
            Verify that a school exists and
            that submitted information is true
            before approving or rejecting its
            registration.
          </p>

          <button
            className="primary"
            onClick={() =>
              setPage("settings")
            }
          >
            Open School Management
          </button>
        </Panel>
      </>
    );
  }

  if (user.role === "Parent") {
    const children =
      data.students.filter(
        (student) =>
          student.parentEmail === user.email
      );

    return (
      <>
        <HeaderBlock
          eyebrow="PARENT PORTAL"
          title="Welcome back"
          text="Your EduLink parent dashboard shows only information belonging to your children."
        />

        <div className="statGrid">
          <Stat
            icon={<Users />}
            value={children.length}
            label="My children"
          />

          <Stat
            icon={<FileText />}
            value={
              data.applications.filter(
                (application) =>
                  application.parentEmail ===
                  user.email
              ).length
            }
            label="My applications"
          />

          <Stat
            icon={<Receipt />}
            value={
              data.payments.filter(
                (payment) =>
                  payment.parentEmail ===
                  user.email
              ).length
            }
            label="My fee records"
          />
        </div>

        <Panel title="Parent access">
          <p className="muted">
            You can find schools, apply,
            upload documents and monitor only
            your accepted children's information.
          </p>
        </Panel>
      </>
    );
  }

  return (
    <>
      <HeaderBlock
        eyebrow={user.role.toUpperCase()}
        title={
          school
            ? school.name
            : "EduLink Dashboard"
        }
        text={`Welcome ${user.name}. Your access is restricted to your assigned role and school.`}
      />

      <div className="statGrid">
        <Stat
          icon={<Users />}
          value={
            user.schoolId
              ? data.students.filter(
                  (student) =>
                    student.schoolId ===
                    user.schoolId
                ).length
              : 0
          }
          label="Students"
        />

        <Stat
          icon={<GraduationCap />}
          value={
            user.schoolId
              ? data.staff.filter(
                  (member) =>
                    member.schoolId ===
                    user.schoolId
                ).length
              : 0
          }
          label="School staff"
        />

        <Stat
          icon={<FileText />}
          value={
            user.schoolId
              ? data.applications.filter(
                  (application) =>
                    application.schoolId ===
                      user.schoolId &&
                    application.status ===
                      "PENDING"
                ).length
              : 0
          }
          label="Pending applications"
        />
      </div>

      <Panel title="Role-based access">
        <p className="muted">
          EduLink only displays functions
          permitted for your role.
        </p>
      </Panel>
    </>
  );
}

/* =========================================================
   PARENT SCHOOL SEARCH
   ========================================================= */

function ParentSchools({
  data,
  setPage
}) {
  const [query, setQuery] = useState("");

  const schools = data.schools.filter(
    (school) => {
      if (school.status !== "APPROVED") {
        return false;
      }

      const text =
        `${school.name} ${school.centre} ${school.location}`.toLowerCase();

      return text.includes(
        query.toLowerCase()
      );
    }
  );

  return (
    <>
      <HeaderBlock
        eyebrow="SCHOOL DIRECTORY"
        title="Find a School"
        text="You are already logged in. There is no second parent login."
      />

      <div className="searchBox">
        <Search />

        <input
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          placeholder="School name, Centre Number or location"
        />
      </div>

      <div className="schoolGrid">
        {schools.map((school) => (
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
   APPLICATIONS - SCHOOL SIDE
   ========================================================= */

function Admissions({
  user,
  data,
  setData
}) {
  const applications =
    data.applications.filter(
      (application) =>
        application.schoolId ===
        user.schoolId
    );

  function decideApplication(
    application,
    decision
  ) {
    if (
      decision === "APPROVED" &&
      application.status !== "APPROVED"
    ) {
      const school =
        data.schools.find(
          (item) =>
            item.id ===
            user.schoolId
        );

      if (!school) {
        return;
      }

      const available = Number(
        school.spaces?.[
          application.form
        ] || 0
      );

      if (available <= 0) {
        alert(
          "There is no available space for this grade/form."
        );
        return;
      }

      const updatedSchools =
        data.schools.map(
          (item) => {
            if (
              item.id !==
              user.schoolId
            ) {
              return item;
            }

            return {
              ...item,
              spaces: {
                ...item.spaces,
                [application.form]:
                  Math.max(
                    0,
                    available - 1
                  )
              }
            };
          }
        );

      const updatedApplications =
        data.applications.map(
          (item) => {
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
          }
        );

      const existingStudent =
        data.students.find(
          (student) =>
            student.id ===
            application.studentId
        );

      let updatedStudents =
        data.students;

      if (!existingStudent) {
        updatedStudents = [
          ...data.students,
          {
            id:
              application.studentId ||
              `STU-${Date.now()}`,
            name:
              application.childName,
            form:
              application.form,
            schoolId:
              application.schoolId,
            parentEmail:
              application.parentEmail,
            attendance: 0,
            subjects: {}
          }
        ];
      }

      setData({
        ...data,
        schools: updatedSchools,
        applications:
          updatedApplications,
        students: updatedStudents
      });

      return;
    }

    const updatedApplications =
      data.applications.map(
        (item) => {
          if (
            item.id !==
            application.id
          ) {
            return item;
          }

          return {
            ...item,
            status: decision
          };
        }
      );

    setData({
      ...data,
      applications:
        updatedApplications
    });
  }

  return (
    <>
      <HeaderBlock
        eyebrow="ADMISSIONS"
        title="Applications"
        text="Review parent applications and approve, decline or wait-list them."
      />

      <Panel title="Active applications">
        {applications.length === 0 ? (
          <Empty
            text="No applications yet. Parent applications will appear here automatically."
          />
        ) : (
          <Table
            headers={[
              "Parent",
              "Child",
              "Grade/Form",
              "Documents",
              "Status",
              "Actions"
            ]}
            rows={applications.map(
              (application) => [
                application.parentName,
                application.childName,
                application.form,

                <button
                  className="small"
                  key="documents"
                  onClick={() => {
                    const documents =
                      application.documents ||
                      [];

                    if (!documents.length) {
                      alert(
                        "No documents uploaded."
                      );
                      return;
                    }

                    alert(
                      documents
                        .map(
                          (document) =>
                            document.name
                        )
                        .join("\n")
                    );
                  }}
                >
                  <Eye size={14} />
                  View
                </button>,

                <Status
                  key="status"
                  status={
                    application.status
                  }
                />,

                <div
                  className="rowActions"
                  key="actions"
                >
                  <button
                    className="small good"
                    onClick={() =>
                      decideApplication(
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
                      decideApplication(
                        application,
                        "WAITLIST"
                      )
                    }
                  >
                    Wait list
                  </button>

                  <button
                    className="small danger"
                    onClick={() =>
                      decideApplication(
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
  const students =
    data.students.filter(
      (student) =>
        student.schoolId ===
        user.schoolId
    );

  const sorted =
    [...students].sort(
      (a, b) =>
        a.form.localeCompare(b.form)
    );

  return (
    <>
      <HeaderBlock
        eyebrow="STUDENTS"
        title="Student Register"
        text="Students are grouped by Grade/Form, attendance and average performance."
      />

      <Panel title="Students">
        <Table
          headers={[
            "Grade/Form",
            "Student",
            "Attendance",
            "Average",
            "Status"
          ]}
          rows={sorted.map(
            (student) => [
              student.form,
              student.name,
              `${student.attendance}%`,
              `${averageStudent(
                student
              )}%`,
              averageStudent(student) <
              50 ? (
                <span className="warn">
                  Attention
                </span>
              ) : (
                <span className="goodText">
                  On track
                </span>
              )
            ]
          )}
        />
      </Panel>
    </>
  );
}

/* =========================================================
   STAFF MANAGEMENT
   ========================================================= */

function StaffManagement({
  user,
  data,
  setData
}) {
  const canManage =
    user.role === "Principal" ||
    user.role === "Deputy Principal";

  const staff =
    data.staff.filter(
      (member) =>
        member.schoolId ===
        user.schoolId
    );

  function removeStaff(memberId) {
    if (!canManage) {
      return;
    }

    const member =
      data.staff.find(
        (item) =>
          item.id === memberId
      );

    if (!member) {
      return;
    }

    const confirmed =
      window.confirm(
        `Remove ${member.name} from this school?`
      );

    if (!confirmed) {
      return;
    }

    setData({
      ...data,
      staff: data.staff.filter(
        (item) =>
          item.id !== memberId
      )
    });
  }

  function addDemoStaff() {
    if (!canManage) {
      return;
    }

    const name =
      window.prompt(
        "Enter staff member name:"
      );

    if (!name) {
      return;
    }

    const role =
      window.prompt(
        "Enter role: Teacher, Accountant or Secretary"
      );

    if (!role) {
      return;
    }

    setData({
      ...data,
      staff: [
        ...data.staff,
        {
          id: `STAFF-${Date.now()}`,
          name,
          role,
          schoolId: user.schoolId,
          subjects:
            role === "Teacher"
              ? ["Mathematics"]
              : [],
          grades:
            role === "Teacher"
              ? ["Form 1"]
              : []
        }
      ]
    });
  }

  return (
    <>
      <HeaderBlock
        eyebrow="STAFF MANAGEMENT"
        title="School Staff"
        text="Principal and Deputy Principal can add or remove staff from their school."
        action={
          canManage ? (
            <button
              className="primary"
              onClick={addDemoStaff}
            >
              <Plus size={16} />
              Add Staff
            </button>
          ) : null
        }
      />

      <Panel title="Registered staff">
        <Table
          headers={[
            "Name",
            "Role",
            "Subjects",
            "Grades/Forms",
            "Action"
          ]}
          rows={staff.map(
            (member) => [
              member.name,
              member.role,
              member.subjects?.join(
                ", "
              ) || "—",
              member.grades?.join(
                ", "
              ) || "—",

              canManage ? (
                <button
                  className="small danger"
                  key="remove"
                  onClick={() =>
                    removeStaff(
                      member.id
                    )
                  }
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              ) : (
                <span className="muted">
                  View only
                </span>
              )
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
  const isTeacher =
    user.role === "Teacher";

  const students =
    data.students.filter(
      (student) => {
        if (
          student.schoolId !==
          user.schoolId
        ) {
          return false;
        }

        if (!isTeacher) {
          return true;
        }

        return (
          user.grades?.includes(
            student.form
          ) || false
        );
      }
    );

  const subjects = isTeacher
    ? user.subjects || []
    : [
        "Mathematics",
        "English",
        "Chemistry",
        "Agriculture",
        "Physics"
      ];

  function updateMark(
    studentId,
    subject,
    field,
    value
  ) {
    if (
      isTeacher &&
      !user.subjects.includes(subject)
    ) {
      return;
    }

    const number =
      value === ""
        ? ""
        : Math.max(
            0,
            Math.min(100, Number(value))
          );

    const updatedStudents =
      data.students.map(
        (student) => {
          if (
            student.id !==
            studentId
          ) {
            return student;
          }

          const currentSubject =
            student.subjects?.[
              subject
            ] || {
              test: "",
              exam: "",
              comment: ""
            };

          return {
            ...student,
            subjects: {
              ...student.subjects,
              [subject]: {
                ...currentSubject,
                [field]: number
              }
            }
          };
        }
      );

    setData({
      ...data,
      students: updatedStudents
    });
  }

  function updateComment(
    studentId,
    subject,
    comment
  ) {
    if (
      isTeacher &&
      !user.subjects.includes(subject)
    ) {
      return;
    }

    const updatedStudents =
      data.students.map(
        (student) => {
          if (
            student.id !==
            studentId
          ) {
            return student;
          }

          const currentSubject =
            student.subjects?.[
              subject
            ] || {
              test: "",
              exam: "",
              comment: ""
            };

          return {
            ...student,
            subjects: {
              ...student.subjects,
              [subject]: {
                ...currentSubject,
                comment
              }
            }
          };
        }
      );

    setData({
      ...data,
      students: updatedStudents
    });
  }

  return (
    <>
      <HeaderBlock
        eyebrow="ACADEMIC PERFORMANCE"
        title="Marks & Performance"
        text={
          isTeacher
            ? "You can enter marks and comments only for subjects and grades/forms assigned to you."
            : "School leadership can view academic performance across the school."
        }
      />

      <Panel title="Student marks table">
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Form</th>
                <th>Name</th>

                {subjects.map(
                  (subject) => (
                    <th
                      key={subject}
                      colSpan="2"
                    >
                      {subject}
                    </th>
                  )
                )}

                <th>Aggregate</th>
              </tr>

              <tr>
                <th></th>
                <th></th>

                {subjects.map(
                  (subject) => (
                    <React.Fragment
                      key={`${subject}-sub`}
                    >
                      <th>Test</th>
                      <th>Exam</th>
                    </React.Fragment>
                  )
                )}

                <th></th>
              </tr>
            </thead>

            <tbody>
              {students.map(
                (student) => (
                  <tr key={student.id}>
                    <td>{student.form}</td>

                    <td>
                      <b>{student.name}</b>
                    </td>

                    {subjects.map(
                      (subject) => {
                        const mark =
                          student
                            .subjects?.[
                            subject
                          ] || {};

                        return (
                          <React.Fragment
                            key={
                              `${student.id}-${subject}`
                            }
                          >
                            <td>
                              {isTeacher ? (
                                <input
                                  className="markInput"
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={
                                    mark.test ??
                                    ""
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    updateMark(
                                      student.id,
                                      subject,
                                      "test",
                                      event
                                        .target
                                        .value
                                    )
                                  }
                                />
                              ) : (
                                mark.test ??
                                "—"
                              )}
                            </td>

                            <td>
                              {isTeacher ? (
                                <input
                                  className="markInput"
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={
                                    mark.exam ??
                                    ""
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    updateMark(
                                      student.id,
                                      subject,
                                      "exam",
                                      event
                                        .target
                                        .value
                                    )
                                  }
                                />
                              ) : (
                                mark.exam ??
                                "—"
                              )}
                            </td>
                          </React.Fragment>
                        );
                      }
                    )}

                    <td>
                      <b>
                        {aggregateStudent(
                          student
                        )}
                      </b>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </Panel>

      {isTeacher && (
        <Panel title="Subject comments">
          {students.map(
            (student) => (
              <div
                className="commentRow"
                key={student.id}
              >
                <b>{student.name}</b>

                {subjects.map(
                  (subject) => {
                    const mark =
                      student.subjects?.[
                        subject
                      ] || {};

                    return (
                      <label
                        key={
                          `${student.id}-${subject}-comment`
                        }
                      >
                        {subject} comment
                        <input
                          value={
                            mark.comment || ""
                          }
                          onChange={(
                            event
                          ) =>
                            updateComment(
                              student.id,
                              subject,
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="Leave a comment..."
                        />
                      </label>
                    );
                  }
                )}
              </div>
            )
          )}
        </Panel>
      )}
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
  const students =
    data.students.filter(
      (student) =>
        student.schoolId ===
        user.schoolId
    );

  function updateAttendance(
    studentId,
    value
  ) {
    const attendance = Math.max(
      0,
      Math.min(100, Number(value))
    );

    setData({
      ...data,
      students: data.students.map(
        (student) =>
          student.id === studentId
            ? {
                ...student,
                attendance
              }
            : student
      )
    });
  }

  return (
    <>
      <HeaderBlock
        eyebrow="ATTENDANCE"
        title="Student Attendance"
        text="School staff can maintain attendance records."
      />

      <Panel title="Attendance register">
        <Table
          headers={[
            "Form",
            "Student",
            "Attendance",
            "Update"
          ]}
          rows={students.map(
            (student) => [
              student.form,
              student.name,
              `${student.attendance}%`,
              user.role === "Teacher" ? (
                <input
                  className="markInput"
                  type="number"
                  min="0"
                  max="100"
                  value={
                    student.attendance
                  }
                  onChange={(event) =>
                    updateAttendance(
                      student.id,
                      event.target.value
                    )
                  }
                />
              ) : (
                <span className="goodText">
                  Recorded
                </span>
              )
            ]
          )}
        />
      </Panel>
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
  const schoolStudents =
    data.students.filter(
      (student) =>
        student.schoolId ===
        user.schoolId
    );

  function approvePayment(paymentId) {
    if (user.role !== "Accountant") {
      return;
    }

    setData({
      ...data,
      payments: data.payments.map(
        (payment) =>
          payment.id === paymentId
            ? {
                ...payment,
                status: "APPROVED"
              }
            : payment
      )
    });
  }

  return (
    <>
      <HeaderBlock
        eyebrow="FINANCE"
        title="School Fees"
        text="Accountants manage payments, balances and receipt verification. Academic performance is not shown here."
      />

      <Panel title="Student fee table">
        <Table
          headers={[
            "Form",
            "Student",
            "Fees",
            "Paid",
            "Balance",
            "Receipt"
          ]}
          rows={schoolStudents.map(
            (student) => {
              const school =
                data.schools.find(
                  (item) =>
                    item.id ===
                    user.schoolId
                );

              const fee = Number(
                school?.fees || 0
              );

              const payments =
                data.payments.filter(
                  (payment) =>
                    payment.studentId ===
                    student.id
                );

              const paid =
                payments
                  .filter(
                    (payment) =>
                      payment.status ===
                      "APPROVED"
                  )
                  .reduce(
                    (
                      total,
                      payment
                    ) =>
                      total +
                      Number(
                        payment.amount ||
                          0
                      ),
                    0
                  );

              const balance =
                Math.max(
                  0,
                  fee - paid
                );

              return [
                student.form,
                student.name,
                `E${fee.toLocaleString()}`,
                `E${paid.toLocaleString()}`,
                `E${balance.toLocaleString()}`,

                payments.some(
                  (payment) =>
                    payment.status ===
                    "PENDING"
                ) ? (
                  <button
                    className="small good"
                    onClick={() => {
                      const pending =
                        payments.find(
                          (payment) =>
                            payment.status ===
                            "PENDING"
                        );

                      if (pending) {
                        approvePayment(
                          pending.id
                        );
                      }
                    }}
                  >
                    Approve Receipt
                  </button>
                ) : (
                  <span className="goodText">
                    Verified
                  </span>
                )
              ];
            }
          )}
        />
      </Panel>
    </>
  );
}

/* =========================================================
   PARENT CHILDREN
   ========================================================= */

function MyChildren({
  user,
  data
}) {
  const children =
    data.students.filter(
      (student) =>
        student.parentEmail ===
        user.email
    );

  return (
    <>
      <HeaderBlock
        eyebrow="MY CHILDREN"
        title="My Children"
        text="Only your own children's information is displayed."
      />

      <div className="cardGrid">
        {children.map(
          (child) => (
            <div
              className="panel"
              key={child.id}
            >
              <div className="studentAvatar">
                <Users />
              </div>

              <h3>{child.name}</h3>

              <p>
                {child.form}
              </p>

              <div className="childStats">
                <strong>
                  {child.attendance}%
                </strong>

                <span>
                  Attendance
                </span>
              </div>

              <div className="childStats">
                <strong>
                  {averageStudent(
                    child
                  )}%
                </strong>

                <span>
                  Average performance
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}

/* =========================================================
   PARENT APPLICATIONS
   ========================================================= */

function ParentApplications({
  user,
  data,
  setData
}) {
  const [schoolId, setSchoolId] =
    useState(
      data.schools[0]?.id || ""
    );

  const [childName, setChildName] =
    useState("");

  const [form, setForm] =
    useState("Form 1");

  const [documents, setDocuments] =
    useState([]);

  const applications =
    data.applications.filter(
      (application) =>
        application.parentEmail ===
        user.email
    );

  function uploadDocuments(event) {
    const files =
      Array.from(
        event.target.files || []
      );

    setDocuments(files);
  }

  function submitApplication(event) {
    event.preventDefault();

    if (
      !schoolId ||
      !childName.trim() ||
      !form
    ) {
      alert(
        "Please complete the application."
      );
      return;
    }

    const school =
      data.schools.find(
        (item) =>
          item.id === schoolId
      );

    if (!school) {
      return;
    }

    const application = {
      id: `APP-${Date.now()}`,
      parentEmail: user.email,
      parentName: user.name,
      schoolId,
      schoolName: school.name,
      childName:
        childName.trim(),
      studentId: `STU-${Date.now()}`,
      form,
      documents: documents.map(
        (file) => ({
          name: file.name,
          type: file.type,
          size: file.size
        })
      ),
      status: "PENDING",
      submittedAt:
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
            "New school application",
          body: `${user.name} submitted an application to ${school.name}.`,
          audience:
            "school",
          schoolId
        }
      ]
    });

    setChildName("");
    setDocuments([]);

    alert(
      "Application submitted successfully. The school can now see it in Admissions."
    );
  }

  return (
    <>
      <HeaderBlock
        eyebrow="APPLICATIONS"
        title="My Applications"
        text="Apply to a desired school and upload the required documents."
      />

      <Panel title="Create school application">
        <form
          onSubmit={
            submitApplication
          }
        >
          <div className="formGrid">
            <label>
              Desired school
              <select
                value={schoolId}
                onChange={(event) =>
                  setSchoolId(
                    event.target.value
                  )
                }
              >
                {data.schools
                  .filter(
                    (school) =>
                      school.status ===
                      "APPROVED"
                  )
                  .map(
                    (school) => (
                      <option
                        key={
                          school.id
                        }
                        value={
                          school.id
                        }
                      >
                        {school.name}
                      </option>
                    )
                  )}
              </select>
            </label>

            <label>
              Child's name
              <input
                value={childName}
                onChange={(event) =>
                  setChildName(
                    event.target.value
                  )
                }
                placeholder="Enter child's full name"
              />
            </label>

            <label>
              Grade/Form
              <input
                value={form}
                onChange={(event) =>
                  setForm(
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              Required documents
              <input
                type="file"
                multiple
                onChange={
                  uploadDocuments
                }
              />
            </label>
          </div>

          {documents.length > 0 && (
            <div className="demoBox">
              <b>
                Documents selected:
              </b>

              <ul>
                {documents.map(
                  (document) => (
                    <li
                      key={
                        document.name
                      }
                    >
                      {document.name}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          <button
            className="primary"
            type="submit"
          >
            <Upload size={16} />
            Submit Application
          </button>
        </form>
      </Panel>

      <Panel title="Submitted applications">
        {applications.length === 0 ? (
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
            rows={applications.map(
              (application) => [
                application.schoolName,
                application.childName,
                application.form,
                `${
                  application.documents
                    ?.length || 0
                } uploaded`,
                <Status
                  key={
                    application.id
                  }
                  status={
                    application.status
                  }
                />
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
  data
}) {
  const children =
    data.students.filter(
      (student) =>
        student.parentEmail ===
        user.email
    );

  return (
    <>
      <HeaderBlock
        eyebrow="SCHOOL FEES"
        title="My Children's Fees"
        text="Only your own children's fee information is displayed."
      />

      <Panel title="Fee balances">
        <Table
          headers={[
            "Child",
            "Form",
            "Paid",
            "Outstanding"
          ]}
          rows={children.map(
            (child) => {
              const school =
                data.schools.find(
                  (item) =>
                    item.id ===
                    child.schoolId
                );

              const payments =
                data.payments.filter(
                  (payment) =>
                    payment.studentId ===
                    child.id &&
                    payment.parentEmail ===
                    user.email &&
                    payment.status ===
                    "APPROVED"
                );

              const paid =
                payments.reduce(
                  (
                    total,
                    payment
                  ) =>
                    total +
                    Number(
                      payment.amount ||
                        0
                    ),
                  0
                );

              const balance =
                Math.max(
                  0,
                  Number(
                    school?.fees || 0
                  ) - paid
                );

              return [
                child.name,
                child.form,
                `E${paid.toLocaleString()}`,
                `E${balance.toLocaleString()}`
              ];
            }
          )}
        />
      </Panel>
    </>
  );
}

/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function Notifications({
  user,
  data,
  setData
}) {
  const notifications =
    data.notifications.filter(
      (notification) => {
        if (
          notification.audience ===
          "all"
        ) {
          return true;
        }

        if (
          notification.schoolId &&
          notification.schoolId !==
            user.schoolId
        ) {
          return false;
        }

        if (
          notification.parentEmail &&
          notification.parentEmail !==
            user.email
        ) {
          return false;
        }

        return true;
      }
    );

  function addNotification() {
    if (
      user.role !== "Secretary" &&
      user.role !== "Principal" &&
      user.role !==
        "Deputy Principal"
    ) {
      return;
    }

    const title =
      window.prompt(
        "Notification title:"
      );

    if (!title) {
      return;
    }

    const body =
      window.prompt(
        "Notification message:"
      );

    if (!body) {
      return;
    }

    setData({
      ...data,
      notifications: [
        ...data.notifications,
        {
          id: `N-${Date.now()}`,
          title,
          body,
          audience: "school",
          schoolId:
            user.schoolId
        }
      ]
    });
  }

  return (
    <>
      <HeaderBlock
        eyebrow="NOTIFICATIONS"
        title="Notifications"
        text="School announcements, application updates, fee reminders and important messages."
        action={
          user.role === "Secretary" ||
          user.role === "Principal" ||
          user.role ===
            "Deputy Principal" ? (
            <button
              className="primary"
              onClick={
                addNotification
              }
            >
              <Plus size={16} />
              New notification
            </button>
          ) : null
        }
      />

      <div className="notificationList">
        {notifications.map(
          (notification) => (
            <div
              className="panel notice"
              key={
                notification.id
              }
            >
              <MessageSquare />

              <div>
                <h3>
                  {notification.title}
                </h3>

                <p>
                  {notification.body}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}

/* =========================================================
   CALENDAR
   ========================================================= */

function CalendarPage({
  user,
  data,
  setData
}) {
  const events =
    data.calendar.filter(
      (event) => {
        if (!event.schoolId) {
          return true;
        }

        return (
          event.schoolId ===
          user.schoolId
        );
      }
    );

  function addEvent() {
    if (
      user.role !== "Secretary" &&
      user.role !== "Principal" &&
      user.role !==
        "Deputy Principal"
    ) {
      return;
    }

    const title =
      window.prompt(
        "Event title:"
      );

    if (!title) {
      return;
    }

    const date =
      window.prompt(
        "Event date (YYYY-MM-DD):"
      );

    if (!date) {
      return;
    }

    setData({
      ...data,
      calendar: [
        ...data.calendar,
        {
          id: `CAL-${Date.now()}`,
          title,
          date,
          time: "All day",
          details:
            "School calendar event",
          schoolId:
            user.schoolId
        }
      ]
    });
  }

  return (
    <>
      <HeaderBlock
        eyebrow="SCHOOL CALENDAR"
        title="School Calendar"
        text="Important school dates, meetings, tests and deadlines."
        action={
          user.role === "Secretary" ||
          user.role === "Principal" ||
          user.role ===
            "Deputy Principal" ? (
            <button
              className="primary"
              onClick={addEvent}
            >
              <Plus size={16} />
              Add Event
            </button>
          ) : null
        }
      />

      <Panel title="Calendar events">
        <Table
          headers={[
            "Date",
            "Event",
            "Time",
            "Details"
          ]}
          rows={events.map(
            (event) => [
              event.date,
              event.title,
              event.time,
              event.details
            ]
          )}
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
      (student) =>
        student.schoolId ===
        user.schoolId
    );

  return (
    <>
      <HeaderBlock
        eyebrow="REPORTS"
        title="School Reports"
        text="Management reports available to school leadership."
      />

      <div className="statGrid">
        <Stat
          icon={<Users />}
          value={students.length}
          label="Students"
        />

        <Stat
          icon={<CalendarCheck />}
          value={
            students.length
              ? Math.round(
                  students.reduce(
                    (
                      total,
                      student
                    ) =>
                      total +
                      Number(
                        student.attendance ||
                          0
                      ),
                    0
                  ) /
                    students.length
                )
              : 0
          }
          label="Average attendance %"
        />

        <Stat
          icon={<BookOpen />}
          value={
            students.length
              ? Math.round(
                  students.reduce(
                    (
                      total,
                      student
                    ) =>
                      total +
                      averageStudent(
                        student
                      ),
                    0
                  ) /
                    students.length
                )
              : 0
          }
          label="Average performance %"
        />
      </div>
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
  const pending =
    data.pendingSchools;

  function approveSchool(
    schoolId
  ) {
    const pendingSchool =
      data.pendingSchools.find(
        (school) =>
          school.id === schoolId
      );

    if (!pendingSchool) {
      return;
    }

    const approvedSchool = {
      ...pendingSchool,
      status: "APPROVED"
    };

    const registration =
      pendingSchool.registration ||
      {};

    const newStaff = [];

    if (registration.principal) {
      newStaff.push({
        id: `STAFF-${Date.now()}-P`,
        name:
          registration.principal,
        role: "Principal",
        schoolId:
          approvedSchool.id
      });
    }

    if (registration.deputy) {
      newStaff.push({
        id: `STAFF-${Date.now()}-D`,
        name:
          registration.deputy,
        role: "Deputy Principal",
        schoolId:
          approvedSchool.id
      });
    }

    if (registration.accountant) {
      newStaff.push({
        id: `STAFF-${Date.now()}-A`,
        name:
          registration.accountant,
        role: "Accountant",
        schoolId:
          approvedSchool.id
      });
    }

    if (registration.secretary) {
      newStaff.push({
        id: `STAFF-${Date.now()}-S`,
        name:
          registration.secretary,
        role: "Secretary",
        schoolId:
          approvedSchool.id
      });
    }

    const teachers =
      registration.teachers ||
      [];

    teachers.forEach(
      (teacher, index) => {
        newStaff.push({
          id: `STAFF-${Date.now()}-T${index}`,
          name: teacher,
          role: "Teacher",
          schoolId:
            approvedSchool.id,
          subjects: [],
          grades: []
        });
      }
    );

    setData({
      ...data,
      schools: [
        ...data.schools,
        approvedSchool
      ],
      pendingSchools:
        data.pendingSchools.filter(
          (school) =>
            school.id !== schoolId
        ),
      staff: [
        ...data.staff,
        ...newStaff
      ]
    });
  }

  function rejectSchool(
    schoolId
  ) {
    setData({
      ...data,
      pendingSchools:
        data.pendingSchools.filter(
          (school) =>
            school.id !== schoolId
        )
    });
  }

  return (
    <>
      <HeaderBlock
        eyebrow="SYSTEM ADMIN"
        title="School Management"
        text="Verify school information before approving or rejecting registrations."
      />

      <div className="statGrid">
        <Stat
          icon={<Clock />}
          value={pending.length}
          label="Pending schools"
        />

        <Stat
          icon={<School />}
          value={data.schools.length}
          label="Registered schools"
        />

        <Stat
          icon={<CheckCircle />}
          value={
            data.schools.filter(
              (school) =>
                school.status ===
                "APPROVED"
            ).length
          }
          label="Approved schools"
        />
      </div>

      <Panel title="Pending school registrations">
        {pending.length === 0 ? (
          <Empty text="There are no pending school registrations." />
        ) : (
          <Table
            headers={[
              "School",
              "Centre",
              "Location",
              "Principal",
              "Action"
            ]}
            rows={pending.map(
              (school) => [
                school.name,
                school.centre,
                school.location,
                school.registration
                  ?.principal ||
                  "Not supplied",

                <div
                  className="rowActions"
                  key={
                    school.id
                  }
                >
                  <button
                    className="small good"
                    onClick={() =>
                      approveSchool(
                        school.id
                      )
                    }
                  >
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
            "Status"
          ]}
          rows={data.schools.map(
            (school) => [
              school.name,
              school.centre,
              school.location,
              <Status
                key={school.id}
                status={
                  school.status
                }
              />
            ]
          )}
        />
      </Panel>
    </>
  );
}

/* =========================================================
   UI COMPONENTS
   ========================================================= */

function HeaderBlock({
  eyebrow,
  title,
  text,
  action
}) {
  return (
    <div className="pageHeader">
      <div>
        <span className="eyebrow">
          {eyebrow}
        </span>

        <h1>{title}</h1>

        <p>{text}</p>
      </div>

      {action && (
        <div className="pageAction">
          {action}
        </div>
      )}
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
  icon,
  value,
  label
}) {
  return (
    <div className="statCard">
      <div className="statIcon">
        {icon}
      </div>

      <strong>{value}</strong>

      <span>{label}</span>
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
            {headers.map(
              (header) => (
                <th key={header}>
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {rows.map(
            (row, index) => (
              <tr key={index}>
                {row.map(
                  (cell, cellIndex) => (
                    <td
                      key={
                        cellIndex
                      }
                    >
                      {cell}
                    </td>
                  )
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

function Status({
  status
}) {
  const normalized =
    String(status || "")
      .toLowerCase();

  return (
    <span
      className={
        "status " +
        (normalized ===
        "approved"
          ? "open"
          : normalized ===
              "declined"
            ? "danger"
            : "warn")
      }
    >
      {status}
    </span>
  );
}

function Empty({
  text
}) {
  return (
    <div className="empty">
      <ClipboardList />
      <p>{text}</p>
    </div>
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

function Modal({
  title,
  onClose,
  children
}) {
  return (
    <div className="modalBackdrop">
      <div className="modal">
        <div className="modalHeader">
          <h2>{title}</h2>

          <button
            className="iconBtn"
            onClick={onClose}
          >
            <X />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

/* =========================================================
   START APPLICATION
   ========================================================= */

const rootElement =
  document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <App />
  );
}
