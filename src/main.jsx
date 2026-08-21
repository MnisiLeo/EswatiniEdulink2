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
  LogOut,
  Menu,
  X,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  UserPlus,
  Upload,
  Eye,
  UserMinus,
  UserCheck,
  Bell,
  MapPin,
  Award,
  ClipboardList,
  Home,
  BarChart3,
  Receipt,
  Plus,
  Trash2
} from "lucide-react";
import "./styles.css";

/* =========================================================
   EDULINK ESWATINI
   Complete presentation prototype
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
    "staff",
    "attendance",
    "marks",
    "finance",
    "spaces",
    "calendar",
    "notifications",
    "reports"
  ],

  "Deputy Principal": [
    "dashboard",
    "admissions",
    "students",
    "staff",
    "attendance",
    "marks",
    "finance",
    "spaces",
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
  dashboard: ["Dashboard", LayoutDashboardIcon],
  schools: ["Find a School", School],
  admissions: ["Applications", FileText],
  students: ["Students", Users],
  staff: ["School Staff", GraduationCap],
  attendance: ["Attendance", CalendarCheck],
  marks: ["Marks & Performance", BookOpen],
  finance: ["Fees & Finance", Wallet],
  spaces: ["Available Spaces", School],
  calendar: ["School Calendar", CalendarDays],
  notifications: ["Notifications", Bell],
  children: ["My Children", Users],
  applications: ["My Applications", FileText],
  attendanceParent: ["My Children's Attendance", CalendarCheck],
  marksParent: ["My Children's Performance", BookOpen],
  fees: ["School Fees", Receipt],
  reports: ["Reports", BarChart3],
  settings: ["Settings", Settings]
};

function LayoutDashboardIcon(props) {
  return <Home {...props} />;
}

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
      },
      staff: [
        {
          id: "STF1",
          name: "Dr. J. Dlamini",
          role: "Principal",
          email: "principal@demo.sz"
        },
        {
          id: "STF2",
          name: "Mr. B. Mamba",
          role: "Deputy Principal",
          email: "deputy@demo.sz"
        },
        {
          id: "STF3",
          name: "Mr. M. Nkosi",
          role: "Teacher",
          email: "teacher@demo.sz",
          subjects: ["Mathematics", "English"],
          grades: ["Form 1", "Form 2"]
        },
        {
          id: "STF4",
          name: "Ms. P. Mamba",
          role: "Accountant",
          email: "accountant@demo.sz"
        },
        {
          id: "STF5",
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
      attendance: 80,
      subjects: {
        Mathematics: {
          test: 80,
          exam: 84,
          comment: "Strong progress."
        },
        English: {
          test: 88,
          exam: 90,
          comment: "Excellent reading."
        },
        Chemistry: {
          test: 78,
          exam: 82,
          comment: "Good understanding."
        },
        Agriculture: {
          test: 60,
          exam: 65,
          comment: "Needs more practice."
        },
        Physics: {
          test: 90,
          exam: 94,
          comment: "Excellent work."
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
          comment: "Keep practising."
        },
        English: {
          test: 75,
          exam: 78,
          comment: "Good effort."
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
          comment: "Needs additional support."
        }
      }
    }
  ],

  applications: [],

  payments: [
    {
      id: "PAY1",
      studentId: "ST-001",
      parentEmail: "parent@demo.sz",
      amount: 1500,
      status: "APPROVED",
      receipt: "Receipt E1500"
    },
    {
      id: "PAY2",
      studentId: "ST-002",
      parentEmail: "parent@demo.sz",
      amount: 1000,
      status: "PENDING",
      receipt: "Receipt E1000"
    }
  ],

  notifications: [
    {
      id: "N1",
      title: "Welcome to EduLink Eswatini",
      body: "Welcome to the EduLink demonstration platform.",
      audience: "all",
      date: "2026-08-21"
    }
  ],

  calendar: [
    {
      id: "C1",
      title: "Parent Meeting",
      date: "2026-09-05",
      time: "14:00",
      details: "Main school hall."
    }
  ],

  parentProfiles: []
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
   STORAGE
   ========================================================= */

function cloneInitialData() {
  return JSON.parse(JSON.stringify(INITIAL_DATA));
}

function loadData() {
  try {
    const raw = localStorage.getItem("edulink-eswatini-data");

    if (!raw) {
      return cloneInitialData();
    }

    const parsed = JSON.parse(raw);

    if (
      !parsed ||
      !Array.isArray(parsed.schools) ||
      !Array.isArray(parsed.students) ||
      !Array.isArray(parsed.applications) ||
      !Array.isArray(parsed.payments)
    ) {
      return cloneInitialData();
    }

    parsed.pendingSchools = Array.isArray(parsed.pendingSchools)
      ? parsed.pendingSchools
      : [];

    parsed.notifications = Array.isArray(parsed.notifications)
      ? parsed.notifications
      : [];

    parsed.calendar = Array.isArray(parsed.calendar)
      ? parsed.calendar
      : [];

    parsed.parentProfiles = Array.isArray(parsed.parentProfiles)
      ? parsed.parentProfiles
      : [];

    return parsed;
  } catch {
    return cloneInitialData();
  }
}

function useEduData() {
  const [data, setData] = useState(loadData);

  useEffect(() => {
    try {
      localStorage.setItem(
        "edulink-eswatini-data",
        JSON.stringify(data)
      );
    } catch {
      /* Demo can continue even if storage is unavailable. */
    }
  }, [data]);

  return [data, setData];
}

/* =========================================================
   HELPERS
   ========================================================= */

function totalSpaces(spaces) {
  return Object.values(spaces || {}).reduce(
    (total, value) => total + Number(value || 0),
    0
  );
}

