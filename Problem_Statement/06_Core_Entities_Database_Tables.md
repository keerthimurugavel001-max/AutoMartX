# 06. Core Entities / Database Tables

# 🚗 AutoMartX – AI-Powered Smart Vehicle Marketplace

---

## Overview

This document defines the core database entities that power AutoMartX. The schema is designed for **MySQL** using **SQLAlchemy ORM** (with PyMySQL driver), and supports all buyer, seller, administrator, and AI-driven features described in the platform.

---

## Entity Relationship Summary

![AutoMartX - Database ER Diagram](diagrams/AutoMartX_Database_ER_Diagram.png)

```
Users ──┬── Vehicles ──┬── Vehicle_Images
        │              ├── AI_Predictions
        │              ├── Bookings
        │              ├── Wishlist
        │              └── Reviews
        │
        ├── Seller_Verification
        ├── Notifications
        └── Reports
```

---

## 1. Users

Stores all registered accounts — buyers, sellers, and administrators.

| Column | Type | Description |
|---|---|---|
| id | INT (PK, Auto Increment) | Unique user identifier |
| name | VARCHAR(150) | Full name of the user |
| email | VARCHAR(150) (Unique) | Login email |
| password_hash | VARCHAR(255) | Encrypted password |
| role | ENUM('buyer','seller','admin') | Defines user permissions |
| phone_number | VARCHAR(20) | Contact number |
| profile_image | VARCHAR(255) | Cloudinary image link |
| is_verified | BOOLEAN | Whether identity/documents are verified |
| trust_score | FLOAT | Seller trust rating (nullable for buyers) |
| created_at | TIMESTAMP | Account creation date |
| updated_at | TIMESTAMP | Last profile update |

---

## 2. Categories

Defines vehicle categories for organization and filtering.

| Column | Type | Description |
|---|---|---|
| id | INT (PK, Auto Increment) | Unique category identifier |
| name | VARCHAR(100) | Category name (e.g., SUV, Sedan, Bike) |
| description | TEXT | Optional category description |

---

## 3. Vehicles

Stores all vehicle listings created by sellers.

| Column | Type | Description |
|---|---|---|
| id | INT (PK, Auto Increment) | Unique vehicle identifier |
| seller_id | INT (FK → Users.id) | Owner/seller of the listing |
| category_id | INT (FK → Categories.id) | Vehicle category |
| brand | VARCHAR(100) | Vehicle brand (e.g., Honda) |
| model | VARCHAR(100) | Vehicle model |
| manufacture_year | INT | Year of manufacture |
| fuel_type | ENUM('petrol','diesel','electric','hybrid') | Fuel type |
| transmission | ENUM('manual','automatic') | Transmission type |
| kilometers_driven | INT | Odometer reading |
| condition | ENUM('excellent','good','fair','poor') | Seller-declared condition |
| price | DECIMAL(12,2) | Listed asking price |
| description | TEXT | Seller's description |
| location | VARCHAR(255) | Vehicle location for nearby search |
| status | ENUM('pending','approved','rejected','sold') | Moderation/listing status |
| created_at | TIMESTAMP | Listing creation date |
| updated_at | TIMESTAMP | Last edit date |

---

## 4. Vehicle_Images

Stores multiple images per vehicle listing.

| Column | Type | Description |
|---|---|---|
| id | INT (PK, Auto Increment) | Unique image identifier |
| vehicle_id | INT (FK → Vehicles.id) | Associated vehicle |
| image_url | VARCHAR(255) | Cloudinary image URL |
| is_primary | BOOLEAN | Marks the main display image |
| uploaded_at | TIMESTAMP | Upload date |

---

## 5. Bookings

Stores buyer-scheduled vehicle inspections.

| Column | Type | Description |
|---|---|---|
| id | INT (PK, Auto Increment) | Unique booking identifier |
| buyer_id | INT (FK → Users.id) | Buyer who booked the inspection |
| vehicle_id | INT (FK → Vehicles.id) | Vehicle to be inspected |
| booking_date | TIMESTAMP | Scheduled inspection date/time |
| status | ENUM('pending','confirmed','completed','cancelled') | Booking status |
| notes | TEXT | Optional buyer notes |
| created_at | TIMESTAMP | Booking creation date |

