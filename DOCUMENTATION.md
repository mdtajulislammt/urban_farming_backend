# Urban Farming Platform API Documentation

Welcome to the **Urban Farming Platform Backend**. This platform connects organic farmers (Vendors) with eco-conscious consumers (Customers) and provides tools for marketplace trading, garden space rentals, plant growth tracking, and community engagement.

---

## 🚀 Project Launch & Setup

### 1. Prerequisites
- **Node.js**: v18 or higher
- **PostgreSQL**: Running instance
- **npm**: v9 or higher

### 2. Installation
```bash
# Clone the repository
git clone <repository-url>
cd urban

# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/urban_farming_db"
JWT_SECRET="your_jwt_secret_key"
PORT=5000
```

### 4. Database Setup (Prisma)
```bash
# Apply migrations
npx prisma migrate dev --name init

# Seed the database with default data
npx prisma db seed
```

### 5. Start Development Server
```bash
npm run dev
```
The server will be running at `http://localhost:5000`.

### 6. API Documentation (Swagger)
Interactive API documentation is available at:
👉 [http://localhost:5000/api/docs](http://localhost:5000/api/docs)

---

## 🛠️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Runtime** | Node.js |
| **Framework** | Express.js with TypeScript |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Authentication** | JWT (JSON Web Tokens) with Bcrypt |
| **API Docs** | Swagger (swagger-ui-express, swagger-jsdoc) |
| **Security** | Helmet, CORS, Express-Rate-Limit |
| **Environment** | Dotenv, Nodemon |

---

## 🧠 Business Logic

### 1. User Roles & Authentication
The platform supports three primary roles:
- **CUSTOMER**: Can buy products, rent garden spaces, track plant health, and participate in the community.
- **VENDOR**: Can list organic products, rent out garden spaces/equipment, and manage orders.
- **ADMIN**: Platform overview, vendor verification, and system statistics.

### 2. Organic Marketplace
Vendors list organic products (Vegetables, Fruits, etc.). Customers can browse with advanced filters (category, price range, search terms) and place orders.

### 3. Rental & Tracking (IoT Ready)
Vendors can rent out physical garden spaces. Once a customer books a space, the vendor provides regular updates on plant health (e.g., "Needs Water", "Flowering"). This manual update system is designed to be easily integrated with IoT sensors in the future.

### 4. Vendor Compliance
To maintain "Organic" integrity, Vendors must submit sustainability certificates. Admins review and approve these certificates to verify the farm's legitimacy.

### 5. Community Forum
A space for users to share knowledge. Users can create posts with images and comment on others' posts to foster an urban farming ecosystem.

---

## 🔑 Default User Credentials

After running `npx prisma db seed`, you can use the following accounts for testing:

| Role | Email | Password |
| :--- | :--- | :--- |
| **ADMIN** | `admin@urbanfarm.com` | `admin123` |
| **VENDOR** | `vendor1@farm.com` to `vendor10@farm.com` | `admin123` |
| **CUSTOMER** | `customer1@gmail.com` to `customer5@gmail.com` | `admin123` |

---

## 📑 API Reference

### 1. Authentication (`/auth`)
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| POST | `/register` | Public | Register a new user |
| POST | `/login` | Public | Login and receive JWT token |

### 2. Admin Operations (`/admin`)
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| PATCH | `/verify-vendor/:vendorId` | ADMIN | Approve or Reject a vendor profile |
| GET | `/pending-certificates` | ADMIN | List vendors awaiting certification |
| GET | `/dashboard-stats` | ADMIN | View platform-wide statistics |

### 3. Marketplace (`/marketplace`)
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | : :--- |
| GET | `/products` | Any | Browse products with filters & pagination |
| POST | `/products` | VENDOR | List a new organic product |
| GET | `/products/:id` | Any | Get detailed view of a single product |
| PATCH | `/products/:id` | VENDOR | Update product details or stock |

### 4. Orders (`/order`)
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| POST | `/checkout` | CUSTOMER | Place an order for products |
| GET | `/my-orders` | CUSTOMER | View purchase history |
| GET | `/vendor-orders` | VENDOR | View orders received by your farm |
| PATCH | `/status/:id` | VENDOR | Update order shipping/delivery status |

### 5. Rental System (`/rental`)
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| POST | `/list-space` | VENDOR | List a garden space for rent |
| POST | `/book` | CUSTOMER | Request to book a rental space |
| GET | `/my-spaces` | VENDOR | View your listed rental spaces |
| GET | `/my-bookings` | CUSTOMER | View your current and past bookings |
| PATCH | `/manage-booking/:id` | VENDOR | Confirm or Cancel rental requests |

### 6. Plant Tracking (`/tracking`)
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| POST | `/update` | VENDOR | Update health/growth status for a plant |
| GET | `/my-plants` | CUSTOMER | View health of your rented plants |
| GET | `/history/:spaceId` | CUSTOMER | View tracking history for a specific space |

### 7. Community Forum (`/community`)
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| GET | `/posts` | Any | View all community posts |
| POST | `/posts` | All Roles | Create a new community post |
| POST | `/comment` | All Roles | Add comments to a post |

### 8. Vendor Profile (`/vendor`)
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| POST | `/setup-profile` | VENDOR | Configure farm name, location, etc. |
| POST | `/submit-cert` | VENDOR | Upload organic certification |

---
*Made by MD Tajul Islam*