function averageStudent(student) {
  const values = Object.values(student.subjects || {}).flatMap(
    (subject) => [
      Number(subject.test || 0),
      Number(subject.exam || 0)
    ]
  );

  if (!values.length) {
    return 0;
  }

  return Math.round(
    values.reduce((a, b) => a + b, 0) / values.length
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

function schoolName(data, schoolId) {
  const school = data.schools.find(
    (item) => item.id === schoolId
  );

  return school ? school.name : "No school assigned";
}

function roleCanManageStaff(role) {
  return (
    role === "Principal" ||
    role === "Deputy Principal"
  );
}

function roleCanManageApplications(role) {
  return (
    role === "Principal" ||
    role === "Deputy Principal"
  );
}

/* =========================================================
   ROOT APP
   ========================================================= */

function App() {
  const [data, setData] = useEduData();
  const [user, setUser] = useState(null);

  if (!user) {
    return (
      <PublicWebsite
        data={data}
        setData={setData}
        onLogin={setUser}
      />
    );
  }

  return (
    <PrivatePortal
      user={user}
      data={data}
      setData={setData}
      onLogout={() => setUser(null)}
    />
  );
}

/* =========================================================
   PUBLIC WEBSITE
   ========================================================= */

function PublicWebsite({ data, setData, onLogin }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSchoolRegistration, setShowSchoolRegistration] =
    useState(false);

  const [search, setSearch] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);

  const schools = data.schools.filter((school) => {
    const query =
      `${school.name} ${school.centre} ${school.location}`.toLowerCase();

    return (
      school.status === "APPROVED" &&
      query.includes(search.toLowerCase())
    );
  });

  if (selectedSchool) {
    return (
      <div className="publicWebsite">
        <PublicHeader
          onLogin={() => setShowLogin(true)}
          onFindSchools={() => setSelectedSchool(null)}
        />

        <SchoolDetails
          school={selectedSchool}
          onBack={() => setSelectedSchool(null)}
          onLogin={() => setShowLogin(true)}
        />

        {showLogin && (
          <LoginModal
            onClose={() => setShowLogin(false)}
            onLogin={onLogin}
          />
        )}
      </div>
    );
  }

  return (
    <div className="publicWebsite">
      <PublicHeader
        onLogin={() => setShowLogin(true)}
        onFindSchools={() =>
          document
            .getElementById("find-schools")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      />

      {/* HERO */}
      <section className="heroSection">
        <div className="heroContent">
          <div className="eyebrow">
            EDUCATION • CONNECTION • OPPORTUNITY
          </div>

          <h1>
            Connecting Eswatini's
            <span> schools, parents and communities.</span>
          </h1>

          <p>
            EduLink Eswatini is a unified digital platform designed
            to make school discovery, applications, communication,
            academic progress and school administration easier.
          </p>

          <div className="heroActions">
            <button
              className="primaryButton"
              onClick={() =>
                document
                  .getElementById("find-schools")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Find a School
              <ChevronRight size={18} />
            </button>

            <button
              className="outlineButton"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          </div>

          <div className="heroTrust">
            <CheckCircle size={17} />
            <span>
              One secure platform for every approved school role.
            </span>
          </div>
        </div>

        <div className="heroVisual">
          <div className="heroBadge">
            <ShieldCheck size={20} />
            <span>EduLink Eswatini</span>
          </div>

          <div className="heroVisualTitle">
            Better school communication.
          </div>

          <div className="heroVisualText">
            Bringing schools, parents and education administration
            together in one connected platform.
          </div>

          <div className="heroStats">
            <div>
              <strong>{data.schools.length}</strong>
              <span>Schools</span>
            </div>

            <div>
              <strong>
                {data.schools.reduce(
                  (total, school) =>
                    total + totalSpaces(school.spaces),
                  0
                )}
              </strong>
              <span>Open spaces</span>
            </div>

            <div>
              <strong>7</strong>
              <span>Portal roles</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="introSection">
        <div className="sectionLabel">THE PLATFORM</div>

        <h2>
          A connected digital experience for education in Eswatini.
        </h2>

        <p>
          EduLink brings the most important school processes into
          one platform while ensuring that every user only receives
          access appropriate to their role.
        </p>
      </section>

      {/* FIND SCHOOL */}
      <section
        className="publicSection"
        id="find-schools"
      >
        <div className="sectionHeader">
          <div>
            <div className="sectionLabel">SCHOOL DIRECTORY</div>
            <h2>Find a School</h2>
            <p>
              Search approved schools, view available spaces and
              learn about admission information.
            </p>
          </div>

          <div className="searchField">
            <Search size={19} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="School, Centre Number or location"
            />
          </div>
        </div>

        <div className="schoolCards">
          {schools.map((school) => (
            <button
              className="publicSchoolCard"
              key={school.id}
              onClick={() => setSelectedSchool(school)}
            >
              <div className="schoolCardIcon">
                <School size={24} />
              </div>

              <div className="schoolCardInfo">
                <div className="schoolCardTop">
                  <span>{school.type}</span>
                  <b>
                    {school.admission === "OPEN"
                      ? "Admissions Open"
                      : "Admissions Closed"}
                  </b>
                </div>

                <h3>{school.name}</h3>

                <p>
                  Centre {school.centre} · {school.location}
                </p>

                <div className="schoolSpace">
                  <strong>
                    {totalSpaces(school.spaces)}
                  </strong>
                  <span>available spaces</span>
                </div>
              </div>
            </button>
          ))}

          {!schools.length && (
            <div className="emptyPublic">
              No approved schools match your search.
            </div>
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section className="featureSection">
        <div className="sectionHeader centered">
          <div className="sectionLabel">WHY EDULINK</div>
          <h2>Everything connected in one place.</h2>
          <p>
            Designed around the real needs of schools, parents and
            education administrators.
          </p>
        </div>

        <div className="featureCards">
          <FeatureCard
            icon={<School />}
            title="School Discovery"
            text="Parents can find approved schools and see available spaces."
          />

          <FeatureCard
            icon={<FileText />}
            title="Digital Applications"
            text="Parents can submit applications and upload required documents."
          />

          <FeatureCard
            icon={<BookOpen />}
            title="Academic Progress"
            text="Teachers enter marks and parents see only their own children's results."
          />

          <FeatureCard
            icon={<CalendarCheck />}
            title="Attendance"
            text="Schools record attendance while parents receive child-specific information."
          />

          <FeatureCard
            icon={<Wallet />}
            title="School Fees"
            text="Accountants manage payments and verify receipts through a dedicated finance area."
          />

          <FeatureCard
            icon={<MessageSquare />}
            title="Communication"
            text="School notifications and calendar information remain accessible to the appropriate users."
          />
        </div>
      </section>

      {/* SCHOOL REGISTRATION */}
      <section className="registrationCallout">
        <div>
          <div className="sectionLabel">FOR SCHOOLS</div>
          <h2>Register your school with EduLink.</h2>
          <p>
            School registration is submitted for verification. The
            System Admin checks the information before approving the
            school.
          </p>
        </div>

        <button
          className="primaryButton"
          onClick={() => setShowSchoolRegistration(true)}
        >
          Register a School
          <ChevronRight size={18} />
        </button>
      </section>

      {/* FOOTER */}
      <footer className="publicFooter">
        <div className="footerBrand">
          <div className="brandMark">
            <ShieldCheck size={22} />
          </div>

          <div>
            <strong>EduLink</strong>
            <span>ESWATINI</span>
          </div>
        </div>

        <p>
          A fictional education technology prototype for
          demonstration and presentation purposes.
        </p>
      </footer>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={onLogin}
        />
      )}

      {showSchoolRegistration && (
        <SchoolRegistrationModal
          data={data}
          setData={setData}
          onClose={() => setShowSchoolRegistration(false)}
        />
      )}
    </div>
  );
}

/* =========================================================
   PUBLIC HEADER
   ========================================================= */

function PublicHeader({ onLogin, onFindSchools }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="publicHeader">
      <div className="publicBrand">
        <div className="brandMark">
          <ShieldCheck size={23} />
        </div>

        <div>
          <strong>EduLink</strong>
          <span>ESWATINI</span>
        </div>
      </div>

      <button
        className="mobileMenuButton"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X /> : <Menu />}
      </button>

      <nav className={mobileOpen ? "publicNav open" : "publicNav"}>
        <button
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
            setMobileOpen(false);
          }}
        >
          Home
        </button>

        <button
          onClick={() => {
            onFindSchools();
            setMobileOpen(false);
          }}
        >
          Find a School
        </button>

        <button
          onClick={() => {
            document
              .querySelector(".featureSection")
              ?.scrollIntoView({ behavior: "smooth" });
            setMobileOpen(false);
          }}
        >
          About
        </button>

        <button
          className="headerLogin"
          onClick={() => {
            onLogin();
            setMobileOpen(false);
          }}
        >
          Login
        </button>
      </nav>
    </header>
  );
}

/* =========================================================
   LOGIN
   ========================================================= */

function LoginModal({ onClose, onLogin }) {
  const roleOptions = [
    ["Parent", "parent@demo.sz", Users],
    ["Teacher", "teacher@demo.sz", GraduationCap],
    ["Principal", "principal@demo.sz", ShieldCheck],
    ["Deputy Principal", "deputy@demo.sz", ShieldCheck],
    ["Accountant", "accountant@demo.sz", Wallet],
    ["Secretary", "secretary@demo.sz", MessageSquare],
    ["System Admin", "admin@demo.sz", Settings]
  ];

  const [selectedRole, setSelectedRole] = useState("Parent");
  const [email, setEmail] = useState("parent@demo.sz");
  const [password, setPassword] = useState(PASSWORD);
  const [error, setError] = useState("");

  function selectRole(role, accountEmail) {
    setSelectedRole(role);
    setEmail(accountEmail);
    setPassword(PASSWORD);
    setError("");
  }

  function submit(event) {
    event.preventDefault();

    const account = ACCOUNTS[email.trim().toLowerCase()];

    if (!account || password !== PASSWORD) {
      setError(
        "Incorrect login details. Use one of the demo accounts shown above."
      );
      return;
    }

    onLogin({
      email: email.trim().toLowerCase(),
      ...account
    });
  }

  return (
    <Modal title="Login to EduLink" onClose={onClose}>
      <p className="modalIntro">
        One login for all EduLink users. Select your role and sign in.
      </p>

      <div className="roleLoginGrid">
        {roleOptions.map(([role, accountEmail, Icon]) => (
          <button
            key={role}
            type="button"
            className={
              selectedRole === role
                ? "roleLoginCard selected"
                : "roleLoginCard"
            }
            onClick={() => selectRole(role, accountEmail)}
          >
            <div className="roleLoginIcon">
              <Icon size={19} />
            </div>

            <div>
              <strong>{role}</strong>
              <small>{accountEmail}</small>
            </div>

            <ChevronRight size={16} />
          </button>
        ))}
      </div>

      <form onSubmit={submit}>
        <label className="formLabel">
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
          />
        </label>

        <label className="formLabel">
          Password
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />
        </label>

        <div className="demoCredentials">
          <span>Presentation password</span>
          <strong>demo123</strong>
        </div>

        {error && <div className="formError">{error}</div>}

        <button className="primaryButton fullButton" type="submit">
          Login as {selectedRole}
        </button>
      </form>
    </Modal>
  );
}

