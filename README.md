# Full Stack Post Application with Keycloak Authentication

This project is a full-stack application featuring a React frontend and a Spring Boot backend with microservices architecture. It integrates with **Keycloak** for authentication and authorization, and uses an **API Gateway** for routing requests to microservices.

## 🔐 Authentication

Authentication is handled by [Keycloak](https://www.keycloak.org/). Users log in via Keycloak, and access tokens are used to authorize requests.

- The **API Gateway** validates the JWT token using Keycloak's issuer URI.
- Token is not introspected; it is only validated and passed along to downstream services.
- In the services, the JWT is decoded and injected into the Spring Security context.

---

## 🧭 Architecture Overview
```
React Frontend
|
| HTTP (with Bearer Token)
▼
API Gateway (Spring Cloud Gateway)
|
| lb://POST-SERVICE or lb://MOCK-SERVICE
▼
Post Service Mock Service
(CRUD + comments) (Keycloak debug/info)
```
- **React Frontend** authenticates via Keycloak and communicates with the `API Gateway`.
- **API Gateway** routes requests to microservices based on the path.
- **Post Service** handles post CRUD operations and supports tree-structured comments.
- **Mock Service** is used for debugging and retrieving Keycloak token data from the backend.

---

## 📦 API Gateway Routes

```yaml
cloud:
  gateway:
    routes:
      - id: post-service
        uri: lb://POST-SERVICE
        predicates:
          - Path=/api/posts/**
        filters:
          - StripPrefix=0

      - id: mock-service
        uri: lb://MOCK-SERVICE
        predicates:
          - Path=/api/mock/**
        filters:
          - StripPrefix=0
```
All requests go through `/api/**` prefix and are routed to the appropriate service.

## 📮 Post Service Endpoint
| Method | Endpoint                  | Description                    |
| ------ | ------------------------- | ------------------------------ |
| GET    | `/api/posts`              | Get all posts                  |
| GET    | `/api/posts/{id}`         | Get a post by ID               |
| POST   | `/api/posts/create`       | Create a new post              |
| PUT    | `/api/posts/update/{id}`  | Update a post                  |
| DELETE | `/api/posts/delete/{id}`  | Delete a post                  |
| POST   | `/api/posts/comment/{id}` | Add a comment to a post (tree) |


## 🛠️ Mock Service Endpoints
These endpoints are useful for debugging Keycloak tokens or retrieving user info on the backend.
| Method | Endpoint                            | Description                           |
| ------ | ----------------------------------- | ------------------------------------- |
| GET    | `/api/mock/self/preferred_username` | Get `preferred_username` from JWT     |
| GET    | `/api/mock/self/roles`              | Get roles from realm\_access claim    |
| POST   | `/api/mock/self/checkAdmin`         | Requires `ROLE_ADMIN`, returns `true` |
| GET    | `/api/mock/self/debug`              | Dump authorities of current user      |
| GET    | `/api/mock/self/email`              | Get user's email from JWT             |
| GET    | `/api/mock/self/sub`                | Get user ID (sub) from JWT            |
| GET    | `/api/mock/self/logs`               | Log authentication and JWT details    |

## ⚙️ Technologies Used
 - Frontend: React, Keycloak JS adapter
 - Backend: Spring Boot, Spring Security, Spring Cloud Gateway
 - Auth: Keycloak (OAuth2 / OpenID Connect)
 - Service Communication: Load-balanced via Spring Cloud
 - Token Validation: JWT validation via Keycloak issuer URI

## 🐳 Docker Setup
Each microservice has a dedicated application-docker.yaml profile.

To run the project using Docker:

1. Start Keycloak
Deploy your own Keycloak server (e.g., using Docker or your hosting).

2. Update `issuer-uri` in `application-docker.yaml` for each service
Replace the default Keycloak URL with your deployed one:
```yaml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: http://<your-keycloak-host>:<your-port>/realms/posts-realm
```
3. Run docker-compose: `docker-compose up --build`
4. Configure Keycloak Realm & Client
Follow the Keycloak setup guide:
👉 [link](Keycloak Configuration Instructions)

## 🧪 Development Profiles
Each service includes multiple profiles:
 - `dev` – for local development
 - `docker` - used during Docker deployment

## 📌 Setup Instructions (Manual)
1. Start all services manually (if not using Docker)
2. Run Keycloak locally and configure it 👉 [link](Keycloak Configuration Instructions)
3. Make sure all apps use correct issuer-uri
4. Run the React frontend

## 🛡️ Security Notes
- JWT is only validated at the API Gateway.
- Services decode the JWT and extract claims using Spring Security's Jwt and Authentication objects.
- Method-level authorization is supported via @PreAuthorize.

## 👤 Author

Made by Aleksander Slabunov — Java backend enthusiast exploring full-stack development with Keycloak and microservices.
