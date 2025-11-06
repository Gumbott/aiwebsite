# aiwebsite

This repository contains a Create React App based website.

## Quick commands

- Run locally:

```bash
npm install
npm start
```

- Build for production:

```bash
npm run build
```

- Deploy to cPanel:
  - Upload the contents of the `build/` folder to your cPanel document root (usually `public_html`) via the cPanel File Manager or FTP/SFTP.
  - Ensure the `.htaccess` file at the repo root is uploaded to the same folder to enable security headers and HTTPS redirects.

## Notes
- This project uses Firebase (Firestore) for backend storage. Firestore security rules are in `firestore.rules` and were configured to allow requests from `https://robotsforhire.co.nz` and `http://localhost:3000`.
- Sensitive environment variables should be placed in `.env` on the server and never committed.

If you want, I can also remove the currently committed build artifacts from the repository history (cleaner) — that is more invasive and I can walk you through it.
