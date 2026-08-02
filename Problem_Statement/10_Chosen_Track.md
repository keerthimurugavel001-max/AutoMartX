# 10. Chosen Track

# 🚗 AutoMartX – AI-Powered Smart Vehicle Marketplace

---

## Overview

This document outlines the technology stack, tools, and development track chosen to build AutoMartX. The stack was selected to balance performance, scalability, developer productivity, and the ability to integrate AI/ML features effectively within a full-stack web application.

---

## Selected Track

**Full-Stack Web Application with Integrated AI/ML Services**

AutoMartX follows a modern three-tier architecture: a React-based frontend, a Python/FastAPI backend, and a MySQL database, with AI/ML models integrated directly into the backend service layer.

---

## Technology Stack

### 🖥️ Backend

| Technology | Purpose |
|---|---|
| Python | Core backend programming language |
| FastAPI | High-performance REST API framework |
| SQLAlchemy | ORM for database modeling and queries |
| PyMySQL | MySQL database driver for Python |
| Pydantic | Data validation and serialization |
| Uvicorn | ASGI server for running FastAPI |

**Why FastAPI:** Chosen for its high performance, automatic OpenAPI/Swagger documentation, native async support, and strong integration with Python's AI/ML ecosystem — making it ideal for a platform combining API services with AI-driven features.

---

### 🎨 Frontend

| Technology | Purpose |
|---|---|
| React.js | Component-based UI library |
| TypeScript | Type-safe JavaScript for fewer runtime errors |
| Tailwind CSS | Utility-first CSS framework for responsive design |

**Why React + TypeScript:** Provides a scalable, maintainable frontend architecture with strong type safety, widely supported tooling, and a component model well-suited to a feature-rich marketplace UI (listings, filters, dashboards, maps).

---

### 🗄️ Database

| Technology | Purpose |
|---|---|
| MySQL | Primary relational database |

**Why MySQL:** Chosen for its wide hosting support, simple setup and configuration, strong community documentation, reliable performance on read-heavy marketplace workloads (browsing/searching vehicles), and seamless integration with SQLAlchemy via PyMySQL.

---

### 🔐 Authentication & Security

| Technology | Purpose |
|---|---|
| JWT (JSON Web Tokens) | Stateless user authentication |
| Passlib / bcrypt | Password hashing |

**Why JWT:** Enables stateless, scalable authentication across the Buyer, Seller, and Admin roles without server-side session storage, simplifying horizontal scaling.

---

### ☁️ Cloud Storage

| Technology | Purpose |
|---|---|
| Cloudinary | Vehicle image and document storage/delivery |

**Why Cloudinary:** Handles image upload, optimization, and CDN delivery out of the box, removing the need to manage raw file storage infrastructure directly. Used across both hosting options below.

---

### 🗺️ Location Services

| Technology | Purpose |
|---|---|
| Google Maps API | Nearby vehicle discovery and location display |

**Why Google Maps API:** Industry-standard, reliable geolocation and mapping service with strong documentation and broad platform support.

---

### 🤖 Artificial Intelligence / Machine Learning

| Technology | Purpose |
|---|---|
| Scikit-learn | ML models for price prediction and health scoring |
| Pandas | Data processing and feature engineering |
| NumPy | Numerical computation supporting ML pipelines |

**Why Scikit-learn:** Provides well-tested, production-ready implementations of regression and classification algorithms suitable for price prediction, health scoring, and fraud risk classification — without the overhead of deep learning frameworks unnecessary for this scope.

---

## Deployment & Hosting

AutoMartX is deployed on **Railway**, using a public/private network architecture: only the frontend is exposed to the internet, while the backend and database run on Railway's private network. Edge-level CDN, WAF, and load balancing protect and optimize all public-facing traffic. An AWS-based stack is documented as the production-grade alternative.

### ✅ Primary Hosting: Railway (Public/Private Split)

