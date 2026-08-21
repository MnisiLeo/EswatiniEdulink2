import React, { useEffect, useState } from "react";
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
  Eye
} from "lucide-react";
import "./styles.css";

/* =========================================================
   EDULINK ESWATINI
   Demo-only frontend prototype
   ========================================================= */

const roles = {
  "System Admin": ["dashboard", "schools", "settings"],

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

const navMeta = {
  dashboard: ["Overview", LayoutDashboard],
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

/* =========================================================
   DEMO DATA
   ========================================================= */

const seed = {
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
      id: "P1",
      studentId: "ST-001",
      parentEmail: "parent@demo.sz",
      amount: 1500,
      status: "APPROVED",
      receipt: "Demo receipt - E1500"
    },

    {
      id: "P2",
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
      body: "This is a fictional demonstration notification.",
      audience: "all"
    }
  ],

  calendar: [
    {
      id: "C1",
      title: "Parent Meeting",
      date: "2026-09-05",
      time: "14:00",
      details: "Main hall"
    }
  ]
};

/* =========================================================
   DEMO LOGIN ACCOUNTS
   ========================================================= */

const accounts = {
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

const PASSWORD = "demo123";

/* =========================================================
   SAFE LOCAL STORAGE
   ========================================================= */

function isValidEduLinkData(data) {
  return (
    data &&
    Array.isArray(data.schools) &&
    Array.isArray(data.pendingSchools) &&
    Array.isArray(data.students) &&
    Array.isArray(data.applications) &&
    Array.isArray(data.payments) &&
    Array.isArray(data.notifications) &&
    Array.isArray(data.calendar)
  );
}

function loadData() {
  try {
    const saved = localStorage.getItem("edulink-demo-data");

    if (!saved) {
      return seed;
    }

    const parsed = JSON.parse(saved);

    if (!isValidEduLinkData(parsed)) {
      localStorage.removeItem("edulink-demo-data");
      return seed;
    }

    return parsed;
  } catch (error) {
    console.error("EduLink data error:", error);

    try {
      localStorage.removeItem("edulink-demo-data");
    } catch (_) {}

    return seed;
  }
}

function saveData(data) {
  try {
    localStorage.setItem(
      "edulink-demo-data",
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

function avgStudent(student) {
  const values = Object.values(student.subjects || {})
    .flatMap((subject) => [
      Number(subject.test || 0),
      Number(subject.exam || 0)
    ])
    .filter((value) => Number.isFinite(value));

  if (!values.length) return 0;

  return Math.round(
    values.reduce((a, b) => a + b, 0) / values.length
  );
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

function useData() {
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
  const [data, setData] = useData();
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [mobile, setMobile] = useState(false);

  if (!user) {
    return (
      <Public
        data={data}
        setData={setData}
        onLogin={setUser}
        setPage={setPage}
      />
    );
  }

  const allowed = roles[user.role] || [];

  const schoolId = user.schoolId;

  return (
    <div className="app">
      <aside
        className={`sidebar ${mobile ? "open" : ""}`}
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
            const meta = navMeta[key];

            if (!meta) return null;

            const [label, Icon] = meta;

            const display =
              user.role === "System Admin" &&
              key === "schools"
                ? "School Management"
                : label;

            return (
              <button
                key={key}
                className={
                  page === key ? "navActive" : ""
                }
                onClick={() => {
                  setPage(key);
                  setMobile(false);
                }}
              >
                <Icon size={18} />
                {display}
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
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X /> : <Menu />}
          </button>

          <div>
            <strong>{user.name}</strong>

            <small>
              {user.role}

              {schoolId
                ? ` • ${
                    data.schools.find(
                      (school) =>
                        school.id === schoolId
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
   PUBLIC HOME
   ========================================================= */

function Public({
  data,
  setData,
  onLogin,
  setPage
}) {
  const [search, setSearch] = useState("");
  const [login, setLogin] = useState(false);
  const [schoolReg, setSchoolReg] =
    useState(false);
  const [selected, setSelected] =
    useState(null);

  const visible = data.schools.filter(
    (school) => {
      const text =
        `${school.name} ${school.centre} ${school.location}`
          .toLowerCase();

      return (
        school.status === "APPROVED" &&
        text.includes(search.toLowerCase())
      );
    }
  );

  if (selected) {
    return (
      <div className="public">
        <Header
          onLogin={() => setLogin(true)}
          onSchools={() => setSelected(null)}
        />

        <SchoolProfile
          school={selected}
          onBack={() => setSelected(null)}
          onLogin={() => setLogin(true)}
        />
      </div>
    );
  }

  return (
    <div className="public">
      <Header
        onLogin={() => setLogin(true)}
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
            Find schools, check available spaces,
            apply online, monitor your child's
            progress and stay connected with
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
                setSchoolReg(true)
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

          <div className="miniNote">
            <CheckCircle size={18} />
            <span>
              Secure role-based school
              management
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

          <h2>Find a school</h2>

          <p>
            Search approved participating
            schools by name, Centre Number or
            location.
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
          {visible.map((school) => (
            <button
              className="schoolCard"
              key={school.id}
              onClick={() =>
                setSelected(school)
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
      </section>

      <section className="publicSection alt">
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
            EduLink{" "}
            <span>ESWATINI</span>
          </div>
        </div>

        <p>
          Fictional prototype data • Not
          affiliated with ECESWA or SNAT.
        </p>
      </footer>

      {login && (
        <LoginModal
          onClose={() => setLogin(false)}
          onLogin={(user) => {
            setLogin(false);
            onLogin(user);
            setPage("dashboard");
          }}
        />
      )}

      {schoolReg && (
        <SchoolRegistration
          data={data}
          setData={setData}
          onClose={() =>
            setSchoolReg(false)
          }
        />
      )}
    </div>
  );
}

/* =========================================================
   HEADER
   ========================================================= */

function Header({
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
              school.spaces
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
            Demo annual school fees.
            Parents can apply after
            signing in.
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
  const roleChoices = [
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

  function chooseRole(
    role,
    address
  ) {
    setSelectedRole(role);
    setEmail(address);
    setPassword("demo123");
    setError("");
  }

  function submit() {
    const account =
      accounts[
        email.trim().toLowerCase()
      ];

    if (
      !account ||
      password !== PASSWORD
    ) {
      setError(
        "Incorrect demo email or password."
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
        Select the role you want to use
        for the presentation.
      </p>

      <div className="loginRoleGrid">
        {roleChoices.map(
          ([
            label,
            address,
            Icon
          ]) => (
            <button
              type="button"
              key={label}
              className={
                "loginRoleCard " +
                (selectedRole ===
                label
                  ? "selected"
                  : "")
              }
              onClick={() =>
                chooseRole(
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
        Demo password:{" "}
        <b>demo123</b>
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

  function submit() {
    if (
      !form.name ||
      !form.centre ||
      !form.location ||
      !form.principal
    ) {
      return;
    }

    const staff =
      form.staff
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean)
        .map((name) => ({
          name,
          role: "Teacher"
        }));

    const pendingSchool = {
      ...form,
      id: "PS-" + Date.now(),
      status: "PENDING",
      staff: [
        {
          name: form.principal,
          role: "Principal"
        },
        {
          name: form.deputy,
          role: "Deputy Principal"
        },
        ...staff
      ]
    };

    setData({
      ...data,
      pendingSchools: [
        ...data.pendingSchools,
        pendingSchool
      ]
    });

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
            Registration submitted for
            Admin verification.
          </div>

          <p className="muted">
            The System Admin must verify
            that the school exists and
            that the submitted information
            is truthful before approval.
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
              School name*
              <input
                value={form.name}
