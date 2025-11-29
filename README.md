# 📝 Mini Audit Trail Generator – Frontend (Next.js + TailwindCSS)

This is the **frontend UI** for the Audit Trail Generator application.  
It allows users to write text, save versions, and see added/removed words visually.

---

### 🔗 Live Deployment  
**Frontend (Vercel):**  
📌 https://audit-trail-frontend-5zcz.vercel.app/

---

### 🔗 Backend API URL  
The frontend communicates with the backend deployed on Render.

📌 https://audit-trail-backend-zwg6.onrender.com

| Method | Route | Description |
|---|---|---|
| GET | `/versions` | Returns version history |
| POST | `/save-version` | Saves new version + diff data |

---

## 🚀 Features
✔ Track text changes over time  
✔ Shows **added vs removed words** clearly  
✔ Version history with timestamps  
✔ TailwindCSS UI + smooth layout  
✔ Live backend + persistent versions  

---

## 🛠 Run Frontend Locally

```bash
npm install
npm run dev