/* =========================================================
   SCHOOL REGISTRATION
   ========================================================= */

function SchoolRegistrationModal({ data, setData, onClose }) {
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

  const [submitted, setSubmitted] = useState(false);

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
      return;
    }

    const teacherNames = form.staff
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean);

    const pendingSchool = {
      id: `PENDING-${Date.now()}`,
      name: form.name.trim(),
      centre: form.centre.trim(),
      location: form.location.trim(),
      type: form.type,
      phone: form.phone.trim(),
      email: form.email.trim(),
      fees: 0,
      status: "PENDING",
      admission: "PENDING",
      spaces: {},
      staff: [
        {
          id: `STAFF-${Date.now()}-1`,
          name: form.principal.trim(),
          role: "Principal"
        },
        {
          id: `STAFF-${Date.now()}-2`,
          name: form.deputy.trim(),
          role: "Deputy Principal"
        },
        ...teacherNames.map((name, index) => ({
          id: `STAFF-${Date.now()}-${index + 3}`,
          name,
          role: "Teacher"
        }))
      ]
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

  if (submitted) {
    return (
      <Modal
        title="Registration Submitted"
        onClose={onClose}
      >
        <div className="successMessage">
          <CheckCircle size={34} />
          <h3>School sent for verification.</h3>
          <p>
            The System Admin will check whether the school exists
            and whether the information provided is truthful before
            approving or rejecting the registration.
          </p>
        </div>

        <button
          className="primaryButton fullButton"
          onClick={onClose}
        >
          Done
        </button>
      </Modal>
    );
  }

  return (
    <Modal title="Register Your School" onClose={onClose}>
      <p className="modalIntro">
        Provide the school information and initial staff list.
        The System Admin must verify the information before approval.
      </p>

      <form onSubmit={submit}>
        <div className="formTwoColumns">
          <label className="formLabel">
            School name*
            <input
              value={form.name}
              onChange={(event) =>
                update("name", event.target.value)
              }
              required
            />
          </label>

          <label className="formLabel">
            Centre Number*
            <input
              value={form.centre}
              onChange={(event) =>
                update("centre", event.target.value)
              }
              required
            />
          </label>

          <label className="formLabel">
            Location*
            <input
              value={form.location}
              onChange={(event) =>
                update("location", event.target.value)
              }
              required
            />
          </label>

          <label className="formLabel">
            School type
            <select
              value={form.type}
              onChange={(event) =>
                update("type", event.target.value)
              }
            >
              <option>High School</option>
              <option>Secondary School</option>
              <option>Primary School</option>
              <option>Combined School</option>
            </select>
          </label>

          <label className="formLabel">
            School phone
            <input
              value={form.phone}
              onChange={(event) =>
                update("phone", event.target.value)
              }
            />
          </label>

          <label className="formLabel">
            School email
            <input
              value={form.email}
              onChange={(event) =>
                update("email", event.target.value)
              }
              type="email"
            />
          </label>
        </div>

        <div className="formDivider">
          School Leadership
        </div>

        <div className="formTwoColumns">
          <label className="formLabel">
            Principal name*
            <input
              value={form.principal}
              onChange={(event) =>
                update("principal", event.target.value)
              }
              required
            />
          </label>

          <label className="formLabel">
            Deputy Principal name
            <input
              value={form.deputy}
              onChange={(event) =>
                update("deputy", event.target.value)
              }
            />
          </label>
        </div>

        <label className="formLabel">
          Teacher names
          <input
            value={form.staff}
            onChange={(event) =>
              update("staff", event.target.value)
            }
            placeholder="Example: John Dlamini, Mary Mamba"
          />
          <small>
            Separate multiple staff members with commas.
          </small>
        </label>

        <button
          className="primaryButton fullButton"
          type="submit"
        >
          Submit School for Approval
        </button>
      </form>
    </Modal>
  );
}

/* =========================================================
   SCHOOL DETAILS
   ========================================================= */

