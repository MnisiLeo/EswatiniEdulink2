import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ShieldCheck,
  School,
  Search,
  Users,
  GraduationCap,
  Wallet,
  MessageSquare,
  CalendarDays,
  CalendarCheck,
  BookOpen,
  FileText,
  Settings,
  Boxes,
  LogOut,
  Menu,
  X,
  CheckCircle,
  Clock,
  AlertTriangle,
  Upload,
  Eye,
  UserPlus,
  ChevronRight,
  Home,
  Receipt,
  UserCheck,
  UserMinus
} from "lucide-react";
import "./styles.css";

/*
=========================================================
EDULINK ESWATINI
Demo frontend prototype
All data is fictional and stored in localStorage.
=========================================================
*/

const DEMO_PASSWORD = "demo123";

/* =======================================================
   ROLE PERMISSIONS
======================================================= */

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
  dashboard: ["Overview", LayoutDashboardIcon],
  schools: ["Find a School", School],
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

/*
Small wrapper so the navigation map stays simple.
*/
function LayoutDashboardIcon(props) {
  return <Home {...props} />;
}

/* =======================================================
   DEMO DATA
======================================================= */

const INITIAL_DATA = {
  schools: [
    {
      id: "S1",
      name: "Hermann Gmeiner High School",
      centre: "3333",
      location: "Manzini",
      type: "High School",
      phone: "+268 0000 0000",
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
          id: "STAFF-1",
          name: "Dr. J. Dlamini",
          role: "Principal"
        },
        {
          id: "STAFF-2",
          name: "Mr. B. Mamba",
          role: "Deputy Principal"
        },
        {
          id: "STAFF-3",
          name: "Mr. M. Nkosi",
          role: "Teacher",
          subjects: ["Mathematics", "English"],
          grades: ["Form 1", "Form 2"]
        },
        {
          id: "STAFF-4",
          name: "Ms. P. Mamba",
          role: "Accountant"
        },
        {
          id: "STAFF-5",
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
      id: "NOT-1",
      title: "Welcome to EduLink Eswatini",
      body: "This is fictional demonstration data.",
      audience: "all"
    }
  ],

  calendar: [
    {
      id: "CAL-1",
      title: "Parent Meeting",
      date: "2026-09-05",
      time: "14:00",
      details: "Main hall"
    }
  ]
};

/* =======================================================
   DEMO ACCOUNTS
======================================================= */

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

/* =======================================================
   STORAGE
======================================================= */

function cloneInitialData() {
  return JSON.parse(JSON.stringify(INITIAL_DATA));
}

function loadData() {
  try {
    const saved = localStorage.getItem(
      "edulink-eswatini-data"
    );

    if (!saved) {
      return cloneInitialData();
    }

    const parsed = JSON.parse(saved);

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
  } catch (error) {
    console.error(error);
    return cloneInitialData();
  }
}

function saveData(data) {
  try {
    localStorage.setItem(
      "edulink-eswatini-data",
      JSON.stringify(data)
    );
  } catch (error) {
    console.error(error);
  }
}

function totalSpaces(spaces) {
  return Object.values(spaces || {}).reduce(
    (total, number) => total + Number(number || 0),
    0
  );
}

function studentAverage(student) {
  const values = [];

  Object.values(student.subjects || {}).forEach(
    (subject) => {
      values.push(Number(subject.test || 0));
      values.push(Number(subject.exam || 0));
    }
  );

  if (!values.length) {
    return 0;
  }

  const total = values.reduce(
    (sum, value) => sum + value,
    0
  );

  return Math.round(total / values.length);
}

function aggregate(student) {
  return Object.values(student.subjects || {}).reduce(
    (sum, subject) =>
      sum +
      Number(subject.test || 0) +
      Number(subject.exam || 0),
    0
  );
}

/* =======================================================
   APP
======================================================= */

