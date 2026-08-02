<p align="center">
  <img src="logo/AutoMartX_Logo.png" alt="AutoMartX Logo" width="600"/>
</p>

# 🚗 AutoMartX – AI-Powered Smart Vehicle Marketplace

> **"Buy Smart. Sell Secure. Powered by Artificial Intelligence."**

---

## 📌 Project Overview

**AutoMartX** is a next-generation AI-powered vehicle marketplace designed to make buying and selling pre-owned and new vehicles safer, smarter, and more transparent.

Unlike traditional marketplace platforms that act as passive listing boards, AutoMartX incorporates an intelligent decision-support layer directly into the buying and selling journey. Using Machine Learning models, the system estimates fair market prices, evaluates vehicle condition health scores, detects fraudulent or duplicate listings, and calculates dynamic seller trust scores before transactions occur.

---

## 🤖 Core AI Features

- 💰 **AI Fair Price Prediction**: Regression models (Scikit-learn) estimating market value ranges based on brand, model, year, mileage, and condition.
- 🩺 **AI Vehicle Health Score**: Objective 0–100 condition rating generated from vehicle specs, service history, and age parameters.
- 🚨 **Fake Listing & Fraud Detection**: Machine learning checks flagging suspicious pricing, duplicate media, or spam listings before public display.
- ⭐ **Dynamic Seller Trust Score**: Data-driven seller ratings derived from completed transactions, buyer reviews, document verification, and complaint history.
- 🎯 **Personalized Recommendation Engine**: Hybrid filtering suggesting relevant vehicles based on buyer budget, location, and search history.

---

## 🔄 User Workflow Diagram

![AutoMartX User Workflow](Problem_Statement/diagrams/AutoMartX_User_Workflow.png)

---

## 📊 Database ER Diagram

![AutoMartX Database ER Diagram](Problem_Statement/diagrams/AutoMartX_Database_ER_Diagram.png)

---

## ☁️ Hosting & Deployment Architecture Diagram

![AutoMartX Hosting & Deployment Architecture](Problem_Statement/diagrams/AutoMartX_Hosting_Deployment_Architecture.png)

---

## 🛠️ Technology Stack

| Layer | Selected Stack | Purpose / Details |
|---|---|---|
| **Frontend** | React.js + TypeScript + Tailwind CSS | Component-based UI, type safety, responsive design |
| **Backend API** | Python (FastAPI) + Uvicorn | High-performance async REST API, native Pydantic validation |
| **Database** | MySQL (InnoDB Engine) | Relational database, foreign keys, `AUTO_INCREMENT` IDs |
| **ORM / Migration** | SQLAlchemy + Alembic | Python ORM with PyMySQL driver |
| **AI / Machine Learning** | Scikit-learn + Pandas + NumPy | Regression pricing models, health scoring, fraud classification |
| **Cloud Storage** | Cloudinary | CDN-accelerated vehicle image & document hosting |
| **Location Services** | Google Maps API | Geolocation-based nearby vehicle discovery |
| **Authentication** | JWT (JSON Web Tokens) + Passlib (Bcrypt) | Stateless role-based access control (Buyer, Seller, Admin) |
| **Deployment** | Railway (Primary) / AWS (Production) | Managed edge CDN, WAF, load balancing & private networking |

---

## 📁 Repository Structure

```text
VehicleTrading/
├── README.md                          # Main project overview & documentation index
├── LICENSE                            # MIT License
├── .gitignore                         # Git exclusion rules
│
├── logo/                              # Project logo and branding assets
│   └── AutoMartX_Logo.png
│
├── Problem_Statement/                # Complete Capstone Documentation
│   ├── 00_User_Workflow.md            # Detailed user journey breakdown & diagram
│   ├── 01_Title.md                    # Project title, vision, mission & objectives
│   ├── 02_Domain.md                   # Automotive E-Commerce & AI domain specification
│   ├── 03_Who_is_the_User.md          # Buyer, Seller, and Admin personas
│   ├── 04_Problem_We_Are_Solving.md   # Core market pain points & solution mapping
│   ├── 05_Proposed_Solution.md        # Technical solution architecture & features
│   ├── 06_Core_Entities_Database_Tables.md # Full MySQL DDL schema (12 tables)
│   ├── 07_User_Roles_And_Permissions.md # Role-Based Access Control (RBAC) matrix
│   ├── 08_Success_Criteria.md         # Functional, AI, & performance benchmarks
│   ├── 09_Out_Of_Scope.md             # Version 1.0 scope boundaries & exclusions
│   ├── 10_Chosen_Track.md             # Stack rationale & Railway/AWS hosting setup
│   └── diagrams/                      # System diagrams & architecture assets
│       ├── AutoMartX_Logo.png
│       ├── AutoMartX_User_Workflow.png
│       ├── AutoMartX_Database_ER_Diagram.png
│       └── AutoMartX_Hosting_Deployment_Architecture.png
│
├── backend/                           # FastAPI Backend Service
│   ├── main.py                        # FastAPI application entry point
│   ├── config.py                      # App settings & MySQL database URL
│   ├── requirements.txt               # Python package dependencies
│   ├── Dockerfile                     # Container deployment image
│   ├── render.yaml                    # Platform deployment specification
│   └── .dockerignore                  # Docker build context exclusions
│
├── frontend/                          # React + TypeScript Web Application
├── database/                          # Migration scripts & SQL seed data
└── VT-Doc/                            # Additional project documentation assets
```

---

## 📑 Project Documentation Index

Explore the complete specification in the [`Problem_Statement/`](Problem_Statement) directory:

- [00_User_Workflow.md](Problem_Statement/00_User_Workflow.md)
- [01_Title.md](Problem_Statement/01_Title.md)
- [02_Domain.md](Problem_Statement/02_Domain.md)
- [03_Who_is_the_User.md](Problem_Statement/03_Who_is_the_User.md)
- [04_Problem_We_Are_Solving.md](Problem_Statement/04_Problem_We_Are_Solving.md)
- [05_Proposed_Solution.md](Problem_Statement/05_Proposed_Solution.md)
- [06_Core_Entities_Database_Tables.md](Problem_Statement/06_Core_Entities_Database_Tables.md)
- [07_User_Roles_And_Permissions.md](Problem_Statement/07_User_Roles_And_Permissions.md)
- [08_Success_Criteria.md](Problem_Statement/08_Success_Criteria.md)
- [09_Out_Of_Scope.md](Problem_Statement/09_Out_Of_Scope.md)
- [10_Chosen_Track.md](Problem_Statement/10_Chosen_Track.md)

---

## 🚀 Quick Start Guide

### Backend Setup (FastAPI + MySQL)

1. **Navigate to the backend folder**:
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment**:
   ```bash
   python -m venv venv
   # Windows:
   .\venv\Scripts\activate
   # Linux/Mac:
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**:
   Create a `.env` file inside `backend/`:
   ```env
   DATABASE_URL=mysql+pymysql://root:password@localhost:3306/automartx_db
   SECRET_KEY=your_jwt_secret_key_here
   ```

5. **Run the FastAPI server**:
   ```bash
   uvicorn main:app --reload
   ```
   Access the API docs at `http://localhost:8000/docs`.

---

## ☁️ Deployment Strategy

AutoMartX uses a **public/private isolated network architecture** on **Railway**:
- **Public Zone**: React Frontend (protected by Railway Edge CDN, WAF, and Load Balancer)
- **Private Zone**: FastAPI Backend API & MySQL Database (connected via Railway Private Networking, unexposed to public ports)

*Production AWS alternative documented in [10_Chosen_Track.md](Problem_Statement/10_Chosen_Track.md).*

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
