import React,{useState} from "react";
import {createRoot} from "react-dom/client";
import {School,Search,ShieldCheck,Users,GraduationCap,Wallet,MessageSquare,Menu,X,ChevronRight,CheckCircle,Clock,AlertTriangle,Plus,LogOut,LayoutDashboard,BookOpen,CalendarCheck,Receipt,Settings,Boxes,FileText,Trash2,UserPlus,CalendarDays} from "lucide-react";
import "./styles.css";

const roles={
 "System Admin":["dashboard","schools","settings"],
 "Principal":["dashboard","admissions","students","teachers","attendance","marks","finance","spaces","resources","notifications","calendar","reports","settings"],
 "Deputy Principal":["dashboard","admissions","students","teachers","attendance","marks","finance","spaces","resources","notifications","calendar","reports"],
 "Teacher":["dashboard","students","attendance","marks","calendar"],
 "Accountant":["dashboard","finance"],
 "Secretary":["dashboard","notifications","calendar"],
 "Parent":["dashboard","schools","children","applications","attendance","marks","fees","notifications"]
};
const accounts={
 "parent@demo.sz":{role:"Parent",name:"Demo Parent"},
 "teacher@demo.sz":{role:"Teacher",name:"Mr. M. Nkosi"},
 "accountant@demo.sz":{role:"Accountant",name:"Ms. P. Mamba"},
 "secretary@demo.sz":{role:"Secretary",name:"Mrs. S. Hlophe"},
 "principal@demo.sz":{role:"Principal",name:"Dr. J. Dlamini"},
 "deputy@demo.sz":{role:"Deputy Principal",name:"Mr. B. Mamba"},
 "admin@demo.sz":{role:"System Admin",name:"EduLink Administrator"}
};
const schools=[
 {id:1,name:"Hermann Gmeiner High School",centre:"3333",location:"Manzini",type:"High School",fees:3000,status:"OPEN",spaces:{1:20,2:10,3:15,4:12,5:13}},
 {id:2,name:"Mbabane Valley Secondary School",centre:"4444",location:"Mbabane",type:"High School",fees:2800,status:"OPEN",spaces:{1:14,2:8,3:11,4:7,5:5}},
 {id:3,name:"Royal Hills Primary School",centre:"5555",location:"Lobamba",type:"Primary School",fees:2200,status:"OPEN",spaces:{1:12,2:10,3:9,4:8,5:10,6:7,7:6}}
];
const demoStudents=[
 {id:"ST-001",name:"Lwazi Mamba",form:"Form 1",avg:84,attendance:97,warning:false},
 {id:"ST-002",name:"Ayanda Hlophe",form:"Form 2",avg:72,attendance:94,warning:false},
 {id:"ST-003",name:"Sibusiso Dlamini",form:"Form 3",avg:61,attendance:87,warning:true}
];
const navMeta={
 dashboard:["Overview",LayoutDashboard],schools:["Find a School",School],admissions:["Admissions",FileText],students:["Students",Users],teachers:["Teachers",GraduationCap],attendance:["Attendance",CalendarCheck],marks:["Marks & Performance",BookOpen],finance:["Finance",Wallet],spaces:["Available Spaces",Boxes],resources:["Resources",Boxes],notifications:["Notifications",MessageSquare],calendar:["School Calendar",CalendarDays],children:["My Children",Users],applications:["My Applications",FileText],fees:["School Fees",Receipt],reports:["Reports",FileText],users:["Users",Users],settings:["Settings",Settings]
};

function App(){
 const [user,setUser]=useState(null);
 const [page,setPage]=useState("home");
 const [mobile,setMobile]=useState(false);
 const [school,setSchool]=useState(null);
 if(!user) return <Public setUser={setUser} page={page} setPage={setPage} setSchool={setSchool}/>;
 const allowed=roles[user.role]||[];
 return <div className="app">
  <aside className={"sidebar "+(mobile?"open":"")}>
   <div className="brand"><div className="brandIcon"><ShieldCheck size={22}/></div><div>EduLink <span>ESWATINI</span></div></div>
   <div className="roleBadge">{user.role}</div>
   <nav>{allowed.map(k=>{const [label,I]=navMeta[k];const displayLabel=k==="schools"&&user.role==="System Admin"?"School Management":label;return <button className={page===k?"navActive":""} onClick={()=>{setPage(k);setMobile(false)}} key={k}><I size={18}/>{displayLabel}</button>})}</nav>
   <button className="logout" onClick={()=>{setUser(null);setPage("home")}}><LogOut size={18}/>Sign out</button>
  </aside>
  <main className="main">
   <header className="topbar"><button className="mobileBtn" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button><div><strong>{navMeta[page]?.[0]||"Overview"}</strong></div><div className="profile"><div className="avatar">{user.name.split(" ").map(x=>x[0]).join("").slice(0,2)}</div><div><b>{user.name}</b><small>{user.role}</small></div></div></header>
   <div className="content"><Page page={page} user={user} setPage={setPage} school={school} setSchool={setSchool}/></div>
  </main>
 </div>
}

