# 🚀 Review AI – Intelligent Resume Analyzer & Interview Prep System
<p align="center">

<img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react" />
<img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js" />
<img src="https://img.shields.io/badge/Database-MongoDB-brightgreen?style=for-the-badge&logo=mongodb" />
<img src="https://img.shields.io/badge/AI-Gemini-orange?style=for-the-badge" />

<br/>

<img src="https://img.shields.io/badge/Auth-JWT-black?style=for-the-badge&logo=jsonwebtokens" />
<img src="https://img.shields.io/badge/PDF-Puppeteer-red?style=for-the-badge&logo=puppeteer" />
<img src="https://img.shields.io/badge/API-Express-lightgrey?style=for-the-badge&logo=express" />

</p>

> Turn your resume into a **job-winning machine** with AI-powered insights, skill gap analysis, and interview preparation.


## 🧠 What is Review AI?

**Review AI** is a full-stack AI-powered platform that:

- 📄 Analyzes your **resume (PDF)**
- 🧑‍💻 Matches it with a **job description**
- 🧾 Considers your **self-description**
- 📊 Generates:
  - Resume match score (0–100)
  - Skill gaps
  - Technical questions
  - Behavioral questions
  - Personalized preparation plan
  - Resume PDF generation


## ⚙️ System Architecture

### 🔹 Input → AI Processing → Output

![Architecture](https://ik.imagekit.io/gwv0quzrfq/readme%20assets/AI%20Functions%20Architecture.png)


### 🔹 PDF Generation Flow

![PDF Flow](https://ik.imagekit.io/gwv0quzrfq/readme%20assets/Prompt%20to%20pdf.png)

## ✨ Features

- 🔐 JWT Authentication (Login/Register/Logout)
- 📄 Resume Upload & Parsing (PDF)
- 🤖 AI-Powered Analysis (Gemini API)
- 📊 Resume Match Scoring
- 📉 Skill Gap Detection
- 🧠 Technical + Behavioral Questions
- 🗺️ Personalized Preparation Plan
- 📑 Resume PDF Generator (Puppeteer)
- 📚 Interview Report History
- ⚡ Clean Modular Architecture

## 🗂️ Project Structure

```bash
├── .vscode/
│   └── settings.json
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── interview.controller.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   └── file.middleware.js
│   │   ├── models/
│   │   │   ├── blacklist.model.js
│   │   │   ├── interviewReport.model.js
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── interview.routes.js
│   │   ├── services/
│   │   │   └── ai.service.js
│   │   └── app.js
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   └── test.js
├── Frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── components/
│   │   │   └── common/
│   │   │       └── Loader.jsx
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   │   └── Protected.jsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useAuth.js
│   │   │   │   ├── pages/
│   │   │   │   │   ├── Login.jsx
│   │   │   │   │   └── Register.jsx
│   │   │   │   ├── services/
│   │   │   │   │   └── auth.api.js
│   │   │   │   ├── auth.context.jsx
│   │   │   │   └── auth.form.scss
│   │   │   └── interview/
│   │   │       ├── components/
│   │   │       │   ├── Footer.jsx
│   │   │       │   ├── Header.jsx
│   │   │       │   ├── Hero.jsx
│   │   │       │   ├── InterviewForm.jsx
│   │   │       │   └── ReportList.jsx
│   │   │       ├── hooks/
│   │   │       │   └── useInterview.js
│   │   │       ├── pages/
│   │   │       │   ├── Home.jsx
│   │   │       │   └── Interview.jsx
│   │   │       ├── services/
│   │   │       │   └── interview.api.js
│   │   │       ├── style/
│   │   │       │   ├── footer.scss
│   │   │       │   ├── form.scss
│   │   │       │   ├── header.scss
│   │   │       │   ├── hero.scss
│   │   │       │   ├── home.scss
│   │   │       │   ├── interview.scss
│   │   │       │   └── reportList.scss
│   │   │       └── interview.context.jsx
│   │   ├── styles/
│   │   │   └── button.scss
│   │   ├── App.jsx
│   │   ├── app.routes.jsx
│   │   ├── main.jsx
│   │   └── style.scss
│   ├── .env.production
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
└── vercel.json

```
## 🔌 API Endpoints      
All the API enpoints for the project is mentioned below :  

### 🔐 Auth Routes    
| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| POST   | /api/auth/register  | Register user              |
| POST   | /api/auth/login     | Login user                 |
| GET   | /api/auth/get-me   | Get current user (Protected) |
| GET   | /api/auth/logout    | Logout User |

###📊 Interview Routes  
| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| POST   | /api/interview/  | Generate Interview Report              |
| POST   | /api/interview/report/:interviewId     | Get specific report|
| GET   | /api/interview/   | Get all reports |
| GET   | /api/interview/resume/pdf/:id    | Generate resume PDF |

## Postman Collection 🧪  
[Postman Collection for the APIs of this particular project](https://www.postman.com/atechnical8-6486544/workspace/gen-ai)  

## 🛠️Tech Stack
### **🖥️ Frontend**  
- React (Vite)  
- SCSS  
- Context API  
- Custom Hooks  
## **⚙️ Backend**  
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Multer (File Upload)  
## **🤖 AI & Processing**  
- Gemini AI (Content Generation)  
- pdf-parse (Resume Parsing)  
- Puppeteer (HTML → PDF)

## 🧑‍💻 Installation
**1️⃣ Clone Repo**
```
git clone https://github.com/your-username/review-ai.git
cd review-ai
```
**2️⃣ Backend Setup**
```
cd Backend
npm install
npm run dev
```
**3️⃣ Frontend Setup**
```
cd Frontend
npm install
npm run dev
```
## 🔑 Environment Variables

Create .env in Backend:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key
```
## 📸 Screenshots
### Register
![Register](https://ik.imagekit.io/gwv0quzrfq/readme%20assets/ReviewAI/register.png)
### Login
![Login](https://ik.imagekit.io/gwv0quzrfq/readme%20assets/ReviewAI/Login.png)
### Home
![Home](https://ik.imagekit.io/gwv0quzrfq/readme%20assets/ReviewAI/Home.png)
### DashBoards
![Technical Questions](https://ik.imagekit.io/gwv0quzrfq/readme%20assets/ReviewAI/Technical.png)
![Behavioral Questions](https://ik.imagekit.io/gwv0quzrfq/readme%20assets/ReviewAI/Behavioral.png)
![Preparation Roadmap](https://ik.imagekit.io/gwv0quzrfq/readme%20assets/ReviewAI/Roadmap.png)

## 📄 Resume Generated
![Generated Resume Page 1](https://ik.imagekit.io/gwv0quzrfq/readme%20assets/ReviewAI/resume%20p1.png)
![Generated Resume Page 2](https://ik.imagekit.io/gwv0quzrfq/readme%20assets/ReviewAI/resumep2.png)
## 📈 Future Improvements
- 📊 ATS Score Simulation
- 🎯 Role-specific preparation plans
- 🎥 Mock interview (AI voice)
- 🧠 Behavioral feedback analysis
- 📱 Mobile responsive UI upgrade
## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

## 🧑‍💼 Author

Akarsh Singh  
🔗 GitHub: https://github.com/NotJustAkarsh  

🔗 LinkedIn: https://www.linkedin.com/in/akarsh-singh-5968071b2  

## ⭐ Support

If you like this project:

👉 Give it a ⭐ on GitHub
👉 Share it with others
👉 Use it to crack your next interview 😉
