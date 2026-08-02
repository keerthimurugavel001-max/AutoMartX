# ⚙️ AutoMartX – Backend Service

FastAPI-powered REST API backend for AutoMartX vehicle marketplace.

## 🚀 Stack
- **Framework**: FastAPI + Uvicorn
- **ORM**: SQLAlchemy + Alembic
- **Database**: MySQL 8.0+
- **AI/ML**: Scikit-learn, Pandas, NumPy
- **Auth**: JWT (JSON Web Tokens) + Passlib (Bcrypt)

## 📁 Directory Structure
```text
backend/
├── main.py            # FastAPI entry point
├── config.py          # Environment settings
├── requirements.txt   # Dependencies
├── app/               # Application modules
│   ├── api/           # API routes (auth, vehicles, ai, users)
│   ├── core/          # Security & config
│   ├── models/        # SQLAlchemy database models
│   └── services/      # AI models & business logic
└── README.md
```

## 🛠️ Local Development
```bash
python -m venv venv
source venv/bin/activate # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