function Public({setUser,page,setPage,setSchool}){
 if(page==="login") return <Login setUser={setUser} setPage={setPage}/>;
 if(page==="register") return <RegisterSchool setPage={setPage}/>;
 if(page==="directory") return <Directory setPage={setPage} setSchool={setSchool}/>;
 return <Landing setPage={setPage}/>;
}
function Landing({setPage}){
 return <div className="landing">
  <header className="publicHeader"><div className="brand dark"><div className="brandIcon"><ShieldCheck/></div><div>EduLink <span>ESWATINI</span></div></div><nav><button onClick={()=>setPage("directory")}>Find a School</button><button onClick={()=>setPage("login")}>Login</button><button className="primary" onClick={()=>setPage("register")}>Register School</button></nav></header>
  <section className="hero"><div><div className="eyebrow">A DIGITAL SCHOOL PLATFORM FOR ESWATINI</div><h1>One platform for schools, parents and students.</h1><p>Find schools, check available spaces, apply online, monitor performance, manage fees and receive important school communications.</p><div className="heroActions"><button className="primary large" onClick={()=>setPage("directory")}>Find a School <ChevronRight size={18}/></button><button className="outline large" onClick={()=>setPage("login")}>Login</button></div></div><div className="preview"><div className="previewTop"><span>How EduLink Works</span><span className="dot"></span></div><div className="miniGrid">{[["Find","Schools"],["Check","Spaces"],["Apply","Online"],["Track","Progress"]].map(x=><div><small>{x[0]}</small><b>{x[1]}</b></div>)}</div><small>Secure role-based access for every user.</small></div></section>
  <section className="features">{[[School,"Find Schools","Search by school name, Centre Number or location."],[FileText,"Apply Online","Submit applications and track their status."],[GraduationCap,"Monitor Progress","See marks, attendance and performance warnings."],[Wallet,"Manage Fees","View balances, payment history and deadlines."],[MessageSquare,"Stay Connected","Receive announcements and important notices."],[ShieldCheck,"Privacy First","Role-based access keeps information protected."]].map(([I,t,d])=><div className="feature" key={t}><I/><h3>{t}</h3><p>{d}</p></div>)}</section>
  <footer>EduLink Eswatini · Prototype · Not affiliated with any government or education body.</footer>
 </div>
}
function DashboardPreview(){return <div className="preview"><div className="previewTop"><span>School Dashboard</span><span className="dot"></span></div><div className="miniGrid">{[["Students","1,248"],["Applications","86"],["Spaces","70"],["Fees","E48,500"]].map(x=><div><small>{x[0]}</small><b>{x[1]}</b></div>)}</div><div className="miniChart"><div style={{width:"73%"}}></div></div><small>Academic performance · 73%</small></div>}
function Login({setUser,setPage}){
 const [email,setEmail]=useState("parent@demo.sz");const [pw,setPw]=useState("demo123");const [error,setError]=useState("");
 return <div className="auth"><div className="authCard"><div className="brand dark"><div className="brandIcon"><ShieldCheck/></div><div>EduLink <span>ESWATINI</span></div></div><h1>Sign in</h1><p className="muted">Access your EduLink dashboard.</p><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/><input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Password"/>{error&&<div className="error">{error}</div>}<button className="primary full" onClick={()=>{if(accounts[email]&&pw==="demo123")setUser(accounts[email]);else setError("Use a demo account with password demo123.")}}>Login</button><button className="link" onClick={()=>setPage("home")}>← Back to home</button><div className="demoBox"><b>Demo accounts</b><br/>parent@demo.sz · teacher@demo.sz · accountant@demo.sz · principal@demo.sz · admin@demo.sz<br/><b>Password:</b> demo123</div></div></div>
}
function RegisterSchool({setPage}){
 const [schoolName,setSchoolName]=useState("");const [centre,setCentre]=useState("");const [location,setLocation]=useState("");const [type,setType]=useState("High School");const [phone,setPhone]=useState("");const [email,setEmail]=useState("");const [staff,setStaff]=useState([{name:"",role:"Principal",subjects:"",grades:""}]);
 const addStaff=()=>setStaff([...staff,{name:"",role:"Teacher",subjects:"",grades:""}]);
 const updateStaff=(i,k,v)=>setStaff(staff.map((x,n)=>n===i?{...x,[k]:v}:x));
 const submit=()=>{if(!schoolName||!centre||!location||!email||staff.some(x=>!x.name))return alert("Complete the school and staff information.");const record={id:Date.now(),name:schoolName,centre,location,type,phone,email,staff,approval:"PENDING",verification:"Pending admin verification"};localStorage.setItem("edulink_pending_school_"+record.id,JSON.stringify(record));alert("Registration submitted. The System Admin must verify that the school exists and that the information provided is true before approval.");setPage("home");};
 return <div className="auth"><div className="authCard wide"><div className="brand dark"><div className="brandIcon"><ShieldCheck/></div><div>EduLink <span>ESWATINI</span></div></div><h1>Register your school</h1><p className="muted">Registrations remain pending until the System Admin verifies that the school exists and the submitted information is truthful.</p><div className="formGrid"><input value={schoolName} onChange={e=>setSchoolName(e.target.value)} placeholder="School name"/><input value={centre} onChange={e=>setCentre(e.target.value)} placeholder="Centre Number"/><input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location"/><select value={type} onChange={e=>setType(e.target.value)}><option>High School</option><option>Primary School</option></select><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="School phone"/><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="School email"/></div><h3 style={{marginTop:18}}>School staff</h3>{staff.map((x,i)=><div className="formGrid" key={i}><input value={x.name} onChange={e=>updateStaff(i,"name",e.target.value)} placeholder="Staff full name"/><select value={x.role} onChange={e=>updateStaff(i,"role",e.target.value)}><option>Principal</option><option>Deputy Principal</option><option>Teacher</option><option>Accountant</option></select>{x.role==="Teacher"&&<><input value={x.subjects} onChange={e=>updateStaff(i,"subjects",e.target.value)} placeholder="Subjects taught"/><input value={x.grades} onChange={e=>updateStaff(i,"grades",e.target.value)} placeholder="Grades/Forms taught"/></>}</div>)}<button className="outline" onClick={addStaff}>+ Add staff member</button><button className="primary full" onClick={submit}>Submit registration for verification</button><button className="link" onClick={()=>setPage("home")}>← Back</button></div></div>
}
function Directory({setPage,setSchool}){
 const [q,setQ]=useState("");const list=schools.filter(s=>[s.name,s.centre,s.location].some(v=>v.toLowerCase().includes(q.toLowerCase())));
 return <div className="publicPage"><div className="publicHeader"><div className="brand dark"><div className="brandIcon"><ShieldCheck/></div><div>EduLink <span>ESWATINI</span></div></div><button className="link" onClick={()=>setPage("home")}>Home</button></div><div className="pageIntro"><div><div className="eyebrow">SCHOOL DIRECTORY</div><h1>Find a school</h1><p>Search participating demo schools by name, Centre Number or location.</p></div></div><div className="searchBox"><Search/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="School name, Centre Number or location"/></div><div className="schoolGrid">{list.map(s=><SchoolCard s={s} key={s.id} setSchool={setSchool} setPage={setPage}/>)}</div></div>
}
function SchoolCard({s,setSchool,setPage}){const total=Object.values(s.spaces).reduce((a,b)=>a+b,0);return <div className="schoolCard"><div className="schoolBadge"><School/></div><span className="status open">{s.status}</span><h3>{s.name}</h3><p className="muted">Centre Number <b>{s.centre}</b></p><p>{s.location} · {s.type}</p><div className="fee">E{s.fees.toLocaleString()} <small>school fees</small></div><div className="spaceLine"><b>{total}</b> spaces available</div><button className="outline full" onClick={()=>{setSchool(s);setPage("school")}}>View school</button></div>}
function Page({page,user,setPage,school,setSchool}){
 if(page==="schools")return user.role==="System Admin"?<AdminSchools/>:<Directory setPage={setPage} setSchool={setSchool}/>;
 if(page==="school")return <SchoolProfile s={school} setPage={setPage} user={user}/>;
 if(page==="admissions")return <Admissions user={user}/>;
 if(page==="applications")return user.role==="Parent"?<ParentApplications/>:<Admissions user={user}/>;
 if(page==="students"||page==="children")return <Students user={user}/>;
 if(page==="teachers")return <Teachers/>;
 if(page==="attendance")return <Attendance user={user}/>;
 if(page==="marks")return <Marks user={user}/>;
 if(page==="finance"||page==="fees")return <Finance user={user}/>;
 if(page==="spaces")return <Spaces/>;
 if(page==="resources")return <Resources/>;
 if(page==="notifications")return <Notifications user={user}/>;
 if(page==="calendar")return <SchoolCalendar user={user}/>;
 if(page==="reports")return <Reports/>;
 if(page==="users")return <UsersPage/>;
 if(page==="settings")return <SettingsPage/>;
 return <Dashboard user={user}/>;
}
function Head({title,sub,action}){return <div className="sectionHead"><div><h1>{title}</h1><p className="muted">{sub}</p></div>{action}</div>}
function Dashboard({user}){
 if(user.role==="System Admin") return <><Head title="Platform Administration" sub="Monitor EduLink platform operations and school registrations."/><div className="stats"><div className="statCard"><small>Registered Schools</small><b>42</b><span>Approved schools</span></div><div className="statCard"><small>Pending Schools</small><b>7</b><span>Awaiting verification</span></div><div className="statCard"><small>Platform Status</small><b>ONLINE</b><span>Smooth operation</span></div></div><div className="panel"><h3>School registration verification</h3><p className="muted">Check that each school exists and that the submitted Centre Number, school details and staff information are true before approving. False or unverifiable registrations must be rejected.</p></div></>;
 if(user.role==="Accountant") return <><Head title={`Good evening, ${user.name.split(" ")[0]}.`} sub="School finance overview."/><div className="stats">{[["Fees outstanding","E48,500","School total"],["Pending receipts","7","Awaiting verification"],["Verified today","E16,800","Payments"]].map(c=><div className="statCard" key={c[0]}><small>{c[0]}</small><b>{c[1]}</b><span>{c[2]}</span></div>)}</div><div className="panel"><h3>Finance only</h3><p className="muted">Academic performance, attendance and school notifications are not available to the accountant.</p></div></>;
 if(user.role==="Teacher") return <><Head title={`Good evening, ${user.name.split(" ")[0]}.`} sub="Teaching dashboard."/><div className="stats">{[["Students","All school students","Grouped by grade/form"],["Subjects","Assigned subjects","Marks entry restricted"],["Attendance","Register","Mark absences"],["Calendar","School calendar","Teaching schedule"]].map(c=><div className="statCard" key={c[0]}><small>{c[0]}</small><b>{c[1]}</b><span>{c[2]}</span></div>)}</div></>;
 if(user.role==="Secretary") return <><Head title={`Good evening, ${user.name.split(" ")[0]}.`} sub="School communications and calendar."/><div className="stats">{[["Notifications","Active","School notices"],["Calendar","School","Events and meetings"]].map(c=><div className="statCard" key={c[0]}><small>{c[0]}</small><b>{c[1]}</b><span>{c[2]}</span></div>)}</div></>;
 if(user.role==="Parent") return <><Head title={`Good evening, ${user.name.split(" ")[0]}.`} sub="Your children's EduLink overview."/><div className="stats">{[["Lwazi Mamba","80%","Attendance"],["Lwazi Mamba","78%","Average marks"],["Fees balance","E1,500","Linked child"],["Applications","1","Your applications"]].map(c=><div className="statCard" key={c[0]+c[2]}><small>{c[2]}</small><b>{c[0]}</b><span>{c[1]}</span></div>)}</div><div className="panel"><h3>Privacy</h3><p className="muted">You can only see information belonging to your linked child or children. School-wide registers and overall school academic rates are not available.</p></div></>;
 return <><Head title={`Good evening, ${user.name.split(" ")[0]}.`} sub="School leadership overview."/><div className="stats">{[["Students","1,248","Active students"],["Applications","86","12 pending review"],["Available spaces","70","Across classes"],["Fees outstanding","E48,500","School total"]].map(c=><div className="statCard" key={c[0]}><small>{c[0]}</small><b>{c[1]}</b><span>{c[2]}</span></div>)}</div><div className="twoCol"><div className="panel"><h3>Academic performance</h3><div className="bigNumber">73%</div><div className="progress"><i style={{width:"73%"}}/></div><p className="muted">Leadership-only school overview</p></div><div className="panel"><h3>Important notifications</h3><Notice title="Parent meeting" text="Tomorrow at 14:00" kind="warn"/><Notice title="Fee deadline" text="30 August 2026" kind="info"/><Notice title="Performance review" text="3 students flagged" kind="danger"/></div></div></>;
}
function Notice({title,text,kind}){return <div className="notice"><span className={"noticeIcon "+kind}>{kind==="danger"?<AlertTriangle/>:kind==="warn"?<Clock/>:<CheckCircle/>}</span><div><b>{title}</b><small>{text}</small></div></div>}
function SchoolProfile({s,setPage,user}){if(!s)return <div className="empty">Select a school from the directory.</div>;const total=Object.values(s.spaces).reduce((a,b)=>a+b,0);return <><button className="link" onClick={()=>setPage("schools")}>← School directory</button><div className="profileHero"><div className="schoolBadge large"><School/></div><div><span className="status open">{s.status}</span><h1>{s.name}</h1><p>Centre Number: <b>{s.centre}</b> · {s.location} · {s.type}</p></div></div><div className="stats"><div className="statCard"><small>School fees</small><b>E{s.fees.toLocaleString()}</b><span>Demo annual fee</span></div><div className="statCard"><small>Total available</small><b>{total}</b><span>Spaces</span></div></div><div className="panel"><h2>Available spaces</h2><div className="spaceGrid">{Object.entries(s.spaces).map(([g,n])=><div><b>{s.type==="Primary School"?"Grade":"Form"} {g}</b><strong>{n}</strong><small>{n===0?"FULL":"spaces available"}</small></div>)}</div><button className="primary" onClick={()=>setPage(user?.role==="Parent"?"applications":"login")}>Apply to this school</button></div></>}
function Admissions(){
 const [items,setItems]=useState([
  {id:"APP-1042",child:"Lwazi Mamba",school:"Hermann Gmeiner High School",grade:"Form 1",status:"PENDING"},
  {id:"APP-1039",child:"Ayanda Hlophe",school:"Hermann Gmeiner High School",grade:"Form 2",status:"APPROVED"},
  {id:"APP-1035",child:"Sibusiso Dlamini",school:"Hermann Gmeiner High School",grade:"Form 3",status:"WAITING LIST"}
 ]);
 const update=(id,status)=>setItems(items.map(x=>x.id===id?{...x,status}:x));
 return <><Head title="Admissions" sub="Review active school applications and approve, decline or wait-list them."/><div className="panel tableWrap"><table><thead><tr><th>Application</th><th>Child</th><th>School</th><th>Grade/Form</th><th>Status</th><th>Action</th></tr></thead><tbody>{items.map(r=><tr key={r.id}><td>{r.id}</td><td>{r.child}</td><td>{r.school}</td><td>{r.grade}</td><td><span className={"status "+r.status.toLowerCase().replace(" ","")}>{r.status}</span></td><td>{r.status==="PENDING"&&<><button className="tiny success" onClick={()=>update(r.id,"APPROVED")}>Approve</button> <button className="tiny danger" onClick={()=>update(r.id,"DECLINED")}>Decline</button> <button className="tiny" onClick={()=>update(r.id,"WAITING LIST")}>Wait list</button></>}</td></tr>)}</tbody></table></div></>
}

