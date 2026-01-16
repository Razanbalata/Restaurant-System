# 🍔 Restaurant Ordering System – Logic Documentation

## 📌 Project Overview
This project is a full-stack restaurant ordering system that supports:
- 🔐 **Authentication & Authorization**
- 🧑‍🍳 **Restaurant Owners (Admin)**
- 👤 **Customers**
- 📋 **Menu Management**
- 🛒 **Cart System**
- 📦 **Orders Management**

> **Note:** This document focuses only on the backend & business logic layer, excluding UI implementation.

---

## 🧠 Architecture Overview (Logic Layer)

### Tech Stack (Logic)
- **Framework:** Next.js App Router (API Routes)
- **Database:** Supabase (PostgreSQL)
- **Auth:** JWT + Cookies
- **State Management:**
  - **Server:** React Query
  - **Client:** Zustand (Cart)

---

## 🔐 Authentication & Authorization

### Authentication
- **Method:** Register / Login using email & password.
- **Storage:** JWT stored in HTTP-only cookies.
- **Helper:** `getCurrentUser(req)` extracts user info from cookies.

### Roles
- **owner:** Restaurant Owner
- **customer:** Regular User
> ⚠️ Roles are validated on the server, never trusted from client input.

### 🔒 Authorization Helper: `verifyRestaurantOwner`
`verifyRestaurantOwner(restaurantId, userId)`

**Purpose:** Ensures that the current user is the owner of a specific restaurant.

**Used In:**
- Update/Delete restaurant
- Create/Update/Delete categories
- Create/Update/Delete menu items
- Update order status (owner side)
> ❌ Never used in customer routes.

---

## 🧱 Database Schema (Logic Relevant)

### `restaurants`
- `id`, `name`, `description`, `city`, `country`, `owner_id`
- `is_active` (soft delete), `created_at`, `updated_at`

### `categories`
- `id`, `restaurant_id`, `name`, `order`
- `is_active`, `created_at`

### `menu_items`
- `id`, `category_id`, `name`, `description`, `price`
- `is_active`, `created_at`

### `orders`
- `id`, `customer_id`, `restaurant_id`, `total_price`
- `status` (pending → preparing → delivered)
- `address`, `phone`, `notes`, `created_at`

### `order_items`
- `id`, `order_id`, `menu_item_id`, `quantity`, `price`

---

## 🧑‍🍳 Owner (Admin) Logic
**Prefix:** `/api/admin/*`
All admin routes require authentication and validated ownership.

### Restaurants
- **GET** `/api/admin/restaurants`: Retrieve all restaurants owned by logged-in user.
- **POST** `/api/admin/restaurants`: Create restaurant (owner_id from session).
- **PATCH** `/api/admin/restaurants/:id`: Update restaurant (ownership verified).
- **DELETE** `/api/admin/restaurants/:id`: Soft delete (`is_active = false`).

### Menu Categories
- **GET** `/api/admin/menu/categories?restaurantId=`
- **POST** `/api/admin/menu/categories`
- **PATCH** `/api/admin/menu/categories/:id`
- **DELETE** `/api/admin/menu/categories/:id` (Soft)

### Menu Items
- **GET** `/api/admin/menu_items?categoryId=`
- **POST** `/api/admin/menu_items`
- **PATCH** `/api/admin/menu_items/:id`
- **DELETE** `/api/admin/menu_items/:id` (Soft)

---

## 👤 Customer Logic

### Public Restaurants
- **GET** `/api/restaurants`: Returns all `is_active = true` restaurants.
- **GET** `/api/restaurants/:id`: Restaurant details.

### Menu Display
- **GET** `/api/restaurants/:id/menu`
  - Returns active categories with nested active menu items.
  - Uses Supabase nested select.

---

## 🛒 Cart System (Zustand)
- **Storage:** Client-side only.
- **Constraint:** One restaurant per cart.
- **Action:** Clears after successful order.

**State Shape:**
```json
{
  "restaurantId": "uuid",
  "items": [{ "menuItemId": "uuid", "name": "Burger", "price": 10, "quantity": 1 }],
  "totalPrice": 10
}
```

---

## 📦 Orders System

### Create Order (Customer)
**POST** `/api/orders`
1. Get customer from session.
2. Validate cart.
3. Create order & insert items.
4. Clear cart.

### Get Orders
- **Customer:** `GET /api/orders?customer=true`
- **Owner:** `GET /api/orders?restaurantId=` (Ownership verified)

### Update Order Status (Owner)
**PATCH** `/api/orders/:id`
- Allowed transitions: `pending` → `preparing` → `delivered`

---

## ⚛️ React Query Hooks (Logic Layer)

| Admin Hooks | Customer Hooks |
| :--- | :--- |
| `useAdminRestaurants` | `useRestaurants` |
| `useAddRestaurant` | `useRestaurantDetails` |
| `useUpdateRestaurant` | `useRestaurantMenu` |
| `useDeleteRestaurant` | `usePlaceOrder` |
| `useAdminCategories` | `useCustomerOrders` |
| `useAdminMenuItems` | |
| `useRestaurantOrders` | |
| `useUpdateOrderStatus` | |

---

## 🔐 Security Principles Applied
- ❌ Never trust client-provided IDs for ownership.
- ✔️ Always extract user identity from cookies/session.
- ✔️ Authorization handled in API layer.
- ✔️ Soft delete instead of hard delete.
- ✔️ Role-based access enforced server-side.

---

## ✅ Logic Completion Status
- [x] Authentication
- [x] Authorization
- [x] Owner CRUD
- [x] Menu Management
- [x] Cart Logic
- [x] Orders Flow
- [x] React Query Hooks
- [x] Database Relations
