# 🧠 AI Resume Analyzer & ATS Score App

The **AI Resume Analyzer** is a web application that evaluates resumes against job descriptions using advanced AI models. It provides an **ATS (Applicant Tracking System) score**, identifies **missing keywords**, and gives **actionable suggestions** to improve resume quality and job relevance.

---

## 🚀 Features

- 📄 **PDF Resume Upload:** Upload your resume securely in PDF format.  
- 🧩 **Job Description Matching:** Analyze your resume against specific job descriptions.  
- 🎯 **ATS Score Generation:** Get a detailed compatibility score instantly.  
- 💡 **AI Suggestions:** Receive improvement tips to enhance your resume’s effectiveness.  
- 🔍 **Keyword Insights:** Identify missing and weak keywords.  
- 🔐 **Authentication System:** Secure login and registration using JWT.  
- 🌗 **Modern UI:** Responsive design with dark/light mode and smooth animations.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js  
- Tailwind CSS  
- Framer Motion  
- Axios  

**Backend:**
- Node.js  
- Express.js  
- MongoDB  
- Multer (for file uploads)  
- JWT Authentication  

**AI Integration:**
- Gemini API (for NLP-based resume analysis)

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Krishna72user/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```
### 1. Setup the Backend
```bash
cd backend
npm install
```

Create a .env file in the backend folder:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_or_gemini_api_key
```
Then start the backend:
```bash
npm start
```

### 3. Setup the Frontend
```bash
cd client
npm install
npm run dev
```