function ParentApplications(){
 const [school,setSchool]=useState(""); const [grade,setGrade]=useState("Form 1"); const [submitted,setSubmitted]=useState(false);
 return <><Head title="My Applications" sub="Apply to a desired participating school and track your application."/><div className="panel"><h3>New school application</h3><div className="formGrid"><select value={school} onChange={e=>setSchool(e.target.value)}><option value="">Select school</option>{schools.map(s=><option key={s.id}>{s.name}</option>)}</select><select value={grade} onChange={e=>setGrade(e.target.value)}><option>Form 1</option><option>Form 2</option><option>Form 3</option><option>Form 4</option><option>Form 5</option></select><input placeholder="Child full name"/><input type="date"/></div><button className="primary" onClick={()=>{if(!school)return alert("Select a school first.");setSubmitted(true)}}>Submit application</button></div>{submitted&&<div className="panel"><h3>Application submitted</h3><p><b>APP-DEMO-2026</b> · {school} · {grade}</p><span className="status pending">PENDING</span></div>}<div className="panel tableWrap"><h3>Application status</h3><table><thead><tr><th>Application</th><th>School</th><th>Grade/Form</th><th>Status</th></tr></thead><tbody><tr><td>APP-1042</td><td>Hermann Gmeiner High School</td><td>Form 1</td><td><span className="status pending">PENDING</span></td></tr></tbody></table></div></>
}
function Students({user}){
 const data=user.role==="Parent"?demoStudents.slice(0,2):demoStudents;
 const groups=[...new Set(data.map(s=>s.form))];
 return <><Head title={user.role==="Parent"?"My Children":"Students by Grade/Form"} sub={user.role==="Parent"?"Only your linked children are visible here.":"All demo students registered in the school, grouped by grade/form."}/>{groups.map(group=><section key={group} style={{marginBottom:20}}><h2 style={{margin:"0 0 10px"}}>{group}</h2><div className="studentGrid">{data.filter(s=>s.form===group).map(s=><div className="panel student" key={s.id}><div className="studentTop"><div className="avatar">{s.name.split(" ").map(x=>x[0]).join("")}</div><div><h3>{s.name}</h3><small>{s.form} · Demo record</small></div></div><div className="studentMetrics"><div><b>{s.avg}%</b><small>Average</small></div><div><b>{s.attendance}%</b><small>Attendance</small></div></div>{s.warning&&<div className="warning"><AlertTriangle size={16}/> Performance/attendance requires attention.</div>}<button className="outline full">View profile</button></div>)}</div></section>)}</>
}

