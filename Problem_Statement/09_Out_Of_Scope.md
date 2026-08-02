# 09. Out of Scope

# 🚗 AutoMartX – AI-Powered Smart Vehicle Marketplace

---

## Overview

This document clearly defines what is **intentionally excluded** from AutoMartX Version 1.0. Setting explicit boundaries ensures the team focuses on delivering a stable, high-quality core product rather than spreading effort across an unbounded feature set. Items listed here may be considered for future versions.

---

## Excluded Features (v1.0)

### 💳 Vehicle Loan Approval
Integration with banks or financial institutions to process vehicle loan applications is not included. Buyers requiring financing must arrange it outside the platform.

### 🛡️ Insurance Processing
The platform will not facilitate vehicle insurance purchase, renewal, or claims. Insurance remains the responsibility of the buyer/seller outside AutoMartX.

### 📜 Ownership Transfer via RTO (Regional Transport Office)
Legal ownership transfer, registration updates, and RTO paperwork are government processes handled outside the platform. AutoMartX only facilitates the buyer-seller connection.

### 📍 Live GPS Vehicle Tracking
Real-time GPS tracking of vehicles (e.g., for test drives or after purchase) is not part of this version. Location features are limited to static "nearby vehicle discovery" based on listed location.

### 🔨 Online Vehicle Auctions
Auction-based bidding systems for vehicle sales are not supported. All transactions follow a fixed-price listing model.

### ₿ Cryptocurrency Payments
Payment processing in general is limited in v1.0 (see below), and cryptocurrency as a payment method is explicitly excluded.

### 🎨 AI Image Generation for Advertisements
AutoMartX does not generate synthetic vehicle images or AI-created marketing content. Sellers must upload real, original vehicle photographs.

### 🚙 Autonomous Vehicle Integration
Features related to autonomous/self-driving vehicle technology are unrelated to the platform's marketplace purpose and are excluded.

---

## Additional Exclusions

### 💰 Full Payment Gateway Integration
While a `Payments` table is reserved in the database schema for future use, actual in-platform payment processing (credit card, UPI, net banking) is **not implemented** in v1.0. Transactions are arranged directly between buyer and seller after platform-facilitated contact.

### 📱 Native Mobile Applications
v1.0 delivers a responsive web application only (React.js + Tailwind CSS). Dedicated native iOS/Android apps are not part of this scope.

### 🌍 Multi-Language / Internationalization Support
The platform will be built and delivered in English only for v1.0. Multi-language support is not included.

### 🤝 Multi-Seller Dealership Management Tools
Advanced dealership-specific tools (bulk listing uploads, team accounts, inventory management systems) for large-scale dealers are excluded. The platform supports individual seller accounts only.

### 📈 Advanced Business Intelligence / Predictive Market Analytics
Beyond individual vehicle price prediction, broader market trend forecasting, investment analytics, or industry-wide reporting tools are excluded.

### 🗣️ In-App Voice/Video Calling
Communication between buyers and sellers is limited to text-based messaging/enquiries. Voice or video calling features are not included.

### 🔄 Vehicle Exchange / Trade-In System
The ability to trade in an old vehicle as part of a new purchase is not supported in this version.

---

## Rationale for Exclusions

| Reason | Explanation |
|---|---|
| Scope Control | Keeps v1.0 focused, deliverable, and testable within project timelines |
| Legal/Regulatory Complexity | Features like RTO transfer, loans, and insurance involve regulatory processes beyond a single platform's control |
| Technical Complexity | Real-time GPS tracking, payment gateways, and AI image generation require significant additional infrastructure and security considerations |
| Core Value Focus | Excluded features do not directly address the core problems (pricing transparency, fraud, trust) the project aims to solve |

---

## Future Scope Consideration

While excluded from v1.0, the following items are structurally anticipated for future versions:

- Payment gateway integration (database schema already reserved)
- Dealer/business account tier with bulk listing tools
- Native mobile applications
- Multi-language support
- Basic in-app calling/video inspection feature

---

## Summary

> Defining what AutoMartX **does not** do in v1.0 is as important as defining what it does. This boundary ensures the team delivers a focused, functional, and high-quality marketplace centered on AI-powered pricing, trust, and fraud detection — without overextending into unrelated or overly complex feature areas.
