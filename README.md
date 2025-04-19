



# Travel-Planner-Agent


# 🌍 Travel Planner Agent using LangGraph

AI-based travel planner that helps you choose destinations, plan itineraries, and answer follow-up questions — all based on your preferences.  
Built using **LangGraph**, **FastAPI**, and **React** 🧠✨

---

## ⚙️ Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: FastAPI + LangGraph
- **AI Model**: Groq (in `backend/apis/note.py`)
- **APIs**: OpenWeatherMap, Wikipedia

---

## 🛠️ How to Run on Any Machine

### 1️⃣ Clone the Repo

```bash
git clone 
cd travel-planner-ai
```


### 2️⃣ Backend Setup (FastAPI + LangGraph + Groq)
```
cd Travel-Planner-Agent/
cd backend
uvicorn main:app --reload
```

📌 Groq integration is handled in:
```
backend/apis/note.py
```

### 3️⃣ Frontend Setup (React + Tailwind CSS)
```
cd frontend
npm install
npm run dev
```


## Dir Structure
```
travel-planner-ai/
├── backend/
│   ├── main.py                # FastAPI server entry
│   ├── agent/
│   │   ├── langgraph_flow.py  # LangGraph full flow
│   │   ├── nodes/
│   │   │   ├── preferences.py
│   │   │   ├── destinations.py
│   │   │   ├── weather.py
│   │   │   └── itinerary.py
│   ├── utils/
│   │   ├── weather_api.py     # OpenWeatherMap real calls
│   │   └── wiki_api.py        # Wikipedia search
│   ├── test/
│   │   └── ...                # pytest test cases
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── api.js             # Axios requests to backend
│   └── tailwind.config.js
│
├── .env                       # Your API keys
├── README.md

```



## DOC's Files
- https://www.notion.so/jaiminbariya/Travel-Planner-Agent-1d8253453b368020b957fe899573b8a6?pvs=4


## DEMO
https://github.com/user-attachments/assets/4168b481-c9e9-44ca-9037-69adf00156a8


👨‍💻 Created by
JP Bro aka Cloud Boy ☁️
Building AI tools & loving the journey 😎