function Teachers(){return <><Head title="Teachers" sub="Manage authorised teaching staff."/><div className="panel tableWrap"><table><thead><tr><th>Name</th><th>Department</th><th>Assigned classes</th><th>Status</th></tr></thead><tbody>{[["Mr. M. Nkosi","Mathematics","Form 1–3"],["Ms. N. Dlamini","English","Form 2–5"],["Mr. T. Mamba","Science","Form 1–4"]].map(x=><tr><td>{x[0]}</td><td>{x[1]}</td><td>{x[2]}</td><td><span className="status open">ACTIVE</span></td></tr>)}</tbody></table></div></>}
function Attendance({user}){
 if(user.role==="Parent") return <><Head title="My Children's Attendance" sub="Only attendance rates for your linked children are visible."/><div className="panel tableWrap"><table><thead><tr><th>Child</th><th>Grade/Form</th><th>Present</th><th>Absent</th><th>Attendance Rate</th></tr></thead><tbody><tr><td>Lwazi Mamba</td><td>Form 1</td><td>40</td><td>10</td><td><b>80%</b></td></tr><tr><td>Ayanda Mamba</td><td>Form 3</td><td>47</td><td>3</td><td><b>94%</b></td></tr></tbody></table></div></>;
 return <><Head title="Attendance" sub="Teachers mark absences; students not marked absent are treated as present."/><div className="stats">{[["Today's attendance","94.9%","School register"],["Absent","64","Students"],["Present","1,184","Students"],["Warnings","12","Below threshold"]].map(c=><div className="statCard" key={c[0]}><small>{c[0]}</small><b>{c[1]}</b><span>{c[2]}</span></div>)}</div><div className="panel tableWrap"><table><thead><tr><th>Student</th><th>Class</th><th>Attendance</th><th>Today's register</th></tr></thead><tbody>{demoStudents.map(s=><tr key={s.id}><td>{s.name}</td><td>{s.form}</td><td>{s.attendance}%</td><td><button className="tiny success" onClick={()=>alert("Demo register: student marked present.")}>Present</button> <button className="tiny danger" onClick={()=>alert("Demo register: student marked absent.")}>Absent</button></td></tr>)}</tbody></table></div></>
}
function Marks({user}){
 if(user.role==="Teacher") return <TeacherMarks/>;
 if(user.role==="Principal"||user.role==="Deputy Principal") return <LeadershipMarks/>;
 return <><Head title="My Children's Marks" sub="Only marks belonging to your linked children are visible."/><div className="panel tableWrap"><table><thead><tr><th>Child</th><th>Mathematics</th><th>English</th><th>Chemistry</th><th>Agriculture</th><th>Physics</th><th>Aggregate</th></tr></thead><tbody><tr><td>Lwazi Mamba</td><td>80</td><td>90</td><td>78</td><td>60</td><td>100</td><td><b>82%</b></td></tr></tbody></table></div></>
}
function LeadershipMarks(){
 const [comments,setComments]=useState({});
 return <><Head title="Marks & Student Comments" sub="Review every student's marks and leave a comment for each child."/><div className="panel tableWrap"><table><thead><tr><th>Student</th><th>Grade/Form</th><th>Math</th><th>Eng</th><th>Che</th><th>Agr</th><th>Phy</th><th>Aggregate</th><th>Comment</th></tr></thead><tbody>{demoStudents.map((s,i)=><tr key={s.id}><td>{s.name}</td><td>{s.form}</td><td>{[80,2,0][i]}</td><td>{[90,46,3][i]}</td><td>{[78,32,12][i]}</td><td>{[60,43,4][i]}</td><td>{[100,35,2][i]}</td><td><b>{[82,24,4][i]}%</b></td><td><input value={comments[s.id]||""} onChange={e=>setComments({...comments,[s.id]:e.target.value})} placeholder="Leave comment"/><button className="tiny success" onClick={()=>alert("Demo: comment saved for "+s.name)}>Save</button></td></tr>)}</tbody></table></div><div className="panel"><h3>Student list by grade/form</h3><div className="studentGrid">{["Form 1","Form 2","Form 3"].map(g=><div className="panel student" key={g}><h3>{g}</h3><p className="muted">{demoStudents.filter(s=>s.form===g).map(s=>s.name).join(", ")||"No demo students in this grade"}</p></div>)}</div></div></>
}
function TeacherMarks(){
 const [subject,setSubject]=useState("Mathematics");
 const [comments,setComments]=useState({});
 return <><Head title="My Subjects & Marks" sub="Add test and exam marks only for subjects you teach, and comment on every child." action={<select value={subject} onChange={e=>setSubject(e.target.value)}><option>Mathematics</option><option>English</option><option>Chemistry</option><option>Agriculture</option><option>Physics</option></select>}/><div className="panel tableWrap"><table><thead><tr><th>Student</th><th>Form</th><th>Attendance</th><th>Test</th><th>Exam</th><th>Subject Average</th><th>Subject Comment</th></tr></thead><tbody>{demoStudents.map(s=><tr key={s.id}><td>{s.name}</td><td>{s.form}</td><td>{s.attendance}%</td><td><input type="number" min="0" max="100" defaultValue="70"/></td><td><input type="number" min="0" max="100" defaultValue="75"/></td><td>{s.avg}%</td><td><input value={comments[s.id]||""} onChange={e=>setComments({...comments,[s.id]:e.target.value})} placeholder={subject+" comment"}/><button className="tiny success" onClick={()=>alert("Demo: "+subject+" marks/comment saved for "+s.name)}>Save</button></td></tr>)}</tbody></table></div><div className="panel"><h3>Students across the school</h3><p className="muted">Teachers can view the registered student list by grade/form, while editing marks is limited to their assigned subject.</p></div></>
}