function SchoolDetails({ school, onBack, onLogin }) {
  return (
    <main className="schoolDetailsPage">
      <button className="backLink" onClick={onBack}>
        ← Back to schools
      </button>

      <div className="schoolDetailsHero">
        <div>
          <div className="sectionLabel">APPROVED SCHOOL</div>
          <h1>{school.name}</h1>
          <p>
            Centre Number {school.centre} · {school.location} ·{" "}
            {school.type}
          </p>
        </div>

        <div className="approvedTag">
          <CheckCircle size={16} />
          Approved
        </div>
      </div>

      <div className="schoolDetailsGrid">
        <section className="detailsPanel">
          <div className="panelTitle">
            <div>
              <span>ADMISSIONS</span>
              <h3>Available spaces</h3>
            </div>

            <strong>
              {totalSpaces(school.spaces)}
            </strong>
          </div>

          <div className="spaceTable">
            {Object.entries(school.spaces).map(
              ([grade, spaces]) => (
                <div key={grade}>
                  <span>{grade}</span>
                  <b>{spaces}</b>
                </div>
              )
            )}
          </div>
        </section>

        <section className="detailsPanel">
          <div className="sectionLabel">FEES</div>
          <h3>School fees</h3>

          <div className="schoolFee">
            E{Number(school.fees || 0).toLocaleString()}
          </div>

          <p>
            Parents can submit applications after creating or
            accessing their EduLink account.
          </p>

          <button
            className="primaryButton"
            onClick={onLogin}
          >
            Login to Apply
          </button>
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   PRIVATE PORTAL
   ========================================================= */

function PrivatePortal({ user, data, setData, onLogout }) {
  const permissions = ROLE_PERMISSIONS[user.role] || [];
  const [page, setPage] = useState("dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);

  const school = user.schoolId
    ? data.schools.find(
        (item) => item.id === user.schoolId
      )
    : null;

  function navigate(nextPage) {
    setPage(nextPage);
    setMobileMenu(false);
  }

  return (
    <div className="portal">
      <aside
        className={
          mobileMenu
            ? "portalSidebar mobileVisible"
            : "portalSidebar"
        }
      >
        <div className="portalBrand">
          <div className="brandMark">
            <ShieldCheck size={22} />
          </div>

          <div>
            <strong>EduLink</strong>
            <span>ESWATINI</span>
          </div>
        </div>

        <div className="portalRole">
          <span>Signed in as</span>
          <strong>{user.role}</strong>
        </div>

        <nav className="portalNavigation">
          {permissions.map((permission) => {
            const item = NAVIGATION[permission];

            if (!item) {
              return null;
            }

            const [label, Icon] = item;

            return (
              <button
                key={permission}
                className={
                  page === permission
                    ? "portalNav active"
                    : "portalNav"
                }
                onClick={() => navigate(permission)}
              >
                <Icon size={18} />
                {label}
              </button>
            );
          })}
        </nav>

        <button className="portalLogout" onClick={onLogout}>
          <LogOut size={18} />
          Sign out
        </button>
      </aside>

      <main className="portalMain">
        <header className="portalHeader">
          <button
            className="portalMobileButton"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>

          <div>
            <span className="portalHeaderSmall">
              {user.role}
            </span>

            <strong>
              {school ? school.name : "EduLink Eswatini"}
            </strong>
          </div>

          <div className="portalUser">
            <div className="portalAvatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <span>{user.name}</span>
          </div>
        </header>

        <div className="portalContent">
          <PortalPage
            page={page}
            user={user}
            data={data}
            setData={setData}
            setPage={navigate}
          />
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   PORTAL ROUTER
   ========================================================= */

function PortalPage({
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
        <ParentSchoolDirectory
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

    case "staff":
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

    case "notifications":
      return (
        <Notifications
          user={user}
          data={data}
        />
      );

    case "children":
      return (
        <ParentChildren
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

    case "attendanceParent":
      return (
        <ParentAttendance
          user={user}
          data={data}
        />
      );

    case "marksParent":
      return (
        <ParentMarks
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

    case "reports":
      return (
        <Reports
          user={user}
          data={data}
        />
      );

    case "settings":
      return <SettingsPage />;

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

function Dashboard({ user, data, setPage }) {
  if (user.role === "System Admin") {
    const pending = data.pendingSchools.length;
    const registered = data.schools.length;

    return (
      <>
        <PageHeading
          eyebrow="SYSTEM ADMINISTRATION"
          title="Admin Dashboard"
          text="Monitor school registrations and keep the EduLink platform running smoothly."
        />

        <div className="metricGrid">
          <Metric
            icon={<School />}
            label="Registered Schools"
            value={registered}
          />

          <Metric
            icon={<Clock />}
            label="Pending Schools"
            value={pending}
          />

          <Metric
            icon={<CheckCircle />}
            label="Approved Schools"
            value={
              data.schools.filter(
                (school) => school.status === "APPROVED"
              ).length
            }
          />
        </div>

        <Panel title="School registration control">
          <p className="panelDescription">
            When a school registers, it appears here for verification.
            The System Admin checks whether the school exists and
            whether the submitted information is truthful before
            approving or rejecting it.
          </p>

          <button
            className="primaryButton"
            onClick={() => setPage("schools")}
          >
            Open School Management
          </button>
        </Panel>
      </>
    );
  }

  if (user.role === "Parent") {
    const children = data.students.filter(
      (student) =>
        student.parentEmail === user.email &&
        student.schoolId &&
        data.schools.some(
          (school) => school.id === student.schoolId
        )
    );

    return (
      <>
        <PageHeading
          eyebrow="PARENT PORTAL"
          title="Welcome back"
          text="View information belonging only to your children."
        />

        <div className="metricGrid">
          <Metric
            icon={<Users />}
            label="My Children"
            value={children.length}
          />

          <Metric
            icon={<CalendarCheck />}
            label="Average Attendance"
            value={
              children.length
                ? `${Math.round(
                    children.reduce(
                      (sum, child) =>
                        sum + Number(child.attendance || 0),
                      0
                    ) / children.length
                  )}%`
                : "—"
            }
          />

          <Metric
            icon={<BookOpen />}
            label="Children with Records"
            value={
              children.filter(
                (child) =>
                  Object.keys(child.subjects || {}).length > 0
              ).length
            }
          />
        </div>

        <Panel title="Parent access">
          <div className="quickActions">
            <QuickAction
              icon={<School />}
              title="Find a School"
              text="Search schools and available spaces."
              onClick={() => setPage("schools")}
            />

            <QuickAction
              icon={<FileText />}
              title="Applications"
              text="Submit and monitor school applications."
              onClick={() => setPage("applications")}
            />

            <QuickAction
              icon={<BookOpen />}
              title="Performance"
              text="View your children's academic records."
              onClick={() => setPage("marks")}
            />
          </div>
        </Panel>
      </>
    );
  }

  const schoolStudents = data.students.filter(
    (student) => student.schoolId === user.schoolId
  );

  const pendingApplications = data.applications.filter(
    (application) =>
      application.schoolId === user.schoolId &&
      application.status === "PENDING"
  );

  if (
    user.role === "Principal" ||
    user.role === "Deputy Principal"
  ) {
    return (
      <>
        <PageHeading
          eyebrow={user.role.toUpperCase()}
          title="School Dashboard"
          text="Manage the school according to your leadership responsibilities."
        />

        <div className="metricGrid">
          <Metric
            icon={<Users />}
            label="Students"
            value={schoolStudents.length}
          />

          <Metric
            icon={<FileText />}
            label="Pending Applications"
            value={pendingApplications.length}
          />

          <Metric
            icon={<GraduationCap />}
            label="Staff"
            value={
              data.schools.find(
                (school) => school.id === user.schoolId
              )?.staff.length || 0
            }
          />

          <Metric
            icon={<School />}
            label="Available Spaces"
            value={totalSpaces(
              data.schools.find(
                (school) => school.id === user.schoolId
              )?.spaces
            )}
          />
        </div>

        <Panel title="School management">
          <div className="quickActions">
            <QuickAction
              icon={<FileText />}
              title="Applications"
              text="Approve, decline or wait-list applications."
              onClick={() => setPage("admissions")}
            />

            <QuickAction
              icon={<Users />}
              title="Students"
              text="View the complete student register."
              onClick={() => setPage("students")}
            />

            <QuickAction
              icon={<GraduationCap />}
              title="Staff"
              text="Add or remove school staff."
              onClick={() => setPage("staff")}
            />

            <QuickAction
              icon={<BookOpen />}
              title="Marks"
              text="View academic marks in table format."
              onClick={() => setPage("marks")}
            />
          </div>
        </Panel>
      </>
    );
  }

  if (user.role === "Teacher") {
    const assigned = schoolStudents.filter(
      (student) =>
        user.grades.includes(student.form)
    );

    return (
      <>
        <PageHeading
          eyebrow="TEACHER PORTAL"
          title="Teacher Dashboard"
          text="Work with students and subjects assigned to you."
        />

        <div className="metricGrid">
          <Metric
            icon={<Users />}
            label="Assigned Students"
            value={assigned.length}
          />

          <Metric
            icon={<BookOpen />}
            label="Subjects"
            value={user.subjects.length}
          />

          <Metric
            icon={<GraduationCap />}
            label="Grades"
            value={user.grades.length}
          />
        </div>

        <Panel title="Teacher permissions">
          <p className="panelDescription">
            You can enter marks and comments only for subjects and
            grades assigned to your account. You cannot access
            applications or school fee management.
          </p>
        </Panel>
      </>
    );
  }

  if (user.role === "Accountant") {
    const payments = data.payments.filter((payment) =>
      data.students.some(
        (student) =>
          student.id === payment.studentId &&
          student.schoolId === user.schoolId
      )
    );

    const totalPaid = payments.reduce(
      (sum, payment) =>
        payment.status === "APPROVED"
          ? sum + Number(payment.amount || 0)
          : sum,
      0
    );

    return (
      <>
        <PageHeading
          eyebrow="ACCOUNTING"
          title="Finance Dashboard"
          text="Manage student fee accounts and receipt verification."
        />

        <div className="metricGrid">
          <Metric
            icon={<Users />}
            label="Student Accounts"
            value={
              data.students.filter(
                (student) =>
                  student.schoolId === user.schoolId
              ).length
            }
          />

          <Metric
            icon={<Wallet />}
            label="Approved Payments"
            value={`E${totalPaid.toLocaleString()}`}
          />

          <Metric
            icon={<Clock />}
            label="Receipts Pending"
            value={
              payments.filter(
                (payment) =>
                  payment.status === "PENDING"
              ).length
            }
          />
        </div>

        <Panel title="Finance access">
          <p className="panelDescription">
            Academic performance information is not available in
            the accountant portal.
          </p>
        </Panel>
      </>
    );
  }

  if (user.role === "Secretary") {
    return (
      <>
        <PageHeading
          eyebrow="SECRETARY PORTAL"
          title="Secretary Dashboard"
          text="Stay up to date with school communication and calendar events."
        />

        <div className="metricGrid">
          <Metric
            icon={<Bell />}
            label="Notifications"
            value={data.notifications.length}
          />

          <Metric
            icon={<CalendarDays />}
            label="Calendar Events"
            value={data.calendar.length}
          />
        </div>

        <Panel title="Secretary access">
          <p className="panelDescription">
            Your portal focuses on school notifications and the
            school calendar.
          </p>
        </Panel>
      </>
    );
  }

  return null;
}

/* =========================================================
   PARENT SCHOOL DIRECTORY
   ========================================================= */

function ParentSchoolDirectory({ user, data, setPage }) {
  const [query, setQuery] = useState("");

  const schools = data.schools.filter((school) => {
    const text =
      `${school.name} ${school.centre} ${school.location}`.toLowerCase();

    return (
      school.status === "APPROVED" &&
      text.includes(query.toLowerCase())
    );
  });

  return (
    <>
      <PageHeading
        eyebrow="SCHOOL DIRECTORY"
        title="Find a School"
        text="You are already logged in. There is no second parent login when applying."
      />

      <div className="searchField portalSearch">
        <Search size={18} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search school, Centre Number or location"
        />
      </div>

      <div className="portalSchoolGrid">
        {schools.map((school) => (
          <div className="portalSchoolCard" key={school.id}>
            <div className="schoolCardIcon">
              <School />
            </div>

            <h3>{school.name}</h3>

            <p>
              Centre {school.centre} · {school.location}
            </p>

            <div className="schoolSpace">
              <strong>
                {totalSpaces(school.spaces)}
              </strong>
              <span>available spaces</span>
            </div>

            <button
              className="primaryButton smallButton"
              onClick={() => setPage("applications")}
            >
              Apply to this school
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================================================
   APPLICATIONS - SCHOOL SIDE
   ========================================================= */

function Admissions({ user, data, setData }) {
  const applications = data.applications.filter(
    (application) =>
      application.schoolId === user.schoolId
  );

  function decide(application, status) {
    if (
      status === "APPROVED" &&
      application.status !== "APPROVED"
    ) {
      const school = data.schools.find(
        (item) => item.id === user.schoolId
      );

      const available = school
        ? Number(school.spaces?.[application.form] || 0)
        : 0;

      if (available <= 0) {
        window.alert(
          "There is no available space for this grade/form."
        );
        return;
      }

      const updatedStudents = [
        ...data.students,
        {
          id: `ST-${Date.now()}`,
          name: application.childName,
          form: application.form,
          schoolId: application.schoolId,
          parentEmail: application.parentEmail,
          attendance: 0,
          subjects: {}
        }
      ];

      const updatedSchools = data.schools.map(
        (item) => {
          if (item.id !== user.schoolId) {
            return item;
          }

          return {
            ...item,
            spaces: {
              ...item.spaces,
              [application.form]: Math.max(
                0,
                available - 1
              )
            }
          };
        }
      );

      const updatedApplications =
        data.applications.map((item) => {
          if (item.id !== application.id) {
            return item;
          }

          return {
            ...item,
            status
          };
        });

      setData({
        ...data,
        students: updatedStudents,
        schools: updatedSchools,
        applications: updatedApplications,
        notifications: [
          ...data.notifications,
          {
            id: `N-${Date.now()}`,
            title: "Application approved",
            body: `${application.childName} has been accepted by the school.`,
            audience: application.parentEmail,
            date: new Date().toISOString().slice(0, 10)
          }
        ]
      });

      return;
    }

    setData({
      ...data,
      applications: data.applications.map((item) => {
        if (item.id !== application.id) {
          return item;
        }

        return {
          ...item,
          status
        };
      })
    });
  }

  return (
    <>
      <PageHeading
        eyebrow="ADMISSIONS"
        title="School Applications"
        text="Review parent applications and approve, decline or wait-list them."
      />

      <Panel title="Applications received">
        {applications.length === 0 ? (
          <EmptyState
            icon={<FileText />}
            title="No applications yet"
            text="When a parent applies to this school, the application will appear here."
          />
        ) : (
          <DataTable
            headers={[
              "Applicant",
              "Child",
              "Form",
              "Documents",
              "Status",
              "Actions"
            ]}
          >
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.parentName}</td>
                <td>{application.childName}</td>
                <td>{application.form}</td>
                <td>
                  <button
                    className="tableButton"
                    onClick={() =>
                      window.alert(
                        (application.documents || [])
                          .map((document) => document.name)
                          .join("\n") ||
                          "No documents submitted."
                      )
                    }
                  >
                    <Eye size={14} />
                    View
                  </button>
                </td>
                <td>
                  <StatusBadge
                    status={application.status}
                  />
                </td>
                <td>
                  <div className="actionGroup">
                    <button
                      className="tableButton successButton"
                      onClick={() =>
                        decide(application, "APPROVED")
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="tableButton"
                      onClick={() =>
                        decide(application, "WAITLIST")
                      }
                    >
                      Wait-list
                    </button>

                    <button
                      className="tableButton dangerButton"
                      onClick={() =>
                        decide(application, "DECLINED")
                      }
                    >
                      Decline
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </Panel>
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
  const [showForm, setShowForm] = useState(false);

  const applications = data.applications.filter(
    (application) =>
      application.parentEmail === user.email
  );

  return (
    <>
      <PageHeading
        eyebrow="PARENT PORTAL"
        title="My Applications"
        text="Submit applications to schools and monitor their status."
        action={
          <button
            className="primaryButton"
            onClick={() => setShowForm(true)}
          >
            <Plus size={17} />
            New Application
          </button>
        }
      />

      <Panel title="Application history">
        {applications.length === 0 ? (
          <EmptyState
            icon={<FileText />}
            title="No applications"
            text="Choose a school and submit an application."
          />
        ) : (
          <DataTable
            headers={[
              "School",
              "Child",
              "Form",
              "Documents",
              "Status"
            ]}
          >
            {applications.map((application) => (
              <tr key={application.id}>
                <td>
                  {schoolName(
                    data,
                    application.schoolId
                  )}
                </td>

                <td>{application.childName}</td>

                <td>{application.form}</td>

                <td>
                  {(application.documents || []).length}
                </td>

                <td>
                  <StatusBadge
                    status={application.status}
                  />
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </Panel>

      {showForm && (
        <ParentApplicationModal
          user={user}
          data={data}
          setData={setData}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
}

/* =========================================================
   PARENT APPLICATION FORM
   ========================================================= */

function ParentApplicationModal({
  user,
  data,
  setData,
  onClose
}) {
  const approvedSchools = data.schools.filter(
    (school) =>
      school.status === "APPROVED" &&
      school.admission === "OPEN"
  );

  const [schoolId, setSchoolId] = useState(
    approvedSchools[0]?.id || ""
  );

  const [childName, setChildName] = useState("");
  const [form, setForm] = useState("Form 1");
  const [documents, setDocuments] = useState([]);

  function submit(event) {
    event.preventDefault();

    if (
      !schoolId ||
      !childName.trim() ||
      !form
    ) {
      return;
    }

    const application = {
      id: `APP-${Date.now()}`,
      parentEmail: user.email,
      parentName: user.name,
      childName: childName.trim(),
      form,
      schoolId,
      status: "PENDING",
      documents,
      submittedAt: new Date().toISOString()
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
          title: "New application submitted",
          body: `${user.name} submitted an application for ${childName.trim()}.`,
          audience: "school",
          schoolId,
          date: new Date().toISOString().slice(0, 10)
        }
      ]
    });

    onClose();
  }

  function handleDocuments(event) {
    const files = Array.from(event.target.files || []);

    setDocuments(
      files.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size
      }))
    );
  }

  const selectedSchool = approvedSchools.find(
    (school) => school.id === schoolId
  );

  const availableGrades = selectedSchool
    ? Object.keys(selectedSchool.spaces || {})
    : ["Form 1"];

  return (
    <Modal title="Apply to a School" onClose={onClose}>
      <form onSubmit={submit}>
        <div className="applicationNotice">
          <ShieldCheck size={19} />
          Applications can only be submitted by the logged-in
          parent.
        </div>

        <label className="formLabel">
          Desired school*
          <select
            value={schoolId}
            onChange={(event) =>
              setSchoolId(event.target.value)
            }
            required
          >
            {approvedSchools.map((school) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </select>
        </label>

        <label className="formLabel">
          Child's full name*
          <input
            value={childName}
            onChange={(event) =>
              setChildName(event.target.value)
            }
            required
          />
        </label>

        <label className="formLabel">
          Grade / Form*
          <select
            value={form}
            onChange={(event) =>
              setForm(event.target.value)
            }
          >
            {availableGrades.map((grade) => (
              <option key={grade}>{grade}</option>
            ))}
          </select>
        </label>

        <div className="uploadArea">
          <Upload size={25} />
          <strong>Required application documents</strong>
          <span>
            Upload transcript, results and other required documents.
          </span>

          <label className="uploadButton">
            Choose documents
            <input
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
              onChange={handleDocuments}
            />
          </label>

          {documents.length > 0 && (
            <div className="uploadedFiles">
              {documents.map((document) => (
                <div key={document.name}>
                  <FileText size={15} />
                  {document.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className="primaryButton fullButton"
          type="submit"
        >
          Submit Application
        </button>
      </form>
    </Modal>
  );
}

/* =========================================================
   STUDENTS
   ========================================================= */

function Students({ user, data }) {
  const students = data.students
    .filter(
      (student) =>
        student.schoolId === user.schoolId
    )
    .sort((a, b) =>
      a.form.localeCompare(b.form)
    );

  return (
    <>
      <PageHeading
        eyebrow="STUDENT REGISTER"
        title="All Students"
        text="Students are displayed by Grade/Form, attendance and average performance."
      />

      <Panel title="Student register">
        <DataTable
          headers={[
            "Grade / Form",
            "Student",
            "Attendance",
            "Average",
            "Status"
          ]}
        >
          {students.map((student) => (
            <tr key={student.id}>
              <td>
                <strong>{student.form}</strong>
              </td>

              <td>{student.name}</td>

              <td>{student.attendance}%</td>

              <td>{averageStudent(student)}%</td>

              <td>
                {averageStudent(student) >= 50 ? (
                  <span className="goodText">
                    On track
                  </span>
                ) : (
                  <span className="warningText">
                    Attention
                  </span>
                )}
              </td>
            </tr>
          ))}
        </DataTable>
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
  const school = data.schools.find(
    (item) => item.id === user.schoolId
  );

  const [showAdd, setShowAdd] = useState(false);

  function removeStaff(staffId) {
    if (
      !window.confirm(
        "Remove this staff member from the school?"
      )
    ) {
      return;
    }

    setData({
      ...data,
      schools: data.schools.map((item) => {
        if (item.id !== user.schoolId) {
          return item;
        }

        return {
          ...item,
          staff: item.staff.filter(
            (member) => member.id !== staffId
          )
        };
      })
    });
  }

  if (!school) {
    return (
      <EmptyState
        title="School not found"
        text="No school is assigned to this account."
      />
    );
  }

  return (
    <>
      <PageHeading
        eyebrow="STAFF MANAGEMENT"
        title="School Staff"
        text="Principal and Deputy Principal can add or remove staff members when staff change schools."
        action={
          roleCanManageStaff(user.role) ? (
            <button
              className="primaryButton"
              onClick={() => setShowAdd(true)}
            >
              <UserPlus size={17} />
              Add Staff
            </button>
          ) : null
        }
      />

      <Panel title={`${school.name} — Staff`}>
        <DataTable
          headers={[
            "Name",
            "Role",
            "Subjects",
            "Grades",
            "Action"
          ]}
        >
          {school.staff.map((member) => (
            <tr key={member.id}>
              <td>
                <strong>{member.name}</strong>
              </td>

              <td>{member.role}</td>

              <td>
                {member.subjects?.join(", ") || "—"}
              </td>

              <td>
                {member.grades?.join(", ") || "—"}
              </td>

              <td>
                {roleCanManageStaff(user.role) &&
                member.email !== user.email ? (
                  <button
                    className="tableButton dangerButton"
                    onClick={() =>
                      removeStaff(member.id)
                    }
                  >
                    <UserMinus size={14} />
                    Remove
                  </button>
                ) : (
                  <span className="muted">—</span>
                )}
              </td>
            </tr>
          ))}
        </DataTable>
      </Panel>

      {showAdd && (
        <AddStaffModal
          user={user}
          data={data}
          setData={setData}
          onClose={() => setShowAdd(false)}
        />
      )}
    </>
  );
}

/* =========================================================
   ADD STAFF
   ========================================================= */

function AddStaffModal({
  user,
  data,
  setData,
  onClose
}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Teacher");
  const [email, setEmail] = useState("");
  const [subjects, setSubjects] = useState("");
  const [grades, setGrades] = useState("");

  function submit(event) {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    const member = {
      id: `STAFF-${Date.now()}`,
      name: name.trim(),
      role,
      email: email.trim(),
      subjects: subjects
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      grades: grades
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    };

    setData({
      ...data,
      schools: data.schools.map((school) => {
        if (school.id !== user.schoolId) {
          return school;
        }

        return {
          ...school,
          staff: [
            ...school.staff,
            member
          ]
        };
      })
    });

    onClose();
  }

  return (
    <Modal title="Add School Staff" onClose={onClose}>
      <form onSubmit={submit}>
        <label className="formLabel">
          Staff full name*
          <input
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            required
          />
        </label>

        <label className="formLabel">
          Role
          <select
            value={role}
            onChange={(event) =>
              setRole(event.target.value)
            }
          >
            <option>Teacher</option>
            <option>Principal</option>
            <option>Deputy Principal</option>
            <option>Accountant</option>
            <option>Secretary</option>
          </select>
        </label>

        <label className="formLabel">
          Email
          <input
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            type="email"
          />
        </label>

        {role === "Teacher" && (
          <>
            <label className="formLabel">
              Subjects taught
              <input
                value={subjects}
                onChange={(event) =>
                  setSubjects(event.target.value)
                }
                placeholder="Mathematics, English"
              />
            </label>

            <label className="formLabel">
              Grades / Forms taught
              <input
                value={grades}
                onChange={(event) =>
                  setGrades(event.target.value)
                }
                placeholder="Form 1, Form 2"
              />
            </label>
          </>
        )}

        <button
          className="primaryButton fullButton"
          type="submit"
        >
          Add Staff Member
        </button>
      </form>
    </Modal>
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
  const isTeacher = user.role === "Teacher";

  let students = data.students.filter(
    (student) =>
      student.schoolId === user.schoolId
  );

  if (isTeacher) {
    students = students.filter(
      (student) =>
        user.grades.includes(student.form)
    );
  }

  function updateAttendance(studentId, value) {
    const numeric = Math.max(
      0,
      Math.min(100, Number(value || 0))
    );

    setData({
      ...data,
      students: data.students.map((student) => {
        if (student.id !== studentId) {
          return student;
        }

        return {
          ...student,
          attendance: numeric
        };
      })
    });
  }

  return (
    <>
      <PageHeading
        eyebrow="ATTENDANCE"
        title={
          isTeacher
            ? "Assigned Students"
            : "School Attendance"
        }
        text={
          isTeacher
            ? "Attendance for students in your assigned grades."
            : "View and manage attendance records."
        }
      />

      <Panel title="Attendance register">
        <DataTable
          headers={[
            "Grade / Form",
            "Student",
            "Attendance",
            "Update"
          ]}
        >
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.form}</td>
              <td>{student.name}</td>
              <td>
                <strong>
                  {student.attendance}%
                </strong>
              </td>
              <td>
                {user.role === "Teacher" ||
                user.role === "Principal" ||
                user.role === "Deputy Principal" ? (
                  <input
                    className="tableInput"
                    type="number"
                    min="0"
                    max="100"
                    value={student.attendance}
                    onChange={(event) =>
                      updateAttendance(
                        student.id,
                        event.target.value
                      )
                    }
                  />
                ) : (
                  "View only"
                )}
              </td>
            </tr>
          ))}
        </DataTable>
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
  const schoolStudents = data.students.filter(
    (student) =>
      student.schoolId === user.schoolId
  );

  const teacher = user.role === "Teacher";

  const students = teacher
    ? schoolStudents.filter((student) =>
        user.grades.includes(student.form)
      )
    : schoolStudents;

  const subjects = teacher
    ? user.subjects
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
    const numeric =
      value === ""
        ? ""
        : Math.max(
            0,
            Math.min(100, Number(value))
          );

    setData({
      ...data,
      students: data.students.map((student) => {
        if (student.id !== studentId) {
          return student;
        }

        const currentSubject =
          student.subjects?.[subject] || {
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
              [field]: numeric
            }
          }
        };
      })
    });
  }

  function updateComment(
    studentId,
    subject,
    comment
  ) {
    setData({
      ...data,
      students: data.students.map((student) => {
        if (student.id !== studentId) {
          return student;
        }

        const currentSubject =
          student.subjects?.[subject] || {
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
      })
    });
  }

  return (
    <>
      <PageHeading
        eyebrow="ACADEMIC PERFORMANCE"
        title="Marks & Performance"
        text={
          teacher
            ? "You can enter marks and comments only for the subjects and grades assigned to you."
            : "View student marks in a structured academic table."
        }
      />

      <Panel title="Student marks">
        <div className="marksScroll">
          <table className="dataTable marksTable">
            <thead>
              <tr>
                <th>Form</th>
                <th>Name</th>

                {subjects.map((subject) => (
                  <th key={subject}>
                    {subject}
                  </th>
                ))}

                <th>Aggregate</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.form}</td>

                  <td>
                    <strong>
                      {student.name}
                    </strong>
                  </td>

                  {subjects.map((subject) => {
                    const record =
                      student.subjects?.[subject] || {};

                    return (
                      <td key={subject}>
                        <div className="markCell">
                          <input
                            className="markInput"
                            type="number"
                            min="0"
                            max="100"
                            placeholder="Test"
                            value={
                              record.test ?? ""
                            }
                            disabled={!teacher}
                            onChange={(event) =>
                              updateMark(
                                student.id,
                                subject,
                                "test",
                                event.target.value
                              )
                            }
                          />

                          <input
                            className="markInput"
                            type="number"
                            min="0"
                            max="100"
                            placeholder="Exam"
                            value={
                              record.exam ?? ""
                            }
                            disabled={!teacher}
                            onChange={(event) =>
                              updateMark(
                                student.id,
                                subject,
                                "exam",
                                event.target.value
                              )
                            }
                          />

                          {teacher && (
                            <input
                              className="commentInput"
                              placeholder="Comment"
                              value={
                                record.comment || ""
                              }
                              onChange={(event) =>
                                updateComment(
                                  student.id,
                                  subject,
                                  event.target.value
                                )
                              }
                            />
                          )}
                        </div>
                      </td>
                    );
                  })}

                  <td>
                    <strong>
                      {aggregateStudent(student)}
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
  const students = data.students.filter(
    (student) =>
      student.schoolId === user.schoolId
  );

  const payments = data.payments.filter(
    (payment) =>
      students.some(
        (student) =>
          student.id === payment.studentId
      )
  );

  function approveReceipt(paymentId) {
    setData({
      ...data,
      payments: data.payments.map((payment) => {
        if (payment.id !== paymentId) {
          return payment;
        }

        return {
          ...payment,
          status: "APPROVED"
        };
      })
    });
  }

  return (
    <>
      <PageHeading
        eyebrow="FINANCE"
        title="Student Fee Accounts"
        text="The accountant can see how much each student has paid and what remains outstanding."
      />

      <Panel title="Fee table">
        <DataTable
          headers={[
            "Form",
            "Student",
            "School Fees",
            "Paid",
            "Balance",
            "Receipt"
          ]}
        >
          {students.map((student) => {
            const studentPayments =
              payments.filter(
                (payment) =>
                  payment.studentId ===
                  student.id
              );

            const paid =
              studentPayments
                .filter(
                  (payment) =>
                    payment.status === "APPROVED"
                )
                .reduce(
                  (sum, payment) =>
                    sum +
                    Number(
                      payment.amount || 0
                    ),
                  0
                );

            const school = data.schools.find(
              (item) =>
                item.id === user.schoolId
            );

            const fee = Number(
              school?.fees || 0
            );

            const balance = Math.max(
              0,
              fee - paid
            );

            return (
              <tr key={student.id}>
                <td>{student.form}</td>
                <td>{student.name}</td>
                <td>
                  E{fee.toLocaleString()}
                </td>
                <td>
                  E{paid.toLocaleString()}
                </td>
                <td>
                  <strong>
                    E{balance.toLocaleString()}
                  </strong>
                </td>
                <td>
                  {studentPayments.some(
                    (payment) =>
                      payment.status ===
                      "PENDING"
                  ) ? (
                    <button
                      className="tableButton successButton"
                      onClick={() => {
                        const pending =
                          studentPayments.find(
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
                      <CheckCircle size={14} />
                      Approve Receipt
                    </button>
                  ) : (
                    <span className="goodText">
                      Verified
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </DataTable>
      </Panel>
    </>
  );
}

/* =========================================================
   PARENT FEES
   ========================================================= */

function ParentFees({ user, data }) {
  const children = data.students.filter(
    (student) =>
      student.parentEmail === user.email
  );

  return (
    <>
      <PageHeading
        eyebrow="PARENT PORTAL"
        title="School Fees"
        text="View fee information belonging only to your children."
      />

      <div className="childCards">
        {children.map((child) => {
          const school = data.schools.find(
            (item) =>
              item.id === child.schoolId
          );

          const paid = data.payments
            .filter(
              (payment) =>
                payment.studentId === child.id &&
                payment.status === "APPROVED"
            )
            .reduce(
              (sum, payment) =>
                sum + Number(payment.amount || 0),
              0
            );

          const fee = Number(
            school?.fees || 0
          );

          return (
            <div className="childCard" key={child.id}>
              <div className="childCardHeader">
                <div className="avatar">
                  {child.name.charAt(0)}
                </div>

                <div>
                  <strong>{child.name}</strong>
                  <span>{child.form}</span>
                </div>
              </div>

              <div className="feeRows">
                <div>
                  <span>School fees</span>
                  <strong>
                    E{fee.toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>Paid</span>
                  <strong>
                    E{paid.toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>Balance</span>
                  <strong>
                    E
                    {Math.max(
                      0,
                      fee - paid
                    ).toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* =========================================================
   PARENT CHILDREN
   ========================================================= */

function ParentChildren({ user, data }) {
  const children = data.students.filter(
    (student) =>
      student.parentEmail === user.email
  );

  return (
    <>
      <PageHeading
        eyebrow="MY CHILDREN"
        title="My Children"
        text="Only children connected to your parent account are displayed."
      />

      <div className="childCards">
        {children.map((child) => (
          <div className="childCard" key={child.id}>
            <div className="childCardHeader">
              <div className="avatar">
                {child.name.charAt(0)}
              </div>

              <div>
                <strong>{child.name}</strong>
                <span>{child.form}</span>
              </div>
            </div>

            <div className="childStats">
              <div>
                <strong>
                  {child.attendance}%
                </strong>
                <span>Attendance</span>
              </div>

              <div>
                <strong>
                  {averageStudent(child)}%
                </strong>
                <span>Average</span>
              </div>
            </div>

            <p>
              {schoolName(
                data,
                child.schoolId
              )}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================================================
   PARENT ATTENDANCE
   ========================================================= */

function ParentAttendance({ user, data }) {
  const children = data.students.filter(
    (student) =>
      student.parentEmail === user.email
  );

  return (
    <>
      <PageHeading
        eyebrow="MY CHILDREN"
        title="Children's Attendance"
        text="You can only see the attendance records of your own children."
      />

      <div className="childCards">
        {children.map((child) => (
          <div className="childCard" key={child.id}>
            <div className="childCardHeader">
              <div className="avatar">
                {child.name.charAt(0)}
              </div>

              <div>
                <strong>{child.name}</strong>
                <span>{child.form}</span>
              </div>
            </div>

            <div className="attendanceLarge">
              <strong>{child.attendance}%</strong>
              <span>Attendance rate</span>
            </div>

            <div className="progressTrack">
              <div
                className="progressFill"
                style={{
                  width: `${child.attendance}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================================================
   PARENT MARKS
   ========================================================= */

function ParentMarks({ user, data }) {
  const children = data.students.filter(
    (student) =>
      student.parentEmail === user.email
  );

  return (
    <>
      <PageHeading
        eyebrow="MY CHILDREN"
        title="Children's Performance"
        text="Only your children's academic records are visible here."
      />

      {children.map((child) => (
        <Panel
          key={child.id}
          title={`${child.name} — ${child.form}`}
        >
          <DataTable
            headers={[
              "Subject",
              "Test",
              "Exam",
              "Comment",
              "Average"
            ]}
          >
            {Object.entries(
              child.subjects || {}
            ).map(
              ([subject, record]) => (
                <tr key={subject}>
                  <td>
                    <strong>{subject}</strong>
                  </td>

                  <td>{record.test || 0}</td>
                  <td>{record.exam || 0}</td>
                  <td>
                    {record.comment || "—"}
                  </td>
                  <td>
                    {Math.round(
                      (Number(record.test || 0) +
                        Number(record.exam || 0)) /
                        2
                    )}
                    %
                  </td>
                </tr>
              )
            )}
          </DataTable>
        </Panel>
      ))}
    </>
  );
}

/* =========================================================
   SPACES
   ========================================================= */

function Spaces({ user, data }) {
  const school = data.schools.find(
    (item) => item.id === user.schoolId
  );

  if (!school) {
    return null;
  }

  return (
    <>
      <PageHeading
        eyebrow="ADMISSIONS"
        title="Available Spaces"
        text="Monitor available spaces by grade/form."
      />

      <Panel title={school.name}>
        <div className="spaceLargeGrid">
          {Object.entries(
            school.spaces || {}
          ).map(([grade, number]) => (
            <div key={grade} className="spaceLargeCard">
              <span>{grade}</span>
              <strong>{number}</strong>
              <small>spaces available</small>
            </div>
          ))}
        </div>
      </Panel>
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
  const canAdd =
    user.role === "Principal" ||
    user.role === "Deputy Principal" ||
    user.role === "Secretary";

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function addEvent(event) {
    event.preventDefault();

    if (!title || !date) {
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
          time,
          details: ""
        }
      ]
    });

    setTitle("");
    setDate("");
    setTime("");
  }

  return (
    <>
      <PageHeading
        eyebrow="SCHOOL CALENDAR"
        title="School Calendar"
        text="View important school events and dates."
      />

      {canAdd && (
        <Panel title="Add calendar event">
          <form
            className="calendarForm"
            onSubmit={addEvent}
          >
            <input
              placeholder="Event title"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
            />

            <input
              type="date"
              value={date}
              onChange={(event) =>
                setDate(event.target.value)
              }
            />

            <input
              type="time"
              value={time}
              onChange={(event) =>
                setTime(event.target.value)
              }
            />

            <button
              className="primaryButton"
              type="submit"
            >
              Add Event
            </button>
          </form>
        </Panel>
      )}

      <Panel title="Upcoming events">
        <div className="calendarList">
          {data.calendar.map((event) => (
            <div className="calendarItem" key={event.id}>
              <div className="calendarDate">
                <CalendarDays size={20} />
              </div>

              <div>
                <strong>{event.title}</strong>
                <span>
                  {event.date}
                  {event.time
                    ? ` · ${event.time}`
                    : ""}
                </span>
                {event.details && (
                  <p>{event.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function Notifications({ user, data }) {
  const notifications = data.notifications.filter(
    (notification) => {
      if (notification.audience === "all") {
        return true;
      }

      if (
        notification.audience === user.email
      ) {
        return true;
      }

      if (
        notification.audience === "school" &&
        user.schoolId === notification.schoolId
      ) {
        return true;
      }

      return false;
    }
  );

  return (
    <>
      <PageHeading
        eyebrow="COMMUNICATION"
        title="Notifications"
        text="Important school messages and updates."
      />

      <div className="notificationList">
        {notifications.map((notification) => (
          <div
            className="notificationCard"
            key={notification.id}
          >
            <div className="notificationIcon">
              <Bell size={19} />
            </div>

            <div>
              <strong>{notification.title}</strong>
              <p>{notification.body}</p>
              <small>{notification.date}</small>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================================================
   REPORTS
   ========================================================= */

function Reports({ user, data }) {
  const students = data.students.filter(
    (student) =>
      student.schoolId === user.schoolId
  );

  const average =
    students.length > 0
      ? Math.round(
          students.reduce(
            (sum, student) =>
              sum + averageStudent(student),
            0
          ) / students.length
        )
      : 0;

  return (
    <>
      <PageHeading
        eyebrow="REPORTING"
        title="School Reports"
        text="Academic and operational overview for school leadership."
      />

      <div className="metricGrid">
        <Metric
          icon={<Users />}
          label="Students"
          value={students.length}
        />

        <Metric
          icon={<BookOpen />}
          label="Average Academic Performance"
          value={`${average}%`}
        />

        <Metric
          icon={<CalendarCheck />}
          label="Average Attendance"
          value={
            students.length
              ? `${Math.round(
                  students.reduce(
                    (sum, student) =>
                      sum +
                      Number(
                        student.attendance || 0
                      ),
                    0
                  ) / students.length
                )}%`
              : "0%"
          }
        />
      </div>
    </>
  );
}

/* =========================================================
   SETTINGS
   ========================================================= */

function SettingsPage() {
  return (
    <>
      <PageHeading
        eyebrow="SYSTEM"
        title="Settings"
        text="EduLink system configuration."
      />

      <Panel title="Platform status">
        <div className="systemStatus">
          <CheckCircle size={22} />
          <div>
            <strong>EduLink is operational</strong>
            <span>
              This presentation prototype uses local browser
              storage to demonstrate connected workflows.
            </span>
          </div>
        </div>
      </Panel>
    </>
  );
}

/* =========================================================
   UI COMPONENTS
   ========================================================= */

function PageHeading({
  eyebrow,
  title,
  text,
  action
}) {
  return (
    <div className="pageHeading">
      <div>
        <div className="sectionLabel">{eyebrow}</div>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}

function Metric({ icon, label, value }) {
  return (
    <div className="metricCard">
      <div className="metricIcon">{icon}</div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  title,
  text,
  onClick
}) {
  return (
    <button
      className="quickAction"
      onClick={onClick}
    >
      <div className="quickActionIcon">
        {icon}
      </div>

      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>

      <ChevronRight size={18} />
    </button>
  );
}

function FeatureCard({
  icon,
  title,
  text
}) {
  return (
    <div className="featureCard">
      <div className="featureCardIcon">
        {icon}
      </div>

      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <section className="portalPanel">
      <div className="panelHeader">
        <h2>{title}</h2>
      </div>

      <div className="panelBody">
        {children}
      </div>
    </section>
  );
}

function DataTable({
  headers,
  children
}) {
  return (
    <div className="tableWrapper">
      <table className="dataTable">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }) {
  let className = "statusBadge";

  if (status === "APPROVED") {
    className += " approved";
  } else if (status === "DECLINED") {
    className += " declined";
  } else if (status === "WAITLIST") {
    className += " waitlist";
  } else {
    className += " pending";
  }

  return (
    <span className={className}>
      {status}
    </span>
  );
}

function EmptyState({
  icon,
  title,
  text
}) {
  return (
    <div className="emptyState">
      {icon && (
        <div className="emptyIcon">
          {icon}
        </div>
      )}

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
          <div>
            <div className="sectionLabel">
              EDULINK ESWATINI
            </div>

            <h2>{title}</h2>
          </div>

          <button
            className="modalClose"
            onClick={onClose}
          >
            <X />
          </button>
        </div>

        <div className="modalBody">
          {children}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOUNT
   ========================================================= */

const rootElement =
  document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "EduLink could not find the #root element. Check index.html."
  );
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
