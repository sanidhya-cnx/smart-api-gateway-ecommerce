# Smart API Gateway for E-Commerce

   A production-ready microservices-based e-commerce backend built using the MERN stack. This project demonstrates how an API Gateway manages communication between multiple backend services while providing authentication, authorization, request routing, caching, logging, monitoring, and other production-grade features.

# Tech Stack
Frontend

* React
* React Router
* Axios
* Tailwind CSS

Backend

* Node.js
* Express.js

Database

* MongoDB
* Mongoose

Authentication

* JWT
* bcrypt

Caching

* Redis

Monitoring

* Prometheus
* Grafana

Logging

* Morgan
* Winston

Deployment

* Docker
* Docker Compose

# Architecture
                 React Frontend
                       │
                       ▼
                 API Gateway
                       │
 ──────────────────────────────────────────────
 │        │        │        │        │
 ▼        ▼        ▼        ▼        ▼
User   Product   Cart    Order   Payment
Service Service Service Service  Service
 │        │        │        │        │
 ▼        ▼        ▼        ▼        ▼
MongoDB MongoDB MongoDB MongoDB MongoDB

# Folder Structure

├─── src/
│    ├─── api-gateway/                 ← API Gateway
│    │    ├─── config/                ← Gateway configuration
│    │    │    └─── cors.js
│    │    ├─── controllers/           ← Request controllers
│    │    │    ├─── authController.js
│    │    │    └─── rateLimit.js
│    │    ├───middlewares/           ← Middleware functions
│    │    │    ├─── authMiddleware.js
│    │    │    ├─── cacheMiddleware.js
│    │    │    ├─── loggingMiddleware.js
│    │    │    ├─── rateLimitMiddleware.js
│    │    │    ├─── responseMiddleware.js
│    │    │    ├─── securityMiddleware.js
│    │    │    └─── validationMiddleware.js
│    │    ├─── routes/                ← Request routes
│    │    │    ├─── authRoutes.js
│    │    │    ├─── productRoutes.js
│    │    │    ├─── cartRoutes.js
│    │    │    ├─── orderRoutes.js
│    │    │    ├─── paymentRoutes.js
│    │    │    ├─── proxyRoutes.js
│    │    │    └─── healthRoutes.js
│    │    ├─── services/              ← Service integrations
│    │    │    ├─── authService.js
│    │    │    ├─── productService.js
│    │    │    ├─── cartService.js
│    │    │    ├─── orderService.js
│    │    │    ├─── paymentService.js
│    │    │    ├─── notificationService.js
│    │    │    └─── searchService.js
│    │    ├─── utils/                 ← Utility functions
│    │    │    ├─── responseHandler.js
│    │    │    └─── tokenHandler.js
│    │    ├─── index.js               ← Main entry point
│    │    └─── app.js
│    ├─── auth-service/              ← Authentication service
│    ├─── product-service/           ← Product service
│    ├─── cart-service/              ← Cart service
│    ├─── order-service/             ← Order service
│    ├─── payment-service/           ← Payment service
│    ├─── notification-service/      ← Notification service
│    └─── search-service/            ← Search service
├─── .env                           ← Environment variables
├─── docker-compose.yml             ← Docker services
├─── README.md                      ← Project README
└─── package.json

# Roadmap
* Project Planning
* PRD
* SRS
* HLD
* LLD
* Project Setup
* API Gateway
* User Service
* Product Service
* Cart Service
* Order Service
* Payment Service
* Review Service
* Notification Service
* React Frontend
* Docker
* Deployment