---

## 6. Wishlist

Stores vehicles saved by buyers for later review.

| Column | Type | Description |
|---|---|---|
| id | INT (PK, Auto Increment) | Unique wishlist entry identifier |
| buyer_id | INT (FK → Users.id) | Buyer who saved the vehicle |
| vehicle_id | INT (FK → Vehicles.id) | Saved vehicle |
| added_at | TIMESTAMP | Date added to wishlist |

---

## 7. Reviews

Stores buyer feedback after a completed transaction.

| Column | Type | Description |
|---|---|---|
| id | INT (PK, Auto Increment) | Unique review identifier |
| buyer_id | INT (FK → Users.id) | Reviewer |
| seller_id | INT (FK → Users.id) | Reviewed seller |
| vehicle_id | INT (FK → Vehicles.id) | Related vehicle transaction |
| rating | INT (1–5) | Star rating |
| comment | TEXT | Review text |
| created_at | TIMESTAMP | Review submission date |

---

## 8. Seller_Verification

Stores seller identity and ownership document verification records.

| Column | Type | Description |
|---|---|---|
| id | INT (PK, Auto Increment) | Unique verification record identifier |
| seller_id | INT (FK → Users.id) | Seller being verified |
| document_type | ENUM('id_proof','ownership_proof','business_license') | Type of document |
| document_url | VARCHAR(255) | Uploaded document link |
| verification_status | ENUM('pending','approved','rejected') | Admin review status |
| reviewed_by | INT (FK → Users.id) | Admin who reviewed it |
| reviewed_at | TIMESTAMP | Review completion date |

---

## 9. AI_Predictions

Stores AI-generated analysis results per vehicle.

| Column | Type | Description |
|---|---|---|
| id | INT (PK, Auto Increment) | Unique prediction record identifier |
| vehicle_id | INT (FK → Vehicles.id) | Related vehicle |
| predicted_price_min | DECIMAL(12,2) | Lower bound of predicted price range |
| predicted_price_max | DECIMAL(12,2) | Upper bound of predicted price range |
| price_confidence_score | FLOAT | Confidence percentage of price prediction |
| health_score | INT (0–100) | AI-estimated vehicle condition score |
| fraud_risk_level | ENUM('low','medium','high') | Fake listing risk assessment |
| generated_at | TIMESTAMP | Date the prediction was generated |

---

## 10. Notifications

Stores system-generated alerts for users.

| Column | Type | Description |
|---|---|---|
| id | INT (PK, Auto Increment) | Unique notification identifier |
| user_id | INT (FK → Users.id) | Recipient |
| type | ENUM('enquiry','booking','listing_approval','price_change','system') | Notification category |
| message | TEXT | Notification content |
| is_read | BOOLEAN | Read/unread status |
| created_at | TIMESTAMP | Notification creation date |

---

## 11. Reports

Stores buyer/seller complaints about listings or users.

| Column | Type | Description |
|---|---|---|
| id | INT (PK, Auto Increment) | Unique report identifier |
| reported_by | INT (FK → Users.id) | User who filed the report |
| reported_vehicle_id | INT (FK → Vehicles.id, nullable) | Reported listing, if applicable |
| reported_user_id | INT (FK → Users.id, nullable) | Reported user, if applicable |
| reason | TEXT | Reason for the report |
| status | ENUM('open','under_review','resolved','dismissed') | Report handling status |
| created_at | TIMESTAMP | Report submission date |

---

## 12. Payments (Future Scope)

Reserved for future booking/transaction payment processing. Not implemented in v1.0.

| Column | Type | Description |
|---|---|---|
| id | INT (PK, Auto Increment) | Unique payment identifier |
| booking_id | INT (FK → Bookings.id) | Related booking |
| amount | DECIMAL(12,2) | Payment amount |
| status | ENUM('pending','completed','failed','refunded') | Payment status |
| payment_method | VARCHAR(50) | Payment method used |
| created_at | TIMESTAMP | Payment date |

---

## Relationships Summary