function App() {
  const [data, setData] = useState(loadData);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    saveData(data);
  }, [data]);

  if (!user) {
    return (
      <PublicHome
        data={data}
        setData={setData}
        loginUser={setUser}
      />
    );
  }

  const allowed =
    ROLE_PERMISSIONS[user.role] || [];

  return (
    <div className="app">
      <aside
        className={
          mobileOpen
            ? "sidebar open"
            : "sidebar"
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
            const item = NAVIGATION[key];

            if (!item) {
              return null;
            }

            const label = item[0];
            const Icon = item[1];

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
                  setMobileOpen(false);
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
              setMobileOpen(!mobileOpen)
            }
          >
            {mobileOpen ? (
              <X />
            ) : (
              <Menu />
            )}
          </button>

          <div>
            <strong>{user.name}</strong>

            <small>
              {user.role}

              {user.schoolId
                ? " • " +
                  (
                    data.schools.find(
                      (school) =>
                        school.id ===
                        user.schoolId
                    ) || {}
                  ).name
                : ""}
            </small>
          </div>

          <span className="topPill">
            DEMO MODE
          </span>
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

/* =======================================================
   PUBLIC HOME
======================================================= */

function PublicHome({
  data,
  setData,
  loginUser
}) {
  const [search, setSearch] = useState("");
  const [loginOpen, setLoginOpen] =
    useState(false);
  const [registerOpen, setRegisterOpen] =
    useState(false);
  const [selectedSchool, setSelectedSchool] =
    useState(null);

  const schools = data.schools.filter(
    (school) => {
      const searchable =
        (
          school.name +
          " " +
          school.centre +
          " " +
          school.location
        ).toLowerCase();

      return (
        school.status === "APPROVED" &&
        searchable.includes(
          search.toLowerCase()
        )
      );
    }
  );

  if (selectedSchool) {
    return (
      <div className="public">
        <PublicHeader
          onLogin={() => setLoginOpen(true)}
          onSchools={() =>
            setSelectedSchool(null)
          }
        />

        <section className="profilePage">
          <button
            className="backBtn"
            onClick={() =>
              setSelectedSchool(null)
            }
          >
            ← Back to schools
          </button>

          <div className="profileHero">
            <div>
              <span className="eyebrow">
                APPROVED SCHOOL
              </span>

              <h1>
                {selectedSchool.name}
              </h1>

              <p>
                Centre Number:{" "}
                <b>
                  {selectedSchool.centre}
                </b>{" "}
                • {selectedSchool.location}
              </p>
            </div>

            <span className="openBadge">
              {selectedSchool.admission ===
              "OPEN"
                ? "ADMISSIONS OPEN"
                : "ADMISSIONS CLOSED"}
            </span>
          </div>

          <div className="profileGrid">
            <div className="infoPanel">
              <h3>Available spaces</h3>

              <div className="bigNumber">
                {totalSpaces(
                  selectedSchool.spaces
                )}
              </div>

              {Object.entries(
                selectedSchool.spaces
              ).map(
                ([grade, spaces]) => (
                  <div
                    className="spaceRow"
                    key={grade}
                  >
                    <span>{grade}</span>
                    <strong>
                      {spaces > 0
                        ? spaces
                        : "FULL"}
                    </strong>
                  </div>
                )
              )}
            </div>

            <div className="infoPanel">
              <h3>School fees</h3>

              <div className="feeAmount">
                E{" "}
                {Number(
                  selectedSchool.fees
                ).toLocaleString()}
              </div>

              <p>
                Parents must login before
                making an application.
              </p>

              <button
                className="primary"
                onClick={() =>
                  setLoginOpen(true)
                }
              >
                Login to Apply
              </button>
            </div>
          </div>
        </section>

        {loginOpen && (
          <LoginModal
            close={() => setLoginOpen(false)}
            loginUser={loginUser}
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
            <em>
              schools, parents and students.
            </em>
          </h1>

          <p>
            Find schools, check spaces,
            apply online, monitor your
            child's progress and receive
            school communications.
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
                setRegisterOpen(true)
              }
            >
              Register Your School
            </button>
          </div>
        </div>

        <div className="heroPanel">
          <div className="miniTop">
            <span>
              EduLink Eswatini
            </span>

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
                    (application) =>
                      application.status ===
                      "PENDING"
                  ).length
                }
              </strong>

              <small>
                Active applications
              </small>
            </div>
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
            Search by school name, Centre
            Number or location.
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
            placeholder="School name, Centre Number or location"
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
                  <span>
                    {school.type}
                  </span>

                  <b>
                    {school.admission ===
                    "OPEN"
                      ? "Admissions Open"
                      : "Closed"}
                  </b>
                </div>

                <h3>
                  {school.name}
                </h3>

                <p>
                  Centre Number:{" "}
                  {school.centre}
                </p>

                <p>
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
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="publicSection alt">
        <div className="sectionHead">
          <span className="eyebrow">
            EDULINK ESWATINI
          </span>

          <h2>
            A connected education
            platform
          </h2>
        </div>

        <div className="featureGrid">
          <FeatureCard
            icon={<School />}
            title="Find Schools"
            text="Parents can search approved schools and available spaces."
          />

          <FeatureCard
            icon={<FileText />}
            title="Apply Online"
            text="Parents can submit applications and required documents."
          />

          <FeatureCard
            icon={<BookOpen />}
            title="Monitor Progress"
            text="Parents only see their own children's academic information."
          />

          <FeatureCard
            icon={<Wallet />}
            title="Manage Fees"
            text="Schools can manage balances and receipt verification."
          />
        </div>
      </section>

      <footer>
        <div className="brand">
          <div className="brandIcon">
            <ShieldCheck size={21} />
          </div>

          <div>
            EduLink{" "}
            <span>ESWATINI</span>
          </div>
        </div>

        <p>
          Fictional prototype data. Not
          affiliated with ECESWA or SNAT.
        </p>
      </footer>

      {loginOpen && (
        <LoginModal
          close={() => setLoginOpen(false)}
          loginUser={loginUser}
        />
      )}

      {registerOpen && (
        <SchoolRegistration
          data={data}
          setData={setData}
          close={() =>
            setRegisterOpen(false)
          }
        />
      )}
    </div>
  );
}

/* =======================================================
   PUBLIC HEADER
======================================================= */

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

/* =======================================================
   LOGIN
======================================================= */

function LoginModal({
  close,
  loginUser
}) {
  const choices = [
    ["Parent", "parent@demo.sz", UserPlus],
    ["Teacher", "teacher@demo.sz", GraduationCap],
    ["Principal", "principal@demo.sz", UserCheck],
    [
      "Deputy Principal",
      "deputy@demo.sz",
      UserCheck
    ],
    ["Accountant", "accountant@demo.sz", Wallet],
    ["Secretary", "secretary@demo.sz", MessageSquare],
    ["System Admin", "admin@demo.sz", Settings]
  ];

  const [email, setEmail] =
    useState("parent@demo.sz");

  const [password, setPassword] =
    useState(DEMO_PASSWORD);

  const [error, setError] =
    useState("");

  const account =
    DEMO_ACCOUNTS[
      email.toLowerCase()
    ];

  function selectAccount(address) {
    setEmail(address);
    setPassword(DEMO_PASSWORD);
    setError("");
  }

  function submit(event) {
    event.preventDefault();

    const selected =
      DEMO_ACCOUNTS[
        email.trim().toLowerCase()
      ];

    if (
      !selected ||
      password !== DEMO_PASSWORD
    ) {
      setError(
        "Incorrect demo email or password."
      );
      return;
    }

    loginUser({
      email:
        email.trim().toLowerCase(),
      ...selected
    });

    close();
  }

  return (
    <div className="modalBackdrop">
      <div className="modal">
        <button
          className="modalClose"
          onClick={close}
        >
          <X />
        </button>

        <div className="modalHeader">
          <div className="brandIcon">
            <ShieldCheck />
          </div>

          <div>
            <h2>Login to EduLink</h2>

            <p>
              Choose a demo role.
            </p>
          </div>
        </div>

        <div className="loginRoleGrid">
          {choices.map(
            ([label, address, Icon]) => (
              <button
                type="button"
                key={label}
                className={
                  email === address
                    ? "loginRoleCard selected"
                    : "loginRoleCard"
                }
                onClick={() =>
                  selectAccount(
                    address
                  )
                }
              >
                <Icon size={18} />

                <span>
                  <b>{label}</b>
                  <small>
                    {address}
                  </small>
                </span>

                <ChevronRight
                  size={16}
                />
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
            Demo password:
            <strong>
              {" "}
              {DEMO_PASSWORD}
            </strong>
          </div>

          <button
            className="primary full"
            type="submit"
          >
            Login
          </button>

          {account && (
            <p className="muted">
              Role:{" "}
              <strong>
                {account.role}
              </strong>
            </p>
          )}

          {error && (
            <div className="error">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

/* =======================================================
   SCHOOL REGISTRATION
======================================================= */

function SchoolRegistration({
  data,
  setData,
  close
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

  function submit(event) {
    event.preventDefault();

    if (
      !form.name ||
      !form.centre ||
      !form.location ||
      !form.principal
    ) {
      return;
    }

    const teachers = form.staff
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean)
      .map((name, index) => ({
        id:
          "PSTAFF-" +
          Date.now() +
          "-" +
          index,
        name,
        role: "Teacher"
      }));

    const pending = {
      id:
        "PENDING-" +
        Date.now(),

      name: form.name,
      centre: form.centre,
      location: form.location,
      type: form.type,
      phone: form.phone,
      email: form.email,
      status: "PENDING",

      admission: "CLOSED",

      fees: 0,

      spaces: {},

      staff: [
        {
          id:
            "PSTAFF-" +
            Date.now() +
            "-P",
          name: form.principal,
          role: "Principal"
        },
        {
          id:
            "PSTAFF-" +
            Date.now() +
            "-D",
          name: form.deputy,
          role: "Deputy Principal"
        },
        ...teachers
      ]
    };

    setData({
      ...data,
      pendingSchools: [
        ...data.pendingSchools,
        pending
      ]
    });

    setSubmitted(true);
  }

  return (
    <div className="modalBackdrop">
      <div className="modal large">
        <button
          className="modalClose"
          onClick={close}
        >
          <X />
        </button>

        {!submitted ? (
          <>
            <h2>
              Register Your School
            </h2>

            <p className="muted">
              Submitted schools appear
              automatically in the System
              Admin's pending-school queue.
            </p>

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
                    <option>
                      High School
                    </option>

                    <option>
                      Primary School
                    </option>
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
                    type="email"
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
                    value={
                      form.principal
                    }
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
                Staff names
                <textarea
                  value={form.staff}
                  onChange={(e) =>
                    update(
                      "staff",
                      e.target.value
                    )
                  }
                  placeholder="Example: John Dlamini, Mary Mamba, Peter Nkosi"
                />
              </label>

              <button
                className="primary full"
                type="submit"
              >
                Submit School Registration
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="successBox">
              <CheckCircle />
              School registration submitted.
            </div>

            <p className="muted">
              The System Admin will verify
              that the school exists and
              confirm that the submitted
              information is truthful before
              approving or rejecting it.
            </p>

            <button
              className="primary full"
              onClick={close}
            >
              Done
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* =======================================================
   PAGE ROUTER
======================================================= */

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
    return (
      <ParentSchoolDirectory
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
        setData={setData}
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
    return (
      <Resources
        user={user}
        data={data}
        setData={setData}
      />
    );
  }

  if (page === "notifications") {
    return (
      <Notifications
        user={user}
        data={data}
        setData={setData}
      />
    );
  }

  if (page === "calendar") {
    return (
      <CalendarPage
        user={user}
        data={data}
        setData={setData}
      />
    );
  }

  if (page === "children") {
    return (
      <ParentChildren
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
        setData={setData}
      />
    );
  }

  if (page === "attendance") {
    return null;
  }

  if (page === "fees") {
    return (
      <ParentFees
        user={user}
        data={data}
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

  if (page === "settings") {
    return (
      <SettingsPage
        user={user}
        data={data}
      />
    );
  }

  return (
    <Dashboard
      user={user}
      data={data}
      setPage={setPage}
    />
  );
}

/* =======================================================
   DASHBOARD
======================================================= */

function Dashboard({
  user,
  data,
  setPage
}) {
  const school = data.schools.find(
    (item) =>
      item.id === user.schoolId
  );

  const schoolStudents =
    data.students.filter(
      (student) =>
        student.schoolId ===
        user.schoolId
    );

  const applications =
    data.applications.filter(
      (application) =>
        application.schoolId ===
        user.schoolId
    );

  const payments =
    data.payments.filter(
      (payment) =>
        schoolStudents.some(
          (student) =>
            student.id ===
            payment.studentId
        )
    );

  if (user.role === "Parent") {
    const children =
      data.students.filter(
        (student) =>
          student.parentEmail ===
          user.email
      );

    return (
      <>
        <HeaderBlock
          eyebrow="PARENT DASHBOARD"
          title="My family"
          text="Only information belonging to your own children is shown."
        />

        <div className="statGrid">
          <Stat
            title="My Children"
            value={children.length}
            icon={<Users />}
          />

          <Stat
            title="Applications"
            value={
              data.applications.filter(
                (a) =>
                  a.parentEmail ===
                  user.email
              ).length
            }
            icon={<FileText />}
          />

          <Stat
            title="Notifications"
            value={
              data.notifications.length
            }
            icon={<MessageSquare />}
          />
        </div>

        <Panel title="My children">
          {children.length === 0 ? (
            <Empty text="No children are currently linked to this demo parent." />
          ) : (
            <div className="childCards">
              {children.map(
                (child) => (
                  <div
                    className="childCard"
                    key={child.id}
                  >
                    <div>
                      <strong>
                        {child.name}
                      </strong>

                      <span>
                        {child.form}
                      </span>
                    </div>

                    <b>
                      {studentAverage(
                        child
                      )}
                      %
                    </b>
                  </div>
                )
              )}
            </div>
          )}
        </Panel>
      </>
    );
  }

  if (user.role === "System Admin") {
    const pending =
      data.pendingSchools.length;

    return (
      <>
        <HeaderBlock
          eyebrow="SYSTEM ADMIN"
          title="Platform administration"
          text="The System Admin is responsible for the smooth running of the EduLink platform and school verification."
        />

        <div className="statGrid">
          <Stat
            title="Registered Schools"
            value={data.schools.length}
            icon={<School />}
          />

          <Stat
            title="Pending Schools"
            value={pending}
            icon={<Clock />}
          />

          <Stat
            title="Total Students"
            value={data.students.length}
            icon={<Users />}
          />
        </div>

        <Panel title="Pending school registrations">
          {pending === 0 ? (
            <Empty text="No pending school registrations." />
          ) : (
            <Table
              headers={[
                "School",
                "Centre Number",
                "Location",
                "Status"
              ]}
              rows={data.pendingSchools.map(
                (school) => [
                  school.name,
                  school.centre,
                  school.location,
                  <Status
                    status={
                      school.status
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

  return (
    <>
      <HeaderBlock
        eyebrow={user.role.toUpperCase()}
        title={
          school
            ? school.name
            : "School dashboard"
        }
        text="Role-based school management dashboard."
      />

      <div className="statGrid">
        <Stat
          title="Students"
          value={
            schoolStudents.length
          }
          icon={<Users />}
        />

        <Stat
          title="Applications"
          value={applications.length}
          icon={<FileText />}
        />

        <Stat
          title="Available Spaces"
          value={
            school
              ? totalSpaces(
                  school.spaces
                )
              : 0
          }
          icon={<Boxes />}
        />

        {user.role !== "Teacher" &&
          user.role !== "Secretary" && (
            <Stat
              title="Pending Receipts"
              value={
                payments.filter(
                  (payment) =>
                    payment.status ===
                    "PENDING"
                ).length
              }
              icon={<Receipt />}
            />
          )}
      </div>

      <div className="dashboardGrid">
        <Panel title="Attendance">
          <div className="bigMetric">
            {schoolStudents.length
              ? Math.round(
                  schoolStudents.reduce(
                    (sum, student) =>
                      sum +
                      student.attendance,
                    0
                  ) /
                    schoolStudents.length
                )
              : 0}
            %
          </div>

          <p className="muted">
            School attendance overview.
          </p>
        </Panel>

        <Panel title="Academic performance">
          <div className="bigMetric">
            {schoolStudents.length
              ? Math.round(
                  schoolStudents.reduce(
                    (sum, student) =>
                      sum +
                      studentAverage(
                        student
                      ),
                    0
                  ) /
                    schoolStudents.length
                )
              : 0}
            %
          </div>

          <p className="muted">
            Current demo average.
          </p>
        </Panel>
      </div>
    </>
  );
}

/* =======================================================
   SCHOOL DIRECTORY FOR PARENT
======================================================= */

function ParentSchoolDirectory({
  user,
  data,
  setPage
}) {
  const [search, setSearch] =
    useState("");

  const schools =
    data.schools.filter(
      (school) => {
        const text =
          (
            school.name +
            " " +
            school.centre +
            " " +
            school.location
          ).toLowerCase();

        return (
          school.status ===
            "APPROVED" &&
          text.includes(
            search.toLowerCase()
          )
        );
      }
    );

  return (
    <>
      <HeaderBlock
        eyebrow="SCHOOL DIRECTORY"
        title="Find a school"
        text="You are already logged in. There is no second parent login."
      />

      <div className="searchBox">
        <Search />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
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
                Centre Number:{" "}
                {school.centre}
              </p>

              <p>
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
                className="primary"
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

/* =======================================================
   ADMISSIONS
======================================================= */

function Admissions({
  user,
  data,
  setData
}) {
  const schoolId = user.schoolId;

  const applications =
    data.applications.filter(
      (application) =>
        application.schoolId ===
        schoolId
    );

  /*
  IMPORTANT:
  This function deliberately avoids the broken
  conditional expression from the previous main.jsx.
  */

  function decideApplication(
    application,
    decision
  ) {
    if (
      decision === "APPROVED" &&
      application.status !==
        "APPROVED"
    ) {
      const school =
        data.schools.find(
          (item) =>
            item.id === schoolId
        );

      if (!school) {
        alert(
          "School could not be found."
        );
        return;
      }

      const currentSpaces = Number(
        school.spaces[
          application.form
        ] || 0
      );

      if (currentSpaces <= 0) {
        alert(
          "No available space for " +
            application.form +
            "."
        );
        return;
      }

      const updatedSchools =
        data.schools.map(
          (item) => {
            if (
              item.id !== schoolId
            ) {
              return item;
            }

            return {
              ...item,
              spaces: {
                ...item.spaces,
                [application.form]:
                  currentSpaces - 1
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

      const newNotification = {
        id:
          "NOT-" +
          Date.now(),

        title:
          "Application approved",

        body:
          application.childName +
          "'s school application has been approved.",

        audience:
          application.parentEmail
      };

      setData({
        ...data,
        schools: updatedSchools,
        applications:
          updatedApplications,
        notifications: [
          ...data.notifications,
          newNotification
        ]
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

    let title =
      "Application updated";

    let body =
      application.childName +
      " application status: " +
      decision;

    if (decision === "WAITLIST") {
      title =
        "Application wait-listed";
    }

    if (decision === "DECLINED") {
      title =
        "Application declined";
    }

    const newNotification = {
      id:
        "NOT-" +
        Date.now(),

      title,
      body,
      audience:
        application.parentEmail
    };

    setData({
      ...data,
      applications:
        updatedApplications,
      notifications: [
        ...data.notifications,
        newNotification
      ]
    });
  }

  return (
    <>
      <HeaderBlock
        eyebrow="ADMISSIONS"
        title="Application management"
        text="Review applications and approve, decline or wait-list them."
      />

      <Panel title="Applications">
        {applications.length === 0 ? (
          <Empty text="No applications yet. When a parent applies to this school, the application will appear here." />
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
                  onClick={() => {
                    const docs =
                      application.documents ||
                      [];

                    if (!docs.length) {
                      alert(
                        "No documents uploaded."
                      );
                      return;
                    }

                    alert(
                      docs
                        .map(
                          (doc) =>
                            doc.name
                        )
                        .join("\n")
                    );
                  }}
                >
                  <Eye size={14} />
                  View
                </button>,

                <Status
                  status={
                    application.status
                  }
                />,

                <div className="rowActions">
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

/* =======================================================
   STUDENTS
======================================================= */

function Students({
  user,
  data
}) {
  const students =
    data.students
      .filter(
        (student) =>
          student.schoolId ===
          user.schoolId
      )
      .sort((a, b) =>
        a.form.localeCompare(
          b.form
        )
      );

  return (
    <>
      <HeaderBlock
        eyebrow="STUDENTS"
        title="Student register"
        text="Students are grouped by Grade/Form with attendance and average performance."
      />

      <Panel title="All students">
        <Table
          headers={[
            "Grade/Form",
            "Student",
            "Attendance",
            "Average",
            "Performance"
          ]}
          rows={students.map(
            (student) => [
              student.form,

              student.name,

              student.attendance +
                "%",

              studentAverage(
                student
              ) + "%",

              studentAverage(
                student
              ) < 50 ? (
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

/* =======================================================
   TEACHERS
======================================================= */

function Teachers({
  user,
  data,
  setData
}) {
  const school =
    data.schools.find(
      (item) =>
        item.id === user.schoolId
    );

  const staff =
    school?.staff || [];

  const isLeadership =
    user.role === "Principal" ||
    user.role ===
      "Deputy Principal";

  function removeStaff(staffId) {
    if (!isLeadership) {
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
            staff: item.staff.filter(
              (person) =>
                person.id !==
                staffId
            )
          };
        }
      );

    setData({
      ...data,
      schools: updatedSchools
    });
  }

  return (
    <>
      <HeaderBlock
        eyebrow="STAFF"
        title="School staff"
        text="Principals and Deputy Principals can manage staff assigned to their school."
      />

      <Panel title="Staff register">
        <Table
          headers={[
            "Name",
            "Role",
            "Subjects",
            "Grades",
            "Action"
          ]}
          rows={staff.map(
            (person) => [
              person.name,

              person.role,

              person.subjects
                ? person.subjects.join(
                    ", "
                  )
                : "—",

              person.grades
                ? person.grades.join(
                    ", "
                  )
                : "—",

              isLeadership &&
              person.role !==
                "Principal" ? (
                <button
                  className="small danger"
                  onClick={() =>
                    removeStaff(
                      person.id
                    )
                  }
                >
                  <UserMinus
                    size={14}
                  />
                  Remove
                </button>
              ) : (
                "—"
              )
            ]
          )}
        />
      </Panel>
    </>
  );
}

/* =======================================================
   ATTENDANCE
======================================================= */

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

  function markAbsent(id) {
    const updated =
      data.students.map(
        (student) => {
          if (
            student.id !== id
          ) {
            return student;
          }

          return {
            ...student,
            attendance: Math.max(
              0,
              student.attendance - 1
            )
          };
        }
      );

    setData({
      ...data,
      students: updated
    });
  }

  return (
    <>
      <HeaderBlock
        eyebrow="ATTENDANCE"
        title="Attendance register"
        text="Teachers mark students who are absent. Students not marked absent are treated as present."
      />

      <Panel title="Today's register">
        <Table
          headers={[
            "Grade/Form",
            "Student",
            "Attendance",
            "Action"
          ]}
          rows={students.map(
            (student) => [
              student.form,

              student.name,

              student.attendance +
                "%",

              user.role ===
              "Teacher" ? (
                <button
                  className="small danger"
                  onClick={() =>
                    markAbsent(
                      student.id
                    )
                  }
                >
                  Mark Absent
                </button>
              ) : (
                "View"
              )
            ]
          )}
        />
      </Panel>
    </>
  );
}

/* =======================================================
   MARKS
======================================================= */

function Marks({
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

  function updateMark(
    studentId,
    subject,
    field,
    value
  ) {
    if (
      user.role === "Teacher" &&
      !(user.subjects || []).includes(
        subject
      )
    ) {
      return;
    }

    const number =
      value === ""
        ? 0
        : Number(value);

    const updated =
      data.students.map(
        (student) => {
          if (
            student.id !==
            studentId
          ) {
            return student;
          }

          const current =
            student.subjects[
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
                [field]: number
              }
            }
          };
        }
      );

    setData({
      ...data,
      students: updated
    });
  }

  function updateComment(
    studentId,
    subject,
    value
  ) {
    if (
      user.role === "Teacher" &&
      !(user.subjects || []).includes(
        subject
      )
    ) {
      return;
    }

    const updated =
      data.students.map(
        (student) => {
          if (
            student.id !==
            studentId
          ) {
            return student;
          }

          const current =
            student.subjects[
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
                comment: value
              }
            }
          };
        }
      );

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
            ? "Teachers can only enter marks and comments for subjects they teach."
            : "School leadership can view academic marks across the school."
        }
      />

      {students.map(
        (student) => (
          <Panel
            key={student.id}
            title={
              student.form +
              " — " +
              student.name
            }
          >
            <div className="tableWrap">
              <table>
                <thead>
                  <tr>
                    <th>
                      Subject
                    </th>

                    <th>
                      Test
                    </th>

                    <th>
                      Exam
                    </th>

                    <th>
                      Aggregate
                    </th>

                    <th>
                      Comment
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {subjects.map(
                    (subject) => {
                      const result =
                        student
                          .subjects[
                          subject
                        ] || {
                          test: 0,
                          exam: 0,
                          comment: ""
                        };

                      const aggregateValue =
                        Number(
                          result.test ||
                            0
                        ) +
                        Number(
                          result.exam ||
                            0
                        );

                      return (
                        <tr
                          key={
                            subject
                          }
                        >
                          <td>
                            <strong>
                              {
                                subject
                              }
                            </strong>
                          </td>

                          <td>
                            <input
                              className="tableInput"
                              type="number"
                              min="0"
                              max="100"
                              value={
                                result.test
                              }
                              disabled={
                                user.role ===
                                  "Teacher" &&
                                !user.subjects.includes(
                                  subject
                                )
                              }
                              onChange={(
                                e
                              ) =>
                                updateMark(
                                  student.id,
                                  subject,
                                  "test",
                                  e.target
                                    .value
                                )
                              }
                            />
                          </td>

                          <td>
                            <input
                              className="tableInput"
                              type="number"
                              min="0"
                              max="100"
                              value={
                                result.exam
                              }
                              disabled={
                                user.role ===
                                  "Teacher" &&
                                !user.subjects.includes(
                                  subject
                                )
                              }
                              onChange={(
                                e
                              ) =>
                                updateMark(
                                  student.id,
                                  subject,
                                  "exam",
                                  e.target
                                    .value
                                )
                              }
                            />
                          </td>

                          <td>
                            <strong>
                              {
                                aggregateValue
                              }
                            </strong>
                          </td>

                          <td>
                            <input
                              className="tableInput commentInput"
                              value={
                                result.comment
                              }
                              disabled={
                                user.role ===
                                  "Teacher" &&
                                !user.subjects.includes(
                                  subject
                                )
                              }
                              onChange={(
                                e
                              ) =>
                                updateComment(
                                  student.id,
                                  subject,
                                  e.target
                                    .value
                                )
                              }
                            />
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </Panel>
        )
      )}
    </>
  );
}

/* =======================================================
   FINANCE
======================================================= */

function Finance({
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

  function approveReceipt(paymentId) {
    const updated =
      data.payments.map(
        (payment) => {
          if (
            payment.id !==
            paymentId
          ) {
            return payment;
          }

          return {
            ...payment,
            status: "APPROVED"
          };
        }
      );

    setData({
      ...data,
      payments: updated
    });
  }

  return (
    <>
      <HeaderBlock
        eyebrow="FINANCE"
        title="School finance"
        text="Accountants manage fees, payments, balances and receipt verification."
      />

      <Panel title="Student fee table">
        <Table
          headers={[
            "Form",
            "Student",
            "Total Fees",
            "Paid",
            "Balance",
            "Receipt"
          ]}
          rows={students.map(
            (student) => {
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
                      sum,
                      payment
                    ) =>
                      sum +
                      Number(
                        payment.amount
                      ),
                    0
                  );

              const school =
                data.schools.find(
                  (item) =>
                    item.id ===
                    user.schoolId
                );

              const total =
                Number(
                  school?.fees || 0
                );

              return [
                student.form,
                student.name,
                "E" +
                  total.toLocaleString(),
                "E" +
                  paid.toLocaleString(),
                "E" +
                  Math.max(
                    0,
                    total - paid
                  ).toLocaleString(),
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
                        approveReceipt(
                          pending.id
                        );
                      }
                    }}
                  >
                    Approve Receipt
                  </button>
                ) : (
                  "Verified"
                )
              ];
            }
          )}
        />
      </Panel>
    </>
  );
}

/* =======================================================
   SPACES
======================================================= */

function Spaces({
  user,
  data,
  setData
}) {
  const school =
    data.schools.find(
      (item) =>
        item.id === user.schoolId
    );

  function updateSpace(
    grade,
    value
  ) {
    const number =
      Number(value) < 0
        ? 0
        : Number(value);

    const updated =
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
              [grade]: number
            }
          };
        }
      );

    setData({
      ...data,
      schools: updated
    });
  }

  if (!school) {
    return (
      <Empty text="School not found." />
    );
  }

  return (
    <>
      <HeaderBlock
        eyebrow="AVAILABLE SPACES"
        title="Manage spaces"
        text="School administrators can update available spaces."
      />

      <Panel title="Available spaces">
        <div className="spaceManagement">
          {Object.entries(
            school.spaces
          ).map(
            ([grade, spaces]) => (
              <div
                className="spaceManageRow"
                key={grade}
              >
                <strong>
                  {grade}
                </strong>

                <input
                  type="number"
                  min="0"
                  value={spaces}
                  onChange={(e) =>
                    updateSpace(
                      grade,
                      e.target.value
                    )
                  }
                />

                <span>
                  {spaces === 0
                    ? "FULL"
                    : "spaces"}
                </span>
              </div>
            )
          )}
        </div>

        <div className="totalBox">
          Total available:
          <strong>
            {" "}
            {totalSpaces(
              school.spaces
            )}
          </strong>
        </div>
      </Panel>
    </>
  );
}

/* =======================================================
   RESOURCES
======================================================= */

function Resources({
  user,
  data,
  setData
}) {
  const [resources, setResources] =
    useState([
      {
        id: "R1",
        name: "Form 1 Classroom",
        desks: 24,
        chairs: 30
      },
      {
        id: "R2",
        name: "Computer Laboratory",
        desks: 20,
        chairs: 25
      }
    ]);

  function updateResource(
    id,
    field,
    value
  ) {
    setResources(
      resources.map(
        (resource) => {
          if (
            resource.id !== id
          ) {
            return resource;
          }

          return {
            ...resource,
            [field]: Number(
              value
            )
          };
        }
      )
    );

    setData({
      ...data
    });
  }

  return (
    <>
      <HeaderBlock
        eyebrow="RESOURCES"
        title="School resources"
        text="Manage demo physical school resources."
      />

      <Panel title="Resources">
        <Table
          headers={[
            "Resource",
            "Desks",
            "Chairs"
          ]}
          rows={resources.map(
            (resource) => [
              resource.name,

              <input
                className="tableInput"
                type="number"
                value={
                  resource.desks
                }
                onChange={(e) =>
                  updateResource(
                    resource.id,
                    "desks",
                    e.target.value
                  )
                }
              />,

              <input
                className="tableInput"
                type="number"
                value={
                  resource.chairs
                }
                onChange={(e) =>
                  updateResource(
                    resource.id,
                    "chairs",
                    e.target.value
                  )
                }
              />
            ]
          )}
        />
      </Panel>
    </>
  );
}

/* =======================================================
   NOTIFICATIONS
======================================================= */

function Notifications({
  user,
  data,
  setData
}) {
  const [title, setTitle] =
    useState("");

  const [body, setBody] =
    useState("");

  function send() {
    if (!title || !body) {
      return;
    }

    const notification = {
      id:
        "NOT-" +
        Date.now(),

      title,
      body,

      audience:
        user.schoolId || "all"
    };

    setData({
      ...data,

      notifications: [
        ...data.notifications,
        notification
      ]
    });

    setTitle("");
    setBody("");
  }

  return (
    <>
      <HeaderBlock
        eyebrow="COMMUNICATIONS"
        title="Notifications"
        text="Secretaries can prepare school communications and future SMS messages."
      />

      {user.role ===
        "Secretary" && (
        <Panel title="Create notification">
          <label>
            Title
            <input
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
            />
          </label>

          <label>
            Message
            <textarea
              value={body}
              onChange={(e) =>
                setBody(
                  e.target.value
                )
              }
            />
          </label>

          <button
            className="primary"
            onClick={send}
          >
            Send Demo Notification
          </button>
        </Panel>
      )}

      <Panel title="Notifications">
        {data.notifications.map(
          (notification) => (
            <div
              className="notification"
              key={notification.id}
            >
              <MessageSquare
                size={18}
              />

              <div>
                <strong>
                  {
                    notification.title
                  }
                </strong>

                <p>
                  {
                    notification.body
                  }
                </p>
              </div>
            </div>
          )
        )}
      </Panel>
    </>
  );
}

/* =======================================================
   CALENDAR
======================================================= */

function CalendarPage({
  user,
  data,
  setData
}) {
  const [title, setTitle] =
    useState("");

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  function addEvent() {
    if (
      !title ||
      !date ||
      !time
    ) {
      return;
    }

    setData({
      ...data,

      calendar: [
        ...data.calendar,

        {
          id:
            "CAL-" +
            Date.now(),

          title,
          date,
          time,

          details:
            "EduLink demo event"
        }
      ]
    });

    setTitle("");
    setDate("");
    setTime("");
  }

  return (
    <>
      <HeaderBlock
        eyebrow="SCHOOL CALENDAR"
        title="School calendar"
        text="Staff can view important school events."
      />

      {(user.role ===
        "Principal" ||
        user.role ===
          "Deputy Principal" ||
        user.role ===
          "Secretary") && (
        <Panel title="Add event">
          <div className="formGrid">
            <label>
              Event
              <input
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Date
              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Time
              <input
                type="time"
                value={time}
                onChange={(e) =>
                  setTime(
                    e.target.value
                  )
                }
              />
            </label>
          </div>

          <button
            className="primary"
            onClick={addEvent}
          >
            Add Event
          </button>
        </Panel>
      )}

      <Panel title="Upcoming events">
        {data.calendar.map(
          (event) => (
            <div
              className="calendarEvent"
              key={event.id}
            >
              <CalendarDays />

              <div>
                <strong>
                  {event.title}
                </strong>

                <p>
                  {event.date} •{" "}
                  {event.time}
                </p>

                <small>
                  {event.details}
                </small>
              </div>
            </div>
          )
        )}
      </Panel>
    </>
  );
}

/* =======================================================
   PARENT CHILDREN
======================================================= */

function ParentChildren({
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
        title="My children"
        text="Only children linked to your parent account are shown."
      />

      {children.map(
        (child) => (
          <Panel
            key={child.id}
            title={
              child.name +
              " • " +
              child.form
            }
          >
            <div className="statGrid">
              <Stat
                title="Attendance"
                value={
                  child.attendance +
                  "%"
                }
                icon={
                  <CalendarCheck />
                }
              />

              <Stat
                title="Average"
                value={
                  studentAverage(
                    child
                  ) + "%"
                }
                icon={
                  <BookOpen />
                }
              />

              <Stat
                title="Aggregate"
                value={aggregate(
                  child
                )}
                icon={
                  <GraduationCap />
                }
              />
            </div>

            <Table
              headers={[
                "Subject",
                "Test",
                "Exam",
                "Comment"
              ]}
              rows={Object.entries(
                child.subjects
              ).map(
                ([
                  subject,
                  result
                ]) => [
                  subject,
                  result.test,
                  result.exam,
                  result.comment ||
                    "No comment"
                ]
              )}
            />
          </Panel>
        )
      )}
    </>
  );
}

/* =======================================================
   PARENT APPLICATIONS
======================================================= */

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

  const [dob, setDob] =
    useState("");

  const [gender, setGender] =
    useState("Female");

  const [previousSchool, setPreviousSchool] =
    useState("");

  const [files, setFiles] =
    useState([]);

  const applications =
    data.applications.filter(
      (application) =>
        application.parentEmail ===
        user.email
    );

  function submitApplication(
    event
  ) {
    event.preventDefault();

    if (
      !schoolId ||
      !childName ||
      !form
    ) {
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

    if (
      school.admission !==
      "OPEN"
    ) {
      alert(
        "Admissions are currently closed."
      );
      return;
    }

    const spaces = Number(
      school.spaces[form] || 0
    );

    if (spaces <= 0) {
      alert(
        form +
          " is currently full."
      );
      return;
    }

    const application = {
      id:
        "APP-" +
        Date.now(),

      schoolId,

      parentName: user.name,

      parentEmail: user.email,

      childName,

      dob,

      gender,

      previousSchool,

      form,

      documents: files,

      status: "PENDING",

      createdAt:
        new Date().toISOString()
    };

    setData({
      ...data,

      applications: [
        ...data.applications,
        application
      ]
    });

    setChildName("");
    setDob("");
    setPreviousSchool("");
    setFiles([]);

    alert(
      "Application submitted successfully."
    );
  }

  return (
    <>
      <HeaderBlock
        eyebrow="MY APPLICATIONS"
        title="School applications"
        text="Parents can apply to desired schools and upload required documents."
      />

      <Panel title="New application">
        <form
          onSubmit={
            submitApplication
          }
        >
          <div className="formGrid">
            <label>
              School
              <select
                value={schoolId}
                onChange={(e) =>
                  setSchoolId(
                    e.target.value
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
              Child full name
              <input
                value={childName}
                onChange={(e) =>
                  setChildName(
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Date of birth
              <input
                type="date"
                value={dob}
                onChange={(e) =>
                  setDob(
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Gender
              <select
                value={gender}
                onChange={(e) =>
                  setGender(
                    e.target.value
                  )
                }
              >
                <option>
                  Female
                </option>

                <option>
                  Male
                </option>
              </select>
            </label>

            <label>
              Grade/Form
              <select
                value={form}
                onChange={(e) =>
                  setForm(
                    e.target.value
                  )
                }
              >
                <option>
                  Form 1
                </option>

                <option>
                  Form 2
                </option>

                <option>
                  Form 3
                </option>

                <option>
                  Form 4
                </option>

                <option>
                  Form 5
                </option>
              </select>
            </label>

            <label>
              Previous school
              <input
                value={
                  previousSchool
                }
                onChange={(e) =>
                  setPreviousSchool(
                    e.target.value
                  )
                }
              />
            </label>
          </div>

          <label>
            Required documents
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                const selected =
                  Array.from(
                    e.target.files || []
                  ).map(
                    (file) => ({
                      name: file.name,
                      type: file.type,
                      size: file.size
                    })
                  );

                setFiles(selected);
              }}
            />
          </label>

          <div className="uploadBox">
            <Upload size={18} />

            {files.length === 0
              ? "Upload transcript/report and other required documents."
              : files
                  .map(
                    (file) =>
                      file.name
                  )
                  .join(", ")}
          </div>

          <button
            className="primary"
            type="submit"
          >
            Submit Application
          </button>
        </form>
      </Panel>

      <Panel title="Application history">
        {applications.length === 0 ? (
          <Empty text="You have not submitted an application." />
        ) : (
          <Table
            headers={[
              "School",
              "Child",
              "Form",
              "Status"
            ]}
            rows={applications.map(
              (application) => {
                const school =
                  data.schools.find(
                    (item) =>
                      item.id ===
                      application.schoolId
                  );

                return [
                  school?.name ||
                    "Unknown",

                  application.childName,

                  application.form,

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
    </>
  );
}

/* =======================================================
   PARENT FEES
======================================================= */

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
        title="My school fees"
        text="Only fees belonging to your own children are shown."
      />

      {children.map(
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
                payment.status ===
                  "APPROVED"
            );

          const paid =
            payments.reduce(
              (sum, payment) =>
                sum +
                Number(
                  payment.amount
                ),
              0
            );

          const total =
            Number(
              school?.fees || 0
            );

          return (
            <Panel
              key={child.id}
              title={child.name}
            >
              <div className="statGrid">
                <Stat
                  title="Total Fees"
                  value={
                    "E" +
                    total.toLocaleString()
                  }
                  icon={
                    <Receipt />
                  }
                />

                <Stat
                  title="Paid"
                  value={
                    "E" +
                    paid.toLocaleString()
                  }
                  icon={
                    <CheckCircle />
                  }
                />

                <Stat
                  title="Balance"
                  value={
                    "E" +
                    Math.max(
                      0,
                      total - paid
                    ).toLocaleString()
                  }
                  icon={
                    <AlertTriangle />
                  }
                />
              </div>
            </Panel>
          );
        }
      )}
    </>
  );
}

/* =======================================================
   REPORTS
======================================================= */

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
        title="School reports"
        text="Demo academic and attendance reporting."
      />

      <Panel title="Academic summary">
        <Table
          headers={[
            "Student",
            "Form",
            "Average",
            "Attendance"
          ]}
          rows={students.map(
            (student) => [
              student.name,
              student.form,
              studentAverage(
                student
              ) + "%",
              student.attendance +
                "%"
            ]
          )}
        />
      </Panel>
    </>
  );
}

/* =======================================================
   SETTINGS
======================================================= */

function SettingsPage({
  user
}) {
  return (
    <>
      <HeaderBlock
        eyebrow="SETTINGS"
        title="Account settings"
        text="Prototype account information."
      />

      <Panel title="Current account">
        <div className="settingRow">
          <span>Name</span>
          <strong>
            {user.name}
          </strong>
        </div>

        <div className="settingRow">
          <span>Role</span>
          <strong>
            {user.role}
          </strong>
        </div>

        <div className="settingRow">
          <span>Email</span>
          <strong>
            {user.email}
          </strong>
        </div>
      </Panel>
    </>
  );
}

/* =======================================================
   UI COMPONENTS
======================================================= */

function HeaderBlock({
  eyebrow,
  title,
  text
}) {
  return (
    <div className="pageHeader">
      <span className="eyebrow">
        {eyebrow}
      </span>

      <h1>{title}</h1>

      <p>{text}</p>
    </div>
  );
}

function Panel({
  title,
  children
}) {
  return (
    <section className="panel">
      {title && (
        <div className="panelHeader">
          <h2>{title}</h2>
        </div>
      )}

      <div className="panelBody">
        {children}
      </div>
    </section>
  );
}

function Stat({
  title,
  value,
  icon
}) {
  return (
    <div className="statCard">
      <div className="statIcon">
        {icon}
      </div>

      <div>
        <small>{title}</small>
        <strong>{value}</strong>
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
  const className =
    status === "APPROVED"
      ? "status approved"
      : status === "DECLINED"
      ? "status declined"
      : status === "WAITLIST"
      ? "status waitlist"
      : "status pending";

  return (
    <span className={className}>
      {status}
    </span>
  );
}

function Empty({
  text
}) {
  return (
    <div className="empty">
      <FileText size={22} />
      <p>{text}</p>
    </div>
  );
}

function FeatureCard({
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

/* =======================================================
   START APPLICATION
======================================================= */

const rootElement =
  document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "EduLink: root element was not found in index.html."
  );
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