![AutoMartX - Hosting & Deployment Architecture](file:///C:/Users/sthar/OneDrive/Desktop/New%20folder/VehicleTrading/Problem_Statement/diagrams/AutoMartX_Hosting_Deployment_Architecture.png)

| Component | Zone | Platform | Notes |
|---|---|---|---|
| CDN | Edge | Railway CDN | Caches static assets/HTML at edge locations; free on all plans, enabled per service |
| WAF | Edge | Railway WAF (Under Attack Mode) | DDoS/bot protection via browser challenge during active incidents |
| Load Balancer | Edge | Railway Edge Network | Automatically distributes traffic across horizontally scaled replicas |
| Frontend (React) | **Public** | Railway service (public domain) | Only publicly internet-facing component |
| Backend (FastAPI) | **Private** | Railway service (private networking) | No direct public internet access; reached only via internal network |
| MySQL Database | **Private** | Railway MySQL (private networking) | No direct public internet access; reached only by backend |
| Image Storage | External | Cloudinary | Free tier, called from backend |
| Location Services | External | Google Maps API | Called from frontend/backend |

**Why this architecture:**
- Keeps the attack surface minimal — only the frontend is reachable from the internet.
- CDN and WAF filter and cache traffic at the edge before it reaches application services.
- Load balancing across replicas is automatic, with no manual configuration.
- Private networking between frontend, backend, and database removes the need to expose internal APIs or database ports publicly.

---

### 🏗️ Production Alternative: AWS Stack

| Component | Zone | AWS Service |
|---|---|---|
| CDN | Edge | CloudFront |
| WAF | Edge | AWS WAF |
| Load Balancer | Edge | Application Load Balancer (ALB) |
| Frontend | Public | S3 + CloudFront |
| Backend | Private (private subnet) | EC2 (Docker) or Elastic Beanstalk |
| Database | Private (private subnet) | RDS for MySQL |

**Why this option:** Demonstrates enterprise-grade cloud architecture using VPC-level public/private subnet isolation, matching the same security principle used on Railway but with finer-grained infrastructure control. Better suited to a production launch scenario or if evaluation criteria specifically require AWS.

**Trade-off:** Requires manual setup of VPCs, subnets, security groups, IAM roles, ALB target groups, and RDS configuration — significantly more DevOps overhead than Railway's managed private networking.

---

### Deployment Decision Summary

| Criteria | Railway (Primary) | AWS (Alternative) |
|---|---|---|
| Setup time | Minutes | Hours |
| Cost | Free tier available; Hobby plan $5/mo minimum for full-stack + DB | Free tier (12 months), then pay-as-you-go |
| DevOps complexity | Low | Moderate–High |
| Auto-deploy from GitHub | ✅ Built-in | ⚙️ Requires manual CI/CD setup |
| Best for | Development, demo, capstone submission | Production launch, enterprise scalability |

> **Chosen approach:** AutoMartX is deployed on **Railway**, with the frontend publicly exposed behind Railway's **CDN, WAF, and load balancer**, and the **backend and MySQL database isolated on private networking**. The **AWS stack (CloudFront + WAF + ALB + private VPC subnets)** is documented as the scalable production alternative.

---

## System Architecture Overview

```
┌─────────────────────┐
│   React + TS + Tailwind   │   ← Frontend (Vercel/Netlify, or S3+CloudFront)
└───────────┬──────────┘
            │ REST API (HTTPS/JWT)
┌───────────▼──────────┐
│      FastAPI Backend      │   ← Render/Railway, or EC2/Elastic Beanstalk
│  ┌─────────────────┐  │
│  │ Scikit-learn Models │  │   ← Price / Health / Fraud AI
│  └─────────────────┘  │
└───────────┬──────────┘
            │ SQLAlchemy ORM (PyMySQL)
┌───────────▼──────────┐
│         MySQL DB          │   ← Railway/PlanetScale/Aiven, or AWS RDS
└──────────────────────┘

External Services: Cloudinary (images) · Google Maps API (location)
Containerization: Docker (used in both hosting options)
```

---

## Database Connection Configuration

```python
# SQLAlchemy connection string format for MySQL
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://<username>:<password>@<host>:<port>/<database_name>"

# Example (Railway/PlanetScale/local)
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:password@localhost:3306/automartx_db"
```

```
# requirements.txt (relevant entries)
fastapi
uvicorn
sqlalchemy
pymysql
pydantic
```

---

## Why This Track Was Chosen

- **Full-stack breadth:** Covers frontend, backend, database, AI/ML, and cloud deployment — demonstrating end-to-end development capability.
- **Python-centric AI integration:** Using Python across both the backend (FastAPI) and AI layer (Scikit-learn) avoids the complexity of cross-language ML service calls.
- **Industry-relevant stack:** React, FastAPI, MySQL, Docker, and cloud hosting are widely used in real-world production systems, making the skills and project directly transferable.
- **Flexible deployment strategy:** Documenting both a free-tier stack and an AWS stack shows awareness of trade-offs between rapid development and enterprise-scale infrastructure.
- **Scalability:** The chosen stack supports horizontal scaling (stateless JWT auth, containerized services) whether deployed on free-tier platforms or migrated to AWS.
- **Balanced complexity:** Scikit-learn-based ML models are appropriately scoped for the price prediction, health scoring, and fraud detection use cases without requiring heavy deep learning infrastructure.

---

## Summary

> AutoMartX is built on a **Python (FastAPI) + React (TypeScript) + MySQL** full-stack foundation, enhanced with **Scikit-learn-based AI services**. It is deployed using a **free/low-cost stack (Vercel, Render/Railway, Railway MySQL/PlanetScale)** for development and demonstration, with **AWS (S3+CloudFront, EC2/Elastic Beanstalk, RDS)** documented as the production-grade scaling path.
