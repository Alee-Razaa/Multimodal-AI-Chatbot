# 🤖 MMC AI – Multimodal AI Chatbot Hub

A unified web-based platform integrating state-of-the-art AI capabilities, including Google Gemini, OpenRouter (GPT, Mistral), Stability AI, Text-to-Speech (TTS), and Optical Character Recognition (OCR). Built with React, Node.js, Python microservices, and Tailwind CSS — designed to serve students, professionals, and creators through a seamless AI experience.

![MIT License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/frontend-React-blue)
![Node.js](https://img.shields.io/badge/backend-Node.js-yellow)
![Python](https://img.shields.io/badge/microservices-Python-blueviolet)

---

## 📌 Table of Contents

- [✨ Key Features](#-key-features)
- [🚀 Tech Stack](#-tech-stack)
- [⚙️ Installation](#️-installation)
- [🔐 Environment Variables](#-environment-variables)
- [📦 Scripts](#-scripts)
- [🛠️ Future Improvements](#️-future-improvements)
- [👨‍💻 Authors](#-authors)

---

## ✨ Key Features

- **🤖 Gemini-Powered Chatbot** – Human-like responses using Google Gemini model.
- **🔄 OpenRouter AI Integration** – Switch between GPT-3.5, Mistral & other LLMs.
- **🎨 Stability AI Image Generation** – High-quality text-to-image conversion with Stable Diffusion.
- **🔊 Python TTS Microservice** – Converts AI responses into speech using gTTS or pyttsx3.
- **🖼️ OCR Microservice** – Extract text from images using Tesseract OCR.
- **🧠 Persistent Chat History** – Saved by unique Chat IDs for session continuity.
- **🌐 Unified Chat Interface** – Clean UI per model with intuitive session flow.
- **🔐 JWT Authentication** – Secure user login system.
- **🧩 Modular Backend Architecture** – Easily extendable with microservices.

---

## 🚀 Tech Stack

### Frontend
- React (CRA)
- Tailwind CSS
- Redux Toolkit (RTK)
- React Router
- Formik + Yup for forms

### Backend
- Node.js (Express)
- MongoDB (via Mongoose)
- JWT Authentication
- Nodemailer for Email

### Python Microservices
- Flask (for OCR & TTS)
- Tesseract OCR
- gTTS / pyttsx3

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Alee-Razaa/AI-powered-Chatbot.git
cd AI-powered-Chatbot
```

### 2️⃣ Setup Frontend

```bash
cd frontend
npm install
npm start
```

### 3️⃣ Setup Backend

```bash
cd ../backend
npm install
node server.js
```

### 4️⃣ Run Python Microservices

```bash
cd ../python-microservices/ocr_service
python app.py

cd ../tts_service
python app.py
```

> ⚠️ Make sure Python 3 and dependencies like `Flask`, `gTTS`, and `pytesseract` are installed.

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mmc-ai
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

---

## 📦 Scripts

### Frontend

| Script        | Description              |
|---------------|--------------------------|
| `npm start`   | Runs dev server (React)  |
| `npm run build` | Builds the app for production |
| `npm test`    | Runs test suite          |

### Backend

| Script       | Description              |
|--------------|--------------------------|
| `node server.js` | Starts backend server |
| `npm install` | Installs dependencies |

---

## 🛠️ Future Improvements

- 🧠 Add voice input support
- 🧠 Add OpenAI Whisper for audio-to-text
- 🌍 Deploy to Vercel (frontend) and Railway (backend)
- 🔁 Add conversation export feature (PDF/markdown)
- 📱 Make it fully responsive for mobile users

---

## 👨‍💻 Authors

- **Ali Raza Memon** – AI integrations (Gemini, OpenRouter, Stability AI), chat logic & model coordination 
- **Aadil Shah** – Backend development (Node.js, MongoDB, JWT auth, email services), Python microservices
- **Waseem Mazari** – Frontend development (React, Tailwind, Redux, UI/UX flow)
  
 

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