function Finance({user}){
 if(user.role==="Accountant") return <AccountantFinance/>;
 if(user.role==="Principal"||user.role==="Deputy Principal") return <LeadershipFinance/>;
 return <><Head title="School Fees" sub="Your child's school-fee information."/><div className="stats">{[["Total fees","E3,000","Demo fee"],["Paid","E1,500","Verified"],["Remaining","E1,500","Outstanding"],["Deadline","30 Aug","2026"]].map(c=><div className="statCard" key={c[0]}><small>{c[0]}</small><b>{c[1]}</b><span>{c[2]}</span></div>)}</div><div className="panel"><h2>Receipt submission</h2><p className="muted">Upload or scan a payment receipt in the production version. The accountant will verify it.</p><button className="primary" onClick={()=>alert("Demo receipt submitted for accountant verification.")}>Submit payment receipt</button></div></>
}
function AccountantFinance(){
 const [receipts,setReceipts]=useState(true);
 return <><Head title="Accountant Finance" sub="Student fee ledger and receipt verification."/><div className="panel tableWrap"><table><thead><tr><th>Student</th><th>Form</th><th>Total Fees</th><th>Paid</th><th>Balance</th><th>Status</th></tr></thead><tbody>{[["Lwazi Mamba","Form 1","E3,000","E1,500","E1,500"],["Ayanda Hlophe","Form 2","E3,000","E3,000","E0"],["Sibusiso Dlamini","Form 3","E3,000","E1,000","E2,000"],["Nolwazi Mamba","Form 4","E3,000","E2,500","E500"]].map(r=><tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td><b>{r[4]}</b></td><td>{r[4]==="E0"?<span className="status open">PAID</span>:<span className="status warn">OUTSTANDING</span>}</td></tr>)}</tbody></table></div><div className="panel"><h2>Pending receipt approvals</h2><div className="receipt"><Receipt/><div><b>RCPT-2026-014</b><small>Demo Parent · Lwazi Mamba · E1,500 · Awaiting verification</small></div>{receipts?<><button className="tiny success" onClick={()=>{setReceipts(false);alert("Demo: receipt approved and payment ledger updated.")}}>Approve</button><button className="tiny danger" onClick={()=>{setReceipts(false);alert("Demo: receipt rejected.")}}>Reject</button></>:<span className="status open">REVIEWED</span>}</div></div></>
}
function LeadershipFinance(){return <><Head title="Finance Overview" sub="View which student owes how much; finance changes remain restricted to the accountant."/><div className="panel tableWrap"><table><thead><tr><th>Student</th><th>Form</th><th>Total Fees</th><th>Paid</th><th>Balance Owed</th></tr></thead><tbody>{[["Lwazi Mamba","Form 1","E3,000","E1,500","E1,500"],["Ayanda Hlophe","Form 2","E3,000","E3,000","E0"],["Sibusiso Dlamini","Form 3","E3,000","E1,000","E2,000"],["Nolwazi Mamba","Form 4","E3,000","E2,500","E500"]].map(r=><tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td><b>{r[4]}</b></td></tr>)}</tbody></table></div></>
}

