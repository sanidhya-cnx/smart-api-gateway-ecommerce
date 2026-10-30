# Smart API Gateway for E-Commerce
A scalable, modular e-commerce backend built using Node.js, Express.js, MongoDB, and Microservices Architecture.

The project demonstrates how independent backend services communicate through a centralized API Gateway to handle authentication, users, products, inventory, and orders.

The goal is to build a production-oriented backend while exploring real-world distributed system concepts such as service discovery, dynamic routing, inter-service communication, centralized error handling, stock management, and distributed transactions.

# Key Design Principles
* Independent services for different business domains.
* Centralized API Gateway for client requests.
* Independent MongoDB databases for each service.
* HTTP-based inter-service communication.
* Centralized request logging and error handling.
* Separation of business logic using controllers and services.
* Scalable and maintainable backend architecture.

                     CLIENT
                        |
                        |
                 API GATEWAY
                   Port 3000
                        |
          +-------------+-------------+
          |             |             |
     Auth Middleware  Rate Limiter  Request Logger
          |
          |
     Dynamic Routing
          |
    +-----+----------------+----------------------+------------------------+--------------------+
    |                      |                      |                        |                    |
    v                      v                      v                        v                    v
 Auth Service:5002   User Service:5001   Product Service:5003   Inventory Service:5004   Order Service:5005
    |                      |                      |                        |                    |
    v                      v                      v                        v               +----+----+
 Auth DB                User DB               Product DB             Inventory DB          |         |
                                                                                           v         v
                                                                                     Product     Inventory 
                                                                                     Service      Service

# Key Features
* Microservices Architecture: Independent services for authentication, user management, products,inventory, and orders.
* Centralized API Gateway: Single entry point with dynamic request routing and centralized middleware.
* Role-Based Access Control (RBAC): Role-based authorization foundation to control access to protected resources.
* Inter-Service Communication: HTTP-based communication between microservices using Axios.
* Global Error Handling: Centralized error-handling middleware with consistent API responses.