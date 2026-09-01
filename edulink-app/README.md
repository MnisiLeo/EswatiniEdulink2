# EduLink Eswatini — Presentation Prototype

EduLink Eswatini is a mobile-first school management and parent platform prototype. This version keeps the existing Vite + React + Capacitor Android structure and expands the supplied working project rather than starting a new project.

## Presentation workflows included
- Professional EduLink Eswatini landing screen with Login, Register, Register a School and Find a School.
- Custom EduLink logo, navy/red/yellow visual system and subtle Eswatini-inspired watermark treatment.
- Role-based registration: Parent, Head Teacher, Deputy Head Teacher, Teacher, Secretary, Accountant and System Admin.
- Password creation at registration and admin approval before a new account can log in.
- Staff registration includes ID document and photo scan/capture UI; System Admin registration has no school selection.
- School registration with Centre Number, contact details, fees, admission dates and verification-document scan UI.
- Admin approval centre for schools and users.
- Head Teacher/Deputy Head Teacher: school-wide visibility, admissions decisions, staff add/remove, spaces, student comments, parent feedback, performance reports and average school performance.
- Teacher: assigned-subject/class marks, comments for taught students, class-teacher context and absent-only attendance marking.
- Secretary: school communication/calendar functions.
- Accountant: fee ledger, paid/outstanding table and receipt approval/rejection.
- Parent: school search, applications, document scanning/upload, child-only marks/attendance/comments, fees, receipt submission, notifications, private teacher feedback, suggestions and annual results.
- Approved applications automatically create a student profile and reduce available space.
- Acceptance notifications are shown to the school audience and the applying parent.
- Annual results include a presentation download action.

## Demo accounts
All demo accounts use password `demo123`.
- Parent: `parent@demo.sz`
- Teacher: `teacher@demo.sz`
- Accountant: `accountant@demo.sz`
- Secretary: `secretary@demo.sz`
- Head Teacher: `principal@demo.sz`
- Deputy Head Teacher: `deputy@demo.sz`
- System Admin: `admin@demo.sz`

## Important prototype note
This is a presentation prototype. Registration, scanning, approvals and data changes are simulated/local to the browser or Android WebView. A production system would require a secure backend, real authentication, encrypted document storage, database authorization, audit logs, verified school identities, SMS/payment integrations and proper privacy controls.

The visual treatment is inspired by Eswatini education/public-service aesthetics for presentation and is not an official ECESWA, SNAT or government application.
