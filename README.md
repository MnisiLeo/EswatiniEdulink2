# EDULINK ESWATINI

Mobile-first school-management and parent platform prototype for Eswatini.

## Run
npm install
npm run dev

## Production build
npm run build

## GitHub Pages
The Vite config uses `base: "./"` so the production build can be served from a GitHub Pages project path.

## Demo accounts
Password for every demo account: `demo123`

- Parent: parent@demo.sz
- Teacher: teacher@demo.sz
- Accountant: accountant@demo.sz
- Secretary: secretary@demo.sz
- Principal: principal@demo.sz
- Deputy Principal: deputy@demo.sz
- System Admin: admin@demo.sz

## Prototype safety
All records are fictional. No real student information, payment processing, SMS provider, or production authentication is included.

## Architecture direction
The UI is separated from demo data and permission definitions so a future backend/API can replace the demo service. Production RBAC must be enforced server-side, not only in the UI.
