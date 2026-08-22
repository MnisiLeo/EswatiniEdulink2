# EduLink Eswatini – Current Prototype Specification

This prototype uses fictional/demo data only.

## System Admin – School Verification
- View pending school registrations.
- Verify that the school exists.
- Verify that the Centre Number and submitted school information are truthful.
- Review submitted staff information.
- Approve verified schools.
- Reject false, invalid, or unverifiable registrations and record a reason.
- View approved/registered schools.
- View total registered schools.
- Add/remove schools at platform level.
- System Admin does not access school academic performance, student marks, attendance, school fees, or school notifications.

## School Registration
A registering person provides school details and staff information. Staff entries include role; teachers can include subjects and grades/forms taught. Registration remains pending until System Admin verification.

## Parent
- Find schools and available spaces.
- Apply to a desired school.
- Upload required application documents in the application interface.
- See only linked children's attendance, marks, performance, fees, applications and notifications.
- Cannot access a school-wide attendance register or school-wide academic performance.

## Principal / Deputy Principal
- School-wide students, grouped by Grade/Form.
- Marks in table form.
- Comments for students.
- Attendance oversight.
- Active applications with approve/decline/wait-list actions.
- Student fee balances/finance overview.
- School calendar and school-management functions.

## Teacher
- See students in the school in grouped/table views.
- See Grade/Form, attendance and average.
- Enter marks only for subjects assigned to the teacher.
- Comment on students under subjects they teach.
- School calendar.
- No fees or admissions access.

## Accountant
- Student fee ledger/table with Form, total fees, paid and balance.
- Approve/reject parent payment receipts.
- No academic performance access.

## Secretary
- Notifications and communications.
- School calendar.

## Deployment
GitHub Actions workflow is included at `.github/workflows/deploy.yml`.
It runs `npm install`, `npm run build`, uploads `dist`, and deploys to GitHub Pages.

## Latest attendance and capacity rules

- Only a teacher who is explicitly assigned as a **Class Teacher** for a Form/Grade can mark that class register.
- A class teacher can mark **absent students only**; students remain present unless explicitly marked absent.
- The attendance page displays the **total number of absent students for the current register date**.
- A teacher may not mark attendance for a Form/Grade they merely teach a subject in.
- Teachers without a class-teacher assignment cannot mark the register.
- Principal, Deputy Principal, Accountant, Secretary, Parent and System Admin cannot mark the register.
- Principal and Deputy Principal may maintain the school's **available spaces by Grade/Form**.
- Available-space changes are reflected in the school directory and admission-capacity workflow.
- The demonstration dataset contains **five Form 1, five Form 2 and five Form 3 students**.
