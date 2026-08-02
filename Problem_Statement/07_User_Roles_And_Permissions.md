# 07. User Roles & Permissions

# 🚗 AutoMartX – AI-Powered Smart Vehicle Marketplace

---

## Overview

AutoMartX implements **role-based access control (RBAC)** with three distinct roles: **Buyer**, **Seller**, and **Administrator**. Each role is granted a specific set of permissions that determine what actions a user can perform within the platform, ensuring both usability and platform security.

---

## Role Hierarchy

```
Administrator  →  Full platform control
      │
Seller         →  Manages own listings + buyer interactions
      │
Buyer          →  Browses, evaluates, and purchases vehicles
```

> Note: A single user account is assigned exactly one role (`buyer`, `seller`, or `admin`) via the `role` field in the Users table. Sellers do not automatically gain buyer-only wishlist/review features unless explicitly enabled — the platform treats seller and buyer as separate operational contexts even if the same person holds both roles via separate accounts.

---

## 👤 Buyer Permissions

| Permission | Access |
|---|---|
| Register / Login | ✅ |
| Browse & search vehicles | ✅ |
| Use advanced filters | ✅ |
| Compare vehicles | ✅ |
| Save vehicles to wishlist | ✅ |
| Contact sellers | ✅ |
| Book vehicle inspections | ✅ |
| View AI Price Prediction | ✅ |
| View AI Vehicle Health Score | ✅ |
| View Seller Trust Score | ✅ |
| Receive personalized recommendations | ✅ |
| Submit reviews (post-purchase only) | ✅ |
| Create vehicle listings | ❌ |
| Edit/delete any listing | ❌ |
| Access admin dashboard | ❌ |
| Verify other sellers | ❌ |

**Restrictions:** A buyer can only edit their own profile, bookings, wishlist, and reviews. They cannot modify vehicle listings or access other users' private data.

---

## 🚘 Seller Permissions

| Permission | Access |
|---|---|
| Register / Login | ✅ |
| Create vehicle listings | ✅ |
| Edit own listings | ✅ |
| Delete own listings | ✅ |
| Upload vehicle images | ✅ |
| View bookings on own listings | ✅ |
| Respond to buyer enquiries | ✅ |
| View own listing analytics | ✅ |
| Receive AI listing improvement suggestions | ✅ |
| Submit ownership documents for verification | ✅ |
| View own Trust Score | ✅ |
| Browse other listings (as a buyer would) | ✅ |
| Edit/delete other sellers' listings | ❌ |
| Approve/reject own listings | ❌ (requires admin approval) |
| Access admin dashboard | ❌ |
| View other sellers' private analytics | ❌ |

**Restrictions:** Sellers can only manage their own listings and cannot self-approve them — every new or edited listing goes through administrator moderation before going live. Sellers cannot view or modify another seller's data.

---

## 🛡️ Administrator Permissions

| Permission | Access |
|---|---|
| Manage all user accounts (buyers & sellers) | ✅ |
| Verify/reject seller documents | ✅ |
| Approve/reject vehicle listings | ✅ |
| Remove fraudulent or duplicate listings | ✅ |
| View platform-wide analytics dashboard | ✅ |
| Manage vehicle categories | ✅ |
| Handle and resolve reported listings/users | ✅ |
| Monitor platform activity logs | ✅ |
| Generate business/usage reports | ✅ |
| Review AI fraud detection alerts | ✅ |
| Suspend or ban user accounts | ✅ |
| Override/edit any listing if necessary | ✅ |
| Create vehicle listings on behalf of a seller | ❌ (out of scope for v1.0) |
| Make purchases as a buyer | ❌ (separate buyer account required) |

**Restrictions:** Administrators have full moderation and management authority but do not participate in the marketplace as buyers or sellers through their admin account, keeping platform oversight impartial.

---

## Permission Matrix (Comparative View)

| Action | Buyer | Seller | Admin |
|---|:---:|:---:|:---:|
| Register/Login | ✅ | ✅ | ✅ |
| Browse vehicles | ✅ | ✅ | ✅ |
| Create listing | ❌ | ✅ | ✅ (override only) |
| Approve listing | ❌ | ❌ | ✅ |
| Book inspection | ✅ | ❌ | ❌ |
| Manage own bookings | ✅ | ✅ (view only) | ✅ |
| Wishlist vehicles | ✅ | ❌ | ❌ |
| Submit review | ✅ | ❌ | ❌ |
| View AI Price Prediction | ✅ | ✅ | ✅ |
| View AI Fraud Risk | ❌ | ❌ | ✅ |
| Verify sellers | ❌ | ❌ | ✅ |
| Manage categories | ❌ | ❌ | ✅ |
| Handle reports | ❌ | ❌ | ✅ |
| Ban/suspend accounts | ❌ | ❌ | ✅ |
| View platform analytics | ❌ | Own listings only | ✅ Full access |

---

## Authentication & Authorization Approach

- **Authentication:** JWT (JSON Web Token) based login, issued upon successful email/password verification.
- **Authorization:** Each API endpoint checks the `role` claim embedded in the JWT before granting access — implemented via middleware/dependency checks in FastAPI.
- **Ownership checks:** Beyond role checks, endpoints such as "edit listing" or "view booking" additionally verify that the requesting user owns the resource (e.g., `seller_id == current_user.id`) before allowing the action.

Example authorization flow:

```
Request → JWT Validation → Role Check → Ownership Check → Action Allowed/Denied
```

---

## Why Role-Based Access Control Matters

- **Security:** Prevents buyers or sellers from accessing administrative functions or each other's private data.
- **Data Integrity:** Ensures only authorized users can approve listings, verify sellers, or moderate content.
- **Trust:** Reinforces the platform's core goal — a safe, fraud-resistant marketplace — by strictly separating who can create, approve, and moderate content.
- **Scalability:** A clean role structure makes it straightforward to introduce additional roles (e.g., "Dealer" or "Support Agent") in future versions without redesigning the permission system.
