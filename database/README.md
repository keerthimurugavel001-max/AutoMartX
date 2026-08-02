# 🗄️ AutoMartX – Database Schemas & Seed Data

MySQL database architecture, DDL schema scripts, and seed data for AutoMartX.

## 📌 Database Overview
- **Engine**: MySQL 8.0 (InnoDB)
- **Primary Schema**: 12 core relational tables
- **Key Tables**: `users`, `vehicles`, `vehicle_images`, `ai_price_predictions`, `ai_health_scores`, `seller_trust_scores`, `reviews`, `transactions`, `fraud_logs`

## 📁 Directory Structure
```text
database/
├── schema.sql         # Full MySQL DDL schema definitions
├── seed.sql           # Initial development seed data
└── README.md
```

## 🛠️ Usage
```bash
mysql -u root -p automartx_db < schema.sql
mysql -u root -p automartx_db < seed.sql
```