| Relationship | Type |
|---|---|
| Users → Vehicles | One-to-Many (a seller can list many vehicles) |
| Vehicles → Vehicle_Images | One-to-Many |
| Vehicles → AI_Predictions | One-to-One |
| Users → Bookings | One-to-Many (as buyer) |
| Vehicles → Bookings | One-to-Many |
| Users → Wishlist → Vehicles | Many-to-Many (via Wishlist) |
| Users → Reviews | One-to-Many (as buyer and as seller) |
| Users → Seller_Verification | One-to-One |
| Users → Notifications | One-to-Many |
| Users → Reports | One-to-Many (as reporter) |

---

## SQL Schema (MySQL)

The following `CREATE TABLE` statements define the actual database schema, including primary keys, foreign keys, and constraints.

```sql
-- 1. USERS
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('buyer', 'seller', 'admin') NOT NULL,
    phone_number VARCHAR(20),
    profile_image VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    trust_score FLOAT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. CATEGORIES
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
) ENGINE=InnoDB;

-- 3. VEHICLES
CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seller_id INT NOT NULL,
    category_id INT,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    manufacture_year INT NOT NULL,
    fuel_type ENUM('petrol', 'diesel', 'electric', 'hybrid'),
    transmission ENUM('manual', 'automatic'),
    kilometers_driven INT NOT NULL,
    `condition` ENUM('excellent', 'good', 'fair', 'poor'),
    price DECIMAL(12, 2) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    status ENUM('pending', 'approved', 'rejected', 'sold') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 4. VEHICLE_IMAGES
CREATE TABLE vehicle_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. BOOKINGS
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    booking_date TIMESTAMP NOT NULL,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. WISHLIST
CREATE TABLE wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_wishlist_entry (buyer_id, vehicle_id),
    FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7. REVIEWS
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_id INT NOT NULL,
    seller_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 8. SELLER_VERIFICATION
CREATE TABLE seller_verification (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seller_id INT NOT NULL,
    document_type ENUM('id_proof', 'ownership_proof', 'business_license'),
    document_url VARCHAR(255) NOT NULL,
    verification_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    reviewed_by INT,
    reviewed_at TIMESTAMP NULL,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 9. AI_PREDICTIONS
CREATE TABLE ai_predictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT NOT NULL,
    predicted_price_min DECIMAL(12, 2),
    predicted_price_max DECIMAL(12, 2),
    price_confidence_score FLOAT,
    health_score INT CHECK (health_score BETWEEN 0 AND 100),
    fraud_risk_level ENUM('low', 'medium', 'high'),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 10. NOTIFICATIONS
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('enquiry', 'booking', 'listing_approval', 'price_change', 'system'),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 11. REPORTS
CREATE TABLE reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reported_by INT NOT NULL,
    reported_vehicle_id INT,
    reported_user_id INT,
    reason TEXT NOT NULL,
    status ENUM('open', 'under_review', 'resolved', 'dismissed') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reported_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reported_vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    FOREIGN KEY (reported_user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 12. PAYMENTS (Future Scope)
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
) ENGINE=InnoDB;
```

---

## Database Connection Configuration

```python
# SQLAlchemy connection string format for MySQL
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://<username>:<password>@<host>:<port>/<database_name>"

# Example
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

## Why This Schema Design

- **Normalized structure** avoids data duplication (e.g., images and predictions stored separately from core vehicle data).
- **AI_Predictions as a separate table** keeps AI-generated data decoupled from core listing data, making it easy to regenerate or version predictions.
- **Role-based Users table** simplifies authentication while supporting three distinct user types through a single `role` field.
- **AUTO_INCREMENT integer IDs** keep joins and indexing fast and simple, well-suited to MySQL's InnoDB engine.
- **ON DELETE CASCADE** on child tables ensures related records (images, bookings, reviews) are cleaned up automatically if a parent vehicle or user is removed.
- **ENUM types** on status/role/condition-style columns enforce data integrity directly at the database level.
- **Reports and Seller_Verification tables** directly support the trust-and-safety features central to solving the platform's core problem.
- **Payments table reserved but excluded from v1.0** keeps the initial scope focused while allowing straightforward future expansion.
