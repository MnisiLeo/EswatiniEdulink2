import React,{useState} from "react";
import {createRoot} from "react-dom/client";
import {School,Search,ShieldCheck,Users,GraduationCap,Wallet,MessageSquare,Menu,X,ChevronRight,CheckCircle,Clock,AlertTriangle,Plus,LogOut,LayoutDashboard,BookOpen,CalendarCheck,Receipt,Settings,Boxes,FileText} from "lucide-react";
import "./styles.css";

const roles={
 "System Admin":["dashboard","schools","users","reports","settings"],
 "Principal":["dashboard","admissions","students","teachers","attendance","marks","finance","spaces","resources","notifications","reports","settings"],
 "Deputy Principal":["dashboard","admissions","students","teachers","attendance","marks","finance","spaces","resources","notifications","reports"],
 "Teacher":["dashboard","students","attendance","marks","notifications"],
 "Accountant":["dashboard","finance","notifications"],
 "Secretary":["dashboard","admissions","notifications"],
 "Parent":["dashboard","children","applications","attendance","marks","fees","notifications"]
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
 dashboard:["Overview",LayoutDashboard],schools:["Find a School",School],admissions:["Admissions",FileText],students:["Students",Users],teachers:["Teachers",GraduationCap],attendance:["Attendance",CalendarCheck],marks:["Marks & Performance",BookOpen],finance:["Finance",Wallet],spaces:["Available Spaces",Boxes],resources:["Resources",Boxes],notifications:["Notifications",MessageSquare],children:["My Children",Users],applications:["My Applications",FileText],fees:["School Fees",Receipt],reports:["Reports",FileText],users:["Users",Users],settings:["Settings",Settings]
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
   <nav>{allowed.map(k=>{const [label,I]=navMeta[k];return <button className={page===k?"navActive":""} onClick={()=>{setPage(k);setMobile(false)}} key={k}><I size={18}/>{label}</button>})}</nav>
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
  <section className="hero"><div><div className="eyebrow">A DIGITAL SCHOOL PLATFORM FOR ESWATINI</div><h1>One platform for schools, parents and students.</h1><p>Find schools, check available spaces, apply online, monitor performance, manage fees and receive important school communications.</p><div className="heroActions"><button className="primary large" onClick={()=>setPage("directory")}>Find a School <ChevronRight size={18}/></button><button className="outline large" onClick={()=>setPage("login")}>Parent Login</button></div></div><DashboardPreview/></section>
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
 return <div className="auth"><div className="authCard wide"><div className="brand dark"><div className="brandIcon"><ShieldCheck/></div><div>EduLink <span>ESWATINI</span></div></div><h1>Register your school</h1><p className="muted">Prototype registration. Verification and backend approval will be added later.</p><div className="formGrid">{["School name","Centre Number","Location","School type","Phone","Email","Principal name"].map(x=><input key={x} placeholder={x}/>)}</div><button className="primary full" onClick={()=>alert("Demo school registration submitted. No real data was saved.")}>Submit registration</button><button className="link" onClick={()=>setPage("home")}>← Back</button></div></div>
}
function Directory({setPage,setSchool}){
 const [q,setQ]=useState("");const list=schools.filter(s=>[s.name,s.centre,s.location].some(v=>v.toLowerCase().includes(q.toLowerCase())));
 return <div className="publicPage"><div className="publicHeader"><div className="brand dark"><div className="brandIcon"><ShieldCheck/></div><div>EduLink <span>ESWATINI</span></div></div><button className="link" onClick={()=>setPage("home")}>Home</button></div><div className="pageIntro"><div><div className="eyebrow">SCHOOL DIRECTORY</div><h1>Find a school</h1><p>Search participating demo schools by name, Centre Number or location.</p></div><button className="primary" onClick={()=>setPage("login")}>Parent Login</button></div><div className="searchBox"><Search/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="School name, Centre Number or location"/></div><div className="schoolGrid">{list.map(s=><SchoolCard s={s} key={s.id} setSchool={setSchool} setPage={setPage}/>)}</div></div>
}
function SchoolCard({s,setSchool,setPage}){const total=Object.values(s.spaces).reduce((a,b)=>a+b,0);return <div className="schoolCard"><div className="schoolBadge"><School/></div><span className="status open">{s.status}</span><h3>{s.name}</h3><p className="muted">Centre Number <b>{s.centre}</b></p><p>{s.location} · {s.type}</p><div className="fee">E{s.fees.toLocaleString()} <small>school fees</small></div><div className="spaceLine"><b>{total}</b> spaces available</div><button className="outline full" onClick={()=>{setSchool(s);setPage("school")}}>View school</button></div>}
function Page({page,user,setPage,school,setSchool}){
 if(page==="schools")return <Directory setPage={setPage} setSchool={setSchool}/>;
 if(page==="school")return <SchoolProfile s={school} setPage={setPage} user={user}/>;
 if(page==="admissions"||page==="applications")return <Admissions user={user}/>;
 if(page==="students"||page==="children")return <Students user={user}/>;
 if(page==="teachers")return <Teachers/>;
 if(page==="attendance")return <Attendance user={user}/>;
 if(page==="marks")return <Marks user={user}/>;
 if(page==="finance"||page==="fees")return <Finance user={user}/>;
 if(page==="spaces")return <Spaces/>;
 if(page==="resources")return <Resources/>;
 if(page==="notifications")return <Notifications/>;
 if(page==="reports")return <Reports/>;
 if(page==="users")return <UsersPage/>;
 if(page==="settings")return <SettingsPage/>;
 return <Dashboard user={user}/>;
}
function Head({title,sub,action}){return <div className="sectionHead"><div><h1>{title}</h1><p className="muted">{sub}</p></div>{action}</div>}
function Dashboard({user}){
 const cards=user.role==="Parent"?[["My Children","2","Active profiles"],["Attendance","94%","Current term"],["Average marks","78%","Across subjects"],["Fees balance","E1,500","Deadline 30 Aug"]]:user.role==="Accountant"?[["Fees outstanding","E48,500","School total"],["Pending receipts","7","Awaiting verification"],["Verified today","E16,800","Payments"],["Collection rate","72%","Current term"]]:[["Students","1,248","Active students"],["Applications","86","12 pending review"],["Available spaces","70","Across classes"],["Fees outstanding","E48,500","School total"]];
 return <><Head title={`Good evening, ${user.name.split(" ")[0]}.`} sub="Here is your EduLink overview."/><div className="stats">{cards.map(c=><div className="statCard"><small>{c[0]}</small><b>{c[1]}</b><span>{c[2]}</span></div>)}</div><div className="twoCol"><div className="panel"><h3>Academic performance</h3><div className="bigNumber">73%</div><div className="progress"><i style={{width:"73%"}}/></div><p className="muted">Overall current-term subject average</p></div><div className="panel"><h3>Important notifications</h3><Notice title="Parent meeting" text="Tomorrow at 14:00" kind="warn"/><Notice title="Fee deadline" text="30 August 2026" kind="info"/><Notice title="Performance review" text="3 students flagged" kind="danger"/></div></div></>
}
function Notice({title,text,kind}){return <div className="notice"><span className={"noticeIcon "+kind}>{kind==="danger"?<AlertTriangle/>:kind==="warn"?<Clock/>:<CheckCircle/>}</span><div><b>{title}</b><small>{text}</small></div></div>}
function SchoolProfile({s,setPage,user}){if(!s)return <div className="empty">Select a school from the directory.</div>;const total=Object.values(s.spaces).reduce((a,b)=>a+b,0);return <><button className="link" onClick={()=>setPage("schools")}>← School directory</button><div className="profileHero"><div className="schoolBadge large"><School/></div><div><span className="status open">{s.status}</span><h1>{s.name}</h1><p>Centre Number: <b>{s.centre}</b> · {s.location} · {s.type}</p></div></div><div className="stats"><div className="statCard"><small>School fees</small><b>E{s.fees.toLocaleString()}</b><span>Demo annual fee</span></div><div className="statCard"><small>Total available</small><b>{total}</b><span>Spaces</span></div></div><div className="panel"><h2>Available spaces</h2><div className="spaceGrid">{Object.entries(s.spaces).map(([g,n])=><div><b>{s.type==="Primary School"?"Grade":"Form"} {g}</b><strong>{n}</strong><small>{n===0?"FULL":"spaces available"}</small></div>)}</div><button className="primary" onClick={()=>setPage(user?.role==="Parent"?"applications":"login")}>Apply to this school</button></div></>}
function Admissions(){return <><Head title="Admissions" sub="Review and manage school applications." action={<button className="primary">+ New application</button>}/><div className="panel tableWrap"><table><thead><tr><th>Application</th><th>Child</th><th>School</th><th>Grade/Form</th><th>Status</th><th>Action</th></tr></thead><tbody>{[["APP-1042","Lwazi Mamba","Hermann Gmeiner High School","Form 1","PENDING"],["APP-1039","Ayanda Hlophe","Hermann Gmeiner High School","Form 2","APPROVED"],["APP-1035","Sibusiso Dlamini","Hermann Gmeiner High School","Form 3","WAITING LIST"]].map((r,i)=><tr><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td><span className={"status "+r[4].toLowerCase().replace(" ","")}>{r[4]}</span></td><td>{i===0&&<><button className="tiny success" onClick={()=>alert("Demo: application approved; available spaces would decrease server-side.")}>Approve</button> <button className="tiny danger" onClick={()=>alert("Demo: application declined.")}>Decline</button></>}</td></tr>)}</tbody></table></div></>}
function Students({user}){const data=user.role==="Parent"?demoStudents.slice(0,2):demoStudents;return <><Head title={user.role==="Parent"?"My Children":"Students"} sub={user.role==="Parent"?"Only your linked children are visible here.":"Students within your authorised school scope."}/><div className="studentGrid">{data.map(s=><div className="panel student"><div className="studentTop"><div className="avatar">{s.name.split(" ").map(x=>x[0]).join("")}</div><div><h3>{s.name}</h3><small>{s.form} · Demo record</small></div></div><div className="studentMetrics"><div><b>{s.avg}%</b><small>Average</small></div><div><b>{s.attendance}%</b><small>Attendance</small></div></div>{s.warning&&<div className="warning"><AlertTriangle size={16}/> Performance/attendance requires attention.</div>}<button className="outline full">View profile</button></div>)}</div></>}
function Teachers(){return <><Head title="Teachers" sub="Manage authorised teaching staff."/><div className="panel tableWrap"><table><thead><tr><th>Name</th><th>Department</th><th>Assigned classes</th><th>Status</th></tr></thead><tbody>{[["Mr. M. Nkosi","Mathematics","Form 1–3"],["Ms. N. Dlamini","English","Form 2–5"],["Mr. T. Mamba","Science","Form 1–4"]].map(x=><tr><td>{x[0]}</td><td>{x[1]}</td><td>{x[2]}</td><td><span className="status open">ACTIVE</span></td></tr>)}</tbody></table></div></>}
function Attendance({user}){return <><Head title="Attendance" sub="Teachers mark absences; unmarked students are treated as present."/><div className="stats">{[["Today's attendance","94.9%","Current day"],["Absent","64","Students"],["Present","1,184","Students"],["Warnings","12","Below threshold"]].map(c=><div className="statCard"><small>{c[0]}</small><b>{c[1]}</b><span>{c[2]}</span></div>)}</div><div className="panel tableWrap"><table><thead><tr><th>Student</th><th>Class</th><th>Attendance</th><th>Today's register</th></tr></thead><tbody>{demoStudents.map(s=><tr><td>{s.name}</td><td>{s.form}</td><td>{s.attendance}%</td><td><button className="tiny success" onClick={()=>alert("Demo register: student marked present.")}>Present</button> <button className="tiny danger" onClick={()=>alert("Demo register: student marked absent.")}>Absent</button></td></tr>)}</tbody></table></div></>}
function Marks({user}){return <><Head title="Marks & Performance" sub="Record marks and identify declining performance."/><div className="panel tableWrap"><table><thead><tr><th>Student</th><th>Mathematics</th><th>English</th><th>Science</th><th>Average</th><th>Flag</th></tr></thead><tbody>{demoStudents.map((s,i)=><tr><td>{s.name}</td><td>{[72,68,54][i]}%</td><td>{[81,76,62][i]}%</td><td>{[84,73,67][i]}%</td><td><b>{s.avg}%</b></td><td>{s.warning?<span className="status declined">DECLINING</span>:<span className="status open">OK</span>}</td></tr>)}</tbody></table></div></>}
function Finance({user}){return <><Head title="Finance" sub={user.role==="Parent"?"Your child's school-fee information.":"Finance access is restricted to authorised financial roles."}/><div className="stats">{[["Total fees","E3,000","Demo fee"],["Paid","E1,500","Verified"],["Remaining","E1,500","Outstanding"],["Deadline","30 Aug","2026"]].map(c=><div className="statCard"><small>{c[0]}</small><b>{c[1]}</b><span>{c[2]}</span></div>)}</div><div className="panel"><h2>Receipt verification</h2><p className="muted">Prototype workflow for accountant review.</p><div className="receipt"><Receipt/><div><b>RCPT-2026-014</b><small>Demo Parent · E1,500 · Awaiting verification</small></div><button className="tiny success" onClick={()=>alert("Demo: receipt approved. Balance would update in the backend.")}>Approve</button><button className="tiny danger" onClick={()=>alert("Demo: receipt rejected.")}>Reject</button></div></div></>}
function Spaces(){const [data,setData]=useState({1:20,2:10,3:15,4:12,5:13});const total=Object.values(data).reduce((a,b)=>a+Number(b),0);return <><Head title="Available Spaces" sub="Authorised administrators can edit grade/form capacity."/><div className="stats"><div className="statCard"><small>Total available spaces</small><b>{total}</b><span>Calculated automatically</span></div></div><div className="panel"><div className="spaceGrid">{Object.entries(data).map(([g,n])=><div><b>Form {g}</b><input type="number" min="0" value={n} onChange={e=>setData({...data,[g]:e.target.value})}/><small>{Number(n)===0?"FULL":"available"}</small></div>)}</div><p className="muted">Approved admissions should decrease the relevant capacity through the future backend transaction.</p></div></>}
function Resources(){return <><Head title="School Resources" sub="Track physical school resources." action={<button className="primary"><Plus size={16}/> Add resource</button>}/><div className="resourceGrid">{[["Form 1 Classroom","Desks",24],["Form 1 Classroom","Chairs",30],["Science Laboratory","Lab tables",12],["ICT Laboratory","Computers",28]].map(x=><div className="panel resource"><Boxes/><small>{x[0]}</small><h2>{x[1]}</h2><b>{x[2]}</b><button className="outline">Edit</button></div>)}</div></>}
function Notifications(){return <><Head title="Notifications" sub="Announcements, application updates, fee reminders and warnings." action={<button className="primary">+ New notice</button>}/><div className="panel">{[["Application approved","APP-1039 has been approved.","info"],["Fee deadline approaching","School fees are due on 30 August 2026.","warn"],["Performance warning","Mathematics performance has declined for a demo student.","danger"],["Parent meeting","Meeting tomorrow at 14:00.","info"]].map(x=><Notice title={x[0]} text={x[1]} kind={x[2]}/>)}</div></>}
function Reports(){return <><Head title="Reports" sub="Prototype school-management reports."/><div className="reportGrid">{["Admissions statistics","Attendance trends","Subject performance","Outstanding fees","Resource inventory","Student performance"].map(x=><div className="panel"><FileText/><h3>{x}</h3><p className="muted">Demo report ready for future export.</p><button className="outline">View report</button></div>)}</div></>}
function UsersPage(){return <><Head title="Platform Users" sub="System administrator view."/><div className="panel tableWrap"><table><thead><tr><th>Name</th><th>Role</th><th>Scope</th><th>Status</th></tr></thead><tbody>{Object.values(accounts).map(a=><tr><td>{a.name}</td><td>{a.role}</td><td>{a.role==="Parent"?"Own children":"Demo school/platform"}</td><td><span className="status open">ACTIVE</span></td></tr>)}</tbody></table></div></>}
function SettingsPage(){return <><Head title="Settings" sub="Prototype configuration."/><div className="panel settings"><h3>School admissions</h3><label>Admissions status <select><option>OPEN</option><option>CLOSED</option></select></label><label>Opening date <input type="date"/></label><label>Closing date <input type="date"/></label><h3>Security architecture</h3><p className="muted">Production version should enforce permissions in the API/database, use secure sessions, audit logs, encrypted document storage and least-privilege access.</p></div></>}

createRoot(document.getElementById("root")).render(<App/>);
