# 🍽️ Restaurant Ordering System

A comprehensive full-stack restaurant management and ordering platform built with modern web technologies. The system supports two distinct user roles: customers and restaurant owners, with complete authentication, menu management, cart functionality, and real-time order processing.

**Status:** In Development • **Version:** 0.1.0

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Authentication System](#authentication-system)
- [Security Practices](#security-practices)
- [Contributing](#contributing)
- [License](#license)

---

## 📌 Overview

This is a modern, full-stack restaurant ordering system that enables:

- **Customers** to browse restaurants, view menus, add items to cart, and place orders
- **Restaurant Owners** to manage their restaurants, menus, categories, and handle orders in real-time
- **Real-time Updates** using Supabase Realtime subscriptions
- **AI-Powered Menu Generation** using Google Gemini AI

The application follows a clean architecture with separation of concerns, using Next.js App Router for both frontend and API routes.

---

## ✨ Features

### For Customers

| Feature | Description |
|---------|-------------|
| Restaurant Browsing | Browse and search available restaurants by city and name |
| Menu Viewing | View restaurant menus with categories and items |
| Shopping Cart | Add/remove items, update quantities, view total |
| Order Placement | Place orders with special instructions |
| Order Tracking | View order history and current order status |
| Account Management | Register, login, and manage profile |

### For Restaurant Owners

| Feature | Description |
|---------|-------------|
| Restaurant Management | Create, update, and soft-delete restaurants |
| Menu Management | Manage categories and menu items |
| AI Menu Generation | Generate menu items using Google Gemini AI |
| Order Management | View and update order status in real-time |
| Dashboard | View statistics and pending orders |

### General Features

- **Authentication & Authorization** - JWT-based with role-based access control
- **Dark/Light Theme** - System-wide theme switching
- **Responsive Design** - Mobile-first approach
- **Real-time Updates** - Live order status updates via Supabase
- **Internationalization Ready** - Built with next-intl support

---

## 🛠️ Tech Stack

### Core Technologies

| Technology | Version | Description |
|------------|---------|-------------|
| **Next.js** | 16.1.1 | React framework with App Router |
| **React** | 19.2.3 | UI library |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Tailwind CSS** | 4.1.18 | Utility-first CSS framework |

### UI Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| **Material-UI (@mui)** | 7.3.6 | React component library |
| **Emotion** | 11.14.x | CSS-in-JS styling |
| **Framer Motion** | 12.31.2 | Animations |
| **Lucide React** | 0.562.0 | Icon library |
| **Tabler Icons** | 3.36.1 | Additional icons |
| **Sonner** | 2.0.7 | Toast notifications |

### State Management & Data Fetching

| Library | Version | Purpose |
|---------|---------|---------|
| **React Query** | 5.90.16 | Server state management |
| **Zustand** | 5.0.10 | Client-side state (Cart) |
| **React Hook Form** | 7.70.0 | Form handling |
| **Zod** | 4.3.5 | Schema validation |

### Backend & Database

| Library | Version | Purpose |
|---------|---------|---------|
| **Supabase** | 2.89.0 | PostgreSQL database & auth |
| **JSON Web Token** | 9.0.3 | Token-based authentication |
| **jose** | 6.1.3 | JWT processing |
| **bcrypt** | 6.0.0 | Password hashing |

### Additional Tools

| Library | Version | Purpose |
|---------|---------|---------|
| **next-intl** | 4.7.0 | Internationalization |
| **next-themes** | 0.4.6 | Theme switching |
| **dayjs** | 1.11.19 | Date manipulation |
| **@google/generative-ai** | 0.24.1 | AI menu generation |

### Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| **ESLint** | 9.x | Code linting |
| **PostCSS** | 8.5.6 | CSS processing |
| **Autoprefixer** | 10.4.23 | CSS vendor prefixes |
| **Babel React Compiler** | 1.0.0 | React optimization |

---

## 📁 Project Structure

```
restaurant-system/
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Authentication pages
│   │   ├── (main-layout)/            # Main layout pages
│   │   ├── (shared-layout)/          # Shared layout (admin/customer)
│   │   │   ├── (admin)/              # Admin pages
│   │   │   ├── (customer)/          # Customer pages
│   │   │   └── (shared-pages)/       # Shared pages
│   │   ├── api/                      # API Routes
│   │   │   ├── admin/                # Admin API endpoints
│   │   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── customer/             # Customer API endpoints
│   │   │   └── email/                # Email endpoints
│   │   ├── providers/                # React Context Providers
│   │   └── styles/                   # Global styles
│   │
│   ├── features/                     # Business logic & hooks
│   │   ├── (admin)/                  # Admin features
│   │   │   ├── menu/                 # Menu management
│   │   │   ├── order/                # Order management
│   │   │   └── restaurant/          # Restaurant management
│   │   ├── (customer)/              # Customer features
│   │   │   ├── cart/                # Shopping cart
│   │   │   ├── get-restaurants/     # Restaurant browsing
│   │   │   ├── menu/                # Menu viewing
│   │   │   └── order/               # Order placement
│   │   └── user/                    # User authentication
│   │
│   ├── shared/                       # Shared utilities
│   │   ├── api/                     # Supabase clients
│   │   ├── config/                   # App configuration
│   │   ├── keys/                     # Query keys
│   │   ├── libs/auth/               # Authentication helpers
│   │   ├── notifications/           # Notification system
│   │   └── ui/                      # Reusable UI components
│   │
│   └── widgets/                      # Complex UI components
│       ├── (admin)/                  # Admin widgets
│       ├── (customer)/              # Customer widgets
│       └── header/                  # Header component
│
├── public/                           # Static assets
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm
- Supabase account
- Google AI API key (for AI menu generation)

### Installation

1. **Clone the repository:**

```
bash
git clone <repository-url>
cd restaurant-system
```

2. **Install dependencies:**

```
bash
npm install
# or
yarn install
```

3. **Set up environment variables:**

Create a `.env.local` file in the root directory:

```
env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key

# Google AI (Optional - for AI menu generation)
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key
```

4. **Run the development server:**

```
bash
npm run dev
```

5. **Open the application:**

Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🔐 Authentication System

### User Roles

| Role | Description | Access |
|------|-------------|--------|
| **customer** | Regular users | Browse restaurants, place orders |
| **restaurant_owner** | Business owners | Manage restaurants, menus, orders |

### Authentication Flow

#### Registration
```
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure_password",
  "role": "customer" | "restaurant_owner"
}
```

#### Login
```
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "secure_password"
}
```

#### Logout
```
POST /api/auth/logout
```

### Security Implementation

- **Password Hashing:** bcrypt with salt rounds = 10
- **Token Storage:** JWT in HTTP-only cookies
- **Server-side Validation:** Never trust client-provided data
- **Role Verification:** Server-side role checks for all protected routes

---

## 📦 API Documentation

### Admin API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/restaurants` | Get all owned restaurants |
| POST | `/api/admin/restaurants` | Create new restaurant |
| PATCH | `/api/admin/restaurants/[id]` | Update restaurant |
| DELETE | `/api/admin/restaurants/[id]` | Soft-delete restaurant |
| GET | `/api/admin/menu/categories` | Get menu categories |
| POST | `/api/admin/menu/categories` | Create category |
| PATCH | `/api/admin/menu/categories/[id]` | Update category |
| DELETE | `/api/admin/menu/categories/[id]` | Delete category |
| GET | `/api/admin/menu/menu_items` | Get menu items |
| POST | `/api/admin/menu/menu_items` | Create menu item |
| PATCH | `/api/admin/menu/menu_items/[id]` | Update menu item |
| DELETE | `/api/admin/menu/menu_items/[id]` | Delete menu item |
| GET | `/api/admin/orders` | Get restaurant orders |
| PATCH | `/api/admin/orders/[id]` | Update order status |
| POST | `/api/admin/menu/generate-menu` | AI generate menu |

### Customer API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customer/restaurants` | Get all active restaurants |
| GET | `/api/customer/restaurants/[id]` | Get restaurant details |
| GET | `/api/customer/menu/categories` | Get restaurant menu |
| POST | `/api/customer/orders` | Place new order |
| GET | `/api/customer/orders` | Get customer orders |
| GET | `/api/customer/orders/[id]` | Get order details |

### Authentication API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/set-role` | Set user role |
| POST | `/api/auth/update-password` | Update password |
| POST | `/api/auth/reset-password` | Reset password |
| POST | `/api/auth/forget-password` | Request password reset |

---

## 🗄️ Database Schema

### Users Table

```
sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  password_hash VARCHAR NOT NULL,
  role VARCHAR DEFAULT 'customer',
  has_restaurant BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### Restaurants Table

```
sql
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES users(id),
  name VARCHAR NOT NULL,
  description TEXT,
  city VARCHAR,
  country VARCHAR,
  image VARCHAR,
  is_active BOOLEAN DEFAULT true,
  rating DECIMAL DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### Categories Table

```
sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  name VARCHAR NOT NULL,
  description TEXT,
  "order" INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now()
);
```

### Menu Items Table

```
sql
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  name VARCHAR NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  image VARCHAR,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### Orders Table

```
sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES users(id),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  status VARCHAR DEFAULT 'pending',
  total_amount DECIMAL NOT NULL,
  address TEXT,
  phone VARCHAR,
  notes TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### Order Items Table

```
sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  menu_item_id UUID NOT NULL REFERENCES menu_items(id),
  quantity INTEGER NOT NULL,
  price DECIMAL NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```

---

## 🔒 Security Practices

### Authentication & Authorization

- ✅ JWT tokens stored in HTTP-only cookies
- ✅ Server-side identity verification for every request
- ✅ Never trust client-provided IDs for ownership
- ✅ Role-based access control on server

### Password Security

- ✅ Password hashing with bcrypt (salt rounds = 10)
- ✅ Plain text passwords never stored
- ✅ Passwords never returned in responses

### Input Validation

- ✅ Server-side validation of all inputs
- ✅ Zod schema validation
- ✅ Email format and length checks
- ✅ Type safety with TypeScript

### API Security

- ✅ Authentication check for all protected routes
- ✅ Role verification for authorized endpoints
- ✅ Ownership verification (verifyRestaurantOwner)
- ✅ Soft delete instead of hard delete

### Error Handling

- ✅ Generic error messages for clients
- ✅ Detailed errors logged server-side only
- ✅ No sensitive data in error responses

---

## 🎨 Theme & Design

### Color Palette

| Element | Light Mode | Dark Mode |
|---------|-------------|------------|
| Primary | #4E342E (Woody Brown) | #D7CCC8 (Cream) |
| Secondary | #A1887F (Beige) | #8D6E63 (Light Brown) |
| Background | #FDFBF7 (Warm White) | #1A1614 (Dark Brown) |
| Text Primary | #3E2723 (Dark Brown) | #F5F5F5 (Light Gray) |

### Typography

- **Primary Font:** Cairo (for Arabic support)
- **Fallback:** sans-serif

### Responsive Breakpoints

| Breakpoint | Width | Device |
|------------|-------|--------|
| xs | < 600px | Small phones |
| sm | 600-960px | Large phones |
| md | 960-1264px | Tablets |
| lg | 1264-1904px | Laptops |
| xl | > 1904px | Large screens |

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Use TypeScript for all new code
- Follow ESLint rules
- Write clean, commented code
- Add tests for new features

---

## 📄 License

This project is licensed under the MIT License.

---

## 📧 Support

For questions and support:

- Open an issue on GitHub
- Email the development team

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com)
- [Material-UI](https://mui.com)
- [React Query](https://tanstack.com/query)

---

**Last Updated:** January 2026  
**Version:** 0.1.0  
**Status:** In Development 🚀