function Spaces(){const [data,setData]=useState({1:20,2:10,3:15,4:12,5:13});const total=Object.values(data).reduce((a,b)=>a+Number(b),0);return <><Head title="Available Spaces" sub="Authorised administrators can edit grade/form capacity."/><div className="stats"><div className="statCard"><small>Total available spaces</small><b>{total}</b><span>Calculated automatically</span></div></div><div className="panel"><div className="spaceGrid">{Object.entries(data).map(([g,n])=><div><b>Form {g}</b><input type="number" min="0" value={n} onChange={e=>setData({...data,[g]:e.target.value})}/><small>{Number(n)===0?"FULL":"available"}</small></div>)}</div><p className="muted">Approved admissions should decrease the relevant capacity through the future backend transaction.</p></div></>}
function Resources(){return <><Head title="School Resources" sub="Track physical school resources." action={<button className="primary"><Plus size={16}/> Add resource</button>}/><div className="resourceGrid">{[["Form 1 Classroom","Desks",24],["Form 1 Classroom","Chairs",30],["Science Laboratory","Lab tables",12],["ICT Laboratory","Computers",28]].map(x=><div className="panel resource"><Boxes/><small>{x[0]}</small><h2>{x[1]}</h2><b>{x[2]}</b><button className="outline">Edit</button></div>)}</div></>}
function Notifications(){return <><Head title="Notifications" sub="Announcements, application updates, fee reminders and warnings." action={<button className="primary">+ New notice</button>}/><div className="panel">{[["Application approved","APP-1039 has been approved.","info"],["Fee deadline approaching","School fees are due on 30 August 2026.","warn"],["Performance warning","Mathematics performance has declined for a demo student.","danger"],["Parent meeting","Meeting tomorrow at 14:00.","info"]].map(x=><Notice title={x[0]} text={x[1]} kind={x[2]}/>)}</div></>}
function Reports(){return <><Head title="Reports" sub="Prototype school-management reports."/><div className="reportGrid">{["Admissions statistics","Attendance trends","Subject performance","Outstanding fees","Resource inventory","Student performance"].map(x=><div className="panel"><FileText/><h3>{x}</h3><p className="muted">Demo report ready for future export.</p><button className="outline">View report</button></div>)}</div></>}
function UsersPage(){return <><Head title="Platform Users" sub="System administrator view."/><div className="panel tableWrap"><table><thead><tr><th>Name</th><th>Role</th><th>Scope</th><th>Status</th></tr></thead><tbody>{Object.values(accounts).map(a=><tr><td>{a.name}</td><td>{a.role}</td><td>{a.role==="Parent"?"Own children":"Demo school/platform"}</td><td><span className="status open">ACTIVE</span></td></tr>)}</tbody></table></div></>}
function SchoolCalendar({user}){
 const events=[
  ["24 Aug 2026","Parent meeting","14:00","School Hall"],
  ["26 Aug 2026","Mathematics test","All Forms","Classrooms"],
  ["30 Aug 2026","School fees deadline","All day","Finance"],
  ["04 Sep 2026","Academic review meeting","15:00","Staff Room"]
 ];
 return <><Head title="School Calendar" sub="Important school dates, meetings, tests and deadlines."/><div className="panel tableWrap"><table><thead><tr><th>Date</th><th>Event</th><th>Time</th><th>Location</th></tr></thead><tbody>{events.map(e=><tr key={e[0]+e[1]}><td>{e[0]}</td><td><b>{e[1]}</b></td><td>{e[2]}</td><td>{e[3]}</td></tr>)}</tbody></table></div>{user.role==="Secretary"&&<div className="panel"><h3>Secretary controls</h3><p className="muted">Create and publish meetings, parent notices, fee reminders and school events here. SMS integration can be connected later.</p><button className="primary" onClick={()=>alert("Demo calendar event created.")}>+ Add calendar event</button></div>}</>
}
function AdminSchools(){
 const [items,setItems]=useState(()=>schools.map(s=>({...s,approval:"APPROVED",verification:"Verified"})).concat([{id:4,name:"New Eswatini Academy",centre:"6666",location:"Siteki",type:"High School",fees:2600,status:"PENDING",spaces:{1:20,2:10,3:10,4:5,5:5},approval:"PENDING",verification:"Pending verification",staff:[{name:"Demo Principal",role:"Principal"}]}]));
 const [name,setName]=useState(""); const [centre,setCentre]=useState("");
 const pending=items.filter(s=>s.approval==="PENDING").length; const approved=items.filter(s=>s.approval==="APPROVED").length;
 const approve=(id)=>setItems(items.map(x=>x.id===id?{...x,approval:"APPROVED",verification:"Verified — school existence and submitted information checked"}:x));
 const reject=(id)=>{const reason=prompt("Reason for rejection (for example: school could not be verified or information was false):");setItems(items.map(x=>x.id===id?{...x,approval:"REJECTED",verification:reason||"Not verified"}:x));};
 const add=()=>{if(!name||!centre)return alert("Enter a school name and Centre Number.");setItems([...items,{id:Date.now(),name,centre,location:"Eswatini",type:"High School",fees:0,status:"OPEN",spaces:{1:0,2:0,3:0,4:0,5:0},approval:"APPROVED",verification:"Admin-added school"}]);setName("");setCentre("");};
 return <><Head title="School Management" sub="Verify school existence and submitted information before approval." action={<button className="primary" onClick={add}><UserPlus size={16}/> Add school</button>}/><div className="stats"><div className="statCard"><small>Registered Schools</small><b>{approved}</b><span>Approved schools</span></div><div className="statCard"><small>Pending Schools</small><b>{pending}</b><span>Awaiting verification</span></div><div className="statCard"><small>Total Schools</small><b>{items.filter(s=>s.approval!=="REJECTED").length}</b><span>Registered + pending</span></div></div><div className="panel"><h3>Pending school verification</h3><p className="muted">The Admin must first confirm that the school exists and that the Centre Number, school details and staff information provided are true. Approve only after verification. Reject false or unverifiable registrations.</p></div><div className="panel tableWrap"><table><thead><tr><th>School</th><th>Centre Number</th><th>Location</th><th>Staff</th><th>Verification</th><th>Action</th></tr></thead><tbody>{items.map(s=><tr key={s.id}><td>{s.name}</td><td>{s.centre}</td><td>{s.location}</td><td>{s.staff?s.staff.length:"—"}</td><td><span className={"status "+(s.approval==="APPROVED"?"open":s.approval==="REJECTED"?"declined":"warn")}>{s.approval}</span><small style={{display:"block",marginTop:5}}>{s.verification}</small></td><td>{s.approval==="PENDING"&&<><button className="tiny success" onClick={()=>approve(s.id)}>Verify & Approve</button> <button className="tiny danger" onClick={()=>reject(s.id)}>Reject</button></>} {s.approval==="APPROVED"&&<button className="tiny danger" onClick={()=>setItems(items.filter(x=>x.id!==s.id))}><Trash2 size={13}/> Remove</button>}</td></tr>)}</tbody></table></div></>
}
function SettingsPage(){return <><Head title="Settings" sub="Prototype configuration."/><div className="panel settings"><h3>School admissions</h3><label>Admissions status <select><option>OPEN</option><option>CLOSED</option></select></label><label>Opening date <input type="date"/></label><label>Closing date <input type="date"/></label><h3>Security architecture</h3><p className="muted">Production version should enforce permissions in the API/database, use secure sessions, audit logs, encrypted document storage and least-privilege access.</p></div></>}

createRoot(document.getElementById("root")).render(<App/>);
